import { existsSync } from "node:fs";
import { readFile, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evidenceDir = path.join(root, "specs/005-joint-product-certification/visual-diagnostics");
const args = process.argv.slice(2);
const storybookUrl = option("--storybook-url", "http://127.0.0.1:6224").replace(/\/$/, "");
const chromePath = option("--chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");
const reportFile = path.resolve(root, option("--report", "specs/005-joint-product-certification/visual-diagnostics/joint-story-runtime-audit-20260805.json"));
const requestedStoryId = option("--story-id", "");
const reclassifyExisting = args.includes("--reclassify-existing");
const profileDir = path.join(root, "tmp/joint-story-runtime-chrome-profile");
const widths = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

function option(name, fallback) {
  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];
  const equals = args.find((arg) => arg.startsWith(`${name}=`));
  return equals ? equals.slice(name.length + 1) : fallback;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function classifyFailures(rows) {
  return rows.flatMap((row) => widths.flatMap((viewport) => {
    const metrics = row.viewports[viewport.name];
    const noRenderedContent = !metrics.rootChildCount && !metrics.bodyTextLength && !metrics.interactiveCount;
    return metrics.overflowX || metrics.unnamedInteractiveCount > 0 || metrics.errors.length || noRenderedContent
      ? [{ storyId: row.id, viewport: viewport.name, metrics }]
      : [];
  }));
}

if (reclassifyExisting) {
  const existing = JSON.parse(await readFile(reportFile, "utf8"));
  const failures = classifyFailures(existing.rows ?? []);
  const updated = { ...existing, generatedAt: new Date().toISOString(), status: failures.length ? "fail" : "pass", failureCount: failures.length, failures };
  await writeFile(reportFile, `${JSON.stringify(updated, null, 2)}\n`);
  console.log(`Reclassified existing joint story runtime audit: ${updated.status}; stories=${updated.storyCount}; failures=${failures.length}.`);
  process.exitCode = failures.length ? 1 : 0;
  process.exit();
}

async function waitForPort() {
  const portFile = path.join(profileDir, "DevToolsActivePort");
  for (let attempt = 0; attempt < 200; attempt += 1) {
    try {
      const [port] = (await readFile(portFile, "utf8")).trim().split(/\r?\n/);
      if (port) return port;
    } catch {
      // Chrome may take a moment to create its DevTools file.
    }
    await sleep(50);
  }
  throw new Error("Chrome DevTools port was not created.");
}

async function devtools(port, method, params = {}, timeoutMs = 15000) {
  const targetsResponse = await fetch(`http://127.0.0.1:${port}/json/list`);
  const targets = await targetsResponse.json();
  const target = targets.find((item) => item.type === "page");
  if (!target?.webSocketDebuggerUrl) throw new Error("Chrome page target is unavailable.");
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(target.webSocketDebuggerUrl);
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      socket.close();
      reject(new Error(`DevTools ${method} timed out.`));
    }, timeoutMs);
    socket.addEventListener("open", () => socket.send(JSON.stringify({ id: 1, method, params })));
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (settled || message.id !== 1) return;
      settled = true;
      clearTimeout(timer);
      socket.close();
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    });
    socket.addEventListener("error", () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(new Error(`DevTools ${method} socket failed.`));
    });
  });
}

async function evaluate(port, expression) {
  const result = await devtools(port, "Runtime.evaluate", { expression, returnByValue: true });
  return result?.result?.value;
}

const index = await fetch(`${storybookUrl}/index.json`).then((response) => {
  if (!response.ok) throw new Error(`Storybook index request failed: ${response.status}`);
  return response.json();
});
const allStories = Object.values(index.entries ?? index).filter((entry) => entry.type === "story");
const stories = requestedStoryId ? allStories.filter((entry) => entry.id === requestedStoryId) : allStories;
if (requestedStoryId && stories.length !== 1) throw new Error(`Story not found: ${requestedStoryId}`);
if (!stories.length) throw new Error("Storybook index contains no stories.");
if (!existsSync(chromePath)) throw new Error(`Chrome executable not found: ${chromePath}`);

await rm(profileDir, { recursive: true, force: true });
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--disable-background-networking",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-extensions",
  "--disable-sync",
  "--force-device-scale-factor=1",
  "--hide-scrollbars",
  "--no-first-run",
  "--remote-debugging-port=0",
  `--user-data-dir=${profileDir}`,
  `${storybookUrl}/iframe.html?id=${encodeURIComponent(stories[0].id)}&viewMode=story`,
], { cwd: root, stdio: ["ignore", "ignore", "pipe"] });
let chromeStderr = "";
chrome.stderr.on("data", (chunk) => { chromeStderr += chunk.toString(); });
const port = await waitForPort();
const rows = [];
const errorPatterns = [
  "Failed to fetch dynamically imported module",
  "The component failed to render properly",
  "TypeError: Failed to fetch",
  "Unable to dynamically transpile",
  "SB_PREVIEW_API",
  "Couldn't find story matching",
];

async function readRuntimeMetrics(port) {
  return evaluate(port, `(() => {
    const visible = (node) => {
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    };
    const accessibleName = (node) => {
      const labelled = node.getAttribute("aria-label") || node.getAttribute("aria-labelledby") || node.getAttribute("title");
      if (labelled) return labelled.trim();
      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA" || node.tagName === "SELECT") {
        if (node.labels?.length) return [...node.labels].map((label) => label.textContent).join(" ").trim();
        return node.getAttribute("placeholder")?.trim() || "";
      }
      return (node.textContent || "").replace(/\\s+/g, " ").trim();
    };
    const controls = [...document.querySelectorAll("button, a[href], input, textarea, select, [role=button], [role=link], [role=checkbox], [role=switch], [role=tab]")].filter(visible);
    const unnamedInteractive = controls.filter((node) => !accessibleName(node)).map((node) => ({
      tagName: node.tagName,
      text: (node.textContent || "").replace(/\\s+/g, " ").trim(),
      ariaLabel: node.getAttribute("aria-label"),
      ariaLabelledBy: node.getAttribute("aria-labelledby"),
      title: node.getAttribute("title"),
      placeholder: node.getAttribute("placeholder"),
      outerHTML: node.outerHTML.slice(0, 500),
    }));
    const unnamedInteractiveCount = unnamedInteractive.length;
    const bodyText = document.body?.innerText || "";
    const errors = ${JSON.stringify(errorPatterns)}.filter((pattern) => bodyText.includes(pattern));
    const root = document.querySelector("#storybook-root, #root");
    const documentElement = document.documentElement;
    const body = document.body;
    const bodyWidth = body?.clientWidth || 0;
    const bodyScrollWidth = body?.scrollWidth || 0;
    const rootWidth = root?.clientWidth || 0;
    const rootScrollWidth = root?.scrollWidth || 0;
    const rootChild = root?.firstElementChild;
    const rootChildRect = rootChild?.getBoundingClientRect();
    const rootChildStyle = rootChild ? getComputedStyle(rootChild) : null;
    const documentOverflowX = documentElement.scrollWidth > documentElement.clientWidth + 1;
    const bodyOverflowX = bodyScrollWidth > bodyWidth + 1;
    const rootOverflowX = rootScrollWidth > rootWidth + 1;
    const overflowNodes = [...(root?.querySelectorAll("*") || [])].flatMap((node) => {
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      return visible(node) && (rect.right > window.innerWidth + 1 || rect.width > window.innerWidth + 1)
        ? [{
            tagName: node.tagName,
            className: typeof node.className === "string" ? node.className.slice(0, 240) : "",
            width: Math.round(rect.width),
            right: Math.round(rect.right),
            display: style.display,
            minWidth: style.minWidth,
            widthStyle: style.width,
          }]
        : [];
    }).slice(0, 20);
    return {
      documentWidth: documentElement.clientWidth,
      scrollWidth: documentElement.scrollWidth,
      overflowX: bodyOverflowX || rootOverflowX,
      documentOverflowX,
      bodyWidth,
      bodyScrollWidth,
      rootWidth,
      rootScrollWidth,
      media: {
        max760: window.matchMedia("(max-width: 760px)").matches,
        max980: window.matchMedia("(max-width: 980px)").matches,
      },
      rootChild: rootChild ? {
        tagName: rootChild.tagName,
        className: typeof rootChild.className === "string" ? rootChild.className.slice(0, 240) : "",
        width: Math.round(rootChildRect?.width || 0),
        widthStyle: rootChildStyle?.width || "",
        maxWidth: rootChildStyle?.maxWidth || "",
        minWidth: rootChildStyle?.minWidth || "",
      } : null,
      overflowNodes,
      unnamedInteractiveCount,
      unnamedInteractive,
      interactiveCount: controls.length,
      errors,
      rootChildCount: root?.childElementCount || 0,
      bodyTextLength: bodyText.trim().length,
    };
  })()`);
}

try {
  for (let indexPosition = 0; indexPosition < stories.length; indexPosition += 1) {
    const story = stories[indexPosition];
    const viewportResults = {};
    for (const viewport of widths) {
      await devtools(port, "Emulation.setDeviceMetricsOverride", {
        deviceScaleFactor: 1,
        mobile: false,
        width: viewport.width,
        height: viewport.height,
      });
      await devtools(port, "Page.navigate", {
        url: `${storybookUrl}/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`,
      });
      await sleep(220);
      let metrics = await readRuntimeMetrics(port);
      for (
        let attempt = 0;
        attempt < 8 && (!metrics || (!metrics.rootChildCount && !metrics.bodyTextLength && !metrics.errors.length));
        attempt += 1
      ) {
        await sleep(200);
        metrics = await readRuntimeMetrics(port);
      }
      if (!metrics) {
        metrics = {
          documentWidth: viewport.width,
          scrollWidth: viewport.width,
          overflowX: false,
          documentOverflowX: false,
          bodyWidth: 0,
          bodyScrollWidth: 0,
          rootWidth: 0,
          rootScrollWidth: 0,
          unnamedInteractiveCount: 0,
          unnamedInteractive: [],
          interactiveCount: 0,
          errors: ["Runtime metrics unavailable after navigation retries"],
          rootChildCount: 0,
          bodyTextLength: 0,
        };
      }
      viewportResults[viewport.name] = metrics;
    }
    rows.push({
      id: story.id,
      title: story.title,
      name: story.name,
      importPath: story.importPath,
      viewports: viewportResults,
    });
    if ((indexPosition + 1) % 25 === 0 || indexPosition === stories.length - 1) {
      console.log(`[${indexPosition + 1}/${stories.length}]`);
    }
  }
} finally {
  chrome.kill("SIGTERM");
  setTimeout(() => chrome.kill("SIGKILL"), 1000).unref();
  try {
    await rm(profileDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 150 });
  } catch {
    // Chrome can keep a profile lock briefly after SIGTERM; the report is still valid.
  }
}

const failures = classifyFailures(rows);
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  storybookUrl,
  storyCount: stories.length,
  viewports: widths,
  status: failures.length ? "fail" : "pass",
  failureCount: failures.length,
  failures,
  chromeStderr: chromeStderr.trim().slice(-2000),
  rows,
};
await writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Joint story runtime audit: ${report.status}; stories=${stories.length}; failures=${failures.length}.`);
if (report.status !== "pass") process.exitCode = 1;

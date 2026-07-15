import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, relative, resolve } from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { resolveSourceAssetsDir } from "./source-assets-config.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const checkMode = args.includes("--check");
const reuseExisting = args.includes("--reuse");

function optionValue(name, fallback) {
  const equals = args.find((arg) => arg.startsWith(`${name}=`));
  if (equals) return equals.split("=").slice(1).join("=");
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : fallback;
}

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function removeChromeProfile(profileDir) {
  rmSync(profileDir, { recursive: true, force: true, maxRetries: 8, retryDelay: 125 });
}

function sourceManifestContractSha256(manifest) {
  const { generatedAt: _generatedAt, source: _source, ...contract } = manifest;
  return createHash("sha256").update(JSON.stringify(contract)).digest("hex");
}

function jsonContractSha256(filePath) {
  return createHash("sha256").update(JSON.stringify(JSON.parse(readFileSync(filePath, "utf8")))).digest("hex");
}

function renderContractSha256() {
  const roots = [
    "packages/tokens/src",
    "packages/ui/src",
    "packages/crm/src",
    "apps/docs/src",
    "apps/docs/.storybook"
  ];
  const standaloneFiles = ["package.json", "pnpm-lock.yaml"];
  const files = [...standaloneFiles];

  function collect(directory) {
    for (const entry of readdirSync(resolve(root, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) collect(path);
      else if (entry.isFile()) files.push(path);
    }
  }

  for (const directory of roots) collect(directory);
  const hash = createHash("sha256");
  for (const file of files.sort()) {
    hash.update(relative(root, resolve(root, file)));
    hash.update("\0");
    hash.update(readFileSync(resolve(root, file)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

const specDir = resolve(root, "specs/001-product-ui-foundation");
const planPath = resolve(specDir, "visual-certification-plan-audit.json");
const sourceManifestPath = resolve(root, optionValue("--source-manifest", "specs/002-readiness-evidence-portability/source-assets-manifest.json"));
const reportJsonPath = resolve(root, optionValue("--report", "specs/001-product-ui-foundation/visual-certification-capture-audit.json"));
const reportMdPath = resolve(root, optionValue("--report-md", "specs/001-product-ui-foundation/visual-certification-capture-audit.md"));
const storybookStaticIndexPath = resolve(root, "apps/docs/storybook-static/index.json");
const sourceDir = resolveSourceAssetsDir({ root, args, requireExisting: !checkMode }).path;
const storybookUrl = optionValue("--storybook-url", "http://127.0.0.1:6006").replace(/\/$/, "");
const captureMode = optionValue("--storybook-mode", "static");
const chromePath = optionValue("--chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");
const outputDir = resolve(root, optionValue("--output-dir", "tmp/visual-certification-current-batch"));
const concurrency = Math.max(1, Number.parseInt(optionValue("--concurrency", "1"), 10) || 1);
const limit = Math.max(0, Number.parseInt(optionValue("--limit", "0"), 10) || 0);
const imageFilter = optionValue("--image", "");

const plan = JSON.parse(readFileSync(planPath, "utf8"));
const sourceManifest = JSON.parse(readFileSync(sourceManifestPath, "utf8"));
const sourceByName = new Map((sourceManifest.images ?? []).map((image) => [image.name, image]));
const rawTargets = (plan.pendingRows ?? [])
  .filter((row) => row.story && row.sourceImageExists && !(row.referenceStoryIds?.length > 0))
  .map((row) => ({
    image: row.image,
    storyId: row.story,
    sourcePath: resolve(sourceDir, row.image),
    source: sourceByName.get(row.image) ?? null
  }));
const targetByImage = new Map();
for (const target of rawTargets) {
  const existing = targetByImage.get(target.image);
  if (existing && existing.storyId !== target.storyId) {
    throw new Error(`Conflicting visual capture stories for ${target.image}: ${existing.storyId}, ${target.storyId}`);
  }
  if (!existing) targetByImage.set(target.image, target);
}
const allTargets = [...targetByImage.values()];
const filteredTargets = imageFilter ? allTargets.filter((target) => target.image === imageFilter) : allTargets;
if (imageFilter && filteredTargets.length !== 1) throw new Error(`Visual capture target not found: ${imageFilter}`);
const targets = limit > 0 ? filteredTargets.slice(0, limit) : filteredTargets;
const existingReport = existsSync(reportJsonPath) ? JSON.parse(readFileSync(reportJsonPath, "utf8")) : { rows: [] };
const existingRowsByImage = new Map((existingReport.rows ?? []).map((row) => [row.image, row]));
const currentRenderContractSha256 = renderContractSha256();
const reusableReportContract =
  existingReport.schemaVersion === 8 &&
  existingReport.captureMode === "static" &&
  existingReport.renderContractSha256 === currentRenderContractSha256;

function targetContractSha256(targetRows = allTargets) {
  return createHash("sha256").update(JSON.stringify(targetRows.map((target) => ({
    image: target.image,
    storyId: target.storyId,
    sourceSha256: target.source?.sha256 ?? null
  })))).digest("hex");
}

function validateRecordedReport() {
  if (!existsSync(reportJsonPath)) throw new Error(`Missing visual capture report: ${reportJsonPath}`);
  const recorded = JSON.parse(readFileSync(reportJsonPath, "utf8"));
  const expectedTargets = new Map(allTargets.map((target) => [target.image, target]));
  const staleRows = (recorded.rows ?? []).filter((row) => {
    const target = expectedTargets.get(row.image);
    return !target || target.storyId !== row.storyId || target.source?.sha256 !== row.sourceSha256;
  });
  const current = {
    targetContractSha256: targetContractSha256(),
    renderContractSha256: currentRenderContractSha256,
    storybookStaticIndexContractSha256: jsonContractSha256(storybookStaticIndexPath),
    sourceManifestContractSha256: sourceManifestContractSha256(sourceManifest),
    sourceManifestSha256: sha256(sourceManifestPath),
    eligibleTargetCount: allTargets.length
  };
  const completeCapture =
    (recorded.rows ?? []).length === allTargets.length &&
    (recorded.rows ?? []).every((row) => row.status === "captured" && row.renderValid === true && (row.renderErrors ?? []).length === 0);
  const pass =
    recorded.schemaVersion === 8 &&
    recorded.targetContractSha256 === current.targetContractSha256 &&
    recorded.renderContractSha256 === current.renderContractSha256 &&
    recorded.captureMode === "static" &&
    recorded.storybookStaticIndexContractSha256 === current.storybookStaticIndexContractSha256 &&
    recorded.sourceManifestContractSha256 === current.sourceManifestContractSha256 &&
    recorded.eligibleTargetCount === current.eligibleTargetCount &&
    staleRows.length === 0 &&
    completeCapture;
  console.log(`Visual capture evidence: ${pass ? "current" : "stale"}; ${recorded.rows?.length ?? 0}/${allTargets.length} captured rows.`);
  if (!pass) {
    console.error(JSON.stringify({ current, recorded: {
      targetContractSha256: recorded.targetContractSha256,
      renderContractSha256: recorded.renderContractSha256,
      captureMode: recorded.captureMode,
      storybookStaticIndexContractSha256: recorded.storybookStaticIndexContractSha256,
      sourceManifestContractSha256: recorded.sourceManifestContractSha256,
      sourceManifestSha256: recorded.sourceManifestSha256,
      eligibleTargetCount: recorded.eligibleTargetCount
    }, completeCapture, staleRows: staleRows.map((row) => row.image) }, null, 2));
    process.exit(1);
  }
}

if (checkMode) {
  validateRecordedReport();
  process.exit(0);
}

if (!existsSync(chromePath)) throw new Error(`Chrome executable not found: ${chromePath}`);
if (captureMode !== "static") throw new Error("Visual certification capture requires --storybook-mode static.");
mkdirSync(outputDir, { recursive: true });

async function validateStaticStorybookServer() {
  const response = await fetch(`${storybookUrl}/index.json`);
  if (!response.ok) throw new Error(`Static Storybook index request failed (${response.status}) at ${storybookUrl}/index.json`);
  const remote = await response.json();
  const local = JSON.parse(readFileSync(storybookStaticIndexPath, "utf8"));
  const remoteHash = createHash("sha256").update(JSON.stringify(remote)).digest("hex");
  const localHash = createHash("sha256").update(JSON.stringify(local)).digest("hex");
  if (remoteHash !== localHash) throw new Error("Storybook server index does not match apps/docs/storybook-static/index.json.");
}

await validateStaticStorybookServer();

async function waitForDevToolsPort(profileDir) {
  const portPath = resolve(profileDir, "DevToolsActivePort");
  for (let attempt = 0; attempt < 200; attempt += 1) {
    if (existsSync(portPath)) {
      const [port] = readFileSync(portPath, "utf8").trim().split(/\r?\n/);
      if (port) return port;
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 50));
  }
  throw new Error("Chrome DevTools port was not created for render inspection.");
}

function devToolsCommand(webSocketDebuggerUrl, method, params = {}, timeoutMs = 5000) {
  return new Promise((resolvePromise, rejectPromise) => {
    const socket = new WebSocket(webSocketDebuggerUrl);
    let settled = false;
    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      socket.close();
      rejectPromise(new Error(`Chrome DevTools ${method} timed out.`));
    }, timeoutMs);
    socket.addEventListener("open", () => socket.send(JSON.stringify({ id: 1, method, params })));
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (settled || message.id !== 1) return;
      settled = true;
      clearTimeout(timeout);
      socket.close();
      if (message.error) rejectPromise(new Error(`Chrome DevTools ${method} failed: ${message.error.message}`));
      else resolvePromise(message.result);
    });
    socket.addEventListener("error", () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      rejectPromise(new Error(`Chrome DevTools ${method} WebSocket failed.`));
    });
  });
}

async function evaluateVisibleStory(port, storyUrl) {
  let targets;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (response.ok) {
        targets = await response.json();
        const page = targets.find((item) => item.type === "page" && item.url.startsWith(storyUrl));
        if (page) break;
      }
    } catch {
      // The DevTools HTTP endpoint can trail the port file briefly.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 50));
  }
  const target = targets?.find((item) => item.type === "page" && item.url.startsWith(storyUrl));
  if (!target?.webSocketDebuggerUrl) throw new Error("Chrome DevTools page target was not available for render inspection.");
  const expression = `(() => {
    const bodyText = document.body?.innerText || "";
    const errorPatterns = [
      "Failed to fetch dynamically imported module",
      "The component failed to render properly",
      "TypeError: Failed to fetch",
      "Unable to dynamically transpile",
      "SB_PREVIEW_API",
      "Couldn't find story matching"
    ].filter((pattern) => bodyText.includes(pattern));
    const root = document.querySelector("#storybook-root");
    return {
      bodyTextLength: bodyText.trim().length,
      storyRootChildCount: root?.childElementCount || 0,
      errorPatterns,
      documentTitle: document.title
    };
  })()`;
  try {
    const result = await devToolsCommand(target.webSocketDebuggerUrl, "Runtime.evaluate", { expression, returnByValue: true });
    const value = result?.result?.value;
    if (!value) throw new Error("Chrome DevTools render evaluation returned no value.");
    return { ...value, inspectionMethod: "runtime" };
  } catch (runtimeError) {
    const result = await devToolsCommand(target.webSocketDebuggerUrl, "DOM.getDocument", { depth: -1, pierce: true }, 20000);
    const rootDocument = result?.root;
    if (!rootDocument) throw runtimeError;
    const textParts = [];
    let storyRoot = null;
    let documentTitle = "";

    function findNode(node, nodeName) {
      if (node.nodeName === nodeName) return node;
      for (const child of node.children ?? []) {
        const match = findNode(child, nodeName);
        if (match) return match;
      }
      return null;
    }

    const bodyNode = findNode(rootDocument, "BODY");
    const bodyAttributes = bodyNode?.attributes ?? [];
    const bodyClassIndex = bodyAttributes.indexOf("class");
    const bodyClasses = bodyClassIndex >= 0 ? bodyAttributes[bodyClassIndex + 1].split(/\s+/) : [];
    const visibleSystemIds = new Set();
    if (bodyClasses.includes("sb-show-errordisplay")) visibleSystemIds.add("error-message"), visibleSystemIds.add("error-stack");
    if (bodyClasses.includes("sb-show-nopreview")) visibleSystemIds.add("storybook-nopreview");

    function visit(node, inTitle = false, collectText = false) {
      const attributes = node.attributes ?? [];
      const idIndex = attributes.indexOf("id");
      const id = idIndex >= 0 ? attributes[idIndex + 1] : "";
      if (id === "storybook-root") storyRoot = node;
      const isTitle = inTitle || node.nodeName === "TITLE";
      const shouldCollect = collectText || id === "storybook-root" || visibleSystemIds.has(id);
      if (node.nodeType === 3 && node.nodeValue) {
        if (shouldCollect) textParts.push(node.nodeValue);
        if (isTitle) documentTitle += node.nodeValue;
      }
      for (const child of node.children ?? []) visit(child, isTitle, shouldCollect);
      for (const shadowRoot of node.shadowRoots ?? []) visit(shadowRoot, isTitle, shouldCollect);
    }
    visit(rootDocument);
    const bodyText = textParts.join(" ").replace(/\s+/g, " ").trim();
    const errorPatterns = [
      "Failed to fetch dynamically imported module",
      "The component failed to render properly",
      "TypeError: Failed to fetch",
      "Unable to dynamically transpile",
      "SB_PREVIEW_API",
      "Couldn't find story matching"
    ].filter((pattern) => bodyText.includes(pattern));
    return {
      bodyTextLength: bodyText.length,
      storyRootChildCount: storyRoot?.childNodeCount ?? storyRoot?.children?.length ?? 0,
      errorPatterns,
      documentTitle: documentTitle.trim(),
      inspectionMethod: "dom-document"
    };
  }
}

async function captureVisibleStoryScreenshot(port, storyUrl, screenshotPath, width, height) {
  const response = await fetch(`http://127.0.0.1:${port}/json/list`);
  if (!response.ok) throw new Error("Chrome DevTools targets were unavailable for screenshot capture.");
  const targets = await response.json();
  const target = targets.find((item) => item.type === "page" && item.url.startsWith(storyUrl));
  if (!target?.webSocketDebuggerUrl) throw new Error("Chrome DevTools page target was not available for screenshot capture.");
  await devToolsCommand(target.webSocketDebuggerUrl, "Emulation.setDeviceMetricsOverride", {
    deviceScaleFactor: 1,
    height,
    mobile: false,
    width
  }, 20000);
  const result = await devToolsCommand(target.webSocketDebuggerUrl, "Page.captureScreenshot", {
    captureBeyondViewport: false,
    format: "png",
    fromSurface: true
  }, 20000);
  if (!result?.data) throw new Error("Chrome DevTools screenshot returned no PNG data.");
  writeFileSync(screenshotPath, Buffer.from(result.data, "base64"));
}

function chromeDomInspection(target, profileDir, screenshotPath) {
  const url = `${storybookUrl}/iframe.html?id=${encodeURIComponent(target.storyId)}&viewMode=story`;
  const width = target.source?.width ?? 1672;
  const height = target.source?.height ?? 941;
  const chromeArgs = [
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
    `--window-size=${width},${height}`,
    url
  ];
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(chromePath, chromeArgs, { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    let settled = false;
    const timeout = setTimeout(() => finish(new Error(`Chrome render inspection timed out for ${target.storyId}`)), 60000);
    function finish(error, result) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 1000).unref();
      if (error) rejectPromise(new Error(`${error.message}: ${stderr.slice(-1000)}`));
      else resolvePromise(result);
    }
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("error", (error) => finish(error));
    (async () => {
      try {
        const port = await waitForDevToolsPort(profileDir);
        let inspection = null;
        for (let attempt = 0; attempt < 20; attempt += 1) {
          await new Promise((resolveDelay) => setTimeout(resolveDelay, 500));
          inspection = await evaluateVisibleStory(port, url);
          if (inspection.errorPatterns.length > 0 || (inspection.bodyTextLength > 0 && inspection.storyRootChildCount > 0)) break;
        }
        await captureVisibleStoryScreenshot(port, url, screenshotPath, width, height);
        finish(null, inspection);
      } catch (error) {
        finish(error instanceof Error ? error : new Error(String(error)));
      }
    })();
  });
}

function imageMetrics(sourcePath, currentPath, diffPath) {
  const source = PNG.sync.read(readFileSync(sourcePath));
  const current = PNG.sync.read(readFileSync(currentPath));
  const dimensionMatch = source.width === current.width && source.height === current.height;
  if (!dimensionMatch) {
    return {
      sourceDimensions: `${source.width}x${source.height}`,
      currentDimensions: `${current.width}x${current.height}`,
      dimensionMatch,
      differentPixelCount: null,
      differentPixelRatio: null,
      meanAbsoluteRgbDelta: null,
      currentRgbStdDev: null,
      visuallyBlank: null
    };
  }

  const diff = new PNG({ width: source.width, height: source.height });
  const differentPixelCount = pixelmatch(source.data, current.data, diff.data, source.width, source.height, {
    threshold: 0.1,
    includeAA: true
  });
  writeFileSync(diffPath, PNG.sync.write(diff));

  let absoluteDelta = 0;
  let sum = 0;
  let sumSquares = 0;
  const channelCount = source.width * source.height * 3;
  for (let index = 0; index < source.data.length; index += 4) {
    for (let channel = 0; channel < 3; channel += 1) {
      const sourceValue = source.data[index + channel];
      const currentValue = current.data[index + channel];
      absoluteDelta += Math.abs(sourceValue - currentValue);
      sum += currentValue;
      sumSquares += currentValue * currentValue;
    }
  }
  const mean = sum / channelCount;
  const variance = Math.max(0, sumSquares / channelCount - mean * mean);
  const currentRgbStdDev = Math.sqrt(variance);
  return {
    sourceDimensions: `${source.width}x${source.height}`,
    currentDimensions: `${current.width}x${current.height}`,
    dimensionMatch,
    differentPixelCount,
    differentPixelRatio: differentPixelCount / (source.width * source.height),
    meanAbsoluteRgbDelta: absoluteDelta / channelCount,
    currentRgbStdDev,
    visuallyBlank: currentRgbStdDev < 2
  };
}

async function captureTarget(target, index) {
  const stem = basename(target.image).replace(/\.(?:png|jpe?g|webp)$/i, "").replace(/[^A-Za-z0-9._-]+/g, "-");
  const currentPath = resolve(outputDir, `${stem}--current.png`);
  const diffPath = resolve(outputDir, `${stem}--diff.png`);
  const inspectionProfileDir = resolve(outputDir, `.chrome-inspection-profile-${index}`);
  removeChromeProfile(inspectionProfileDir);
  try {
    const previous = existingRowsByImage.get(target.image);
    const reusable =
      reuseExisting &&
      reusableReportContract &&
      previous?.storyId === target.storyId &&
      previous?.sourceSha256 === target.source?.sha256 &&
      previous?.renderValid === true &&
      (previous.renderErrors ?? []).length === 0 &&
      existsSync(currentPath) &&
      statSync(currentPath).size > 0 &&
      previous.currentSha256 === sha256(currentPath);
    if (!reusable) {
      rmSync(currentPath, { force: true });
      rmSync(diffPath, { force: true });
    }
    const renderInspection = reusable
      ? previous.renderInspection
      : await chromeDomInspection(target, inspectionProfileDir, currentPath);
    const capture = reusable
      ? {
          url: `${storybookUrl}/iframe.html?id=${encodeURIComponent(target.storyId)}&viewMode=story`,
          stderr: ""
        }
      : {
          url: `${storybookUrl}/iframe.html?id=${encodeURIComponent(target.storyId)}&viewMode=story`,
          stderr: ""
        };
    const metrics = imageMetrics(target.sourcePath, currentPath, diffPath);
    const renderErrors = renderInspection?.errorPatterns ?? ["missing-render-inspection"];
    const renderValid =
      renderErrors.length === 0 &&
      (renderInspection?.bodyTextLength ?? 0) > 0 &&
      (renderInspection?.storyRootChildCount ?? 0) > 0;
    return {
      image: target.image,
      storyId: target.storyId,
      storyUrl: capture.url,
      sourceSha256: sha256(target.sourcePath),
      currentSha256: sha256(currentPath),
      diffSha256: existsSync(diffPath) ? sha256(diffPath) : null,
      currentArtifact: currentPath.replace(`${root}/`, ""),
      diffArtifact: existsSync(diffPath) ? diffPath.replace(`${root}/`, "") : null,
      renderInspection,
      renderErrors,
      renderValid,
      status: metrics.dimensionMatch && !metrics.visuallyBlank && renderValid ? "captured" : "capture-invalid",
      ...metrics
    };
  } catch (error) {
    return {
      image: target.image,
      storyId: target.storyId,
      sourceSha256: target.source?.sha256 ?? null,
      status: "capture-failed",
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    removeChromeProfile(inspectionProfileDir);
  }
}

async function captureAll() {
  const rows = new Array(targets.length);
  let cursor = 0;
  async function worker() {
    while (cursor < targets.length) {
      const index = cursor;
      cursor += 1;
      rows[index] = await captureTarget(targets[index], index);
      console.log(`[${index + 1}/${targets.length}] ${rows[index].status}: ${targets[index].image}`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, targets.length) }, () => worker()));
  return rows;
}

const rows = await captureAll();
const capturedCount = rows.filter((row) => row.status === "captured").length;
const report = {
  schemaVersion: 8,
  generatedAt: new Date().toISOString(),
  status: capturedCount === rows.length ? "pass-captured-not-certified" : "fail-capture",
  note: "Screenshot and pixel-diff evidence only. No row is visually approved by an automatic threshold.",
  captureMode,
  storybookUrl,
  planSha256: sha256(planPath),
  targetContractSha256: targetContractSha256(),
  renderContractSha256: currentRenderContractSha256,
  storybookStaticIndexContractSha256: jsonContractSha256(storybookStaticIndexPath),
  sourceManifestContractSha256: sourceManifestContractSha256(sourceManifest),
  sourceManifestSha256: sha256(sourceManifestPath),
  eligibleTargetCount: allTargets.length,
  attemptedCount: rows.length,
  capturedCount,
  failedCount: rows.length - capturedCount,
  outputDir: outputDir.replace(`${root}/`, ""),
  rows
};
writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`);

const table = rows.map((row) =>
  `| \`${row.image}\` | \`${row.storyId}\` | ${row.status} | ${row.renderValid ? "valid" : row.renderErrors?.join(", ") || "invalid"} | ${row.currentDimensions ?? "-"} | ${row.meanAbsoluteRgbDelta?.toFixed(2) ?? "-"} | ${row.differentPixelRatio != null ? (row.differentPixelRatio * 100).toFixed(2) : "-"}% |`
).join("\n");
writeFileSync(reportMdPath, `# Visual Certification Capture Audit

Generated: ${report.generatedAt}

Status: ${report.status}

This report records reproducible source-sized Storybook screenshots and raw pixel-diff metrics. It does not approve visual parity automatically.

- Eligible pending targets with stories: ${report.eligibleTargetCount}
- Attempted: ${report.attemptedCount}
- Captured: ${report.capturedCount}
- Failed/invalid: ${report.failedCount}
- Local artifacts: \`${report.outputDir}\`

| Image | Story | Capture | Render | Dimensions | Mean RGB delta | Different pixels |
| --- | --- | --- | --- | --- | ---: | ---: |
${table}
`);

console.log(`Visual capture batch: ${report.status}; ${capturedCount}/${rows.length} captured.`);
if (report.status === "fail-capture") process.exit(1);

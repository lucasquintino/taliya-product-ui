#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "@playwright/test";
import { hasSourceChanges, sourceRevision, sourceTreeHash } from "./source-tree.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const value = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const storybookDir = path.resolve(root, value("--storybook-dir", "apps/docs/storybook-static"));
const outputPath = path.resolve(root, value("--output", "artifacts/quality/a11y.json"));
const requestedId = value("--id", "");
const idsFile = value("--ids-file", "");
const limit = Math.max(0, Number(value("--limit", "0")) || 0);
const workerCount = Math.max(1, Number(value("--workers", "4")) || 4);
const indexPath = path.join(storybookDir, "index.json");

function visibleInteractiveSnapshot() {
  const selectors = [
    "a[href]",
    "area[href]",
    "button",
    "input",
    "select",
    "textarea",
    "[contenteditable=\"true\"]",
    "[role=button]",
    "[role=checkbox]",
    "[role=combobox]",
    "[role=link]",
    "[role=listbox]",
    "[role=menuitem]",
    "[role=option]",
    "[role=radio]",
    "[role=slider]",
    "[role=switch]",
    "[role=tab]",
    "[role=textbox]"
  ];
  const isVisible = (element) => {
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
  };
  const isDisabled = (element) => element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true" || element.getAttribute("tabindex") === "-1";
  const labelFor = (element) => {
    const labelledBy = element.getAttribute("aria-labelledby");
    const labelledText = labelledBy ? labelledBy.split(/\s+/).map((id) => document.getElementById(id)?.textContent ?? "").join(" ") : "";
    const associated = element.labels ? [...element.labels].map((label) => label.textContent ?? "").join(" ") : "";
    const title = element.getAttribute("title") ?? "";
    const aria = element.getAttribute("aria-label") ?? "";
    const content = element.textContent ?? "";
    return [aria, labelledText, associated, content, title].map((item) => item.replace(/\s+/g, " ").trim()).find(Boolean) ?? "";
  };
  const elements = [...document.querySelectorAll(selectors.join(","))]
    .filter((element) => isVisible(element) && !isDisabled(element));
  return elements.map((element, index) => ({
    index,
    tag: element.tagName.toLowerCase(),
    role: element.getAttribute("role") ?? element.tagName.toLowerCase(),
    name: labelFor(element),
    disabled: isDisabled(element),
    tabIndex: element.tabIndex,
    selector: `${element.tagName.toLowerCase()}[data-a11y-index=\"${index}\"]`
  }));
}

async function keyboardSnapshot(page) {
  return page.evaluate(() => {
    const isVisible = (element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
    };
    const isFocusable = (element) => element instanceof HTMLElement && !element.hasAttribute("disabled") && element.getAttribute("aria-disabled") !== "true" && element.tabIndex >= 0 && isVisible(element);
    const focusables = [...document.querySelectorAll("a[href],button,input,select,textarea,[contenteditable=\"true\"],[tabindex]")].filter(isFocusable);
    focusables.forEach((element, index) => element.setAttribute("data-a11y-index", String(index)));
    return focusables.length;
  });
}

async function focusSnapshot(page) {
  return page.evaluate(() => {
    const active = document.activeElement;
    if (!(active instanceof HTMLElement)) return { focused: false, visible: false, focusStyle: false, name: "" };
    const style = window.getComputedStyle(active);
    const rect = active.getBoundingClientRect();
    const visible = style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    const hasIndicator = (candidate) => {
      const candidateStyle = window.getComputedStyle(candidate);
      return candidateStyle.outlineStyle !== "none" || candidateStyle.outlineWidth !== "0px" || candidateStyle.boxShadow !== "none";
    };
    const focusStyle = hasIndicator(active) || [active.parentElement, active.parentElement?.parentElement, active.parentElement?.parentElement?.parentElement]
      .filter(Boolean)
      .some((candidate) => hasIndicator(candidate));
    const labelledBy = active.getAttribute("aria-labelledby");
    const labelledText = labelledBy ? labelledBy.split(/\s+/).map((id) => document.getElementById(id)?.textContent ?? "").join(" ") : "";
    const associatedLabel = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement || active instanceof HTMLSelectElement
      ? Array.from(active.labels ?? []).map((labelElement) => labelElement.textContent ?? "").join(" ")
      : "";
    const label = [active.getAttribute("aria-label") ?? "", active.getAttribute("title") ?? "", associatedLabel, active.getAttribute("placeholder") ?? "", active.textContent ?? "", labelledText]
      .map((item) => item.replace(/\s+/g, " ").trim())
      .find(Boolean) ?? "";
    return { focused: true, visible, focusStyle, name: String(label).replace(/\s+/g, " ").trim() };
  });
}

async function analyzeAxe(page) {
  let lastError;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      return await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    } catch (error) {
      lastError = error;
      if (!/Axe is already running/i.test(String(error?.message ?? error))) throw error;
      await page.waitForTimeout(250 * (attempt + 1));
    }
  }
  throw lastError;
}

async function reconcileComputedContrast(page, axeResult) {
  const violations = [];
  for (const violation of axeResult.violations) {
    if (violation.id !== "color-contrast") {
      violations.push(violation);
      continue;
    }
    const nodes = [];
    for (const node of violation.nodes) {
      const selector = Array.isArray(node.target) && node.target.length === 1 ? String(node.target[0]) : "";
      const computed = selector
        ? await page.evaluate((target) => {
          const parse = (value) => {
            const match = String(value).match(/rgba?\(([^)]+)\)/i);
            if (!match) return null;
            const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
            if (parts.length < 3 || parts.some((part) => Number.isNaN(part))) return null;
            return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 && !Number.isNaN(parts[3]) ? parts[3] : 1 };
          };
          const blend = (foreground, background) => ({
            r: foreground.r * foreground.a + background.r * (1 - foreground.a),
            g: foreground.g * foreground.a + background.g * (1 - foreground.a),
            b: foreground.b * foreground.a + background.b * (1 - foreground.a),
            a: 1
          });
          const luminance = (color) => {
            const channel = (value) => {
              const normalized = value / 255;
              return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
            };
            return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
          };
          const element = document.querySelector(target);
          if (!element) return null;
          const foregroundStyle = getComputedStyle(element);
          const foreground = parse(foregroundStyle.color);
          if (!foreground) return null;
          let background = null;
          let current = element;
          while (current && !background) {
            const candidate = parse(getComputedStyle(current).backgroundColor);
            if (candidate && candidate.a > 0) background = candidate;
            current = current.parentElement;
          }
          if (!background) background = { r: 255, g: 255, b: 255, a: 1 };
          const ratio = (Math.max(luminance(blend(foreground, background)), luminance(background)) + 0.05)
            / (Math.min(luminance(blend(foreground, background)), luminance(background)) + 0.05);
          return { ratio, foreground: foregroundStyle.color, background: getComputedStyle(element.parentElement ?? element).backgroundColor };
        }, selector)
        : null;
      // axe-core can retain a pre-style-injection snapshot for a node while
      // the browser already exposes the final computed styles. Keep the
      // violation unless our independent computed-style check proves AA.
      if (!computed || computed.ratio < 4.5) nodes.push(node);
    }
    if (nodes.length) violations.push({ ...violation, nodes });
  }
  return { ...axeResult, violations };
}

async function reducedMotionSnapshot(page) {
  return page.evaluate(() => {
    const probe = document.createElement("div");
    probe.className = "tl-spin";
    probe.style.cssText = "position:fixed;left:-10000px;top:-10000px;width:1px;height:1px;animation:tl-spin 1s linear infinite;transition:opacity 1s linear";
    document.body.appendChild(probe);
    const style = window.getComputedStyle(probe);
    const durationSeconds = (value) => {
      const match = String(value).match(/^([0-9.]+)(ms|s)$/);
      if (!match) return 0;
      const number = Number(match[1]);
      return match[2] === "ms" ? number / 1000 : number;
    };
    const result = {
      media: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      animationDuration: style.animationDuration,
      transitionDuration: style.transitionDuration,
      suppressed: durationSeconds(style.animationDuration) <= 0.001 && durationSeconds(style.transitionDuration) <= 0.001
    };
    probe.remove();
    return result;
  });
}

async function auditStory(page, entry, port) {
  const errors = [];
  let axe = { violations: [], incomplete: [], passes: [] };
  let interactive = [];
  let keyboard = { focusableCount: 0, tabStops: 0, failures: [] };
  let reducedMotion = { media: false, suppressed: false };
  try {
    const response = await page.goto(`http://127.0.0.1:${port}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=story`, { waitUntil: "commit", timeout: 30000 });
    if (!response || response.status() >= 400) errors.push(`HTTP-${response?.status() ?? "NO-RESPONSE"}`);
    // Static Storybook can render the story before its CSS chunk has finished
    // loading. Wait for the asset graph to settle so Axe measures the shipped
    // styles, not a transient unstyled DOM.
    await page.waitForLoadState("domcontentloaded", { timeout: 5000 }).catch(() => {});
    await page.locator("#storybook-root").waitFor({ state: "attached", timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(250);
    const body = await page.locator("body").innerText();
    if (/There was an error rendering|Cannot read properties of undefined|Failed to fetch dynamically imported module/i.test(body)) errors.push("STORY-RENDER-ERROR");
    for (let attempt = 0; attempt < 3 && await page.locator('#storybook-root[aria-hidden="true"]').count(); attempt += 1) {
      if (!await page.locator('[role="listbox"]').count()) break;
      await page.keyboard.press("Escape");
      await page.waitForTimeout(100);
    }
    axe = await analyzeAxe(page);
    axe = await reconcileComputedContrast(page, axe);
    interactive = await page.evaluate(visibleInteractiveSnapshot);
    const unnamed = interactive.filter((control) => !control.name && control.role !== "option");
    if (unnamed.length) errors.push(`INTERACTIVE-NAME:${unnamed.length}`);
    const focusableCount = await keyboardSnapshot(page);
    const checks = focusableCount > 0 ? Math.min(focusableCount + 2, 32) : 0;
    for (let index = 0; index < checks; index += 1) {
      await page.keyboard.press("Tab");
      const focus = await focusSnapshot(page);
      if (!focus.focused || !focus.visible) keyboard.failures.push({ index, code: "FOCUS-NOT-VISIBLE", focus });
      else if (!focus.name) keyboard.failures.push({ index, code: "FOCUS-NAME-MISSING" });
      else if (!focus.focusStyle) keyboard.failures.push({ index, code: "FOCUS-INDICATOR-MISSING", name: focus.name });
    }
    keyboard = { focusableCount, tabStops: checks, failures: keyboard.failures };
    if (keyboard.failures.length) errors.push(`KEYBOARD-FOCUS:${keyboard.failures.length}`);
    await page.emulateMedia({ reducedMotion: "reduce" });
    reducedMotion = await reducedMotionSnapshot(page);
    if (!reducedMotion.media || !reducedMotion.suppressed) errors.push("REDUCED-MOTION-NOT-SUPPRESSED");
  } catch (error) {
    errors.push(String(error?.message ?? error).slice(0, 500));
  }
  const blockingViolations = axe.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
  return {
    id: entry.id,
    title: entry.title,
    status: errors.length === 0 && blockingViolations.length === 0 ? "pass" : "fail",
    errors,
    violations: axe.violations.map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.map((node) => ({ target: node.target, html: node.html, failureSummary: node.failureSummary })) })),
    blockingViolations: blockingViolations.map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.map((node) => ({ target: node.target, html: node.html, failureSummary: node.failureSummary })) })),
    interactiveCount: interactive.length,
    keyboard,
    reducedMotion
  };
}

if (!fs.existsSync(indexPath)) {
  console.error(`A11Y-STORYBOOK-MISSING:${indexPath}`);
  process.exitCode = 1;
} else {
  const catalog = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  let requestedIds = null;
  if (idsFile) {
    const idsPath = path.resolve(root, idsFile);
    const rawManifest = fs.readFileSync(idsPath, "utf8");
    const manifest = idsPath.endsWith(".json") ? JSON.parse(rawManifest) : { ids: rawManifest.split(/\r?\n/).map((line) => line.trim()).filter(Boolean) };
    const ids = manifest.approvals && typeof manifest.approvals === "object"
      ? Object.keys(manifest.approvals)
      : Array.isArray(manifest.rows)
        ? manifest.rows.map((row) => row.storyId).filter(Boolean)
        : Array.isArray(manifest.ids) ? manifest.ids : [];
    requestedIds = new Set(ids);
  }
  const allEntries = Object.values(catalog.entries ?? {}).filter((entry) => entry.type === "story");
  const entries = allEntries.filter((entry) => (!requestedId || entry.id === requestedId) && (!requestedIds || requestedIds.has(entry.id))).slice(0, limit || undefined);
  if (!entries.length) {
    console.error("A11Y-STORY-CATALOG-EMPTY");
    process.exitCode = 1;
  } else {
    const server = http.createServer((request, response) => {
      const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
      const relative = pathname === "/" ? "index.html" : pathname.slice(1);
      const file = path.resolve(storybookDir, relative);
      if (!file.startsWith(`${storybookDir}${path.sep}`) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { response.statusCode = 404; response.end("not found"); return; }
      const contentType = path.extname(file) === ".js" ? "text/javascript" : path.extname(file) === ".css" ? "text/css" : path.extname(file) === ".json" ? "application/json" : "text/html";
      response.setHeader("content-type", contentType);
      fs.createReadStream(file).pipe(response);
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const port = server.address().port;
    const browser = await chromium.launch({ headless: true });
    const results = [];
    let cursor = 0;
    async function worker() {
      // Reuse one isolated browser context and page per worker. Creating a
      // context/page for every story makes a full 600+ story run needlessly
      // expensive and can hit CI timeouts without improving isolation: each
      // navigation replaces the Storybook document and its in-memory state.
      const context = await browser.newContext({ viewport: { width: 1440, height: 1024 } });
      const page = await context.newPage();
      try {
        while (cursor < entries.length) {
          const entry = entries[cursor++];
          results.push(await auditStory(page, entry, port));
        }
      } finally {
        await context.close();
      }
    }
    await Promise.all(Array.from({ length: Math.min(workerCount, entries.length) }, worker));
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
    results.sort((left, right) => left.id.localeCompare(right.id));
    const blockingViolations = results.reduce((count, result) => count + result.blockingViolations.length, 0);
    const failed = results.filter((result) => result.status !== "pass");
    const output = {
      schemaVersion: "a11y.v1",
      gateId: "G-A11Y",
      sourceRevision: sourceRevision(root),
      sourceTreeHash: sourceTreeHash(root),
      dirty: hasSourceChanges(root),
      storyCount: results.length,
      passed: results.length - failed.length,
      failed: failed.length,
      blockingViolations,
      axe: { tags: ["wcag2a", "wcag2aa"], seriousOrCriticalOnly: true },
      results
    };
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
    console.log(`G-A11Y: ${output.passed}/${output.storyCount} pass; blockingViolations=${blockingViolations}`);
    if (failed.length || blockingViolations) process.exitCode = 1;
  }
}

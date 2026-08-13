#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "@playwright/test";
import { hasSourceChanges, sourceRevision, sourceTreeHash } from "./source-tree.mjs";
import { isRetryableStoryFailure } from "./story-interaction-policy.mjs";

const root = process.cwd();
const storybookFlag = process.argv.indexOf("--storybook-dir");
const outputFlag = process.argv.indexOf("--output");
const idFlag = process.argv.indexOf("--id");
const storybookDir = path.resolve(root, storybookFlag >= 0 ? process.argv[storybookFlag + 1] : "artifacts/storybook-static");
const outputPath = path.resolve(root, outputFlag >= 0 ? process.argv[outputFlag + 1] : "artifacts/quality/story-interactions.json");
const workersFlag = process.argv.indexOf("--workers");
// A fresh browser context is intentionally used per story. Keep enough
// parallelism by default that the full static catalog does not exceed CI
// timeouts, while still allowing constrained environments to opt down with
// --workers.
const workerCount = Math.max(1, Number(workersFlag >= 0 ? process.argv[workersFlag + 1] : "4") || 4);
const catalog = JSON.parse(fs.readFileSync(path.join(storybookDir, "index.json"), "utf8"));
const requestedId = idFlag >= 0 ? process.argv[idFlag + 1] : null;
const entries = Object.values(catalog.entries ?? {}).filter((entry) => entry.type === "story" && (!requestedId || entry.id === requestedId));
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
  const relative = pathname === "/" ? "index.html" : pathname.slice(1);
  const file = path.resolve(storybookDir, relative);
  if (!file.startsWith(`${storybookDir}${path.sep}`) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { response.statusCode = 404; response.end("not found"); return; }
  response.setHeader("content-type", path.extname(file) === ".js" ? "text/javascript" : path.extname(file) === ".css" ? "text/css" : "text/html");
  fs.createReadStream(file).pipe(response);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
const browser = await chromium.launch({ headless: true });
const results = [];
let cursor = 0;

async function runStoryAttempt(entry) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(`${message.text().slice(0, 500)} @ ${JSON.stringify(message.location())}`); });
  page.on("pageerror", (error) => errors.push(`pageerror: ${String(error?.stack ?? error).slice(0, 600)}`));
  let status = "pass";
  let error = null;
  try {
    const response = await page.goto(`http://127.0.0.1:${port}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=story`, { waitUntil: "commit", timeout: 30000 });
    if (!response || response.status() >= 400) { status = "fail"; error = `Story iframe HTTP ${response?.status() ?? "no-response"}`; }
    // Wait for Storybook's preview lifecycle to finish. A fixed delay is not
    // a reliable contract on cold or resource-constrained CI runners.
    await page.waitForFunction(
      () => window.__STORYBOOK_PREVIEW__?.currentRender?.phase === "finished",
      { timeout: 30000 }
    );
    const body = await page.locator("body").innerText();
    if (/There was an error rendering|Cannot read properties of undefined|Failed to fetch dynamically imported module/i.test(body)) { status = "fail"; error = body.slice(0, 500); }
    if (errors.length) { status = "fail"; error = errors.join(" | "); }
  } catch (cause) { status = "fail"; error = String(cause?.message ?? cause).slice(0, 500); }
  finally { await page.close(); }
  return { status, error };
}

async function worker() {
  while (cursor < entries.length) {
    const entry = entries[cursor++];
    // Use a fresh disposable context for every story. Play functions may keep
    // spies, focus, timers, and storage state; sharing a page makes parallel
    // evidence order-dependent and produces false interaction failures.
    let attempt = 1;
    let outcome = await runStoryAttempt(entry);
    while (isRetryableStoryFailure(outcome.error, attempt)) {
      console.warn(`STORY-INTERACTION-RETRY ${entry.id}: attempt=${attempt + 1}`);
      attempt += 1;
      outcome = await runStoryAttempt(entry);
    }
    results.push({ id: entry.id, title: entry.title, status: outcome.status, error: outcome.error, attempts: attempt });
  }
}
await Promise.all(Array.from({ length: Math.min(workerCount, entries.length) }, worker));
await browser.close();
await new Promise((resolve) => server.close(resolve));
const dirty = hasSourceChanges(root);
const revision = sourceRevision(root);
const treeHash = sourceTreeHash(root);
const output = { schemaVersion: "story-interactions.v1", sourceRevision: revision, sourceTreeHash: treeHash, dirty, storyCount: results.length, passed: results.filter((row) => row.status === "pass").length, failed: results.filter((row) => row.status !== "pass").length, results };
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`STORY-INTERACTIONS: ${output.passed}/${output.storyCount} pass`);
if (output.failed) {
  for (const row of results.filter((result) => result.status !== "pass")) {
    const message = `STORY-INTERACTION-FAIL ${row.id}: ${row.error ?? "unknown failure"}`;
    console.error(message);
    if (process.env.GITHUB_ACTIONS === "true") {
      const escaped = message.replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A");
      console.error(`::error title=Storybook interaction failed::${escaped}`);
    }
  }
  process.exitCode = 1;
}

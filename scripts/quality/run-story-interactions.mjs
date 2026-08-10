#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import crypto from "node:crypto";
import http from "node:http";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { chromium } from "@playwright/test";
import { hasSourceChanges } from "./source-identity.mjs";

const root = process.cwd();
const storybookFlag = process.argv.indexOf("--storybook-dir");
const outputFlag = process.argv.indexOf("--output");
const idFlag = process.argv.indexOf("--id");
const storybookDir = path.resolve(root, storybookFlag >= 0 ? process.argv[storybookFlag + 1] : "artifacts/storybook-static");
const outputPath = path.resolve(root, outputFlag >= 0 ? process.argv[outputFlag + 1] : "artifacts/quality/story-interactions.json");
const workersFlag = process.argv.indexOf("--workers");
const workerCount = Math.max(1, Number(workersFlag >= 0 ? process.argv[workersFlag + 1] : "1") || 1);
const isGeneratedEvidencePath = (relative) => relative.startsWith("artifacts/") || /^specs\/001-product-ui-foundation\/.*-audit(?:-[^/]+)?\.(?:json|md)$/.test(relative);
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
async function worker() {
  while (cursor < entries.length) {
    const entry = entries[cursor++];
    // Use a fresh disposable context for every story. Play functions may keep
    // spies, focus, timers, and storage state; sharing a page makes parallel
    // evidence order-dependent and produces false interaction failures.
    const page = await browser.newPage();
    const errors = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(`${message.text().slice(0, 500)} @ ${JSON.stringify(message.location())}`); });
    page.on("pageerror", (error) => errors.push(`pageerror: ${String(error?.stack ?? error).slice(0, 600)}`));
    let status = "pass";
    let error = null;
    try {
      const response = await page.goto(`http://127.0.0.1:${port}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=story`, { waitUntil: "commit", timeout: 30000 });
      if (!response || response.status() >= 400) { status = "fail"; error = `Story iframe HTTP ${response?.status() ?? "no-response"}`; }
      // Allow Storybook's async `play` phase and React effects to settle before
      // inspecting console/page errors. A short fixed delay caused intermittent
      // false negatives in long setup stories on cold static builds.
      await page.waitForTimeout(800);
      const body = await page.locator("body").innerText();
      if (/There was an error rendering|Cannot read properties of undefined|Failed to fetch dynamically imported module/i.test(body)) { status = "fail"; error = body.slice(0, 500); }
      if (errors.length) { status = "fail"; error = errors.join(" | "); }
    } catch (cause) { status = "fail"; error = String(cause?.message ?? cause).slice(0, 500); }
    results.push({ id: entry.id, title: entry.title, status, error });
    await page.close();
  }
}
await Promise.all(Array.from({ length: Math.min(workerCount, entries.length) }, worker));
await browser.close();
await new Promise((resolve) => server.close(resolve));
const sourceRevision = process.env.GIT_COMMIT ?? spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).stdout.trim();
const dirty = hasSourceChanges(root);
const sourceTreeHash = (() => {
  const listing = spawnSync("git", ["ls-files", "-co", "--exclude-standard", "-z"], { cwd: root, encoding: "buffer" }).stdout.toString("utf8");
  const rows = listing.split("\0").filter(Boolean).map((relative) => relative.replaceAll("\\", "/")).filter((relative) => !isGeneratedEvidencePath(relative)).sort().map((relative) => {
    const raw = fs.readFileSync(path.join(root, relative));
    const normalized = raw.toString("utf8").replace(/\r\n?/g, "\n");
    return `${relative}\0${crypto.createHash("sha256").update(normalized).digest("hex")}\0${raw.length}\n`;
  });
  return crypto.createHash("sha256").update(rows.join("")).digest("hex");
})();
const output = { schemaVersion: "story-interactions.v1", sourceRevision, sourceTreeHash, dirty, storyCount: results.length, passed: results.filter((row) => row.status === "pass").length, failed: results.filter((row) => row.status !== "pass").length, results };
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`STORY-INTERACTIONS: ${output.passed}/${output.storyCount} pass`);
if (output.failed) process.exitCode = 1;

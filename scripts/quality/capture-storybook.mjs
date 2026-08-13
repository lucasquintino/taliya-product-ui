#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "@playwright/test";
import { hasSourceChanges } from "./source-identity.mjs";
import { sourceRevision as canonicalSourceRevision, sourceTreeHash as canonicalSourceTreeHash } from "./source-tree.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const value = (flag, fallback) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : fallback; };
const storybookDir = path.resolve(root, value("--storybook-dir", "artifacts/storybook-static"));
const outputDir = path.resolve(root, value("--output-dir", "artifacts/visual/captures"));
const reportPath = path.resolve(root, value("--report", "artifacts/visual/capture-report.json"));
const mergeReportOption = value("--merge-report", "");
const mergeReportPath = mergeReportOption ? path.resolve(root, mergeReportOption) : "";
const requestedIds = value("--ids", "").split(",").filter(Boolean);
const navigationTimeout = Number(value("--timeout", "10000"));
const screenshotTimeout = Number(value("--screenshot-timeout", "30000"));
const measureOnly = args.includes("--measure-only");
const indexPath = path.join(storybookDir, "index.json");

function digestRows(rows) {
  return crypto.createHash("sha256").update(rows.join(""), "utf8").digest("hex");
}

function fileDigest(file) {
  const raw = fs.readFileSync(file);
  try {
    return crypto.createHash("sha256").update(raw.toString("utf8").replace(/\r\n?/g, "\n"), "utf8").digest("hex");
  } catch {
    return crypto.createHash("sha256").update(raw).digest("hex");
  }
}

function sourceIdentity() {
  return { commitSha: canonicalSourceRevision(root), dirty: hasSourceChanges(root), sourceTreeHash: canonicalSourceTreeHash(root) };
}

function buildHash() {
  const files = [];
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.isFile()) files.push(file);
    }
  };
  visit(storybookDir);
  const rows = files.sort().map((file) => `${path.relative(storybookDir, file).replaceAll("\\", "/")}\0${fileDigest(file)}\0${fs.statSync(file).size}\n`);
  return digestRows(rows);
}

if (!fs.existsSync(indexPath)) { console.error(`CAPTURE-STORYBOOK-MISSING:${indexPath}`); process.exitCode = 1; }
else {
  const catalog = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  const identity = sourceIdentity();
  const staticBuildHash = buildHash();
  const limit = Number(value("--limit", "0"));
  const entries = Object.values(catalog.entries ?? {}).filter((entry) => entry.type === "story" && (!requestedIds.length || requestedIds.includes(entry.id))).slice(0, limit > 0 ? limit : undefined);
  fs.mkdirSync(outputDir, { recursive: true });
  const contentType = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
  const server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const file = path.resolve(storybookDir, relative);
    if (!file.startsWith(`${storybookDir}${path.sep}`) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { response.statusCode = 404; response.end("not found"); return; }
    response.setHeader("content-type", contentType[path.extname(file).toLowerCase()] ?? "application/octet-stream");
    fs.createReadStream(file).pipe(response);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const results = [];
  let next = 0;
  const captureWorker = async () => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 1 });
    while (next < entries.length) {
      const entry = entries[next++];
      const started = Date.now();
      let status = "pass";
      let error = null;
      const fileName = `${entry.id}.png`;
      try {
        const response = await page.goto(`http://127.0.0.1:${port}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=story`, { waitUntil: "commit", timeout: navigationTimeout });
        if (!response || response.status() >= 400) throw new Error(`Story iframe HTTP ${response?.status() ?? "no-response"}`);
        await page.waitForTimeout(1000);
        await page.evaluate(() => Promise.race([document.fonts?.ready, new Promise((resolve) => setTimeout(resolve, 1000))]));
        if (!measureOnly) await page.screenshot({ path: path.join(outputDir, fileName), fullPage: false, timeout: screenshotTimeout });
      } catch (cause) {
        status = "fail";
        error = String(cause?.message ?? cause).slice(0, 500);
      }
      const imagePath = path.join(outputDir, fileName);
      const layout = status === "pass" ? await page.evaluate(() => ({ viewportWidth: window.innerWidth, clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 })) : null;
      results.push({ id: entry.id, importPath: entry.importPath, title: entry.title, viewport: { width: 1440, height: 1024, deviceScaleFactor: 1 }, browser: "chromium", fontReady: status === "pass", theme: "light", density: "comfortable", locale: "pt-BR", status, error, durationMs: Date.now() - started, layout, image: !measureOnly && status === "pass" ? fileName : null, sha256: !measureOnly && status === "pass" ? crypto.createHash("sha256").update(fs.readFileSync(imagePath)).digest("hex") : null });
    }
    await page.close();
  };
  await Promise.all(Array.from({ length: Math.min(4, entries.length) }, captureWorker));
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  let report = { schemaVersion: "storybook-capture.v1", sourceRevision: identity.commitSha, sourceTreeHash: identity.sourceTreeHash, dirty: identity.dirty, buildHash: staticBuildHash, storybookDir: path.relative(root, storybookDir).replaceAll("\\", "/"), outputDir: path.relative(root, outputDir).replaceAll("\\", "/"), generatedAt: "deterministic", storyCount: results.length, passed: results.filter((row) => row.status === "pass").length, failed: results.filter((row) => row.status === "fail").length, results };
  if (mergeReportPath && fs.existsSync(mergeReportPath)) {
    const previous = JSON.parse(fs.readFileSync(mergeReportPath, "utf8"));
    const replacementById = new Map(results.map((row) => [row.id, row]));
    const mergedResults = (previous.results ?? []).map((row) => replacementById.get(row.id) ?? row);
    report = { ...previous, sourceRevision: report.sourceRevision, sourceTreeHash: report.sourceTreeHash, dirty: report.dirty, buildHash: report.buildHash, storybookDir: report.storybookDir, outputDir: report.outputDir, generatedAt: report.generatedAt, storyCount: mergedResults.length, passed: mergedResults.filter((row) => row.status === "pass").length, failed: mergedResults.filter((row) => row.status === "fail").length, results: mergedResults };
  }
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`STORYBOOK-CAPTURE: ${report.passed}/${report.storyCount} pass`);
  if (report.failed) process.exitCode = 1;
}

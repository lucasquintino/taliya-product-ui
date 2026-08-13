#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { resolveSourceAssetsDir } from "../source-assets-config.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const value = (flag, fallback) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : fallback; };
const captureReportPath = path.resolve(root, value("--report", "artifacts/visual/capture-report.json"));
const baselineDir = path.resolve(root, value("--baseline-dir", "artifacts/visual/baselines"));
const captureDir = path.resolve(root, value("--capture-dir", "artifacts/visual/captures"));
const defaultApprovals = fs.existsSync(path.join(root, "specs/001-product-ui-foundation/visual-approvals.json"))
  ? "specs/001-product-ui-foundation/visual-approvals.json"
  : "artifacts/visual/approvals.json";
const approvalsPath = path.resolve(root, value("--approvals", defaultApprovals));
const requiredPath = path.resolve(root, value("--required", "specs/001-product-ui-foundation/visual-certification-capture-audit.json"));
const outputPath = path.resolve(root, value("--output", "artifacts/visual/visual-comparison.json"));
const compareAllStories = args.includes("--all");
const approvedRenderHashMode = args.includes("--approved-render-hash");
const updateBaseline = args.includes("--update-baseline");
if (updateBaseline && !compareAllStories) throw new Error("VISUAL-COMPARE-UPDATE-BASELINE-REQUIRES-ALL: canonical source images are immutable");

const report = JSON.parse(fs.readFileSync(captureReportPath, "utf8"));
const approvals = fs.existsSync(approvalsPath) ? JSON.parse(fs.readFileSync(approvalsPath, "utf8")) : { approvals: {} };
const captureById = new Map((report.results ?? []).map((row) => [row.id, row]));
const sourceDir = compareAllStories || approvedRenderHashMode ? null : resolveSourceAssetsDir({ root, args, requireExisting: true }).path;
const required = compareAllStories ? null : JSON.parse(fs.readFileSync(requiredPath, "utf8"));
const requiredRows = compareAllStories ? [] : (required.rows ?? []);

function readPng(file) {
  if (!file || !fs.existsSync(file)) return null;
  try { return PNG.sync.read(fs.readFileSync(file)); } catch { return null; }
}

function fileHash(file) {
  return file && fs.existsSync(file) ? crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex") : null;
}

function comparePng(before, after) {
  const captureDimensions = { width: after.width, height: after.height };
  const baselineDimensions = { width: before.width, height: before.height };
  if (before.width !== after.width || before.height !== after.height) return { status: "dimension-mismatch", diffPixels: 0, captureDimensions, baselineDimensions };
  const diffPixels = pixelmatch(before.data, after.data, null, before.width, before.height, { threshold: 0.1, includeAA: true });
  return { status: diffPixels > 0 ? "diff" : "pass", diffPixels, captureDimensions, baselineDimensions };
}

function approvalDecision(id) {
  const approval = approvals.approvals?.[id] ?? null;
  if (approval?.status === "approved") return "approved";
  if (approval?.status === "rejected" || approval?.status === "needs-work") return "rejected";
  return "pending";
}

function sourceBackedTargets() {
  return requiredRows.map((row) => {
    const id = row.storyId;
    const capture = captureById.get(id);
    const currentArtifact = row.captureEvidence?.currentArtifact ?? row.currentArtifact ?? null;
    const historicalCurrentPath = currentArtifact ? path.resolve(root, currentArtifact.replaceAll("\\", "/")) : null;
    const capturedCurrentPath = row.image ? path.join(captureDir, row.image) : null;
    const currentPath = historicalCurrentPath && fs.existsSync(historicalCurrentPath) ? historicalCurrentPath : capturedCurrentPath;
    const sourcePath = approvedRenderHashMode ? null : row.image ? path.resolve(sourceDir, row.image) : null;
    return { id, image: row.image ?? null, capture, sourcePath, currentPath, mode: "source-backed" };
  });
}

function allStoryTargets() {
  if (updateBaseline) fs.mkdirSync(baselineDir, { recursive: true });
  return (report.results ?? []).map((capture) => ({
    id: capture.id,
    image: capture.image ?? null,
    capture,
    sourcePath: capture.image ? path.join(baselineDir, capture.image) : null,
    currentPath: capture.image ? path.join(captureDir, capture.image) : null,
    mode: "storybook-baseline"
  }));
}

const targets = compareAllStories ? allStoryTargets() : sourceBackedTargets();
const results = targets.map((target) => {
  const approval = approvals.approvals?.[target.id] ?? null;
  const beforePath = target.sourcePath;
  const afterPath = target.currentPath;
  if (updateBaseline && afterPath && fs.existsSync(afterPath)) fs.copyFileSync(afterPath, beforePath);
  const before = readPng(beforePath);
  const after = readPng(afterPath);
  let rawStatus = "pass";
  let diffPixels = 0;
  let captureDimensions = null;
  let baselineDimensions = null;
  const approvedCurrentSha = approvals.approvals?.[target.id]?.currentSha256 ?? null;
  let renderHashMatch = null;
  if (approvedRenderHashMode) {
    if (!after) rawStatus = "evidence-missing";
    else if (!approvedCurrentSha) rawStatus = "approved-render-hash-missing";
    else {
      renderHashMatch = fileHash(afterPath) === approvedCurrentSha;
      rawStatus = renderHashMatch ? "pass" : "platform-render-variance";
    }
  } else if (!before || !after) rawStatus = "evidence-missing";
  else {
    const compared = comparePng(before, after);
    ({ status: rawStatus, diffPixels, captureDimensions, baselineDimensions } = compared);
  }
  const decision = approvalDecision(target.id);
  const status = rawStatus === "evidence-missing" || rawStatus === "approved-render-hash-missing"
    ? "evidence-missing"
    : rawStatus === "platform-render-variance"
      ? "pass"
    : decision === "approved"
      ? "pass"
      : decision === "rejected"
        ? "needs-work"
        : "approval-missing";
  return {
    id: target.id,
    image: target.image,
    mode: target.mode,
    rawStatus,
    status,
    diffPixels,
    captureDimensions,
    baselineDimensions,
    sourceSha256: approvedRenderHashMode ? (approvals.approvals?.[target.id]?.sourceSha256 ?? null) : fileHash(beforePath),
    currentSha256: fileHash(afterPath),
    renderHashMatch,
    approval: approval?.status ?? null,
    sourcePath: beforePath ? path.relative(root, beforePath).replaceAll("\\", "/") : null,
    currentPath: afterPath ? path.relative(root, afterPath).replaceAll("\\", "/") : null
  };
});

const output = {
  schemaVersion: "visual-comparison.v2",
  comparisonMode: compareAllStories ? "storybook-baseline" : approvedRenderHashMode ? "approved-render-hash" : "canonical-source-backed",
  sourceRevision: report.sourceRevision,
  sourceTreeHash: report.sourceTreeHash ?? null,
  buildHash: report.buildHash ?? null,
  dirty: report.dirty ?? null,
  captureReport: path.relative(root, captureReportPath).replaceAll("\\", "/"),
  requiredReview: compareAllStories ? null : path.relative(root, requiredPath).replaceAll("\\", "/"),
  baselineDir: compareAllStories ? path.relative(root, baselineDir).replaceAll("\\", "/") : null,
  generatedAt: "deterministic",
  storyCount: results.length,
  passed: results.filter((row) => row.status === "pass").length,
  failures: results.filter((row) => row.status !== "pass"),
  results
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`VISUAL-COMPARE: ${output.passed}/${output.storyCount} pass (mode=${output.comparisonMode})`);
if (output.failures.length) process.exitCode = 1;

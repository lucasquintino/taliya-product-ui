#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const sddRelative = "specs/006-engineering-quality-hardening";
const sdd = path.join(root, sddRelative);
const outputPath = path.join(sdd, "readiness-manifest.json");
const excluded = new Set([
  `${sddRelative}/approval.md`,
  `${sddRelative}/readiness-manifest.json`
]);
const fixed = new Set([
  ".specify/feature.json",
  ".specify/memory/constitution.md",
  ".specify/templates/checklist-template.md",
  ".specify/templates/plan-template.md",
  ".specify/templates/spec-template.md",
  ".specify/templates/tasks-template.md",
  ".specify/workflows/speckit/workflow.yml",
  ".specify/workflows/workflow-registry.json",
  ".specify/integrations/codex.manifest.json",
  "AGENTS.md",
  "README.md"
]);

const codexManifestPath = path.join(root, ".specify", "integrations", "codex.manifest.json");
if (fs.existsSync(codexManifestPath)) {
  const codexManifest = JSON.parse(fs.readFileSync(codexManifestPath, "utf8"));
  for (const skillPath of Object.keys(codexManifest.files ?? {})) fixed.add(skillPath);
}

function normalizedBytes(relativePath) {
  const raw = fs.readFileSync(path.join(root, relativePath));
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(raw);
    return Buffer.from(raw.toString("utf8").replace(/\r\n?/g, "\n"), "utf8");
  } catch {
    return raw;
  }
}

function sha256(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

const sddFiles = fs.readdirSync(sdd, { recursive: true })
  .filter((file) => fs.statSync(path.join(sdd, file)).isFile())
  .map((file) => path.posix.join(sddRelative, file.replaceAll("\\", "/")))
  .filter((file) => !excluded.has(file));
const artifactPaths = [...new Set([...fixed, ...sddFiles])].sort();
const artifacts = artifactPaths.map((relativePath) => {
  const bytes = normalizedBytes(relativePath);
  return { path: relativePath, sha256: sha256(bytes), sizeBytes: bytes.length };
});
const artifactRows = artifacts.map((entry) => `${entry.path}\0${entry.sha256}\0${entry.sizeBytes}\n`).join("");
const artifactManifestHash = sha256(Buffer.from(artifactRows, "utf8"));

const gitFiles = spawnSync("git", ["ls-files", "-co", "--exclude-standard", "-z"], { cwd: root, encoding: "buffer" }).stdout
  .toString("utf8")
  .split("\0")
  .filter(Boolean)
  .map((file) => file.replaceAll("\\", "/"))
  .filter((file) => !excluded.has(file));
const sourcePaths = [...new Set(gitFiles)].filter((relativePath) => fs.existsSync(path.join(root, relativePath))).sort();
const sourceRows = sourcePaths.map((relativePath) => {
  const bytes = normalizedBytes(relativePath);
  return `${relativePath}\0${sha256(bytes)}\0${bytes.length}\n`;
}).join("");
const sourceTreeHash = sha256(Buffer.from(sourceRows, "utf8"));
const candidateBaseRevision = spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).stdout.trim();

const manifest = {
  schemaVersion: "1.0.0",
  featureId: "006-engineering-quality-hardening",
  lifecycle: "READY_FOR_APPROVAL",
  generatedAt: new Date().toISOString(),
  candidateBaseRevision,
  candidateDirty: spawnSync("git", ["status", "--porcelain", "--untracked-files=all"], { cwd: root, encoding: "utf8" }).stdout.trim().length > 0,
  contentNormalization: "utf8-lf",
  sourceTreeNormalization: "utf8-text-lf;binary-raw",
  sourceTreeScope: "git-tracked-plus-nonignored-untracked-excluding-decision-envelope-and-manifest",
  sourceTreeFileCount: sourcePaths.length,
  sourceTreeHash,
  artifactCount: artifacts.length,
  artifactManifestHash,
  excludedDecisionEnvelope: `${sddRelative}/approval.md`,
  artifacts
};
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`SDD readiness manifest: ${artifacts.length} artifacts, ${sourcePaths.length} source files, base ${candidateBaseRevision}`);

#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { hasSourceChanges } from "./source-identity.mjs";
import { sourceRevision, sourceTreeHash } from "./source-tree.mjs";

const root = process.cwd();
const manifestPath = path.join(root, "specs/002-readiness-evidence-portability/source-assets-manifest.json");
const reconciliationPath = path.join(root, "specs/002-readiness-evidence-portability/source-assets-reconciliation-audit.json");
const outputPath = path.join(root, "artifacts/quality/g-source-assets.json");
const readJson = (file) => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const revision = sourceRevision(root);
const sourceDirty = hasSourceChanges(root);
const treeHash = sourceTreeHash(root);
const manifest = readJson(manifestPath);
const reconciliation = readJson(reconciliationPath);
const failures = [];

if (!manifest) failures.push("SOURCE-ASSETS-MANIFEST-MISSING");
if (!reconciliation) failures.push("SOURCE-ASSETS-RECONCILIATION-MISSING");
if (manifest && (manifest.schemaVersion !== 2 || manifest.status !== "pass")) failures.push("SOURCE-ASSETS-MANIFEST-STATUS");
if (reconciliation && (reconciliation.schemaVersion !== 2 || reconciliation.status !== "pass")) failures.push("SOURCE-ASSETS-RECONCILIATION-STATUS");
if (manifest && (manifest.imageCount < manifest.routeTargetCount || manifest.availableRouteTargetCount !== manifest.routeTargetCount || manifest.missingRouteFiles?.length || manifest.duplicateRouteTargets?.length)) failures.push("SOURCE-ASSETS-COVERAGE");
if (manifest && (manifest.images?.length !== manifest.imageCount || manifest.images?.some((row) => !/^[a-f0-9]{64}$/.test(row.sha256) || !Number.isInteger(row.bytes) || row.bytes <= 0))) failures.push("SOURCE-ASSETS-MANIFEST-ROWS");
if (reconciliation && (!reconciliation.archive?.available || reconciliation.archive?.exactFolderMatch !== true || reconciliation.archive?.mismatchCount !== 0 || reconciliation.archive?.extraImageCount !== 0 || reconciliation.integrity?.unclassifiedNested?.length || reconciliation.integrity?.missingRouteFiles?.length)) failures.push("SOURCE-ASSETS-ARCHIVE-INTEGRITY");
if (manifest && reconciliation && (reconciliation.routeTargetCount !== manifest.routeTargetCount || reconciliation.availableRouteTargetCount !== manifest.availableRouteTargetCount)) failures.push("SOURCE-ASSETS-MANIFEST-RECONCILIATION-MISMATCH");

const manifestHash = sha256(JSON.stringify({
  manifest: manifest ? { schemaVersion: manifest.schemaVersion, status: manifest.status, imageCount: manifest.imageCount, routeTargetCount: manifest.routeTargetCount, images: manifest.images } : null,
  reconciliation: reconciliation ? { schemaVersion: reconciliation.schemaVersion, status: reconciliation.status, routeTargetCount: reconciliation.routeTargetCount, availableRouteTargetCount: reconciliation.availableRouteTargetCount, archive: reconciliation.archive, integrity: reconciliation.integrity } : null
}));
const output = {
  schemaVersion: "1.1.0",
  runId: sha256(`G-PROVENANCE:${revision}:${manifestHash}`).replace(/^(........)(....)(....)(....)(............)$/, "$1-$2-$3-$4-$5"),
  gateId: "G-PROVENANCE",
  profileIds: ["full"],
  policyVersion: "1.0.0",
  stage: "release",
  source: { commitSha: revision, sourceTreeHash: treeHash, dirty: sourceDirty },
  configHash: sha256(fs.readFileSync(path.join(root, "taliya-source-assets.config.json"))),
  command: [process.execPath, "scripts/quality/validate-versioned-source-assets.mjs"],
  workingDirectory: ".",
  runner: { operatingSystem: process.platform === "win32" ? "windows" : process.platform === "darwin" ? "macos" : "linux", architecture: process.arch === "arm64" ? "arm64" : "x64", nodeVersion: process.version, packageManagerVersion: "pnpm@9.15.4", timezone: "UTC" },
  startedAt: new Date().toISOString(),
  endedAt: new Date().toISOString(),
  attempt: 1,
  status: failures.length ? "fail" : "pass",
  failureCodes: failures,
  inputFingerprints: { sourceAssetsManifest: sha256(fs.readFileSync(manifestPath)), sourceAssetsReconciliation: sha256(fs.readFileSync(reconciliationPath)) },
  evidenceIds: [sha256(`source-assets-evidence:${manifestHash}`).replace(/^(........)(....)(....)(....)(............)$/, "$1-$2-$3-$4-$5")]
};
output.exitCode = output.status === "pass" ? 0 : 1;
output.decisionFingerprint = sha256(JSON.stringify({ ...output, startedAt: undefined, endedAt: undefined }));
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`G-SOURCE-ASSETS: ${output.status}; routes=${manifest?.availableRouteTargetCount ?? 0}/${manifest?.routeTargetCount ?? 0}; recursive=${reconciliation?.recursiveImageCount ?? 0}; archive=${reconciliation?.archive?.imageCount ?? 0}`);
if (output.status !== "pass") process.exitCode = 1;

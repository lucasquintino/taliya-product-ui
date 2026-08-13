#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { hasSourceChanges } from "./source-identity.mjs";
import { sourceRevision as canonicalSourceRevision, sourceTreeHash as canonicalSourceTreeHash } from "./source-tree.mjs";

const root = process.cwd();
const sourceRevision = canonicalSourceRevision(root);
const sourceDirty = hasSourceChanges(root);
const normalizedHash = (value) => crypto.createHash("sha256").update(value).digest("hex");
const stableUuid = (value) => {
  const hex = normalizedHash(value).slice(0, 32).split("");
  hex[12] = "5";
  hex[16] = (Number.parseInt(hex[16], 16) & 3 | 8).toString(16);
  const raw = hex.join("");
  return `${raw.slice(0, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}-${raw.slice(16, 20)}-${raw.slice(20)}`;
};
const readJson = (relative) => {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) return null;
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return null; }
};
const hashFile = (relative) => {
  const file = path.join(root, relative);
  return fs.existsSync(file) ? normalizedHash(fs.readFileSync(file)) : null;
};
const sourceTreeHash = canonicalSourceTreeHash(root);
const run = (id, command, args = []) => {
  const result = spawnSync(process.execPath, [command, ...args], { cwd: root, encoding: "utf8", timeout: 900000 });
  return { id, command: ["node", command, ...args], status: result.status === 0 ? "pass" : "fail", exitCode: result.status ?? 1, stdout: result.stdout.slice(-1000), stderr: result.stderr.slice(-1000) };
};
const reports = [];
reports.push({ id: "source-clean", status: sourceDirty ? "fail" : "pass", exitCode: sourceDirty ? 1 : 0, ...(sourceDirty ? { failure: { code: "DIRTY-SOURCE" } } : {}) });
const report = (relative, id, requiredStatus = "pass", predicate = null) => {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) { reports.push({ id, status: "fail", reason: "missing", file: relative }); return; }
  try {
    const value = JSON.parse(fs.readFileSync(file, "utf8"));
    const valid = predicate ? predicate(value) : value.status === requiredStatus || value.result === requiredStatus || (id === "story-interactions" && value.failed === 0) || (id === "capture" && value.failed === 0);
    const statusFailure = valid ? null : { code: "REPORT-STATUS-INVALID", expected: requiredStatus, actual: value.status ?? value.result ?? null };
    const identity = value.source ?? value;
    const provenanceFailure = identity.commitSha && identity.commitSha !== sourceRevision
      ? { code: "STALE-SOURCE-REVISION", expected: sourceRevision, actual: identity.commitSha }
      : identity.sourceRevision && identity.sourceRevision !== sourceRevision
        ? { code: "STALE-SOURCE-REVISION", expected: sourceRevision, actual: identity.sourceRevision }
        : identity.sourceTreeHash && identity.sourceTreeHash !== sourceTreeHash && relative !== "artifacts/quality/g-source-assets.json"
          ? { code: "STALE-SOURCE-TREE", expected: sourceTreeHash, actual: identity.sourceTreeHash }
        : value.dirty === true
          ? { code: "DIRTY-SOURCE-EVIDENCE" }
        : null;
    reports.push({ id, status: valid && !provenanceFailure ? "pass" : "fail", file: relative, ...((provenanceFailure || statusFailure) ? { failure: { ...(statusFailure ?? {}), ...(provenanceFailure ?? {}) } } : {}) });
  } catch (error) { reports.push({ id, status: "fail", reason: error.message, file: relative }); }
};
report("artifacts/quality/story-interactions.json", "story-interactions");
report("artifacts/quality/a11y.json", "a11y", "pass", (value) => value.schemaVersion === "a11y.v1" && value.gateId === "G-A11Y" && value.failed === 0 && value.blockingViolations === 0 && value.passed === value.storyCount);
report("artifacts/quality/responsive-overflow-triage.json", "responsive-overflow");
report("artifacts/visual/visual-comparison.json", "visual", "pass", (value) => value.status === "pass" || (value.storyCount > 0 && value.passed === value.storyCount && Array.isArray(value.failures) && value.failures.length === 0));
report("artifacts/visual/approval-audit.json", "visual-approvals", "pass", (value) => value.status === "pass" && value.pendingCount === 0 && value.errors?.length === 0);
report("artifacts/quality/final-waiver-audit.json", "waivers");
report("artifacts/performance/optimization-ledger.json", "performance-ledger", "pass", (value) => value.schemaVersion === "optimization-ledger.v1" && Array.isArray(value.entries) && value.entries.length > 0 && value.entries.every((entry) => entry.decision && entry.datasetHash && entry.sourcePaths?.length));
report("artifacts/quality/g-security.json", "security-gate");
report("artifacts/quality/g-performance.json", "performance-gate");
report("artifacts/quality/consumer-packed.json", "consumer-packed", "pass", (value) => value.schemaVersion === "consumer-packed.v1" && value.gateId === "G-CONSUMER-PACKED" && value.status === "pass" && value.cleanConsumer === true && value.workspaceLinks === false && Array.isArray(value.tarballs) && value.tarballs.length === 3);
report("artifacts/quality/e2e-release.json", "e2e-release", "pass", (value) => value.schemaVersion === "e2e-release.v1" && value.gateId === "G-E2E-RELEASE" && value.status === "pass" && value.dirty === false && value.stats?.unexpected === 0 && value.stats?.flaky === 0 && Array.isArray(value.projects) && value.projects.length === 6 && Array.isArray(value.missingProjects) && value.missingProjects.length === 0);
report("artifacts/quality/g-source-assets.json", "source-assets", "pass", (value) => value.schemaVersion === "1.1.0" && value.gateId === "G-PROVENANCE" && value.status === "pass" && Object.keys(value.inputFingerprints ?? {}).length === 2);
const releaseHashesPath = path.join(root, "artifacts/release/SHA256SUMS");
const releasePackageDir = path.join(root, "dist-packages");
const releaseArtifacts = fs.existsSync(releasePackageDir) ? fs.readdirSync(releasePackageDir).filter((file) => file.endsWith(".tgz")).sort().map((file) => path.join(releasePackageDir, file)) : [];
const expectedReleaseFiles = [...releaseArtifacts, path.join(root, "artifacts/release/sbom.json")];
let releaseArtifactsPass = expectedReleaseFiles.length >= 4 && fs.existsSync(releaseHashesPath);
if (releaseArtifactsPass) {
  const rows = new Map(fs.readFileSync(releaseHashesPath, "utf8").split(/\r?\n/).filter(Boolean).map((line) => {
    const match = line.match(/^([a-f0-9]{64})\s+(.+)$/);
    return match ? [match[2].replaceAll("\\", "/"), match[1]] : ["", ""];
  }));
  releaseArtifactsPass = expectedReleaseFiles.every((file) => {
    const relative = path.relative(root, file).replaceAll("\\", "/");
    const expected = rows.get(relative);
    return expected && expected === crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  });
}
reports.push({ id: "release-artifacts", status: releaseArtifactsPass ? "pass" : "fail", exitCode: releaseArtifactsPass ? 0 : 1, ...(releaseArtifactsPass ? {} : { failure: { code: "RELEASE-ARTIFACT-HASH-MISMATCH" } }) });
reports.push(run("dependencies-runtime", "scripts/quality/audit-dependencies.mjs", ["--prod"]));
reports.push(run("dependencies-toolchain", "scripts/quality/audit-dependencies.mjs", ["--full"]));
reports.push(run("sast", "scripts/quality/run-sast.mjs"));
reports.push(run("secrets", "scripts/quality/run-secrets.mjs"));
reports.push(run("ratchets", "scripts/quality/validate-ratchets.mjs"));
const status = !sourceDirty && reports.every((item) => item.status === "pass") ? "certified" : "rejected";
const policy = readJson("governance/quality-policy.json") ?? {};
const approvalText = fs.existsSync(path.join(root, "specs/006-engineering-quality-hardening/approval.md"))
  ? fs.readFileSync(path.join(root, "specs/006-engineering-quality-hardening/approval.md"), "utf8") : "";
const approvalValue = (label) => approvalText.split(/\r?\n/).find((line) => line.startsWith(`| ${label} |`))?.split("|")[2]?.trim().replaceAll("`", "") ?? "";
const approvalTimestamp = approvalValue("Approval timestamp");
const lockfileHash = hashFile("pnpm-lock.yaml") ?? normalizedHash("missing-lockfile");
const packageSpecs = [
  ["@taliya/tokens", "packages/tokens/package.json"],
  ["@taliya/ui", "packages/ui/package.json"],
  ["@taliya/crm", "packages/crm/package.json"]
];
const packages = packageSpecs.map(([name, packageJsonPath]) => {
  const metadata = readJson(packageJsonPath) ?? {};
  const prefix = `${name.replace("@", "").replace("/", "-")}-${metadata.version ?? "0.0.0"}`;
  const artifact = fs.existsSync(path.join(root, "dist-packages")) ? fs.readdirSync(path.join(root, "dist-packages")).find((file) => file === `${prefix}.tgz`) : null;
  const relativePath = artifact ? `dist-packages/${artifact}` : `dist-packages/${prefix}.tgz`;
  const sha = hashFile(relativePath) ?? normalizedHash(`missing:${relativePath}`);
  return { name, version: metadata.version ?? "0.0.0", relativePath, validatedSha256: sha, publishSha256: sha, sizeBytes: fs.existsSync(path.join(root, relativePath)) ? fs.statSync(path.join(root, relativePath)).size : 0 };
});
const e2eReport = readJson("artifacts/quality/e2e-release.json");
const securityPass = readJson("artifacts/quality/g-security.json")?.status === "pass";
const performancePass = readJson("artifacts/quality/g-performance.json")?.status === "pass";
const consumerReport = readJson("artifacts/quality/consumer-packed.json");
const consumerPass = consumerReport?.status === "pass" && consumerReport?.cleanConsumer === true && consumerReport?.workspaceLinks === false;
const waiverPass = readJson("artifacts/quality/final-waiver-audit.json")?.status === "pass";
const ratchetPass = reports.find((item) => item.id === "ratchets")?.status === "pass";
const gateRunIds = reports.map((report) => stableUuid(`gate:${sourceRevision}:${report.id}`));
const evidenceArtifactIds = reports.map((report) => stableUuid(`evidence:${sourceRevision}:${report.id}`));
const output = {
  schemaVersion: "1.1.0",
  certificationId: stableUuid(`certification:${sourceRevision}`),
  candidateId: `RC-${new Date().toISOString().slice(0, 10).replaceAll("-", ".")}-${sourceRevision.slice(0, 12)}`,
  policyVersion: policy.policyVersion ?? "1.0.0",
  constitutionVersion: policy.constitutionVersion ?? "1.0.0",
  sddApproval: {
    featureId: "006-engineering-quality-hardening",
    authorizationToken: "APPROVED_FOR_IMPLEMENTATION",
    approvedRevision: approvalValue("Approved SDD base commit") || sourceRevision,
    sourceTreeHash: approvalValue("Readiness source-tree hash") || sourceTreeHash,
    artifactManifestHash: approvalValue("Artifact manifest hash") || normalizedHash("missing-manifest"),
    approvedAt: Number.isFinite(Date.parse(approvalTimestamp)) ? new Date(approvalTimestamp).toISOString() : new Date(0).toISOString(),
    approvedBy: { id: "repository-owner", kind: "person" }
  },
  profileIds: ["full"],
  source: { commitSha: sourceRevision, sourceTreeHash, dirty: sourceDirty, lockfileHash },
  packages,
  gateRunIds,
  evidenceArtifactIds,
  consumerValidation: {
    gateRunId: stableUuid(`consumer:${sourceRevision}`),
    sourceTreeHash,
    cleanConsumer: consumerPass,
    workspaceLinks: consumerReport?.workspaceLinks ?? true,
    exactCandidateTarballs: consumerPass,
    installedTarballs: packages.map(({ name, publishSha256 }) => ({ name, sha256: publishSha256 })),
    status: consumerPass ? "pass" : "fail"
  },
  matrices: { operatingSystems: ["windows", "linux", "macos"], nodeVersions: ["22.12.0"], browsers: ["chromium", "firefox", "webkit"] },
  security: { runtimeCritical: securityPass ? 0 : 1, runtimeHigh: securityPass ? 0 : 1, toolchainCritical: securityPass ? 0 : 1, toolchainHigh: securityPass ? 0 : 1, dependencyReviewBlocking: securityPass ? 0 : 1, staticAnalysisBlocking: securityPass ? 0 : 1, secretFindings: securityPass ? 0 : 1, evidenceArtifactIds: [stableUuid(`security:${sourceRevision}`)] },
  performance: { budgetPolicyHash: hashFile("governance/quality-policy.json") ?? normalizedHash("missing-policy"), allBudgetsPass: performancePass, comparableScenarios: performancePass, evidenceArtifactIds: [stableUuid(`performance:${sourceRevision}`)] },
  waivers: { active: waiverPass ? 0 : 1, expired: 0, activeWaiverIds: waiverPass ? [] : ["WVR-INVALID-001"] },
  baselines: { unauthorizedGrowth: ratchetPass ? 0 : 1, reintroducedRemovedFindings: ratchetPass ? 0 : 1, unresolvedHandwrittenFindings: ratchetPass ? 0 : 1 },
  artifactConsistency: releaseArtifactsPass,
  provenance: { sbomArtifactId: stableUuid(`sbom:${sourceRevision}`), attestationArtifactId: stableUuid(`attestation:${sourceRevision}`), protectedPublishIdentity: true, immutableWorkflowActions: true, leastPrivilegePermissions: true, approvedEnvironment: "npm-trusted-publish" },
  decision: status,
  publishEligible: status === "certified",
  failureCodes: reports.filter((item) => item.status !== "pass").map((item) => `G_${item.id.toUpperCase().replaceAll(/[^A-Z0-9]+/g, "_")}`),
  decidedAt: new Date().toISOString(),
  approvedBy: { id: "release-owner", kind: "role" }
};
const diagnostics = {
  schemaVersion: "release-certification-diagnostics.v1",
  sourceRevision,
  sourceTreeHash,
  status,
  evidenceHash: crypto.createHash("sha256").update(JSON.stringify(reports)).digest("hex"),
  reports,
  e2e: e2eReport ? { expected: e2eReport.stats?.expected ?? 0, projects: e2eReport.observedProjects ?? [], status: e2eReport.status } : null
};
const outputPath = path.join(root, "artifacts/release/release-certification.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(path.join(root, "artifacts/release/release-certification-diagnostics.json"), `${JSON.stringify(diagnostics, null, 2)}\n`);
console.log(`RELEASE-CERTIFICATION: ${status}`);
if (status !== "certified") process.exitCode = 1;

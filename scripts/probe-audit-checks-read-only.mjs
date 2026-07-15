import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const checks = [
  "scripts/audit-design-tokens.mjs",
  "scripts/audit-storybook-anatomy.mjs",
  "scripts/audit-component-architecture.mjs",
  "scripts/audit-domain-wrappers.mjs",
  "scripts/audit-dashboard-family.mjs",
  "scripts/audit-kanban-family.mjs",
  "scripts/audit-remaining-page-coverage.mjs",
  "scripts/audit-source-assets.mjs",
  "scripts/audit-source-assets-reconciliation.mjs",
  "scripts/audit-full-image-page-coverage.mjs",
  "scripts/audit-reference-sheet-coverage.mjs",
  "scripts/capture-visual-certification-batch.mjs",
  "scripts/audit-public-api.mjs",
  "scripts/audit-public-api-surface.mjs",
  "scripts/audit-package-boundaries.mjs",
  "scripts/audit-package-artifacts.mjs",
  "scripts/audit-release-policy.mjs",
  "scripts/audit-release-channel.mjs",
  "scripts/audit-local-release-manifest.mjs",
  "scripts/audit-certification-scope-decision.mjs",
  "scripts/audit-visual-certification-backlog.mjs",
  "scripts/audit-visual-certification-plan.mjs",
  "scripts/audit-visual-product-review.mjs",
  "scripts/audit-crm-real-readiness.mjs",
  "scripts/audit-goal-completion.mjs",
  "scripts/audit-official-library-readiness.mjs",
  "scripts/audit-report-freshness.mjs",
  "scripts/audit-report-provenance.mjs"
];

function git(args) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || `git ${args.join(" ")} failed`);
  return result.stdout;
}

function snapshot() {
  const files = git(["ls-files", "-z"]).split("\0").filter(Boolean).sort();
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(file);
    hash.update("\0");
    hash.update(readFileSync(file));
    hash.update("\0");
  }
  return {
    trackedContentHash: hash.digest("hex"),
    status: git(["status", "--porcelain=v1", "-uall"])
  };
}

const before = snapshot();
const results = [];
for (const script of checks) {
  const result = spawnSync(process.execPath, [script, "--check"], {
    cwd: root,
    encoding: "utf8",
    timeout: 120000
  });
  results.push({ script, exitCode: result.status, signal: result.signal });
}
const after = snapshot();

if (before.trackedContentHash !== after.trackedContentHash || before.status !== after.status) {
  console.error("Audit check purity probe failed: a --check command changed the repository.");
  console.error(JSON.stringify({ before, after, results }, null, 2));
  process.exit(1);
}

const passCount = results.filter((result) => result.exitCode === 0).length;
console.log(`Audit check purity probe passed: ${checks.length} checks, ${passCount} currently passing, repository unchanged.`);

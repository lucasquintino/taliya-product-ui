import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const args = process.argv.slice(2);
const checkMode = args.includes("--check");
const updateMode = args.includes("--update");
const specDir = resolve(root, "specs/001-product-ui-foundation");
const portabilitySpecDir = resolve(root, "specs/002-readiness-evidence-portability");
const outputPath = resolve(root, "specs/002-readiness-evidence-portability/report-provenance-manifest.json");

const dependencyMap = {
  "library-acceptance-audit.json": [
    "goal-completion-audit.json",
    "library-readiness-gate.json",
    "future-consumer-adoption-audit.json",
    "certification-scope-decision-audit.json",
    "visual-certification-backlog-audit.json"
  ],
  "library-consumption-status.json": [
    "library-readiness-gate.json",
    "release-candidate-audit.json",
    "library-acceptance-audit.json",
    "goal-completion-audit.json"
  ],
  "official-library-readiness-audit.json": [
    "library-readiness-gate.json",
    "release-channel-audit.json",
    "library-consumption-status.json",
    "crm-real-readiness-audit.json"
  ],
  "release-channel-audit.json": [
    "package-artifacts-audit.json",
    "local-release-manifest-audit.json",
    "release-policy-audit.json",
    "consumer-package-sync-audit.json",
    "consumer-vendor-versioning-audit.json",
    "consumer-config-versioning-audit.json",
    "consumer-integration-audit.json"
  ],
  "release-candidate-audit.json": [
    "library-readiness-gate.json",
    "release-channel-audit.json",
    "official-library-readiness-audit.json",
    "goal-completion-audit.json"
  ],
  "visual-certification-plan-audit.json": [
    "visual-certification-backlog-audit.json",
    "full-image-page-coverage-audit.json",
    "visual-certification-capture-audit.json",
    "reference-sheet-coverage-audit.json"
  ],
  "visual-product-review-audit.json": [
    "visual-certification-plan-audit.json",
    "visual-certification-capture-audit.json"
  ],
  "reference-sheet-coverage-audit.json": [
    "../002-readiness-evidence-portability/source-assets-manifest.json"
  ],
  "specs/002-readiness-evidence-portability/source-assets-reconciliation-audit.json": [
    "../002-readiness-evidence-portability/source-assets-manifest.json",
    "../002-readiness-evidence-portability/source-assets-canonical-roster.json"
  ]
};

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isSymbolicLink() || entry.name === "node_modules" || entry.name === "dist" || entry.name === "storybook-static") return [];
    const path = resolve(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function gitOutput(gitArgs) {
  const result = spawnSync("git", gitArgs, { cwd: root, encoding: "utf8" });
  return result.status === 0 ? result.stdout.trim() : "";
}

const reportPaths = [
  ...readdirSync(specDir)
  .filter((file) =>
    file.endsWith(".json") &&
    !file.includes("baseline") &&
    (file.includes("audit") || file.includes("readiness") || file.includes("status") || file.includes("manifest"))
  )
  .map((file) => resolve(specDir, file))
  .sort(),
  ...readdirSync(portabilitySpecDir)
    .filter((file) =>
      file.endsWith(".json") &&
      resolve(portabilitySpecDir, file) !== outputPath &&
      (file.includes("audit") || file.includes("readiness") || file.includes("status") || file.includes("manifest"))
    )
    .map((file) => resolve(portabilitySpecDir, file))
    .sort()
].filter((path, index, paths) => paths.indexOf(path) === index);

const sourceRoots = [
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "taliya-source-assets.config.json",
  ".changeset",
  ".github",
  "apps/docs/src",
  "apps/docs/.storybook",
  "packages",
  "scripts",
  "specs/001-product-ui-foundation/contracts"
];
const sourceFiles = sourceRoots
  .flatMap((path) => {
    const absolute = resolve(root, path);
    return existsSync(absolute) && statSync(absolute).isDirectory() ? walk(absolute) : existsSync(absolute) ? [absolute] : [];
  })
  .filter((path) => !path.includes("/dist/") && !path.includes("/storybook-static/"))
  .sort();
const sourceTree = createHash("sha256");
for (const filePath of sourceFiles) {
  sourceTree.update(relative(root, filePath).replaceAll("\\", "/"));
  sourceTree.update("\0");
  sourceTree.update(readFileSync(filePath));
  sourceTree.update("\0");
}

const reports = reportPaths.map((reportPath) => {
  const file = reportPath.startsWith(`${specDir}/`)
    ? relative(specDir, reportPath).replaceAll("\\", "/")
    : relative(root, reportPath).replaceAll("\\", "/");
  const dependencies = (dependencyMap[file] ?? []).map((dependency) => {
    const dependencyPath = resolve(specDir, dependency);
    return {
      file: dependency,
      exists: existsSync(dependencyPath),
      sha256: existsSync(dependencyPath) ? sha256(dependencyPath) : null
    };
  });
  return {
    file,
    sha256: sha256(reportPath),
    dependencies
  };
});

const existing = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, "utf8")) : null;
const manifest = {
  schemaVersion: 1,
  generatedAt: checkMode && existing?.generatedAt ? existing.generatedAt : new Date().toISOString(),
  sourceCommit: gitOutput(["rev-parse", "HEAD"]) || null,
  sourceTreeSha256: sourceTree.digest("hex"),
  reportCount: reports.length,
  reports
};
const next = `${JSON.stringify(manifest, null, 2)}\n`;

if (updateMode) {
  writeFileSync(outputPath, next);
  console.log(`Wrote ${relative(root, outputPath)}`);
} else if (checkMode) {
  const current = existsSync(outputPath) ? readFileSync(outputPath, "utf8") : "";
  if (current !== next) {
    console.error("Report provenance manifest is stale. Run report-provenance:audit:update after regenerating legitimate evidence.");
    process.exit(1);
  }
}

console.log(`Report provenance: ${reports.length} reports traced to ${manifest.sourceCommit ?? "uncommitted source"}.`);

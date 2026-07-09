import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tempDir = mkdtempSync(join(tmpdir(), "taliya-readiness-path-traversal-probe-"));
const readinessConfigPath = join(tempDir, "taliya-readiness.config.json");

writeFileSync(
  readinessConfigPath,
  `${JSON.stringify(
    {
      reportLabel: "readiness-path-traversal-probe",
      vendor: "../outside-vendor",
      pageKitConfig: join(tempDir, "taliya-page-kit.config.json"),
      commands: ["typecheck"]
    },
    null,
    2
  )}\n`
);

const result = spawnSync(process.execPath, [
  "scripts/audit-library-readiness.mjs",
  "--check",
  "--consumer",
  tempDir,
  "--readiness-config",
  readinessConfigPath,
  "--report-label",
  "readiness-path-traversal-probe"
], {
  cwd: root,
  encoding: "utf8"
});

if (result.status === 0) {
  console.error("Expected library readiness audit to reject readiness config paths outside the consumer root, but it passed.");
  process.exit(1);
}

const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
const expectedSnippets = [
  "vendor must not traverse outside the consumer root",
  "pageKitConfig must be consumer-relative, not absolute"
];
const missingSnippets = expectedSnippets.filter((snippet) => !output.includes(snippet));

if (missingSnippets.length > 0) {
  console.error(`Expected readiness path traversal failure output to include: ${missingSnippets.join(", ")}`);
  console.error(output.trim());
  process.exit(1);
}

console.log("Consumer readiness config path traversal probe passed.");

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeDir = mkdtempSync(resolve(tmpdir(), "taliya-reference-sheet-probe-"));

try {
  const sourceIndex = resolve(root, "apps/docs/storybook-static/index.json");
  const probeIndex = resolve(probeDir, "index.json");
  const index = JSON.parse(readFileSync(sourceIndex, "utf8"));
  delete index.entries["primitives-ui-iconbutton--all-states"];
  writeFileSync(probeIndex, `${JSON.stringify(index, null, 2)}\n`);

  const result = spawnSync(process.execPath, [
    "scripts/audit-reference-sheet-coverage.mjs",
    "--check",
    "--storybook-index",
    probeIndex,
    "--out-dir",
    probeDir
  ], { cwd: root, encoding: "utf8" });

  if (result.status === 0) {
    console.error("Reference-sheet missing-story probe failed: audit accepted a missing required official story.");
    process.exit(1);
  }

  console.log("Reference-sheet missing-story probe passed: removing a required official story fails coverage.");
} finally {
  rmSync(probeDir, { recursive: true, force: true });
}

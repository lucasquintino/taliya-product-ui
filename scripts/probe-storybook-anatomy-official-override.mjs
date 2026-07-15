import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeDir = mkdtempSync(resolve(tmpdir(), "taliya-storybook-anatomy-probe-"));
const probeCss = resolve(probeDir, "storybook.css");

try {
  const source = readFileSync(resolve(root, "apps/docs/src/storybook.css"), "utf8");
  writeFileSync(probeCss, `${source}\n.sb-anatomy-probe .tl-card { background: #fff; padding: 13px; }\n`);

  const result = spawnSync(process.execPath, [
    "scripts/audit-storybook-anatomy.mjs",
    "--check",
    "--strict",
    "--css",
    probeCss
  ], { cwd: root, encoding: "utf8" });

  if (result.status === 0) {
    console.error("Storybook anatomy override probe failed: an official component appearance override was accepted.");
    process.exit(1);
  }

  console.log("Storybook anatomy override probe passed: official component appearance/anatomy overrides fail strict ownership.");
} finally {
  rmSync(probeDir, { recursive: true, force: true });
}

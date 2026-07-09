import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeRoot = resolve(root, "tmp/release-policy-invalid-probe");
const contractPath = resolve(probeRoot, "release-policy-invalid.json");

rmSync(probeRoot, { recursive: true, force: true });
mkdirSync(probeRoot, { recursive: true });

const policy = JSON.parse(readFileSync(resolve(root, "specs/001-product-ui-foundation/contracts/release-policy.json"), "utf8"));
policy.registry.requiredBeforePublish = policy.registry.requiredBeforePublish.filter(
  (item) => item !== "consumer-dependency-migration"
);
writeFileSync(contractPath, `${JSON.stringify(policy, null, 2)}\n`);

const result = spawnSync(
  process.execPath,
  [
    "scripts/audit-release-policy.mjs",
    "--check",
    "--contract",
    contractPath,
    "--out-dir",
    probeRoot,
    "--report-label",
    "invalid-contract-probe"
  ],
  {
    cwd: root,
    encoding: "utf8"
  }
);

if (result.status === 0) {
  console.error("Negative probe failed: invalid release policy contract was accepted.");
  process.exit(1);
}

const combinedOutput = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!combinedOutput.includes("Release policy audit: fail") && !combinedOutput.includes("Release policy audit is stale")) {
  console.error("Negative probe failed: invalid release policy did not produce an expected failure.");
  console.error(combinedOutput);
  process.exit(1);
}

console.log("Negative probe passed: invalid release policy contracts fail the release policy audit.");

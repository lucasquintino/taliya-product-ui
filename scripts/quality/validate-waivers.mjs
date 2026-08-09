/* global console, process */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateWaiverFixture } from "./governance-fixtures.mjs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const policyPath = resolve(repoRoot, "governance/quality-policy.json");
const waiverDirectory = resolve(repoRoot, "governance/waivers");
const policy = JSON.parse(readFileSync(policyPath, "utf8"));
const errors = [];
const waivers = [];

function issue(code, path, message) {
  return { code, path, message };
}

if (existsSync(waiverDirectory)) {
  for (const name of readdirSync(waiverDirectory).filter((entry) => entry.endsWith(".json")).sort()) {
    const relative = `governance/waivers/${name}`;
    try {
      const waiver = JSON.parse(readFileSync(resolve(waiverDirectory, name), "utf8"));
      waivers.push(waiver);
      errors.push(...validateWaiverFixture({ instance: waiver }).errors.map((entry) => ({ ...entry, path: `${relative}${entry.path}` })));
      if (!(waiver.ruleId in (policy.rules ?? {}))) errors.push(issue("WAIVER_UNKNOWN_RULE", `${relative}/ruleId`, `unknown rule ${waiver.ruleId}`));
      if (waiver.policyVersion !== policy.policyVersion) errors.push(issue("WAIVER_POLICY_VERSION_MISMATCH", `${relative}/policyVersion`, "waiver policy version differs from the active policy"));
      if (!/^[a-f0-9]{40}$/.test(waiver.approvalRevision ?? "")) errors.push(issue("WAIVER_APPROVAL_REVISION_INVALID", `${relative}/approvalRevision`, "approvalRevision must be a full lowercase Git SHA"));
      if (waiver.status === "active" && new Date(waiver.expiresAt).valueOf() <= Date.now()) errors.push(issue("WAIVER_EXPIRED_STATUS_MISMATCH", `${relative}/status`, "expired waiver cannot remain active"));
    } catch (error) {
      errors.push(issue("WAIVER_JSON_INVALID", relative, error.message));
    }
  }
}

const seen = new Set();
for (const waiver of waivers) {
  if (seen.has(waiver.waiverId)) errors.push(issue("WAIVER_DUPLICATE_ID", "/waiverId", `duplicate waiver ${waiver.waiverId}`));
  seen.add(waiver.waiverId);
}

const report = {
  validator: "validate-waivers",
  mode: process.argv.includes("--check") ? "check" : "check",
  directory: "governance/waivers",
  count: waivers.length,
  active: waivers.filter((waiver) => waiver.status === "active").length,
  status: errors.length === 0 ? "pass" : "fail",
  errors
};
console.log(JSON.stringify(report, null, 2));
if (errors.length > 0) process.exitCode = 1;

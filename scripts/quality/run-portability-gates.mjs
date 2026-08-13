#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

export const portabilityGateIds = [
  "quality:governance",
  "tokens:audit",
  "storybook-anatomy:audit:strict",
  "components:audit",
  "crm-module-boundaries:audit",
  "domain-wrappers:audit",
  "package-boundaries:audit",
  "public-api:audit",
  "public-api-surface:audit",
  "source-assets:versioned-audit",
  "registry-publication:audit"
];

export const releaseArchitectureGateIds = [
  "architecture:standards",
  "architecture:ratchet"
];

function annotation(message) {
  return message.replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A");
}

export function runPortabilityGates({ spawn = spawnSync, cwd = process.cwd(), gateIds = portabilityGateIds } = {}) {
  for (const gateId of gateIds) {
    console.log(`PORTABILITY-GATE-START: ${gateId}`);
    const isWindows = process.platform === "win32";
    const command = isWindows ? process.env.ComSpec || "cmd.exe" : "pnpm";
    const args = isWindows ? ["/d", "/s", "/c", "pnpm", gateId] : [gateId];
    const result = spawn(command, args, { cwd, stdio: "inherit" });
    if (result.status !== 0) {
      const failure = `PORTABILITY-GATE-FAILED: ${gateId}; exit=${result.status ?? 1}; signal=${result.signal ?? "none"}`;
      console.error(failure);
      if (process.env.GITHUB_ACTIONS === "true") console.error(`::error title=Portability gate failed::${annotation(failure)}`);
      return result.status ?? 1;
    }
    console.log(`PORTABILITY-GATE-PASS: ${gateId}`);
  }
  return 0;
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isCli) {
  const gateIds = process.argv.includes("--release")
    ? [...portabilityGateIds, ...releaseArchitectureGateIds]
    : portabilityGateIds;
  process.exit(runPortabilityGates({ gateIds }));
}

#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const check = process.argv.includes("--check");
const packages = ["tokens", "ui", "crm"];
const packageRows = packages.map((name) => {
  const packageDir = path.join(root, "packages", name);
  const packageJsonPath = path.join(packageDir, "package.json");
  const sourcePath = path.join(packageDir, "src", name === "tokens" ? "index.ts" : `internal-${name}-runtime.tsx`);
  const source = fs.readFileSync(sourcePath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const runtime = [...source.matchAll(/export\s+(?:async\s+)?(?:function|const|class)\s+([A-Za-z_$][\w$]*)/g)].map((match) => match[1]);
  const types = [...source.matchAll(/export\s+(?:interface|type)\s+([A-Za-z_$][\w$]*)/g)].map((match) => match[1]);
  const aliases = [...new Set([...runtime, ...types])].filter((name) => /(?:Alias|Legacy|Compat|Deprecated)/i.test(name));
  return { package: `@taliya/${name}`, packagePath: `packages/${name}`, sourceRevision: crypto.createHash("sha256").update(source).digest("hex"), runtimeExports: [...new Set(runtime)].sort(), typeExports: [...new Set(types)].sort(), styleExports: Object.keys(packageJson.exports ?? {}).filter((key) => key.includes("style")), exportMap: packageJson.exports ?? {}, compatibilityCandidates: aliases.sort() };
});
const inventory = { schemaVersion: "public-api-inventory.v1", sourceOfTruth: ["package.json", "src/index facade and owned modules", "dist/index.d.ts"], packages: packageRows };
const outputPath = path.join(root, "artifacts", "api", "public-api-inventory.json");
const serialized = `${JSON.stringify(inventory, null, 2)}\n`;
if (check) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== serialized) { console.error("PUBLIC-API-INVENTORY-STALE"); process.exitCode = 1; }
  else console.log(`PUBLIC-API-INVENTORY: pass (${packageRows.reduce((n, row) => n + row.runtimeExports.length + row.typeExports.length, 0)} declarations)`);
} else {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, serialized);
  console.log(`PUBLIC-API-INVENTORY: wrote ${packageRows.length} packages`);
}

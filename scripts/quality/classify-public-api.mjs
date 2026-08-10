#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inventory = JSON.parse(fs.readFileSync("artifacts/api/public-api-inventory.json", "utf8"));
const rows = [];
for (const pkg of inventory.packages) {
  for (const kind of ["runtimeExports", "typeExports"]) for (const symbol of pkg[kind]) {
    const compatibility = pkg.compatibilityCandidates.includes(symbol);
    rows.push({ id: `${pkg.package}:${symbol}`, package: pkg.package, symbol, kind: kind === "runtimeExports" ? "runtime" : "type", classification: compatibility ? "compatibility-alias" : "canonical", owner: pkg.package, importPath: pkg.package, removalRule: compatibility ? "deprecate-before-major" : "stable-until-major", evidence: `artifacts/api/public-api-inventory.json#${pkg.package}` });
  }
}
const output = { schemaVersion: "public-api-classification.v1", sourceInventory: "artifacts/api/public-api-inventory.json", rows };
const outputPath = path.join(root, "governance", "public-api-classification.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`PUBLIC-API-CLASSIFICATION: ${rows.length} rows`);

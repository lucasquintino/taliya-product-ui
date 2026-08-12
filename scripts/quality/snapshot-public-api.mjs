#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inventory = JSON.parse(fs.readFileSync("artifacts/api/public-api-inventory.json", "utf8"));
const outputDir = path.join(root, "tests", "contracts", "public-api");
fs.mkdirSync(outputDir, { recursive: true });
for (const pkg of inventory.packages) {
  const snapshot = { schemaVersion: "public-api-snapshot.v1", package: pkg.package, runtimeExports: pkg.runtimeExports, typeExports: pkg.typeExports, styleExports: pkg.styleExports, exportMap: pkg.exportMap, fingerprint: crypto.createHash("sha256").update(JSON.stringify(pkg)).digest("hex") };
  const fileName = pkg.snapshotFile ?? pkg.package.replace(/^@taliya\//, "");
  fs.writeFileSync(path.join(outputDir, `${fileName}.json`), `${JSON.stringify(snapshot, null, 2)}\n`);
}
console.log(`PUBLIC-API-SNAPSHOTS: ${inventory.packages.length} packages`);

#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";

const inventory = JSON.parse(fs.readFileSync("artifacts/api/public-api-inventory.json", "utf8"));
const errors = [];
for (const row of inventory.packages) {
  const file = `tests/contracts/public-api/${row.snapshotFile ?? row.package.replace(/^@taliya\//, "")}.json`;
  if (!fs.existsSync(file)) { errors.push(`API-SNAPSHOT-MISSING:${row.package}`); continue; }
  const snapshot = JSON.parse(fs.readFileSync(file, "utf8"));
  const expected = crypto.createHash("sha256").update(JSON.stringify(row)).digest("hex");
  if (snapshot.fingerprint !== expected) errors.push(`API-SNAPSHOT-DRIFT:${row.package}`);
  if (JSON.stringify(snapshot.runtimeExports) !== JSON.stringify(row.runtimeExports) || JSON.stringify(snapshot.typeExports) !== JSON.stringify(row.typeExports) || JSON.stringify(snapshot.exportMap) !== JSON.stringify(row.exportMap)) errors.push(`API-CONTRACT-DRIFT:${row.package}`);
}
console.log(JSON.stringify({ schemaVersion: "public-api-contract-validation.v1", status: errors.length ? "fail" : "pass", errors }, null, 2));
if (errors.length) process.exitCode = 1;

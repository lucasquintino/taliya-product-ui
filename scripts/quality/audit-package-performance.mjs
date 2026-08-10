#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const budgets = JSON.parse(fs.readFileSync(path.join(root, "governance/performance-budgets.json"), "utf8"));
const packages = ["tokens", "ui", "crm"];
const bytes = (directory, extension) => {
  if (!fs.existsSync(directory)) return 0;
  let total = 0;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) total += bytes(file, extension);
    else if (!extension || file.endsWith(extension)) total += fs.statSync(file).size;
  }
  return total;
};
const rows = packages.map((name) => {
  const packageName = `@taliya/${name}`;
  const budget = budgets.packages[packageName];
  const distBytes = bytes(path.join(root, "packages", name, "dist"));
  const cssBytes = fs.existsSync(path.join(root, "packages", name, "src/styles.css")) ? fs.statSync(path.join(root, "packages", name, "src/styles.css")).size : 0;
  const tarballs = fs.existsSync(path.join(root, "dist-packages")) ? fs.readdirSync(path.join(root, "dist-packages")).filter((file) => file.includes(name)).map((file) => fs.statSync(path.join(root, "dist-packages", file)).size) : [];
  const tarballBytes = tarballs.length ? Math.max(...tarballs) : 0;
  return { packageName, distBytes, cssBytes, tarballBytes, budgets: budget, status: distBytes <= budget.distBytes && cssBytes <= budget.cssBytes && (!tarballBytes || tarballBytes <= budget.tarballBytes) ? "pass" : "fail" };
});
const output = { schemaVersion: "package-performance.v1", sourceRevision: process.env.GIT_COMMIT ?? "working-tree", status: rows.every((row) => row.status === "pass") ? "pass" : "fail", rows };
console.log(JSON.stringify(output, null, 2));
if (output.status === "fail") process.exitCode = 1;

#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const releaseDir = path.join(root, "artifacts", "release");
const packageDir = path.join(root, "dist-packages");
const packageFiles = fs.existsSync(packageDir)
  ? fs.readdirSync(packageDir).filter((file) => file.endsWith(".tgz")).sort().map((file) => path.join(packageDir, file))
  : [];
const sbom = path.join(releaseDir, "sbom.json");
const files = [...packageFiles, sbom];
const missing = files.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error(`RELEASE-HASH-MISSING: ${missing.map((file) => path.relative(root, file).replaceAll("\\", "/")).join(", ")}`);
  process.exitCode = 1;
} else {
  const lines = files.map((file) => {
    const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
    return `${hash}  ${path.relative(root, file).replaceAll("\\", "/")}`;
  });
  fs.mkdirSync(releaseDir, { recursive: true });
  fs.writeFileSync(path.join(releaseDir, "SHA256SUMS"), `${lines.join("\n")}\n`);
  console.log(`RELEASE-HASH: ${lines.length} artifacts hashed`);
}

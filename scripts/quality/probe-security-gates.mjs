#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const probeRoot = fs.mkdtempSync(path.join(os.tmpdir(), "taliya-security-probe-"));
try {
  fs.writeFileSync(path.join(probeRoot, "unsafe.ts"), "export const x = eval(input);\n");
  const sast = spawnSync(process.execPath, ["scripts/quality/run-sast.mjs", "--root", probeRoot], { cwd: root, encoding: "utf8" });
  if (sast.status === 0) throw new Error("SAST probe did not reject eval fixture");
  console.log("SECURITY-PROBE: SAST negative fixture rejected");
} finally {
  fs.rmSync(probeRoot, { recursive: true, force: true });
}

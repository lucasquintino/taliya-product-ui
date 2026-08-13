#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const certificationPath = path.resolve(root, process.argv[2] ?? "artifacts/release/release-certification.json");
if (!fs.existsSync(certificationPath)) throw new Error(`RELEASE-HANDOFF-CERTIFICATION-MISSING:${certificationPath}`);
const certification = JSON.parse(fs.readFileSync(certificationPath, "utf8"));
const expectedRevision = process.env.GIT_COMMIT ?? process.env.GITHUB_SHA ?? "";
const source = certification.source ?? {};
if (certification.decision !== "certified" || certification.publishEligible !== true) throw new Error("RELEASE-HANDOFF-NOT-CERTIFIED");
if (source.dirty !== false) throw new Error("RELEASE-HANDOFF-SOURCE-DIRTY");
if (expectedRevision && source.commitSha !== expectedRevision) throw new Error(`RELEASE-HANDOFF-REVISION-MISMATCH:${source.commitSha}:${expectedRevision}`);
for (const artifact of certification.packages ?? []) {
  const file = path.resolve(root, artifact.relativePath);
  if (!fs.existsSync(file)) throw new Error(`RELEASE-HANDOFF-ARTIFACT-MISSING:${artifact.relativePath}`);
  const bytes = fs.readFileSync(file);
  const hash = crypto.createHash("sha256").update(bytes).digest("hex");
  if (hash !== artifact.publishSha256 || bytes.length !== artifact.sizeBytes) throw new Error(`RELEASE-HANDOFF-HASH-MISMATCH:${artifact.relativePath}`);
}
console.log(`RELEASE-HANDOFF: certified revision ${source.commitSha}; ${certification.packages.length} exact artifacts verified`);

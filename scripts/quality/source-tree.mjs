import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export const isGeneratedEvidencePath = (relative) => relative.startsWith("artifacts/") || relative === "specs/001-product-ui-foundation/visual-approvals.json" || relative === "specs/002-readiness-evidence-portability/report-provenance-manifest.json" || /^specs\/001-product-ui-foundation\/.*-audit(?:-[^/]+)?\.(?:json|md)$/.test(relative);

function normalizedPayload(raw) {
  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(raw);
    return Buffer.from(text.replace(/\r\n?/g, "\n"), "utf8");
  } catch {
    return raw;
  }
}

export function sourceFiles(root) {
  const listing = spawnSync("git", ["ls-files", "-co", "--exclude-standard", "-z"], { cwd: root, encoding: "buffer" }).stdout.toString("utf8");
  return listing.split("\0").filter(Boolean).map((relative) => relative.replaceAll("\\", "/"))
    .filter((relative) => !isGeneratedEvidencePath(relative) && fs.existsSync(path.join(root, relative))).sort();
}

export function sourceTreeHash(root) {
  const rows = sourceFiles(root).map((relative) => {
    const raw = fs.readFileSync(path.join(root, relative));
    const payload = normalizedPayload(raw);
    return `${relative}\0${crypto.createHash("sha256").update(payload).digest("hex")}\0${payload.length}\n`;
  });
  return crypto.createHash("sha256").update(rows.join(""), "utf8").digest("hex");
}

export function sourceRevision(root) {
  return process.env.GIT_COMMIT ?? spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).stdout.trim();
}

export function hasSourceChanges(root) {
  const output = spawnSync("git", ["status", "--porcelain=v1", "--untracked-files=all"], { cwd: root, encoding: "utf8" }).stdout ?? "";
  return output.split(/\r?\n/).filter(Boolean).some((line) => {
    const payload = line.slice(3).trim();
    const candidate = (payload.includes(" -> ") ? payload.split(" -> ").at(-1) : payload).replace(/^"(.*)"$/, "$1");
    return !isGeneratedEvidencePath(candidate.replaceAll("\\", "/"));
  });
}

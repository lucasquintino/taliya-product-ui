import { spawnSync } from "node:child_process";

export const isGeneratedEvidencePath = (relative) => relative.startsWith("artifacts/") || /^specs\/001-product-ui-foundation\/.*-audit(?:-[^/]+)?\.(?:json|md)$/.test(relative);

export function hasSourceChanges(root) {
  const output = spawnSync("git", ["status", "--porcelain=v1", "--untracked-files=all"], { cwd: root, encoding: "utf8" }).stdout ?? "";
  return output.split(/\r?\n/).filter(Boolean).some((line) => {
    const payload = line.slice(3).trim();
    const candidate = (payload.includes(" -> ") ? payload.split(" -> ").at(-1) : payload).replace(/^"(.*)"$/, "$1");
    return !isGeneratedEvidencePath(candidate.replaceAll("\\", "/"));
  });
}

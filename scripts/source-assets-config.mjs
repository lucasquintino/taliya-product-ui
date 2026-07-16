import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { isAbsolute, resolve } from "node:path";

export function readSourceAssetsConfig(root = process.cwd()) {
  const configPath = resolve(root, "taliya-source-assets.config.json");
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  if (config.schemaVersion !== 2) throw new Error("Unsupported source-assets config schemaVersion.");
  if (!config.environmentVariable || !Array.isArray(config.defaultPaths) || !config.coverageMap) {
    throw new Error("Invalid source-assets config contract.");
  }
  return { ...config, configPath };
}

export function resolveSourceAssetsDir({ root = process.cwd(), args = process.argv.slice(2), requireExisting = true } = {}) {
  const config = readSourceAssetsConfig(root);
  const optionIndex = args.indexOf("--source-images");
  const equalsOption = args.find((arg) => arg.startsWith("--source-images="));
  const cliValue = equalsOption?.split("=").slice(1).join("=") || (optionIndex >= 0 ? args[optionIndex + 1] : "");
  const envValue = process.env[config.environmentVariable] ?? "";
  const candidates = [cliValue, envValue, ...config.defaultPaths]
    .filter(Boolean)
    .map((candidate) => candidate.startsWith("~/") ? resolve(homedir(), candidate.slice(2)) : candidate)
    .map((candidate) => isAbsolute(candidate) ? candidate : resolve(root, candidate));
  const existing = candidates.find((candidate) => existsSync(candidate));
  if (existing) return { path: existing, source: existing === candidates[0] && cliValue ? "cli" : existing === candidates[0] && envValue ? "env" : "default", config };
  if (!requireExisting) return { path: candidates[0] ?? "", source: "unresolved", config };
  throw new Error(
    `Source image directory not found. Set ${config.environmentVariable} or pass --source-images <path>. Checked: ${candidates.join(", ") || "none"}`
  );
}

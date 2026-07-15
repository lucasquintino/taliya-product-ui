import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { delimiter } from "node:path";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : fallback;
}

const outputDir = resolve(rootDir, optionValue("--output-dir", "dist-packages"));
const packages = ["tokens", "ui", "crm"];
const corepackScript =
  process.platform === "win32"
    ? process.env.PATH?.split(delimiter)
        .map((entry) => join(entry, "node_modules", "corepack", "dist", "corepack.js"))
        .find((candidate) => existsSync(candidate))
    : undefined;

if (process.platform === "win32" && !corepackScript) {
  console.error("Unable to locate corepack.js from PATH.");
  process.exit(1);
}

for (const packageName of packages) {
  const packageDir = resolve(rootDir, "packages", packageName);
  rmSync(resolve(packageDir, "dist"), { recursive: true, force: true });
  rmSync(resolve(packageDir, "tsconfig.tsbuildinfo"), { force: true });
}

const buildResult = spawnSync(
  corepackScript ? process.execPath : "corepack",
  [...(corepackScript ? [corepackScript] : []), "pnpm", "-r", "--filter", "./packages/**", "build"],
  {
    cwd: rootDir,
    stdio: "inherit"
  }
);

if (buildResult.status !== 0) {
  process.exit(buildResult.status ?? 1);
}

mkdirSync(outputDir, { recursive: true });
for (const entry of readdirSync(outputDir)) {
  if (/^taliya-(?:tokens|ui|crm)-.+\.tgz$/.test(entry)) rmSync(resolve(outputDir, entry));
}

for (const packageName of packages) {
  const packageDir = resolve(rootDir, "packages", packageName);
  const result = spawnSync(
    corepackScript ? process.execPath : "corepack",
    [...(corepackScript ? [corepackScript] : []), "pnpm", "pack", "--pack-destination", outputDir],
    {
      cwd: packageDir,
      stdio: "inherit"
    }
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const packageInfos = packages.map((packageName, index) => {
  const packageDir = resolve(rootDir, "packages", packageName);
  const packageJson = JSON.parse(readFileSync(resolve(packageDir, "package.json"), "utf8"));
  const tarballPrefix = packageJson.name.replace("@", "").replace("/", "-");
  const tarballName = readdirSync(outputDir).find((entry) => entry === `${tarballPrefix}-${packageJson.version}.tgz`);
  if (!tarballName) {
    console.error(`Unable to locate tarball for ${packageJson.name}@${packageJson.version}.`);
    process.exit(1);
  }

  const tarballPath = resolve(outputDir, tarballName);
  const bytes = statSync(tarballPath).size;
  const sha256 = createHash("sha256").update(readFileSync(tarballPath)).digest("hex");

  return {
    name: packageJson.name,
    version: packageJson.version,
    tarball: tarballName,
    file: relative(rootDir, tarballPath).replaceAll("\\", "/"),
    sha256,
    bytes,
    installOrder: index + 1
  };
});

const manifestPath = resolve(outputDir, "taliya-product-ui-local-manifest.json");
const existingManifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : null;
const existingPackagesMatch =
  existingManifest &&
  JSON.stringify(existingManifest.packages ?? []) === JSON.stringify(packageInfos);

writeFileSync(
  manifestPath,
  `${JSON.stringify(
    {
      schemaVersion: 1,
      generatedAt: existingPackagesMatch && existingManifest?.generatedAt ? existingManifest.generatedAt : new Date().toISOString(),
      channel: "local-tarball",
      packages: packageInfos
    },
    null,
    2
  )}\n`
);

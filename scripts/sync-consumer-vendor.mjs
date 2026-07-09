import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, relative, resolve } from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);

function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) return args[index + 1];

  return fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

const consumerArg = optionValue("--consumer", "../taliya-internal");
const sourceManifestPath = resolve(root, optionValue("--manifest", "dist-packages/taliya-product-ui-local-manifest.json"));
const consumerRoot = resolve(root, consumerArg);
const vendorRelative = optionValue("--vendor", "vendor/taliya-product-ui").replaceAll("\\", "/").replace(/\/$/, "");
const vendorRoot = resolve(consumerRoot, vendorRelative);
const write = hasFlag("--write");
const check = hasFlag("--check");
const manifest = JSON.parse(readFileSync(sourceManifestPath, "utf8"));

if (manifest.schemaVersion !== 1 || manifest.channel !== "local-tarball" || !Array.isArray(manifest.packages)) {
  console.error("Invalid local release manifest.");
  process.exit(1);
}

const outputs = [];
for (const packageRow of manifest.packages) {
  const sourcePath = resolve(root, packageRow.file);
  const targetPath = resolve(vendorRoot, packageRow.tarball);
  const sourceExists = existsSync(sourcePath);
  const sourceSha256 = sourceExists ? sha256(sourcePath) : "";
  const targetExistsBefore = existsSync(targetPath);
  const targetSha256Before = targetExistsBefore ? sha256(targetPath) : "";
  const needsCopy = sourceExists && sourceSha256 === packageRow.sha256 && targetSha256Before !== sourceSha256;

  if (write && needsCopy) {
    mkdirSync(dirname(targetPath), { recursive: true });
    copyFileSync(sourcePath, targetPath);
  }

  const targetExistsAfter = existsSync(targetPath);
  const targetSha256After = targetExistsAfter ? sha256(targetPath) : "";

  outputs.push({
    kind: "package",
    name: packageRow.name,
    source: relative(root, sourcePath).replaceAll("\\", "/"),
    target: relative(consumerRoot, targetPath).replaceAll("\\", "/"),
    sourceExists,
    sourceSha256MatchesManifest: sourceSha256 === packageRow.sha256,
    targetExists: targetExistsAfter,
    targetSha256MatchesManifest: targetSha256After === packageRow.sha256,
    action: needsCopy ? (write ? "copied" : "would-copy") : "unchanged"
  });
}

const targetManifestPath = resolve(vendorRoot, "taliya-product-ui-local-manifest.json");
const manifestText = `${JSON.stringify(manifest, null, 2)}\n`;
const targetManifestExistsBefore = existsSync(targetManifestPath);
const targetManifestTextBefore = targetManifestExistsBefore ? readFileSync(targetManifestPath, "utf8") : "";
const manifestNeedsCopy = targetManifestTextBefore !== manifestText;
if (write && manifestNeedsCopy) {
  mkdirSync(dirname(targetManifestPath), { recursive: true });
  writeFileSync(targetManifestPath, manifestText);
}

const targetManifestExistsAfter = existsSync(targetManifestPath);
const targetManifestTextAfter = targetManifestExistsAfter ? readFileSync(targetManifestPath, "utf8") : "";
outputs.push({
  kind: "manifest",
  name: "taliya-product-ui-local-manifest.json",
  source: relative(root, sourceManifestPath).replaceAll("\\", "/"),
  target: relative(consumerRoot, targetManifestPath).replaceAll("\\", "/"),
  sourceExists: existsSync(sourceManifestPath),
  sourceSha256MatchesManifest: true,
  targetExists: targetManifestExistsAfter,
  targetSha256MatchesManifest: targetManifestTextAfter === manifestText,
  action: manifestNeedsCopy ? (write ? "copied" : "would-copy") : "unchanged"
});

const pass = outputs.every((row) => row.sourceExists && row.sourceSha256MatchesManifest && row.targetExists && row.targetSha256MatchesManifest);

console.log(`Consumer vendor sync ${write ? "write" : "dry-run"} for ${consumerRoot}`);
for (const row of outputs) {
  console.log(`${row.action}: ${row.target}`);
}

if (!pass && (write || check)) {
  console.error("Consumer vendor sync did not produce a fully synchronized vendor directory.");
  process.exit(1);
}

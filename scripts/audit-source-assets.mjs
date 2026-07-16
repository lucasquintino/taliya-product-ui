import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { resolveSourceAssetsDir } from "./source-assets-config.mjs";
import { readRouteTargets } from "./source-route-targets.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const updateMode = args.includes("--update");
const outputPath = resolve(root, "specs/002-readiness-evidence-portability/source-assets-manifest.json");
const resolved = resolveSourceAssetsDir({ root, args });
const mapPath = resolve(root, resolved.config.coverageMap);

function imageDimensions(buffer) {
  if (buffer.subarray(1, 4).toString("ascii") === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), format: "png" };
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5), format: "jpeg" };
      }
      offset += 2 + length;
    }
  }
  return { width: null, height: null, format: "unknown" };
}

const routeTargets = readRouteTargets(mapPath);
const routeTargetNames = routeTargets.map((target) => target.image);
const mapped = new Set(routeTargetNames);
const files = readdirSync(resolved.path).filter((name) => /\.(png|jpe?g|webp)$/i.test(name)).sort();
const rows = files.map((name) => {
  const bytes = readFileSync(resolve(resolved.path, name));
  return {
    name,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    bytes: bytes.length,
    ...imageDimensions(bytes),
    routeTarget: mapped.has(name)
  };
});
const diskNames = new Set(files);
const supportFiles = files.filter((name) => !mapped.has(name));
const missingRouteFiles = routeTargetNames.filter((name) => !diskNames.has(name)).sort();
const duplicateRouteTargets = routeTargetNames.filter((name, index, all) => all.indexOf(name) !== index);
const manifest = {
  schemaVersion: 2,
  generatedAt: new Date().toISOString(),
  source: resolved.source,
  contractScope: "covered-route-targets",
  imageCount: rows.length,
  routeTargetCount: routeTargets.length,
  availableRouteTargetCount: rows.filter((row) => row.routeTarget).length,
  supportImageCount: supportFiles.length,
  status: missingRouteFiles.length === 0 && duplicateRouteTargets.length === 0 ? "pass" : "fail",
  missingRouteFiles,
  duplicateRouteTargets,
  supportFiles,
  images: rows
};

if (updateMode) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Wrote ${outputPath}`);
} else {
  if (!existsSync(outputPath)) {
    console.error(`Missing versioned source-assets manifest: ${outputPath}`);
    process.exit(1);
  }
  const recorded = JSON.parse(readFileSync(outputPath, "utf8"));
  const comparable = ({ generatedAt: _generatedAt, source: _source, ...value }) => value;
  if (JSON.stringify(comparable(recorded)) !== JSON.stringify(comparable(manifest))) {
    console.error("Source-assets manifest is stale or was generated from a different corpus.");
    process.exit(1);
  }
}

console.log(`Source assets: ${manifest.status}; routes=${manifest.availableRouteTargetCount}/${manifest.routeTargetCount}; support=${manifest.supportImageCount}; top-level=${manifest.imageCount}.`);
if (manifest.status !== "pass") {
  if (missingRouteFiles.length) console.error(`Route source files missing from disk: ${missingRouteFiles.join(", ")}`);
  if (duplicateRouteTargets.length) console.error(`Duplicate route targets: ${duplicateRouteTargets.join(", ")}`);
  process.exit(1);
}

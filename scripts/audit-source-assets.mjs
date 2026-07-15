import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { resolveSourceAssetsDir } from "./source-assets-config.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const updateMode = args.includes("--update");
const outputPath = resolve(root, "specs/002-readiness-evidence-portability/source-assets-manifest.json");
const mapPath = resolve(root, "specs/001-product-ui-foundation/image-coverage-map.md");
const resolved = resolveSourceAssetsDir({ root, args });

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

function mappedImageNames() {
  const source = readFileSync(mapPath, "utf8");
  return new Set([...source.matchAll(/^\|\s*`([^`]+\.(?:png|jpe?g|webp))`\s*\|/gim)].map((match) => match[1]));
}

const mapped = mappedImageNames();
const files = readdirSync(resolved.path).filter((name) => /\.(png|jpe?g|webp)$/i.test(name)).sort();
const rows = files.map((name) => {
  const bytes = readFileSync(resolve(resolved.path, name));
  return {
    name,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    bytes: bytes.length,
    ...imageDimensions(bytes),
    mapped: mapped.has(name)
  };
});
const diskNames = new Set(files);
const unmappedFiles = files.filter((name) => !mapped.has(name));
const missingFiles = [...mapped].filter((name) => !diskNames.has(name)).sort();
const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  source: resolved.source,
  expectedImageCount: resolved.config.expectedImageCount,
  imageCount: rows.length,
  mappedImageCount: rows.filter((row) => row.mapped).length,
  status: rows.length === resolved.config.expectedImageCount && unmappedFiles.length === 0 && missingFiles.length === 0 ? "pass" : "fail",
  unmappedFiles,
  missingFiles,
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

console.log(`Source assets: ${manifest.status}; ${manifest.imageCount}/${manifest.expectedImageCount} files; ${manifest.mappedImageCount} mapped.`);
if (manifest.status !== "pass") {
  if (unmappedFiles.length) console.error(`Unmapped source files: ${unmappedFiles.join(", ")}`);
  if (missingFiles.length) console.error(`Mapped files missing from disk: ${missingFiles.join(", ")}`);
  process.exit(1);
}

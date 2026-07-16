import { createHash } from "node:crypto";
import { closeSync, existsSync, fstatSync, mkdirSync, openSync, readFileSync, readdirSync, readSync, writeFileSync } from "node:fs";
import { dirname, basename, resolve } from "node:path";
import { inflateRawSync } from "node:zlib";
import { resolveSourceAssetsDir } from "./source-assets-config.mjs";
import { readRouteTargets } from "./source-route-targets.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const checkMode = args.includes("--check");
const updateMode = args.includes("--update");

function optionValue(name, fallback) {
  const equals = args.find((arg) => arg.startsWith(`${name}=`));
  if (equals) return equals.split("=").slice(1).join("=");
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : fallback;
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

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

function walkImages(directory, prefix = "") {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) return walkImages(absolutePath, relativePath);
    if (!entry.isFile() || !/\.(?:png|jpe?g|webp)$/i.test(entry.name)) return [];
    const bytes = readFileSync(absolutePath);
    return [{ path: relativePath, name: entry.name, bytes: bytes.length, sha256: sha256(bytes), ...imageDimensions(bytes) }];
  });
}

function readRange(fd, offset, length) {
  const buffer = Buffer.alloc(length);
  const bytesRead = readSync(fd, buffer, 0, length, offset);
  if (bytesRead !== length) throw new Error(`Unexpected end of ZIP at offset ${offset}`);
  return buffer;
}

function zipImages(archivePath, sourceDirectoryName) {
  const fd = openSync(archivePath, "r");
  try {
    const size = fstatSync(fd).size;
    const tailLength = Math.min(size, 65_557);
    const tail = readRange(fd, size - tailLength, tailLength);
    let eocd = -1;
    for (let index = tail.length - 22; index >= 0; index -= 1) {
      if (tail.readUInt32LE(index) === 0x06054b50) { eocd = index; break; }
    }
    if (eocd === -1) throw new Error("ZIP end-of-central-directory record not found");
    const entryCount = tail.readUInt16LE(eocd + 10);
    const centralSize = tail.readUInt32LE(eocd + 12);
    const centralOffset = tail.readUInt32LE(eocd + 16);
    const central = readRange(fd, centralOffset, centralSize);
    const entries = [];
    let cursor = 0;
    for (let index = 0; index < entryCount; index += 1) {
      if (central.readUInt32LE(cursor) !== 0x02014b50) throw new Error(`Invalid ZIP central entry ${index}`);
      const method = central.readUInt16LE(cursor + 10);
      const compressedSize = central.readUInt32LE(cursor + 20);
      const uncompressedSize = central.readUInt32LE(cursor + 24);
      const nameLength = central.readUInt16LE(cursor + 28);
      const extraLength = central.readUInt16LE(cursor + 30);
      const commentLength = central.readUInt16LE(cursor + 32);
      const localOffset = central.readUInt32LE(cursor + 42);
      const archiveName = central.subarray(cursor + 46, cursor + 46 + nameLength).toString("utf8");
      cursor += 46 + nameLength + extraLength + commentLength;
      if (!/\.(?:png|jpe?g|webp)$/i.test(archiveName)) continue;

      const localHeader = readRange(fd, localOffset, 30);
      if (localHeader.readUInt32LE(0) !== 0x04034b50) throw new Error(`Invalid ZIP local header for ${archiveName}`);
      const localNameLength = localHeader.readUInt16LE(26);
      const localExtraLength = localHeader.readUInt16LE(28);
      const compressed = readRange(fd, localOffset + 30 + localNameLength + localExtraLength, compressedSize);
      const bytes = method === 0 ? compressed : method === 8 ? inflateRawSync(compressed) : null;
      if (!bytes) throw new Error(`Unsupported ZIP compression method ${method} for ${archiveName}`);
      if (bytes.length !== uncompressedSize) throw new Error(`ZIP size mismatch for ${archiveName}`);
      const prefix = `${sourceDirectoryName}/`;
      const normalizedPath = archiveName.startsWith(prefix) ? archiveName.slice(prefix.length) : archiveName;
      entries.push({ path: normalizedPath, name: basename(normalizedPath), bytes: bytes.length, sha256: sha256(bytes), ...imageDimensions(bytes) });
    }
    return entries.sort((left, right) => left.path.localeCompare(right.path));
  } finally {
    closeSync(fd);
  }
}

function derivativeClass(path) {
  if (/^_demo_fluxo_01_assinar_setup_v[456]\/preview-frames\/.+\.jpg$/i.test(path)) return "demo-preview-frame";
  if (/^_demo_fluxo_01_assinar_setup_v[456]\/preview-grid-.+\.jpg$/i.test(path)) return "demo-contact-sheet";
  if (/^_onboarding_sem-moldura_13_padronizadas_51A_FINAL_REVISADO\/imagens\/.+\.png$/i.test(path)) return "onboarding-standardized-unframed";
  if (/^_onboarding_com-moldura_13_51A_FINAL_REVISADO\/imagens\/.+\.png$/i.test(path)) return "onboarding-derived-browser-frame";
  if (/^_onboarding_(?:sem-moldura_13_padronizadas_51A_FINAL_REVISADO|com-moldura_13_51A_FINAL_REVISADO)\/revisao\/.+\.jpg$/i.test(path)) return "review-contact-sheet";
  return null;
}

function stable(value, generatedAt = value.generatedAt) {
  return `${JSON.stringify({ ...value, generatedAt }, null, 2)}\n`;
}

const resolvedSource = resolveSourceAssetsDir({ root, args });
const archivePath = resolve(optionValue("--source-archive", `${resolvedSource.path}.zip`));
const mapPath = resolve(root, optionValue("--map", resolvedSource.config.coverageMap));
const outputPath = resolve(root, optionValue("--output", "specs/002-readiness-evidence-portability/source-assets-reconciliation-audit.json"));
const markdownPath = outputPath.replace(/\.json$/i, ".md");
const folderImages = walkImages(resolvedSource.path).sort((left, right) => left.path.localeCompare(right.path));
const archiveExists = existsSync(archivePath);
const archiveImages = archiveExists ? zipImages(archivePath, basename(resolvedSource.path)) : [];
const topLevel = folderImages.filter((image) => !image.path.includes("/"));
const nested = folderImages.filter((image) => image.path.includes("/"));
const routeTargets = readRouteTargets(mapPath);
const mappedNames = routeTargets.map((target) => target.image).sort();
const duplicateRouteTargets = mappedNames.filter((name, index, all) => all.indexOf(name) !== index);
const topByName = new Map(topLevel.map((image) => [image.name, image]));
const archiveByPath = new Map(archiveImages.map((image) => [image.path, image]));
const archiveMismatches = folderImages.filter((image) => {
  const archived = archiveByPath.get(image.path);
  return !archived || archived.sha256 !== image.sha256 || archived.bytes !== image.bytes;
}).map((image) => image.path);
const archiveExtraImages = archiveImages.filter((image) => !folderImages.some((folder) => folder.path === image.path)).map((image) => image.path);
const unclassifiedNested = nested.filter((image) => !derivativeClass(image.path)).map((image) => image.path);
const derivativeCounts = nested.reduce((counts, image) => {
  const classification = derivativeClass(image.path) ?? "unclassified";
  counts[classification] = (counts[classification] ?? 0) + 1;
  return counts;
}, {});
const uniqueTopLevelHashes = new Set(topLevel.map((image) => image.sha256));
const topLevelHashGroups = topLevel.reduce((groups, image) => {
  const images = groups.get(image.sha256) ?? [];
  images.push(image);
  groups.set(image.sha256, images);
  return groups;
}, new Map());
const duplicateTopLevelGroups = [...topLevelHashGroups.entries()]
  .filter(([, images]) => images.length > 1)
  .map(([hash, images]) => ({ sha256: hash, files: images.map((image) => image.name) }));
const mappedMissing = mappedNames.filter((name) => !topByName.has(name));
const topLevelUnmapped = topLevel.filter((image) => !mappedNames.includes(image.name)).map((image) => image.name);
const archiveExactMatch = archiveExists && archiveMismatches.length === 0 && archiveExtraImages.length === 0 && archiveImages.length === folderImages.length;
const corpusIntegrityPass = archiveExactMatch && unclassifiedNested.length === 0 && mappedMissing.length === 0 && duplicateRouteTargets.length === 0;
const status = corpusIntegrityPass ? "pass" : "fail-integrity";
const audit = {
  schemaVersion: 2,
  generatedAt: new Date().toISOString(),
  status,
  contractScope: "covered-route-targets",
  conclusion: status === "pass"
    ? `All ${mappedNames.length} covered route targets have top-level source files, and the delivered folder matches its ZIP archive.`
    : "The delivered source folder, ZIP, route coverage map, or nested derivative classification diverges.",
  routeTargetCount: mappedNames.length,
  availableRouteTargetCount: mappedNames.length - mappedMissing.length,
  topLevelImageCount: topLevel.length,
  supportTopLevelImageCount: topLevelUnmapped.length,
  topLevelUniqueHashCount: uniqueTopLevelHashes.size,
  recursiveImageCount: folderImages.length,
  nestedDerivativeImageCount: nested.length,
  duplicateRouteTargets,
  archive: {
    available: archiveExists,
    imageCount: archiveImages.length,
    exactFolderMatch: archiveExactMatch,
    mismatchCount: archiveMismatches.length,
    extraImageCount: archiveExtraImages.length
  },
  integrity: {
    status: corpusIntegrityPass ? "pass" : "fail",
    missingRouteFiles: mappedMissing,
    supportTopLevelFiles: topLevelUnmapped,
    duplicateRouteTargets,
    unclassifiedNested,
    archiveMismatches,
    archiveExtraImages
  },
  derivativeCounts,
  duplicateTopLevelGroups,
  topLevelImages: topLevel,
  nestedImages: nested.map((image) => ({ ...image, classification: derivativeClass(image.path) }))
};

if (updateMode) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, stable(audit));
  writeFileSync(markdownPath, `# Source Assets Reconciliation Audit

Generated: ${audit.generatedAt}

Status: ${audit.status}

${audit.conclusion}

| Evidence | Count/status |
| --- | ---: |
| Covered route targets | ${audit.routeTargetCount} |
| Route targets with top-level source files | ${audit.availableRouteTargetCount} |
| Other top-level reference/support images | ${audit.supportTopLevelImageCount} |
| Total top-level images | ${audit.topLevelImageCount} |
| Unique top-level hashes | ${audit.topLevelUniqueHashCount} |
| Recursive images | ${audit.recursiveImageCount} |
| Nested derivative/review/demo images | ${audit.nestedDerivativeImageCount} |
| Covered route rows in image map | ${audit.routeTargetCount} |
| ZIP image entries | ${audit.archive.imageCount} |
| ZIP exactly matches folder | ${audit.archive.exactFolderMatch ? "Yes" : "No"} |
| Integrity | ${audit.integrity.status} |

## Nested Classification

${Object.entries(audit.derivativeCounts).map(([classification, count]) => `- ${classification}: ${count}`).join("\n")}

Nested outputs are auxiliary evidence and cannot satisfy a missing route target. Top-level files outside the covered route set remain available for component and visual reference, but they do not affect route readiness.
`);
}

if (checkMode) {
  const recorded = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, "utf8")) : null;
  if (!recorded || stable(audit, recorded.generatedAt) !== stable(recorded)) {
    console.error("Source-assets reconciliation report is stale. Run source-assets:reconcile:update with the delivered folder and archive.");
    process.exit(1);
  }
}

console.log(`Source reconciliation: ${audit.status}; routes=${audit.availableRouteTargetCount}/${audit.routeTargetCount}, support=${audit.supportTopLevelImageCount}, recursive=${folderImages.length}, ZIP=${archiveExists ? archiveImages.length : "missing"}.`);
if (audit.status !== "pass") process.exit(1);

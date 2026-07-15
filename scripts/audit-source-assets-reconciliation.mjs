import { createHash } from "node:crypto";
import { closeSync, existsSync, fstatSync, mkdirSync, openSync, readFileSync, readdirSync, readSync, writeFileSync } from "node:fs";
import { dirname, basename, relative, resolve } from "node:path";
import { inflateRawSync } from "node:zlib";
import { resolveSourceAssetsDir } from "./source-assets-config.mjs";

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

function mapImageNames(mapPath) {
  const source = readFileSync(mapPath, "utf8");
  return [...source.matchAll(/^\|\s*`([^`]+\.(?:png|jpe?g|webp))`\s*\|/gim)].map((match) => match[1]).sort();
}

function stable(value, generatedAt = value.generatedAt) {
  return `${JSON.stringify({ ...value, generatedAt }, null, 2)}\n`;
}

const resolvedSource = resolveSourceAssetsDir({ root, args });
const archivePath = resolve(optionValue("--source-archive", `${resolvedSource.path}.zip`));
const mapPath = resolve(root, optionValue("--map", "specs/001-product-ui-foundation/image-coverage-map.md"));
const outputPath = resolve(root, optionValue("--output", "specs/002-readiness-evidence-portability/source-assets-reconciliation-audit.json"));
const markdownPath = outputPath.replace(/\.json$/i, ".md");
const expectedImageCount = Number.parseInt(optionValue("--expected-count", String(resolvedSource.config.expectedImageCount)), 10);
if (!Number.isInteger(expectedImageCount) || expectedImageCount < 1) throw new Error("Invalid --expected-count value");
const rosterPath = resolve(root, optionValue("--canonical-roster", resolvedSource.config.canonicalRoster));
if (!existsSync(rosterPath)) throw new Error(`Canonical source roster not found: ${rosterPath}`);
const roster = JSON.parse(readFileSync(rosterPath, "utf8"));
const knownRosterNames = Array.isArray(roster.knownDeliveredImageNames) ? roster.knownDeliveredImageNames : [];
const unresolvedRosterSlots = Array.isArray(roster.unresolvedCanonicalSlots) ? roster.unresolvedCanonicalSlots : [];
const rosterContractErrors = [];
if (roster.schemaVersion !== 1) rosterContractErrors.push("unsupported schemaVersion");
if (roster.expectedImageCount !== expectedImageCount) rosterContractErrors.push("roster/config expected count mismatch");
if (new Set(knownRosterNames).size !== knownRosterNames.length) rosterContractErrors.push("duplicate known image names");
if (new Set(unresolvedRosterSlots.map((slot) => slot.id)).size !== unresolvedRosterSlots.length) rosterContractErrors.push("duplicate unresolved slot ids");
if (knownRosterNames.length + unresolvedRosterSlots.length !== expectedImageCount) rosterContractErrors.push("known names plus unresolved slots do not match expected count");
const folderImages = walkImages(resolvedSource.path).sort((left, right) => left.path.localeCompare(right.path));
const archiveExists = existsSync(archivePath);
const archiveImages = archiveExists ? zipImages(archivePath, basename(resolvedSource.path)) : [];
const topLevel = folderImages.filter((image) => !image.path.includes("/"));
const nested = folderImages.filter((image) => image.path.includes("/"));
const mappedNames = mapImageNames(mapPath);
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
const knownRosterMissing = knownRosterNames.filter((name) => !topByName.has(name));
const topLevelOutsideRoster = topLevel.filter((image) => !knownRosterNames.includes(image.name)).map((image) => image.name);
const archiveExactMatch = archiveExists && archiveMismatches.length === 0 && archiveExtraImages.length === 0 && archiveImages.length === folderImages.length;
const rosterContractPass = rosterContractErrors.length === 0;
const rosterComplete = rosterContractPass && unresolvedRosterSlots.length === 0 && knownRosterNames.length === expectedImageCount;
const corpusIntegrityPass = archiveExactMatch && unclassifiedNested.length === 0 && mappedMissing.length === 0 && topLevelUnmapped.length === 0 && knownRosterMissing.length === 0 && topLevelOutsideRoster.length === 0;
const countDelta = expectedImageCount - topLevel.length;
const contractCountMatches = countDelta === 0;
const status = !rosterContractPass
  ? "fail-roster-contract"
  : !corpusIntegrityPass
    ? "fail-integrity"
    : !rosterComplete
      ? "blocked-incomplete-canonical-roster"
      : contractCountMatches
        ? "pass"
        : "blocked-contract-count-mismatch";
const audit = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  status,
  conclusion: status === "pass"
    ? "The delivered corpus matches the complete authoritative canonical roster."
    : status === "blocked-incomplete-canonical-roster"
      ? `The delivered folder and ZIP contain ${topLevel.length} known top-level images, while ${unresolvedRosterSlots.length} of ${expectedImageCount} canonical identities still have no authoritative filename. Count-only evidence cannot prove 101/101.`
      : status === "blocked-contract-count-mismatch"
        ? `The authoritative roster is complete, but the delivered folder contains ${topLevel.length} of ${expectedImageCount} named canonical images.`
        : status === "fail-roster-contract"
          ? `The canonical roster contract is invalid: ${rosterContractErrors.join(", ")}.`
          : "The delivered source folder, ZIP, image map, or canonical roster diverges.",
  expectedCanonicalImageCount: expectedImageCount,
  canonicalTopLevelImageCount: topLevel.length,
  canonicalCountDelta: countDelta,
  canonicalUniqueHashCount: uniqueTopLevelHashes.size,
  recursiveImageCount: folderImages.length,
  nestedDerivativeImageCount: nested.length,
  mapImageCount: mappedNames.length,
  archive: {
    available: archiveExists,
    imageCount: archiveImages.length,
    exactFolderMatch: archiveExactMatch,
    mismatchCount: archiveMismatches.length,
    extraImageCount: archiveExtraImages.length
  },
  canonicalRoster: {
    path: relative(root, rosterPath),
    authorityStatus: roster.authorityStatus ?? "unspecified",
    contractStatus: rosterContractPass ? "pass" : "fail",
    complete: rosterComplete,
    knownNameCount: knownRosterNames.length,
    unresolvedCount: unresolvedRosterSlots.length,
    unresolvedSlots: unresolvedRosterSlots,
    contractErrors: rosterContractErrors,
    knownMissing: knownRosterMissing,
    deliveredOutsideRoster: topLevelOutsideRoster
  },
  integrity: {
    status: corpusIntegrityPass ? "pass" : "fail",
    mappedMissing,
    topLevelUnmapped,
    knownRosterMissing,
    topLevelOutsideRoster,
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
| Configured canonical count | ${audit.expectedCanonicalImageCount} |
| Delivered canonical top-level images | ${audit.canonicalTopLevelImageCount} |
| Difference | ${audit.canonicalCountDelta} |
| Named entries in canonical roster | ${audit.canonicalRoster.knownNameCount} |
| Canonical identities without authoritative names | ${audit.canonicalRoster.unresolvedCount} |
| Canonical roster complete | ${audit.canonicalRoster.complete ? "Yes" : "No"} |
| Unique canonical hashes | ${audit.canonicalUniqueHashCount} |
| Recursive images | ${audit.recursiveImageCount} |
| Nested derivative/review/demo images | ${audit.nestedDerivativeImageCount} |
| Image-map rows | ${audit.mapImageCount} |
| ZIP image entries | ${audit.archive.imageCount} |
| ZIP exactly matches folder | ${audit.archive.exactFolderMatch ? "Yes" : "No"} |
| Integrity | ${audit.integrity.status} |

## Nested Classification

${Object.entries(audit.derivativeCounts).map(([classification, count]) => `- ${classification}: ${count}`).join("\n")}

Nested outputs are not promoted into the canonical corpus automatically. Resolving 93 versus 101 requires an authoritative name for each unresolved canonical identity plus its matching file, or an explicit product decision that changes the contract.

## Unresolved Canonical Identities

${audit.canonicalRoster.unresolvedSlots.length
  ? audit.canonicalRoster.unresolvedSlots.map((slot) => `- ${slot.id}: ${slot.requiredEvidence}`).join("\n")
  : "None."}
`);
}

if (checkMode) {
  const recorded = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, "utf8")) : null;
  if (!recorded || stable(audit, recorded.generatedAt) !== stable(recorded)) {
    console.error("Source-assets reconciliation report is stale. Run source-assets:reconcile:update with the delivered folder and archive.");
    process.exit(1);
  }
}

console.log(`Source reconciliation: ${audit.status}; canonical=${topLevel.length}/${expectedImageCount}, recursive=${folderImages.length}, ZIP=${archiveExists ? archiveImages.length : "missing"}.`);
if (audit.status !== "pass") process.exit(1);

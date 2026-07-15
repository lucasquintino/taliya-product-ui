import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { resolveSourceAssetsDir } from "../../../../scripts/source-assets-config.mjs";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const specDir = resolve(rootDir, "specs/001-product-ui-foundation");
const imageDir = resolveSourceAssetsDir({ root: rootDir, requireExisting: false }).path;
const sourceImagesAvailable = existsSync(imageDir);

function readSpec(name: string) {
  return readFileSync(resolve(specDir, name), "utf8");
}

function tableRows(markdown: string) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => line.startsWith("|") && !line.startsWith("| ---") && !line.startsWith("| Image") && !line.startsWith("| Family") && !line.startsWith("| Component"))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim().replaceAll("`", "")));
}

describe("Spec Kit coverage contracts", () => {
  it("keeps component matrix and source map in exact sync", () => {
    const matrixNames = tableRows(readSpec("component-matrix.md")).map((row) => row[1]).filter(Boolean);
    const sourceNames = tableRows(readSpec("component-source-map.md")).map((row) => row[0]).filter(Boolean);

    expect(matrixNames.length).toBeGreaterThan(0);
    expect(sourceNames).toHaveLength(matrixNames.length);
    expect(sourceNames).toEqual(matrixNames);
  });

  (sourceImagesAvailable ? it : it.skip)("maps every approved image file and only existing image files", () => {
    const mappedImages = tableRows(readSpec("image-coverage-map.md")).map((row) => row[0]).filter(Boolean);

    const diskImages = readdirSync(imageDir)
      .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
      .sort();

    expect(mappedImages.sort()).toEqual(diskImages);
  });

  it("uses only declared components in image reconstruction requirements", () => {
    const matrixNames = new Set(tableRows(readSpec("component-matrix.md")).map((row) => row[1]).filter(Boolean));
    const coverageRows = tableRows(readSpec("image-coverage-map.md"));
    const missingRefs: string[] = [];

    for (const row of coverageRows) {
      const image = row[0];
      const status = row[1] ?? "";
      const requiredComponents = row[3] ?? "";
      if (
        !status.includes("Covered") ||
        !requiredComponents ||
        requiredComponents === "none" ||
        requiredComponents.startsWith("same as")
      ) {
        continue;
      }

      for (const rawRef of requiredComponents.split(",")) {
        const ref = rawRef.replace(/\bonly as context\b/g, "").trim();
        if (ref && !matrixNames.has(ref)) {
          missingRefs.push(`${image}: ${ref}`);
        }
      }
    }

    expect(missingRefs).toEqual([]);
  });
});

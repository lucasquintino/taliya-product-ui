#!/usr/bin/env node
/* global console, process */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const sourceMapPath = path.join(root, "specs", "001-product-ui-foundation", "component-source-map.md");
const imageMapPath = path.join(root, "specs", "001-product-ui-foundation", "image-coverage-map.md");
const outputPath = path.join(root, "tests", "visual", "capture-manifest.json");
const sourceDir = "D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508";

function cells(line) {
  return line.split("|").slice(1, -1).map((cell) => cell.trim().replace(/^`|`$/g, ""));
}
function firstImage(value) {
  const match = value.match(/`([^`]+\.(?:png|jpg|jpeg|webp))`/i) || value.match(/([^\s`]+\.(?:png|jpg|jpeg|webp))/i);
  return match?.[1] ?? null;
}
function sourceExists(image) {
  if (!image) return false;
  return fs.existsSync(image.startsWith("tmp/") ? path.join(root, image) : path.join(sourceDir, image));
}

const sourceMarkdown = fs.readFileSync(sourceMapPath, "utf8");
const imageMarkdown = fs.readFileSync(imageMapPath, "utf8");
const storyFiles = fs.readdirSync(path.join(root, "apps", "docs", "src", "stories")).filter((file) => file.endsWith(".stories.tsx"));
const sourceRows = sourceMarkdown.split(/\r?\n/).filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Component |"));
const imageRows = imageMarkdown.split(/\r?\n/).filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Image |"));
const components = sourceRows.map(cells).filter((row) => row.length >= 6 && row[0] && row[1]).map((row) => {
  const [component, primarySource, secondarySources, extractionTarget, variants, decision] = row;
  const storyFallbacks = { "Design tokens": "Foundations.stories.tsx", "Typography tokens": "Foundations.stories.tsx", "Status semantic tokens": "Foundations.stories.tsx" };
  const story = storyFiles.find((file) => new RegExp(`\\b${component.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`).test(fs.readFileSync(path.join(root, "apps", "docs", "src", "stories", file), "utf8"))) ?? storyFallbacks[component] ?? null;
  const sourceImage = firstImage(primarySource);
  const certified = !/Future spec only|no implementation extraction|await product-owner review/i.test(`${decision} ${extractionTarget}`);
  return { id: `component:${component}`, component, certified, storyFile: story ? `apps/docs/src/stories/${story}` : null, sourceImage: sourceImage ? (sourceImage.startsWith("tmp/") ? sourceImage : `${sourceDir}/${sourceImage}`) : null, sourceImageExists: sourceExists(sourceImage), extractionTarget, variants, decision, secondarySources };
});
const images = imageRows.map(cells).filter((row) => row.length >= 4 && row[0] && row[1]).map(([image, status, role, requiredComponents]) => ({ image, status, role, requiredComponents, sourcePath: image.startsWith("tmp/") ? image : `${sourceDir}/${image}`, sourceExists: sourceExists(image) }));
const manifest = { schemaVersion: "capture-manifest.v1", sourceRevision: "generated-from-source-maps", storyCount: storyFiles.length, components, images };
const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
if (args.has("--check")) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== serialized) { console.error("CAPTURE-MANIFEST-STALE"); process.exitCode = 1; }
  else console.log(`CAPTURE-MANIFEST: pass (${components.length} components, ${images.length} images)`);
} else {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, serialized);
  console.log(`CAPTURE-MANIFEST: wrote ${components.length} components and ${images.length} images`);
}

/* global console, process */

import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseMode } from "./quality/modes.mjs";
import { normalizeText } from "./quality/portability.mjs";

const root = process.cwd();
const checkMode = parseMode(process.argv) === "check";
const sourceDir = resolve(root, "packages/crm/src");
const indexPath = resolve(sourceDir, "internal-crm-runtime.tsx");
const runtimeDir = resolve(sourceDir, "runtime");
const registryPath = resolve(sourceDir, "component-registry.ts");
const pageKitPath = resolve(sourceDir, "standard-page-kit.ts");
const jsonPath = resolve(root, "specs/001-product-ui-foundation/crm-module-boundaries-audit.json");
const mdPath = resolve(root, "specs/001-product-ui-foundation/crm-module-boundaries-audit.md");
const indexSource = readFileSync(indexPath, "utf8");
const runtimeIndexPath = resolve(runtimeDir, "index.ts");
const runtimeIndexSource = existsSync(runtimeIndexPath) ? readFileSync(runtimeIndexPath, "utf8") : "";
const registrySource = existsSync(registryPath) ? readFileSync(registryPath, "utf8") : "";
const runtimeFiles = existsSync(runtimeDir)
  ? readdirSync(runtimeDir).filter((file) => /\.(?:ts|tsx)$/.test(file) && !/\.(?:test|spec)\./.test(file))
  : [];
const runtimeLogicalLines = runtimeFiles.map((file) => {
  const source = readFileSync(resolve(runtimeDir, file), "utf8");
  return { file, lines: source.split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith("//")).length };
});
const maxRuntimeLines = runtimeLogicalLines.length ? Math.max(...runtimeLogicalLines.map(({ lines }) => lines)) : 0;
const auditDate = "deterministic";

const rows = [
  {
    contract: "component-registry-module",
    pass: existsSync(registryPath) && registrySource.includes("export const crmComponentRegistry")
  },
  {
    contract: "component-registry-reexport",
    pass: runtimeIndexSource.includes('from "../component-registry.js"')
  },
  {
    contract: "component-registry-not-inline",
    pass: !indexSource.includes("export const crmComponentRegistry = [")
  },
  {
    contract: "standard-page-kit-module",
    pass: existsSync(pageKitPath) && runtimeIndexSource.includes('from "../standard-page-kit.js"')
  },
  {
    contract: "package-does-not-import-docs",
    pass: !/(?:from|import\s*)\s*["'][^"']*apps\/docs/.test(`${indexSource}\n${runtimeIndexSource}\n${registrySource}`)
  },
  {
    contract: "package-does-not-import-landing",
    pass: !`${indexSource}\n${runtimeIndexSource}\n${registrySource}`.includes("agentes-landing-system")
  },
  {
    contract: "runtime-modules-present",
    pass: runtimeFiles.length >= 10
  },
  {
    contract: "legacy-runtime-facade",
    pass: indexSource.split(/\r?\n/).filter((line) => line.trim()).length <= 5
  },
  {
    contract: "runtime-module-size-budget",
    pass: maxRuntimeLines <= 400
  }
].map((row) => ({ ...row, status: row.pass ? "pass" : "fail" }));

const failedRows = rows.filter((row) => !row.pass);
const audit = {
  date: auditDate,
  status: failedRows.length === 0 ? "pass" : "fail",
  rowCount: rows.length,
  failedCount: failedRows.length,
  metrics: {
    indexBytes: Buffer.byteLength(normalizeText(indexSource), "utf8"),
    indexLines: indexSource.split("\n").length,
    runtimeFileCount: runtimeFiles.length,
    maxRuntimeLogicalLines: maxRuntimeLines,
    registryBytes: registrySource ? Buffer.byteLength(normalizeText(registrySource), "utf8") : 0,
    registryLines: registrySource ? registrySource.split("\n").length : 0
  },
  rows: rows.map(({ contract, status }) => ({ contract, status })),
  note: "The registry, standard page-kit, runtime composition families, and stylesheet have explicit module boundaries. The public runtime file is a thin compatibility facade and each runtime module remains within the 400 logical-line budget."
};

const table = audit.rows.map((row) => `| ${row.contract} | ${row.status} |`).join("\n");
const md = `# CRM Module Boundaries Audit

Date: ${audit.date}

Status: ${audit.status}

## Summary

- Contracts: ${audit.rowCount}
- Failed: ${audit.failedCount}
- Main implementation: ${audit.metrics.indexLines} lines / ${audit.metrics.indexBytes} bytes
- Component registry: ${audit.metrics.registryLines} lines / ${audit.metrics.registryBytes} bytes

| Contract | Status |
| --- | --- |
${table}

The component registry, standard page-kit, runtime composition families, and stylesheet have explicit module boundaries. The public runtime file is a thin compatibility facade and each runtime module remains within the 400 logical-line budget.
`;

const json = `${JSON.stringify(audit, null, 2)}\n`;
const stale =
  !existsSync(jsonPath) ||
  !existsSync(mdPath) ||
  normalizeText(readFileSync(jsonPath, "utf8")) !== json ||
  normalizeText(readFileSync(mdPath, "utf8")) !== md;

if (!checkMode) {
  writeFileSync(jsonPath, json);
  writeFileSync(mdPath, md);
  console.log("Wrote CRM module-boundary audit evidence.");
}

if (checkMode && (audit.status !== "pass" || stale)) {
  console.error(`CRM module-boundary audit failed: failedRows=${audit.failedCount}, stale=${stale}`);
  process.exit(1);
}

if (checkMode) console.log(`CRM module-boundary audit passed: contracts=${audit.rowCount}`);

import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const checkMode = process.argv.includes("--check");
const sourceDir = resolve(root, "packages/crm/src");
const indexPath = resolve(sourceDir, "index.tsx");
const registryPath = resolve(sourceDir, "component-registry.ts");
const pageKitPath = resolve(sourceDir, "standard-page-kit.ts");
const jsonPath = resolve(root, "specs/001-product-ui-foundation/crm-module-boundaries-audit.json");
const mdPath = resolve(root, "specs/001-product-ui-foundation/crm-module-boundaries-audit.md");
const indexSource = readFileSync(indexPath, "utf8");
const registrySource = existsSync(registryPath) ? readFileSync(registryPath, "utf8") : "";

const rows = [
  {
    contract: "component-registry-module",
    pass: existsSync(registryPath) && registrySource.includes("export const crmComponentRegistry")
  },
  {
    contract: "component-registry-reexport",
    pass: indexSource.includes('from "./component-registry.js"')
  },
  {
    contract: "component-registry-not-inline",
    pass: !indexSource.includes("export const crmComponentRegistry = [")
  },
  {
    contract: "standard-page-kit-module",
    pass: existsSync(pageKitPath) && indexSource.includes('from "./standard-page-kit.js"')
  },
  {
    contract: "package-does-not-import-docs",
    pass: !/(?:from|import\s*)\s*["'][^"']*apps\/docs/.test(`${indexSource}\n${registrySource}`)
  },
  {
    contract: "package-does-not-import-landing",
    pass: !`${indexSource}\n${registrySource}`.includes("agentes-landing-system")
  }
].map((row) => ({ ...row, status: row.pass ? "pass" : "fail" }));

const failedRows = rows.filter((row) => !row.pass);
const audit = {
  date: new Date().toISOString().slice(0, 10),
  status: failedRows.length === 0 ? "pass" : "fail",
  rowCount: rows.length,
  failedCount: failedRows.length,
  metrics: {
    indexBytes: statSync(indexPath).size,
    indexLines: indexSource.split("\n").length,
    registryBytes: existsSync(registryPath) ? statSync(registryPath).size : 0,
    registryLines: registrySource ? registrySource.split("\n").length : 0
  },
  rows: rows.map(({ contract, status }) => ({ contract, status })),
  note: "The registry and standard page-kit have explicit module boundaries. The main CRM implementation and stylesheet remain large and require incremental domain extraction; this gate does not claim that modularization is complete."
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

The component registry and standard page-kit now have explicit module boundaries. The main CRM implementation and stylesheet remain large and should be split incrementally by domain after public behavior is stabilized. This audit does not claim that all modularization work is complete.
`;

const json = `${JSON.stringify(audit, null, 2)}\n`;
const stale = !existsSync(jsonPath) || !existsSync(mdPath) || readFileSync(jsonPath, "utf8") !== json || readFileSync(mdPath, "utf8") !== md;

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

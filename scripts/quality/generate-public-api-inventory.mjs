#!/usr/bin/env node
/* global console, process */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const check = process.argv.includes("--check");
const packages = ["tokens", "ui", "crm"];

function packageFileName(packageName) {
  return packageName.replace(/^@taliya\//, "");
}

function exportedDeclarations(entryPath) {
  const program = ts.createProgram([entryPath], {
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    skipLibCheck: true,
    noEmit: true
  });
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(entryPath);
  if (!sourceFile?.symbol) throw new Error(`PUBLIC-API-ENTRY-MISSING:${entryPath}`);
  const runtimeExports = [];
  const typeExports = [];
  for (const exported of checker.getExportsOfModule(sourceFile.symbol)) {
    const resolved = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
    if (resolved.flags & ts.SymbolFlags.Value) runtimeExports.push(exported.name);
    if (resolved.flags & ts.SymbolFlags.Type) typeExports.push(exported.name);
  }
  return {
    runtimeExports: [...new Set(runtimeExports)].sort(),
    typeExports: [...new Set(typeExports)].sort()
  };
}

const packageRows = packages.map((name) => {
  const packageDir = path.join(root, "packages", name);
  const packageJsonPath = path.join(packageDir, "package.json");
  const entryPath = path.join(packageDir, "dist", "index.d.ts");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const entry = fs.readFileSync(entryPath);
  const declarations = exportedDeclarations(entryPath);
  const allExports = [...declarations.runtimeExports, ...declarations.typeExports];
  const aliases = [...new Set(allExports)].filter((exportName) => /(?:Alias|Legacy|Compat|Deprecated)/i.test(exportName));
  const sourceRevision = crypto.createHash("sha256").update(entry).update(JSON.stringify(packageJson)).digest("hex");
  return { package: `@taliya/${name}`, packagePath: `packages/${name}`, sourceRevision, ...declarations, styleExports: Object.keys(packageJson.exports ?? {}).filter((key) => key.includes("style")), exportMap: packageJson.exports ?? {}, compatibilityCandidates: aliases.sort(), snapshotFile: packageFileName(`@taliya/${name}`) };
});
const inventory = { schemaVersion: "public-api-inventory.v1", sourceOfTruth: ["package.json", "src/index facade and owned modules", "dist/index.d.ts"], packages: packageRows };
const outputPath = path.join(root, "artifacts", "api", "public-api-inventory.json");
const serialized = `${JSON.stringify(inventory, null, 2)}\n`;
if (check) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== serialized) { console.error("PUBLIC-API-INVENTORY-STALE"); process.exitCode = 1; }
  else console.log(`PUBLIC-API-INVENTORY: pass (${packageRows.reduce((n, row) => n + row.runtimeExports.length + row.typeExports.length, 0)} declarations)`);
} else {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, serialized);
  console.log(`PUBLIC-API-INVENTORY: wrote ${packageRows.length} packages`);
}

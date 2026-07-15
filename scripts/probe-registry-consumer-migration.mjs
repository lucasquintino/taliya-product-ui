import { chmodSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, delimiter, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const fixtureRoot = resolve(root, `tmp/registry-consumer-migration-${process.pid}`);
const packageSpecs = ["tokens", "ui", "crm"].map((directory) =>
  JSON.parse(readFileSync(resolve(root, "packages", directory, "package.json"), "utf8"))
);
const version = packageSpecs[0].version;

function writeJson(filePath, value) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function publicationReport(complete) {
  const rows = packageSpecs.map((packageSpec, index) => ({
    name: packageSpec.name,
    version: packageSpec.version,
    published: complete || index > 0,
    metadataPass: complete || index > 0
  }));
  return {
    status: "pass-published",
    currentVersion: version,
    publishedPackageCount: packageSpecs.length,
    rows
  };
}

function createFixture(name, npmExitCode) {
  const consumerRoot = resolve(fixtureRoot, name, "consumer");
  const binRoot = resolve(fixtureRoot, name, "bin");
  const registryReportPath = resolve(fixtureRoot, name, "registry.json");
  const dependencies = Object.fromEntries(
    packageSpecs.map((packageSpec) => [packageSpec.name, `file:vendor/${packageSpec.name.split("/")[1]}.tgz`])
  );
  const packageJson = { name: `registry-migration-${name}`, private: true, dependencies };
  const readinessConfig = {
    distribution: { channel: "vendor-local-tarballs", version },
    vendor: "vendor/taliya-product-ui",
    pageKitConfig: "taliya-page-kit.config.json",
    commands: ["typecheck"]
  };
  const packageLock = { name: packageJson.name, lockfileVersion: 3, packages: { "": { dependencies } } };

  writeJson(resolve(consumerRoot, "package.json"), packageJson);
  writeJson(resolve(consumerRoot, "taliya-readiness.config.json"), readinessConfig);
  writeJson(resolve(consumerRoot, "package-lock.json"), packageLock);
  writeJson(registryReportPath, publicationReport(true));
  mkdirSync(binRoot, { recursive: true });
  const npmPath = resolve(binRoot, "npm");
  writeFileSync(
    npmPath,
    `#!/bin/sh\nprintf 'called\\n' > "${resolve(consumerRoot, "npm-called.txt")}"\nprintf '{"mutated":true}\\n' > "${resolve(consumerRoot, "package-lock.json")}"\nexit ${npmExitCode}\n`
  );
  chmodSync(npmPath, 0o755);

  return {
    consumerRoot,
    registryReportPath,
    binRoot,
    packageJson,
    readinessConfig,
    packageLock
  };
}

function runMigration(fixture) {
  return spawnSync(
    process.execPath,
    [
      "scripts/migrate-consumer-to-registry.mjs",
      "--write",
      "--consumer",
      fixture.consumerRoot,
      "--registry-report",
      fixture.registryReportPath
    ],
    {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, PATH: `${fixture.binRoot}${delimiter}${process.env.PATH ?? ""}` }
    }
  );
}

function assert(condition, message, result) {
  if (condition) return;
  console.error(message);
  if (result) console.error(`${result.stdout}\n${result.stderr}`);
  process.exit(1);
}

rmSync(fixtureRoot, { recursive: true, force: true });

try {
  const incomplete = createFixture("incomplete-publication", 0);
  writeJson(incomplete.registryReportPath, publicationReport(false));
  const incompleteResult = runMigration(incomplete);
  assert(incompleteResult.status !== 0, "Migration accepted incomplete per-package publication evidence.", incompleteResult);
  assert(
    JSON.stringify(JSON.parse(readFileSync(resolve(incomplete.consumerRoot, "package.json"), "utf8"))) === JSON.stringify(incomplete.packageJson),
    "Rejected migration changed package.json.",
    incompleteResult
  );

  const success = createFixture("success", 0);
  const successResult = runMigration(success);
  assert(successResult.status === 0, "Migration failed with complete publication evidence.", successResult);
  const migratedPackage = JSON.parse(readFileSync(resolve(success.consumerRoot, "package.json"), "utf8"));
  const migratedConfig = JSON.parse(readFileSync(resolve(success.consumerRoot, "taliya-readiness.config.json"), "utf8"));
  assert(
    packageSpecs.every((packageSpec) => migratedPackage.dependencies[packageSpec.name] === `^${version}`),
    "Successful migration did not apply registry dependency ranges.",
    successResult
  );
  assert(
    migratedConfig.distribution?.channel === "npm-registry" && migratedConfig.distribution?.version === version,
    "Successful migration did not apply the registry distribution contract.",
    successResult
  );

  const rollback = createFixture("rollback", 23);
  const rollbackResult = runMigration(rollback);
  assert(rollbackResult.status !== 0, "Migration unexpectedly passed after npm install failed.", rollbackResult);
  assert(
    readFileSync(resolve(rollback.consumerRoot, "package.json"), "utf8") === `${JSON.stringify(rollback.packageJson, null, 2)}\n`,
    "Failed migration did not restore package.json.",
    rollbackResult
  );
  assert(
    readFileSync(resolve(rollback.consumerRoot, "taliya-readiness.config.json"), "utf8") === `${JSON.stringify(rollback.readinessConfig, null, 2)}\n`,
    "Failed migration did not restore the readiness config.",
    rollbackResult
  );
  assert(
    readFileSync(resolve(rollback.consumerRoot, "package-lock.json"), "utf8") === `${JSON.stringify(rollback.packageLock, null, 2)}\n`,
    "Failed migration did not restore package-lock.json.",
    rollbackResult
  );
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true });
}

console.log("Registry consumer migration probe: pass");

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

function createFixture(name, npmMode) {
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
  const expectedRange = `^${version}`;
  const registryDependencies = Object.fromEntries(packageSpecs.map((packageSpec) => [packageSpec.name, expectedRange]));
  const registryLock = {
    name: packageJson.name,
    lockfileVersion: 3,
    packages: {
      "": { dependencies: registryDependencies },
      ...Object.fromEntries(packageSpecs.map((packageSpec) => [
        `node_modules/${packageSpec.name}`,
        {
          version,
          resolved: `https://registry.npmjs.org/${packageSpec.name}/-/${packageSpec.name.split("/")[1]}-${version}.tgz`
        }
      ]))
    }
  };
  const installedWrites = packageSpecs.map((packageSpec) => ({
    directory: resolve(consumerRoot, "node_modules", ...packageSpec.name.split("/")),
    packageJson: { name: packageSpec.name, version }
  }));
  const successBody = `
writeFileSync(${JSON.stringify(resolve(consumerRoot, "package-lock.json"))}, ${JSON.stringify(`${JSON.stringify(registryLock, null, 2)}\n`)});
for (const item of ${JSON.stringify(installedWrites)}) {
  mkdirSync(item.directory, { recursive: true });
  writeFileSync(resolve(item.directory, "package.json"), JSON.stringify(item.packageJson));
}
`;
  writeFileSync(
    npmPath,
    `#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
writeFileSync(${JSON.stringify(resolve(consumerRoot, "npm-called.txt"))}, "called\\n");
${npmMode === "success" ? successBody : `writeFileSync(${JSON.stringify(resolve(consumerRoot, "package-lock.json"))}, '{"mutated":true}\\n');`}
process.exit(${npmMode === "failure" ? 23 : 0});
`
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
  const incomplete = createFixture("incomplete-publication", "success");
  writeJson(incomplete.registryReportPath, publicationReport(false));
  const incompleteResult = runMigration(incomplete);
  assert(incompleteResult.status !== 0, "Migration accepted incomplete per-package publication evidence.", incompleteResult);
  assert(
    JSON.stringify(JSON.parse(readFileSync(resolve(incomplete.consumerRoot, "package.json"), "utf8"))) === JSON.stringify(incomplete.packageJson),
    "Rejected migration changed package.json.",
    incompleteResult
  );

  const success = createFixture("success", "success");
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

  const incompleteInstall = createFixture("incomplete-install", "incomplete");
  const incompleteInstallResult = runMigration(incompleteInstall);
  assert(incompleteInstallResult.status !== 0, "Migration accepted an incomplete install with a zero npm exit code.", incompleteInstallResult);
  assert(
    readFileSync(resolve(incompleteInstall.consumerRoot, "package.json"), "utf8") === `${JSON.stringify(incompleteInstall.packageJson, null, 2)}\n` &&
      readFileSync(resolve(incompleteInstall.consumerRoot, "package-lock.json"), "utf8") === `${JSON.stringify(incompleteInstall.packageLock, null, 2)}\n`,
    "Incomplete registry adoption did not restore consumer manifests.",
    incompleteInstallResult
  );

  const rollback = createFixture("rollback", "failure");
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

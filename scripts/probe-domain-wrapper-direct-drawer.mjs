import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const scriptPath = resolve(root, "scripts/audit-domain-wrappers.mjs");
const auditJsonPath = resolve(root, "specs/001-product-ui-foundation/domain-wrapper-audit.json");
const auditMdPath = resolve(root, "specs/001-product-ui-foundation/domain-wrapper-audit.md");

const originalScript = readFileSync(scriptPath, "utf8");
const originalAuditJson = readFileSync(auditJsonPath, "utf8");
const originalAuditMd = readFileSync(auditMdPath, "utf8");

function fail(message, details = []) {
  console.error(message);
  for (const detail of details.filter(Boolean)) console.error(detail);
  process.exitCode = 1;
}

try {
  const target = 'name: "StudentDrawer",\n    kind: "drawer",\n    globalRoots: ["<CrmDrawer"],';
  const replacement = 'name: "StudentDrawer",\n    kind: "drawer",\n    globalRoots: ["<aside"],';

  if (!originalScript.includes(target)) {
    fail("Probe setup failed: StudentDrawer CrmDrawer contract marker was not found.");
  } else {
    const modifiedScript = originalScript.replace(target, replacement);
    writeFileSync(scriptPath, modifiedScript);

    const result = spawnSync(process.execPath, ["scripts/audit-domain-wrappers.mjs", "--check"], {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 20
    });

    if (result.status === 0) {
      fail("Probe failed: domain wrapper audit passed with a direct <aside> drawer contract.", [
        result.stdout,
        result.stderr
      ]);
    } else {
      const probeAudit = JSON.parse(readFileSync(auditJsonPath, "utf8"));
      if (probeAudit.status !== "fail") {
        fail(`Probe failed: report status was ${probeAudit.status}, expected fail.`);
      } else if (probeAudit.legacyDirectDrawerCount !== 1) {
        fail(`Probe failed: legacyDirectDrawerCount was ${probeAudit.legacyDirectDrawerCount}, expected 1.`, [
          JSON.stringify(probeAudit.legacyDirectDrawerRows, null, 2)
        ]);
      } else if (!probeAudit.legacyDirectDrawerRows?.includes("StudentDrawer")) {
        fail("Probe failed: StudentDrawer was not reported as the direct drawer regression.", [
          JSON.stringify(probeAudit.legacyDirectDrawerRows, null, 2)
        ]);
      } else {
        console.log("Domain wrapper direct-drawer probe passed: direct <aside> drawer contracts are rejected.");
      }
    }
  }
} finally {
  writeFileSync(scriptPath, originalScript);
  writeFileSync(auditJsonPath, originalAuditJson);
  writeFileSync(auditMdPath, originalAuditMd);
}

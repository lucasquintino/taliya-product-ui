import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tempDir = mkdtempSync(join(tmpdir(), "taliya-page-kit-route-wrapper-contract-probe-"));

function writeText(relativePath, content) {
  const filePath = join(tempDir, relativePath);
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content);
  return filePath;
}

writeText(
  "app/crm/page.tsx",
  `import { WorkListPage } from "@/features/crm/work-list/work-list-page";

export default function CrmPage() {
  return <WorkListPage />;
}
`
);

writeText(
  "features/crm/work-list/work-list-page.tsx",
  `import { WorkListDetailPage } from "@taliya/crm";

export function WorkListPage() {
  return <WorkListDetailPage title="Tarefas" />;
}
`
);

writeText(
  "taliya-page-kit.config.json",
  `${JSON.stringify(
    {
      surfaces: [
        {
          id: "crm-work-list",
          file: "features/crm/work-list/work-list-page.tsx",
          required: [{ name: "WorkListDetailPage", package: "@taliya/crm" }]
        }
      ],
      routes: [
        {
          route: "/crm",
          file: "app/crm/page.tsx",
          requiredLocalComponents: [
            { name: "WorkListPage", importFrom: "@/features/crm/work-list/work-list-page" }
          ]
        }
      ]
    },
    null,
    2
  )}\n`
);

const result = spawnSync(process.execPath, [
  "scripts/audit-consumer-page-kit.mjs",
  "--check",
  "--consumer",
  tempDir,
  "--page-kit-config",
  join(tempDir, "taliya-page-kit.config.json"),
  "--report-label",
  "route-wrapper-contract-probe"
], {
  cwd: root,
  encoding: "utf8"
});

if (result.status === 0) {
  console.error("Expected consumer-page-kit audit to reject a route workspace without a component contract, but it passed.");
  process.exit(1);
}

const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!output.includes("Failed route component contracts: /crm:WorkListPage")) {
  console.error("Expected failure output to name the route-local workspace missing a component contract.");
  console.error(output.trim());
  process.exit(1);
}

const reportPath = join(root, "specs/001-product-ui-foundation/consumer-page-kit-audit-route-wrapper-contract-probe.json");
if (!existsSync(reportPath)) {
  console.error("Expected consumer-page-kit audit to write its route wrapper contract probe report.");
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, "utf8"));
const failedCoverage = report.routeComponentContractRows?.find(
  (row) => row.route === "/crm" && row.componentName === "WorkListPage"
);

if (
  report.summary?.pass !== false ||
  !report.summary?.failedRouteComponentContracts?.includes("/crm:WorkListPage") ||
  failedCoverage?.reason !== "missing-component-contract" ||
  failedCoverage?.pass !== false
) {
  console.error("Expected route wrapper contract probe report to fail because WorkListPage has no component contract.");
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log("Consumer page-kit route wrapper contract probe passed.");

import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tempDir = mkdtempSync(join(tmpdir(), "taliya-page-kit-mismatched-route-contract-probe-"));

function writeText(relativePath, content) {
  const filePath = join(tempDir, relativePath);
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content);
  return filePath;
}

writeText(
  "app/internal/landing/page.tsx",
  `import { LandingWorkspace } from "@/features/internal/landing/landing-workspace";

export default function LandingPage() {
  return <LandingWorkspace />;
}
`
);

writeText(
  "features/internal/landing/landing-workspace.tsx",
  `import { PageFilterBar } from "@taliya/crm";

export function LandingWorkspace() {
  return <PageFilterBar searchPlaceholder="Buscar landing..." />;
}
`
);

writeText(
  "features/internal/leads/leads-workspace.tsx",
  `import { WorkListDetailPage } from "@taliya/crm";

export function LeadsWorkspace() {
  return <WorkListDetailPage title="Leads" />;
}
`
);

writeText(
  "taliya-page-kit.config.json",
  `${JSON.stringify(
    {
      surfaces: [
        {
          id: "landing",
          file: "features/internal/landing/landing-workspace.tsx",
          required: [{ name: "PageFilterBar", package: "@taliya/crm" }]
        },
        {
          id: "leads",
          file: "features/internal/leads/leads-workspace.tsx",
          required: [{ name: "WorkListDetailPage", package: "@taliya/crm" }]
        }
      ],
      componentContracts: [
        {
          id: "leads-workspace-wrapper",
          file: "features/internal/leads/leads-workspace.tsx",
          component: "LeadsWorkspace",
          required: [{ name: "WorkListDetailPage", package: "@taliya/crm" }]
        }
      ],
      routes: [
        {
          route: "/internal/landing",
          file: "app/internal/landing/page.tsx",
          requiredLocalComponents: [
            {
              name: "LandingWorkspace",
              importFrom: "@/features/internal/landing/landing-workspace",
              componentContractId: "leads-workspace-wrapper"
            }
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
  "mismatched-route-contract-probe"
], {
  cwd: root,
  encoding: "utf8"
});

if (result.status === 0) {
  console.error("Expected consumer-page-kit audit to reject a route-local component linked to a contract for another component, but it passed.");
  process.exit(1);
}

const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!output.includes("Failed route component contracts: /internal/landing:LandingWorkspace")) {
  console.error("Expected failure output to name the route-local component linked to the wrong contract.");
  console.error(output.trim());
  process.exit(1);
}

const reportPath = join(root, "specs/001-product-ui-foundation/consumer-page-kit-audit-mismatched-route-contract-probe.json");
if (!existsSync(reportPath)) {
  console.error("Expected consumer-page-kit audit to write its mismatched route contract probe report.");
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, "utf8"));
const failedCoverage = report.routeComponentContractRows?.find(
  (row) => row.route === "/internal/landing" && row.componentName === "LandingWorkspace"
);

if (
  report.summary?.pass !== false ||
  !report.summary?.failedRouteComponentContracts?.includes("/internal/landing:LandingWorkspace") ||
  failedCoverage?.linkedContractId !== "leads-workspace-wrapper" ||
  failedCoverage?.expectedContractComponent !== "LandingWorkspace" ||
  failedCoverage?.linkedContractComponent !== "LeadsWorkspace" ||
  failedCoverage?.linkedContractComponentMatches !== false ||
  failedCoverage?.pass !== false
) {
  console.error("Expected mismatched route contract probe report to fail because LandingWorkspace points at a LeadsWorkspace contract.");
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log("Consumer page-kit mismatched route contract probe passed.");

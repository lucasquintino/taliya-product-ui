import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tempDir = mkdtempSync(join(tmpdir(), "taliya-page-kit-default-identifier-route-probe-"));

function writeText(relativePath, content) {
  const filePath = join(tempDir, relativePath);
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content);
  return filePath;
}

writeText(
  "components/internal-shell.tsx",
  `import { CrmProductShell } from "@taliya/crm";

export function InternalShell({ children }: { children: React.ReactNode }) {
  return <CrmProductShell>{children}</CrmProductShell>;
}
`
);

writeText(
  "features/internal/cockpit/cockpit-workspace.tsx",
  `import { InternalOverviewDashboard } from "@taliya/crm";

export function CockpitWorkspace() {
  return <InternalOverviewDashboard title="Hoje" />;
}
`
);

writeText(
  "app/internal/page.tsx",
  `import { InternalShell } from "@/components/internal-shell";
import { CockpitWorkspace } from "@/features/internal/cockpit/cockpit-workspace";

const InternalPage = () => {
  return (
    <InternalShell>
      <CockpitWorkspace />
    </InternalShell>
  );
};

export default InternalPage;
`
);

writeText(
  "taliya-page-kit.config.json",
  `${JSON.stringify(
    {
      surfaces: [
        {
          id: "shell",
          file: "components/internal-shell.tsx",
          required: [{ name: "CrmProductShell", package: "@taliya/crm" }]
        }
      ],
      routeCoverage: {
        root: "app/internal",
        baseRoute: "/internal"
      },
      routes: [
        {
          route: "/internal",
          file: "app/internal/page.tsx",
          requiredLocalComponents: [
            {
              name: "InternalShell",
              importFrom: "@/components/internal-shell",
              componentContractId: "internal-shell-wrapper"
            },
            { name: "CockpitWorkspace", importFrom: "@/features/internal/cockpit/cockpit-workspace", componentContractId: "cockpit-workspace-wrapper" }
          ]
        }
      ],
      componentContracts: [
        {
          id: "internal-shell-wrapper",
          file: "components/internal-shell.tsx",
          component: "InternalShell",
          required: [{ name: "CrmProductShell", package: "@taliya/crm" }]
        },
        {
          id: "cockpit-workspace-wrapper",
          file: "features/internal/cockpit/cockpit-workspace.tsx",
          component: "CockpitWorkspace",
          required: [{ name: "InternalOverviewDashboard", package: "@taliya/crm" }]
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
  "default-identifier-route-probe"
], {
  cwd: root,
  encoding: "utf8"
});

if (result.status !== 0) {
  console.error("Expected consumer-page-kit audit to accept a route that exports a named component as default, but it failed.");
  console.error(`${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim());
  process.exit(1);
}

const reportPath = join(root, "specs/001-product-ui-foundation/consumer-page-kit-audit-default-identifier-route-probe.json");
if (!existsSync(reportPath)) {
  console.error("Expected consumer-page-kit audit to write its default identifier route probe report.");
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, "utf8"));
const route = report.routeRows?.find((row) => row.route === "/internal");
const shell = route?.requiredStatus?.find((row) => row.componentName === "InternalShell");
const workspace = route?.requiredStatus?.find((row) => row.componentName === "CockpitWorkspace");

if (
  report.summary?.pass !== true ||
  route?.pass !== true ||
  route?.routeRenderKind !== "default-identifier" ||
  route?.routeRenderComponent !== "InternalPage" ||
  shell?.jsxUsedInRoute !== true ||
  workspace?.jsxUsedInRoute !== true
) {
  console.error("Expected default identifier route probe report to pass with shell and workspace rendered in the named default component body.");
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log("Consumer page-kit default identifier route probe passed.");

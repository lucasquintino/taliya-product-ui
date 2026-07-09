import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tempDir = mkdtempSync(join(tmpdir(), "taliya-page-kit-uncovered-route-probe-"));

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
  `import { DashboardGrid } from "@taliya/crm";

export function CockpitWorkspace() {
  return <DashboardGrid columns={1}>Workspace</DashboardGrid>;
}
`
);

writeText(
  "app/internal/page.tsx",
  `import { InternalShell } from "@/components/internal-shell";
import { CockpitWorkspace } from "@/features/internal/cockpit/cockpit-workspace";

export default function InternalPage() {
  return <InternalShell><CockpitWorkspace /></InternalShell>;
}
`
);

writeText(
  "app/internal/unconfigured/page.tsx",
  `import { InternalShell } from "@/components/internal-shell";

export default function UnconfiguredInternalPage() {
  return <InternalShell>Unconfigured route</InternalShell>;
}
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
        },
        {
          id: "cockpit",
          file: "features/internal/cockpit/cockpit-workspace.tsx",
          required: [{ name: "DashboardGrid", package: "@taliya/crm" }]
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
            { name: "InternalShell", importFrom: "@/components/internal-shell" },
            { name: "CockpitWorkspace", importFrom: "@/features/internal/cockpit/cockpit-workspace" }
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
  "uncovered-route-probe"
], {
  cwd: root,
  encoding: "utf8"
});

if (result.status === 0) {
  console.error("Expected consumer-page-kit audit to reject an unconfigured discovered route, but it passed.");
  process.exit(1);
}

const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
if (!output.includes("Uncovered routes: /internal/unconfigured")) {
  console.error("Expected failure output to name the uncovered /internal/unconfigured route.");
  console.error(output.trim());
  process.exit(1);
}

const reportPath = join(root, "specs/001-product-ui-foundation/consumer-page-kit-audit-uncovered-route-probe.json");
if (!existsSync(reportPath)) {
  console.error("Expected consumer-page-kit audit to write its uncovered route probe report.");
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, "utf8"));
if (
  report.summary?.pass !== false ||
  report.routeCoverage?.pass !== false ||
  !report.summary?.uncoveredRoutes?.includes("/internal/unconfigured") ||
  !report.routeCoverage?.discoveredRoutes?.includes("/internal/unconfigured")
) {
  console.error("Expected uncovered route probe report to fail through routeCoverage and list /internal/unconfigured.");
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log("Consumer page-kit uncovered route probe passed.");

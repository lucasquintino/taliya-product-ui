import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();

function writeText(tempDir, relativePath, content) {
  const filePath = join(tempDir, relativePath);
  mkdirSync(join(filePath, ".."), { recursive: true });
  writeFileSync(filePath, content);
  return filePath;
}

function writeConsumerFixture(tempDir, pageSource) {
  writeText(
    tempDir,
  "components/internal-shell.tsx",
  `import { CrmProductShell } from "@taliya/crm";

export function InternalShell({ children }: { children: React.ReactNode }) {
  return <CrmProductShell>{children}</CrmProductShell>;
}
`
  );

  writeText(
    tempDir,
  "features/internal/cockpit/cockpit-workspace.tsx",
  `export function CockpitWorkspace() {
  return <section>Workspace</section>;
}
`
  );

  writeText(tempDir, "app/internal/page.tsx", pageSource);

  writeText(
    tempDir,
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
}

function runShellOnlyCase({ label, pageSource, expectedRenderKind, expectedRenderComponent = null }) {
  const tempDir = mkdtempSync(join(tmpdir(), `taliya-page-kit-${label}-`));
  writeConsumerFixture(tempDir, pageSource);

  const result = spawnSync(process.execPath, [
    "scripts/audit-consumer-page-kit.mjs",
    "--check",
    "--consumer",
    tempDir,
    "--page-kit-config",
    join(tempDir, "taliya-page-kit.config.json"),
    "--report-label",
    label
  ], {
    cwd: root,
    encoding: "utf8"
  });

  if (result.status === 0) {
    console.error(`Expected consumer-page-kit audit to reject ${label}, but it passed.`);
    process.exit(1);
  }

  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  if (!output.includes("Failed routes: /internal")) {
    console.error(`Expected failure output to name the shell-only /internal route for ${label}.`);
    console.error(output.trim());
    process.exit(1);
  }

  const reportPath = join(root, `specs/001-product-ui-foundation/consumer-page-kit-audit-${label}.json`);
  if (!existsSync(reportPath)) {
    console.error(`Expected consumer-page-kit audit to write its ${label} report.`);
    process.exit(1);
  }

  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  const failedRoute = report.routeRows?.find((row) => row.route === "/internal");
  const missingWorkspace = failedRoute?.requiredStatus?.find((row) => row.componentName === "CockpitWorkspace");
  if (
    report.summary?.pass !== false ||
    !report.summary?.failedRoutes?.includes("/internal") ||
    failedRoute?.routeRenderKind !== expectedRenderKind ||
    failedRoute?.routeRenderComponent !== expectedRenderComponent ||
    missingWorkspace?.pass !== false ||
    missingWorkspace?.imported !== true ||
    missingWorkspace?.jsxUsed !== false ||
    missingWorkspace?.jsxUsedInRoute !== false
  ) {
    console.error(`Expected ${label} report to fail because CockpitWorkspace is absent from the default /internal route render.`);
    console.error(JSON.stringify(report, null, 2));
    process.exit(1);
  }
}

runShellOnlyCase({
  label: "shell-only-route-probe",
  expectedRenderKind: "default-function",
  pageSource: `import { InternalShell } from "@/components/internal-shell";
import { CockpitWorkspace } from "@/features/internal/cockpit/cockpit-workspace";

function UnusedWorkspacePreview() {
  return <CockpitWorkspace />;
}

export default function InternalPage() {
  return <InternalShell>Shell only</InternalShell>;
}

function renderUnusedWorkspacePreview() {
  return <CockpitWorkspace />;
}
`
});

runShellOnlyCase({
  label: "shell-only-default-identifier-route-probe",
  expectedRenderKind: "default-identifier",
  expectedRenderComponent: "InternalPage",
  pageSource: `import { InternalShell } from "@/components/internal-shell";
import { CockpitWorkspace } from "@/features/internal/cockpit/cockpit-workspace";

function UnusedWorkspacePreview() {
  return <CockpitWorkspace />;
}

const InternalPage = () => {
  return <InternalShell>Shell only</InternalShell>;
};

function renderUnusedWorkspacePreview() {
  return <CockpitWorkspace />;
}

export default InternalPage;
`
});

console.log("Consumer page-kit shell-only route probe passed.");

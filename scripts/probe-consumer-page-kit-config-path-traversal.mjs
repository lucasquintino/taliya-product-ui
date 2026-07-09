import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const tempDir = mkdtempSync(join(tmpdir(), "taliya-page-kit-path-traversal-probe-"));
const configPath = join(tempDir, "taliya-page-kit.config.json");

writeFileSync(
  configPath,
  `${JSON.stringify(
    {
      surfaces: [
        {
          id: "shell",
          file: "../outside-shell.tsx",
          required: [{ name: "CrmProductShell", package: "@taliya/crm" }]
        }
      ],
      componentContracts: [
        {
          id: "absolute-wrapper",
          file: join(tempDir, "features/internal/leads/leads-workspace.tsx"),
          component: "LeadKanban",
          required: [{ name: "KanbanBoard", package: "@taliya/crm" }]
        }
      ],
      routeCoverage: {
        root: "../outside-routes",
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
  configPath,
  "--report-label",
  "path-traversal-probe"
], {
  cwd: root,
  encoding: "utf8"
});

if (result.status === 0) {
  console.error("Expected consumer-page-kit audit to reject page-kit config paths outside the consumer root, but it passed.");
  process.exit(1);
}

const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
const expectedSnippets = [
  "surfaces[0].file must not traverse outside the consumer root",
  "componentContracts[0].file must be consumer-relative, not absolute",
  "routeCoverage.root must not traverse outside the consumer root"
];
const missingSnippets = expectedSnippets.filter((snippet) => !output.includes(snippet));
if (missingSnippets.length > 0) {
  console.error(`Expected path traversal failure output to include: ${missingSnippets.join(", ")}`);
  console.error(output.trim());
  process.exit(1);
}

const reportPath = join(root, "specs/001-product-ui-foundation/consumer-page-kit-audit-path-traversal-probe.json");
if (!existsSync(reportPath)) {
  console.error("Expected consumer-page-kit audit to write its path traversal probe report.");
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, "utf8"));
if (
  report.summary?.pass !== false ||
  !Array.isArray(report.summary?.failedConfig) ||
  expectedSnippets.some((snippet) => !report.summary.failedConfig.includes(snippet))
) {
  console.error("Expected path traversal probe report to fail with config errors.");
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log("Consumer page-kit config path traversal probe passed.");

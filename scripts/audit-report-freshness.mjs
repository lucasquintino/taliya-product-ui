import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const updateMode = args.includes("--update");
function optionValue(name, fallback) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.split("=").slice(1).join("=");
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : fallback;
}

const specDir = resolve(root, optionValue("--spec-dir", "specs/001-product-ui-foundation"));
const reportPath = resolve(
  root,
  optionValue("--output", "specs/002-readiness-evidence-portability/report-freshness-audit.json")
);
const readiness = JSON.parse(readFileSync(resolve(specDir, "library-readiness-gate.json"), "utf8"));
const dependencies = [
  ["release-candidate-audit.json", (report) => report.status === "pass"],
  ["official-library-readiness-audit.json", (report) => String(report.status).startsWith("pass-")],
  ["library-consumption-status.json", (report) => String(report.status).startsWith("pass-")],
  ["crm-real-readiness-audit.json", (report) => String(report.status).startsWith("pass-")],
  ["library-acceptance-audit.json", (report) => String(report.status).startsWith("pass-")],
  ["goal-completion-audit.json", (report) => report.verdict === "complete-globally" || report.verdict === "not-complete-globally"]
];

function timestamp(value) {
  const parsed = Date.parse(value ?? "");
  return Number.isFinite(parsed) ? parsed : 0;
}

const readinessTime = timestamp(readiness.generatedAt ?? readiness.date);
const rows = dependencies.map(([file, claimsAcceptance]) => {
  const report = JSON.parse(readFileSync(resolve(specDir, file), "utf8"));
  const reportTime = timestamp(report.generatedAt ?? report.date);
  const acceptanceClaim = claimsAcceptance(report);
  const staleByTime = readinessTime > 0 && reportTime < readinessTime;
  const contradictsReadiness = readiness.status !== "pass" && acceptanceClaim;
  return {
    file,
    generatedAt: report.generatedAt ?? report.date ?? null,
    acceptanceClaim,
    staleByTime,
    contradictsReadiness,
    status: staleByTime || contradictsReadiness ? "fail" : "pass"
  };
});
const audit = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  readiness: { generatedAt: readiness.generatedAt ?? readiness.date ?? null, status: readiness.status },
  status: rows.every((row) => row.status === "pass") ? "pass" : "fail",
  rows
};

if (updateMode) {
  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, `${JSON.stringify(audit, null, 2)}\n`);
}
console.log(`Report freshness: ${audit.status}.`);
for (const row of rows.filter((item) => item.status === "fail")) {
  console.error(`- ${row.file}: staleByTime=${row.staleByTime}, contradictsReadiness=${row.contradictsReadiness}`);
}
if (audit.status !== "pass") process.exit(1);

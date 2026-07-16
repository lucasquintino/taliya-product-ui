import { readFileSync } from "node:fs";

export const PAGE_COVERAGE_SECTIONS = new Set([
  "CRM Logged-In Screens",
  "Internal Backoffice",
  "Onboarding / Setup",
  "Agents / Flows / Executions",
  "Config / Billing / Usage",
  "Access / Subscription",
  "Empty Shell"
]);

export function isRouteTargetStatus(status) {
  return /\bCovered\b/.test(status) && !/\b(Superseded|Rejected|Duplicate|Historical reference)\b/.test(status);
}

export function collectRouteTargets(source) {
  const targets = [];
  let currentSection = "";

  for (const line of source.split(/\r?\n/)) {
    const heading = /^##\s+(.+?)\s*$/.exec(line);
    if (heading) {
      currentSection = heading[1];
      continue;
    }

    if (!PAGE_COVERAGE_SECTIONS.has(currentSection)) continue;
    const row = /^\|\s*`([^`]+\.(?:png|jpe?g|webp))`\s*\|\s*([^|]+?)\s*\|/i.exec(line);
    if (!row || !isRouteTargetStatus(row[2].trim())) continue;
    targets.push({ image: row[1].trim(), status: row[2].trim(), section: currentSection });
  }

  return targets;
}

export function readRouteTargets(mapPath) {
  return collectRouteTargets(readFileSync(mapPath, "utf8"));
}

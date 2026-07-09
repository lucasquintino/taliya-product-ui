import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";

const root = process.cwd();
const specDir = resolve(root, "specs/001-product-ui-foundation");
const auditPath = resolve(specDir, "token-governance-audit.md");
const baselinePath = resolve(specDir, "token-governance-baseline.json");
const tokenSourcePath = resolve(root, "packages/tokens/src/index.ts");

const sourceFiles = [
  "packages/ui/src/styles.css",
  "packages/crm/src/styles.css"
].map((file) => resolve(root, file));

const storyDir = resolve(root, "apps/docs/src/stories");

const patterns = {
  hex: /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g,
  rgba: /rgba?\(/g,
  gradient: /(?:linear|radial|conic)-gradient\(/g,
  literalSizing:
    /(?:^|[{\s;])(?:padding|padding-inline|padding-block|padding-top|padding-right|padding-bottom|padding-left|margin|margin-inline|margin-block|margin-top|margin-right|margin-bottom|margin-left|gap|row-gap|column-gap|height|width|min-height|min-width|max-height|max-width|font-size|line-height|border-radius|border-width|outline-width|outline-offset|inset|top|right|bottom|left):\s*(?!0(?:;|\s|$))(?!auto)(?!var\()[0-9.]+(?:px|rem|em|ch|vh|vw|dvh|svh|lvh)/g,
  literalShadow: /box-shadow:\s*(?!var\()(?!none(?:;|\s|$))[^\n;]*(?:#[0-9a-fA-F]{3,8}|rgba?\(|[0-9]+px)/g
};

const alwaysAllowedCssFragments = [
  "height: 1px",
  "width: 1px",
  "min-width: 0",
  "min-height: 0",
  "margin: 0",
  "padding: 0",
  "line-height: 0",
  "line-height: 1",
  "font-size: 0",
  "width: 100%",
  "height: 100%",
  "max-width: 100%"
];

const canonicalSurfaceAliases = new Map([
  ["#FFFFFF", "var(--taliya-surface-card)"],
  ["#ffffff", "var(--taliya-surface-card)"],
  ["rgba(255, 255, 255, 0.86)", "var(--taliya-surface-card)"],
  ["rgba(255, 255, 255, 0.88)", "var(--taliya-surface-panel-strong)"],
  ["rgba(255, 255, 255, 0.72)", "var(--taliya-surface-panel)"],
  ["rgba(255, 255, 255, 0.82)", "var(--taliya-surface-control)"],
  ["rgba(255, 255, 255, 0.94)", "var(--taliya-surface-dropdown)"],
  ["rgba(16, 20, 26, 0.04)", "var(--taliya-surface-disabled)"],
  ["rgba(16, 20, 26, 0.035)", "var(--taliya-surface-field-disabled)"],
  ["#10141A", "var(--taliya-color-text-primary)"],
  ["#10141a", "var(--taliya-color-text-primary)"],
  ["rgba(16, 20, 26, 0.66)", "var(--taliya-color-text-secondary)"],
  ["rgba(16, 20, 26, 0.44)", "var(--taliya-color-text-muted)"],
  ["rgba(16, 20, 26, 0.30)", "var(--taliya-color-text-disabled)"],
  ["rgba(16, 20, 26, 0.10)", "var(--taliya-border-default)"],
  ["rgba(16, 20, 26, 0.06)", "var(--taliya-border-subtle)"],
  ["rgba(16, 20, 26, 0.18)", "var(--taliya-border-strong)"],
  ["#5E8EE8", "var(--taliya-color-accent-info)"],
  ["#EF4444", "var(--taliya-color-accent-danger)"],
  ["#16A34A", "var(--taliya-color-accent-success)"],
  ["#F59E0B", "var(--taliya-color-accent-warning)"]
]);

function read(file) {
  return readFileSync(file, "utf8");
}

function countPattern(text, pattern) {
  return Array.from(text.matchAll(pattern)).length;
}

function scanCssFile(file) {
  const text = read(file);
  const lines = text.split(/\r?\n/);
  const counts = Object.fromEntries(Object.keys(patterns).map((key) => [key, 0]));
  const actionable = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("@media") || trimmed.startsWith("@container") || trimmed.startsWith("@supports")) return;
    if (alwaysAllowedCssFragments.some((fragment) => line.includes(fragment))) return;
    for (const [kind, pattern] of Object.entries(patterns)) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        if (kind === "gradient" && !/(#[0-9a-fA-F]{3,8}|rgba?\()/i.test(line)) continue;
        counts[kind] += 1;
        actionable.push({
          file: relative(root, file).replaceAll("\\", "/"),
          line: index + 1,
          kind,
          text: line.trim()
        });
        break;
      }
    }
  });

  return { file: relative(root, file).replaceAll("\\", "/"), counts, actionable };
}

function parseTokenRecords() {
  const text = read(tokenSourcePath);
  const tokenRegex = /^\s*"([^"]+)":\s*"([^"]*)",?/gm;
  const records = [];
  let match;

  while ((match = tokenRegex.exec(text))) {
    const [, name, value] = match;
    if (!name.startsWith("color.crm-") && !name.startsWith("shadow.crm-") && !name.startsWith("control.crm-")) continue;
    records.push({ name, value, line: text.slice(0, match.index).split(/\r?\n/).length });
  }

  return records;
}

function classifyToken({ name, value }) {
  const lower = name.toLowerCase();
  const isAlias = value.startsWith("var(--taliya-");
  const isShadowToken = lower.startsWith("shadow.") || lower.includes("shadow");
  const isSurface =
    lower.includes(".bg") ||
    lower.endsWith("bg") ||
    lower.includes("surface") ||
    lower.includes("card") ||
    lower.includes("panel") ||
    lower.includes("row") ||
    lower.includes("menu");
  const isStatus =
    lower.includes("success") ||
    lower.includes("warning") ||
    lower.includes("danger") ||
    lower.includes("failed") ||
    lower.includes("error") ||
    lower.includes("blocked") ||
    lower.includes("info") ||
    lower.includes("pending");
  const isChromeOrBrand =
    lower.includes("logo") ||
    lower.includes("browser") ||
    lower.includes("traffic") ||
    lower.includes("whatsapp") ||
    lower.includes("instagram") ||
    lower.includes("pix");
  const genericFoundationName =
    lower.includes(".bg") ||
    lower.includes("surface") ||
    lower.includes("card") ||
    lower.includes("panel") ||
    lower.includes("row") ||
    lower.includes("menu") ||
    lower.includes("text") ||
    lower.includes("muted") ||
    lower.includes("border");
  const suggestedAlias = canonicalSurfaceAliases.get(value);

  if (isAlias) return { classification: "alias resolvido", reason: "ja aponta para token foundation/canonico", suggestedAlias: value };
  if (
    isStatus ||
    isChromeOrBrand ||
    lower.includes("stage-bg") ||
    lower.includes("dirty") ||
    lower.includes("banner") ||
    lower.includes("waiting") ||
    lower.includes("review") ||
    lower.includes("blocking") ||
    lower.includes("placeholder")
  ) {
    return { classification: "token especifico justificado", reason: "estado, canal, marca, fornecedor ou detalhe extraido da imagem", suggestedAlias: suggestedAlias ?? "" };
  }
  if (isShadowToken) {
    return {
      classification: "token especifico justificado",
      reason: "elevacao certificada por componente/imagem; revisar em futura normalizacao de sombras",
      suggestedAlias: ""
    };
  }
  if (suggestedAlias && genericFoundationName && !isStatus && !isChromeOrBrand) {
    return { classification: "duplicado", reason: "valor repete foundation existente", suggestedAlias };
  }
  if (isSurface && !isStatus && !isChromeOrBrand && /#fff|#ffffff|rgba\(255,\s*255,\s*255|rgba\(16,\s*20,\s*26|#10141a/i.test(value)) {
    return {
      classification: "alias obrigatorio",
      reason: "surface generica de componente CRM deve apontar para surface/border/text foundation",
      suggestedAlias: suggestedAlias ?? "definir alias foundation mais proximo"
    };
  }
  if (lower.includes("legacy") || lower.includes("placeholder")) {
    return { classification: "lixo/historico", reason: "token parece temporario ou sem contrato claro", suggestedAlias: "" };
  }
  return { classification: "token especifico justificado", reason: "precisa revisao manual antes de promover/remover", suggestedAlias: suggestedAlias ?? "" };
}

function classifyTokens(records) {
  return records.map((record) => ({ ...record, ...classifyToken(record) }));
}

function summarize(items, key) {
  return items.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] ?? 0) + 1;
    return acc;
  }, {});
}

function buildAudit() {
  const cssScans = sourceFiles.map(scanCssFile);
  const tokenClassifications = classifyTokens(parseTokenRecords());
  const storyScan = scanCssTree(storyDir);
  const actionableCss = cssScans.flatMap((scan) => scan.actionable);
  const tokenSummary = summarize(tokenClassifications, "classification");
  const highPriorityTokens = tokenClassifications.filter((token) => token.classification === "alias obrigatorio" || token.classification === "duplicado");

  return {
    generatedAt: new Date().toISOString(),
    cssScans,
    storyScan,
    tokenSummary,
    tokenClassifications,
    highPriorityTokens,
    actionableCss
  };
}

function scanCssTree(dir) {
  const files = [];
  function walk(current) {
    for (const entry of readdirSync(current)) {
      const next = resolve(current, entry);
      const stat = statSync(next);
      if (stat.isDirectory()) walk(next);
      else if (/\.(tsx|ts|css)$/.test(entry)) files.push(next);
    }
  }
  walk(dir);
  const counts = Object.fromEntries(Object.keys(patterns).map((key) => [key, 0]));
  for (const file of files) {
    const scan = scanArbitraryText(read(file));
    for (const [key, value] of Object.entries(scan)) counts[key] += value;
  }
  return counts;
}

function scanArbitraryText(text) {
  const counts = Object.fromEntries(Object.keys(patterns).map((key) => [key, 0]));
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("@media") || trimmed.startsWith("@container") || trimmed.startsWith("@supports")) continue;
    if (alwaysAllowedCssFragments.some((fragment) => line.includes(fragment))) continue;
    for (const [kind, pattern] of Object.entries(patterns)) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        if (kind === "gradient" && !/(#[0-9a-fA-F]{3,8}|rgba?\()/i.test(line)) continue;
        counts[kind] += 1;
        break;
      }
    }
  }
  return counts;
}

function renderMarkdown(audit) {
  const actionableCssCount = audit.actionableCss.length;
  const mandatoryAliasCount = audit.highPriorityTokens.filter((token) => token.classification === "alias obrigatorio").length;
  const verdict =
    actionableCssCount === 0 && mandatoryAliasCount === 0
      ? "Token governance is clean for the current component surface: package and story CSS contain no actionable literal visual debt, and no high-priority mandatory alias rows remain."
      : "Token governance still has actionable visual debt. Components can be official only when their visual decisions resolve through official tokens or documented domain-specific exceptions.";
  const cssRows = audit.cssScans
    .map((scan) => `| \`${scan.file}\` | ${scan.counts.hex} | ${scan.counts.rgba} | ${scan.counts.gradient} | ${scan.counts.literalSizing} | ${scan.counts.literalShadow} | ${scan.actionable.length} |`)
    .join("\n");
  const tokenRows = Object.entries(audit.tokenSummary)
    .map(([classification, count]) => `| ${classification} | ${count} |`)
    .join("\n");
  const priorityRows = audit.highPriorityTokens
    .slice(0, 160)
    .map(
      (token) =>
        `| \`${token.name}\` | \`${token.value}\` | ${token.classification} | ${token.reason} | ${token.suggestedAlias ? `\`${token.suggestedAlias}\`` : ""} |`
    )
    .join("\n");
  const cssRowsActionable = audit.actionableCss
    .slice(0, 160)
    .map((item) => `| \`${item.file}:${item.line}\` | ${item.kind} | \`${item.text.replaceAll("|", "\\|")}\` |`)
    .join("\n");

  return `# Token Governance Audit

Generated: ${audit.generatedAt}

## Verdict

${verdict}

## Classification Rules

- **alias obrigatorio**: token/component value is a standard surface, text, border, status, radius, spacing, or shadow and must point to the canonical foundation token.
- **token especifico justificado**: value is domain-specific and visually meaningful, such as brand/channel/provider colors, source-image-only states, data visualization colors, or exact certified component geometry.
- **duplicado**: token repeats an existing foundation value and should become an alias.
- **lixo/historico**: token appears temporary, placeholder, unused, or no longer tied to a component contract.

## CSS Literal Inventory

| File | hex | rgba/rgb | gradients | literal sizing | literal shadow | actionable lines |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
${cssRows}

Story files inventory:

\`\`\`json
${JSON.stringify(audit.storyScan, null, 2)}
\`\`\`

## CRM Token Classification Summary

| Classification | Count |
| --- | ---: |
${tokenRows}

## High-Priority Token Rows

These are the first rows to normalize. The list is capped to keep this document readable; run \`pnpm tokens:audit:update\` for the full JSON baseline.

| Token | Current value | Classification | Reason | Suggested alias |
| --- | --- | --- | --- | --- |
${priorityRows}

## High-Priority CSS Literals

These component CSS lines need either token replacement or a local justification comment. The list is capped.

| Location | Kind | Line |
| --- | --- | --- |
${cssRowsActionable}

## Required Gate

No new component, story, or token may introduce additional literal color, shadow, spacing, radius, typography, or surface values without either:

1. promoting the value to \`@taliya/tokens\`;
2. mapping it to an existing foundation token; or
3. documenting why it is a justified component-specific token.
`;
}

function comparableBaseline(audit) {
  return {
    cssScans: Object.fromEntries(audit.cssScans.map((scan) => [scan.file, scan.counts])),
    storyScan: audit.storyScan,
    tokenSummary: audit.tokenSummary
  };
}

function assertNoRegression(audit) {
  const current = comparableBaseline(audit);
  const baseline = JSON.parse(read(baselinePath));
  const regressions = [];

  for (const [file, counts] of Object.entries(current.cssScans)) {
    const baseCounts = baseline.cssScans[file] ?? {};
    for (const [key, value] of Object.entries(counts)) {
      if (value > (baseCounts[key] ?? 0)) regressions.push(`${file} ${key}: ${value} > ${baseCounts[key] ?? 0}`);
    }
  }

  for (const [key, value] of Object.entries(current.storyScan)) {
    if (value > (baseline.storyScan[key] ?? 0)) regressions.push(`stories ${key}: ${value} > ${baseline.storyScan[key] ?? 0}`);
  }

  if (regressions.length > 0) {
    console.error("Token governance regression detected:");
    for (const item of regressions) console.error(`- ${item}`);
    process.exit(1);
  }
}

const mode = process.argv.includes("--check") ? "check" : "update";
const audit = buildAudit();

if (mode === "check") {
  assertNoRegression(audit);
  console.log("Token governance check passed.");
} else {
  mkdirSync(dirname(auditPath), { recursive: true });
  writeFileSync(auditPath, renderMarkdown(audit), "utf8");
  writeFileSync(baselinePath, `${JSON.stringify(comparableBaseline(audit), null, 2)}\n`, "utf8");
  console.log(`Wrote ${relative(root, auditPath)}`);
  console.log(`Wrote ${relative(root, baselinePath)}`);
}

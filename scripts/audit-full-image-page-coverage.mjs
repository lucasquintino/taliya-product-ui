import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { resolveSourceAssetsDir } from "./source-assets-config.mjs";
import { collectRouteTargets, isRouteTargetStatus } from "./source-route-targets.mjs";

const root = process.cwd();
const checkMode = process.argv.includes("--check");
const specDir = resolve(root, "specs/001-product-ui-foundation");
const imageDir = resolveSourceAssetsDir({ root, args: process.argv.slice(2), requireExisting: false }).path;
const imageCoverageMapPath = resolve(specDir, "image-coverage-map.md");
const storybookIndexPath = resolve(root, "apps/docs/storybook-static/index.json");
const jsonPath = resolve(specDir, "full-image-page-coverage-audit.json");
const mdPath = resolve(specDir, "full-image-page-coverage-audit.md");
const storybookBuildAvailable = existsSync(storybookIndexPath);
const sourceAssetsAvailable = Boolean(imageDir && existsSync(imageDir));

const targetPages = [
  ["17_round-4.1A_hoje_01_acima-da-dobra.png.png", "crm-image-coverage-hoje--image-17-hoje-base"],
  ["18_round-4.1A_hoje_02_drawer-tarefa.png.png", "crm-image-coverage-hoje--image-18-hoje-drawer-tarefa"],
  ["19_round-4.1A_hoje_03_estado-critico-do-dia.png", "crm-image-coverage-hoje--image-19-hoje-estado-critico"],
  ["20_round-4.1A_hoje_04_historico-de-hoje.png.png", "crm-image-coverage-hoje--image-20-historico-de-hoje"],
  ["21_round-4.1B_operacao_01_kanban-geral.png.png", "crm-image-coverage-operação--image-21-kanban-geral"],
  ["22_round-4.1B_operacao_02_kanban-com-drawer.png", "crm-image-coverage-operação--image-22-kanban-com-drawer"],
  ["23_round-4.1C_tarefas_01_lista-detalhe.png.png", "crm-image-coverage-tarefas--image-23-lista-detalhe"],
  ["24_round-4.1C_checklists_01_lista-execucao-detalhe.png.png", "crm-image-coverage-checklists--image-24-lista-execucao-detalhe"],
  ["24_round-4.1D_inbox_01_conversa-aberta.png.png", "crm-image-coverage-inbox--image-24-d-inbox-conversa-aberta"],
  ["25_round-4.1C_aprovacoes_01_lista-decisao-detalhe.png.png", "crm-image-coverage-aprovacoes--image-25-lista-decisao-detalhe"],
  ["26_round-4.1F_agenda_01_calendario-operacional.png.png", "crm-image-coverage-agenda--image-26-agenda-calendario-operacional"],
  ["27_round-4.1E_alunos_01_lista-perfil-resumido.png.png", "crm-image-coverage-alunos--image-27-lista-perfil-resumido"],
  ["28_round-4.1E_aluno-perfil_01_resumo-operacional.png.png", "crm-image-coverage-alunos--image-28-aluno-perfil-resumo-operacional"],
  ["29_round-4.1F_aula_01_detalhe-com-chamada.png.png", "crm-image-coverage-agenda--image-29-aula-detalhe-com-chamada"],
  ["30_round-4.1F_financeiro_01_visao-geral-filas.png.png", "crm-image-coverage-financeiro--image-30-visao-geral-filas"],
  ["31_round-4.1F_reposicoes_01_fluxo-encaixe.png.png", "crm-image-coverage-reposições--image-31-fluxo-encaixe"],
  ["32_round-4.1F_financeiro_02_drawer-cobranca-selecionada.png.png", "crm-image-coverage-financeiro--image-32-financeiro-drawer-cobranca"],
  ["33_round-4.1F_financeiro_03_kanban-financeiro.png.png", "crm-image-coverage-financeiro--image-33-financeiro-kanban"],
  ["34_round-4.1F_financeiro_04_movimentacoes-filtros-drawer.png.png", "crm-image-coverage-financeiro--image-34-movimentacoes-filtros-drawer"],
  ["35_round-4.1F_turmas_01_lista-detalhe.png.png", "crm-image-coverage-agenda--image-35-turmas-lista-detalhe"],
  ["36_round-4.1F_grade_01_semana-modelo-bloqueio.png.png", "crm-image-coverage-agenda--image-36-grade-semana-modelo-bloqueio"],
  ["37_round-4.1G_vendas_01_pipeline-kanban.png.png", "crm-image-coverage-vendas--image-37-vendas-pipeline-kanban"],
  ["38_round-4.1G_vendas_02_lista-interessados.png.png", "crm-image-coverage-vendas--image-38-lista-interessados"],
  ["39_round-4.1G_experimental_01_lista-acompanhamento.png.png", "crm-image-coverage-vendas--image-39-experimental-lista"],
  ["40_round-4.1G_matriculas_01_checklist-conversao.png.png", "crm-image-coverage-vendas--image-40-matriculas-checklist-conversao"],
  ["41_round-4.1H_retencao_01_riscos-lista-drawer.png.png", "crm-image-coverage-retencao--image-41-retencao-riscos"],
  ["42_round-4.1H_cancelamentos_01_fila-salvamento-drawer.png.png", "crm-image-coverage-retencao--image-42-cancelamentos-fila"],
  ["43_round-4.1H_reativacoes_01_ex-alunos-retorno.png.png", "crm-image-coverage-retencao--image-43-reativacoes-ex-alunos"],
  ["44_round-4.1H_reclamacoes_01_fila-caso-sensivel-drawer.png.png", "crm-image-coverage-retencao--image-44-reclamacoes-caso-sensivel"],
  ["45_round-4.1I_relatorios_01_visao-gestao.png.png", "crm-image-coverage-relatorios--reports-management"],
  ["46_round-4.1I_dinheiro-na-mesa_01_oportunidades-por-origem.png.png", "crm-image-coverage-relatorios--money-on-the-table"],
  ["47_round-4.1J_suporte_01_central-studio-taliya.png.png", "crm-image-coverage-suporte--support-central"],
  ["48_round-4.1K_internal_01_visao-operacional.png.png", "crm-image-coverage-internal--image-48-internal-visao-operacional"],
  ["49_round-4.1K_internal_02_tenants-lista-detalhe.png", "crm-image-coverage-internal--image-49-internal-tenants-lista-detalhe"],
  ["50_round-4.1K_internal_03_tenant-detalhe-usuarios-grants.png", "crm-image-coverage-internal--image-50-internal-tenant-detalhe-usuarios-grants"],
  ["51A_round-4.1J_onboarding_shell-global-aprovado.png", "crm-image-coverage-setup--image-51-a-onboarding-shell-global"],
  ["51B_round-4.1J_onboarding_agente-configuracao-chat-aprovado.png", "crm-image-coverage-setup--image-51-b-onboarding-agente-configuracao-chat"],
  ["51C_round-4.1J_onboarding_workspace-configuracao-aprovado.png", "crm-image-coverage-setup--image-51-c-onboarding-workspace-configuracao"],
  ["51D_round-4.1J_onboarding_bloco-1-studio-v2-sem-nome-aprovado.png", "crm-image-coverage-setup--image-51-d-onboarding-studio"],
  ["51E_round-4.1J_onboarding_bloco-2-equipe-aprovado.png", "crm-image-coverage-setup--image-51-e-onboarding-equipe"],
  ["51F_round-4.1J_onboarding_bloco-3-canais-aprovado.png", "crm-image-coverage-setup--image-51-f-onboarding-canais"],
  ["51G_round-4.1J_onboarding_bloco-4-planos-aprovado.png", "crm-image-coverage-setup--image-51-g-onboarding-planos"],
  ["51K_round-4.1J_onboarding_bloco-5-pagamento-aprovado.png", "crm-image-coverage-setup--image-51-k-onboarding-pagamento"],
  ["51H_round-4.1J_onboarding_bloco-5-alunos-aprovado.png", "crm-image-coverage-setup--image-51-h-onboarding-alunos"],
  ["51I_round-4.1J_onboarding_bloco-6-turmas-aprovado.png", "crm-image-coverage-setup--image-51-i-onboarding-turmas"],
  ["51J_round-4.1J_onboarding_bloco-7-agenda-aprovado.png", "crm-image-coverage-setup--image-51-j-onboarding-agenda"],
  ["51L_round-4.1J_onboarding_bloco-9-revisao-aprovado.png", "crm-image-coverage-setup--image-51-l-onboarding-revisao"],
  ["52_round-4.1L_agentes_01_catalogo-agentes-aprovado.png", "crm-image-coverage-agentes--image-52-agentes-catalogo"],
  ["53_round-4.1L_agentes_02_agente-agenda-rotinas-aprovado.png", "crm-image-coverage-agentes--image-53-agente-agenda-rotinas"],
  ["54_round-4.1L_agentes_03_rotina-presenca-faltas-aprovado.png", "crm-image-coverage-agentes--image-54-rotina-presenca-faltas"],
  ["56_round-4.1L_agentes_04_fluxo-falta-com-aviso-v2-aprovado.png", "crm-image-coverage-agentes--image-56-fluxo-falta-com-aviso"],
  ["58_round-4.1L_agentes_05_teste-fluxo-falta-com-aviso-aprovado.png", "crm-image-coverage-agentes--image-58-teste-fluxo-falta-com-aviso"],
  ["59_round-4.1L_agentes_06_publicar-rotina-presenca-faltas-aprovado.png", "crm-image-coverage-agentes--image-59-publicar-rotina"],
  ["60_round-4.1M_configuracoes_01_hub-8-cards-aprovado.png", "crm-image-coverage-configuracoes--image-60-configuracoes-hub"],
  ["61_round-4.1M_configuracoes_02_permissoes-aprovado.png", "crm-image-coverage-configuracoes--image-61-configuracoes-permissoes"],
  ["62_round-4.1M_configuracoes_03_pagamentos-financeiro-aprovado.png", "crm-image-coverage-configuracoes--image-62-configuracoes-pagamentos"],
  ["63_round-4.1M_configuracoes_04_agenda-aprovado.png", "crm-image-coverage-configuracoes--image-63-configuracoes-agenda"],
  ["64_round-4.1M_configuracoes_05_notificacoes-aprovado.png", "crm-image-coverage-configuracoes--image-64-configuracoes-notificacoes"],
  ["65_round-4.1N_billing_01_assinatura-taliya-aprovado.png", "crm-image-coverage-billing--image-65-billing-assinatura"],
  ["66_round-4.1N_billing_02_faturas-taliya-aprovado.png", "crm-image-coverage-billing--image-66-billing-faturas"],
  ["67_round-4.1N_billing_03_add-ons-taliya-aprovado.png", "crm-image-coverage-billing--image-67-billing-add-ons"],
  ["68_round-4.1O_uso_01_visao-geral-aprovado.png", "crm-image-coverage-usage--image-68-uso-visao-geral"],
  ["69_round-4.1O_uso_02_extrato-aprovado.png", "crm-image-coverage-usage--image-69-uso-extrato"],
  ["70_round-4.1P_execucoes_01_fluxo-falta-com-aviso-aprovado.png", "crm-image-coverage-agentes--image-70-execucoes-fluxo"],
  ["71_round-4.1Q_acesso-assinatura_shell-base-aprovado.png", "crm-image-coverage-access-subscription--image-71-shell-base"],
  ["72_round-4.1Q_acesso-assinatura_signup-criar-conta-salvo-ajustes.png", "crm-image-coverage-access-subscription--image-72-signup"],
  ["73_round-4.1Q_acesso-assinatura_signin-entrar-salvo-ajustes.png", "crm-image-coverage-access-subscription--image-73-signin"],
  ["74_round-4.1Q_acesso-assinatura_revisar-assinatura-aprovado.png", "crm-image-coverage-access-subscription--image-74-review-subscription"],
  ["75_round-4.1Q_acesso-assinatura_aguardando-confirmacao-aprovado.png", "crm-image-coverage-access-subscription--image-75-pending-confirmation"],
  ["76_round-4.1Q_acesso-assinatura_resolver-assinatura-aprovado.png", "crm-image-coverage-access-subscription--image-76-resolve-subscription"],
  ["77_round-4.1Q_acesso-assinatura_assinatura-confirmada-setup-guiado-aprovado.png", "crm-image-coverage-access-subscription--image-77-confirmed-handoff"],
  ["78_round-4.1Q_onboarding_bem-vindo-taliya-setup-guiado-aprovado.png", "crm-image-coverage-setup--image-78-onboarding-bem-vindo"],
  ["79_round-4.1S_app-shell_01_base-web-sem-conteudo.png", "crm-image-coverage-image-79-empty-shell--image-79-empty-shell"]
];

function readRequired(filePath, label) {
  if (!existsSync(filePath)) throw new Error(`Missing ${label}: ${filePath}`);
  return readFileSync(filePath, "utf8");
}

const mapSource = readRequired(imageCoverageMapPath, "image coverage map");
const storybookIndex = storybookBuildAvailable
  ? JSON.parse(readFileSync(storybookIndexPath, "utf8"))
  : { entries: {} };
const targetPageMap = new Map(targetPages.map(([image, storyId]) => [image, storyId]));
function collectCoveredPageTargets(source) {
  return collectRouteTargets(source).map(({ image, status, section }) => ({
      image, status, section,
      mappedStoryId: targetPageMap.get(image) ?? "",
      mapped: targetPageMap.has(image)
    }));
}

function mapRowForImage(image) {
  const escaped = image.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return mapSource.split(/\r?\n/).find((line) => new RegExp(`^\\|\\s*\`${escaped}\``).test(line)) ?? "";
}

function exportSourceForStory(source, exportName) {
  if (!exportName) return "";

  const startPattern = new RegExp(`export\\s+(?:const\\s+${exportName}\\s*:|function\\s+${exportName}\\s*\\()`);
  const startMatch = startPattern.exec(source);
  if (!startMatch) return "";

  const rest = source.slice(startMatch.index);
  const nextExportMatch = /\nexport\s+(?:const\s+[A-Za-z0-9_]+\s*:|function\s+[A-Za-z0-9_]+\s*\()/.exec(rest.slice(1));
  if (!nextExportMatch) return rest;

  return rest.slice(0, nextExportMatch.index + 1);
}

function importedModuleSourceForRenderedPage(storySource, storyExportSource, importPath) {
  const renderMatch = /render:\s*\(\)\s*=>\s*<([A-Z][A-Za-z0-9_]*)\b/.exec(storyExportSource);
  if (!renderMatch) return "";

  const renderedName = renderMatch[1];
  const importPattern = new RegExp(
    `import\\s+\\{[^}]*\\b${renderedName}\\b[^}]*\\}\\s+from\\s+["']([^"']+)["']`
  );
  const importMatch = importPattern.exec(storySource);
  if (!importMatch || !importPath) return "";

  const importedPath = resolve(dirname(importPath), `${importMatch[1]}.tsx`);
  return existsSync(importedPath) ? readFileSync(importedPath, "utf8") : "";
}

const rows = targetPages.map(([image, storyId]) => {
  const imagePath = resolve(imageDir, image);
  const mapRow = mapRowForImage(image);
  const indexEntry = storybookIndex.entries?.[storyId];
  const importPath = indexEntry?.importPath ? resolve(root, "apps/docs", indexEntry.importPath.replace(/^\.\//, "")) : "";
  const storySource = importPath && existsSync(importPath) ? readFileSync(importPath, "utf8") : "";
  const storyExportSource = exportSourceForStory(storySource, indexEntry?.exportName ?? "");
  const renderedPageModuleSource = importedModuleSourceForRenderedPage(storySource, storyExportSource, importPath);
  const mapStatusCell = mapRow.split("|")[2]?.trim() ?? "";
  const mapStatusTarget = isRouteTargetStatus(mapStatusCell);
  const usesOfficialImports = /from\s+["']@taliya\/(?:crm|ui)["']/.test(storySource)
    || /from\s+["']@taliya\/(?:crm|ui)["']/.test(renderedPageModuleSource);
  const forbiddenLocalPackageImport = /from\s+["'][^"']*(?:packages\/|@\/packages\/|\.\.\/\.\.\/packages\/)/.test(storySource);
  const storyExportFound = Boolean(storyExportSource);
  const sourceImageReferenced = storyExportSource.includes(image);

  return {
    image,
    storyId,
    sourceImageExists: existsSync(imagePath),
    mapRowPresent: Boolean(mapRow),
    mapStatus: mapStatusCell,
    mapStatusTarget,
    storyIndexed: Boolean(indexEntry),
    storyTitle: indexEntry?.title ?? "",
    storyTitleValid: Boolean(indexEntry?.title?.startsWith("CRM / Image Coverage")),
    importPath: indexEntry?.importPath ?? "",
    storySourceExists: Boolean(importPath && existsSync(importPath)),
    exportName: indexEntry?.exportName ?? "",
    storyExportFound,
    sourceImageReferenced,
    usesOfficialImports,
    forbiddenLocalPackageImport,
    status:
      existsSync(imagePath) &&
      Boolean(mapRow) &&
      mapStatusTarget &&
      Boolean(indexEntry) &&
      Boolean(indexEntry?.title?.startsWith("CRM / Image Coverage")) &&
      Boolean(importPath && existsSync(importPath)) &&
      storyExportFound &&
      sourceImageReferenced &&
      usesOfficialImports &&
      !forbiddenLocalPackageImport
        ? "pass"
        : "fail"
  };
});

const duplicateImages = targetPages
  .map(([image]) => image)
  .filter((image, index, all) => all.indexOf(image) !== index);
const duplicateStoryIds = targetPages
  .map(([, storyId]) => storyId)
  .filter((storyId, index, all) => all.indexOf(storyId) !== index);
const coveredPageTargets = collectCoveredPageTargets(mapSource);
const unmappedCoveredTargetRows = coveredPageTargets.filter((row) => !row.mapped);

const audit = {
  date: new Date().toISOString().slice(0, 10),
  status: !storybookBuildAvailable
    ? "blocked-missing-storybook-build"
    : !sourceAssetsAvailable
      ? "blocked-missing-source-assets"
    : rows.every((row) => row.status === "pass") &&
        duplicateImages.length === 0 &&
        duplicateStoryIds.length === 0 &&
        unmappedCoveredTargetRows.length === 0
      ? "pass"
      : "fail",
  storybookBuildAvailable,
  sourceAssetsAvailable,
  blockingReasons: [
    ...(!storybookBuildAvailable ? ["apps/docs/storybook-static/index.json is missing"] : []),
    ...(!sourceAssetsAvailable ? ["canonical source image directory is missing"] : [])
  ],
  targetPageCount: targetPages.length,
  coveredPageTargetCount: coveredPageTargets.length,
  failedCount: rows.filter((row) => row.status !== "pass").length,
  duplicateImages,
  duplicateStoryIds,
  unmappedCoveredTargetRows,
  coveredPageTargets,
  rows,
  note:
    "This audit proves every product page/source image target has one static Storybook image-coverage story backed by official @taliya package imports. It does not certify 1:1 visual acceptance."
};

const table = rows
  .map(
    (row) =>
      `| \`${row.image}\` | \`${row.storyId}\` | ${row.mapStatus || "missing"} | ${row.storyIndexed ? "yes" : "no"} | ${row.sourceImageReferenced ? "yes" : "no"} | ${row.usesOfficialImports ? "yes" : "no"} | ${row.status} |`
  )
  .join("\n");
const unmappedTable =
  unmappedCoveredTargetRows.length > 0
    ? unmappedCoveredTargetRows
        .map((row) => `| \`${row.image}\` | ${row.status} | ${row.section} | missing |`)
        .join("\n")
    : "| none | n/a | n/a | pass |";

const md = `# Full Image Page Coverage Audit

Date: ${audit.date}

Status: ${audit.status}

Storybook static build available: ${audit.storybookBuildAvailable ? "yes" : "no"}

Source assets available: ${audit.sourceAssetsAvailable ? "yes" : "no"}

This audit verifies that every product page/source image target has a dedicated static Storybook image-coverage story, the story source references the exact approved source image filename, and the story source imports official \`@taliya/crm\` or \`@taliya/ui\` package components.

It does **not** certify 1:1 visual approval. Visual acceptance remains governed by the component/page certification ledgers.

## Summary

- Target page images: ${audit.targetPageCount}
- Covered page targets in map: ${audit.coveredPageTargetCount}
- Failed rows: ${audit.failedCount}
- Duplicate image mappings: ${duplicateImages.length}
- Duplicate story ids: ${duplicateStoryIds.length}
- Unmapped covered page targets: ${unmappedCoveredTargetRows.length}

## Covered Map Targets Missing Story Mapping

| Source image | Map status | Section | Status |
| --- | --- | --- | --- |
${unmappedTable}

## Rows

| Source image | Storybook id | Map status | Indexed | Source marker | Official imports | Status |
| --- | --- | --- | --- | --- | --- | --- |
${table}
`;

if (!checkMode) {
  writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`);
  writeFileSync(mdPath, md);
}

if (checkMode && audit.status !== "pass") {
  if (audit.status === "blocked-missing-storybook-build") {
    console.error("Full image page coverage audit blocked: build Storybook before checking static coverage");
  } else if (audit.status === "blocked-missing-source-assets") {
    console.error("Full image page coverage audit blocked: configure the canonical source image directory");
  } else {
    console.error(`Full image page coverage audit failed: failedRows=${audit.failedCount}`);
  }
  process.exit(1);
}

if (!checkMode) {
  console.log("Wrote specs/001-product-ui-foundation/full-image-page-coverage-audit.md");
  console.log("Wrote specs/001-product-ui-foundation/full-image-page-coverage-audit.json");
}

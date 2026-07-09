import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const root = process.cwd();
const sourceDir = "D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508";
const checkMode = process.argv.includes("--check");

function optionValue(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) {
    console.error(`Missing value for ${name}`);
    process.exit(1);
  }
  return value;
}

const ledgerPath = resolve(root, optionValue("--ledger", "specs/001-product-ui-foundation/batch-11-status-ledger.md"));
const outputDir = resolve(root, optionValue("--out-dir", "specs/001-product-ui-foundation"));

const statusLabels = [
  "Aprovado",
  "Aprovada",
  "Semi-aprovada",
  "Semi-aprovado",
  "Em revisão visual",
  "Em revisÃ£o visual",
  "Em revisao visual",
  "Em revisão",
  "Em ajuste",
  "Implementado sem certificacao",
  "Implementado sem certificação",
  "Nao iniciado",
  "Não iniciado",
  "Ignorada",
  "Ignorado"
];

function normalizeStatus(status) {
  const value = status.trim().toLowerCase();
  if (value.includes("semi-aprovad")) return "semiApproved";
  if (value.includes("aprovad")) return "approved";
  if (value.includes("ignorada") || value.includes("ignorado")) return "ignored";
  if (value.includes("revis")) return "visualReview";
  if (value.includes("ajuste")) return "adjusting";
  if (value.includes("implementado sem certifica")) return "implementedUncertified";
  if (value.includes("não iniciado")) return "notStarted";
  if (value.includes("nao iniciado") || value.includes("nÃ£o iniciado")) return "notStarted";
  return "unknown";
}

function stripCode(value) {
  return value.replace(/`/g, "").trim();
}

function clean(value) {
  return value.replace(/\s+/g, " ").trim();
}

function evidenceArtifactRefs(row) {
  const text = [row.evidence, row.blocker, row.nextAction].filter(Boolean).join(" ");
  const matches = text.match(/tmp\/visual-audit\/[A-Za-z0-9._\-/]+/g) ?? [];
  const uniqueRefs = [];
  const seen = new Set();

  for (const match of matches) {
    const ref = match.replace(/[),.;:]+$/g, "");
    if (seen.has(ref)) continue;
    seen.add(ref);
    uniqueRefs.push(ref);
  }

  return uniqueRefs;
}

function extractTableRows(markdown) {
  const rows = [];

  markdown.split(/\r?\n/).forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|") || trimmed.includes("| ---")) return;

    const cells = trimmed
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

    const status = cells.find((cell) => statusLabels.includes(stripCode(cell)));
    const subject = stripCode(cells[0] ?? "");
    if (!status || !/\.png/.test(subject)) return;

    rows.push({
      source: `${basename(ledgerPath)}:${index + 1}`,
      image: subject,
      status: stripCode(status),
      statusBucket: normalizeStatus(status),
      story: stripCode(cells[2] ?? ""),
      components: stripCode(cells[3] ?? ""),
      evidence: stripCode(cells[4] ?? ""),
      blocker: stripCode(cells[5] ?? ""),
      nextAction: stripCode(cells[6] ?? "")
    });
  });

  return rows;
}

function rowContextText(markdown, row) {
  const rowStart = markdown.indexOf(`| \`${row.image}\``);
  if (rowStart === -1) {
    return clean([row.components, row.evidence, row.blocker, row.nextAction].join(" "));
  }

  const afterRowStart = rowStart + 1;
  const nextImageRow = markdown.slice(afterRowStart).match(/\n\| `[^`]*\.png(?:\.png)?` \|/);
  const rowEnd = nextImageRow ? afterRowStart + nextImageRow.index : markdown.length;
  return clean(stripCode(markdown.slice(rowStart, rowEnd)));
}

function sourceCandidates(image) {
  const normalized = image.replace(/\\/g, "/").split("/").pop();
  const candidates = new Set([normalized]);

  if (normalized.endsWith(".png.png")) {
    candidates.add(normalized.replace(/\.png\.png$/, ".png"));
  } else if (normalized.endsWith(".png")) {
    candidates.add(normalized.replace(/\.png$/, ".png.png"));
  }

  return [...candidates].map((candidate) => resolve(sourceDir, candidate));
}

function sourceStatus(image) {
  const candidates = sourceCandidates(image);
  const existing = candidates.find((candidate) => existsSync(candidate));
  return {
    exists: Boolean(existing),
    path: existing ?? candidates[0],
    candidates
  };
}

function certificationMode(row, missingFields) {
  if (missingFields.length > 0) return "certification-data-missing";

  const nextAction = row.nextAction.toLowerCase();
  const blocker = row.blocker.toLowerCase();

  if (
    row.statusBucket === "semiApproved" &&
    (
      nextAction.includes("product review rejects") ||
      nextAction.includes("product review") ||
      nextAction.includes("use as composition baseline") ||
      blocker.includes("semi-approved")
    )
  ) {
    return "product-review-decision";
  }

  return "technical-certification-cycle";
}

const currentEvidenceAssertions = [
  {
    image: "72_round-4.1Q_acesso-assinatura_signup-criar-conta-salvo-ajustes.png",
    requiredSnippets: [
      "access-subscription-iteration8",
      "full-image-diff-metrics.json",
      "auth-72-73-probes",
      "access-subscription-semi-approval/smoke-72-77.json",
      "AccessShell layout=centered",
      "AuthCard",
      "SocialAuthButton",
      "Input",
      "Button",
      "AccessFooterLinks",
      "renders with official components",
      "shell/content present",
      "text present",
      "overflow zero"
    ],
    staleSnippets: [
      "shell/content missing",
      "text missing",
      "overflow returned"
    ]
  },
  {
    image: "73_round-4.1Q_acesso-assinatura_signin-entrar-salvo-ajustes.png",
    requiredSnippets: [
      "access-subscription-iteration8",
      "full-image-diff-metrics.json",
      "auth-72-73-probes",
      "access-subscription-semi-approval/smoke-72-77.json",
      "AccessShell layout=centered",
      "AuthCard mode=signin",
      "SocialAuthButton",
      "PasswordInput",
      "Checkbox",
      "AccessFooterLinks",
      "renders with official components",
      "shell/content present",
      "text present",
      "overflow zero"
    ],
    staleSnippets: [
      "signin shell/content missing",
      "signin text missing",
      "signin overflow returned"
    ]
  },
  {
    image: "74_round-4.1Q_acesso-assinatura_revisar-assinatura-aprovado.png",
    requiredSnippets: [
      "access-subscription-iteration8",
      "full-image-diff-metrics.json",
      "access-subscription-semi-approval/smoke-72-77.json",
      "AccessShell layout=centered",
      "CheckoutReviewPanel",
      "CheckoutPaymentCard",
      "PlanSummaryCard",
      "SecurePaymentNotice",
      "renders with official components",
      "shell/content present",
      "text present",
      "overflow zero"
    ],
    staleSnippets: [
      "checkout shell/content missing",
      "checkout text missing",
      "checkout overflow returned"
    ]
  },
  {
    image: "75_round-4.1Q_acesso-assinatura_aguardando-confirmacao-aprovado.png",
    requiredSnippets: [
      "access-subscription-iteration14",
      "side-by-side",
      "full-image-diff-metrics.json",
      "access-subscription-semi-approval/smoke-72-77.json",
      "AccessShell layout=centered",
      "SubscriptionStatusCard",
      "SubscriptionProgressStepper",
      "SecurePaymentNotice",
      "renders with official components",
      "shell/content present",
      "text present",
      "overflow zero"
    ],
    staleSnippets: [
      "pending confirmation shell/content missing",
      "pending confirmation text missing",
      "pending confirmation overflow returned"
    ]
  },
  {
    image: "76_round-4.1Q_acesso-assinatura_resolver-assinatura-aprovado.png",
    requiredSnippets: [
      "access-subscription-iteration14",
      "side-by-side",
      "full-image-diff-metrics.json",
      "subscription-76-probes",
      "access-subscription-semi-approval/smoke-72-77.json",
      "AccessShell layout=centered",
      "SubscriptionResolutionPanel",
      "SubscriptionStatusCard state=failed",
      "StatusSummaryCard",
      "InlineAlert",
      "Chip",
      "SecurePaymentNotice",
      "Button",
      "composition uses official components",
      "shell/content present",
      "text present",
      "bbox/overflow stable",
      "active token is 0.48"
    ],
    staleSnippets: [
      "secure-content = 0.52 mention is active",
      "resolve subscription shell/content missing",
      "resolve subscription overflow returned"
    ]
  },
  {
    image: "77_round-4.1Q_acesso-assinatura_assinatura-confirmada-setup-guiado-aprovado.png",
    requiredSnippets: [
      "access-subscription-iteration13",
      "handoff crop",
      "77-diff-metrics.json",
      "access-subscription-semi-approval/smoke-72-77.json",
      "AccessShell layout=centered",
      "SubscriptionResultHeader",
      "ConfirmedSetupHandoff",
      "PlanSummaryCard",
      "AccessFooterLinks",
      "renders with official components",
      "shell/content present",
      "text present",
      "overflow zero"
    ],
    staleSnippets: [
      "confirmed handoff shell/content missing",
      "confirmed handoff text missing",
      "confirmed handoff overflow returned"
    ]
  },
  {
    image: "17_round-4.1A_hoje_01_acima-da-dobra.png.png",
    requiredSnippets: [
      "today-17-columns-official-20260629",
      "image-17-columns-official.png",
      "today-17-dashboard-compact-probe-20260629",
      "today-17-column-probe-20260629",
      "today-17-schedule-density-official-20260701",
      "today-17-sidebar-utilities-official-20260701",
      "today-17-sidebar-rhythm-official-20260701",
      "dashboard grid x=124 y=203 width=1507 height=707 right=1631 bottom=910",
      "columns 393px 316px 270px 487px",
      "panels at source-like rows 255px 230px 194px",
      "Aulas de hoje panel x=124 y=472 width=393 height=230 overflowY=0",
      "schedule rows box x=141 y=519 width=359 height=166 bottom=685",
      "rows 41px",
      "clippedPanels=[]",
      "document overflowX=0 overflowY=0",
      "control.crm-operational-row.schedule-dense-height = 41px",
      "control.crm-operational-panel.schedule-dense-rows-margin-top = 4px",
      "history=null",
      "bodyTextIncludesHistory=false",
      "scrollHeight=941",
      "overflowX=0",
      "only top-nav Hoje selected",
      "settingsInMainStack=true",
      "modeControlsVisible=true",
      "maxAbsDelta=7.6",
      "navMaxAbsDelta=7.6",
      "utilityMaxAbsDelta=0.3",
      "utilityLabels=[Modo noite, Modo dia]",
      "selectedSidebarLabels=[]",
      "layout.crm-empty-shell.sidebar.nav-offset-y = 35px",
      "layout.crm-empty-shell.sidebar.nav-gap = 13px",
      "layout.crm-empty-shell.sidebar.first-control-gap = 1px",
      "layout.crm-empty-shell.sidebar.padding-bottom = 88px",
      "layout.crm-empty-shell.sidebar.utility-gap = 12px",
      "layout.crm-dashboard.today-columns = minmax(0, 393fr) minmax(0, 316fr) minmax(0, 270fr) minmax(0, 487fr)",
      "layout.crm-dashboard.today-rows = 255px 230px 194px",
      "layout.crm-product-shell.main.header-dashboard-height = 74px",
      "layout.crm-product-shell.header-dashboard-copy-offset-y = 18px",
      "layout.crm-product-shell.content-dashboard-padding = 0 41px 28px 52px",
      "today-17-current-recapture-20260702",
      "shell x=0 y=0 width=1672 height=941",
      "browser chrome x=0 y=0 width=1672 height=57",
      "sidebar x=0 y=57 width=72 height=884",
      "topbar x=72 y=57 width=1600 height=72",
      "topnav x=530 y=66 width=597 height=42",
      "page header x=122 y=129 width=1550 height=74",
      "dashboard x=124 y=203 width=1507 height=707 bottom=910",
      "utilityCount=2",
      "navCount=6",
      "globalCount=4",
      "clipped=[]",
      "activityFeedPresent=false",
      "corepack pnpm storybook:build"
    ],
    staleSnippets: [
      "dashboard grid x=122 y=185",
      "ActivityFeed starts at y=900",
      "dashboard panels overflow",
      "ActivityFeed starts at y=1018",
      "Aulas de hoje panel overflowY=15",
      "schedule dense 39px",
      "modeControlsVisible=false",
      "today-17-current-recapture-stale",
      "shell x=0 y=0 width=1672 height=1024",
      "sidebar x=0 y=57 width=72 height=708",
      "activityFeedPresent=true"
    ]
  },
  {
    image: "18_round-4.1A_hoje_02_drawer-tarefa.png.png",
    requiredSnippets: [
      "today-18-official-current-recapture-20260701",
      "today-18-current-recapture-20260702",
      "image18-official-current.png",
      "image18-current-recapture.png",
      "metrics.json",
      "today-18-footer-order-columns-official-20260629",
      "drawer x=1271 y=0 width=401 height=941 bottom=941",
      "topbar x=72 y=57 width=1199 height=72",
      "dashboard x=124 y=203 width=1106 height=707",
      "drawer grid 143px 675px 123px",
      "header x=1272 y=0 width=400 height=143",
      "body x=1272 y=143 width=400 height=675",
      "footer x=1272 y=818 width=400 height=123 bottom=941",
      "drawerBodyOverflowY=0",
      "missingTexts=[]",
      "footerOverlapsComments=false",
      "commentsBottomInsideBody=true",
      "originIsSecondary=true",
      "labelBeforeTitle=true",
      "titleBeforeStatus=true",
      "activityBeforeComment=true",
      "action row columns 96px 76px 90px 74px",
      "origin button x=1292 y=880 width=360 height=41",
      "clippedInDrawer=[]",
      "brokenImages=[]",
      "layout.crm-product-shell.viewport-drawer-*",
      "layout.crm-task-drawer.conversation-footer-columns"
    ],
    staleSnippets: [
      "today18.usesSharedDrawerFrame = true",
      "today-18-current-recapture-stale",
      "image18-stale-current.png",
      "drawer grid 143px 698px 100px",
      "footerOverlapsComments=true",
      "Confirmar reposição da Ana"
    ]
  },
  {
    image: "20_round-4.1A_hoje_04_historico-de-hoje.png.png",
    requiredSnippets: [
      "today-20-official-current-recapture-20260701",
      "today-20-current-recapture-20260702",
      "image20-official-current.png",
      "image20-current-recapture.png",
      "metrics.json",
      "today-20-scroll-realignment-official-20260629",
      "scrollY=697",
      "document overflowX=0 overflowY=851",
      "topbar x=72 y=57 width=1600 height=72",
      "dashboard tail x=124 y=-494 width=1507 height=707 bottom=213",
      "ActivityFeed x=124 y=227 width=1507 height=686 bottom=913",
      "grid 64px 568px",
      "columns 1447px",
      "header x=153 y=252 width=1447 height=64",
      "timeline x=153 y=316 width=1447 height=568",
      "first row x=269 y=316 width=1331 height=64",
      "last row x=269 y=820 width=1331 height=64 bottom=884",
      "rowCount=8",
      "hasHistoryTitle=true",
      "hasTodayFilter=true",
      "hasAllTypesFilter=true",
      "overflowX=0",
      "clippedRows=[]",
      "missingTexts=[]",
      "brokenImages=[]",
      "controls Hoje, Todos os tipos, and export"
    ],
    staleSnippets: [
      "black selected sidebar icon",
      "activeSidebarId as agenda",
      "Image20 initialScrollY=791",
      "current static capture uses scrollY=791",
      "today-20-current-recapture-stale",
      "image20-stale-current.png",
      "document overflowX=0 overflowY=710",
      "rowCount=7"
    ]
  },
  {
    image: "21_round-4.1B_operacao_01_kanban-geral.png.png",
    requiredSnippets: [
      "operation-21-official-current-recapture-20260701",
      "operation-21-quickfilters-source-state-official-20260701",
      "operation-21-activity-avatars-official-20260701",
      "operation-21-sidebar-source-state-official-20260702",
      "activeLabels=[\"Operação\"]",
      "utilityCount=4",
      "utility labels",
      "tokenKanbanPadding=0 28px 28px 24px",
      "operation-21-source-clean-filters-official-20260629",
      "operation-21-current-static-recheck-20260630b",
      "selectedFilterChipCount=0",
      "filter controls",
      "operation-21-kanban-density-official-20260629",
      "operation-21-activity-lanes-density-official-20260629",
      "search x=135 width=360",
      "filterbar x=122 y=185 width=1298 height=68",
      "board x=122 y=269 width=1298 height=570 bottom=839",
      "quickFilters width=220 height=570",
      "lanes width=1065 height=570",
      "lanes scrollWidth=clientWidth=1053",
      "columns about 195x544",
      "columnRightMax=1397",
      "cards 185x150",
      "activity table x=122 y=855 width=1298 height=224 bottom=1079",
      "activity rows 40px",
      "cards 179x150",
      "activity table x=96 y=855 width=1324 height=224 bottom=1079",
      "quickPressedCount=0",
      "activityPressedCount=0",
      "avatarImageCount=4",
      "loadedAvatarImageCount=4",
      "rowBackgrounds all transparent",
      "first quick filter background rgba(255, 255, 255, 0.74)",
      "drawer x=1045 y=0 width=403 height=1086",
      "clippedCards=[]",
      "brokenImages=[]",
      "Image21 overflowX=0",
      "documentOverflowX=0",
      "Image21 brokenImages=0"
    ],
    staleSnippets: [
      "filterbar overflow reintroduced",
      "kanban parent container clipped",
      "operation-21-page-filterbar-flow-v1",
      "operation-21-quickfilter-strong-stale",
      "operation-21-activity-initials-stale",
      "operation-21-sidebar-main-agenda-stale",
      "initial selected `Dono`/`Status` filter values",
      "activeLabels=[Agenda]",
      "utilityCount=1",
      "quickPressedCount=1",
      "activityPressedCount=1",
      "avatarImageCount=0",
      "loadedAvatarImageCount=0",
      "first quick filter background rgb(14, 17, 23)",
      "board remains x=122 y=269 width=1770 height=624",
      "columns 207x544",
      "activity table x=122 y=855 width=1298 height=282",
      "lanes scrollWidth 1111"
    ]
  },
  {
    image: "22_round-4.1B_operacao_02_kanban-com-drawer.png",
    requiredSnippets: [
      "operation-22-source-clean-filters-drawer-official-20260630",
      "operation-22-activity-avatars-drawer-official-20260701",
      "Image 22 regression evidence",
      "selectedFilterChipCount=0",
      "filter controls",
      "filterbar x=96 y=185 width=1284 height=68",
      "filterbar x=122 y=185 width=1284 height=68",
      "quick filters x=96 y=269 width=220 height=570",
      "board x=96 y=269 width=1284 height=570",
      "board x=122 y=269 width=1284 height=570 bottom=839",
      "selected card x=353 y=324 width=173 height=150",
      "selected card x=379 y=324 width=173 height=150",
      "operation-22-drawer-topnav-official-20260630",
      "layout.crm-product-shell.topbar.drawer-nav-left=346px",
      "nav x=418 width=525 right=943",
      "nav final right=943 before drawer x=1045",
      "navBeforeDrawer=true",
      "operation-22-case-drawer-header-official-20260629",
      "drawer x=1045 y=0 width=403 height=1086",
      "title y=78",
      "status y=107",
      "close x=1394 y=24",
      "orderTitleBeforeStatus=true",
      "statusVisible=true",
      "closeVisible=true",
      "footerVisible=true",
      "footerContained=true",
      "selectedCardBlack=true",
      "quickPressedCount=0",
      "activityPressedCount=0",
      "avatarImageCount=4",
      "loadedAvatarImageCount=4",
      "rowBackgrounds all transparent",
      "first quick filter background rgba(255, 255, 255, 0.74)",
      "activity table x=96 y=855 width=1284 height=224 bottom=1079",
      "overflowXZero=true",
      "drawerAboveTopbar=true",
      "Image22 brokenImages=0"
    ],
    staleSnippets: [
      "initial selected `Dono`/`Status` filter values",
      "operation-22-quickfilter-strong-stale",
      "operation-22-activity-initials-stale",
      "Image22 quickfilter regression missing",
      "quickPressedCount=1",
      "activityPressedCount=1",
      "avatarImageCount=0",
      "loadedAvatarImageCount=0",
      "first activity row selected gray",
      "first quick filter background rgb(14, 17, 23)",
      "extra label chip returned",
      "footer hidden",
      "selected hover lost black border",
      "drawer x=1045 y=57 width=403 height=1029",
      "status chip hidden",
      "promoted plain viewport placement",
      "nav right was `1055` under drawer x `1045`"
    ]
  },
  {
    image: "23_round-4.1C_tarefas_01_lista-detalhe.png.png",
    requiredSnippets: [
      "tasks-23-source-size-recapture-20260629",
      "tasks-23-compact-drawer-list-width-probe-v2-20260629",
      "tasks-23-compact-drawer-list-width-official-v2-20260629",
      "tasks-23-current-static-recheck-20260630",
      "tasks-23-current-source-review-20260701",
      "tasks-23-embedded-search-filter-official-20260701",
      "tasks-23-soft-quickfilters-official-20260701",
      "tasks-23-work-list-layout-official-20260702",
      "activityOrder=\"history-comments\" | \"comments-history\"",
      "searchFilterPlacement=\"embedded\"",
      "SearchInput filterPlacement=\"embedded\"",
      "CrmProductShell contentLayout=\"work-list\"",
      "layout.crm-product-shell.content-work-list-padding = 0 28px 28px 27px",
      "workLayout=190px 758px",
      "workGridColumns=956px",
      "content padding 0px 28px 28px 27px",
      "filterbar x=99 y=225 width=979 height=68",
      "quick filters x=99 y=309 width=190 height=727",
      "table x=297 y=309 width=781 height=727",
      "compact drawer width 342px",
      "drawer x=1089 y=185 width=342 height=877",
      "drawer x=1092 y=120 width=342 height=942",
      "filterButtonEmbedded=true",
      "filterButtonInsideSearchShell=true",
      "detachedFilterBetweenSearchAndOwner=false",
      "bodyOverflowY=0",
      "footerContained=true",
      "overflowingRows=0",
      "commentsBeforeHistory=true",
      "copilotBeforeFooter=true",
      "filterBarOverflow=0",
      "quickLabelOverflow=[]",
      "quickOverflow=[]",
      "quickSelectionTone=soft",
      "selected quick filter background rgb(234, 243, 255)",
      "documentOverflowX=0",
      "clippedCount=0",
      "tableCellOverflowCount=0",
      "quickOverflowCount=0",
      "brokenImages=0",
      "TaskDrawer size=\"compact\"",
      "layout.crm-task-drawer.compact-width",
      "control.crm-work-list-detail.filter-icon-size",
      "indexCells: 0",
      "no row text numeric prefix",
      "no horizontal overflow",
      "PageQuickFilters",
      "isolated CRM / Operational / TaskDrawer / All States story"
    ],
    staleSnippets: [
      "drawer footer clipped",
      "filter bar no longer fills page width",
      "detachedFilterBetweenSearchAndOwner=true",
      "filterButtonInsideSearchShell=false",
      "quickLabelOverflow=[Minhas tarefas]",
      "TaskDrawer stays default size",
      "quickSelectionTone=strong",
      "selected quick filter background rgb(14, 17, 23)"
    ]
  },
  {
    image: "24_round-4.1C_checklists_01_lista-execucao-detalhe.png.png",
    requiredSnippets: [
      "checklists-24-main-priority-v2",
      "layoutMode=main-priority",
      "layout columns 176px 815px",
      "table width 815px",
      "drawer width 342px",
      "no clipped quick-filter labels",
      "correct checklist-only actions",
      "checklists-24-stacked-header-v1",
      "pageHeaderRhythm=stacked",
      "filter bar y=225",
      "checklists-24-content-topbar-v1",
      "content-drawer topbar remains full width",
      "document overflow 0/0",
      "quick filters unclipped",
      "horizontal overflow 0",
      "checklists-24-current-static-recheck-20260630",
      "checklists-24-status-column-official-20260701",
      "filterbar x=122 y=225 width=1000 height=68",
      "workGridColumns=176px 816px",
      "quick filters x=122 y=309 width=176",
      "table panel x=306 y=309 width=816 height=727",
      "table x=307 y=310 width=814 height=420",
      "status cell widths 83px",
      "status overflows [0,0,0,0,0]",
      "next-step overflows [0,0,0,0,0]",
      "clippedCount=0",
      "clipped=[]",
      "selectedRowCount=1",
      "drawer body overflow 0",
      "drawerFooterContained=true",
      "layout.crm-checklist-table.status-column = 10.75%",
      "layout.crm-checklist-table.next-step-column",
      "stepRows",
      "row heights 73/73/73/73/73",
      "drawer x=1133 y=185 width=342 height=855",
      "drawer x=1089 y=185 width=342 height=877",
      "drawer footer x=1134 y=868 width=341 height=172",
      "filterBarOverflow=0",
      "quickOverflow=[]",
      "documentOverflowX=0",
      "brokenImages=0"
    ],
    staleSnippets: [
      "quick-filter labels clipped",
      "task-only actions",
      "drawer width 360px"
      ,"status overflows [4"
      ,"next-step overflow returned"
      ,"layout.crm-checklist-table.status-column missing"
    ]
  },
  {
    image: "25_round-4.1C_aprovacoes_01_lista-decisao-detalhe.png.png",
    requiredSnippets: [
      "approvals-25-compact-filterbar-inline-v1",
      "density: compact",
      "overflowX: 0",
      "overflowY: 0",
      "visible inline buttons Tipo, Risco, Origem, Status, Responsável",
      "no advanced-modal trigger",
      "filterbar x: 88 y: 201 width: 972 height: 68",
      "quick filters x: 88 width: 176",
      "table x: 272 width: 788",
      "drawer x: 1074 y: 120 width: 360 height: 942",
      "rowCount: 6",
      "selectedRows: 1",
      "no broken images",
      "timeline-item-height: 16px",
      "timeline-time-width: 36px",
      "contentLayout=\"main-priority\" class present",
      "selected row border preserved",
      "typeFitsCell: true",
      "approvals-25-current-static-recheck-20260630",
      "approvals-25-floating-topbar-fullwidth-probe-20260630",
      "approvals-25-floating-topbar-fullwidth-official-20260630",
      "topbar x=72 y=57 width=1376 height=72 right=1448",
      "topbarRightCss=0px",
      "topbar clientWidth=1376 scrollWidth=1376",
      "nav x=530 width=634 right=1164",
      "actions x=1239 width=181 right=1420",
      "navActionsGap=75",
      "filterbar x=88 y=201 width=972 height=68",
      "workGridColumns=176px 788px",
      "table panel x=272 y=285 width=788 height=727",
      "drawer x=1074 y=120 width=360 height=942",
      "filterBarOverflow=0",
      "quickOverflow=[]",
      "documentOverflowX=0",
      "documentOverflowY=0",
      "brokenImages=0"
    ],
    staleSnippets: [
      "advanced trigger present",
      "table width 714px"
    ]
  },
  {
    image: "27_round-4.1E_alunos_01_lista-perfil-resumido.png.png",
    requiredSnippets: [
      "students-27-inline-filterbar-official-20260702",
      "PageFilterBar density=\"compact\" searchFilterPlacement=\"embedded\"",
      "filterbar x=88 y=185 width=990 height=68",
      "embedded search filter button count 1",
      "separate advanced triggers 0",
      "inline filters Status, Plano, Turma, Risco, Responsavel",
      "quick filters x=88 y=269 width=176",
      "table panel x=272 y=269 width=806",
      "drawer x=1118 y=120 width=316",
      "clippedCount=0",
      "overflowX=0",
      "brokenImages=0"
    ],
    staleSnippets: [
      "StudentTable x=273 width=710",
      "filterBar x=122 width=901",
      "mojibake returned"
    ]
  },
  {
    image: "30_round-4.1F_financeiro_01_visao-geral-filas.png.png",
    requiredSnippets: [
      "finance-30-card-state-official-v13",
      "source-size render 1672x941",
      "overflowX=0",
      "overflowY=0",
      "headerActions.y=155",
      "action button height 42px",
      "nav x=530 y=66 width=585 height=42",
      "transparent segmented container background/border",
      "filter bar x=122 y=219 width=1522 height=64",
      "priority panel x=122 y=293 height=218",
      "queues x=122 y=521 height=372",
      "first card 350x181",
      "selectedCards=0",
      "paymentCardMenuButtons=0",
      "8 official PaymentCaseCard cards"
    ],
    staleSnippets: [
      "selectedCards=1",
      "paymentCardMenuButtons=1",
      "filter bar x=122 y=185"
    ]
  },
  {
    image: "31_round-4.1F_reposicoes_01_fluxo-encaixe.png.png",
    requiredSnippets: [
      "replacements-31-content-layout-main-priority-v3",
      "replacements-31-title-offset-v2",
      "replacements-31-source-size-recapture-20260629",
      "replacements-31-no-search-filter-official-20260629",
      "replacements-31-compact-stacked-official-20260629",
      "replacements-31-current-source-review-20260701-source-size",
      "replacements-31-filterbar-tight-official-20260701",
      "replacements-31-soft-quickfilters-official-20260701",
      "replacements-31-dot-selected-row-official-20260701",
      "replacements-31-current-consolidated-20260701",
      "replacements-31-spacious-header-probe-20260629",
      "viewport 1448x1086",
      "pageHeaderRhythm=\"compact-stacked\"",
      "pageHeaderRhythmCompactStacked=true",
      "copyDisplay=grid",
      "copyGap=8px",
      "header x=122 y=129 width=966 height=72",
      "filterbar x=88 y=201 width=972 height=68",
      "density=tight",
      "search x=101 width=268",
      "search shell width=258",
      "Status x=381",
      "Novo pedido x=912 width=135",
      "table x=272 y=285 width=788",
      "table panel x=272 y=285 width=788 height=733",
      "table x=273 y=286 width=786 height=639",
      "rowCount=8",
      "searchButtonExists=false",
      "no visible advanced/search trigger",
      "quick filters x=88 y=285 width=176 height=733",
      "selectionTone=soft",
      "selected quick filter background rgb(234, 243, 255)",
      "selected-row dot marker",
      "replacement selected rows on the checklist-table no-rail shadow",
      "selectedStudentDotVisible=true",
      "selected row uses task rail false",
      "selected student dot size 8pxx8px",
      "advancedTriggerExists=false",
      "drawer body overflow 0",
      "document overflowX=0",
      "document overflowY=0",
      "clippedCount=0",
      "tableCellOverflowCount=0",
      "quickOverflowCount=0",
      "source filterbar has no separate advanced/search filter icon",
      "drawer title y=150 below eyebrow bottom=142",
      "brokenImages=0",
      "previous table-width blocker is materially reduced"
    ],
    staleSnippets: [
      "replacements-31-current-source-review-20260701`",
      "viewport `1672x941`",
      "table is still 710px wide",
      "keeps table width 710px",
      "searchButtonExists=true",
      "advancedTriggerExists=true",
      "selectionTone=strong",
      "replacements-31-task-rail-stale",
      "task-table selected rail returned",
      "replacement selected row uses task-table rail",
      "selectedStudentDotVisible=false",
      "selectedRowUsesTaskRail=true",
      "selectedStudentDotSize=0x0",
      "filterbar x=88 y=225 width=972 height=68",
      "pageHeaderRhythm=\"stacked\""
    ]
  }
];

function currentEvidenceFindings(row, contextText) {
  const assertions = currentEvidenceAssertions.filter((assertion) => assertion.image === row.image);
  if (assertions.length === 0) return [];

  const rowText = clean([row.components, row.evidence, row.blocker, row.nextAction].join(" "));
  const text = contextText || rowText;
  return assertions.flatMap((assertion) => {
    const missing = assertion.requiredSnippets.filter((snippet) => !text.includes(snippet));
    const stale = assertion.staleSnippets.filter((snippet) => rowText.includes(snippet));
    const findings = [];

    if (missing.length > 0) {
      findings.push(`missing current evidence snippet(s): ${missing.join(", ")}`);
    }

    if (stale.length > 0) {
      findings.push(`contains stale evidence snippet(s): ${stale.join(", ")}`);
    }

    return findings;
  });
}

if (!existsSync(ledgerPath)) {
  console.error(`Missing visual certification ledger: ${ledgerPath}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

const ledgerText = readFileSync(ledgerPath, "utf8");
const rows = extractTableRows(ledgerText);
const currentEvidenceAssertionImages = new Set(currentEvidenceAssertions.map((assertion) => assertion.image));
const pendingRows = rows
  .filter((row) => !["approved", "ignored"].includes(row.statusBucket))
  .map((row) => {
    const source = sourceStatus(row.image);
    const hasCurrentEvidenceAssertion = currentEvidenceAssertionImages.has(row.image);
    const evidenceFindings = currentEvidenceFindings(row, rowContextText(ledgerText, row));
    const evidenceArtifacts = evidenceArtifactRefs(row).map((ref) => ({
      ref,
      exists: existsSync(resolve(root, ref))
    }));
    const missingFields = [
      row.story ? "" : "story",
      row.components ? "" : "components",
      row.evidence ? "" : "evidence",
      row.blocker ? "" : "blocker",
      row.nextAction ? "" : "nextAction",
      source.exists ? "" : "sourceImage",
      hasCurrentEvidenceAssertion ? "" : "currentEvidence:missing current evidence assertion",
      evidenceArtifacts.some((artifact) => !artifact.exists) ? "evidenceArtifacts" : "",
      ...evidenceFindings.map((finding) => `currentEvidence:${finding}`)
    ].filter(Boolean);

    return {
      ...row,
      hasCurrentEvidenceAssertion,
      sourceImageExists: source.exists,
      sourceImagePath: source.path,
      evidenceArtifacts,
      missingEvidenceArtifacts: evidenceArtifacts.filter((artifact) => !artifact.exists),
      missingFields,
      certificationMode: certificationMode(row, missingFields),
      actionable: missingFields.length === 0
    };
  });

const technicalRows = pendingRows.filter((row) => row.certificationMode === "technical-certification-cycle");
const productReviewRows = pendingRows.filter((row) => row.certificationMode === "product-review-decision");
const nextTechnicalRow = technicalRows.find((row) => row.actionable) ?? null;
const nextProductReviewRow = productReviewRows.find((row) => row.actionable) ?? null;
const evidenceArtifactCount = pendingRows.reduce((sum, row) => sum + row.evidenceArtifacts.length, 0);
const missingEvidenceArtifactCount = pendingRows.reduce((sum, row) => sum + row.missingEvidenceArtifacts.length, 0);

const audit = {
  date: new Date().toISOString().slice(0, 10),
  status: pendingRows.every((row) => row.actionable) ? "pass" : "fail",
  summary: {
    pendingCount: pendingRows.length,
    actionableCount: pendingRows.filter((row) => row.actionable).length,
    blockedByMissingPlanDataCount: pendingRows.filter((row) => !row.actionable).length,
    technicalCertificationCycleCount: technicalRows.length,
    productReviewDecisionCount: productReviewRows.length,
    currentEvidenceAssertionCount: currentEvidenceAssertions.length,
    currentEvidenceAssertionCoverageCount: pendingRows.filter((row) => row.hasCurrentEvidenceAssertion).length,
    currentEvidenceMissingAssertionCount: pendingRows.filter((row) => !row.hasCurrentEvidenceAssertion).length,
    evidenceArtifactCount,
    missingEvidenceArtifactCount,
    nextTechnicalImage: nextTechnicalRow?.image ?? null,
    nextProductReviewImage: nextProductReviewRow?.image ?? null
  },
  nextActions: {
    technicalCertification: nextTechnicalRow
      ? {
          image: nextTechnicalRow.image,
          story: nextTechnicalRow.story,
          source: nextTechnicalRow.source,
          sourceImagePath: nextTechnicalRow.sourceImagePath,
          currentBlocker: nextTechnicalRow.blocker,
          nextAction: nextTechnicalRow.nextAction
        }
      : null,
    productReviewDecision: nextProductReviewRow
      ? {
          image: nextProductReviewRow.image,
          story: nextProductReviewRow.story,
          source: nextProductReviewRow.source,
          sourceImagePath: nextProductReviewRow.sourceImagePath,
          currentBlocker: nextProductReviewRow.blocker,
          nextAction: nextProductReviewRow.nextAction
        }
      : null
  },
  pendingRows
};

const priorityRows = pendingRows
  .map(
    (row, index) =>
      `| ${index + 1} | ${row.source} | ${row.image} | ${row.status} | ${row.certificationMode} | ${row.story || "Missing"} | ${row.sourceImageExists ? "Yes" : "No"} | ${
        row.actionable ? (row.certificationMode === "product-review-decision" ? "Needs product review decision before technical changes" : "Ready for technical certification cycle") : `Missing: ${row.missingFields.join(", ")}`
      } |`
  )
  .join("\n");

const actionRows = pendingRows
  .map(
    (row, index) =>
      `| ${index + 1} | ${row.image} | ${clean(row.blocker) || "Missing"} | ${clean(row.nextAction) || "Missing"} |`
  )
  .join("\n");

const evidenceArtifactRows = pendingRows
  .map(
    (row) =>
      `| ${row.image} | ${row.evidenceArtifacts.length} | ${
        row.missingEvidenceArtifacts.length > 0 ? row.missingEvidenceArtifacts.map((artifact) => artifact.ref).join("<br />") : "None"
      } |`
  )
  .join("\n");

const md = `# Visual Certification Plan Audit

Date: ${audit.date}

Status: ${audit.status}. This audit turns the incomplete Batch 11 image rows into an actionable certification queue. It does not approve any image; it checks whether each pending image has enough source, story, evidence, blocker, and next-action data to start a proper source-backed certification cycle.

## Summary

| Metric | Count |
| --- | ---: |
| Pending image rows | ${audit.summary.pendingCount} |
| Actionable rows | ${audit.summary.actionableCount} |
| Rows missing plan data | ${audit.summary.blockedByMissingPlanDataCount} |
| Technical certification cycle rows | ${audit.summary.technicalCertificationCycleCount} |
| Product review decision rows | ${audit.summary.productReviewDecisionCount} |
| Current evidence assertions | ${audit.summary.currentEvidenceAssertionCount} |
| Pending rows with current evidence assertion | ${audit.summary.currentEvidenceAssertionCoverageCount} |
| Pending rows missing current evidence assertion | ${audit.summary.currentEvidenceMissingAssertionCount} |
| Evidence artifact references | ${audit.summary.evidenceArtifactCount} |
| Missing evidence artifact references | ${audit.summary.missingEvidenceArtifactCount} |
| Next technical certification image | ${audit.summary.nextTechnicalImage ?? "None"} |
| Next product-review decision image | ${audit.summary.nextProductReviewImage ?? "None"} |

## Next Executable Rows

| Lane | Image | Storybook story | Ledger row | Next action |
| --- | --- | --- | --- | --- |
| Technical certification | ${audit.nextActions.technicalCertification?.image ?? "None"} | ${audit.nextActions.technicalCertification?.story ?? "None"} | ${audit.nextActions.technicalCertification?.source ?? "None"} | ${clean(audit.nextActions.technicalCertification?.nextAction ?? "") || "None"} |
| Product review decision | ${audit.nextActions.productReviewDecision?.image ?? "None"} | ${audit.nextActions.productReviewDecision?.story ?? "None"} | ${audit.nextActions.productReviewDecision?.source ?? "None"} | ${clean(audit.nextActions.productReviewDecision?.nextAction ?? "") || "None"} |

## Certification Queue

| Priority | Ledger row | Image | Status | Mode | Storybook story | Source file | Queue status |
| ---: | --- | --- | --- | --- | --- | --- | --- |
${priorityRows || "| None | None | None | None | None | None | None | None |"}

## Blockers And Next Actions

| Priority | Image | Current blocker | Next action |
| ---: | --- | --- | --- |
${actionRows || "| None | None | None | None |"}

## Evidence Artifact Check

| Image | Artifact refs | Missing refs |
| --- | ---: | --- |
${evidenceArtifactRows || "| None | 0 | None |"}
`;

const outputJsonPath = resolve(outputDir, "visual-certification-plan-audit.json");
const outputMarkdownPath = resolve(outputDir, "visual-certification-plan-audit.md");

writeFileSync(outputJsonPath, `${JSON.stringify(audit, null, 2)}\n`);
writeFileSync(outputMarkdownPath, md);

if (checkMode && audit.status !== "pass") {
  console.error(`Visual certification plan audit failed: ${audit.summary.blockedByMissingPlanDataCount} pending row(s) missing plan data`);
  process.exit(1);
}

if (!checkMode) {
  console.log(`Wrote ${outputMarkdownPath}`);
  console.log(`Wrote ${outputJsonPath}`);
}

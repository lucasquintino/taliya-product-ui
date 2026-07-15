# Token System v1

Purpose: define the official token architecture required before implementing the full `Primitives / UI` library.

This file supersedes `token-values-v0.md` as the design-system token contract for future implementation. `token-values-v0.md` remains historical extraction input from board 01.

## Token Architecture

Tokens must be layered:

```text
raw tokens
  -> semantic tokens
    -> component/density tokens
      -> component CSS usage
```

Rules:

- Raw tokens preserve extracted visual values from the approved boards.
- Semantic tokens describe product meaning without naming a component.
- Component tokens are allowed when at least two primitives need the same dimensional or state value.
- Components should consume semantic/component tokens, not raw tokens directly, except in token demo stories.
- CRM-specific components may add local composition variables, but must not redefine primitive visual identity.
- Every batch must extract/reconcile tokens before implementation. A new component cannot enter `@taliya/ui` or `@taliya/crm` with reusable visual values hardcoded in component CSS.
- Existing primitives may keep local structural values only when they are not a reusable visual decision: `0`, `100%`, `auto`, Radix/SVG internals, accessibility clipping, and purely functional positioning.

## Design Intent

The Taliya Product UI visual system is:

- calm operational SaaS;
- light, low-noise, premium, dense enough for repeated work;
- black selected controls as the main active-state grammar;
- blue as functional/progress/information accent;
- red as danger/error/exception accent;
- soft translucent white panels over a cool gray app canvas;
- rounded, but not playful;
- icon-first for repeated controls;
- text-dense without becoming table-heavy.

## Canonical Raw Values

These raw values are extracted from images 01 and 07-15. Where generated boards differ slightly, this file picks the v1 canonical value.

| Raw Token | Value | Source | Decision |
| --- | --- | --- | --- |
| `raw.black.900` | `#10141A` | 01 | Canonical black for text and selected fills. |
| `raw.black.950` | `#080A0D` | card inverse states | Deep black used only for approved inverse-card gradients. |
| `raw.gray.100` | `#E4E4E4` | 01 | Canonical gray from the approved visual DNA board. |
| `raw.gray.110` | `#E4E6EA` | 09, 12, 13, 14, 15 footer bars | Cooler expanded frame gray for later CRM boards when exact board parity requires it. |
| `raw.gray.090` | `#F4F5F7` | 08-15 panels | Soft interior tint for subtle surfaces. |
| `raw.white` | `#FFFFFF` | all boards | White/high surface base. |
| `raw.blue.400` | `#83A2DB` | 01, 07 | Brand/functional blue. |
| `raw.blue.500` | `#5E8EE8` | 08, 10, 12, 13, 15 | Progress and selected information accent. |
| `raw.red.400` | `#CE6969` | 01, 07 | Danger red. |
| `raw.red.500` | `#EF4444` | 08, 09, 11, 14, 15 | Error/critical action accent. |
| `raw.green.500` | `#16A34A` | 09-15 | Success/connected accent. |
| `raw.orange.500` | `#F59E0B` | 08, 10, 13, 15 | Warning/pending accent. |
| `raw.purple.500` | `#8B5CF6` | 10, 12, 15 | Secondary category/status accent. |
| `raw.cyan.500` | `#20B8C7` | 10, 14 | Agenda/access category accent. |

## Semantic Colors

| Semantic Token | Value Source | Usage |
| --- | --- | --- |
| `color.text.primary` | `raw.black.900` | main headings, strong labels, selected text on light surfaces |
| `color.text.secondary` | `rgba(16, 20, 26, 0.66)` | body/meta labels |
| `color.text.muted` | `rgba(16, 20, 26, 0.44)` | captions, table secondary values |
| `color.text.disabled` | `rgba(16, 20, 26, 0.30)` | disabled labels |
| `color.text.inverse` | `raw.white` | text on selected black controls |
| `color.accent.info` | `raw.blue.500` | progress, info state, selected blue accents |
| `color.accent.danger` | `raw.red.500` | errors, destructive actions |
| `color.accent.success` | `raw.green.500` | success, connected |
| `color.accent.warning` | `raw.orange.500` | warning, attention |
| `color.accent.category-purple` | `raw.purple.500` | category chips/charts |
| `color.accent.category-cyan` | `raw.cyan.500` | agenda/access chips/charts |

Image 79 shell clone color tokens:

| Semantic Token | Value | Usage |
| --- | --- | --- |
| `color.crm-empty-shell.stage-bg` | radial white glow + gray diagonal gradient | outer desktop screenshot stage behind the browser frame |
| `color.crm-empty-shell.image-79.stage-bg` | `#A8A9AD` | source-derived Image 79 stage override |
| `color.crm-empty-shell.frame-bg` | `rgba(246, 245, 249, 0.96)` | browser window background |
| `color.crm-empty-shell.frame-border` | `rgba(255, 255, 255, 0.34)` | browser window border |
| `color.crm-browser.chrome-bg` | light vertical chrome gradient | top browser chrome strip |
| `color.crm-browser.foreground` | `#11141A` | browser toolbar icons and address text |
| `color.crm-browser.muted` | `rgba(16, 20, 26, 0.28)` | disabled browser toolbar icon |
| `color.crm-browser.address-bg` | `rgba(255, 255, 255, 0.74)` | browser URL pill |
| `color.crm-browser.address-border` | `rgba(16, 20, 26, 0.04)` | browser URL pill border |
| `color.crm-browser.address-icon` | `rgba(16, 20, 26, 0.66)` | lock/refresh icons inside URL pill |
| `color.crm-browser.traffic-red` | `#ED5653` | red browser traffic light |
| `color.crm-browser.traffic-gray` | `#9FA1A1` | gray browser traffic light |
| `color.crm-browser.traffic-green` | `#21C15A` | green browser traffic light |
| `color.crm-empty-shell.body-bg` | `rgba(242, 241, 247, 0.88)` | body area behind sidebar/main |
| `color.crm-empty-shell.image-79.body-bg` | `#EBEAEF` | source-derived Image 79 body override |
| `color.crm-empty-shell.image-79.sidebar-bg` | `#EBEBEF` | source-derived Image 79 sidebar override |
| `color.crm-empty-shell.image-79.main-bg` | `#ECEBEF` | source-derived Image 79 main override |
| `color.crm-empty-shell.image-79.canvas-bg` | `#EBEAEF` | source-derived Image 79 canvas override |
| `color.crm-empty-shell.sidebar-bg` | `rgba(250, 250, 252, 0.58)` | empty-shell sidebar column |
| `color.crm-empty-shell.main-bg` | `rgba(244, 243, 248, 0.78)` | main empty-shell area |
| `color.crm-empty-shell.title` | `#0C0D0F` | `Jornadas` page title |
| `color.crm-empty-shell.divider` | `rgba(16, 20, 26, 0.05)` | page header divider |
| `color.crm-empty-shell.canvas-bg` | `rgba(240, 239, 245, 0.50)` | empty content canvas |
| `color.crm-finance.payment-method-pix` | `#18A982` | Pix method mark in image 34 reconciliation rows |
| `color.crm-sales.row-selected-bg` | `rgba(94, 142, 232, 0.07)` | selected sales/list rows from images 38 and 39 |
| `color.crm-sales.whatsapp` | `#10B963` | WhatsApp source icon in image 39 trial rows |
| `color.crm-sales.checklist-line` | `rgba(94, 142, 232, 0.36)` | vertical enrollment checklist connector line from image 40 |
| `color.crm-retention.row-selected-bg` | `rgba(94, 142, 232, 0.07)` | selected retention risk row from image 41 |
| `color.crm-retention.automation-bg` | `rgba(255, 126, 42, 0.14)` | automation paused alert surfaces from images 42 and 44 |
| `color.crm-retention.suggestion-bg` | `rgba(139, 92, 246, 0.11)` | copilot suggestion panels from images 42, 43 and 44 |
| `color.crm-retention.whatsapp` | `#10B963` | WhatsApp fact icons in retention/case drawers |
| `color.crm-retention.divider` | `rgba(16, 20, 26, 0.07)` | retention drawer section separators |
| `color.crm-support.*` | suggestion/message/access support surfaces | support ticket drawer panels from image 47 |
| `color.crm-internal.*` | internal access, security, copiloto, selected-row and progress surfaces | internal dashboard, tenant row, and security rail from images 48-50 |
| `color.crm-reports.*` | red/green metrics and muted impact marker | reports card from image 45 |
| `color.crm-opportunity.*` | suggestion, notice, manual, and timeline surfaces | opportunity drawer from image 46 |
| `color.crm-subscription.*` | title/text/supporting, success/current progress, secure/release surfaces, confirmed icon, and primary action gradient | subscription access cards from images 75, 76 and 77 |
| `color.crm-plan-summary.*` | title/text/muted, blue entitlement icons, success/disabled status, divider and review chip surfaces | plan summary cards from images 65, 74, 76 and 77 |
| `color.crm-checkout-payment-card.*` | card title/text/muted, divider, field, placeholder and back-link surfaces | right payment card from image 74 |
| `color.crm-invoice-table.*` | invoice table surface, title/text/header, dividers, action border/hover, open/paid/failed chip fills | invoice-history panel from image 66 |
| `color.crm-addon-card.*` | add-on card surface, icon, text/meta, status chips and primary/secondary action colors | add-on cards from image 67 |
| `color.crm-approval-panel.*` | approval panel surface, title/text/muted, dividers, fact icons, source/status/risk markers, suggestion box, timeline and footer action colors | right approval decision panel from image 25 |
| `color.crm-before-after-diff.*` | before/after diff surface, title/text/muted, subtle table border, changed/added/removed tints and footer action colors | 346x188 diff panel from image 15 |
| `color.crm-audit-trail.*` | compact audit-log surface, table text/muted colors, subtle separators, row hover, success/alert/denied chips and muted open-object link | 502x184 `Log detalhado / auditoria` panel from image 15 |
| `color.crm-kanban-*` | board/rail/column/card surfaces, quick-filter hover, text/muted colors and manual/blocked/waiting/suggested/resolved/quota status chips | 1284x570 operation kanban board from image 21 |
| `color.crm-page-quick-filter.selected-soft-*` | light-blue selected quick-filter surface, border and foreground used by `PageQuickFilters selectionTone="soft"` | Image 24 checklist rail selected `Hoje` state, aliased to the approved kanban/manual blue family so list pages do not define local selected-state colors |

Subscription access color details:

Rule: access/subscription screens must consume the canonical system surfaces first. CRM-specific surface tokens remain as aliases only so image/component contracts stay readable:
`color.crm-access-shell.page-bg` and `color.crm-access-shell.centered-main-bg` -> `surface.app`;
`color.crm-access-shell.brandbar-bg` and `color.crm-access-shell.footer-bg` -> `surface.panel`;
`color.crm-access-shell.content-bg`, `color.crm-access-shell.panel-bg`, `color.crm-auth-card.bg`, `color.crm-subscription.card-bg`, and `color.crm-checkout-payment-card.bg` -> `surface.card`;
`color.crm-auth-card.control-bg` -> `surface.field`.

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-subscription.title` | `#101827` | Main titles in subscription cards and setup handoff. |
| `color.crm-subscription.text` | `#25324B` | Primary body/cell text in images 75-77. |
| `color.crm-subscription.text-muted` | `rgba(46, 57, 83, 0.76)` | Secondary descriptions and release note text. |
| `color.crm-subscription.supporting` | `rgba(46, 57, 83, 0.70)` | Footer/helper/link-adjacent supporting text. |
| `color.crm-subscription.progress-success` | `#20C86F` | Completed progress marker state. |
| `color.crm-subscription.progress-current` | `#37BEB2` | Current progress marker state. |
| `color.crm-subscription.status-dot` | `#35D5C9` | Verifying/current small status dot. |
| `color.crm-subscription.link` | `#52617E` | Failed subscription text-link buttons in image 76. |
| `color.crm-subscription.detail-icon` | `#1F66E5` | Detail row icons in failed subscription card. |
| `color.crm-subscription.card-bg` | `var(--taliya-surface-card)` | Subscription cards and setup handoff card; alias of the canonical card surface. |
| `color.crm-subscription.confirmed-icon-bg` | `#FFFFFF` | Confirmed card hero icon center. |
| `color.crm-subscription.confirmed-icon-ring` | `#C4F7D3` | Confirmed card hero icon ring. |
| `color.crm-subscription.confirmed-icon-fg` | `#08D044` | Confirmed check icon and release-note icon. |
| `color.crm-subscription.release-note-bg` | `rgba(22, 163, 74, 0.04)` | Confirmed release notice background. |
| `color.crm-subscription.primary-action-bg-start` | `#252B34` | Primary action gradient top/left stop from images 76-77. |
| `color.crm-subscription.primary-action-bg-end` | `#080A0F` | Primary action gradient bottom/right stop from images 76-77. |
| `color.crm-subscription.primary-action-border` | `rgba(16, 20, 26, 0.18)` | Primary action edge/border on subscription cards. |

Plan summary color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-plan-summary.title` | `#101827` | Plan title, section title and failed-card heading in images 65, 74, 76 and 77. |
| `color.crm-plan-summary.text` | `#25324B` | Primary plan body text, row labels and entitlement labels. |
| `color.crm-plan-summary.muted` | `#52617E` | Eyebrow, description, account and release-note supporting text. |
| `color.crm-plan-summary.icon-bg` | `rgba(46, 114, 255, 0.10)` | Blue circular entitlement icons in active and failed plan cards. |
| `color.crm-plan-summary.icon-fg` | `#1F66E5` | Blue entitlement glyphs in active and failed plan cards. |
| `color.crm-plan-summary.success` | `#20C86F` | Included/check status dots in review plan card. |
| `color.crm-plan-summary.disabled` | `rgba(46, 57, 83, 0.42)` | Disabled text and help-button border in excluded review rows. |
| `color.crm-plan-summary.neutral-status` | `#A8B0BF` | Excluded/minus review status markers. |
| `color.crm-plan-summary.divider` | `rgba(16, 20, 26, 0.08)` | Review and detail separators. |
| `color.crm-plan-summary.chip-bg` | `rgba(16, 20, 26, 0.06)` | Review header agent-count chip. |

Invoice table color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-invoice-table.bg` | `#FFFFFF` | Invoice-history panel and action button surface in image 66. |
| `color.crm-invoice-table.title` | `#10141A` | Panel title. |
| `color.crm-invoice-table.text` | `#25324B` | Invoice cells and action labels. |
| `color.crm-invoice-table.header` | `#2E3953` | Column headers. |
| `color.crm-invoice-table.divider` | `rgba(16, 20, 26, 0.08)` | Header and row separators. |
| `color.crm-invoice-table.border` | `rgba(16, 20, 26, 0.06)` | Outer panel border. |
| `color.crm-invoice-table.action-border` | `rgba(16, 20, 26, 0.12)` | Abrir/Baixar button border. |
| `color.crm-invoice-table.action-hover-bg` | `rgba(16, 20, 26, 0.04)` | Row and action hover feedback. |
| `color.crm-invoice-table.open-bg` | `#FBEDE8` | `Em aberto` status chip background. |
| `color.crm-invoice-table.open-fg` | `#E65F00` | `Em aberto` status chip text. |
| `color.crm-invoice-table.paid-bg` | `#DFF7E8` | `Paga` status chip background. |
| `color.crm-invoice-table.paid-fg` | `#0F9A4A` | `Paga` status chip text. |
| `color.crm-invoice-table.failed-bg` | `rgba(239, 68, 68, 0.12)` | Failed invoice fallback state chip background. |
| `color.crm-invoice-table.failed-fg` | `#B94444` | Failed invoice fallback state chip text. |

Add-on card color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-addon-card.bg` | `#FFFFFF` | Add-on card surface in image 67. |
| `color.crm-addon-card.title` | `#10141A` | Add-on card title. |
| `color.crm-addon-card.text` | `#10141A` | Primary add-on description. |
| `color.crm-addon-card.muted` | `#52617E` | Supporting add-on meta text. |
| `color.crm-addon-card.border` | `rgba(16, 20, 26, 0.08)` | Card border. |
| `color.crm-addon-card.icon-bg` | `rgba(131, 162, 219, 0.14)` | Circular icon background. |
| `color.crm-addon-card.icon-fg` | `#1F66E5` | Icon glyph color. |
| `color.crm-addon-card.available-bg` / `available-fg` | `#DFF7E8` / `#0F9A4A` | `Disponivel` chip. |
| `color.crm-addon-card.plan-bg` / `plan-fg` | `#FBEDE8` / `#E65F00` | `Plano maximo` chip. |
| `color.crm-addon-card.consult-bg` / `consult-fg` | `#F1E7FF` / `#6D42D8` | `Sob consulta` chip. |
| `color.crm-addon-card.active-bg` / `active-fg` | `rgba(22, 163, 74, 0.12)` / `#16A34A` | Operational active chip. |
| `color.crm-addon-card.action-primary-bg` / `action-primary-fg` | `#000000` / `#FFFFFF` | Primary add package action. |
| `color.crm-addon-card.action-border` | `#A9B2C6` | Secondary support action border. |

Quota progress color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-quota-progress.bg` | `#FFFFFF` | Quota cycle card surface in image 68. |
| `color.crm-quota-progress.title` | `#10141A` | Title, total value and primary labels. |
| `color.crm-quota-progress.text` | `#10141A` | Usage labels and button text context. |
| `color.crm-quota-progress.muted` | `#25324B` | Threshold helper text. |
| `color.crm-quota-progress.border` | `rgba(16, 20, 26, 0.08)` | Card border. |
| `color.crm-quota-progress.track` | `#E3E5ED` | Progress track. |
| `color.crm-quota-progress.fill` | `#005CFF` | Progress fill and message icon glyph. |
| `color.crm-quota-progress.fill-label` | `#FFFFFF` | Progress label and icon dots. |
| `color.crm-quota-progress.icon-bg` | `rgba(46, 114, 255, 0.08)` | Message icon tile surface. |
| `color.crm-quota-progress.normal-*` | green success range | `Normal` badge in image 68. |
| `color.crm-quota-progress.action-*` | blue primary and muted secondary | `Ver add-ons` and `Ver extrato` actions. |
| `color.crm-usage-origin-row.*` | bg transparent; hover/selected subtle blue; text `#10141A`; muted `#25324B`; icon bg `#EEF5FF`; icon/fill `#005CFF`; track `#DFE4EC`; disabled muted | Usage-origin source rows in image 68. |
| `color.crm-export-action.*` | bg/menu bg `#FFFFFF`; hover subtle neutral; border `rgba(16, 20, 26, 0.08)`; menu border `rgba(16, 20, 26, 0.10)`; text/icon `#10141A`; disabled muted | Reports global export action in image 45. |

Usage ledger color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-usage-ledger.bg` | `#FFFFFF` | Usage-ledger panel, filters, table and load-more surface in image 69. |
| `color.crm-usage-ledger.title` | `#10141A` | Panel title. |
| `color.crm-usage-ledger.text` | `#10141A` | Table body, filter labels and load-more text. |
| `color.crm-usage-ledger.muted` | `#25324B` | Description and footer label. |
| `color.crm-usage-ledger.border` / `table-border` | `rgba(16, 20, 26, 0.08)` | Panel/table boundary and row separators. |
| `color.crm-usage-ledger.filter-bg` / `filter-border` / `filter-hover` | white, subtle border and `rgba(16, 20, 26, 0.04)` | Four source filter controls. |
| `color.crm-usage-ledger.link` / `link-hover` | `#005CFF` / `#0048D8` | Blue row action buttons. |
| `color.crm-usage-ledger.consumed-*` | green success range | `Consumido` status chips. |
| `color.crm-usage-ledger.estimated-*` | blue info range | `Estimada` status chip. |
| `color.crm-usage-ledger.reprocessed-*` | gray neutral range | `Reprocessado` status chip. |
| `color.crm-usage-ledger.whatsapp-*` / `ai-*` | green WhatsApp and blue IA origin marks | Origin icon circles in image 69 table rows. |

Approval panel color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-approval-panel.bg` | `#FFFFFF` | Approval panel surface in image 25. |
| `color.crm-approval-panel.title` | `#10141A` | Panel title and primary labels. |
| `color.crm-approval-panel.text` | `#10141A` | Fact values, section copy and action text. |
| `color.crm-approval-panel.muted` | `#25324B` | Secondary labels, timeline text and footer source action. |
| `color.crm-approval-panel.border` / `divider` | `rgba(16, 20, 26, 0.08)` / `rgba(16, 20, 26, 0.07)` | Panel edge, section separators and footer top border. |
| `color.crm-approval-panel.close-bg` / `close-border` / `close-hover-bg` | `#FFFFFF` / `rgba(16, 20, 26, 0.07)` / `rgba(16, 20, 26, 0.04)` | Circular close control. |
| `color.crm-approval-panel.chip-bg` / `chip-fg` | `rgba(16, 20, 26, 0.05)` / `#10141A` | `Aprovacao` eyebrow chip. |
| `color.crm-approval-panel.suggestion-bg` / `suggestion-border` / `suggestion-chip-bg` | purple-tinted source range | Copilot suggestion box and `Sugestao do copiloto` chip. |
| `color.crm-approval-panel.status-*` | warning/success/danger/neutral ranges | Pending, approved, rejected and expired status fact/value colors. |
| `color.crm-approval-panel.whatsapp` / `copilot` | `#10B963` / `#6D42D8` | Source and requester fact markers. |
| `color.crm-approval-panel.risk-low` / `risk-medium` / `risk-high` | green/orange/red semantic range | Risk fact marker and impact states. |
| `color.crm-approval-panel.timeline-dot` | `#83A2DB` | History connector dot. |
| `color.crm-approval-panel.action-primary-*` / `action-secondary-*` / `action-link` | black primary, white secondary, muted link | Footer decision actions from image 25. |

Before/after diff color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-before-after-diff.bg` | `#FFFFFF` | 346x188 before/after diff panel surface in image 15. |
| `color.crm-before-after-diff.title` | `#10141A` | `8. Diff antes / depois` title. |
| `color.crm-before-after-diff.text` | `#344056` | Table cells and footer labels after source antialias matching. |
| `color.crm-before-after-diff.muted` | `#566278` | Table header labels and secondary footer text. |
| `color.crm-before-after-diff.border` | `rgba(16, 20, 26, 0.045)` | Panel edge. |
| `color.crm-before-after-diff.table-border` | `rgba(16, 20, 26, 0.038)` | Soft table body grid from the source crop. |
| `color.crm-before-after-diff.changed-bg` / `added-bg` | `rgba(22, 163, 74, 0.055)` | `Valor novo` changed cells in image 15. |
| `color.crm-before-after-diff.removed-bg` | `rgba(239, 68, 68, 0.055)` | Removed/rejected fallback diff cells. |
| `color.crm-before-after-diff.action-primary-bg` / `action-primary-fg` | `#000000` / `#FFFFFF` | `Aprovar` action. |
| `color.crm-before-after-diff.action-secondary-bg` / `action-border` | `#FFFFFF` / `rgba(16, 20, 26, 0.10)` | `Reverter` action. |

Audit trail color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-audit-trail.bg` | `#FFFFFF` | 502x184 audit-log panel surface in image 15. |
| `color.crm-audit-trail.title` | `#10141A` | `9. Log detalhado / auditoria` title. |
| `color.crm-audit-trail.text` | `#344056` | Actor, object, action, time and origin table cells after source crop matching. |
| `color.crm-audit-trail.muted` | `#566278` | Table headers and external-link icon color. |
| `color.crm-audit-trail.border` | `rgba(16, 20, 26, 0.045)` | Soft outer panel edge from the source crop. |
| `color.crm-audit-trail.table-border` | `rgba(16, 20, 26, 0.035)` | Header/row separators in the compact audit table. |
| `color.crm-audit-trail.row-hover` | `rgba(16, 20, 26, 0.025)` | Real row hover/focus feedback without changing the approved neutral source state. |
| `color.crm-audit-trail.success-bg` / `success-fg` | `#DFF7E8` / `#0F9A4A` | `sucesso`/approved-style status chip in the source table. |
| `color.crm-audit-trail.alert-bg` / `alert-fg` | `#FBEDE8` / `#E65F00` | `alerta` status chip in the source table. |
| `color.crm-audit-trail.denied-bg` / `denied-fg` | `rgba(239, 68, 68, 0.12)` / `#B94444` | Sensitive/blocked denied audit status variants. |
| `color.crm-audit-trail.link` | `#52617E` | `Ver auditoria completa` footer action and low-emphasis audit links. |

Kanban color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-kanban-board.bg` | `transparent` | Board body layout itself; source background is provided by rail/columns. |
| `color.crm-kanban-rail.bg` | `rgba(248, 249, 252, 0.82)` | `Filtros rapidos` rail surface in image 21. |
| `color.crm-kanban-column.bg` / `column.border` | `rgba(248, 249, 252, 0.76)` / `rgba(16, 20, 26, 0.065)` | Five operation lane surfaces and subtle lane borders. |
| `color.crm-kanban-card.bg` / `card.border` | `#FFFFFF` / `rgba(16, 20, 26, 0.07)` | Operation task cards in the board lanes. |
| `color.crm-kanban-title` / `text` / `muted` | `#10141A` / `#25324B` / `#52617E` | Lane/card titles, body facts and secondary labels. |
| `color.crm-kanban-quick-filter.*` | white surface, subtle border and blue-tinted hover | Rail filter buttons from image 21. |
| `color.crm-kanban-manual-*` / `blocked-*` / `waiting-*` / `suggested-*` / `resolved-*` / `quota-*` | source blue/red/orange/purple/green/blue chip ranges | Operation card state chips from image 21. |

Conversation list color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-conversation-list.bg` / `row-bg` | `#FFFFFF` | Left inbox list background and row card surface from image 24. |
| `color.crm-conversation-list.row-selected-bg` / `row-selected-border` | `rgba(94, 142, 232, 0.045)` / `#A8C7FF` | Selected Ana Silva row surface and blue edge. |
| `color.crm-conversation-list.text` / `muted` / `time` | `#10141A` / `#25385F` / `#25385F` | Row title, preview/meta text and time labels. |
| `color.crm-conversation-list.whatsapp` | `#16C75B` | WhatsApp channel badge over avatars. |
| `color.crm-conversation-list.meta-*` | transparent/meta gray range | Reception/Finance/Atendimento/Sistema metadata chips. |
| `color.crm-conversation-list.waiting-*` / `progress-*` / `copilot-*` / `failed-*` / `optout-*` | source orange, blue, purple, red and green ranges | Status chips in the five source rows. |
| `color.crm-conversation-list.footer-control-bg` / `footer-current-*` | `#FFFFFF`, `#000000`, `#FFFFFF` | Page-size button, current page dot and inverse current-page text. |

Quick reply color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-quick-reply.bg` / `bg-hover` / `bg-selected` | `#FFFFFF`, `#F7FAFF`, `#EEF5FF` | Source and operational surfaces for the setup-agent guided reply buttons from image 51B. |
| `color.crm-quick-reply.border` / `border-hover` | `#C6D9FF`, `#8FB6FF` | Soft blue outline and stronger interactive outline for quick reply pills. |
| `color.crm-quick-reply.fg` | `#1F66E5` | Source blue label and `HelpCircle` icon color in the approved quick reply stack. |
| `color.crm-quick-reply.icon-bg` | `#FFFFFF` | Icon background remains transparent/white; the visible circle comes from the official glyph, not a second wrapper border. |
| `color.crm-quick-reply.disabled-*` | muted white/blue-gray range | Disabled and loading quick replies while preserving pill geometry. |

Setup agent chat token details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `layout.crm-setup-agent-chat.width` / `height` | `675px` / `1381px` | Exact Image 51B setup-agent panel crop `image51b-setup-agent-chat-panel-candidate2.png`. |
| `layout.crm-setup-agent-chat.content-width` | `613px` | Source content rail for header rule, composer and footer. |
| `layout.crm-setup-agent-chat.info-width` | `494px` | Blue informational callout width from the approved crop. |
| `layout.crm-setup-agent-chat.message-one-width` / `message-two-width` | `468px` / `454px` | Source message bubble widths in Image 51B. |
| `control.crm-setup-agent-chat.padding` | `38px 30px 25px` | Panel internal offset corrected for the 1px source border while preserving the 31px visible left rail. |
| `control.crm-setup-agent-chat.logo-size` / `logo-mark-width` | `84px` / `47px` | Circular source logo container and internal official Taliya mark width. |
| `control.crm-setup-agent-chat.info-*` | `106px` height, `14px` radius, `23px 28px 21px 57px` padding, `34px` icon, `24/37` text | Source blue callout geometry and type rhythm. |
| `control.crm-setup-agent-chat.message-one-height` / `message-two-height` | `209px` / `211px` | Exact source bubble heights; prevents text auto-height from shifting quick replies/composer. |
| `control.crm-setup-agent-chat.composer-*` | `82px` height, `41px` radius, `0 77px 0 24px` padding, `62px` send button | Source composer pill and black send action. |
| `color.crm-setup-agent-chat.*` | white panel/messages, source blue info/reply/action range, muted footer/header text | Exact Image 51B chat panel colors. |
| `shadow.crm-setup-agent-chat.*` | panel, message, composer and send-button elevation | Source soft shadows promoted from visual comparison, no story-only shadow values allowed. |

Setup human help CTA token details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `layout.crm-setup-human-help-cta.width` / `height` | `372px` / `83px` | Exact Image 78 footer CTA crop from the setup agent panel. |
| `control.crm-setup-human-help-cta.padding` | `32px 0 0` | Source vertical distance from divider to the `Agendar ajuda` action baseline area. |
| `control.crm-setup-human-help-cta.font-size` / `line-height` / `font-weight` | `18px` / `24px` / `500` | Source link-style CTA typography. |
| `color.crm-setup-human-help-cta.rule` / `link` | `rgba(16, 20, 26, 0.10)` / `#1F6FEF` | Source top divider and blue action link. |
| `color.crm-setup-human-help-cta.active` / `unavailable` | `#16A34A` / `#8A93A5` | Operational state colors for scheduled help and unavailable help while preserving source anatomy. |

Checklist row color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-checklist-row.bg` / `bg-hover` / `bg-selected` | `#FFFFFF`, soft blue hover/selected tints | Drawer checklist/subtask row surface and interactive states from image 23. |
| `color.crm-checklist-row.text` / `index` | `#10141A`, `#566278` | Source task title and numeric prefix color in the right drawer checklist block. |
| `color.crm-checklist-row.border` | `rgba(16, 20, 26, 0.065)` | Subtle horizontal separator between checklist rows. |
| `color.crm-checklist-row.check-border` | `#A8B3C4` | Empty circular checkbox stroke in the source row. |
| `color.crm-checklist-row.check-complete-*` / `warning` / `blocked` | green/white, orange, red semantic range | Operational states for reused checklist rows beyond the source incomplete state. |
| `color.crm-checklist-row.disabled-fg` | muted black range | Disabled and blocked row text. |
| `color.crm-comment-thread.bg` / `border` | `#FFFFFF`, subtle black alpha border | Compact comment card surface from image 23 right drawer. |
| `color.crm-comment-thread.text` / `muted` / `link` | `#10141A`, `#596784`, `#1F66E5` | Comment title/name/body/time and `Ver todos` action from the approved card. |
| `color.crm-comment-thread.row-hover` | soft blue tint | Interactive row hover/focus state while preserving source anatomy. |
| `color.crm-comment-thread.failed-*` / `blocked-*` / `disabled-fg` | red tint/range and muted blocked range | Operational failed retry and blocked comment-thread states. |
| `color.crm-task-drawer.bg` / `edge` / `rule` | `#FFFFFF`, subtle panel edge and source divider alphas | Exact right task drawer panel surface, rail edge and internal rules from image 18. |
| `color.crm-task-drawer.text` / `muted` / `subtle` | `#10141A`, `#5A6374`, `#7B8495` source range | Task title, fact values, labels, section copy, activity text and supporting metadata in image 18. |
| `color.crm-task-drawer.label-*` / `pending-*` | source neutral label chip plus warm pending chip range | `Tarefa` label and `Pendente` status pill extracted from the image 18 header. |
| `color.crm-task-drawer.danger` / `focus` / `row-hover` / `blocked-*` / `disabled-fg` | red priority, blue focus and muted blocked ranges | Priority fact tone plus operational hover/focus/loading/blocked states for real controls. |
| `color.crm-case-drawer.bg` / `edge` / `rule` | `#FFFFFF`, subtle panel edge and internal divider alphas | Exact right operational case drawer surface, rail edge and row/card dividers from image 22. |
| `color.crm-case-drawer.text` / `muted` / `danger` | `#10141A`, muted slate labels, source red | Title, fact labels/values, history text and red `Hoje` deadline value from image 22. |
| `color.crm-case-drawer.chip-*` / `warning-*` / `success-*` / `suggestion-bg` | purple blocking chip, orange pending option, green available option and pale copilot strip | Blocking status, alternatives status pills and copilot suggestion strip extracted from image 22. |
| `color.crm-case-drawer.action-border` / `focus` | subtle action border and blue focus halo | Real button hover/focus states while preserving image 22 action anatomy. |
| `color.crm-student-drawer.bg` / `edge` / `rule` | `#FFFFFF`, subtle rail edge and internal divider alphas | Exact right student summary drawer surface and section dividers from image 27. |
| `color.crm-student-drawer.text` / `muted` | `#10141A`, muted slate labels | Student title, fact values, labels, section headings, class metadata and footer helper from image 27. |
| `color.crm-student-drawer.chip-success-*` / `chip-warning-*` / `chip-info-*` / `dot-warning` | green status/frequency, orange finance/pending, purple class chip, orange pending dot | Source status, payment, class, frequency and pending-list markers from image 27. |
| `color.crm-student-drawer.focus` | soft blue focus halo | Real close/action focus states while preserving the approved drawer anatomy. |
| `color.crm-class-drawer.bg` / `edge` / `rule` | `#FFFFFF`, subtle rail edge and internal divider alphas | Exact right class attendance drawer surface, roster border and section separators from image 29. |
| `color.crm-class-drawer.text` / `muted` | `#10141A`, muted slate labels | Drawer title, roster names, helpers, subtitle and audit note from image 29. |
| `color.crm-class-drawer.success-*` / `warning-*` / `danger-*` / `info-*` / `pending-*` | green present, orange warned, red no-show, purple replacement/pending, neutral pending | Attendance summary text, roster status chips and initials avatars from image 29. |
| `color.crm-class-drawer.copilot-bg` / `focus` | pale purple copilot panel and soft blue focus halo | Copilot recommendation card plus real close/student/action focus states from the approved drawer. |
| `color.crm-roster.bg` / `border` / `hover-bg` / `focus-bg` | `#FFFFFF`, `rgba(47, 62, 99, 0.12)`, subtle hover/focus fills | Official reusable attendance roster surface and row interaction states extracted from image 29 crop `image29-roster-attendance-panel-candidate1.png`. |
| `color.crm-roster.text` / `muted` | `#10141A`, `#56637D` | Student names and helper text in the certified 375x368 roster component. |
| `color.crm-roster-pending.*` / `success-*` / `warning-*` / `danger-*` / `info-*` | neutral pending, green present, orange falta avisada, red no-show, purple reposiÃ§Ã£o | Official roster avatar/status chip grammar for pending, present, warned, no-show and replacement states. |
| `color.crm-roster-action.*` | white circular action button, subtle border, black icon, soft hover | Per-student status correction/menu button extracted from the image 29 roster rows. |
| `color.crm-payment-drawer.bg` / `edge` / `rule` | `#FFFFFF`, subtle right drawer edge and internal divider alpha | Exact right payment collection drawer surface and edge from image 32. |
| `color.crm-payment-drawer.text` / `muted` | `#10141A`, muted slate labels | Gabriela Lima title, summary labels/values, context, timeline and actions from image 32. |
| `color.crm-payment-drawer.danger-*` / `info-*` / `success-fg` | red overdue chips/values, purple collection/copilot surfaces, green WhatsApp mark | Collection status, overdue facts, suggested channel and copilot strip extracted from image 32. |
| `color.crm-payment-drawer.copilot-bg` / `focus` | pale purple suggestion panel and soft blue focus halo | Copilot recommendation card plus real close/action focus states from the approved payment drawer. |
| `color.crm-replacement-drawer.bg` / `edge` / `rule` | `#FFFFFF`, subtle right drawer edge and internal dividers | Exact replacement fit drawer surface, option borders and section separators from image 31. |
| `color.crm-replacement-drawer.text` / `muted` | `#10141A`, muted slate labels | Ana Carolina title, facts, option titles/helpers, notes and actions from image 31. |
| `color.crm-replacement-drawer.info-*` / `success-*` / `warning-*` / `danger-*` | blue selected/source info, green compatible/status, yellow confirmation, orange conflict | Replacement status facts, fit-option chips, suggestion icon, notes and safe autonomous indicator extracted from image 31. |
| `color.crm-replacement-drawer.suggestion-bg` / `safe-bg` / `focus` | pale purple suggestion/copilot surface, pale green safe surface, soft blue focus halo | Invite suggestion, copilot note, safe autonomous note and real control focus states from the approved drawer. |
| `color.crm-lead-drawer.bg` / `edge` / `rule` | `#FFFFFF`, subtle right drawer edge and internal dividers | Exact interested-person sales drawer surface, fact divider, history separator and action borders from image 38. |
| `color.crm-lead-drawer.text` / `muted` | `#10141A`, muted slate labels | Ana Souza title, fact labels/values, history text, notice text and action labels from image 38. |
| `color.crm-lead-drawer.info-*` / `success-*` / `warning-*` / `danger-*` | blue selected/qualified chips, green WhatsApp marks, orange trial/enrollment states, red lost state | Lead status, channel/source marks and sales lifecycle state variants extracted from image 38 with secondary state references 39-40. |
| `color.crm-lead-drawer.suggestion-bg` / `safe-bg` / `focus` | pale purple copilot suggestion, pale orange manual-operation notice and soft blue focus halo | Copilot recommendation card, manual-operation note and real close/action focus states from the approved drawer. |
| `color.crm-agent-flow-drawer.bg` / `edge` / `rule` | `#FFFFFF`, subtle right drawer edge and footer/header rules | Exact contextual agent drawer surface and separators from image 56. |
| `color.crm-agent-flow-drawer.text` / `muted` | `#10141A`, muted slate role/footer text | Agent title, role label, callout copy, question labels, composer placeholder and footer helper from image 56. |
| `color.crm-agent-flow-drawer.info-*` / `question-*` | soft blue informational callout, white question pill, subtle border and hover tint | Informational warning panel and four suggested question buttons extracted from image 56. |
| `color.crm-agent-flow-drawer.composer-border` / `send-*` / `focus` | subtle composer border, black send button, white send icon, soft blue focus halo | Composer input/send control, real button focus states and keyboard interaction from the approved agent drawer. |
| `color.crm-usage-drawer.bg` / `edge` / `rule` | `#FFFFFF`, subtle right drawer edge and internal supporting rules | Exact contextual usage support drawer surface from image 69. |
| `color.crm-usage-drawer.text` / `muted` / `presence` | `#10141A`, muted slate helper text, green support presence dot | Support title, role label, callout copy, question labels, composer placeholder and footer helper from image 69. |
| `color.crm-usage-drawer.info-*` / `question-*` | soft blue usage callout, white question rows, subtle borders and hover tint | Usage explanation panel and four suggested question buttons extracted from image 69, with overview question variant from image 68. |
| `color.crm-usage-drawer.composer-border` / `send-*` / `focus` | subtle composer border, black send button, white send icon, soft blue focus halo | Composer input/send control, real button focus states and keyboard interaction from the approved usage drawer. |

Checkout payment card color details:

| Token | Value | Source / Usage |
| --- | --- | --- |
| `color.crm-checkout-payment-card.bg` | `var(--taliya-surface-card)` | Payment card surface in image 74; alias of the canonical card surface. |
| `color.crm-checkout-payment-card.title` | `#101827` | Payment title, plan price, total label and total value. |
| `color.crm-checkout-payment-card.text` | `#10141A` | Plan name, coupon label, coupon button text and primary body text. |
| `color.crm-checkout-payment-card.muted` | `#52617E` | Renewal helper and secure-payment copy. |
| `color.crm-checkout-payment-card.divider` | `rgba(16, 20, 26, 0.08)` | Plan/coupon section separators. |
| `color.crm-checkout-payment-card.field-bg` | `#FFFFFF` | Coupon input and apply button surface. |
| `color.crm-checkout-payment-card.field-border` | `rgba(16, 20, 26, 0.12)` | Coupon input and apply button border. |
| `color.crm-checkout-payment-card.placeholder` | `rgba(46, 57, 83, 0.48)` | Coupon input placeholder. |
| `color.crm-checkout-payment-card.link` | `#5869D6` | `Voltar aos planos` action link. |

## Surface Tokens

| Surface Token | Value | Usage |
| --- | --- | --- |
| `surface.app` | `raw.gray.100` | outer app/browser background from image 01 |
| `surface.app-cool` | `raw.gray.110` | cooler app/browser background seen in later boards |
| `surface.product-page` | `#F9F9FB` | product-shell page/canvas background after Image 30 global shell tone probe; close to approved Financeiro empty gutters without adding page-local CSS |
| `surface.canvas` | `rgba(244, 245, 247, 0.82)` | main content canvas |
| `surface.panel` | `rgba(255, 255, 255, 0.72)` | large panels and grouped board sections |
| `surface.panel-strong` | `rgba(255, 255, 255, 0.88)` | important panels/cards |
| `surface.card` | `rgba(255, 255, 255, 0.86)` | repeated cards |
| `surface.card-hover` | `rgba(255, 255, 255, 0.96)` | hover/focused card |
| `surface.control` | `rgba(255, 255, 255, 0.82)` | icon buttons and fields |
| `surface.control-hover` | `rgba(16, 20, 26, 0.05)` | subtle hover controls |
| `surface.control-selected` | `raw.black.900` | selected nav/control/button |
| `surface.field` | `rgba(255, 255, 255, 0.72)` | input/select/textarea field surface |
| `surface.field-disabled` | `rgba(16, 20, 26, 0.035)` | blocked/disabled/read-only fields |
| `surface.dropdown` | `rgba(255, 255, 255, 0.94)` | select/menu elevated surface |
| `surface.selection-soft` | `rgba(131, 162, 219, 0.18)` | highlighted select/menu item |
| `surface.selection` | `raw.blue.400` | selected dropdown item |
| `surface.accent-soft` | `rgba(131, 162, 219, 0.16)` | list/icon soft accent |
| `surface.accent-faint` | `rgba(131, 162, 219, 0.14)` | state icon soft accent |
| `surface.segmented` | `rgba(255, 255, 255, 0.52)` | segmented control wrapper |
| `surface.skeleton-base` | `rgba(16, 20, 26, 0.04)` | shimmer base |
| `surface.skeleton-highlight` | `rgba(16, 20, 26, 0.10)` | shimmer highlight |
| `surface.scrollbar-thumb` | `rgba(16, 20, 26, 0.22)` | scroll area thumb |
| `surface.inverse-glow` | `rgba(255, 255, 255, 0.14)` | inverse-card radial glow |
| `surface.disabled` | `rgba(16, 20, 26, 0.04)` | disabled surfaces |
| `surface.overlay` | `rgba(16, 20, 26, 0.24)` | modal/drawer overlay |
| `surface.toast` | `rgba(255, 255, 255, 0.94)` | toast/inline alert base |

## Border Tokens

| Border Token | Value | Usage |
| --- | --- | --- |
| `border.subtle` | `rgba(16, 20, 26, 0.06)` | card dividers, table rows |
| `border.default` | `rgba(16, 20, 26, 0.10)` | cards, fields, panels |
| `border.active` | `rgba(16, 20, 26, 0.22)` | hover/active control borders |
| `border.strong` | `rgba(16, 20, 26, 0.18)` | visible selected/focused boundaries |
| `border.selected` | `rgba(16, 20, 26, 0.28)` | active black-adjacent controls |
| `border.focus` | `rgba(16, 20, 26, 0.84)` | keyboard/focus ring on neutral controls |
| `border.field-focus` | `rgba(16, 20, 26, 0.90)` | precise field focus border |
| `border.control-strong` | `rgba(16, 20, 26, 0.32)` | checkbox/control small border |
| `border.inverse` | `rgba(16, 20, 26, 0.88)` | inverse-card border |
| `border.info` | `rgba(94, 142, 232, 0.62)` | info chips, blue connectors |
| `border.success` | `rgba(22, 163, 74, 0.42)` | success chips/rows |
| `border.warning` | `rgba(245, 158, 11, 0.46)` | warning chips/alerts |
| `border.danger` | `rgba(239, 68, 68, 0.54)` | error/destructive state |
| `border.dashed` | `rgba(94, 142, 232, 0.54)` | upload and available slots |

## Status Tokens

Status tokens must always support text/icon labels; color alone is not sufficient.

| Status | Foreground | Background | Border | Source Examples |
| --- | --- | --- | --- | --- |
| `neutral` | `rgba(16, 20, 26, 0.62)` | `rgba(16, 20, 26, 0.06)` | `border.subtle` | inactive chips |
| `info` | `#1F66E5` | `rgba(94, 142, 232, 0.14)` | `border.info` | selected filters, progress |
| `success` | `#0F8A3A` | `rgba(22, 163, 74, 0.12)` | `border.success` | resolved, connected, approved |
| `warning` | `#B56A00` | `rgba(245, 158, 11, 0.14)` | `border.warning` | pending, attention, medium |
| `danger` | `#B94444` | `rgba(239, 68, 68, 0.14)` | `border.danger` | error, failure, high |
| `paused` | `rgba(16, 20, 26, 0.52)` | `rgba(16, 20, 26, 0.05)` | `border.subtle` | paused/manual |
| `blocked` | `raw.black.900` | `rgba(16, 20, 26, 0.08)` | `border.default` | locked/blocked reason |

Destructive action tokens:

| Token | Value Source | Usage |
| --- | --- | --- |
| `status.danger.action-bg` | `raw.red.400` | solid destructive action buttons in modal/confirm surfaces from board 09 |
| `status.danger.action-fg` | `raw.white` | text/icon on destructive action buttons |
| `status.finance.today.*` | orange `#E65F00` over `rgba(255, 126, 42, 0.12)` | finance kanban `Hoje` and `Prometido` chips from image 33 |
| `status.finance.validation.*` | purple `#7C3AED` over `rgba(139, 92, 246, 0.13)` | finance validation/reconciliation chips from images 33 and 34 |
| `status.finance.exception.bg` | `rgba(139, 92, 246, 0.12)` | exception queue icon background from image 30 |
| `status.sales.copilot.*` | purple `#7C3AED` over `rgba(139, 92, 246, 0.13)` | `copiloto sugeriu` and experimental chips from images 37 and 38 |
| `status.sales.qualified.*` | blue `#1F66E5` over `rgba(94, 142, 232, 0.14)` | qualified lead chips from image 38 |
| `status.sales.action.*` | blue `#1F66E5` over `rgba(94, 142, 232, 0.12)` | row action chips like `enviar confirmaÃ§Ã£o` from image 39 |
| `status.sales.presence.*` | orange `#E65F00` over `rgba(255, 126, 42, 0.13)` | `Confirmar presenÃ§a` and attention chips from images 39 and 40 |
| `status.sales.ready.*` | green `#0F8A3A` over `rgba(22, 163, 74, 0.12)` | ready/converted sales and enrollment states |
| `status.retention.high.*` | red `#E33434` over `rgba(239, 68, 68, 0.14)` | high risk, cancellation and high-severity chips from images 41, 42 and 44 |
| `status.retention.medium.*` / `status.retention.saving.*` / `status.retention.waiting.*` | orange `#E65F00` over `rgba(255, 126, 42, 0.13)` | medium risk, saving, waiting response states from images 41, 42 and 44 |
| `status.retention.low.*` / `status.retention.eligible.*` | green `#0F8A3A` over `rgba(22, 163, 74, 0.12)` | active/eligible retention chips from images 41 and 43 |
| `status.retention.reactivation.*` | purple `#7C3AED` over `rgba(139, 92, 246, 0.13)` | reactivation and complaint category chips from images 43 and 44 |
| `status.opportunity.pending.*` | red `#EF1F1F` over `rgba(239, 68, 68, 0.13)` | pending payment chip/value from image 46 |
| `status.opportunity.hot.*` | orange `#E65F00` over `rgba(255, 126, 42, 0.13)` | urgent opportunity state |
| `status.opportunity.conversion.*` | purple `#7C3AED` over `rgba(139, 92, 246, 0.13)` | conversion opportunity state |

## Operational State Tokens

These are semantic aliases built on top of status tokens. They prevent domain drift.

| Operational State | Maps To | Required Label Pattern |
| --- | --- | --- |
| `active` | success | `Ativo`, `Conectado`, `Publicado`, `Permitido` |
| `pending` | warning | `Pendente`, `Aguardando`, `Em revisÃ£o` |
| `in-progress` | info | `Em andamento`, `Processando`, `Exportando` |
| `failed` | danger | `Erro`, `Falha`, `Negado` |
| `blocked` | blocked | `Bloqueado` plus reason/action |
| `human` | info | `Em atendimento humano`, `RevisÃ£o humana` |
| `sensitive` | danger | destructive/sensitive confirmation |
| `manual` | paused | manual fallback or manual mode |
| `scheduled` | info | scheduled/upcoming operational state alias |
| `paused` | paused | paused state alias for component APIs |
| `draft` | neutral | unpublished draft state alias |

## Quota And Threshold Tokens

| Threshold | Token | Visual Rule |
| --- | --- | --- |
| `<70` | `quota.normal` | blue progress, normal copy |
| `70-89` | `quota.attention` | blue or warning accent depending context, label required |
| `90-99` | `quota.warning` | warning background and copy |
| `100+` | `quota.blocked` | danger or blocked state with manual path |

## Typography Tokens

The type system must support dense CRM screens and token boards.

| Role | Size | Line Height | Weight | Usage |
| --- | ---: | ---: | ---: | --- |
| `type.display` | 72 | 80 | 600 | design-system board only |
| `type.page-title` | 40 | 48 | 600 | product page titles |
| `type.panel-title` | 24 | 32 | 600 | board/panel titles |
| `type.card-title` | 18 | 24 | 600 | cards and modal titles |
| `type.section-title` | 15 | 20 | 600 | compact section titles |
| `type.body` | 14 | 20 | 400 | default app text |
| `type.body-strong` | 14 | 20 | 600 | strong row/card labels |
| `type.small` | 12 | 16 | 400 | metadata/helper |
| `type.caption` | 11 | 14 | 400 | table captions, timestamps |
| `type.badge` | 11 | 12 | 600 | chip/badge labels |
| `type.button` | 14 | 18 | 500 | buttons/nav pills |
| `type.table-header` | 11 | 14 | 500 | table headers |
| `type.table-cell` | 12 | 16 | 400 | dense table cells |
| `type.numeric` | 28 | 34 | 600 | metric values |
| `type.summary-number` | 32 | 36 | 600 | summary card number values |
| `type.control-label` | 13 | 18 | 400 | form controls, checkboxes and toggles |
| `type.nav-pill` | 13 | 1 | 600 | top navigation pills |
| `type.compact-title` | 13 | 17 | 600 | list rows, flow nodes, chart titles |
| `type.dense-body` | 12 | 17 | 400 | empty/error/loading state body text |
| `type.helper` | 11 | 15 | 400 | helper text and dense metadata |
| `type.event-title` | 12 | 15 | 600 | calendar event title |
| `type.quota-title` | 15 | 19 | 600 | quota/plan compact card title |
| `type.chart-label` | 11 | 14 | 400 | chart labels and legends |
| `type.overline` | 11 | 14 | 600 | small uppercase-ish labels; letter spacing remains 0 unless source requires otherwise |
| `type.crm-empty-shell.title` | 27 | 34 | 700 | `Jornadas` title in image 79 empty shell |
| `type.crm-empty-shell.image-79.title` | 26 | 32 | 700 | source-derived Image 79 fixed-window title override |
| `type.crm-empty-shell.nav` | 12 | 1 | 400 | source-derived Image 79 top navigation labels |

Rules:

- Do not scale font size with viewport width.
- Do not introduce negative letter spacing.
- Dense components use `body`, `small`, `caption`, `table-header`, and `table-cell`, not display roles.

## Spacing Tokens

Base scale:

| Token | Value |
| --- | ---: |
| `space.1` | 4 |
| `space.2` | 8 |
| `space.3` | 12 |
| `space.4` | 16 |
| `space.5` | 20 |
| `space.6` | 24 |
| `space.8` | 32 |
| `space.10` | 40 |
| `space.12` | 48 |

Density aliases:

| Token | Value | Usage |
| --- | ---: | --- |
| `density.compact-gap` | 6 | dense rows/chips |
| `density.row-gap` | 8 | lists and rows |
| `density.section-gap` | 16 | card sections |
| `density.panel-gap` | 20 | panels |
| `density.page-gap` | 24 | app content |

Layout aliases:

| Token | Value | Usage |
| --- | ---: | --- |
| `layout.crm-list-detail.list-width` | `190px` | Image 23 list rail width |
| `layout.crm-list-detail.main-width` | `780px` | Image 23 selected-detail main table width |
| `layout.crm-list-detail.main-closed-width` | `1101px` | Image 23 content width when detail is closed |
| `layout.crm-list-detail.detail-width` | `330px` | Image 23 detail rail width |
| `layout.crm-list-detail.gap` | `8px` | Image 23 gutters between list/main/detail regions |
| `layout.crm-work-list-detail.main-priority-rail-width` | `176px` | Image 24 checklist-style work-list mode where an external compact drawer owns the right rail and the main table keeps the source-like width without changing the default `PageQuickFilters` width for standard pages |
| `control.crm-work-list-detail.main-priority-*` | rail padding `18px 8px 14px`; filter padding-x `4px`; filter gap `4px`; icon `13px`; count `18px`; count padding-x `0px` | Compact quick-filter rhythm paired with `main-priority` so source labels such as `Fechamento`, `Financeiro`, `Vencem esta semana`, and `Aguardando resposta` remain readable inside the narrower rail |
| `layout.crm-list-detail.source-width` | `1316px` | Image 23 structural source frame width |
| `layout.crm-list-detail.source-height` | `930px` | Image 23 structural source frame height |
| `layout.crm-list-detail.columns` | `var(--taliya-layout-crm-list-detail-list-width) minmax(0, var(--taliya-layout-crm-list-detail-main-closed-width))` | Default list + content layout for tasks, approvals, students and operational lists |
| `layout.crm-list-detail.columns-with-detail` | `var(--taliya-layout-crm-list-detail-list-width) minmax(0, var(--taliya-layout-crm-list-detail-main-width)) var(--taliya-layout-crm-list-detail-detail-width)` | List + content + detail rail layout |
| `layout.crm-list-detail.main-wide-width` | `810px` | Wider main column for dense Worklist tables with compact quick rail and detail drawer, first certified against Image34 Financeiro movimentacoes |
| `layout.crm-work-list-detail.wide-main-rail-width` | `156px` | Compact quick-filter rail used by dense Worklist table pages that need more main-table width, first certified against Image34 Financeiro movimentacoes |
| `layout.crm-task-filter-bar.*` | width `977`, search `224`, filter pills `92/96/115`, create `106` | Image 23 task filter bar dimensions |
| `layout.crm-task-queue-list.*` | width `190`, source height `726`, item width `166` | Image 23 task queue sidebar dimensions |
| `layout.crm-three-pane.*` | source `1294x753`; columns `483px 502px 279px`; gaps `15px`; `columns` uses the left/center/right width vars | Exact Image 24 tri-pane structural shell for inbox: left conversation list, center conversation thread and right context rail proportions |
| `layout.crm-right-panel.*` | source `1390x738`; main `974px`; rail `401px`; gap `15px`; columns use the main/rail width vars | Exact Image 51A structural setup/right-rail layout for persistent agent/support/config panels |
| `layout.crm-dashboard.columns-2` | `repeat(2, minmax(0, 1fr))` | Two-column dashboard track |
| `layout.crm-dashboard.columns-3` | `repeat(3, minmax(0, 1fr))` | Three-column dashboard track |
| `layout.crm-dashboard.columns-asymmetrical` | `minmax(0, 1.35fr) minmax(0, 0.65fr)` | Main/summary dashboard split |
| `layout.crm-dashboard.today-*` | source-like responsive width; gap `14px`; columns `minmax(0, 393fr) minmax(0, 316fr) minmax(0, 270fr) minmax(0, 487fr)`; rows `255px 230px 194px` | Image 17 `Hoje` dashboard structural grid for dense operational above-the-fold dashboards. Column ratios reproduce the approved source `393/316/270/487` grid at the source-size capture, while rows keep `Histórico de hoje` below the base fold. |
| `layout.crm-kanban.board-width` / `board-height` | `1284px` / `570px` | Image 21 operation board body proof dimensions |
| `layout.crm-kanban.board-columns` / `board-gap` | `181px repeat(5, minmax(0, 1fr))` / `13px` | Quick-filter rail plus five lane slots |
| `layout.crm-kanban.column-width` / `column-min-height` | `207px` / `100%` | Operation lane slot width/fill behavior inside the fixed 570px board for image 21 |
| `layout.crm-weekly-calendar.width` | `765px` | Exact image 26 weekly calendar grid width |
| `layout.crm-weekly-calendar.height` | `796px` | Exact image 26 weekly calendar grid height |
| `layout.crm-weekly-calendar.time-width` | `58px` | Time-axis column width for image 26 weekly calendar |
| `layout.crm-weekly-calendar.day-width` / `day-min-width` | `137px` | Day column width for the five source agenda columns |
| `layout.crm-weekly-calendar.columns` | `58px repeat(5, 137px)` | Exact weekly-calendar grid columns |
| `layout.crm-weekly-calendar.header-height` | `42px` | Day-header row height |
| `layout.crm-weekly-calendar.detail-width` | `320px` | Selected class/detail rail width when used beside the calendar |
| `layout.crm-class-card.width` / `height` | `122px` / `85px` | Regular class card source dimensions from image 26 |
| `layout.crm-class-card.selected-width` / `selected-height` | `123px` / `86px` | Selected/pending class card source dimensions from image 26 |
| `layout.crm-mini-calendar.width` / `height` | `204px` / `242px` | Exact image 26 mini date picker card dimensions |
| `layout.crm-mini-calendar.columns` | `repeat(7, 24px)` | Seven source day columns for the mini date picker |
| `layout.crm-setup-shell.width` / `height` | `1660px` / `928px` | Exact image 51A setup shell app-frame crop |
| `layout.crm-setup-shell.columns` | `220px 978px 397px` | Exact image 51A setup shell stepper/main/agent columns |
| `layout.crm-setup-shell.column-gap` | `16px` | Exact image 51A gutter between setup body panels |
| `layout.crm-setup-shell.topbar-height` / `body-height` / `bottom-bar-height` | `82px` / `738px` / `73px` | Exact image 51A setup shell vertical grid |
| `layout.crm-setup-shell.guided-columns` | `207px 986px 415px` | Compact-rail setup stepper/main/agent columns through `SetupPage frameVariant="guided"`; current source-backed blocks are 51C, 51H and 51L |
| `layout.crm-setup-shell.guided-topbar-height` / `guided-body-height` / `guided-bottom-bar-height` | `79px` / `770px` / `65px` | Shared guided-page vertical grid; isolated from 51A `shell-global` and Image 78 `welcome` |
| `layout.crm-setup-shell.guided-bottom-bar-width` / `guided-stepper-height` | `1640px` / `770px` | Source-width bottom status bar and full-height guided step rail |
| `layout.crm-setup-shell.guided-block-columns` | `225px 979px 404px` | Source-backed 51D Studio, 51E Equipe, and 51F Canais rail-wide stepper/main/agent columns; not applied to other blocks without evidence |
| `layout.crm-setup-shell.guided-block-topbar-height` / `guided-block-body-height` / `guided-block-bottom-bar-height` | `87px` / `762px` / `62px` | Source-backed 51D-51F wide-rail vertical frame rhythm through `frameVariant="guided-block"` |
| `layout.crm-setup-shell.guided-main-columns` / `guided-main-column-gap` | `207px 1062px 355px` / `12px` | Images 51G/51K wide-center/narrow-agent frame through `frameVariant="guided-main"` |
| `layout.crm-setup-shell.guided-main-topbar-height` / `body-height` / `bottom-bar-height` | `67px` / `797px` / `64px` | Shared source vertical rhythm proved by complete Planos and Pagamento pages |
| `layout.crm-setup-shell.guided-wide-columns` / `guided-wide-column-gap` | `207px 1062px 338px` / `15px` | Images 51I/51J wide-center/narrower-agent frame through `frameVariant="guided-wide"` |
| `layout.crm-setup-shell.guided-wide-padding` | `0 20px 13px 15px` | Source-backed outer inset for the 51I/51J frame without story-local shell CSS |
| `layout.crm-setup-shell.guided-wide-topbar-height` / `body-height` / `bottom-bar-height` | `79px` / `770px` / `65px` | Shared 51I/51J vertical rhythm, isolated from `guided-main` and `shell-global` |
| `layout.crm-setup-shell.guided-wide-bottom-bar-width` / `guided-wide-stepper-height` | `1637px` / `770px` | Source width and full-height rail for the 51I/51J frame |
| `layout.crm-setup-shell.guided-review-columns` / `guided-review-column-gap` | `210px 1064px 344px` / `12px` | Image 51L stepper/exact review-panel/agent columns through `frameVariant="guided-review"` |
| `layout.crm-setup-shell.guided-review-padding` | `0 15px` | Image 51L outer frame inset with an edge-to-edge central review owner |
| `layout.crm-setup-shell.guided-review-topbar-height` / `body-height` / `bottom-bar-height` | `74px` / `807px` / `52px` | Image 51L full-height final-review rhythm that keeps publication actions and the global footer visible |
| `layout.crm-setup-shell.guided-review-bottom-bar-width` / `stepper-height` / `stepper-header-height` | `1642px` / `807px` / `70px` | Image 51L source-width footer and nine-step rail framing |
| `control.crm-setup-shell-guided-review-step-row-height` / `step-marker-size` | `60px` / `24px` | Image 51L compact nine-step rhythm; does not alter the certified six-step default rail |
| `control.crm-setup-shell-guided-review-connector-height` / `left` / `top` | `36px` / `12px` / `30px` | Image 51L compact connector geometry for the nine-step rail |
| `layout.crm-setup-shell.welcome-topbar-height` / `welcome-padding` / `welcome-main-offset-x` | `95px` / `8px 16px 16px 32px` / `13px` | Image 78 welcome-only shell rhythm; keeps the main workspace and native agent rail aligned without changing the guided block variants. |
| `layout.crm-setup-agent-chat.welcome-message-width` / `control.crm-setup-agent-chat.welcome-message-height` | `342px` / `302px` | Image 78 native welcome message geometry inside the responsive `428px` agent rail. |
| `control.crm-setup-agent-chat.welcome-padding` / `welcome-header-columns` | `27px 27px 24px` / `44px minmax(0, 1fr) 24px 24px` | Image 78 agent inset and compact identity/actions grid for `SetupAgentChat variant="welcome"`. |
| `control.crm-setup-agent-chat.welcome-quick-height` / `welcome-quick-width-1/2/3` | `45px` / `242px`, `284px`, `307px` | Source-backed quick-question geometry for the three welcome prompts. |
| `control.crm-setup-agent-chat.welcome-footer-margin-top` / `welcome-footer-padding-top` | `52px` / `31px` | Image 78 divider and human-help footer rhythm. The welcome agent is native and responsive; no capture scale or nested agent frame is part of the public anatomy. |
| `layout.crm-setup-plans.*-columns` | source-specific 3/4/5/6/7-column grids | Complete Planos type, quantity, recurrence, validity, replacement, deadline and notice option rows |
| `layout.crm-setup-plans.header-height` | `74px` | Image 51G compact block header before the three-column content |
| `control.crm-setup-plans.editor-gap` / `field-height` / `segment-height` | `0px` / `28px` / `24px` | Image 51G source density that keeps every field, alert and footer action visible |
| `layout.crm-setup-channels.columns` | `minmax(0, 1.7fr) minmax(0, 1fr)` | Image 51F independent WhatsApp/public and e-mail/status columns |
| `layout.crm-setup-channels.whatsapp-height` / `email-height` | `335px` / `317px` | Image 51F asymmetric first-row panel heights |
| `layout.crm-setup-channels.public-height` / `status-height` | `218px` / `235px` | Image 51F asymmetric second-row panel heights; keeps footer actions visible |
| `control.crm-setup-channels.column-gap` / `panel-gap` | `16px` / `8px` | Image 51F column gutter and compact panel content rhythm |
| `control.crm-setup-channels.status-row-height` / `status-row-padding-x` | `32px` / `0px` | Image 51F compact three-row channel status list |
| `control.crm-setup-channels.copy-size` / `copy-line-height` | small type aliases | Image 51F helper copy density without component-local literal typography |
| `layout.crm-setup-shell.bottom-bar-grid-column` | `1 / 4` | Image 51A bottom bar spans all body columns |
| `layout.crm-setup-consumption.models-height` / `choice-height` | `143px` / `87px` | Image 51C model-selection band and compact source choice controls |
| `layout.crm-setup-consumption.settings-rows` / `footer-height` | `200px 167px` / `94px` | Image 51C package/replacement, exceptions/validation, and action bands without clipping |
| `layout.crm-setup-block-header.width` / `height` | `735px` / `84px` | Exact Image 51D v2 setup block header crop |
| `control.crm-setup-block-header.title-size` / `title-line-height` / `title-weight` | `28px` / `36px` / `600` | Source `Studio` heading typography after 1:1 crop comparison |
| `control.crm-setup-block-header.title-chip-gap` / `chip-height` / `chip-padding-x` | `16px` / `31px` / `15px` | Source title-to-chip spacing and block chip sizing |
| `control.crm-setup-block-header.subtitle-margin-top` / `subtitle-size` / `subtitle-line-height` | `6px` / `14px` / `21px` | Source setup block description rhythm |
| `color.crm-setup-block-header.warning-*` / `complete-*` | warning and complete chip state ranges | Operational warning/blocked/complete variants for the same header anatomy |
| `layout.crm-setup-stepper.width` / `height` | `220px` / `738px` | Exact image 51A left stepper panel crop |
| `layout.crm-setup-stepper.header-height` / `footer-height` | `86px` / `74px` | Source title and footer vertical zones for the setup rail |
| `control.crm-setup-stepper.source-padding-x` / `control-gap` | `23px` / `10px` | Source left/right padding and marker-label gap for the setup rail |
| `control.crm-setup-stepper.pending-marker-size` / `active-marker-size` | `24px` / `30px` | Image 51A pending versus complete/current marker sizes |
| `control.crm-setup-stepper.connector-height` / `connector-left` / `connector-top` | `54px` / `16px` / `35px` | Source vertical connector rhythm inside the setup rail |
| `layout.crm-setup-bottom-bar.width` / `height` | `1630px` / `73px` | Exact Image 51A setup shell bottom status footer crop |
| `layout.crm-setup-bottom-bar.columns` | `278px 1px minmax(0, 1fr) 360px 1px 44px` | Image 51A bottom bar environment/divider/save/warning/divider/toggle columns |
| `control.crm-setup-bottom-bar.padding` / `radius` | `0 29px` / `15px` | Source footer inset and rounded white shell panel |
| `control.crm-setup-bottom-bar.item-gap` / `font-size` / `line-height` | `14px` / `14px` / `18px` | Source label/status row spacing and text rhythm |
| `control.crm-setup-bottom-bar.status-icon-size` / `save-icon-size` | `25px` / `24px` | Source shield/alert and autosave check icon geometry |
| `control.crm-setup-bottom-bar.toggle-size` / `toggle-icon-size` | `44px` / `18px` | Source circular collapse button and chevron geometry |
| `color.crm-setup-welcome.bg` | `#FBFCFF` | Image 78 central welcome crop background |
| `layout.crm-setup-welcome.width` / `height` | `690px` / `470px` | Exact Image 78 central welcome stack crop |
| `layout.crm-setup-welcome.field-width` | `600px` | Shared input and CTA width from Image 78 |
| `control.crm-setup-welcome.title-size` / `title-line-height` / `title-weight` | `52px` / `62px` / `600` | Source welcome heading typography |
| `control.crm-setup-welcome.subtitle-size` / `subtitle-line-height` | `22px` / `36px` | Source two-line intro text |
| `control.crm-setup-welcome.prompt-size` / `prompt-line-height` | `22px` / `28px` | Source studio-name instruction text |
| `control.crm-setup-welcome.input-height` / `input-radius` / `input-padding-x` / `input-font-size` | `69px` / `18px` / `27px` / `22px` | Source studio-name input geometry and placeholder type |
| `control.crm-setup-welcome.button-height` / `button-radius` / `button-font-size` / `button-weight` | `65px` / `32px` / `24px` / `600` | Source black CTA geometry and type |
| `control.crm-setup-welcome.button-shadow` / `button-icon-size` | `0 10px 24px rgba(16, 20, 26, 0.18)` / `22px` | Source CTA elevation and loading icon containment |
| `control.crm-setup-welcome.padding-top` / `subtitle-margin-top` / `prompt-margin-top` / `input-margin-top` / `button-margin-top` | `28px` / `11px` / `54px` / `25px` / `32px` | Source vertical rhythm inside the Image 78 welcome crop |
| `color.crm-setup-choice-card.bg` / `border` / `selected-border` | `#FFFFFF` / `rgba(16, 20, 26, 0.10)` / `#2E75FF` | Image 51C setup choice card surface and selected border |
| `color.crm-setup-choice-card.icon-bg` / `selected-icon-bg` / `selected-icon-fg` | `#F2F4F7` / `#EAF3FF` / `#2E75FF` | Image 51C unselected and selected circular icon treatment |
| `layout.crm-setup-choice-card.width` / `height` | `280px` / `90px` | Exact Image 51C selected `Pacote de aulas` card crop |
| `control.crm-setup-choice-card.padding` / `gap` / `radius` | `17px 17px` / `13px` / `9px` | Source selected-card icon/text placement and rounded border |
| `control.crm-setup-choice-card.icon-size` / `icon-inner-size` / `selected-dot-border` / `selected-dot-ring` | `30px` / `14px` / `4px` / `2px` | Image 51C selected icon and dot geometry |
| `control.crm-setup-choice-card.title-size` / `title-line-height` / `title-weight` | `15px` / `20px` / `600` | Image 51C card title typography |
| `control.crm-setup-choice-card.description-size` / `description-line-height` / `description-margin-top` | `14px` / `22px` / `5px` | Image 51C card description typography and rhythm |
| `color.crm-setup-import-source-card.bg` / `border` / `hover-border` | `#FFFFFF` / `rgba(16, 20, 26, 0.10)` / `rgba(16, 20, 26, 0.18)` | Image 51H import source card surface, default border and hover affordance |
| `color.crm-setup-import-source-card.selected-border` / `selected-bg` | `#2E75FF` / `#F8FBFF` | Operational selected state for the same source-option geometry |
| `color.crm-setup-import-source-card.imported-border` / `imported-bg` / `error-border` / `error-bg` | `rgba(34, 197, 94, 0.26)` / `#F7FEFA` / `rgba(239, 68, 68, 0.26)` / `#FFF8F8` | Imported and error state surfaces derived from setup status grammar |
| `layout.crm-setup-import-source-card.width` / `height` | `166px` / `75px` | Exact Image 51H `Importar arquivos` source option card crop |
| `layout.crm-setup-students-summary-height` / `worklist-height` | `285px` / `315px` | Image 51H summary and prepared-student worklist bands; keeps all five rows, caption and actions in the canonical viewport |
| `control.crm-setup-students-list-row-height` / `list-row-padding` | `44px` / `5px 0` | Image 51H compact added-source and base-summary row rhythm |
| `control.crm-setup-students-worklist-header-height` / `column-height` / `row-height` / `caption-height` | `52px` / `34px` / `39px` / `24px` | Image 51H title, column header, five prepared rows and post-row caption geometry |
| `layout.crm-setup-classes-summary-height` / `worklist-height` / `source-card-height` | `285px` / `315px` / `66px` | Image 51I summary/worklist bands and compact five-option source-card geometry |
| `control.crm-setup-classes-list-row-height` / `list-row-padding` | `44px` / `5px 0` | Image 51I compact source/summary row rhythm |
| `control.crm-setup-classes-worklist-header-height` / `column-height` / `row-height` / `caption-height` | `52px` / `34px` / `39px` / `24px` | Image 51I title, seven-column header, five prepared rows and post-row caption geometry |
| `layout.crm-setup-agenda-summary-height` / `body-height` | `150px` / `460px` | Image 51J generated-summary and control/schedule bands; keeps legend and publication actions above the global footer |
| `layout.crm-setup-agenda-body-columns` | `333px minmax(0, 1fr)` | Image 51J class-control rail plus wide schedule preview |
| `layout.crm-setup-agenda-schedule-axis-rows` | `repeat(6, 50px)` | Six source time bands for `07h`, `08h`, `09h`, `12h`, `18h`, and `19h` in schedule mode |
| `control.crm-setup-agenda-header-height` / `schedule-min-height` / `schedule-event-height` | `64px` / `326px` / `44px` | Image 51J block header and contained discrete schedule-event geometry |
| `control.crm-setup-agenda-actions-margin-top` | `8px` | Compact action offset below the schedule body in the canonical viewport |
| `control.crm-setup-import-source-card.padding` / `gap` / `body-width` / `radius` | `20px 10px 20px 16px` / `14px` / `107px` / `7px` | Source icon/text placement, readable description width and rounded border |
| `control.crm-setup-import-source-card.icon-size` / `icon-inner-size` / `status-size` / `status-offset` | `24px` / `24px` / `14px` / `8px` | Image 51H source icon geometry plus compact operational status mark placement |
| `control.crm-setup-import-source-card.title-size` / `title-line-height` / `title-weight` | `11px` / `15px` / `600` | Image 51H source-card title typography |
| `control.crm-setup-import-source-card.description-size` / `description-line-height` / `description-margin-top` | `9px` / `16px` / `6px` | Image 51H one-line source-card description typography and rhythm |
| `layout.crm-setup-review-panel.width` / `height` / `content-width` | `1064px` / `807px` / `1002px` | Exact Image 51L central final-review panel crop and content column |
| `layout.crm-setup-review-panel.publish-grid` / `publish-card-width` / `publish-card-height` | `repeat(4, 1fr)` / `234px` / `107px` | Image 51L `Publicado agora` grid with eight real area buttons |
| `layout.crm-setup-review-panel.pending-grid` / `future-grid` / `future-card-height` / `safe-grid` | `1fr 1fr` / `repeat(4, 1fr)` / `71px` / `185px 214px 278px 278px` | Image 51L pending alerts, post go-live cards and safe-publication checklist layout |
| `color.crm-setup-review-panel.*` | white panel, muted text, divider, ready/review chips, blocking/warning alert surfaces, blue info/success, black primary | Exact Image 51L review/status color grammar plus operational states |
| `control.crm-setup-review-panel.*` | padding `16px 26px 9px`, radius `13px`, title `28/36`, section `15/20`, body `13/18`, publish gap `7px 19px`, card radius `9px`, footer `562px` button group via `164/164/202px` buttons, checkbox `16px` | Exact Image 51L review panel density, card/alert/checklist/footer anatomy and real checkbox/button containment |
| `layout.crm-access-shell.window-width` / `window-height` | `1528px` / `852px` | Exact Image 71 access shell browser window crop |
| `layout.crm-access-shell.chrome-height` / `body-height` | `64px` / `786px` | Browser chrome and body split from Image 71 |
| `layout.crm-access-shell.brandbar-height` / `main-height` / `footer-height` | `90px` / `623px` / `73px` | Brandbar, shell canvas area and footer rows |
| `layout.crm-access-shell.content-width` / `content-height` | `966px` / `582px` | Left empty access canvas panel from Image 71 |
| `layout.crm-access-shell.content-placeholder-height` | `532px` | Dashed content slot inside the access canvas |
| `layout.crm-access-shell.rail-card-width` | `475px` | Right rail card width from Image 71 |
| `layout.crm-access-shell.rail-card-context-height` / `summary-height` / `help-height` | `232px` / `188px` / `134px` | Contexto/Resumo/Ajuda panel heights |
| `layout.crm-access-shell.browser-*` | address `405x39`, top `15px`, traffic `35/26`, toolbar `149/24` | Image 71 browser chrome overrides; shell 79 keeps its own chrome rhythm |
| `layout.crm-access-shell.logo-width` | `212px` | Access shell brand logo width from Image 71 |
| `control.crm-access-shell.browser-address.*` | font `16px`, icon `16px` | Image 71 address bar typography/icon scale |
| `control.crm-access-footer-links.font-size` / `line-height` / `font-weight` | `16px` / `20px` / `400` | Image 71 footer link typography |
| `control.crm-access-footer-links.cluster-gap` / `separator-size` / `cluster-offset-y` | `38px` / `16px` / `4px` | Exact Image 71 footer link/separator rhythm; source dark bbox `595,36-922,51`, render bbox `596,36-931,52` |
| `color.crm-access-shell.*` | page/brandbar/content/footer/panel backgrounds, panel/placeholder/rule borders and yellow traffic light | Exact access shell surface and divider grammar |
| `layout.crm-access-shell.content-columns` / `main-width` / `rail-width` | legacy composition helpers retained for AuthCard/subscription child flows | Access child components still use these until their own exact crops are certified |
| `layout.crm-auth-card.signup-width` / `signup-height` | `460px` / `618px` | Exact Image 72 signup auth card crop |
| `layout.crm-auth-card.signin-width` / `signin-height` | `523px` / `577px` | Exact Image 73 signin auth card crop |
| `layout.crm-auth-card.signup-content-width` / `signin-content-width` | `378px` / `456px` | Source button, divider and field widths inside Images 72/73 |
| `layout.crm-auth-card.signup-padding` / `signin-padding` | `28px 41px 26px` / `32px 33px 31px` | Source card inset and vertical placement after final Image 72/73 certification |
| `layout.crm-auth-card.social-height` / `field-height` / `submit-height` / `signin-submit-height` | `49px` / `48px` / `43px` / `50px` | Provider buttons, fields and CTA heights from exact source crops |
| `layout.crm-auth-card.radius` / `control-radius` / `divider-gap` | `18px` / `9px` / `18px` | Rounded card/control/divider grammar for Images 72/73 |
| `control.crm-auth-card.social-icon-column` | `60px` | Left provider-mark column needed to clone Google/Microsoft button anatomy |
| `control.crm-auth-card.title-size` / `title-line-height` / `title-weight` | `30px` / `36px` / `600` | Auth card heading typography from Images 72/73 |
| `control.crm-auth-card.signup-header-margin-bottom` / `signin-header-margin-bottom` | `10px` / `18px` | Source header-to-provider rhythm in Images 72/73 |
| `control.crm-auth-card.signup-divider-margin` / `signin-divider-margin` | `18px 0 12px` / `18px 0 16px` | Source divider rhythm above fields |
| `control.crm-auth-card.signin-options-margin` / `signup-submit-margin-top` | `13px 0 10px` / `10px` | Source checkbox/forgot and signup CTA rhythm |
| `color.crm-auth-card.*` | card surface aliases `surface.card`, control background alias `surface.field`, muted text, control border, provider/link colors, black primary with gradient start/end | Image 72/73 access auth color grammar |
| `shadow.crm-auth-card` / `shadow.crm-auth-card-primary` | card elevation and CTA glossy inset/drop shadow | Image 72/73 panel and primary action finish |
| `layout.crm-subscription-status-card.width` | `726px` | Image 75 confirming-assinatura card crop width |
| `layout.crm-subscription-status-card.content-width` | `592px` | Image 75 inner content width for status row, stepper, secure notice and actions |
| `layout.crm-subscription-status-card.failed-width` | `706px` | Image 76 failed-assinatura card crop width |
| `layout.crm-subscription-status-card.failed-content-width` | `642px` | Image 76 inner content width |
| `layout.crm-subscription-status-card.confirmed-width` | `546px` | Image 77 confirmed-assinatura card crop width |
| `layout.crm-confirmed-setup-handoff.width` | `607px` | Image 77 setup-guided handoff card crop width |
| `layout.crm-checkout-review-panel.width` | `1076px` | Image 74 review group crop width, including plan card, 41px gap and payment card |
| `layout.crm-checkout-review-panel.columns` | `var(--taliya-layout-crm-plan-summary-card-review-width) var(--taliya-layout-crm-checkout-payment-card-width)` | Exact review composition columns from image 74 |
| `layout.crm-checkout-payment-card.width` | `399px` | Image 74 right payment card crop width |
| `layout.crm-agent-catalog.columns` / `card-width` / `gap` | `repeat(3, minmax(280px, 445px))` / `445px` / `16px` | Image 52 fixed source tracks with responsive two/one-column fallbacks; cards do not stretch to consume the full dashboard width. |
| `layout.crm-domain-metrics.columns` | `repeat(3, minmax(0, 1fr))` | Reusable metric strip inside P2 domain cards |
| `layout.crm-domain-facts.columns` | `repeat(4, minmax(0, 1fr))` | Reusable fact strip inside execution, tenant, support and state panels |
| `layout.crm-simulation-runner.columns` | `300px 360px minmax(360px, 1fr)` | Scenario, phone preview and execution timeline columns from image 58 |
| `layout.crm-relationship-list.columns` | `104px 34px 104px 34px 104px` | Relationship cards plus connector buttons from image 13 |
| `layout.crm-pipeline-card.width` | `239px` | Sales pipeline card crop width from image 37 |
| `layout.crm-lead-summary-row.width` | `835px` | Selected lead row crop width from image 38 |
| `layout.crm-lead-summary-row.columns` | explicit avatar/name/chip/action columns | Lead row exact x-position grid from image 38 |
| `layout.crm-lead-drawer.width` | `340px` | Interested-person drawer crop width from image 38 |
| `layout.crm-lead-drawer.height` | `942px` | Interested-person drawer crop height from image 38 |
| `layout.crm-lead-drawer.fact-columns` | `24px 112px minmax(0, 1fr)` | Fact icon, label and value columns from image 38 |
| `layout.crm-lead-drawer.actions-columns` | `repeat(2, minmax(0, 1fr))` | Two-column action grid from image 38 footer |
| `layout.crm-agent-flow-drawer.width` | `399px` | Agent configuration drawer crop width from image 56 |
| `layout.crm-agent-flow-drawer.height` | `780px` | Agent configuration drawer crop height from image 56 |
| `layout.crm-agent-flow-drawer.question-columns` | `30px minmax(0, 1fr) 20px` | Suggested-question icon, label and trailing affordance columns from image 56 |
| `layout.crm-agent-flow-drawer.composer-columns` | `minmax(0, 1fr) 48px` | Composer input and circular send control columns from image 56 |
| `layout.crm-usage-drawer.width` | `379px` | Usage support drawer crop width from image 69 |
| `layout.crm-usage-drawer.height` | `852px` | Usage support drawer crop height from image 69 |
| `layout.crm-usage-drawer.question-columns` | `34px minmax(0, 1fr) 22px` | Suggested-question icon, label and trailing affordance columns from image 69 |
| `layout.crm-usage-drawer.composer-columns` | `minmax(0, 1fr) 50px` | Composer input and circular send control columns from image 69 |
| `layout.crm-trial-class-row.width` | `832px` | Selected trial class row crop width from image 39 |
| `layout.crm-trial-class-row.columns` | explicit avatar/name/class/chip/action columns | Trial row exact x-position grid from image 39 |
| `layout.crm-enrollment-checklist.width` | `292px` | Enrollment checklist drawer crop width from image 40 |
| `layout.crm-risk-row.width` | `862px` | Retention risk row crop width from image 41 |
| `layout.crm-risk-row.columns` | explicit avatar/name/chip/reason/action columns | Risk row exact x-position grid from image 41 |
| `layout.crm-retention-panel.cancellation-width` | `397px` | Cancellation drawer crop width from image 42 |
| `layout.crm-retention-panel.reactivation-width` | `412px` | Reactivation drawer crop width from image 43 |
| `layout.crm-retention-panel.complaint-width` | `398px` | Complaint drawer crop width from image 44 |
| `layout.crm-support-ticket-panel.width` | `390px` | Support ticket drawer crop width from image 47 |
| `layout.crm-internal-ticket-panel.width` | `443px` | Internal selected ticket drawer crop width from image 48 |
| `layout.crm-tenant-summary-drawer.*` | width `402px`; top/right/bottom `98/12/39px`; facts in 2 columns | Image 49 selected-tenant summary rail and shell boundary |
| `layout.crm-grant-access-panel.width` | `340px` | Tenant grant card crop width from image 50 |
| `layout.crm-tenant-row.width` | `955px` | Selected tenant row crop width from image 49 |
| `layout.crm-tenant-row.columns` | explicit checkbox/avatar/tenant/status/metrics/action columns | Tenant row exact x-position grid from image 49 |
| `layout.crm-internal-shell.width` | `1080px` | Internal dashboard content crop width from image 48 |
| `layout.crm-internal-overview.columns` / `card-rows` / `bottom-columns` | `325fr 339fr 367fr`; `198px 212px`; `538fr 503fr` | Image 48 asymmetric six-card dashboard tracks and activity/copilot row; package-owned through `InternalOverviewDashboard` |
| `layout.crm-internal-overview.content-padding` / `gap` | `0 20px 28px 67px`; `9px` | Source-sized Internal cockpit canvas inset and shared card/panel gap at 1672x941 |
| `layout.crm-internal-overview.drawer-*` | top `124px`; right `20px`; bottom `57px` | Image 48 floating 443x760 Internal ticket boundary, selected through official shell/drawer variants |
| `layout.crm-product-shell.main-header-internal-overview-height` / `header-internal-overview-*` | header `71px`; left `71px`; copy offset `-4px`; actions offset `20px`; right padding `16px` | Image 48 title/subtitle and command rhythm without consumer CSS |
| `layout.crm-internal-tenants.*` | topbar `41px`; header `76px`; content `0 12px 15px 28px`; worklist gap `12px`; rail `164px`; rail gap `10px` | Image 49 exact shell/worklist axes without consumer CSS |
| `layout.crm-tenant-detail-layout.columns` | `1071px 346px` | Tenant detail main area plus security rail from image 50 |
| `layout.crm-security-rule-panel.width` | `346px` | Tenant security rail crop width from image 50 |
| `layout.crm-report-filter-bar.width` | `795px` | Report filter bar crop width from image 45 |
| `layout.crm-report-card.width` | `493px` | `Dinheiro em aberto` report card crop width from image 45 |
| `layout.crm-report-card.stat-columns` | `141px 141px 151px` | Three metric pill columns from image 45 |
| `layout.crm-opportunity-drawer.width` | `368px` | Opportunity drawer crop width from image 46 |
| `layout.crm-opportunity-drawer.fact-columns` | `24px 188px minmax(0, 1fr)` | Opportunity fact row icon/label/value columns from image 46 |
| `layout.crm-opportunity-drawer.action-columns` | `repeat(2, minmax(0, 1fr))` | Two-column opportunity action grid from image 46 |
| `layout.crm-import-progress-panel.width` | `646px` | Import progress panel crop width from image 13 |
| `layout.crm-import-progress-panel.columns` | `274px repeat(2, 154px)` | Main import card plus two summary-card columns from image 13 |
| `layout.crm-field-mapping-panel.width` | `453px` | Field mapping panel crop width from image 13 |
| `layout.crm-field-mapping-panel.row-columns` | `132px 130px 88px 58px` | Field mapping imported/target/status/action columns from image 13 |
| `layout.crm-duplicate-resolver.width` | `502px` | Duplicate resolver panel crop width from image 13 |
| `layout.crm-duplicate-resolver.columns` | `164px 18px 164px 96px` | Duplicate record/compare/record/action columns from image 13 |
| `layout.crm-permission-state-panel.width` | `357px` | Permission access panel crop width from image 12 |
| `layout.crm-permission-state-panel.columns` | `82px 73px 68px 92px` | Permission row module/profile/action/status columns from image 12 |
| `layout.crm-integration-failed-panel.width` | `363px` | Integrations panel crop width from image 12 |
| `layout.crm-integration-failed-panel.columns` | `36px minmax(0, 1fr) 82px 92px` | Failed integration row icon/body/status/action columns from image 12 |
| `layout.crm-integration-failed-panel.connected-columns` | `36px 104px 158px 22px` | Connected integration row icon/body/status/menu columns from image 12 |
| `layout.crm-plan-summary-card.active-width` | `292px` | Active billing plan card crop width from image 65 |
| `layout.crm-plan-summary-card.review-width` | `636px` | Review subscription plan matrix crop width from image 74 |
| `layout.crm-plan-summary-card.confirmed-width` | `545px` | Confirmed subscription plan detail crop width from image 77 |
| `layout.crm-plan-summary-card.failed-width` | `641px` | Failed subscription compact plan detail crop width from image 76 |
| `layout.crm-invoice-table.width` | `876px` | Invoice-history panel crop width from image 66 |
| `layout.crm-invoice-table.columns` | `136px 135px 138px 135px 139px minmax(146px, 1fr)` | Exact Periodo/Vencimento/Valor/Status/Metodo/Acoes grid from image 66 |
| `layout.crm-invoice-table.period-column` | `136px` | Periodo column width from image 66 |
| `layout.crm-invoice-table.due-column` | `135px` | Vencimento column width from image 66 |
| `layout.crm-invoice-table.amount-column` | `138px` | Valor column width from image 66 |
| `layout.crm-invoice-table.status-column` | `135px` | Status column width from image 66 |
| `layout.crm-invoice-table.method-column` | `139px` | Metodo column width from image 66 |
| `layout.crm-invoice-table.actions-column` | `146px` | Acoes column width from image 66 |
| `layout.crm-addon-card.width` | `269px` | Individual add-on card crop width from image 67 |
| `layout.crm-addon-card.panel-width` | `888px` | Available add-ons card group width from image 67 |
| `layout.crm-addon-card.panel-columns` | `repeat(3, var(--taliya-layout-crm-addon-card-width))` | Three-card add-ons grid from image 67 |
| `layout.crm-addon-card.panel-gap` | `20px` | Gap between add-on cards from image 67 |
| `layout.crm-quota-progress.width` | `890px` | Quota cycle card crop width from image 68 |
| `layout.crm-usage-origin-row.width` / `columns` | `380px`; `40px 94px 110px 52px 34px` | Usage-origin row crop width and icon/label/bar/amount/percent columns from image 68 |
| `layout.crm-export-action.width` / `menu-width` | `115px`; `164px` | Global Exportar action crop and menu width from image 45 |
| `layout.crm-usage-ledger.width` | `893px` | Usage-ledger panel crop width from image 69 |
| `layout.crm-usage-ledger.table-width` | `855px` | Usage-ledger table crop width from image 69 |
| `layout.crm-usage-ledger.table-offset-x` | `-9px` | Table starts at x20 inside a panel with 29px content inset |
| `layout.crm-usage-ledger.footer-width` | `833px` | Footer label/load-more span from image 69 |
| `layout.crm-usage-ledger.table-columns` | `108px 108px 190px 160px 87px 95px 107px` | Quando/Origem/Agente fluxo/Caso/Uso/Status/Acao columns from image 69 |
| `layout.crm-usage-ledger.filter-widths` | `180px 145px 149px 139px` | Periodo/Agente/Origem/Status filter widths from image 69 |
| `layout.crm-approval-panel.width` | `360px` | Approval panel crop width from image 25 |
| `layout.crm-approval-panel.fact-columns` | `18px 115px minmax(0, 1fr)` | Fact icon/label/value columns from image 25 |
| `layout.crm-approval-panel.action-columns` | `repeat(3, minmax(0, 1fr))` | Edit/reject/request-data footer action grid from image 25 |
| `layout.crm-before-after-diff.width` | `346px` | Before/after diff panel crop width from image 15 |
| `layout.crm-before-after-diff.table-columns` | `77px 97px 1fr` | Label, Valor anterior and Valor novo columns from image 15 |
| `layout.crm-before-after-diff.footer-columns` | `1fr auto` | Actor/origin group plus action group from image 15 |
| `layout.crm-audit-trail.width` | `502px` | Audit-log panel crop width from image 15 |
| `layout.crm-audit-trail.table-columns` | `78px 66px 90px 102px 48px 54px 50px` | Ator, Objeto, Acao, Horario, Origem, Status and Abrir objeto columns from image 15 |
| `layout.crm-audit-trail.actor-column` / `object-column` / `action-column` / `time-column` | `78px` / `66px` / `90px` / `102px` | Fixed compact audit table source columns from image 15 |
| `layout.crm-audit-trail.origin-column` / `status-column` / `open-column` | `48px` / `54px` / `50px` | Fixed compact audit table source/status/action columns from image 15 |
| `layout.crm-kanban.board-width` / `board-height` | `1284px` / `570px` | Exact image 21 board body crop dimensions. |
| `layout.crm-kanban.board-columns` / `board-gap` | `181px repeat(5, minmax(0, 1fr))` / `13px` | Quick-filter rail plus five operation lane slots from image 21. |
| `layout.crm-kanban.rail-width` / `column-width` | `181px` / `207px` | Source rail and lane slot widths from the image 21 board body. |
| `layout.crm-kanban.board-min-height` / `column-min-height` | `570px` / `570px` | Board and lane height used by the source layout proof. |
| `layout.crm-plan-blocked-state.width` | `269px` | Plan-blocked add-on card crop width from image 67 |
| `layout.crm-quota-blocked-state.width` | `423px` | Quota alert/affected stack crop width from image 68 |
| `layout.crm-empty-shell.stage.width` | 1160 | Image 79 screenshot stage width |
| `layout.crm-empty-shell.stage.height` | 868 | Image 79 screenshot stage height |
| `layout.crm-empty-shell.stage.padding-top` | 71 | Image 79 browser window top offset |
| `layout.crm-empty-shell.stage.mobile-height` | 229 | mobile Storybook proof height for scaled clone |
| `layout.crm-empty-shell.stage.mobile-padding-top` | 23 | mobile Storybook proof top offset for scaled clone |
| `layout.crm-empty-shell.stage.mobile-scale` | 0.285 | mobile Storybook visual scale for full clone proof |
| `layout.crm-empty-shell.window.width` | 1092 | Image 79 browser frame width |
| `layout.crm-empty-shell.window.height` | 722 | Image 79 browser frame height |
| `layout.crm-empty-shell.window.radius` | 10 | Image 79 browser frame radius |
| `layout.crm-empty-shell.window.chrome-height` | 57 | Image 79 browser chrome height |
| `layout.crm-empty-shell.window.body-height` | 665 | Image 79 body grid height |
| `layout.crm-empty-shell.sidebar.width` | 72 | Image 79 empty shell sidebar column |
| `layout.crm-empty-shell.sidebar.padding-top` | 8 | Image 79 sidebar top inset |
| `layout.crm-empty-shell.sidebar.padding-bottom` | 88 | Image 17/79 sidebar bottom inset tuned so theme controls sit at source y-axis |
| `layout.crm-empty-shell.sidebar.control-offset-x` | -29 | Image 79 sidebar circular control alignment |
| `layout.crm-empty-shell.sidebar.nav-offset-y` | 35 | Image 17 sidebar main navigation start |
| `layout.crm-empty-shell.sidebar.nav-gap` | 13 | Image 17 sidebar main navigation gap |
| `layout.crm-empty-shell.sidebar.first-control-gap` | 1 | Image 17 extra gap after expand control; combines with `nav-gap` for the source first interval |
| `layout.crm-empty-shell.sidebar.late-control-offset-y` | 0 | Image 17 compact stack adjustment |
| `layout.crm-empty-shell.sidebar.utility-gap` | 12 | Image 17 theme utility gap |
| `layout.crm-empty-shell.sidebar.utility-offset-y` | 8 | Image 17 theme utility separation |
| `layout.crm-empty-shell.main.topbar-height` | 58 | Image 79 topbar row height |
| `layout.crm-empty-shell.main.header-height` | 43 | Image 79 page header row height |
| `layout.crm-empty-shell.topbar.back-left` | 119 | Image 79 back button x position |
| `layout.crm-empty-shell.topbar.back-top` | 3 | Image 79 back button y position |
| `layout.crm-empty-shell.topbar.nav-left` | 225 | Image 79 top navigation x position |
| `layout.crm-empty-shell.topbar.nav-top` | 1 | Image 79 top navigation y position |
| `layout.crm-empty-shell.topbar.nav-gap` | 19 | Image 79 top navigation gap |
| `layout.crm-empty-shell.topbar.actions-right` | 20 | Image 79 global actions right inset |
| `layout.crm-empty-shell.topbar.actions-top` | 3 | Image 79 global actions y position |
| `layout.crm-empty-shell.topbar.actions-gap` | 7 | Image 79 global actions gap |
| `layout.crm-empty-shell.header.margin-left` | 13 | Image 79 page title left inset |
| `layout.crm-empty-shell.title.offset-y` | -4 | Image 79 page title vertical offset |
| `layout.crm-empty-shell.image-79.sidebar.padding-bottom` | 28 | Image 79 fixed-window utility reserve override |
| `layout.crm-empty-shell.image-79.sidebar.nav-offset-y` | 13 | Image 79 fixed-window navigation start override |
| `layout.crm-empty-shell.image-79.sidebar.nav-gap` | 3 | Image 79 fixed-window navigation gap override |
| `layout.crm-empty-shell.image-79.sidebar.utility-gap` | 6 | Image 79 fixed-window utility gap override |
| `layout.crm-empty-shell.image-79.sidebar.utility-offset-y` | 0 | Image 79 fixed-window utility offset override |
| `layout.crm-empty-shell.image-79.topbar.nav-left` | 211 | Image 79 source-derived top navigation x override |
| `layout.crm-empty-shell.image-79.topbar.nav-gap` | 3 | Image 79 source-derived top navigation gap override |
| `layout.crm-empty-shell.topbar.nav-active-width` | 84 | Image 79 active navigation pill width |
| `layout.crm-empty-shell.image-79.title.offset-y` | -1 | Image 79 source-derived title y override |
| `layout.crm-browser.traffic.left` | 17 | Image 79 traffic lights x position |
| `layout.crm-browser.traffic.top` | 18 | Image 79 traffic lights y position |
| `layout.crm-browser.toolbar.left` | 96 | Image 79 browser toolbar x position |
| `layout.crm-browser.toolbar.top` | 17 | Image 79 browser toolbar y position |
| `layout.crm-browser.address.top` | 10 | Image 79 browser URL pill y position |
| `layout.crm-shell-brand.left` | 24 | Image 79 logo x position inside sidebar |
| `layout.crm-shell-brand.top` | -4 | Image 79 logo y correction inside sidebar |

## Radius Tokens

| Token | Value | Usage |
| --- | ---: | --- |
| `radius.micro` | 6 | small badges |
| `radius.chip` | 10 | chips/filter chips |
| `radius.control` | 12 | inputs/buttons |
| `radius.card` | 16 | repeated cards |
| `radius.panel` | 24 | panels |
| `radius.window` | 30 | browser/app frames |
| `radius.circle` | 999 | circular controls/avatars |

## Elevation Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `shadow.card` | `0 2px 8px rgba(16, 20, 26, 0.08)` | regular cards |
| `shadow.panel` | `0 6px 20px rgba(16, 20, 26, 0.10)` | panels |
| `shadow.overlay` | `0 12px 32px rgba(16, 20, 26, 0.14)` | popovers/modals |
| `shadow.window` | `0 24px 70px rgba(16, 20, 26, 0.18)` | browser/app frame |
| `shadow.control-floating` | `0 10px 22px rgba(16, 20, 26, 0.12)` | circular controls on light canvas |
| `shadow.control-hover` | `0 11px 22px rgba(16, 20, 26, 0.14)` | circular control hover |
| `shadow.checkbox` | `0 1px 2px rgba(16, 20, 26, 0.04)` | checkbox micro elevation |
| `shadow.dropdown` | `0 14px 28px rgba(16, 20, 26, 0.14)` | select/dropdown |
| `shadow.inverse-card` | `0 18px 34px rgba(16, 20, 26, 0.18)` | inverse cards |
| `shadow.inner-soft` | `inset 0 1px 0 rgba(255, 255, 255, 0.70)` | glassy cards |
| `shadow.crm-quota-progress` | `0 14px 28px rgba(16, 20, 26, 0.025), inset 0 1px 0 rgba(255, 255, 255, 0.72)` | quota cycle card elevation from image 68 |
| `shadow.crm-empty-shell.window` | `0 36px 74px rgba(20, 22, 28, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.78)` | Image 79 browser frame |
| `shadow.crm-browser.traffic-light` | `inset 0 0 0 1px rgba(16, 20, 26, 0.06)` | Image 79 traffic lights |
| `shadow.crm-addon-card` | `0 14px 28px rgba(16, 20, 26, 0.035), inset 0 1px 0 rgba(255, 255, 255, 0.72)` | Image 67 add-on cards |
| `shadow.crm-approval-panel` | `0 18px 38px rgba(16, 20, 26, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.72)` | Image 25 approval panel |
| `shadow.crm-before-after-diff` | `0 12px 24px rgba(16, 20, 26, 0.018), inset 0 1px 0 rgba(255, 255, 255, 0.78)` | Image 15 before/after diff panel |
| `shadow.crm-audit-trail` | `0 12px 24px rgba(16, 20, 26, 0.018), inset 0 1px 0 rgba(255, 255, 255, 0.78)` | Image 15 audit-log panel |
| `shadow.crm-kanban-card` | `0 10px 18px rgba(16, 20, 26, 0.025), inset 0 1px 0 rgba(255, 255, 255, 0.82)` | Image 21 operation kanban cards |
| `shadow.crm-product-shell.panel` / `shadow.crm-product-shell.control` | panel `0 10px 20px rgba(20, 22, 28, 0.012), inset 0 1px 0 rgba(255, 255, 255, 0.74)`; control `0 6px 14px rgba(20, 22, 28, 0.018), inset 0 1px 0 rgba(255, 255, 255, 0.72)` | Image 30 shared shell/filter/card elevation rhythm after rejected heavier probes; keeps page chrome discreet and source-like across official shell surfaces |
| `shadow.crm-checklist-table.row-selected` | `none` | Image 24 checklist table selected row intentionally uses the checklist title-cell dot marker plus soft selected background, not the Image 23 task-table left rail shadow. This preserves source-specific selection anatomy while keeping the selected row state tokenized. |

## Control And Density Tokens

These tokens are the primitive anatomy contract. They are intentionally more detailed than the base spacing scale because they lock exact board-derived dimensions for reusable controls.

| Token / Prefix | Values | Usage |
| --- | --- | --- |
| `control.press-offset-y` | `1px` | pressed state offset |
| `control.opacity.*` | disabled `0.48`, muted `0.56`, subtle-disabled `0.62`, cancelled `0.72` | disabled/blocked/cancelled visual grammar |
| `control.height.*` | xs `28`, sm `34`, md `42`, lg `52` | base control height rhythm |
| `control.padding.*` | xs `8`, sm `12`, md `16` | base horizontal padding rhythm |
| `color.logo-dot.*` | start `#2E72FF`, end `#1F61FF` | TaliyaLogo blue dot gradient copied from the canonical logo SVG |
| `control.icon.size.*` / `control.icon.stroke-width` | sm `14`, md `18`, lg `22`, stroke `1.8` | icon sizing and stroke inside primitives |
| `control.icon-button.*` | sm `36/16`, md `40/18`, lg `52/20`, xl `60/22`, alert `8` offset `5` | circular icon button anatomy |
| `control.crm-surface.icon-size` | `38px` | Icon footprint for composed CRM surfaces that wrap primitives |
| `control.crm-kanban-*` | rail padding/radius/title, quick-filter height/radius, column padding/header/title/count/empty, card `185x150` source-size rhythm via column content width, `56px minmax(0, 1fr)` fact columns, `9px 8px 10px` padding, title `12/15`, text `10/13`, chip `18px`/`9px`, chip padding/gap and vertical menu icon | Exact image 21 operation kanban board anatomy for `KanbanBoard`, `KanbanColumn` and `KanbanCard` certification |
| `control.crm-calendar-card.min-height` | `88px` | Minimum class/event card height in CRM agenda layouts |
| `control.crm-weekly-calendar.*` | event `122x85`, event padding `8px 9px 7px`, radius `7px`, title `10px/13px`, text `9px/12px`, status `16px` | Exact image 26 class-event anatomy inside `WeeklyCalendar` |
| `control.crm-class-card.*` / `layout.crm-class-card.*` / `color.crm-class-card.*` / `shadow.crm-class-card*` | regular `122x85`, selected `123x86`, padding `8px 9px 7px`, radius `7px`, title `9px/13px/700`, text `9px/12px`, status `16px` with `78px` max width, success/danger/warning/purple status colors, selected blue border/ring | Exact image 26 `ClassCard` anatomy, including selected pending, scheduled, available, full, teacher unavailable/conflict, replacement and disabled state density |
| `control.crm-mini-calendar.*` / `layout.crm-mini-calendar.*` / `color.crm-mini-calendar.*` | card `204x242`, padding `24px 14px 16px`, header `22px`, header gap `15px`, nav `22px`, columns `repeat(7, 24px)`, column gap `1px`, row gap `5px`, day `24px`, weekday `10px/14px`, day text `12px/16px`, selected black, today soft blue | Exact image 26 `MiniCalendar` anatomy including month header, chevrons, 35 real day buttons, selected `12`, today `18`, outside-month muted days and disabled/loading/blocked state density |
| `control.crm-settings-card.icon-size` / `control.crm-settings-card.min-height` | `76px` / `286px` | Hub card icon and card height for settings/config patterns |
| `control.crm-settings-hub-card.*` | `height 286px`, `icon-glyph 45px`, `icon-stroke 1`, `title 19px/24px/650`, `status 29px`, `action 258x38px` | Exact Image 60 `SettingsHubCard` anatomy, including tokenized icon/title/status/action offsets for the approved 332x286 hub card |
| `control.crm-settings-section.*` / `layout.crm-settings-section.*` / `color.crm-settings-section.*` | section `944x250`, columns `repeat(2, minmax(0, 1fr))`, row columns `40px 1fr 104px 32px`, rows `51px`, action `30px`, toggle `38x22`, icon `20px`, gap `16px` | Exact Image 62 `SettingsSection` anatomy for `2. Regras financeiras simples`, including the two rounded rule groups, six source rows, five chevron buttons, one compact toggle, and source/saved/dirty/loading/blocked density |
| `control.crm-permission-matrix.*` / `layout.crm-permission-matrix.*` / `color.crm-permission-matrix.*` | `851x259`, table `824px`, columns `31px 386px 229px 1fr`, rows `27px`, index `18px`, toggle `32x18`, select `166x28`, header offset `4px` | Exact Image 61 `PermissionMatrix` anatomy for `2. Ajustes sensÃ­veis`, including source colors, dirty/read-only/loading/empty/error/blocked state density and real control sizing |
| `control.crm-integration-status-row.*` / `layout.crm-integration-status-row.*` / `color.crm-integration-status-row.*` | item `224x72`, columns `71px 1fr`, Pix mark bbox near `39px`, title `14px/18px/650`, helper `12px/15px`, helper width `72px`, status icon `13px`, divider `1px`, provider colors for Pix/card/recurrence/reconciliation | Exact Image 62 `IntegrationStatusRow` anatomy for `Pix Taliya / Bloqueado atÃ© ativar`, including source blocked state, provider mark placement, two-line helper wrapping and no-divider variant for the final item |
| `control.crm-unsaved-changes-bar.*` / `layout.crm-unsaved-changes-bar.*` / `color.crm-unsaved-changes-bar.*` | footer `943x51`, columns `146px 1fr 240px`, padding `4px 18px 1px 0`, button height `46px`, radius `8px`, type `15px/18px/600`, cancel border `#E1E5EE`, primary black `#000000` | Exact Image 62 config footer anatomy for `Cancelar` / `Salvar alteraÃ§Ãµes`, including source dirty state, real button sizing and operational saving/saved/blocked state colors |
| `control.crm-rule-row.*` / `layout.crm-rule-row.*` / `color.crm-rule-row.*` | row `860x35`, columns `50px 273px 372px 165px`, control `259px`, icon `17px`, select `259x27`, select icon `12px`, toggle `34x20`, source red `#FE2B31`, source green `#12AA42` | Exact Image 64 `RuleRow` anatomy for `CrÃ­tico / Imediato / Ligado`, including compact select/toggle sizing and disabled/blocked/loading state density |
| `control.crm-agent-card.*` | min-height `228px`; icon `76px`; inner icon `32px` | Agent catalog card anatomy from image 52 |
| `control.crm-mode-card.min-height` | `92px` | Agent mode choice card height from images 54 and 56 |
| `control.crm-phone-preview.*` | width `360px`; border `7px`; min-height `604px` | Phone/channel preview from image 58 |
| `control.stepper.*` | marker `30px`; compact marker `22px`; connector `2px`; item gap `8px`; label gap `3px`; footer gap `18px`; vertical gap `18px`; vertical row min-height `58px`; vertical connector top `38px`; vertical connector bottom `-14px` | Batch 8 setup/wizard stepper anatomy from image 13 plus Batch 9 setup shell vertical stepper from image 51A |
| `control.checklist.*` | row `31px`; padding x/y `9px/0`; icon `14px`; owner `76px`; action gap `5px` | Batch 8 compact activation checklist rows from image 13 |
| `control.metric-tile.*` | min height `124px`; compact `104px`; icon `22px`; value `31/36`; operational min height `84px`; operational padding `12px 14px`; operational icon box `34px`; operational value `14/18`; progress ring `36px` | Batch 8 operational metric tile anatomy from images 10 and 15 |
| `control.status-summary.*` | min height `112px`; icon `40px`; hero icon `88px`; gap `10px`; details gap `8px`; details grid `repeat(3, minmax(0, 1fr))` | Batch 8 system/governance summary cards from images 10 and 12 |
| `control.crm-subscription-status-card.*` | verifying `662px` min-height with `4px 66px 20px` padding; failed `653px` min-height with `5px 32px 20px`; confirmed `525px` min-height with `30px 40px 28px`; confirmed header/body gaps `24px/7px`; icon `54/24px`; confirmed icon `88/46px` with `7px` ring | Subscription status cards from images 75, 76 and 77 |
| `control.crm-subscription-status-row.*` | default row `54px`; failed row `48px`; padding-x `24px` | Subscription status row density from images 75 and 76 |
| `control.crm-subscription-detail-row.*` | default `38px`; confirmed `54px`; icon `24px` | Subscription detail rows from images 75, 76 and 77 |
| `control.crm-subscription-progress-*` | progress height `51px`; marker `26px`; label gap `7px`; label line-height `15px` | Confirmation stepper anatomy from image 75 |
| `control.crm-subscription-callout-*` | callout height `80px`; gap `20px`; icon `24px`; title `14/18`; body `13/18` | Failed-payment explanation callout from image 76 |
| `control.crm-subscription-secure-height` / `control.crm-subscription-release-note-inline-bleed` / `control.crm-subscription-primary-height` | `62px` / `-12px` / `40px` | Secure notice, confirmed release note and primary action height from images 75, 76 and 77 |
| `control.crm-confirmed-setup-handoff.*` | `525px` min-height; `20px 42px 30px` padding; header gap `9px`; title `24/30/600`; description `15/24` width `395px`; steps gap `13px`; step grid `44px minmax(0, 1fr)`; step number `44px`; action height `48px`; action text `18px` | Setup guided handoff card from image 77 |
| `control.crm-plan-summary-card.*` | active `515px` min-height, `22px 20px 39px` padding, icon `36px`, action `42px`; review `539px` min-height, `25px 26px 24px` padding, row `29px`, status `14px` with `-40px` status offset; confirmed `524px` min-height, `30px 39px 28px` padding, icon `88/46px`, rows `52px`, release-note bleed `-10px`; failed `113px` min-height, header `37px`, row `37px` | Plan summary cards from images 65, 74, 76 and 77 |
| `control.crm-checkout-review-panel.gap` | `41px` | Exact gap between the review plan summary and payment card in image 74 |
| `control.crm-checkout-payment-card.*` | `539px` min-height; `23px 30px 27px` padding; title `18/23/600`; title-to-plan gap `23px`; plan divider padding `19px`; coupon padding `23px 0 22px`; coupon label gap `11px`; coupon controls gap `18px`; coupon input/button height `40px`; coupon button width `99px`; total padding `23px`; total label `18/22`; total value `24/29`; secure gap `13px`; secure chip `30px` high, `16px` icon, `12/15` text; secure-copy `13/17`; actions gap `24px`; action inline bleed `-8px`; primary action `41px` high with `15px` text; back action `24px` high with `15px` text | Right payment card anatomy from image 74 |
| `control.crm-invoice-table.*` | `314px` min-height; `22px 24px 0 22px` padding; title `18/23/600`; title gap `1px`; header `40px`; rows `52px`; cell `14/18`; header `13/17/500`; status chip `30px` high, `13/17`, `11px` horizontal padding and `-12px` x-offset; actions gap `6px`, x-offset `-7px`; action `32px` high, widths `68px/76px`, icon `15px`, text `13/17` | Invoice-history panel anatomy from image 66 |
| `control.crm-addon-card.*` | card `269x344`; padding `25px 17px 29px`; icon `48px` with `25px` glyph and `5px` x-offset; title `16/20/600` with `20px` offset; status chip `34px`; description `15/21` width `232px`; meta `14/20`; action `232x45` bottom `29px` | Add-on cards from image 67 |
| `control.crm-usage-ledger.*` | panel `893x709`; padding `28px 18px 38px 28px`; radius `14px`; title `19/24/700`; description `14/20`; filter row y `123/124px`, filter `40px` high, gap `13px`, radius `9px`; table `855x408`, offset x `-9px`, gap `22px`, radius `14px`, header `47px`, rows `60px`, cell padding `11px`, table text `13/18` with source-condensed family; origin icon `20px`; status chip `31px`, radius `7px`, padding-x `10px`, text `12px`; action text `14px`; footer gap `39px`; load-more `133x40` | Usage-ledger panel anatomy from image 69 |
| `control.crm-approval-panel.*` | panel `360x940`; padding `18px 10px 7px 18px`; radius `17px`; close button `34px`; eyebrow chip `19px`; title `17/23/600` with `6px` gap; fact rows `27px`; fact font `10.5/15`, label weight `500`, icon `14px`, value icon `12px`; section title/body `13px`; suggestion copy `13/17`; timeline row `30px`; comment avatar `31px`; footer `118px`; primary action `34px`, secondary actions `34px`, bottom source action `34px` | Approval decision panel anatomy from image 25 |
| `control.crm-impact-summary.*` | panel `848x185`; padding `13px 15px 11px`; radius `13px`; title `13/17/700`; description `11/14`; header text offset `-3px`; list top `11px`; row `26px`; row gap `15px`; icon tile `26px` with `15px` glyph; row text `12/16`; loading/blocked state height `113px` | Permissions impact summary panel anatomy from image 61 |
| `layout.crm-impact-summary.*` / `color.crm-impact-summary.*` / `shadow.crm-impact-summary` | width `848px`; row columns `28px minmax(0, 1fr)`; background `#FFFFFF`; title `#2E3138`; text `#687180`; muted `#747C89`; border `rgba(16,20,26,0.08)`; info/success/warning/danger icon tile colors; shadow `0 12px 26px rgba(16,20,26,0.025)` plus inset highlight | Exact impact summary surface, text, icon and elevation tokens from image 61 |
| `control.crm-before-after-diff.*` | panel `346x188`; padding `15px 12px 9px`; radius `14px`; title `9/12/700`; table `103px` high with `-7px` y offset; table radius `7px`; table text `7/10`; header `20px`; row `16px`; cell padding x `6px`; footer `24px`; footer text `7.5/10`; avatar `12px`; actions `22px` high, radius `8px`, text `7.5px`, icon `9px`, widths `58px/65px`; state body `137px` | Before/after diff panel anatomy from image 15 |
| `control.crm-audit-trail.*` | panel `502x184`; padding `7px`; radius `14px`; title `9/12/700`; title gap `15px`; table `129px` high; table text `7/10`; header `22px`; row `21px`; cell padding x `4px`; avatar `14px`; status `14px` high, radius `7px`, text `6.5px`; open-object action `14px`; footer `19px`, text `7.5/10`; state body `137px` | Exact Image 15 `Log detalhado / auditoria` panel, including seven source columns, five rows, external-link action controls and source/filtered/sensitive/loading/empty/error/blocked density |
| `control.crm-conversation-list.*` / `layout.crm-conversation-list.*` / `color.crm-conversation-list.*` / `shadow.crm-conversation-list-row` | list `483x733`; filter `31px` high, `5px` gap, `11px` type and `7px` padding; row `112px` high with `10px` radius; avatar `42px`; channel badge `17px`; title `14/18/650`; preview `13/17`; chips `24px` high with badge weight `600`; page-size `71x38` with `13px` chevron; pager buttons `32px` | Exact Image 24 `ConversationList` anatomy for the left inbox list, including six filters, five source rows, reusable `ChannelStatus` state chips, footer controls, loading/empty/blocked state density and real interaction controls |
| `control.crm-conversation-thread.*` / `layout.crm-conversation-thread.*` / `color.crm-conversation-thread.*` / `shadow.crm-conversation-thread-*` | thread `502x753`; header `61px`; handoff `32px`; stream `414px`; suggestion `88px`; composer row `158px`; composer surface `153px`; composer toolbar `34px`; template button `101x34`; send button `77x34`; composer button icon `16px` | Exact Image 24 center conversation pane anatomy, including the official `HandoffBanner`, message stream, copilot suggestion and `Composer` controls with no vertical clipping inside `ThreePaneLayout` |
| `control.crm-context-panel.*` / `layout.crm-context-panel.*` / `color.crm-context-panel.*` / `shadow.crm-context-panel-card` | panel `280x762`; header `63px`; facts card `258px`; history `136px`; tasks `95px`; agent status `69px`; footer buttons `37px`; avatar `44px`; fact row `45px`; body `10.2/13.2`; title `13.5/17`; footer columns `1fr 1fr` | Exact Image 24 right context panel anatomy, including Ana Silva header, contact facts, recent history timeline, related tasks, agent status card, and three real footer actions |
| `control.crm-quick-reply.*` / `layout.crm-quick-reply-chips.*` / `color.crm-quick-reply.*` / `shadow.crm-quick-reply` | stack `351px`; gap `18px`; pill `59px` high; radius `16px`; padding left/right `19px/29px`; icon `24px`; label `22/27/400`; source blue outline/text; disabled/loading/selected states | Exact Image 51B quick-reply stack used by setup-agent chat and guided reply surfaces; buttons remain real `Button` controls composed with the official `Icon` primitive |
| `control.crm-checklist-row.*` / `layout.crm-checklist-row.*` / `color.crm-checklist-row.*` | row `302x32`; left padding `1px`; gap `8px`; checkbox `11px`; index `13px`; text `10/14/400`; subtle row border; complete/warning/sensitive/blocked/disabled states | Exact Image 23 drawer checklist/subtask row used by task drawers and operational checklist blocks; rows remain semantic checkbox controls composed with the official `ChecklistItem` primitive |
| `layout.crm-checklist-drawer.width` / `layout.crm-product-shell.drawer-compact-width` / `layout.crm-task-drawer.compact-width` | compact drawer rail `342px` | Exact compact operational drawer rail used by Image 24 checklist execution and Image 23 task list/detail composition; exposed through `CrmProductShell drawerSize="compact"` and `TaskDrawer size="compact"` so consumers reserve and render the correct rail width without local CSS |
| `control.crm-work-list-detail.filter-*` | quick-filter item padding `8px`, gap `6px`, icon `14px`, count `18px`, count padding `0px` | Standard WorkListDetail quick-filter density for list/detail pages that use the 190px rail. Keeps labels readable in Image 23 after the compact drawer/table width correction without creating task-specific quick-filter CSS. |
| `layout.crm-checklist-table.*-column` | title `24%`; compact `10.25%`; owner `13%`; status `10.75%`; next step `10.5%`; activity `11%` | Image 24 checklist table column rhythm. The title column gets priority so long checklist names occupy the available table width before wrapping; status has a dedicated width so `Em andamento` stays contained in the source-size table, taking `0.5%` from the already-wrapping next-step column without introducing next-step overflow. Evidence: `tmp/visual-audit/batch11/checklists-24-status-column-official-20260701`. |
| `layout.crm-product-shell.content-drawer-right` | `17px` | Image 24 logged-in shell content drawer inset. `drawerPlacement="content"` drawers keep a source-like right gutter without changing drawer width or the standardized quick-filter rail. |
| `layout.crm-product-shell.viewport-drawer-*` | top `0px`; bottom `0px`; layer `50` | Image 18 Hoje task drawer placement. `drawerPlacement="viewport"` lets source-confirmed drawers occupy the full viewport height above the product-shell browser chrome/topbar when the approved image shows the drawer over the browser chrome instead of below it. |
| `layout.crm-product-shell.floating-drawer-*` / `floating-drawer-reserved-width` | top `120px`; right `14px`; bottom `24px`; reserved width `var(--taliya-control-drawer-width-sm)` | Image 25 floating approval drawer placement and main-content reservation. `drawerPlacement="floating"` keeps the drawer below the top navigation with source-like right/bottom gutters, while reserving the actual small drawer width instead of the wider task drawer rail so the work-list table can occupy the source-like width. |
| `layout.crm-product-shell.replacement-floating-drawer-top` | `104px` | Image 31 replacement drawer integrated-page exception. The approved replacement drawer content needs the full drawer height inside the floating shell without moving Image 25 approval drawer placement. |
| `layout.crm-product-shell.tenant-floating-drawer-*` | top `99px`; bottom `4px` | Image 49 internal tenant drawer placement exception. The certified `TenantSecurityDrawer` rail is taller than the generic floating drawer slot and needs a higher top/bottom boundary so all security actions remain visible without story-local CSS. |
| `layout.crm-product-shell.main.header-spacious-height` | `72px` | Image 25 source-like product page rhythm. `pageHeaderRhythm="spacious"` moves the work canvas down without changing fixed topbar or drawer placement; default shell header height remains `56px`. |
| `layout.crm-product-shell.main.header-compact-stacked-height` | `72px` | Image 31 Reposicoes work-list rhythm. `pageHeaderRhythm="compact-stacked"` keeps title/subtitle stacked while moving the filter/table canvas to the same compact vertical band as source-like 72px headers. |
| `layout.crm-product-shell.main.header-dashboard-height` / `header-dashboard-copy-offset-y` / `content-dashboard-padding` | height `74px`; copy offset `18px`; content padding `0 41px 28px 52px` | Image 17 dashboard page rhythm. `pageHeaderRhythm="dashboard"` aligns the `Hoje` heading and dashboard canvas to the approved source without story-only CSS and without changing default work-list pages. |
| `control.crm-operational-row.dense-height` / `schedule-dense-height` / `checklist-*` | dense height `43px`; schedule dense height `41px`; checklist columns `14px minmax(0, 1fr) 20px`; leading `14px`; mark `14px` | Image 17 `Aulas de hoje` and `Checklist do dia` row rhythm. Generic dense rows stay at `43px`; schedule dense rows use the source-like `41px` height plus `control.crm-operational-panel.schedule-dense-rows-margin-top = 4px` so the 4-row `Aulas de hoje` stack fits inside the 230px middle panel without clipping. The checklist variant uses a source-like hollow circular marker and narrower leading track while preserving the shared operational row gap, button semantics, and StatusDot primitive composition. |
| `layout.crm-product-shell.main.header-stacked-height` / `header-stacked-copy-offset-y` / `header-stacked-copy-gap` / `header-stacked-actions-offset-y` | height `96px`; copy offset `14px`; copy gap `8px`; actions offset `26px` | Image 24 checklist work-list page rhythm plus Image 30 Financeiro header actions. `pageHeaderRhythm="stacked"` renders title/subtitle as a source-like block and lets header actions sit on the source-like title band without story-only CSS, while preserving filter/table/card canvas placement. |
| `layout.crm-product-shell.main.header-agents-height` / `header-agents-copy-offset-y` / `header-agents-actions-offset-y` | `123px` / `31px` / `43px` | Image 52 catalog-only title and canvas axes through `pageHeaderRhythm="agents"`; the paired `frame="window-inset"` preserves the 20/24px source stage while flush Agents pages remain unchanged. |
| `layout.crm-product-shell.main.header-agents-routines-*` / `layout.crm-agent-routines.*` / `control.crm-agent-routine-*` | header `175px` (`209px` with meta); copy/actions `57px`/`69px`; canvas `1224px`; grid gap `20px`; intro/grid gap `25px`; intro gap `27px`; card min-height/button `265px`/`37px` | Image 53 routine-catalog rhythm through `pageHeaderRhythm="agents-routines"`, `AgentRoutineIntro` and `AgentRoutineCard`. The contract is scoped to pages containing the official intro and preserves Image 52 plus flush Agents pages. |
| `layout.crm-product-shell.*agent-routine*` / `control.crm-agent-routine-*.routine-detail-*` / `layout.crm-agent-flow-drawer.routine-width` | header `141px`; copy offset `9px`; content padding `0 28px 28px 49px`; mode `184px`; flow cards `198px`; workspace/grid gaps `12px`/`8px`; drawer `388px`, top/right/bottom `143px`/`23px`/`27px` | Image 54 routine-detail rhythm through `pageHeaderRhythm="agents-routine-detail"`, `rightPanelVariant="agent-routine"`, `AgentRoutineWorkspace` and `AgentFlowDrawer state="routine"`; selectors remain isolated from Images 53/56/58/59/70. |
| `layout.crm-product-shell.*agent-flow*` / `control.crm-agent-flow-section-panel-mode.flow-detail-height` / `control.crm-agent-flow-workspace.flow-detail-*` | header `140px`; drawer width `395px`, top/right/bottom `139px`/`41px`/`25px`; mode panel `148px`; mode/action offsets `-5px`/`2px` | Image 56 flow-detail rhythm through `pageHeaderRhythm="agents-flow-detail"`, `rightPanelVariant="agent-flow"`, `AgentFlowWorkspace` and `AgentFlowDrawer state="flow"`; selectors remain isolated from Images 54/58/59/70. |
| `layout.crm-product-shell.*agent-test*` / `layout.crm-simulation-runner.test-*` / `control.crm-simulation-runner.test-*` | drawer width `382px`, top/right/bottom `139px`/`19px`/`22px`; panels `572px`; phone padding `4px 8px`; action gap/height `26px`/`51px` | Image 58 test rhythm through `rightPanelVariant="agent-test"`, `SimulationRunner` and `AgentFlowDrawer state="test"`; horizontal phone scale remains inherited from the stable simulation contract and selectors remain isolated from Images 54/56/59/70. |
| `layout.crm-product-shell.main.header-agents-publish-height` / `header-agents-publish-*` / `content-agent-publish-padding` | header `85px`; copy offset `0px`; header left `86px`; content padding `0 6px 18px 82px` | Image 59 publication rhythm through `pageHeaderRhythm="agents-publish"` and `CrmRightPanelPage rightPanelVariant="agent-publish"`. The scoped contract aligns breadcrumb/title and the complete publish workspace while preserving Images 53/70 bit-identically. |
| `layout.crm-right-panel.agent-execution-*` | main `1007px`; rail reserve `368px`; offset `-5px`; columns composed from both tracks | Image 70 receipt/rail allocation through `CrmRightPanelPage rightPanelVariant="agent-execution"`. The scoped variant expands the complete `ExecutionReceipt` to the source axis while preserving Images 53/59 bit-identically. |
| `layout.crm-product-shell.main.header-settings-hub-height` / `header-settings-hub-*` / `content-settings-hub-padding` | header `161px`; copy offset `36px`; header left `96px`; content padding `0 67px 28px 94px` | Image 60 hub rhythm through `CrmDashboardPage layoutVariant="settings-hub"` and `pageHeaderRhythm="settings-hub"`. The scoped layout aligns the eight certified cards while preserving Image 61 bit-identically. |
| `layout.crm-product-shell.main.header-overview-height` / `control.crm-page-filter-bar.overview-padding` | header height `90px`; searchless overview filter padding `10px` | Image 30 Financeiro overview rhythm. `pageHeaderRhythm="overview"` keeps the stacked title/action treatment but moves overview content to source-like `filterBar.y=219` and compacts the searchless filter surface to `64px` without changing checklist/approval `stacked` pages. |
| `layout.crm-product-shell.main.header-reports-height` / `layout.crm-product-shell.header-reports-*` / `layout.crm-dashboard.opportunity-*` / `control.crm-page-filter-bar.opportunity-padding` | reports header `56px`; opportunity rows `208px 196px 191px`; gap `10px`; filter padding `11px 12px` | Images 45-46 reports family. `pageHeaderRhythm="reports"` owns the compact stacked report title; `CrmDashboardPage layoutVariant="opportunity"` and `PageFilterBar layout="stacked-filters"` own Image 46 canvas/filter rhythm without consumer CSS. |
| `layout.crm-dashboard.*-support` / `layout.crm-product-shell.*-support-*` / `control.crm-support-*` | columns `276px minmax(0, 1fr)`; gap `16px`; header `69px`; content padding `0 10px 28px 38px`; drawer top/right/bottom `198px/74px/35px`; agent panel `361px`; ticket workspace `381px` | Image 47 support family. `CrmDashboardPage layoutVariant="support"`, `pageHeaderRhythm="support"`, `contentLayout="support"`, and the official support components own rail/workspace/drawer geometry and compact table density without story-local CSS. |
| `layout.crm-page-filter-bar.tight-*` / `control.crm-page-filter-bar.tight-*` | search basis `264px`; filter min `78px`; wide filter `108px`; priority filter `104px`; filter padding `10px`; action padding `12px` | Image 31 Reposições filter-bar rhythm for pages with five inline filters plus a primary action where the source prioritizes a readable search field without moving filters into the advanced modal or changing the existing `compact` density used by Aprovações. |
| `layout.crm-product-shell.content-main-priority-padding` | `0 28px 27px 16px` | Image 31 Reposicoes floating-drawer work-list rhythm and Image24 checklist source-height fit. `contentLayout="main-priority"` reduces the left content inset so the main table can gain source-like width while preserving drawer reserve; the 27px bottom padding avoids a 1px frame overflow at the Image24 source viewport. |
| `layout.crm-product-shell.topbar.nav-left` / `layout.crm-product-shell.topbar.drawer-nav-left` / `control.segmented.shell.*` / `color.crm-product-shell.segmented-*` / `shadow.crm-product-shell.segmented` | nav-left `458px`; drawer nav-left `346px`; shell item `42px`; shell gap `16px`; shell item padding-x `22px`; shell container bg/border `transparent`; shell container shadow `none` | Image 30 product-shell top navigation rhythm plus Image 22 fixed-drawer top navigation reserve. Default nav-left moves the finance top navigation to source-like `x=530`; drawer nav-left keeps Operation drawer stories source-like with the full nav ending before the fixed drawer (`Histórico` right `943` before drawer x `1045`); shell segmented tokens restore 42px pill height and remove the incorrect inactive capsule/shadow through official shell tokens, not story-only CSS. |
| `surface.product-page` / `shadow.crm-product-shell.panel` / `shadow.crm-product-shell.control` | page bg `#F9F9FB`; panel shadow `0 10px 20px rgba(20,22,28,.012)` plus inset; control shadow `0 6px 14px rgba(20,22,28,.018)` plus inset | Image 30 global product-shell tone. Promoted after probes showed lighter page background and softer panel/control shadows reduced the source/render gap without changing shell, filter, priority, queue, or card geometry. |
| `control.crm-checklist-drawer.section-header-height` / `step-row-height` / `step-row-padding-y` / `step-index-width` | `32px` / `35px` / `5px` / `16px` | Exact Image 24 checklist execution drawer `Passos` rhythm: compact section header, compact done/pending rows, same-line step number/title, and source-like warning row height through helper text without reusing the taller task-drawer checklist row rhythm |
| `control.crm-task-table.*` / `layout.crm-task-table.*` | table `780x727`; inner width `760px`; columns `42px 150px 74px 64px 88px 116px 56px 119px 49px`; header `55px`; rows `73px`; footer `92px`; cell padding `5px`; text `10/15`; badge `9/13`; status height `22px`; mode `49x38`; pager button `30px` | Exact Image 23 central task table used by `TaskTable`, including eight source rows, selected row marker, status/priority/mode chips, page-size control, pagination controls, loading/empty/blocked state density and no horizontal overflow |
| `layout.crm-approval-table.*-column` | title `20%`; type `12%`; origin `10%`; requester `11%`; risk `8%`; cost `9%`; deadline `8%`; status `11%`; activity `11%` | Image 25 approval table column rhythm. Probe `approvals-25-column-probe-v4` widens the approval title column so the selected row reads as `Aprovar mensagem / para Ana Paula`, keeps the source row at `73px`, preserves zero overflow, and avoids the type/origin collision found in earlier probes. |
| `control.comparison-table.*` | min width `0`; row `14px`; action gap `7px`; changed/removed/added tints | Batch 8 before/after diff table from image 15 |
| `control.permission-table.*` | row `24px`; status width `94px`; action width `96px` | Batch 8 permission/access table from image 12 |
| `control.audit-table.*` | row `17px`; avatar `14px`; action width `24px` | Batch 8 dense audit log table from images 12 and 15 |
| `control.import-progress.*` | main min height `188px`; summary min height `92px`; icon `35px`; metric grid `repeat(3, minmax(0, 1fr))`; action gap `8px` | Batch 8 import progress primitive from image 13 |
| `control.conflict-card.*` | min height `190px`; fact grid `repeat(3, minmax(0, 1fr))`; fact gap `7px`; action row `34px` | Batch 8 conflict/suggestion card from images 13 and 14 |
| `control.document-preview.*` | rail `36px`; thumbnail `24x34`; canvas min height `82px`; toolbar `18px`; line `5px`; line widths `72/86/52%` | Batch 8 document preview primitive from image 14 |
| `control.execution-row.*` | marker `14px`; row `28px`; compact row `19px`; compact grid `20px minmax(82px, 1fr) minmax(72px, 0.78fr) 70px 37px 30px minmax(40px, 0.35fr)` | Batch 8 trace/execution row from image 15 |
| `control.confidence-meter.*` | segments `5`; segment height `9px`; segment gap `5px`; percent `24/29` | Batch 8 confidence meter from image 11 |
| `control.crm-student-header.*` | min height `173px`; padding `24px 28px 19px`; gap `42px`; actions `193px` columns with `10px` gap; contact icon `16px` with `12px/32px` gaps | Student identity header from image 28 |
| `control.crm-student-summary.*` | min height `144px`; padding `16px 20px`; vertical gap `6px`; metrics gap `10px` | Operational student summary from image 28 |
| `layout.crm-profile-tabs.width` / `control.crm-profile-tabs.*` / `color.crm-profile-tabs.*` / `shadow.crm-profile-tabs-active` | tab bar `1042x58`; padding `5px 4px`; gap `25px`; active tab `110x38`; radius `10px`; text `12/500`; muted blue text; active shadow `0 9px 18px rgba(16,20,26,.18)` | Exact Image 28 student profile tab-bar contract |
| `layout.crm-activity-feed.*` / `control.crm-activity-feed.*` / `color.crm-activity-feed.*` / `shadow.crm-activity-feed` | integrated Hoje continuation panel `1507x686` at the Image 20 source viewport after `scrollY=791`; padding `24px 30px 28px 28px`; header `64px`; rows `8 x 64px`; row gap `8px`; row columns `38px minmax(240px, 1fr) minmax(260px, 0.74fr) 24px`; icon `35px`; dot `9px`; source tone colors blue/green/orange/purple/red | Image 20 `Historico de hoje` activity feed continuation density contract. The older isolated crop contract remains historical Batch 9 evidence; current full-page coverage uses the integrated continuation geometry and keeps `tokens.css` synchronized with the TypeScript token source. |
| `layout.crm-operation-activity-table.row-columns` | `48px 32px 128px 164px minmax(190px, 1fr) 132px 108px 112px` | Image 21 bottom `Atividade recente` table row grid; component still reuses product shell panel/text/border/hover tokens |
| `control.relationship-card.*` | width `104px`; padding `12px 9px`; selected ring `2px`; text `9/12`; chip `14px`; featured highlight `50x38` | Batch 8 relationship card anatomy from image 13 |
| `control.crm-relationship-panel.*` / `color.crm-relationship-marker.*` | panel `443x260`; padding `18px 18px 20px 38px`; marker `18px`, icon `10px`; legend `334x34`; marker blue `#5E8EE8` | Relationship panel composition from image 13 |
| `control.crm-payment-case-card.*` | card `350x181`; padding `14px 18px 12px`; gap `4px`; header icon `34px`; row `29px`; row meta `9px`; footer `24px` | Finance queue card anatomy from image 30 |
| `control.crm-finance-priority-panel.*` | padding `16px`; gap `12px`; row `50px` | Image 30 `Prioridades financeiras` strip density. Keeps the overview panel at source-like `218px` height at the approved image viewport without reusing the taller reconciliation-row rhythm. |
| `control.crm-finance-kanban-card.*` | card `183x135`; padding `12px 9px 10px`; gap `6px`; chip `20px`; menu `22px` | Finance kanban card anatomy from image 33 |
| `control.crm-reconciliation-row.*` | row `832x55`; padding `0 12px 0 16px`; avatar `31px`; chip `24px`; row text `10px`; name `11px` | Movement reconciliation rows from image 34 |
| `control.crm-pipeline-card.*` | card `239x139`; padding `12px 9px 9px`; radius `7px`; row gap `7px`; title `14px`; meta `11px`; chip `22px` | Sales pipeline card anatomy from image 37 |
| `control.crm-commercial-row.*` | lead row `66px`; trial row `70px`; avatar `32px`; text `10/13`; chip `23px`; action chip `40px`; menu `18px` | Sales list and experimental row anatomy from images 38 and 39 |
| `layout.crm-replacement-table.column-*` | source-width column allocation: student `15%`, original class `12%`, reason `12%`, validity `8%`, preference `12%`, status `15%`, next action `12%`, mode `14%` | Image 31 replacement table column rhythm. Gives the `Modo` chip enough room at the source viewport while preserving the standardized 220px quick-filter rail and avoiding story-local CSS. |
| `control.crm-comment-thread.*` / `layout.crm-comment-thread.*` / `color.crm-comment-thread.*` | card `336x172`; padding `4px 12px 9px 4px`; radius `10px`; header `20px`; row `42px`; columns `22px minmax(0, 1fr) 62px`; avatar `21px`; title `11/15/650`; link `9/12/650`; name `9/12/650`; body `10/14`; time `9/12`; empty/loading/failed/blocked states | Exact Image 23 compact `ComentÃ¡rios` drawer card; comments are list rows with real button semantics and source avatars in the Storybook reference |
| `control.crm-task-drawer.*` / `layout.crm-task-drawer.*` / `color.crm-task-drawer.*` | panel `401x941`; padding `25px 29px 27px 21px`; radius `12px 0 0 12px`; header min `143px`; header padding `24px 20px 14px`; header gap `7px`; header label margin `14px`; compact header min `122px`; compact header padding `20px 20px 10px`; compact header gap `4px`; compact label margin `8px`; close `34px`; title `19/25/600`; status `24px`; fact columns `24px 128px minmax(0, 1fr)`; fact row `34px`; compact fact row `28px`; section gap `14px`; compact section gap `10px`; body `11/16`; checklist row `25px`; compact checklist padding `10px`; compact copilot padding `8px`; compact copilot icon `18px`; activity/comment cards use compact official spacing; default footer columns `repeat(3, minmax(0, 1fr))`; conversation footer columns `96px 76px 90px 74px`; footer action `41px`; origin action `42px` | Exact Image 18 task drawer anatomy for default size plus Image 23 compact list/detail containment, including source/open label-title-status header order, body/footer containment, activity/comment density, completed/sensitive/loading/blocked/closed states, optional history/comments order, and real close/action/checklist callbacks |
| `control.crm-case-drawer.*` / `layout.crm-case-drawer.*` / `color.crm-case-drawer.*` | panel `403x1074`; shell top `0px`; shell height `viewport`; shell layer `50`; padding `22px 20px 83px 23px`; radius `12px 0 0 12px`; title `19/25/600`; chip `22px`; header rows `50px auto auto`; header top padding `24px`; fact columns `22px 152px minmax(0, 1fr)`; fact row `34px`; card radius `9px`; option row `39px`; footer columns `repeat(3, 1fr)`; action `40px`; origin action `45px` | Exact Image 22 operational case drawer, including source/open plus resolved/loading/blocked/closed states and real close/origin/assume/delegate/task/approval/resolve/status callbacks |
| `control.crm-student-drawer.*` / `layout.crm-student-drawer.*` / `color.crm-student-drawer.*` | panel `316x927`; padding `19px 8px 13px`; radius `12px 0 0 12px`; avatar `58px`; header `64px`; title `16/21/600`; fact columns `28px 122px minmax(0, 1fr)`; fact row `31px`; chip `22px`; presence ring `40px`; footer columns `repeat(2, minmax(0, 1fr))`; secondary action `40px`; primary action `44px` | Exact Image 27 student drawer anatomy, including source/open plus risk/sensitive/loading/blocked/closed states and real close/profile/message/task/note/update callbacks |
| `control.crm-class-drawer.*` / `layout.crm-class-drawer.*` / `color.crm-class-drawer.*` | panel `414x926`; padding `21px 16px 39px`; radius `12px 0 0 12px`; title `21/26/600`; composes official `Roster`; copilot `62px`; footer columns `1.28fr 1fr 1fr`; actions `40px` | Exact Image 29 attendance drawer anatomy, including source/calling plus saved/loading/blocked/closed states and real close/save/note/task/correct/student-status callbacks |
| `control.crm-roster.*` / `layout.crm-roster.*` / `color.crm-roster.*` | roster `375x368`; columns `52px minmax(0, 1fr) 122px 31px`; expected variant `515px`; row `73.2px`; padding `0 10px 0 7px`; radius `12px`; avatar `40px`; title `12/16/600`; helper `12/15`; chip `24px`; action `30px`; icon `14px` | Exact Image 29 reusable attendance roster component, including source attendance, expected-list variant, disabled state, legacy absent/corrected aliases and real per-student status callbacks; `ClassDrawer` composes this component |
| `control.crm-payment-drawer.*` / `layout.crm-payment-drawer.*` / `color.crm-payment-drawer.*` | panel `371x941`; padding `31px 20px 19px`; radius `10px 0 0 10px`; title `20/25/600`; fact columns `27px 143px minmax(0, 1fr)`; fact row `27px`; chip `23px`; history row `28px`; copilot `70px`; action columns `repeat(2, minmax(0, 1fr))`; primary action `39px`; secondary actions `37px`; student action `35px` | Exact Image 32 payment drawer anatomy, including source/overdue plus promise/paid/failed/loading/blocked/closed states and real close/reminder/charge/promise/paid/task/student callbacks |
| `control.crm-replacement-drawer.*` / `layout.crm-replacement-drawer.*` / `color.crm-replacement-drawer.*` | panel `376x950`; padding `18px 14px 14px 18px`; radius `12px`; title `19/25/600`; title offset `28px`; fact row `34px`; credit fact row `45px`; option row `60px`; suggestion `46px`; action columns `repeat(2, minmax(0, 1fr))`; primary action `41px`; secondary/cancel actions `37px`; footer gap `5px`; action grid gap `7px 8px` | Image 31 replacement fit drawer official tokenization, including requested/source plus scheduled/blocked/loading/closed states and real close/reserve/invite/task/conversation/original/cancel/option callbacks. Source-viewport evidence confirms these tokens resolve the previous auto-width drawer bug; integrated floating-page evidence requires the title to sit below the selected chip, the footer to stay inside the drawer padding, the credit/helper fact to use the source two-line rhythm, and the full page remains visual-review until table/drawer composition parity is approved. |
| `control.crm-lead-drawer.*` / `layout.crm-lead-drawer.*` / `color.crm-lead-drawer.*` | panel `340x942`; padding `24px 10px 11px`; radius `12px 0 0 12px`; title `22/27/600`; chip `21px`; close `35px`; fact columns `24px 112px minmax(0, 1fr)`; fact row `25px`; history row `38px`; copilot `92px`; notice `54px`; action columns `repeat(2, minmax(0, 1fr))`; primary action `39px`; secondary actions `37px`; action font `9px`; footer gap `7px`; action grid gap `9px` | Exact Image 38 interested-person sales drawer anatomy, including source/interested plus trial/enrollment/lost/loading/blocked/closed states and real close/conversation/trial/follow-up/stage/enrollment/lost/more callbacks |
| `control.crm-agent-flow-drawer.*` / `layout.crm-agent-flow-drawer.*` / `color.crm-agent-flow-drawer.*` | panel `399x780`; padding `24px 16px 18px`; radius `14px`; header `70px`; mark `44px`; title `16/21/650`; role `13/18`; callout min `125px`, padding `18px 20px 18px 52px`, radius `9px`, icon `21px`, text `14/23/400`; question button `51px`, radius `26px`, gap `20px`; composer `55px`, radius `28px`, padding `5px 5px 5px 20px`; send `45px`; footer `12/16` | Exact Image 56 contextual agent-flow drawer, including source/flow plus test/publish/execution/loading/blocked/closed states and real close/menu/select-question/send-question/schedule-help callbacks |
| `control.crm-usage-drawer.*` / `layout.crm-usage-drawer.*` / `color.crm-usage-drawer.*` | panel `379x852`; padding `31px 22px 50px`; radius `15px`; header `100px`; mark `42px`; title `16/21/650`; role `13/18`; callout min `149px`, padding `20px 22px 18px 58px`, radius `9px`, icon `21px`, text `14/26/400`; question button `56px`, radius `10px`, gap `18px`; composer `70px`, radius `35px`, padding `5px 5px 5px 19px`; send `45px`; footer `13/18`, offset-y `12px` | Exact Image 69 contextual usage support drawer, including ledger/source plus overview/quota/loading/blocked/closed states and real close/menu/select-question/send-question/open-ticket callbacks |
| `control.crm-enrollment-checklist.*` | checklist `292x152`; header `24px`; row `24px`; icon `12px`; text `10px`; line left `6px` | Enrollment checklist anatomy from image 40 |
| `control.crm-risk-row.*` | row `862x62`; avatar `30px`; text `10/13`; chip `22px`; padding `0 13px 0 5px`; explicit columns | Retention risk row anatomy from image 41 |
| `control.crm-retention-panel.*` | drawer heights `860/803/855`; padding `14px 13px 10px`; badge `19px`; avatar `45px`; title `20/24`; text `9/13`; actions `32px` | Retention/cancellation/reactivation/complaint drawer anatomy from images 42, 43 and 44 |
| `control.crm-sensitive-dialog.*` | dialog `166x168`; compact destructive confirmation, icon, title/description and 2-button footer | Sensitive/destructive dialog crop from image 09 |
| `control.crm-support-ticket-panel.*` | drawer `390x759`; padding `14px`; action `32px`; text `11/15` | Support ticket drawer anatomy from image 47 |
| `control.crm-internal-ticket-panel.height` | `760px` | Internal selected ticket drawer height from image 48 |
| `control.crm-tenant-summary-drawer.*` | rail `804px`; header `86px`; close `28px`; body gap `10px`; action `34px`; text `10/14` | Image 49 selected-tenant summary content |
| `control.crm-grant-access-panel.*` | card `340x175`; padding `16px 14px` | Grant access card from image 50 |
| `control.crm-tenant-row.*` | row `955x60`; avatar `30px`; text `10px`; progress `58px`; padding `0 12px` | Selected tenant row anatomy from image 49 |
| `control.crm-internal-shell.*` | content crop `1080x754`; dashboard card height `198px`; card padding `18px` | Internal dashboard content from image 48 |
| `control.crm-internal-overview.*` | filter padding `6px 6px 7px`; bottom row `184px`; header actions `36px`, x-padding `10px`, gap `12px`, text `12px` | Image 48 filter, activity/copilot and command density; final evidence `tmp/image48-internal-route-final-static-20260714/report.json` |
| `control.crm-internal-tenants.*` | filter `66px`; security strip `104px` | Image 49 vertical rhythm; final `tmp/image49-tenant-summary-geometry-final-static-20260714/report.json` |
| `control.crm-tenant-detail-layout.height` | `840px` | Tenant detail composition height from image 50 |
| `control.crm-security-rule-panel.*` | rail `346x838`; padding `21px 14px 20px`; action `38px` | Tenant security rail from image 50 |
| `control.crm-role-card.*` / `layout.crm-role-card.*` / `color.crm-role-card.*` | row `862x69`; padding `0 34px 0 17px`; radius `7px`; avatar `44px`; columns `285px 205px 187px 1fr`; chip `24px`; title `15/18`; label `13/18`; blue selected surface and border | Exact image 51E setup team owner role row, including avatar, role label, E-mail, WhatsApp, status label/chip and owner/admin/staff/loading/blocked density |
| `control.crm-invite-row.*` / `layout.crm-invite-row.*` / `color.crm-invite-row.*` | row `862x46`; padding `0 0 0 7px`; columns `159px 114px 165px 144px 205px 1fr`; avatar `30px`; action buttons `30px` with `9px` gap; text `13/18`; status dot `8px`; warning icon `14px`; source white row, subtle divider and blue/warning/success/danger/disabled status colors | Exact image 51E setup team prepared invite row, including initials avatar, name, role, e-mail, WhatsApp, prepared/incomplete status marks, edit/remove action icons and prepared/accepted/incomplete/expired/loading/blocked density |
| `control.crm-payment-method-row.*` / `layout.crm-payment-method-row.*` / `color.crm-payment-method-row.*` | card `310x88`; padding `0 44px 0 18px`; radius `6px`; selected border `2px`; provider mark `38px` with `17px` text gap and `-4px` Y offset; body `-3px` Y offset; title `16/21`; helper `13/18`; selected check `22px` at top `14px` right `12px`; Pix tile `12px`; source white surface, blue selected border/check, teal Pix, cash green, card blue, failed red and disabled muted colors | Exact image 51K selected Pix payment-method card, including source provider mark, title/helper rhythm, selected check, selected/connected/failed/disabled/loading states and pix/cash/card method density |
| `control.crm-report-filter-bar.*` | bar `795x49`; padding `7px 12px`; gap `8px`; control height `32px` | Report filter bar anatomy from image 45 |
| `control.crm-report-card.*` | card `493x222`; padding `17px 16px 0`; stat row `44px`; CTA `39px`; header icon `20px`; stat icon `30px`; text `11/15` | Reports card anatomy from image 45 |
| `control.crm-opportunity-drawer.*` | drawer `368x817`; padding `15px 15px 16px`; close `34px`; fact icon `14px`; action `34px`; text `11/15` | Opportunity drawer anatomy from image 46 |
| `control.crm-import-progress-panel.*` | panel `646x254`; padding `16px 16px 14px`; main card `188px`; CRM summary slot `84px`; primitive summary card `92px`; text `10/14` | Import progress panel anatomy from image 13 |
| `control.crm-field-mapping-panel.*` | panel `453x263`; padding `15px 18px 13px`; row `25px`; select `22px`; text `10/14` | Field mapping panel anatomy from image 13 |
| `control.crm-duplicate-resolver.*` | panel `502x263`; padding `15px 18px 12px`; record card `145px`; action rail `96px`; text `10/14` | Duplicate resolver panel anatomy from image 13 |
| `control.crm-permission-state-panel.*` | panel `357x211`; padding `13px 11px 11px`; row `27px`; text `10/14` | Permission access panel anatomy from image 12 |
| `control.crm-integration-failed-panel.*` | panel `363x211`; padding `13px 11px 11px`; row `58px`; icon `30px`; text `10/14` | Integration failure panel anatomy from image 12 |
| `control.crm-plan-blocked-state.*` | card `269x344`; padding `25px 17px 29px`; icon `48px`; CTA `45px`; text `14/20` | Plan-blocked add-on card anatomy from image 67 |
| `control.crm-quota-progress.*` | card `890x287`; padding `23px 28px 26px`; radius `14px`; title `18/23/700`; total `43/48`; unit `20/23`; labels `16/19`; progress `560x23`; badge `36px`; icon tile `88px`; actions `43px` | Quota cycle card anatomy from image 68 |
| `control.crm-usage-origin-row.*` | row `380x45`; gap `10px`; radius `8px`; icon tile `38px`; glyph `20px`; text `14/18/400`; value `14/18`; progress `110x7`; progress offset `16px`; progress radius `4px` | Usage-origin row anatomy from image 68 |
| `control.crm-export-action.*` | trigger `115x42`; radius `11px`; padding `0 14px 0 16px`; gap `9px`; icon `18px`; text `14/18/500`; menu radius `10px`; menu padding `6px`; item `34px` high | Reports global export action and optional menu anatomy from image 45 |
| `control.crm-quota-blocked-state.*` | stack `423x437`; panels `220px` and `207px`; padding `25px 24px 18px`; icon `34px`; row `45px`; CTA `39px`; text `14/20` | Quota alert and affected panel anatomy from image 68 |
| `control.crm-domain-row.min-height` | `52px` | Dense P2 domain row/action minimum height |
| `control.crm-browser.*` | traffic `12` gap `9`; toolbar gap `24`; toolbar button `18x20`; address `196x28`, padding `12`, gap `8`, font `11` | browser chrome anatomy from image 79 |
| `control.crm-shell-brand.*` | width `132`, height `35` | logo footprint in image 79 shell sidebar |
| `control.logo.width.*` | default `132`, compact `104`, mark `36` | TaliyaLogo primitive sizes |
| `control.avatar.*` | xs `24`, sm `32`, md `40`, lg `56`, xl `72`, status `11`, status border `2`, badge offset `-4`, stack overlap `-8`, add icon `16` | Avatar and AvatarStack |
| `control.badge.*` / `control.status-dot.size` / `control.chip.icon.size` | badge height `22`, count `18`, dot `10`, status dot `7`, chip icon `13` | Badge, Chip, StatusDot |
| `control.nav-pill.*` | padding `4`, active padding `12`, active min width `86` | NavPill exact topbar/navigation anatomy |
| `control.menu.*` | item height `36`, icon `14`, tooltip min width `160` | DropdownMenu/ActionMenu |
| `control.feedback.*` | gap `12`, icon `18`, body gap `0` | shared compact feedback row anatomy |
| `control.toast.*` | max width `420`, min width `320`, min height `46`, padding `16x10` | Toast row extracted from board 09 |
| `control.inline-alert.*` | min height `46`, padding `16x10` | InlineAlert band extracted from board 09 |
| `control.filter-bar.*` | search basis `260`, field basis `190` | FilterBar layout rhythm |
| `control.crm-task-filter-bar.*` | height `65`, control `38`, padding `11x12`, radius `10/13`, gaps `16/10`, type `12` | Image 23 task filter bar source anatomy |
| `control.crm-task-queue-list.*` | padding `20x10`, radius `10`, title `14/20`, row `40/48`, icon `14`, label `11/15`, count `10/14` | Image 23 task queue sidebar source anatomy |
| `control.field.*` | sm `36`, md `42`, lg `52`, padding-x `12`, icon `16`, textarea min height `104`, textarea padding `12` | Input/Select/Textarea |
| `control.password-toggle.top` | `29` | PasswordInput toggle alignment |
| `control.select.*` | side offset `6`, viewport padding `4`, item icon `14` | Select trigger/listbox anatomy |
| `control.checkbox.*` | size `18`, gap `10`, content gap `2`, check `4x8`, indeterminate `10x2` | Checkbox anatomy |
| `control.toggle.*` | gap `8`, track `40x22`, padding `2`, thumb `16`, offset `18`, compact track `36x20`, compact thumb `14`, compact offset `14` | Toggle/Switch anatomy |
| `control.segmented.*` | padding `4`, item height `34`, item padding-x `24`; shell variant gap `16`, padding `4`, item height `42`, item padding-x `22`, transparent container surface | SegmentedControl, including source-backed product-shell top navigation density and surface treatment |
| `control.search.*` | gap `10`, filter size `42` | SearchInput |
| `control.message.*` | max width `344`, gap `8`, padding `12x14` | MessageBubble |
| `control.composer.*` | gap `10`, field min height `44`, field padding `13x16`, textarea height `20`, toggle min width `128` | ComposerInput |
| `control.calendar.*` | cell min height `78`, cell gap `5`, day `30`, event dot `5`, event `70`, compact event `52`, padding `9x10` / `7x8` | CalendarCell and CalendarEventBlock |
| `control.card.*` | padding `16`, compact padding `12`, summary min height `132`, mini `74`, quota `118`, flow `126` | Card patterns |
| `control.inline.*` / `control.list-icon.*` | inline gap `10`, compact gap `6`, list icon `28`, list icon glyph `15` | InlineGroup, PersonLabel, ListIcon |
| `control.table.*` | min width `760`, header `48`, dense header `42`, padding `14x16`, dense padding `10x14`, pagination gap `14`, page `30`, page-size gap `8` | DataTable and TablePagination |
| `control.list.*` | row `68`, row padding `12x12`, dense row `54`, dense padding `8x14`, selected marker `3`, unread dot `7`, content gap `2` | List/ListItem |
| `control.state.*` / `control.skeleton.*` | state min height `148`, padding `24`, gap `12`, icon `52`, skeleton gap `9`, bar `9`, icon `28`, table bar `8`, panel block `42` | EmptyState, LoadingState, ErrorState |
| `control.drawer.*` | widths `360/420/520`, title `18/24`, header padding `24x20`, body padding `24x20`, body gap `16`, footer padding `24x20`, footer gap `12`, section gaps `12/8`, section subtle padding `12`, divided padding-top `16` | Drawer and slots |
| `control.modal.*` | widths `184/216/560`, icon `44`, padding `16`, gap `12`, header gap `4`, body gap `8`, footer gap `8`, close offset `12` | Modal/ConfirmDialog |
| `control.popover.*` | widths `116/168/380`, padding `12`, gap `8`, body gap `8`, footer gap `8`, side offset `10` | Popover |
| `control.tooltip.*` | max widths `220/260`, padding `12x8`, gap `8`, side offset `8`, arrow `12x7` | Tooltip |
| `control.progress.*` | gap `10`, track `6`, bar min `8`, value padding `3x7`, indeterminate width `38%` | ProgressBar |
| `control.flow-node.*` | width `168`, min height `132`, padding `16`, gap `10`, port offset `-5` | FlowNode |
| `control.tabs.*` | tab `40`, compact tab `32`, indicator `2` | Primitive Tabs baseline; CRM wrappers such as `ProfileTabs` may add source-specific layout tokens while preserving primitive behavior |
| `control.timeline.*` | column `30`, row `58`, compact row `44`, line left/top/bottom/width `14/26/-2/1`, mark `24`, halo `6`, content gap/padding `3/14` | Timeline |

## Connector Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `connector.width` | `2px` | journey/flow lines |
| `connector.length` | `76px` | default connector primitive width |
| `connector.height` | `28px` | default connector primitive height |
| `connector.blue` | `raw.blue.500` | happy path/info branch |
| `connector.red` | `raw.red.500` | exception/danger branch |
| `connector.gray` | `rgba(16, 20, 26, 0.24)` | inactive/future branch |
| `connector.dotted` | `rgba(16, 20, 26, 0.30)` | pending/optional branch |
| `connector.node.size` | `8px` | connection endpoints |
| `connector.node.top` | `10px` | endpoint vertical position |
| `connector.curve.radius` | `12px` | rounded connectors |
| `connector.line.center-y` | `13px` | baseline y for straight/dashed lines |
| `connector.line.end-inset` | `8px` | line inset before arrow |
| `connector.arrow.*` | size `7`, top `9`, right `1` | arrowhead anatomy |
| `connector.elbow.*` | height `22`, top `3` | elbow connector anatomy |
| `connector.curved.start-x` | `6px` | curved connector start |
| `connector.start-node.*` | x `4`, y `14`, radius `3`, cutoff `4`, line left `10` | start node anatomy |

## Chart Tokens

Chart tokens are required by image 15 and later reports.

| Token | Value | Usage |
| --- | --- | --- |
| `chart.blue` | `raw.blue.500` | primary series |
| `chart.green` | `raw.green.500` | positive/success series |
| `chart.red` | `raw.red.500` | negative/failure series |
| `chart.orange` | `raw.orange.500` | warning series |
| `chart.purple` | `raw.purple.500` | secondary series |
| `chart.grid` | `rgba(16, 20, 26, 0.08)` | grid lines |
| `chart.axis` | `rgba(16, 20, 26, 0.42)` | axis labels |
| `chart.heatmap.1` | `rgba(94, 142, 232, 0.16)` | low heat |
| `chart.heatmap.2` | `rgba(94, 142, 232, 0.28)` | medium heat |
| `chart.heatmap.3` | `rgba(94, 142, 232, 0.44)` | high heat |
| `chart.heatmap.4` | `rgba(94, 142, 232, 0.62)` | highest heat |
| `chart.panel.*` | min height `190`, padding `16`, gap `14`, header gap `12`, header text gap `3` | chart container anatomy |
| `chart.line.*` | height `120`, grid stroke `1`, series stroke `3` | line chart anatomy |
| `chart.bar.*` | gap `8`, group height `122`, min height `18`, radius `4`, min column `14` | bar chart anatomy |
| `chart.funnel.*` | gap `8`, item height `28`, item padding-x `10` | funnel anatomy |
| `chart.ranking.*` | gap `9`, columns `72px minmax(0, 1fr) 34px`, bar height `3` | ranking chart anatomy |
| `chart.heatmap.*` | gap `5`, cell size `18`, cell radius `4` | heatmap anatomy |
| `chart.state.min-height` | `120px` | loading/empty area inside charts |

## Motion Tokens

| Token | Value | Usage |
| --- | ---: | --- |
| `motion.duration.fast` | 120ms | hover/press |
| `motion.duration.base` | 180ms | selected/expanded state |
| `motion.duration.slow` | 260ms | drawer/modal entrance |
| `motion.offset.popover-y` | -4px | menu/popover entrance offset |
| `motion.offset.tooltip-y` | 4px | tooltip legacy hover offset |
| `motion.offset.modal-y` | 8px | modal entrance offset |
| `motion.offset.drawer-x` | 24px | drawer entrance offset |
| `motion.ease.standard` | `cubic-bezier(0.2, 0, 0, 1)` | default |
| `motion.ease.out` | `cubic-bezier(0.16, 1, 0.3, 1)` | overlay entrance |

Reduced motion must zero out non-essential transitions and remove shimmer animations.

## Focus Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `focus.ring.color` | `rgba(16, 20, 26, 0.84)` | neutral controls |
| `focus.ring.info` | `rgba(94, 142, 232, 0.72)` | blue-accent controls |
| `focus.ring.danger` | `rgba(239, 68, 68, 0.72)` | destructive controls |
| `focus.ring.width` | `2px` | focus ring |
| `focus.ring.offset` | `2px` | focus offset |
| `focus.ring.shadow` | `0 0 0 3px rgba(94, 142, 232, 0.24)` | visible Storybook/demo focus halo |
| `focus.field.shadow` | `0 0 0 1px rgba(16, 20, 26, 0.86)` | field/select/checkbox/toggle focus inset |

## Storybook Token Requirements

`Foundations / Tokens` must eventually show:

- raw palette;
- semantic text/accent colors;
- surfaces;
- borders;
- status states;
- typography roles;
- spacing/radius/elevation;
- control density;
- primitive anatomy groups for forms, actions, navigation, status, overlays, data, communication, calendar, states, flow, charts and timeline;
- table/list density;
- overlay dimensions;
- connector tokens;
- chart palette;
- focus rings;
- disabled states;
- motion/reduced motion notes.

## Batch Token Gate

For every future batch, the required order is:

1. inspect the approved source image;
2. extract the primitive/component visual contract;
3. map each visual value to an existing token or add a new token;
4. update `Foundations / Tokens` and this spec if a token is added;
5. implement the primitive/component using only those tokens for reusable visual decisions.

No Storybook story or component can be accepted as 100% if it depends on hidden CSS numbers for reusable visual anatomy.

## Migration Notes From v0

| v0 Token | v1 Decision |
| --- | --- |
| `color.gray.100 = #E4E4E4` | keep as `raw.gray.100 = #E4E4E4`; add `raw.gray.110 = #E4E6EA` for later-board cooler gray |
| `surface.page` | rename semantic usage to `surface.app` |
| `surface.panel/card/button` | split into `surface.canvas`, `surface.panel`, `surface.panel-strong`, `surface.card`, `surface.control` |
| `shadow.1/2/3` | rename by usage: `shadow.card`, `shadow.panel`, `shadow.overlay`, `shadow.window` |
| `iconButton.*` | move into generic `control` and `icon` density tokens; component-level aliases may reference them |
| missing focus tokens | add explicit focus ring tokens |
| missing connector/chart tokens | add required groups for images 07, 15 |
| missing table/list/form density | add density tokens before implementing table/list/form primitives |

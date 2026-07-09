# @taliya/crm

Padroes e componentes compostos do SaaS/CRM Taliya.

Inclui:

- CrmProductShell;
- CrmShellSidebar;
- CrmShellTopNav;
- CrmShellGlobalActions;
- PageHeader;
- PageFilterBar;
- PageQuickFilters;
- ListDetailLayout;
- WorkListDetailPage;
- CrmPageFamilyShell;
- CrmWorklistPage;
- CrmKanbanPage;
- CrmDashboardPage;
- CrmThreePanePage;
- CrmRightPanelPage;
- CrmWorklistTable;
- CrmDrawer;
- AgentPanel;
- SetupStepper;
- MetricCard;
- InternalOverviewDashboard;
- KanbanBoard;
- KanbanColumn;
- KanbanCard;
- CrmOperationalPanel;
- CrmOperationalRows;
- CrmOperationalRow;
- standardPageKitManifest;
- LeadTable (compatibilidade/migracao; prefira CrmWorklistTable em novas paginas);
- TaskTable (compatibilidade/migracao; prefira CrmWorklistTable em novas paginas);
- ChecklistTable;
- ChecklistDrawer;
- ApprovalTable;
- StudentTable;
- ReplacementTable;
- CrmRecordDrawer;
- FinancePriorityPanel;
- DashboardGrid com `columns={2|3|4|"asymmetrical"|"today"}` e `density="compact"`;
- WeeklyCalendar;
- DataTable;
- UsageLedgerTable;
- ApprovalPanel;
- ExecutionReceipt.

Aliases historicos ainda exportados por compatibilidade:

- `Sidebar` -> prefira `CrmShellSidebar` ou `CrmProductShell`;
- `Topbar` -> prefira `CrmShellTopNav` ou `CrmProductShell`;
- `GlobalActions` -> prefira `CrmShellGlobalActions`;
- `TaskQueueList` -> prefira `PageQuickFilters`.

Especializacoes CRM nao duplicam primitives: `PageFilterBar` compoe o contrato visual de pagina sobre os primitives de filtro/busca, `CrmWorklistTable` compoe a anatomia oficial de tabelas/listas da familia worklist sobre `DataTable` e `TablePagination`, `CrmDrawer` compoe a anatomia oficial de drawer sobre os primitives de overlay/drawer, e `MetricCard`/`StatusCard` sao composicoes de produto sobre primitives de superficie/status.

Este pacote pode depender de `@taliya/tokens` e `@taliya/ui`.

`react` e `react-dom` sao peer dependencies do consumidor. Nao instale uma segunda copia de React dentro deste pacote.

Importe o CSS depois de tokens e primitives:

```ts
import "@taliya/tokens/tokens.css";
import "@taliya/ui/styles.css";
import "@taliya/crm/styles.css";
```

Para descobrir o kit oficial de componentes reutilizaveis em consumidores:

```ts
import { standardPageKitManifest } from "@taliya/crm";
```

Consumidores que querem carregar apenas o contrato do kit oficial tambem podem usar o subpath publico:

```ts
import { standardPageKitManifest } from "@taliya/crm/standard-page-kit";
```

`CrmProductShell` aceita `drawerPlacement="fixed" | "content" | "floating"` para manter o posicionamento do drawer oficial dentro da biblioteca. Use `fixed` para drawers operacionais de altura total, `content` quando a tela fonte pede o drawer alinhado ao canvas/conteudo, e `floating` quando o drawer deve flutuar abaixo da topbar com margem interna. Use `drawerSize="default" | "compact"` para reservar a largura oficial do rail; o tamanho compacto atende drawers de checklist derivados da imagem fonte sem CSS local no consumidor.

Para paginas fonte que precisam de mais respiro entre titulo e canvas, `CrmProductShell` tambem aceita `pageHeaderRhythm="default" | "spacious" | "dashboard" | "stacked" | "overview"`. Use `dashboard` para dashboards densos acima da dobra, `stacked` para paginas de lista com titulo/subtitulo empilhados, e `overview` para visoes gerais compactas com filtros sem busca. O padrao permanece compacto para nao alterar telas ja certificadas.

Para paginas com drawer externo que precisam priorizar a largura util do conteudo principal, use `contentLayout="main-priority"`. Esse modo reduz o inset esquerdo do canvas via tokens oficiais sem alterar o layout padrao das demais paginas. Para paginas kanban de acompanhamento operacional, use `contentLayout="kanban"` para alinhar o canvas ao ritmo fonte de Operacao sem reutilizar o modo de tabelas com drawer.

`PageQuickFilters` aceita `selectionTone="strong" | "soft"`. O padrao `strong` preserva a selecao escura de Operacao/Kanban; `soft` aplica a selecao azul clara oficial para paginas de lista como Checklists, sem CSS local no consumidor.

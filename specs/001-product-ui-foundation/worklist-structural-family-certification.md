# Worklist Structural Family Certification

Date: 2026-07-09

Purpose: certify the `Tabela / Worklist` structural family at 99% / 1:1 visual parity before moving to another structural family.

Canonical reference:

- Structural and visual baseline: `23_round-4.1C_tarefas_01_lista-detalhe.png.png`
- Source directory: `D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508`
- Current static evidence: `tmp/visual-worklist-structural-family-20260709-consolidated`
- Capture base URL: `http://127.0.0.1:6204/iframe.html`

## Family Scope

This family covers pages with:

- logged-in `CrmProductShell`;
- `PageFilterBar`;
- left `PageQuickFilters`;
- `WorkListDetailPage`;
- table/worklist area;
- optional right detail drawer;
- optional after-slot panel when the source uses a post-list panel in the same structure.

Image66 Billing faturas and Image69 Uso extrato are intentionally out of this family. They belong to `Ledger table / right assistant rail` because their source anatomy is an embedded ledger/history panel plus assistant rail, not a quick-filter worklist with a global drawer.

## Current Evidence Matrix

| Page | Storybook id | Source image | Viewport | Layout mode | Official family components | Body overflow | Raw visual-risk count | Current certification status | Next visual action |
| --- | --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| Image23 Tarefas detalhe | `crm-image-coverage-tarefas--image-23-lista-detalhe` | `23_round-4.1C_tarefas_01_lista-detalhe.png.png` | `1448x1086` | `standard` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable` | `0 / 0` | 9 | Em ajuste | Keep as reference; triage table wrapper/browser-frame false positives only after higher-risk pages. |
| Image23 Tarefas sem drawer | `crm-image-coverage-tarefas--image-23-lista-sem-drawer` | `23_round-4.1C_tarefas_01_lista-detalhe.png.png` | `1448x1086` | `standard` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable` | `0 / 0` | 9 | Em ajuste | Keep as no-drawer regression guard for table width and filter-bar span. |
| Image24 Checklists | `crm-image-coverage-checklists--image-24-lista-execucao-detalhe` | `24_round-4.1C_checklists_01_lista-execucao-detalhe.png.png` | `1491x1055` | `main-priority` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `ChecklistTable` | `0 / 0` | 7 | Em ajuste | Lower risk after shell overflow cleanup; later verify checklist drawer density and wrapper choice. |
| Image25 Aprovacoes | `crm-image-coverage-aprovacoes--image-25-lista-decisao-detalhe` | `25_round-4.1C_aprovacoes_01_lista-decisao-detalhe.png.png` | `1448x1086` | `main-priority` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `ApprovalTable` | `0 / 0` | 11 | Em ajuste | Later verify decision drawer/table grammar against source. |
| Image27 Alunos | `crm-image-coverage-alunos--image-27-lista-perfil-resumido` | `27_round-4.1E_alunos_01_lista-perfil-resumido.png.png` | `1448x1086` | `main-priority` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `StudentTable` | `0 / 0` | 8 | Em ajuste | Later verify profile summary drawer and student table content rhythm. |
| Image31 Reposicoes | `crm-image-coverage-reposições--image-31-fluxo-encaixe` | `31_round-4.1F_reposicoes_01_fluxo-encaixe.png.png` | `1448x1086` | `main-priority` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `ReplacementTable` | `0 / 0` | 9 | Em ajuste | Later verify replacement flow drawer/action density. |
| Image34 Financeiro movimentacoes | `crm-image-coverage-financeiro--image-34-movimentacoes-filtros-drawer` | `34_round-4.1F_financeiro_04_movimentacoes-filtros-drawer.png.png` | `1448x1086` | `wide-main` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, `PaymentDrawer` | `0 / 0` | 15 | Em ajuste | Human triage of dense table internal overflows, filter/title vertical rhythm, and drawer geometry/content. |
| Image35 Turmas | `crm-image-coverage-agenda--image-35-turmas-lista-detalhe` | `35_round-4.1F_turmas_01_lista-detalhe.png.png` | `1448x1086` | `standard` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, `ClassDrawer` | `0 / 0` | 15 | Em ajuste | Human triage of class drawer micro-overflow and compact table chip/text overflow. |
| Image38 Vendas interessados | `crm-image-coverage-vendas--image-38-lista-interessados` | `38_round-4.1G_vendas_02_lista-interessados.png.png` | `1448x1086` | `compact-rail` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable` | `0 / 0` | 10 | Aceito estruturalmente, pendente 1:1 fino | Vendas baseline now uses the official compact rail geometry: filter `x=83 w=999`, quick filters `w=166`, table `x=257 w=825`, drawer `x=1110 w=324`; no body overflow or measured element overflow in the focused metrics. |
| Image39 Vendas experimental | `crm-image-coverage-vendas--image-39-experimental-lista` | `39_round-4.1G_experimental_01_lista-acompanhamento.png.png` | `1448x1086` | `compact-rail` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable` | `0 / 0` | 13 | Aceito estruturalmente, pendente 1:1 fino | Shares the official compact rail geometry with Image38/Image40; focused metrics show no body overflow and no measured element overflow. Keep for final human visual pass on dense cell/chip grammar. |
| Image40 Vendas matriculas | `crm-image-coverage-vendas--image-40-matriculas-checklist-conversao` | `40_round-4.1G_matriculas_01_checklist-conversao.png.png` | `1448x1086` | `compact-rail` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable` | `0 / 0` | 17 | Aceito estruturalmente, pendente 1:1 fino | Source-text/status-column pass plus compact rail geometry now match the source composition much more closely: filter `x=83 w=999`, quick filters `w=166`, table `x=257 w=825`, drawer `x=1110 w=324`. Focused metrics show no body overflow and no measured element overflow; remaining risk is human visual polish of drawer/table micro-rhythm, not gross layout. |
| Image41 Retencao riscos | `crm-image-coverage-retencao--image-41-retencao-riscos` | `41_round-4.1H_retencao_01_riscos-lista-drawer.png.png` | `1672x941` | `wide-rail` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable` | `0 / 0` | 14 | Em ajuste | Later consolidated Retencao visual pass; check CaseDrawer density and table rhythm. |
| Image42 Retencao cancelamentos | `crm-image-coverage-retencao--image-42-cancelamentos-fila` | `42_round-4.1H_cancelamentos_01_fila-salvamento-drawer.png.png` | `1672x941` | `wide-rail` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable` | `0 / 0` | 14 | Em ajuste | Later consolidated Retencao visual pass; verify case drawer body fit and history grammar. |
| Image43 Retencao reativacoes | `crm-image-coverage-retencao--image-43-reativacoes-ex-alunos` | `43_round-4.1H_reativacoes_01_ex-alunos-retorno.png.png` | `1659x948` | `wide-rail` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable` | `0 / 0` | 13 | Em ajuste | Later consolidated Retencao visual pass; verify no-drawer/wide-rail rhythm. |
| Image44 Retencao reclamacoes | `crm-image-coverage-retencao--image-44-reclamacoes-caso-sensivel` | `44_round-4.1H_reclamacoes_01_fila-caso-sensivel-drawer.png.png` | `1672x941` | `wide-rail` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable` | `0 / 0` | 10 | Em ajuste | Later verify `CaseDrawer.sections` density versus source after clipping fix. |
| Image49 Internal tenants | `crm-image-coverage-internal--image-49-internal-tenants-lista-detalhe` | `49_round-4.1K_internal_02_tenants-lista-detalhe.png` | `1672x941` | `main-priority` | `CrmProductShell`, `WorkListDetailPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, `TenantSecurityDrawer` | `0 / 0` | 15 | Em ajuste | Human triage of internal drawer/header/content grammar and residual cell overflows. |

## Component-Level Gate For The Active Family

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `CrmProductShell` in Worklist pages | Pass | Pass | Pass | Pass | Pass | Partial | Partial | Em ajuste |
| `PageFilterBar` | Pass | Pass | Pass | Pass | Pass | Pass | Partial | Em ajuste |
| `PageQuickFilters` | Pass | Pass | Pass | Pass | Pass | Pass | Partial | Em ajuste |
| `WorkListDetailPage` | Pass | Pass | Pass | Pass | Pass | Pass | Partial | Em ajuste |
| `CrmWorklistTable` | Pass | Pass, including `CompactRows` | Pass | Pass | Pass | Pass | Partial | Em ajuste |
| Domain table wrappers (`ChecklistTable`, `ApprovalTable`, `StudentTable`, `ReplacementTable`) | Partial | Pass | Partial | Partial | Pass | Partial | Partial | Em ajuste |
| Domain drawers (`TaskDrawer`, `PaymentDrawer`, `ClassDrawer`, `CaseDrawer`, `TenantSecurityDrawer`) | Partial | Partial | Pass | Partial | Pass | Partial | Partial | Em ajuste |

The family is not approved. Passing tests, Storybook build, and zero body overflow are necessary evidence, but not enough for 99% / 1:1 certification while any row above remains `Partial`.

## Next P1 Decision

The current Worklist P1 is no longer the Vendas geometry. The accepted compact-rail pass converted Images38-40 to an official reusable `contentLayout="work-list-compact"` plus `worklistLayoutMode="compact-rail"` configuration and introduced the supporting tokens for compact rail width, compact Worklist shell padding, and compact drawer width.

Next action inside the same family: run a human visual triage on the remaining non-Vendas P1s that still have documented micro/content mismatches: Image34 Financeiro dense table/drawer rhythm, Image35 Turmas class drawer/table micro-overflows, Image49 Internal tenants drawer/header/content grammar, and then consolidate the final Worklist pass/fail matrix.

Do not move to `Kanban workspace` until the Worklist family is either visually certified at 99% or each remaining exception is explicitly accepted with source-linked notes.

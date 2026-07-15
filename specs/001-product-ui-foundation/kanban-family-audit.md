# Kanban Family Audit

Date: 2026-07-15

Status: pass

This audit protects the official Kanban page family used by Operacao, Vendas, and Financeiro image coverage. It checks for `CrmKanbanPage`, official filter bars, official columns/cards, domain card variants, activity/drawer slots where applicable, and rejects story-local generic board anatomy.

It does **not** certify 1:1 visual approval.

## Summary

- Checked rows: 3
- Failed rows: 0

## Rows

| Page | Source file | Family | Status | Missing snippets | Forbidden legacy snippets |
| --- | --- | --- | --- | --- | --- |
| OperationShell | apps/docs/src/stories/ImageCoverageOperation.stories.tsx | operation-kanban | pass | None | None |
| SalesPipelinePage | apps/docs/src/stories/ImageCoverageSales.stories.tsx | sales-kanban | pass | None | None |
| FinanceKanbanPage | apps/docs/src/stories/ImageCoverageFinance.stories.tsx | finance-kanban | pass | None | None |

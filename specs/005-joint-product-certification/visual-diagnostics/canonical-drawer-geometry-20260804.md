# Canonical Drawer Geometry

Date: 2026-08-04

Preview: `http://127.0.0.1:6219`

Build: static Storybook rebuilt successfully after the canonical drawer migration.

## Desktop Browser Evidence

Viewport content area: `1265x720` where a vertical scrollbar was present, otherwise `1280x720`.

The following stories produced the same measured drawer geometry:

| Story | Drawer | Geometry | Shell reserve | Overflow X |
| --- | --- | --- | --- | --- |
| Hoje / Image 18 | TaskDrawer | `y=0`, `height=720`, `width=420`, fixed right | `420px` | `0` |
| Alunos / Image 27 | StudentDrawer | `y=0`, `height=720`, `width=420`, fixed right | `420px` | `0` |
| Checklists / Image 24 | ChecklistDrawer | `y=0`, `height=720`, `width=420`, fixed right | `420px` | `0` |
| Operacao / Image 22 | CaseDrawer | `y=0`, `height=720`, `width=420`, fixed right | `420px` | `0` |
| Retencao / Image 41 | CaseDrawer | `y=0`, `height=720`, `width=420`, fixed right | `420px` | `0` |
| Internal / Image 48 | SupportTicketDrawer | `y=0`, `height=720`, `width=420`, fixed right | `420px` | `0` |
| Internal / Image 49 | TenantSummaryDrawer | `y=0`, `height=720`, `width=420`, fixed right | `420px` | `0` |
| Suporte / central | SupportTicketDrawer | `y=0`, `height=720`, `width=420`, fixed right | `420px` | `0` |

## Mobile Browser Evidence

Viewport: `390x844`.

`TaskDrawer`, `StudentDrawer`, and `SupportTicketDrawer` each measured `x=0`, `y=0`, `width=390`, `height=844`, `right=390`, `bottom=844`, with no horizontal document overflow.

## Browser Health

No browser console errors were recorded during the final validation.

## Decision

Pass for canonical outer geometry. Inner content, actions, lifecycle states, accessibility, and route-purpose certification remain independent review dimensions.

## Post-Consolidation Static Verification

After historical root width/height declarations were removed from domain
wrappers, Storybook was rebuilt and port `6218` was switched to the new static
artifact. At `1280x720`, Alunos 27, Hoje 18, Suporte 47, and Internal 49 each
measured `y=0`, `width=420`, `height=720`, fixed right, `420px` main reserve,
and zero horizontal overflow. Each drawer ended at the document client edge.

The support and Internal samples cover wrappers that previously owned
independent geometry; Hoje and Alunos cover the standard task and student
families. The shell-visible result remained unchanged while latent domain
geometry was removed.

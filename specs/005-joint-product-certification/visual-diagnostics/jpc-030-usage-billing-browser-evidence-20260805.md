# JPC-030 Browser Evidence

Date: 2026-08-05

The rebuilt static Storybook artifact at `apps/docs/storybook-static` was opened
in the in-app browser at 1280x720. The five affected Usage and Billing routes
all rendered their domain support drawer through the canonical shell drawer
slot.

| Route | Heading | Geometry | Close | Reopen | Runtime logs |
| --- | --- | --- | --- | --- | --- |
| Usage overview | Uso e cotas | fixed, top 0, bottom 0, right 0, 720x420 | pass | pass | none |
| Usage ledger | Extrato de uso | fixed, top 0, bottom 0, right 0, 720x420 | pass | pass | none |
| Billing subscription | Assinatura Taliya | fixed, top 0, bottom 0, right 0, 720x420 | pass | pass | none |
| Billing invoices | Faturas Taliya | fixed, top 0, bottom 0, right 0, 720x420 | pass | pass | none |
| Billing add-ons | Add-ons Taliya | fixed, top 0, bottom 0, right 0, 720x420 | pass | pass | none |

The close control is `Fechar suporte`; after unmount, the page exposes
`Abrir suporte`, and reopening restores the same fixed full-height geometry.
The existing drawer lifecycle audit also passes all 33 governed rows with zero
forbidden geometry variants.

# Image 60 settings hub diagnostic - 2026-07-13

Source: `60_round-4.1M_configuracoes_01_hub-8-cards-aprovado.png`

Story: `crm-image-coverage-configuracoes--image-60-configuracoes-hub`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous aggregate capture delta: `9.24`; different pixels: `5.03%`.
- Page-family ownership was already correct: `CrmDashboardPage columns={4}` composed eight official `SettingsHubCard` instances.
- Product content was incorrect because every instance used the default Studio title, sliders icon and description; only status states varied.
- The source requires Studio, Equipe, Permissões, Canais, Planos e modelos, Pagamentos e financeiro, Agenda and Notificações with distinct descriptions, icons and states.

## Accepted reusable changes

- Kept `CrmDashboardPage` and `SettingsHubCard`; no empty workspace wrapper was introduced.
- Converted the story to a prepared eight-item domain-data collection and mapped it into official cards.
- Connected every card to an open callback through `SettingsHubCard.onOpen`.
- Added the missing `shoppingCart` glyph to the public `@taliya/ui` icon registry.
- Added `shoppingCart` to the isolated `Primitives / UI / Icon` story and primitive behavior test.
- Added an official breadcrumb and stacked page-header rhythm through shell props.
- Added no story-local anatomy or CSS.
- Hardened dashboard-family and remaining-page audits so regressions to repeated default cards fail.

## Evidence progression

- Final canonical-data capture: delta `9.181830257946093`; different pixels: `5.149896526651378%`.
- Final capture is source-sized, nonblank and passed runtime inspection.
- All eight source-required cards, state labels, distinct icons and action buttons are visible in the first viewport.

## Verdict

**Fail 1:1 at page level.** Official ownership, card contracts, domain content and callback behavior are correct. `SettingsHubCard` remains component-certified from its existing isolated source evidence. Remaining page-level differences are browser/shell chrome, the selected top-nav fallback, header vertical offset, constrained grid width and gaps, typography and antialiasing. Refine only official shell, header, dashboard grid and tokens; do not add story CSS or duplicate the card anatomy.

## Follow-up - 2026-07-15

- Added the page-scoped `CrmDashboardPage layoutVariant="settings-hub"`, `pageHeaderRhythm="settings-hub"` and `topNavSelection="none"` contracts; `SettingsHubCard` anatomy was not changed.
- Tokenized the `161px` header, `36px` copy offset, `96px` header inset and `0 67px 28px 94px` four-column canvas padding.
- Final compiled-static evidence: `tmp/60-settings-hub-variant-20260715/report.json`; source/current `1672x941`; mean RGB delta `9.017665044652013 -> 7.019307609909713`; different pixels `5.0822066517854876% -> 4.527467470724924%`; current SHA-256 `a1b302780086cf3bea2520a5c5308d8920e75509144d501caef189ad80ab98dc`; populated render with zero runtime errors.
- Image 61 regression sentinel remained bit-identical at SHA-256 `7b0f8eb8c7a62e426280fad7086648f9e9471c6c581481d7141831c343650b89`.

## Follow-up verdict

**Semi-approved, explicit failed 1:1 at page level.** Header, top-nav behavior, four-column canvas and all eight domain cards now follow the source through public package contracts, with no story-local anatomy. Product review owns the remaining chrome, typography, icon optical detail, border, shadow and antialiasing differences; the isolated card certification remains valid.

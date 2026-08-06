# Setup Contextual Agent Regional Diagnostic - 2026-08-04

## Scope

Current static Storybook renders for the 13 Setup routes were captured in
`visual-diagnostics/evidence/setup-final-current-20260804` and inspected against the canonical
51A-51L and 78 sources plus the corresponding `specs/006-crm-operational-core/setup-*` contracts.

## Confirmed Mismatches

1. `SetupShellAgentPanel` hardcodes the 51A generic `Dados do studio` guidance for every guided
   route. Images and product contracts 51C-51L define route-specific impact, messages and quick
   questions.
2. The shell agent menu, close and human-help controls render enabled without page-owned callback
   contracts.
3. `SetupReviewWorkspace` renders its page title as `h2`; the composed route has no visible `h1`.
4. The Storybook description and component ledgers still contain pre-fix `semi-approved` and
   `explicit failed 1:1` language that contradicts the later human audit and current route evidence.

## Affected Anatomy And Owner

- Agent content model, embedded agent behavior and review heading semantics: `@taliya/crm`.
- Per-route selection of official contextual content and callback evidence: `apps/docs` data and
  Storybook plays.
- No reusable anatomy belongs in story-local CSS.

## Token Decision

No token change is justified. Geometry, typography, color, spacing and responsive behavior already
match the official Setup family. The defect is product content/behavior and heading semantics.

## Smallest Probe Hypotheses

1. Add an exported `SetupAgentContext` contract and canonical context map in `@taliya/crm`.
2. Make both embedded and standalone setup agents consume that contract without changing geometry.
3. Expose menu, close and human-help callbacks through `SetupShell`/`SetupPage`; disable controls when
   a callback is absent.
4. Let `SetupReviewPanel` select a heading level and make `SetupReviewWorkspace` enforce `h1`.
5. Pass only context identifiers/data and callbacks from stories; assert one route-specific message
   and quick-reply outcome per route.

The accepted implementation must preserve the current static geometry, keep strict story anatomy at
zero debt selectors, and pass the CRM, docs, responsive and Storybook static gates.

## Resolucao - 2026-08-05

As cinco hipoteses foram implementadas no componente oficial e validadas nas 13 rotas de Setup.

- `SetupAgentContext` e `setupAgentContexts` agora fornecem conteudo contextual por rota para os
  agentes embutido e isolado.
- Menu, fechar, ajuda humana e envio dependem de callbacks observaveis e ficam desabilitados quando
  o consumidor nao os fornece.
- `SetupReviewWorkspace` agora possui `h1` visivel.
- A documentacao corrente removeu as classificacoes antigas que contradiziam o estado atual.
- Uma regressao responsiva encontrada durante a recaptura foi corrigida no shell oficial: entre
  981px e 1120px, stepper, conteudo e agente deixam de competir em tres colunas.

Evidencias atuais:

- `setup-joint-certification-audit-20260805.md`;
- `visual-diagnostics/evidence/setup-final-current-20260805`;
- `visual-diagnostics/evidence/setup-responsive-current-20260805`.

Os achados correspondentes `JPC-019` e `JPC-020` estao resolvidos. A familia esta aprovada pelo
Codex; a aprovacao conjunta ainda depende da revisao do product owner.

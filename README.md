# Taliya Product UI

Biblioteca de componentes do futuro SaaS/CRM Taliya.

Este projeto e separado da landing `agentes-landing-system`. A landing nao consome esta biblioteca. O objetivo aqui e criar o design system e a component library do produto operacional Taliya: shell, navegacao, componentes base, padroes CRM, setup, billing, uso/cotas, agentes/fluxos e estados operacionais.

Fase atual: biblioteca de componentes implementada a partir da spec, com tokens, primitives, componentes CRM e Storybook como catalogo visual.

## Fonte De Verdade

Spec Kit e a fonte de verdade do projeto.

Feature ativa:

```text
specs/001-product-ui-foundation/plan.md
```

Artefatos obrigatorios antes de implementar:

```text
specs/001-product-ui-foundation/component-matrix.md
specs/001-product-ui-foundation/component-source-map.md
specs/001-product-ui-foundation/primitive-ui-matrix.md
specs/001-product-ui-foundation/image-coverage-map.md
specs/001-product-ui-foundation/spec-completeness-review.md
specs/001-product-ui-foundation/token-values-v0.md
specs/001-product-ui-foundation/token-system-v1.md
specs/001-product-ui-foundation/implementation-execution-plan.md
specs/001-product-ui-foundation/contracts/
```

Contrato especifico para apps consumidores:

```text
specs/001-product-ui-foundation/contracts/consumer-integration-contract.md
```

Manifesto do page kit oficial:

```text
specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json
```

Playbook de adocao para novas paginas/apps consumidoras:

```text
specs/001-product-ui-foundation/consumer-adoption-playbook.md
```

Handoff operacional para conectar o futuro CRM real:

```text
specs/001-product-ui-foundation/future-crm-adoption-handoff.md
```

## Estrutura Planejada

```text
taliya-product-ui/
  apps/
    docs/
  packages/
    tokens/
    ui/
    crm/
  specs/
    001-product-ui-foundation/
```

## Comandos

```text
pnpm install
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm docs
```

Nesta maquina, `pnpm` esta disponivel via Corepack:

```text
corepack pnpm install
corepack pnpm test
```

## Escopo

Inclui:

- foundations e tokens;
- primitives React;
- padroes operacionais do CRM;
- Storybook como catalogo visual;
- contratos de componentes, variantes e estados.

Nao inclui:

- landing page;
- marketing/hero/pricing publico;
- widget comercial;
- backend, banco, API ou auth real;
- fluxos reais de billing ou agentes;
- implementacao visual de `/pilates`.

## Regra Principal

O produto consumidor injeta dados e comportamento. A biblioteca renderiza componentes e estados visuais de forma reutilizavel.

## Uso Em Apps Consumidores

Checklist completo:

```text
specs/001-product-ui-foundation/contracts/consumer-integration-contract.md
```

Fluxo de adocao para novas paginas consumidoras:

```text
specs/001-product-ui-foundation/consumer-adoption-playbook.md
```

Os apps consumidores devem instalar os tres pacotes e importar o CSS nesta ordem:

```ts
import "@taliya/tokens/tokens.css";
import "@taliya/ui/styles.css";
import "@taliya/crm/styles.css";
```

Durante o desenvolvimento local, `taliya-internal` consome os tarballs gerados em `dist-packages`:

```text
@taliya/tokens -> dist-packages/taliya-tokens-0.0.0.tgz
@taliya/ui     -> dist-packages/taliya-ui-0.0.0.tgz
@taliya/crm    -> dist-packages/taliya-crm-0.0.0.tgz
```

Fluxo local recomendado apos alterar tokens/componentes:

```text
corepack pnpm --filter @taliya/tokens build
corepack pnpm --filter @taliya/ui build
corepack pnpm --filter @taliya/crm build
corepack pnpm pack:local
corepack pnpm package-artifacts:audit
```

Depois, no app consumidor:

```text
corepack pnpm consumer-refresh:audit
corepack pnpm consumer-refresh:apply
```

Auditoria de contrato contra o consumidor local:

```text
corepack pnpm consumer:audit
```

Esse audit tambem importa `@taliya/crm` no app consumidor e confirma que `standardPageKitManifest` esta disponivel com as entradas oficiais do page kit.

Auditoria da cobertura do page kit oficial no consumidor local:

```text
corepack pnpm consumer-page-kit:audit
corepack pnpm consumer-page-kit:audit:shell-only-route-probe
corepack pnpm consumer-page-kit:audit:wrapper-contract-probe
corepack pnpm consumer-page-kit:audit:route-wrapper-contract-probe
corepack pnpm consumer-page-kit:audit:mismatched-route-contract-probe
corepack pnpm consumer-page-kit:audit:default-identifier-route-probe
corepack pnpm consumer-page-kit:audit:uncovered-route-probe
corepack pnpm consumer-page-kit:audit:path-traversal-probe
corepack pnpm consumer-readiness-config:audit:path-traversal-probe
```

Esse audit tambem valida `componentContracts` do `taliya-page-kit.config.json`: wrappers locais podem adaptar dados e callbacks, mas precisam renderizar os componentes oficiais declarados dentro do proprio wrapper. O probe shell-only confirma que uma rota com apenas `InternalShell`, sem o workspace local exigido, falha. O probe de wrapper confirma que componentes oficiais escondidos em helper nao usado nao satisfazem o contrato do wrapper ativo. O probe de rota-wrapper confirma que todo workspace local exigido por rota tem um contrato de componente correspondente. O probe de default identifier confirma que rotas `const Page = () => ...; export default Page` tambem sao aceitas quando renderizam os roots oficiais. O probe de rota descoberta confirma que toda rota encontrada em `routeCoverage.root` precisa estar declarada em `routes`. Os probes de path traversal confirmam que `file`, `routeCoverage.root`, `vendor` e `pageKitConfig` versionados no consumidor precisam ser relativos ao proprio consumidor e nao podem apontar para fora da raiz com path absoluto ou `..`.

Auditoria de runtime do consumidor local:

```text
corepack pnpm consumer-runtime:audit
```

Auditoria dos configs versionados do consumidor:

```text
corepack pnpm consumer-config-versioning:audit
```

Auditoria de sincronizacao dos tarballs entre `dist-packages` e o vendor do consumidor:

```text
corepack pnpm consumer-package-sync:audit
```

Auditoria de versionamento dos tarballs no vendor do consumidor:

```text
corepack pnpm consumer-vendor-versioning:audit
```

Auditoria do backlog de certificacao visual por ledger:

```text
corepack pnpm visual-certification-backlog:audit
```

Auditoria global de cobertura das imagens/paginas de produto no Storybook:

```text
corepack pnpm full-image-page-coverage:audit
corepack pnpm full-image-page-coverage:audit:missing-story-probe
corepack pnpm full-image-page-coverage:audit:missing-source-marker-probe
corepack pnpm full-image-page-coverage:audit:misplaced-source-marker-probe
corepack pnpm full-image-page-coverage:audit:nonofficial-import-probe
corepack pnpm full-image-page-coverage:audit:unmapped-map-target-probe
```

Esse audit cruza `image-coverage-map.md`, os arquivos de imagem aprovados e `apps/docs/storybook-static/index.json`. Ele garante que cada pagina/imagem marcada como `Covered` nas secoes de produto tenha story estatico, que esse story cite o nome exato da imagem-fonte aprovada e que continue importando componentes publicos de `@taliya/crm` ou `@taliya/ui`, sem voltar para imports locais de package source.

Para outro consumidor, como o futuro CRM, prefira versionar `taliya-readiness.config.json` e `taliya-page-kit.config.json` na raiz desse app e rodar o gate agregado:

```text
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app
```

Antes de considerar a adocao do futuro CRM como parte da meta global, siga e valide o handoff:

```text
specs/001-product-ui-foundation/future-crm-adoption-handoff.md
corepack pnpm future-crm-adoption-handoff:audit
```

Para preparar esses dois configs a partir dos templates oficiais:

```text
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write
corepack pnpm consumer-configs:bootstrap -- --consumer ../future-crm-app --write --starter-files
corepack pnpm consumer-starter-templates:audit
corepack pnpm consumer-starter-templates:audit:route-contract-probe
corepack pnpm consumer-bootstrap:audit
corepack pnpm future-consumer-fixture:audit
```

Use `--starter-files` only when the consumer still needs the initial official page-kit skeleton. It writes the minimal `CrmProductShell`, work-list, filter, quick-filter, table, kanban/card, and drawer files expected by the example `taliya-page-kit.config.json`.

The starter skeleton is versioned under `specs/001-product-ui-foundation/contracts/consumer-starter-files`.

Its alignment with `consumer-page-kit-config.example.json` is checked by `corepack pnpm consumer-starter-templates:audit`. The route contract probe, `corepack pnpm consumer-starter-templates:audit:route-contract-probe`, proves starter route-local `componentContractId` links fail when they point to missing wrapper contracts.

Os exemplos de configuracao ficam em:

```text
specs/001-product-ui-foundation/contracts/consumer-page-kit-config.example.json
specs/001-product-ui-foundation/contracts/consumer-readiness-config.example.json
```

O audit valida os schemas antes de verificar imports/JSX, entao erros como componente sem `package`, rota sem `file`, surface sem `required`, path absoluto/travessia `..`, ou comando runtime invalido falham com mensagem direta. Use `reportLabel: "future-crm"` no `taliya-readiness.config.json`, ou `--report-label future-crm`, para gravar relatorios separados sem sobrescrever a evidencia atual do Internal.

Auditoria do kit público exportado pelos pacotes:

```text
corepack pnpm public-api:audit
```

Esse audit usa `specs/001-product-ui-foundation/contracts/standard-page-kit.manifest.json` como fonte oficial dos componentes reutilizaveis esperados para Internal e futuro CRM.

Auditoria da superficie publica canonica, aliases e especializacoes:

```text
corepack pnpm public-api-surface:audit
```

Esse audit usa `specs/001-product-ui-foundation/contracts/public-api-surface.manifest.json` para garantir que o page kit padrao continue canonico, que aliases de compatibilidade como `Sidebar`, `Topbar`, `GlobalActions`, `TaskQueueList` e `ActionMenu` apontem para um componente oficial existente, e que especializacoes CRM como `PageFilterBar`, `TaskTable`, `CrmRecordDrawer` e `MetricCard` estejam documentadas como wrappers de primitives oficiais em vez de duplicacoes soltas.

Auditoria da direcao de dependencias entre pacotes:

```text
corepack pnpm package-boundaries:audit
```

Auditoria dos tarballs locais instaláveis:

```text
corepack pnpm package-artifacts:audit
```

Mapa de prontidao da biblioteca e evidencias atuais:

```text
specs/001-product-ui-foundation/library-readiness-audit.md
```

Gate agregado de prontidao atual:

```text
corepack pnpm readiness:audit
```

Esse comando executa os audits de tokens, componentes, API publica, boundaries, artifacts, bootstrap de consumer, fixture instalado de future consumer, consumer, sincronizacao/versionamento de vendor, page-kit, runtime do consumer, versionamento dos configs do consumer, cobertura global de imagens/paginas, backlog de certificacao visual e goal completion, escrevendo `library-readiness-gate.md/json`.

Gate tecnico de release candidate:

```text
corepack pnpm release-candidate:audit
```

Esse comando roda typecheck, lint, test, build, readiness, backlog de certificacao visual e goal audit, escrevendo `release-candidate-audit.md/json`. Ele nao substitui a certificacao visual 1:1 das imagens aprovadas.

Resumo rapido de consumo da biblioteca:

```text
corepack pnpm library-consumption-status:audit
corepack pnpm library-consumption-status:audit:positive-probe
corepack pnpm library-consumption-status:audit:global-complete-probe
corepack pnpm library-consumption-status:audit:stale-release-probe
corepack pnpm library-consumption-status:audit:stale-readiness-probe
corepack pnpm library-consumption-status:audit:negative-probe
```

Esse comando escreve `library-consumption-status.md/json` e consolida se o Internal esta aceito, se consome o page kit oficial, se o manifest runtime esta disponivel, se o processo do futuro CRM esta pronto, se a adocao real do futuro CRM aconteceu, e se a meta global ainda esta aberta.
Os probes validam que evidencia coerente e aceita, que evidencia futura completa vira `pass-global-goal`, que um release antigo sem os gates de consumo e rejeitado, que readiness antigo sem gates agregados obrigatorios e rejeitado, e que um falso positivo de consumo do Internal e rejeitado.

Prontidao pratica para iniciar o CRM real:

```text
corepack pnpm crm-real-readiness:audit
```

Esse comando escreve `crm-real-readiness-audit.md/json` e consolida, em uma unica leitura, se os pacotes, o Internal, o page kit, os contratos dinamicos de paginas/drawers, o bootstrap de consumidor e o fixture instalado de futuro CRM sao suficientes para iniciar o CRM real sem reimplementar shell, filtros, tabela, drawer, kanban ou cards localmente.

Para a leitura mais alta de biblioteca oficial consumivel, rode:

```text
corepack pnpm official-library-readiness:audit
```

Esse comando escreve `official-library-readiness-audit.md/json` e consolida metadados dos pacotes, gates tecnicos, API publica, governanca de tokens/componentes, consumo pelo Internal, readiness para CRM real, release candidate e itens manuais de publicacao em registry.

Para validar a politica versionada de release local/registry, rode:

```text
corepack pnpm release-policy:audit
corepack pnpm release-policy:audit:negative-probe
```

Esse comando escreve `release-policy-audit.md/json` e valida `specs/001-product-ui-foundation/contracts/release-policy.md`. O estado esperado agora e `pass-current-local-policy`: tarball local e o canal oficial atual, enquanto versionamento semver real, registry/access model, workflow de publish e migracao de consumidores continuam como decisoes explicitas antes de qualquer registry. O negative probe prova que um contrato de release incompleto falha.

Para separar canal local instalavel de publicacao em registry, rode:

```text
corepack pnpm release-channel:audit
```

Esse comando escreve `release-channel-audit.md/json`; ele deve passar como `pass-local-release-channel` enquanto os consumidores usam tarballs versionados em `vendor/taliya-product-ui`, e so vira registry-ready depois de versionamento semver real, registry/access model, workflow de publish e politica de migracao de dependencias.

O canal local tambem publica um manifesto consumivel:

```text
dist-packages/taliya-product-ui-local-manifest.json
corepack pnpm local-release-manifest:audit
```

Esse manifesto lista pacote, versao, tarball, SHA-256, tamanho e ordem de instalacao para `@taliya/tokens`, `@taliya/ui` e `@taliya/crm`.

Para sincronizar o vendor de um consumidor a partir desse manifest:

```text
corepack pnpm consumer-vendor:sync
corepack pnpm consumer-vendor:sync -- --write
corepack pnpm consumer-vendor:sync:check
corepack pnpm consumer-vendor:sync:stale-manifest-probe
```

Para sincronizar o `package.json` do consumidor com os tarballs listados no mesmo manifest:

```text
corepack pnpm consumer-dependencies:sync
corepack pnpm consumer-dependencies:sync -- --write
corepack pnpm consumer-dependencies:sync:check
corepack pnpm consumer-dependencies:sync:stale-manifest-probe
```

Para validar e executar a reinstalacao dos pacotes locais no consumidor:

```text
corepack pnpm consumer-packages:install-plan
corepack pnpm consumer-packages:install
corepack pnpm consumer-packages:install:missing-vendor-probe
```

Para confirmar que o `package-lock.json` tambem ficou alinhado ao manifesto local:

```text
corepack pnpm consumer-lockfile:audit
corepack pnpm consumer-lockfile:audit:stale-probe
```

Por padrao o alvo e `../taliya-internal`; para outro consumidor use `-- --consumer ../future-crm-app`.

Para validar/aplicar o fluxo completo de refresh do consumidor em um unico comando:

```text
corepack pnpm consumer-refresh:audit
corepack pnpm consumer-refresh:apply
```

Para validar outro consumidor com o mesmo gate agregado:

```text
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app
node scripts/audit-library-readiness.mjs --check --consumer ../future-crm-app --vendor vendor/taliya-product-ui --page-kit-config ../future-crm-app/taliya-page-kit.config.json --commands typecheck,lint,test,build --report-label future-crm
```

Consumidores podem versionar esse setup em `taliya-readiness.config.json`; o exemplo fica em:

```text
specs/001-product-ui-foundation/contracts/consumer-readiness-config.example.json
```

Runbook local de prontidao e refresh de pacotes:

```text
specs/001-product-ui-foundation/local-readiness-runbook.md
```

O kit minimo para paginas internas/CRM deve ser composto por:

- `CrmProductShell` para estrutura, topbar, sidebar, navegacao e regioes habilitaveis por props;
- `PageFilterBar` e `PageQuickFilters` para filtros;
- tabelas oficiais como `LeadTable`, `TaskTable`, `ChecklistTable`, `ApprovalTable`, `StudentTable` e `ReplacementTable`;
- `KanbanBoard`, `KanbanColumn` e `KanbanCard` para quadros;
- `CrmRecordDrawer` e drawers de dominio para detalhes;
- primitives de layout como `Stack`, `Toolbar`, `FieldGrid`, `ContentGrid`, `PanelHeader`, `PanelBody` e `StatePage`.

Regra pratica de escolha de componentes:

- Use `@taliya/ui` quando o componente for primitive neutro: `Button`, `DropdownMenu`, `FilterBar`, `DataTable`, `Drawer`, `MetricTile`, `StatusSummaryCard`.
- Use `@taliya/crm` quando a tela precisar da composicao oficial de produto: `CrmProductShell`, `PageFilterBar`, `PageQuickFilters`, `TaskTable`, `LeadTable`, `CrmRecordDrawer`, `MetricCard`, `StatusCard`.
- Evite iniciar novas paginas com aliases historicos (`Sidebar`, `Topbar`, `GlobalActions`, `TaskQueueList`, `ActionMenu`) quando existir o nome canonico indicado em `public-api-surface.manifest.json`.

## Cobertura Esperada

A biblioteca foi organizada para reconstruir todas as telas aprovadas do pacote de imagens do Taliya CRM usando componentes documentados. Imagens historicas, duplicadas ou explicitamente nao aprovadas ficam registradas apenas como contexto e nao como alvo de implementacao.

As imagens aprovadas nao sao inspiracao solta nem apenas referencia visual: sao fontes canonicas de clone 1:1. A futura implementacao deve extrair os componentes das imagens e reproduzir de forma identica o conteudo, anatomia, densidade, espacamento, estados e hierarquia aprovados, sem hardcodar telas completas.

O arquivo `component-source-map.md` define exatamente de qual imagem/board/contrato cada componente deve ser retirado, incluindo fonte primaria, fontes secundarias, anatomia a extrair, variantes/estados e decisoes de paridade.

O arquivo `primitive-ui-matrix.md` define o escopo oficial de `Primitives / UI`: quais primitives pertencem a `@taliya/ui`, de quais imagens 01 e 07-15 devem ser extraidos, quais variantes/estados precisam existir e quais componentes CRM vao compor esses primitives depois.

O arquivo `token-system-v1.md` e o alvo de implementacao dos tokens. `token-values-v0.md` permanece como extracao historica inicial da board 01.

O arquivo `implementation-execution-plan.md` define a ordem oficial de execucao apos aprovacao: tokens, primitives P0, shell CRM recomposto, primitives P1, padroes CRM, componentes de dominio, image coverage e QA.

Diretorio canonico das imagens aprovadas:

```text
D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508
```

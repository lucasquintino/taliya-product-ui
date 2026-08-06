# Certificacao Atual De Setup E Onboarding

Data: 2026-08-05

## Escopo

Revisao atual das 13 stories oficiais da familia Setup/Onboarding:

- 51A shell global;
- 51B agente de configuracao isolado;
- 51C consumo de aulas;
- 51D Studio;
- 51E Equipe;
- 51F Canais;
- 51G Planos;
- 51K Pagamento;
- 51H Alunos;
- 51I Turmas;
- 51J Agenda;
- 51L Revisao;
- 78 boas-vindas.

Os propositos e blocos obrigatorios foram conferidos contra
`agentes-landing-system/specs/006-crm-operational-core`. As stories usam
componentes oficiais de `@taliya/crm`; a anatomia nao foi recriada em CSS
local.

## Achados Desta Rodada

1. O agente embutido repetia o contexto generico `Dados do studio` em todas
   as etapas, mesmo quando a pagina era Canais, Planos, Pagamento, Alunos,
   Turmas, Agenda ou Revisao.
2. Menu, fechar, ajuda humana e envio podiam aparecer habilitados sem callback
   observavel.
3. O workspace de Revisao nao expunha o titulo principal como `h1`.
4. Em 1024px, stepper, conteudo e agente ainda permaneciam lado a lado. Isso
   comprimia a topbar e causava colisao em controles de Studio e Pagamento.
5. A documentacao ainda classificava as paginas como semi-aprovadas e
   explicitamente reprovadas em comparacoes antigas.

## Correcao Oficial

- `SetupAgentContext` e `setupAgentContexts` passaram a ser o contrato
  publico de conteudo contextual do agente.
- `SetupShell` e `SetupAgentChat` usam o mesmo contrato para impacto,
  mensagens, respostas rapidas e placeholder.
- Acoes do agente ficam desabilitadas quando o consumidor nao fornece o
  callback correspondente.
- `SetupReviewWorkspace` promove o titulo da pagina a `h1`.
- O shell oficial empilha stepper, conteudo e agente entre 981px e 1120px,
  preservando a composicao ampla acima desse intervalo e a composicao mobile
  existente abaixo dele.
- O harness responsivo usa URL relativa quando Storybook e harness compartilham
  a mesma origem, permitindo inspecao automatica do iframe.

## Interacoes

As plays das 13 stories foram executadas no Storybook estatico reconstruido.
Elas exercitam os callbacks de shell, formulario, importacao, selecao, revisao,
publicacao, ajuda e agente definidos por cada pagina.

Pagamento tambem foi testado manualmente no navegador:

- exatamente uma resposta rapida `Como funciona a baixa?`;
- exatamente um composer;
- envio de `Como registrar uma baixa manual?`;
- contexto de Pagamento preservado;
- nenhum erro visivel apos a interacao.

## Evidencia Atual

Desktop 1280x720:

`visual-diagnostics/evidence/setup-final-current-20260805`

- 13/13 stories carregadas;
- 13/13 contextos corretos;
- 13/13 plays sem erro visivel;
- zero overflow horizontal;
- zero controle visivel sem nome acessivel.

Responsivo 390x844 e 1024x768:

`visual-diagnostics/evidence/setup-responsive-current-20260805`

- 26/26 combinacoes carregadas;
- 26/26 contextos corretos;
- zero erro visivel;
- zero overflow horizontal;
- zero controle visivel sem nome acessivel;
- zero sobreposicao entre stepper, conteudo principal e agente.

As imagens oficiais continuam como referencia de anatomia e hierarquia. A
comparacao desta rodada foi estrutural porque as fontes aprovadas usam
geometria maior do que o viewport atual do navegador; nao e reivindicada
igualdade pixel a pixel em viewports diferentes.

## Regressao

- CRM: 184/184 testes;
- typecheck CRM e docs: aprovado;
- build de CRM: aprovado;
- build estatico do Storybook: aprovado;
- docs smoke: 5/5;
- Storybook anatomy strict: zero debt selectors;
- full image page coverage: aprovado;
- token governance: aprovado;
- `git diff --check`: aprovado.

## Resultado

As 13 stories de Setup estao aprovadas pelo Codex nas nove dimensoes do ledger:
proposito, blocos obrigatorios, resultados de interacao, estados essenciais,
ownership de componentes, duplicacao, responsividade, acessibilidade e limite
de consumo.

A aprovacao conjunta continua pendente ate a revisao do product owner.

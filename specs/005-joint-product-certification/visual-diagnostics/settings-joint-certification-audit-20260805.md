# Auditoria Conjunta De Configuracoes Pos-Live

Data: 2026-08-05

## Escopo Canonico

Cinco estados de rota foram revisados na build estatica atual:

- `crm-image-coverage-configuracoes--image-60-configuracoes-hub`;
- `crm-image-coverage-configuracoes--image-61-configuracoes-permissoes`;
- `crm-image-coverage-configuracoes--image-62-configuracoes-pagamentos`;
- `crm-image-coverage-configuracoes--image-63-configuracoes-agenda`;
- `crm-image-coverage-configuracoes--image-64-configuracoes-notificacoes`.

As nove composicoes funcionais da familia (Hub, Studio, Equipe, Permissoes, Canais, Planos, Pagamentos, Agenda e Notificacoes) tambem reutilizam os `play` contracts documentados em `settings-human-audit-20260804.md`.

## Revisao Humana Atual

Cada rota canonica foi inspecionada em 1280 x 720, 1024 x 768 e 390 x 844. A revisao verificou proposito, blocos obrigatorios, interacoes, estados essenciais, propriedade dos componentes, ausencia de anatomia duplicada, responsividade, acessibilidade basica e limite de consumo.

Foram encontrados e corrigidos quatro defeitos na anatomia oficial:

- altura fixa do cabecalho mobile, que comprimia a pagina;
- transformacao e largura fixa do seletor de Agenda no mobile;
- trilha intrinseca de 944 px em Pagamentos, causada pela composicao com `fieldset`;
- divisao principal/painel e coluna de status de Notificacoes comprimidas em 1024 px.

O contrato final empilha a area principal e o agente entre 981 px e 1120 px, mantem todos os descendentes dentro da largura disponivel e reserva 104 px para o status completo das regras de Notificacoes.

## Evidencia

Capturas finais:

- `visual-diagnostics/evidence/settings-final-current-20260805/desktop`;
- `visual-diagnostics/evidence/settings-final-current-20260805/1024`;
- `visual-diagnostics/evidence/settings-final-current-20260805/390`.

Resultado final nas cinco rotas: nenhum overflow horizontal de documento, um unico `h1` visivel, nenhum erro visivel do Storybook e nenhum cruzamento entre main e painel. As quatro linhas de frequencia de Notificacoes terminam com `scrollWidth === clientWidth`, inclusive o status `Desligado`.

## Componentes E Interacoes

As rotas usam `CrmDashboardPage` ou `CrmRightPanelPage`, workspaces oficiais de Settings, `SettingsAgentPanel`, primitives de `@taliya/ui` e callbacks controlados. Nao foi introduzido markup ou CSS de anatomia local nas stories.

Os nove `play` contracts existentes continuam reutilizaveis para as jornadas funcionais. A regressao responsiva foi adicionada ao pacote CRM, cuja suite passa com 185/185 testes e typecheck limpo. A build estatica atual do Storybook tambem passa.

Status: cinco rotas aprovadas pelo Codex. A aprovacao do product owner e o joint pass continuam pendentes no ledger.

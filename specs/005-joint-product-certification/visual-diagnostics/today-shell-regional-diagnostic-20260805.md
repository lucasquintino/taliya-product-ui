# Diagnostico Regional: Hoje E Shell Base

Data: 2026-08-05

## Escopo

- Hoje base, drawer de tarefa, estado critico e historico;
- shell autenticado vazio da imagem 79;
- build estatica atual do Storybook em 1280 x 720, 1024 x 768 e 390 x 844.

## Resultado Atual

| Regiao | Evidencia medida | Status |
| --- | --- | --- |
| Hoje base/critico | zero overflow externo; um `h1`; dashboard oficial com selecao de linhas | visualmente estavel |
| Drawer de tarefa | 420 x 768 em tablet e 390 x 844 no mobile; altura total | geometria aprovada |
| Historico de Hoje | `TodayHistoryStory` chama `window.scrollTo`, mas a rolagem pertence a `.tcrm-window-frame__body` | falha funcional |
| Shell vazio 79 em 1024 | `scrollWidth=1160`, `clientWidth=1009`, overflow de 151 px | falha responsiva |
| Shell vazio 79 em 390 | `scrollWidth=1160`, `clientWidth=375`, overflow de 785 px | falha critica |
| Shell vazio 79 | `CrmEmptyShell` recria stage, window, sidebar, topbar e header fora de `CrmProductShell` | arquitetura duplicada |
| Estados do shell | contrato exige vazio, carregando e indisponivel; apenas vazio existe | cobertura incompleta |
| Acoes do shell 79 | story monta navegacao e acoes sem callbacks observaveis | jornada incompleta |

Capturas atuais: `visual-diagnostics/evidence/today-shell-current-20260805`.

## Anatomia E Ownership

- `@taliya/crm/CrmProductShell` e o unico dono da casca autenticada, responsividade, navegacao e acoes globais.
- `@taliya/crm/CrmEmptyShell` deve ser uma composicao de pagina sobre `CrmProductShell`, nao uma segunda casca.
- `@taliya/crm/CrmEmptyShellCanvas` pode representar os estados do canvas com `LoadingState` e `ErrorState` oficiais de `@taliya/ui`.
- A story de Hoje pode possuir dados, callbacks, estado anunciado e posicionamento inicial do estado visual, sem definir anatomia reutilizavel.

## Hipoteses Minimas

1. Fazer `CrmEmptyShell` delegar shell, navegacao e responsividade a `CrmProductShell` elimina a largura fixa sem novo CSS estrutural.
2. Promover `state` e `onRetry` no canvas cobre loading/unavailable reutilizando primitives existentes.
3. Rolar o container mais proximo de `ActivityFeed` corrige o estado Historia sem alterar a familia Dashboard.
4. Adicionar callbacks observaveis e `play` tests nas stories prova navegacao, acoes globais, selecao, drawer, historico e retry.

Hipoteses aceitas para implementacao: 1-4. Nenhum token novo e necessario; qualquer ajuste visual residual deve reutilizar os tokens existentes.

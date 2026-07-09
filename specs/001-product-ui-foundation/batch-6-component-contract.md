# Batch 6 Component Contract - P0 Communication, Calendar, Flow, Data Viz

Status: fechado em 2026-05-30. Este batch passou no gate da skill `taliya-product-ui-batch` com matriz componente por componente, screenshots desktop/mobile, smoke funcional e validacoes do repo.

## Fonte Canonica

| Fonte | Componentes extraidos | Regra de fidelidade |
| --- | --- | --- |
| `10_round-3b3_visualizacoes-operacionais_aprovada.png` | `Timeline` | clonar ritmo vertical, marcadores circulares, linha, hierarquia titulo/meta/hora e variantes de historico operacional |
| `11_round-3b4_comunicacao-agentes_aprovada.png` | `MessageBubble`, `ComposerInput` | clonar conversa selecionada, composer principal, card de composer compacto, sugestao de agente, estados de envio/falha/handoff |
| `14_round-3c2_agenda-financeiro-documentos_aprovada.png` | `CalendarCell`, `CalendarEventBlock` | clonar calendario semanal completo, card de aula, vaga aberta, conflito e estados de agenda |
| `15_round-3c3_agentes-auditoria-relatorios_aprovada.png` | `FlowNode`, `ChartPanelPrimitive`, `Timeline` execution/audit | clonar builder de fluxo, trace de execucao, relatorios avancados e data viz |
| `07_round-3a_componentes-web-referencia_aprovada.png` | `ConnectorLine` | clonar conectores retos, curvos, pontilhados, com nos e setas |

## Contratos Por Componente

| Componente | Storybook | Extracao exata | Primitives/reuso obrigatorio | Variantes | Estados/behavior obrigatorio | Medidas/tokens obrigatorios |
| --- | --- | --- | --- | --- | --- | --- |
| `MessageBubble` | `Primitives / UI/MessageBubble/All States` | Board 11, blocos 2, 5, 6, 7, 8 e 9: bolha inbound com avatar externo no uso composto, outbound azul alinhada a direita, nota interna amarela, sugestao tracejada, falha vermelha, status/hora. | Usa `Chip`, `Button`, `Icon`; nao pode embutir thread completa; deve ser primitivo de bolha reutilizavel por `ConversationThread`. | `inbound`, `outbound`, `internal`, `suggestion`, `failed`; status `sent`, `delivered`, `read`, `pending`, `failed`, `locked`. | `failed` usa `role=alert`; meta/status acessivel; action real; suporta conteudo longo sem overflow; suporta alinhamento no container pai. | `control.message.*`; radius pequeno com canto direcional reduzido; max-width 344; padding 12x14; texto 12/14; border sutil, info, warning, danger, dashed suggestion. |
| `ComposerInput` | `Primitives / UI/ComposerInput/All States` | Board 11, blocos 2 e 4: input pill com icone de emoji/mensagem, placeholder, toolbar inferior com anexar/modelos/midia, toggle `Nota interna`, botao preto enviar com seta/drop. | Usa `IconButton`, `Toggle`, `Button`, `Icon`; `textarea` real; `Composer` CRM deve compor este primitivo. | `empty`, `typing`, `internal`, `sending`, `disabled`; tamanho default e compacto por largura responsiva. | Digitar atualiza valor; Ctrl/Cmd+Enter envia; clique em enviar chama `onSend`; envio limpa em modo uncontrolled; disabled bloqueia textarea/actions; foco visivel no campo; sem clipping em 390px. | `control.composer.*`; field min 44; pill radius full; toolbar gap 8/10; submit responsivo; toggle min-width deve colapsar em mobile sem overflow. |
| `CalendarCell` | `Primitives / UI/CalendarCell/All States` | Board 14, bloco 1 e board 10, bloco 4: celula de calendario semanal/compacto com dia, hora/eyebrow, today, selected, dots e conflito. | `button` real; usa tokens de calendario; sem story-only largura fixa que cause overflow. | `empty`, `today`, `selected`, `conflict`, `disabled`, `muted`, com `events` multi-tom. | Click/focus/pressed real via `button`; `aria-current=date` quando today; `aria-pressed` quando selected; disabled sem foco; grid responsivo deve quebrar sem overflow mobile. | `control.calendar.*`; min-height 78 default; day 30; event dots 5; border compartilhada; selected preto; today azul suave; conflict vermelho suave. |
| `CalendarEventBlock` | `Primitives / UI/CalendarEventBlock/All States` | Board 14, blocos 1, 2, 7 e 9: bloco de aula/vaga/conflito com time, titulo, meta, capacidade e action. | Usa `IconButton`/actions reais quando necessario; deve ser usado por calendarios compostos. | `scheduled`, `full`, `available`, `conflict`, `cancelled`, `compact`. | Action real; status visual por borda esquerda/tom; conteudo longo quebra sem sair; estado cancelado sem remover legibilidade. | `control.calendar.*`; event min 70; compact min 52; padding 9x10/7x8; radius xs; border-left accent. |
| `ConnectorLine` | `Primitives / UI/ConnectorLine/All States` | Board 07 conectores e board 15 bloco 1: linha azul/vermelha/neutra, reta/curva/pontilhada, nos e seta. | Elemento reutilizavel; `FlowNode`/stories de fluxo devem usar `ConnectorLine`, nunca pseudo-linhas story-only. | tons `info`, `danger`, `neutral`, `success`; variantes `straight`, `elbow`, `curved`, `dashed`; `startNode`, `endNode`, `arrow`. | Decorativo por padrao (`aria-hidden`); nao deve receber foco; escala responsivamente; pode compor canvas/flow. | `connector.*`; width 2; length 76; height 28; node 8; arrow 7; curve radius 12; cores blue/red/gray/success. |
| `FlowNode` | `Primitives / UI/FlowNode/All States` | Board 15, bloco 1: node/card de fluxo com icone, titulo, descricao, status/chips, menu, portas e alinhamento de conectores. | Usa `Icon`, `IconButton`, `Chip`; conectores externos devem ser `ConnectorLine`; `FlowBuilder` futuro compoe nodes + connectors. | `trigger`, `condition`, `action`, `approval`, `fallback`, `blocked`; `selected`; `interactive`; `menu`. | Click real quando `onClick`; keyboard Enter/Espaco ativa; menu nao propaga click; foco visivel; blocked visual/semantico; sem linha desenhada em story-only CSS. | `control.flow-node.*`; width 168; min-height 132; padding 16; gap 10; ports -5; radius sm; selected focus-ring. |
| `ChartPanelPrimitive` | `Primitives / UI/ChartPanelPrimitive/All States` | Board 15, bloco 12: card de relatorio com linha, barras, funil, ranking, heatmap; states loading/empty. | Usa `LoadingState`, `EmptyState`, `Chip`; nao contem regra de negocio; dados sao props. | `line`, `bar`, `funnel`, `ranking`, `heatmap`, `loading`, `empty`. | Render nao-vazio; grafico decorativo onde aplicavel; loading/empty sem sobrepor; conteudo responsivo. | `chart.*`; panel min 190; padding 16; line 120; bar height 122; heatmap 18; ranking columns 72/1fr/34. |
| `Timeline` | `Primitives / UI/Timeline/All States` | Board 10, bloco 5 e board 15, blocos 5/9: linha vertical, marcadores, historico, auditoria e execucao. | Usa `Icon`, `Button`/actions reais; CRM `ActivityFeed`, `AuditTrail`, `ExecutionTimeline` compoem este primitivo. | `default`, `compact`, `sensitive`, `execution`; tones `info`, `success`, `warning`, `danger`, `neutral`. | Ordem em `ol/li`; action real; line/marker nao quebram em mobile; meta/time podem alinhar sem overflow. | `control.timeline.*`; column 30; row 58; compact 44; mark 24; halo 6; line left/top/bottom 14/26/-2. |

## Bloqueios Encontrados Na Auditoria Atual

| Bloqueio | Componente | Evidencia | Criterio afetado |
| --- | --- | --- | --- |
| Mobile overflow/clipping em 390px | `ComposerInput` | `tmp/batch6-current-audit-20260530/mobile-composerinput.png` | Resolvido: toolbar responsiva, send button compacto em mobile, textarea sem resize |
| Mobile overflow/clipping em 390px | `CalendarCell` | `tmp/batch6-current-audit-20260530/mobile-calendarcell.png` | Resolvido: grid responsivo 4/3 em mobile, sem overflow |
| Linha de fluxo vive na CSS da story | `FlowNode`/`ConnectorLine` | `.sb-batch6-flow-row .tl-flow-node:nth-child(-n + 4)::after` | Resolvido: story compoe `ConnectorLine`; pseudo-linha removida |
| Contrato do batch inexistente antes desta revisao | Todos | ausencia de `batch-6-component-contract.md` | Resolvido: contrato formal criado antes do fechamento |

## Matriz De Fechamento

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MessageBubble | pass | pass | pass | pass | pass | pass | pass | aprovado |
| ComposerInput | pass | pass | pass | pass | pass | pass | pass | aprovado |
| CalendarCell | pass | pass | pass | pass | pass | pass | pass | aprovado |
| CalendarEventBlock | pass | pass | pass | pass | pass | pass | pass | aprovado |
| ConnectorLine | pass | pass | pass | pass | pass | pass | pass | aprovado |
| FlowNode | pass | pass | pass | pass | pass | pass | pass | aprovado |
| ChartPanelPrimitive | pass | pass | pass | pass | pass | pass | pass | aprovado |
| Timeline | pass | pass | pass | pass | pass | pass | pass | aprovado |

## Evidencias De Fechamento

| Evidencia | Resultado |
| --- | --- |
| Screenshots desktop/mobile | `tmp/batch6-certification-20260530`, 16 screenshots, `manifest.json` sem blockers de overflow/clipping |
| Smoke funcional | `tmp/batch6-interaction-smoke-20260530/results.json`, 8/8 checks pass |
| Visual review humano | revisado contra boards 10, 11, 14, 15 e 07; sem P0/P1 visual pendente |
| Testes | `corepack pnpm test` pass |
| Typecheck | `corepack pnpm typecheck` pass |
| Lint | `corepack pnpm lint` pass |
| Build | `corepack pnpm build` pass; apenas warnings conhecidos de `use client`/chunk size do Storybook/Vite |

## Validacao Obrigatoria

- Fonte aprovada aberta com `view_image`: boards 10, 11, 14, 15 e 07.
- Storybook desktop e mobile capturado para todos os 8 stories.
- Smoke funcional executado: composer typing/send/Ctrl+Enter, toggle internal, calendar focus/click, flow node click/keyboard/menu, actions reais de bubbles/events/timeline.
- Validacoes executadas: `corepack pnpm test`, `corepack pnpm typecheck`, `corepack pnpm lint`, `corepack pnpm build`.
- `implementation-execution-plan.md` atualizado com fechamento do batch.

import type { ReactNode } from "react";

import { allTokens, tokenGroups } from "@taliya/tokens";

export type TokenEntry = {
  name: string;
  value: string;
  usage?: string;
  source?: string;
};

const tokenUsage: Record<string, string> = {
  "raw.black.900": "Preto canonico para texto principal e controles selecionados.",
  "raw.black.950": "Preto profundo para gradientes inversos aprovados em cards compactos.",
  "raw.gray.090": "Cinza interno suave para canvases e faixas sutis.",
  "raw.gray.100": "Cinza extraido da imagem 01 para fundo/canvas base.",
  "raw.gray.110": "Cinza expandido encontrado em telas posteriores para frames frios.",
  "raw.white": "Base de paineis, cards e superficies elevadas.",
  "raw.blue.400": "Azul da prancha 01 para acento suave.",
  "raw.blue.500": "Azul funcional para progresso, info e conectores.",
  "raw.red.400": "Vermelho da prancha 01 para risco suave.",
  "raw.red.500": "Vermelho critico para erro/destrutivo.",
  "raw.green.500": "Sucesso, conectado e aprovado.",
  "raw.orange.500": "Atencao, pendencia e alerta.",
  "raw.purple.500": "Categoria secundaria e series.",
  "raw.cyan.500": "Categoria agenda/acesso e series.",
  "color.logo-dot.start": "Inicio do gradiente do ponto da marca Taliya aprovado no SVG canonico.",
  "color.logo-dot.end": "Fim do gradiente do ponto da marca Taliya aprovado no SVG canonico.",
  "surface.app": "Fundo externo principal aprovado na imagem 01.",
  "surface.app-cool": "Fundo frio alternativo para telas posteriores.",
  "surface.canvas": "Canvas interno de telas CRM.",
  "surface.panel": "Paineis grandes e grupos visuais.",
  "surface.panel-strong": "Paineis com mais presenca.",
  "surface.card": "Cards repetidos e itens agrupados.",
  "surface.card-hover": "Card em hover/foco.",
  "surface.control": "Botoes, campos e controles claros.",
  "surface.control-hover": "Hover sutil de controles.",
  "surface.control-selected": "Controle selecionado preto.",
  "surface.field": "Campos de formulario e textareas extraidos das imagens aprovadas.",
  "surface.field-disabled": "Campos bloqueados, read-only ou indisponiveis.",
  "surface.dropdown": "Superficie elevada de select/menu.",
  "surface.selection-soft": "Linha destacada em select/menu sem estado selecionado forte.",
  "surface.selection": "Linha selecionada em dropdown e acento azul extraido da imagem 01.",
  "surface.accent-soft": "Icones circulares suaves de lista/atividade.",
  "surface.accent-faint": "Icones de empty/loading states.",
  "surface.segmented": "Container de segmented control.",
  "surface.skeleton-base": "Base do shimmer em loading states.",
  "surface.skeleton-highlight": "Luz do shimmer em loading states.",
  "surface.scrollbar-thumb": "Thumb de scroll discreto em scroll areas.",
  "surface.inverse-glow": "Brilho radial interno em cards inversos.",
  "surface.disabled": "Superficie indisponivel ou passiva.",
  "surface.overlay": "Overlay de modal/drawer.",
  "surface.toast": "Toast e alertas flutuantes.",
  "border.subtle": "Divisores, linhas internas e separadores discretos.",
  "border.default": "Borda padrao de card, painel e campo.",
  "border.active": "Hover/active discreto em botoes, chips e cards interativos.",
  "border.strong": "Borda visivel de estado ou enfase.",
  "border.selected": "Borda adjacente a controles selecionados.",
  "border.focus": "Anel/borda de foco neutro.",
  "border.field-focus": "Borda precisa de focus em campos e controles de formulario.",
  "border.control-strong": "Borda de checkbox e controles pequenos que precisam mais contraste.",
  "border.inverse": "Borda dos cards inversos.",
  "border.info": "Borda para informacao e conectores azuis.",
  "border.success": "Borda para sucesso/conectado.",
  "border.warning": "Borda para pendencia/atencao.",
  "border.danger": "Borda para erro/destrutivo.",
  "border.dashed": "Uploads, slots disponiveis e conectores opcionais.",
  "type.display.size": "Uso restrito a pranchas e apresentacoes do sistema.",
  "type.page-title.size": "Titulos principais de pagina.",
  "type.panel-title.size": "Titulos de painel e secoes grandes.",
  "type.card-title.size": "Titulos de cards e modais.",
  "type.section-title.size": "Titulos compactos dentro de paineis.",
  "type.body.size": "Texto padrao do produto.",
  "type.small.size": "Metadados, helper text e textos secundarios.",
  "type.caption.size": "Timestamps, captions e labels muito pequenos.",
  "type.table-header.size": "Cabecalhos de tabelas densas.",
  "type.table-cell.size": "Celulas de tabelas densas.",
  "type.numeric.size": "Metricas e numeros de destaque.",
  "type.summary-number.size": "Numero grande em cards de resumo.",
  "type.control-label.size": "Texto compacto de campos, checkboxes, toggles e inputs.",
  "type.nav-pill.size": "Texto dos pills de navegacao superior.",
  "type.compact-title.size": "Titulos compactos em rows, flow nodes e charts.",
  "type.dense-body.size": "Paragrafos curtos em empty/error/loading states.",
  "type.helper.size": "Helper text, captions longas e metadados muito densos.",
  "type.event-title.size": "Titulo de bloco de calendario.",
  "type.quota-title.size": "Titulo compacto em card de cota/plano.",
  "type.chart-label.size": "Labels internos de graficos.",
  "radius.micro": "Badges pequenos.",
  "radius.chip": "Chips e filtros.",
  "radius.control": "Inputs e botoes.",
  "radius.card": "Cards repetidos.",
  "radius.panel": "Paineis e grupos grandes.",
  "radius.window": "Frames de browser/app.",
  "radius.circle": "Controles circulares e avatares.",
  "shadow.card": "Cards regulares.",
  "shadow.panel": "Paineis e grupos elevados.",
  "shadow.overlay": "Popovers, drawers e modais.",
  "shadow.window": "Frame principal da aplicacao.",
  "shadow.control-floating": "Controles circulares flutuantes.",
  "shadow.control-hover": "Hover de controles circulares oficiais.",
  "shadow.checkbox": "Profundidade microscopica de checkbox.",
  "shadow.dropdown": "Select/dropdown compacto.",
  "shadow.inverse-card": "Card inverso premium.",
  "shadow.inner-soft": "Brilho interno suave em superficies glassy.",
  "focus.ring.color": "Foco neutro em controles claros.",
  "focus.ring.info": "Foco em controles com acento azul.",
  "focus.ring.danger": "Foco em controles destrutivos.",
  "focus.ring.width": "Espessura do anel de foco.",
  "focus.ring.offset": "Distancia entre componente e anel de foco.",
  "focus.field.shadow": "Sombra/borda interna de foco de campos e controles de formulario.",
  "motion.duration.fast": "Hover e press.",
  "motion.duration.base": "Selecao, expansao e transicoes padrao.",
  "motion.duration.slow": "Entrada de drawer, modal e overlay.",
  "motion.offset.popover-y": "Offset inicial de popover/menu.",
  "motion.offset.tooltip-y": "Offset inicial de tooltip legado.",
  "motion.offset.modal-y": "Offset vertical de entrada de modal.",
  "motion.offset.drawer-x": "Offset horizontal de entrada de drawer.",
  "motion.ease.standard": "Curva padrao do produto.",
  "motion.ease.out": "Entrada de overlays.",
  "connector.width": "Espessura de linhas de jornada/fluxo.",
  "connector.node.size": "Diametro dos pontos de conexao.",
  "connector.curve.radius": "Raio de curva para conectores arredondados.",
  "chart.grid": "Linhas de grade em graficos.",
  "chart.axis": "Labels e eixos de graficos.",
  "layout.crm-empty-shell.sidebar.width": "Coluna lateral do shell vazio extraida da imagem 79.",
  "layout.crm-empty-shell.sidebar.padding-top": "Respiro superior do sidebar do shell vazio.",
  "layout.crm-empty-shell.sidebar.padding-bottom": "Respiro inferior do sidebar para utilitarios de tema.",
  "layout.crm-empty-shell.sidebar.control-offset-x": "Offset horizontal dos botoes circulares oficiais na coluna lateral.",
  "layout.crm-empty-shell.sidebar.nav-offset-y": "Inicio vertical da pilha principal de navegacao.",
  "layout.crm-empty-shell.sidebar.nav-gap": "Gap vertical da navegacao principal da imagem 79.",
  "layout.crm-empty-shell.sidebar.first-control-gap": "Folga apos o primeiro controle de expandir.",
  "layout.crm-empty-shell.sidebar.late-control-offset-y": "Compactacao da pilha final de navegacao.",
  "layout.crm-empty-shell.sidebar.utility-gap": "Gap entre os utilitarios de tema.",
  "layout.crm-empty-shell.sidebar.utility-offset-y": "Separacao entre navegacao principal e utilitarios.",
  "layout.crm-empty-shell.main.topbar-height": "Altura da faixa superior do shell vazio.",
  "layout.crm-empty-shell.main.header-height": "Altura do cabecalho de pagina do shell vazio.",
  "layout.crm-empty-shell.topbar.back-left": "Posicao horizontal do voltar no shell vazio.",
  "layout.crm-empty-shell.topbar.back-top": "Posicao vertical do voltar no shell vazio.",
  "layout.crm-empty-shell.topbar.nav-left": "Posicao horizontal dos chips de navegacao superiores.",
  "layout.crm-empty-shell.topbar.nav-top": "Posicao vertical dos chips de navegacao superiores.",
  "layout.crm-empty-shell.topbar.nav-gap": "Gap entre chips de navegacao superiores.",
  "layout.crm-empty-shell.topbar.actions-right": "Inset direito do cluster de acoes globais.",
  "layout.crm-empty-shell.topbar.actions-top": "Posicao vertical do cluster de acoes globais.",
  "layout.crm-empty-shell.topbar.actions-gap": "Gap entre acoes globais.",
  "layout.crm-empty-shell.header.margin-left": "Inset esquerdo do titulo de pagina.",
  "layout.crm-empty-shell.title.offset-y": "Ajuste vertical do titulo Jornadas na imagem 79.",
  "layout.crm-agent-catalog.columns": "Grid de tres colunas do catalogo de agentes da imagem 52.",
  "layout.crm-domain-metrics.columns": "Grid de metricas reutilizavel em cards P2 de dominio.",
  "layout.crm-domain-facts.columns": "Grid de fatos reutilizavel em paineis P2 de dominio.",
  "layout.crm-mode-selector.flow-columns": "Cinco cards de modo no fluxo da imagem 56.",
  "layout.crm-mode-selector.routine-columns": "Tres cards de modo na rotina da imagem 54.",
  "layout.crm-flow-builder.columns": "Tres etapas e dois conectores do bloco Como funciona da imagem 56.",
  "layout.crm-simulation-runner.columns": "Cenarios, telefone e timeline do teste de fluxo da imagem 58.",
  "layout.crm-preflight-checklist.columns": "Checklist horizontal de publicação da imagem 59.",
  "layout.crm-execution-receipt.followup-columns": "Dois painéis inferiores do recibo de execução da imagem 70.",
  "layout.crm-student-summary.columns": "Cinco cards operacionais do resumo de aluno da imagem 28.",
  "layout.crm-student-header.columns": "Grid de avatar, identidade e acoes do cabecalho de perfil da imagem 28.",
  "layout.crm-student-header.action-columns": "Grade 2x2 dos botoes de acao do cabecalho de aluno.",
  "layout.crm-relationship-list.columns": "Cartoes, conectores e acoes de relacao/familia do board 13.",
  "layout.crm-task-filter-bar.width": "Largura fonte de 977px do filtro de tarefas da imagem 23.",
  "layout.crm-task-filter-bar.search-width": "Largura fonte do campo Buscar tarefas da imagem 23.",
  "layout.crm-task-filter-bar.filter-width": "Largura base das pills Dono, Prazo e Status da imagem 23.",
  "layout.crm-task-filter-bar.origin-width": "Largura fonte da pill Origem da imagem 23.",
  "layout.crm-task-filter-bar.priority-width": "Largura fonte da pill Prioridade da imagem 23.",
  "layout.crm-task-filter-bar.create-width": "Largura fonte do CTA Criar tarefa da imagem 23.",
  "layout.crm-task-queue-list.width": "Largura fonte da coluna Filas da imagem 23.",
  "layout.crm-task-queue-list.source-height": "Altura fonte da coluna Filas da imagem 23.",
  "layout.crm-task-queue-list.item-width": "Largura fonte das linhas de fila da imagem 23.",
  "layout.crm-task-table.width": "Largura fonte da tabela central de tarefas da imagem 23.",
  "layout.crm-task-table.height": "Altura fonte da tabela central de tarefas da imagem 23.",
  "layout.crm-task-table.inner-width": "Largura util da tabela central depois das bordas.",
  "layout.crm-task-table.columns": "Grid oficial de nove colunas da tabela central da imagem 23.",
  "control.crm-task-table.header-height": "Altura do cabecalho da tabela central da imagem 23.",
  "control.crm-task-table.row-height": "Altura das oito linhas fonte da tabela central da imagem 23.",
  "control.crm-task-table.footer-height": "Altura do footer com itens por pagina e paginacao.",
  "control.crm-task-table.cell-padding-x": "Padding horizontal interno das celulas da tabela central.",
  "control.crm-task-table.mode-width": "Largura dos chips de modo na coluna final da tabela central."
};

const tokenUsagePrefixes: Array<[string, string]> = [
  ["color.crm-empty-shell.", "Cores e superficies do clone 1:1 do shell vazio da imagem 79."],
  ["color.crm-browser.", "Cores do browser chrome do shell vazio extraidas da imagem 79."],
  ["color.crm-settings-section.", "Cores oficiais da secao de regras financeiras da imagem 62."],
  ["color.crm-conversation-list.", "Cores oficiais da lista lateral de conversas da imagem 24."],
  ["type.crm-empty-shell.", "Tipografia exata do titulo Jornadas na imagem 79."],
  ["layout.crm-empty-shell.stage.", "Dimensoes do canvas externo do clone da imagem 79."],
  ["layout.crm-empty-shell.window.", "Dimensoes da janela browser do clone da imagem 79."],
  ["layout.crm-browser.", "Posicionamento interno do browser chrome da imagem 79."],
  ["layout.crm-shell-brand.", "Posicionamento da marca Taliya no shell vazio da imagem 79."],
  ["layout.crm-list-detail.", "Grid oficial list/detail usado por tarefas, aprovacoes e detalhes operacionais."],
  ["layout.crm-task-filter-bar.", "Dimensoes oficiais do filtro de tarefas extraido da imagem 23."],
  ["layout.crm-task-queue-list.", "Dimensoes oficiais da lista lateral Filas extraida da imagem 23."],
  ["layout.crm-task-table.", "Dimensoes oficiais da tabela central de tarefas extraida da imagem 23."],
  ["layout.crm-three-pane.", "Grid oficial de tres paineis para inbox e experiencias com contexto persistente."],
  ["layout.crm-right-panel.", "Grid oficial com rail direito para setup, configuracoes, uso e suporte."],
  ["layout.crm-dashboard.", "Tracks oficiais para dashboards densos em 2, 3 e layout assimetrico."],
  ["layout.crm-kanban.", "Dimensoes oficiais de board e colunas kanban CRM."],
  ["layout.crm-weekly-calendar.", "Dimensoes oficiais da agenda semanal operacional."],
  ["layout.crm-setup-shell.", "Grid e posicionamento oficiais do setup shell."],
  ["layout.crm-access-shell.", "Grid e larguras oficiais do shell de acesso/assinatura."],
  ["layout.crm-settings-section.", "Grid oficial da secao de regras financeiras da imagem 62."],
  ["layout.crm-conversation-list.", "Grid oficial da lista lateral de conversas da imagem 24."],
  ["layout.crm-agent-catalog.", "Grid oficial do catalogo de agentes P2."],
  ["layout.crm-mode-selector.", "Grids oficiais dos cards de modo das imagens 54 e 56."],
  ["layout.crm-flow-builder.", "Grid oficial do fluxo explicativo da imagem 56."],
  ["layout.crm-domain-", "Grids reutilizaveis de metricas e fatos de componentes de dominio."],
  ["layout.crm-simulation-runner.", "Grid oficial do teste/simulacao de fluxo P2."],
  ["layout.crm-preflight-checklist.", "Grid oficial do checklist de publicação da imagem 59."],
  ["layout.crm-execution-receipt.", "Grid oficial do recibo de execução da imagem 70."],
  ["layout.crm-student-", "Grids oficiais do cabecalho e resumo operacional de aluno."],
  ["layout.crm-relationship-list.", "Grid oficial de relacoes e contatos contextuais."],
  ["shadow.crm-empty-shell.", "Elevacao do frame browser no clone da imagem 79."],
  ["shadow.crm-browser.", "Sombra interna dos controles de browser chrome da imagem 79."],
  ["shadow.crm-settings-section", "Elevacao oficial da secao de configuracoes da imagem 62."],
  ["shadow.crm-conversation-list", "Elevacao oficial dos cards de conversa da imagem 24."],
  ["control.press-offset", "Offset oficial de estado pressed em controles interativos."],
  ["control.opacity.", "Opacidades oficiais para disabled, muted, cancelled e estados bloqueados."],
  ["control.crm-browser.", "Anatomia dos controles do browser chrome da imagem 79."],
  ["control.crm-shell-brand.", "Dimensoes da marca Taliya no shell vazio da imagem 79."],
  ["control.height.", "Alturas base de controles."],
  ["control.padding.", "Padding horizontal base de controles."],
  ["control.icon.size.", "Tamanhos oficiais de icones dentro de primitives."],
  ["control.icon.stroke", "Stroke oficial dos icones lineares."],
  ["control.chip.", "Anatomia oficial de chip/filter chip."],
  ["control.icon-button.", "Anatomia oficial do IconButton: tamanhos, icone e indicador de alerta."],
  ["control.crm-surface.", "Anatomia de icones em superficies CRM compostas."],
  ["control.crm-kanban-card.", "Anatomia oficial de cards kanban CRM."],
  ["control.crm-calendar-card.", "Altura minima dos cards de aula/agenda CRM."],
  ["control.crm-settings-card.", "Anatomia oficial dos cards de hub de configuracoes."],
  ["control.crm-settings-section.", "Anatomia oficial da secao de regras financeiras da imagem 62."],
  ["control.crm-conversation-list.", "Anatomia oficial da lista lateral de inbox da imagem 24."],
  ["control.crm-task-table.", "Anatomia oficial da tabela central de tarefas da imagem 23."],
  ["control.crm-agent-card.", "Anatomia oficial dos cards de agentes do catalogo P2."],
  ["control.crm-mode-card.", "Altura, iconografia e indicador selecionado dos cards de modo de agente."],
  ["control.crm-flow-step-card.", "Altura oficial das etapas explicativas de fluxo."],
  ["control.crm-preflight-checklist.", "Altura e check preenchido oficiais do checklist horizontal de publicação."],
  ["control.crm-scenario-card.", "Altura e indicador oficial dos cards de cenário de simulação."],
  ["control.crm-phone-preview.", "Dimensões oficiais do preview de telefone/canal, incluindo frame, recibo e status bar."],
  ["control.crm-execution-timeline.", "Altura oficial das linhas de timeline de execução."],
  ["control.crm-execution-receipt.", "Densidade compacta da timeline dentro do recibo de execução da imagem 70."],
  ["control.crm-student-", "Dimensoes oficiais do cabecalho e resumo de aluno da imagem 28."],
  ["control.crm-relationship-panel.", "Dimensoes oficiais do painel Relacoes e familia do board 13."],
  ["control.crm-domain-row.", "Altura minima de linhas densas de dominio."],
  ["control.logo.", "Dimensoes oficiais do TaliyaLogo nas variantes wordmark, compact e mark."],
  ["control.avatar.", "Anatomia oficial de Avatar e AvatarStack."],
  ["control.badge.", "Dimensoes oficiais de badge, contador e dot."],
  ["control.status-dot.", "Dimensao oficial de status dot."],
  ["control.nav-pill.", "Anatomia oficial de NavPill."],
  ["control.menu.", "Anatomia de menu/dropdown e tooltip legado."],
  ["control.feedback.", "Anatomia compartilhada de Toast e InlineAlert."],
  ["control.toast.", "Anatomia compacta de Toast."],
  ["control.inline-alert.", "Anatomia compacta de InlineAlert."],
  ["control.filter-bar.", "Densidade e largura base de FilterBar."],
  ["control.crm-task-filter-bar.", "Anatomia 1:1 do filtro de tarefas da imagem 23."],
  ["control.crm-task-queue-list.", "Anatomia 1:1 da lista Filas da imagem 23."],
  ["control.field.", "Anatomia de Input, Select, Textarea e icones internos de campo."],
  ["control.password-toggle.", "Posicionamento oficial do controle de senha."],
  ["control.checkbox.", "Anatomia oficial de Checkbox."],
  ["control.toggle.", "Anatomia oficial de Toggle/Switch."],
  ["control.segmented.", "Anatomia oficial de SegmentedControl."],
  ["control.search.", "Anatomia de SearchInput."],
  ["control.message.", "Anatomia de MessageBubble."],
  ["control.composer.", "Anatomia de ComposerInput."],
  ["control.calendar.", "Anatomia de CalendarCell e CalendarEventBlock."],
  ["control.social.", "Anatomia de SocialAuthButton."],
  ["control.card.", "Densidade dos patterns de Card."],
  ["control.inline.", "Gap oficial de grupos inline."],
  ["control.list-icon.", "Dimensao oficial de ListIcon."],
  ["control.table.", "Densidade oficial de DataTable e TablePagination."],
  ["control.list.", "Densidade oficial de List e ListItem."],
  ["control.state.", "Anatomia de EmptyState, LoadingState e ErrorState."],
  ["control.skeleton.", "Anatomia de skeleton loading."],
  ["control.drawer.", "Densidade oficial de Drawer e seus slots."],
  ["control.modal.", "Dimensoes oficiais de Modal/ConfirmDialog."],
  ["control.popover.", "Dimensoes oficiais de Popover."],
  ["control.tooltip.", "Dimensoes oficiais de Tooltip."],
  ["control.progress.", "Anatomia oficial de ProgressBar."],
  ["control.flow-node.", "Anatomia oficial de FlowNode."],
  ["control.tabs.", "Alturas oficiais de Tabs."],
  ["control.timeline.", "Anatomia oficial de Timeline."],
  ["connector.", "Anatomia e cores de ConnectorLine."],
  ["chart.panel.", "Anatomia do ChartPanelPrimitive."],
  ["chart.line.", "Dimensoes e stroke do grafico de linha."],
  ["chart.bar.", "Dimensoes do grafico de barras."],
  ["chart.funnel.", "Dimensoes do funil."],
  ["chart.ranking.", "Dimensoes do ranking."],
  ["chart.heatmap.", "Dimensoes do heatmap."],
  ["chart.state.", "Area de estado vazio/loading em graficos."]
];

function usageForToken(name: string): string | undefined {
  return tokenUsage[name] ?? tokenUsagePrefixes.find(([prefix]) => name.startsWith(prefix))?.[1];
}

export function entriesByPrefix(prefixes: string[]): TokenEntry[] {
  return Object.entries(allTokens)
    .filter(([name]) => prefixes.some((prefix) => name.startsWith(prefix)))
    .map(([name, value]) => ({
      name,
      value,
      usage: usageForToken(name)
    }));
}

export function groupCountRows(): TokenEntry[] {
  return Object.entries(tokenGroups).map(([name, tokens]) => ({
    name,
    value: `${Object.keys(tokens).length} tokens`,
    usage: groupUsage[name]
  }));
}

export function TokenPage({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="sb-token-page">
      <header className="sb-token-hero">
        <p className="sb-token-kicker">Foundations / Tokens</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      {children}
    </main>
  );
}

export function TokenSection({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="sb-token-section">
      <div className="sb-token-section__header">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function TokenGrid({ entries, preview = "value" }: { entries: TokenEntry[]; preview?: "value" | "color" | "shadow" | "radius" }) {
  return (
    <div className="sb-token-card-grid">
      {entries.map((entry) => (
        <article className="sb-token-card" key={`${entry.name}-${entry.value}`}>
          <TokenPreview entry={entry} preview={preview} />
          <div className="sb-token-card__body">
            <strong>{entry.name}</strong>
            <code>{entry.value}</code>
            {entry.usage ? <p>{entry.usage}</p> : null}
            {entry.source ? <span>{entry.source}</span> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function TokenTable({ entries }: { entries: TokenEntry[] }) {
  return (
    <div className="sb-token-table" role="table">
      <div className="sb-token-table__row sb-token-table__row--head" role="row">
        <span role="columnheader">Token</span>
        <span role="columnheader">Valor</span>
        <span role="columnheader">Uso</span>
      </div>
      {entries.map((entry) => (
        <div className="sb-token-table__row" role="row" key={`${entry.name}-${entry.value}`}>
          <code role="cell">{entry.name}</code>
          <code role="cell">{entry.value}</code>
          <span role="cell">{entry.usage ?? entry.source ?? "-"}</span>
        </div>
      ))}
    </div>
  );
}

export function ScalePreview({ entries, kind }: { entries: TokenEntry[]; kind: "spacing" | "radius" | "density" }) {
  return (
    <div className={`sb-token-scale sb-token-scale--${kind}`}>
      {entries.map((entry) => (
        <div className="sb-token-scale__item" key={entry.name}>
          <div
            className="sb-token-scale__sample"
            style={{
              width: kind === "spacing" ? entry.value : undefined,
              height: kind === "spacing" || kind === "density" ? entry.value : undefined,
              borderRadius: kind === "radius" ? entry.value : undefined
            }}
          />
          <strong title={entry.name}>{entry.name}</strong>
          <code>{entry.value}</code>
        </div>
      ))}
    </div>
  );
}

export function TypographyPreview({ entries }: { entries: TokenEntry[] }) {
  const roles = [
    "display",
    "page-title",
    "panel-title",
    "card-title",
    "section-title",
    "body",
    "body-strong",
    "small",
    "caption",
    "badge",
    "button",
    "table-header",
    "table-cell",
    "numeric",
    "summary-number",
    "control-label",
    "nav-pill",
    "compact-title",
    "dense-body",
    "helper",
    "event-title",
    "quota-title",
    "chart-label",
    "overline"
  ];

  return (
    <div className="sb-token-type-list">
      {roles.map((role) => {
        const size = entries.find((entry) => entry.name === `type.${role}.size`)?.value;
        const lineHeight = entries.find((entry) => entry.name === `type.${role}.line-height`)?.value;
        const weight = entries.find((entry) => entry.name === `type.${role}.weight`)?.value;

        if (!size) {
          return null;
        }

        return (
          <article className="sb-token-type-row" key={role}>
            <span>{role}</span>
            <strong style={{ fontSize: size, lineHeight, fontWeight: weight }}>Taliya {role}</strong>
            <code>
              {size} / {lineHeight ?? "-"} / {weight ?? "-"}
            </code>
          </article>
        );
      })}
    </div>
  );
}

const groupUsage: Record<string, string> = {
  raw: "Valores extraidos das imagens aprovadas.",
  color: "Aliases semanticos para texto e acentos.",
  surface: "Camadas de fundo, canvas, painel, card e overlay.",
  border: "Bordas semanticas, larguras e estilos.",
  status: "Estados visuais reutilizados por chips, badges e alerts.",
  operationalState: "Mapeia estados de produto para status visuais.",
  quota: "Mapeia limites de uso para status visuais.",
  typography: "Escala tipografica completa do CRM.",
  spacing: "Escala base de espacamento.",
  layout: "Dimensoes macro de shell, pagina, drawer e grid.",
  density: "Gaps, alturas e densidades de operacao.",
  radius: "Escala e aliases semanticos de arredondamento.",
  shadow: "Elevacao para card, painel, overlay e frame.",
  control: "Dimensoes de controles, rows, tabelas, modais e popovers.",
  connector: "Valores base para linhas e pontos de fluxo.",
  chart: "Paleta e estrutura de graficos.",
  motion: "Duracoes e curvas de transicao.",
  focus: "Foco visivel e acessivel.",
  legacy: "Aliases temporarios para componentes ja criados."
};

function TokenPreview({ entry, preview }: { entry: TokenEntry; preview: "value" | "color" | "shadow" | "radius" }) {
  if (preview === "color") {
    return <div className="sb-token-preview sb-token-preview--color" style={{ background: entry.value }} />;
  }

  if (preview === "shadow") {
    return <div className="sb-token-preview sb-token-preview--shadow" style={{ boxShadow: entry.value }} />;
  }

  if (preview === "radius") {
    return <div className="sb-token-preview sb-token-preview--radius" style={{ borderRadius: entry.value }} />;
  }

  return <div className="sb-token-preview sb-token-preview--value">{entry.value}</div>;
}

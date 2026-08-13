/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Button, Chip, Icon, IconButton, Input, Panel, Select, StatusDot, Toggle, cn } from "@taliya/ui";

export interface FinancialSimulationPanelProps extends React.HTMLAttributes<HTMLElement> {
    onApprove?: () => void;
    onReject?: () => void;
}

export function FinancialSimulationPanel({ onApprove, onReject, className, ...props }: FinancialSimulationPanelProps) {
    return (<Panel compact className={cn("tcrm-image14-panel", "tcrm-financial-simulation", className)} data-component="FinancialSimulationPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>12</span><h3>Simulador financeiro antes/depois</h3></header>
      <div className="tcrm-financial-simulation__body">
        <strong>Situacao atual</strong><dl><div><dt>Plano atual</dt><dd>Plano Mensal · Reformer</dd></div><div><dt>Valor mensal</dt><dd>R$ 420,00</dd></div><div><dt>Vencimento</dt><dd>10 de cada mes</dd></div><div><dt>Prox. cobranca</dt><dd>10/06/2024</dd></div></dl>
        <strong>Alteracao proposta</strong><dl><div><dt>Novo plano</dt><dd>Plano Semestral · Reformer</dd></div><div><dt>Novo mensal</dt><dd>R$ 360,00</dd></div><div><dt>Vencimento</dt><dd>10 de cada mes</dd></div><div><dt>Inicio da mudanca</dt><dd>10/06/2024</dd></div></dl>
        <strong>Impacto da mudanca</strong><dl className="tcrm-financial-simulation__impact"><div><dt>Economia mensal</dt><dd>- R$ 60,00</dd></div><div><dt>Economia total (6 meses)</dt><dd>- R$ 360,00</dd></div><div><dt>Saldo creditos</dt><dd>R$ 20,00</dd></div><div><dt>Valor total no periodo</dt><dd>R$ 2.160,00</dd></div></dl>
        <aside><strong>Risco / atencao</strong><p>Contrato atual nao preve cancelamento antecipado.</p><p>Ha 1 parcela em aberto.</p></aside>
      </div>
      <footer><Button onClick={onReject} size="sm" variant="secondary">Rejeitar</Button><Button onClick={onApprove} size="sm" variant="primary">Aprovar</Button></footer>
    </Panel>);
}

function Reference15Header({ number, title }: {
    number: number;
    title: React.ReactNode;
}) {
    return <header className="tcrm-reference15-header"><span>{number}</span><h3>{title}</h3></header>;
}

export interface FlowSimulationPanelProps extends React.HTMLAttributes<HTMLElement> {
    onApprove?: () => void;
}

export function FlowSimulationPanel({ onApprove, className, ...props }: FlowSimulationPanelProps) {
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-flow-simulation-panel", className)} data-component="FlowSimulationPanel" {...props}>
    <Reference15Header number={3} title="Simulador de fluxo"/>
    <label>Entrada de teste<Input aria-label="Entrada de teste" defaultValue={'Cliente envia: "Quero saber sobre precos."'} fieldSize="sm"/></label>
    <label>Resultado esperado<Input aria-label="Resultado esperado" defaultValue="Enviar apresentacao de plano e agendar follow-up." fieldSize="sm"/></label>
    <dl><div><dt>Risco</dt><dd><StatusDot status="warning"/> Medio</dd></div><div><dt>Custo/cota estimada</dt><dd>0,024 creditos</dd></div><div><dt>Tempo estimado</dt><dd>8,2 s</dd></div></dl>
    <Button leadingIcon="send" onClick={onApprove} size="sm" variant="primary">Aprovar publicacao</Button>
  </Panel>;
}

export interface PublicationPreflightPanelProps extends React.HTMLAttributes<HTMLElement> {
    onPublish?: () => void;
    onSaveDraft?: () => void;
}

export function PublicationPreflightPanel({ onPublish, onSaveDraft, className, ...props }: PublicationPreflightPanelProps) {
    const rows = [
        ["Dados necessarios", "Concluido", "success"], ["Permissoes", "Concluido", "success"],
        ["Cota disponivel", "Atencao", "warning"], ["Politica", "Concluido", "success"], ["Status geral", "Pronto para revisao", "info"]
    ] as const;
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-publication-preflight", className)} data-component="PublicationPreflightPanel" {...props}>
    <Reference15Header number={4} title="Preflight antes de publicar"/>
    <div className="tcrm-publication-preflight__rows">{rows.map(([label, status, tone]) => <div key={label}><Icon name={tone === "warning" ? "alert" : "checkCircle"} size="sm" tone={tone}/><span>{label}</span><Icon name={tone === "warning" ? "alert" : "check"} size="sm" tone={tone}/><Chip tone={tone}>{status}</Chip></div>)}</div>
    <footer><Button leadingIcon="send" onClick={onPublish} size="sm" variant="primary">Publicar</Button><Button onClick={onSaveDraft} size="sm" variant="secondary">Salvar rascunho</Button></footer>
  </Panel>;
}

export interface ExecutionTraceTableProps extends React.HTMLAttributes<HTMLElement> {
    onViewAll?: () => void;
}

export function ExecutionTraceTable({ onViewAll, className, ...props }: ExecutionTraceTableProps) {
    const rows = [
        ["1", "Receber mensagem", "WhatsApp Webhook", "Sucesso", "0,45 s", "0,001", "-"],
        ["2", "Verificar elegibilidade", "Regra de negocio", "Sucesso", "0,32 s", "0,002", "-"],
        ["3", "Buscar dados do cliente", "Taliya CRM API", "Sucesso", "0,78 s", "0,006", "-"],
        ["4", "Gerar resposta (LLM)", "Assistente de texto", "Em andamento", "2,31 s", "0,013", "-"],
        ["5", "Enviar mensagem", "WhatsApp API", "Falhou", "0,21 s", "0,002", "Timeout"],
        ["6", "Registrar interacao", "Taliya CRM API", "Pendente", "-", "-", "-"]
    ];
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-execution-trace", className)} data-component="ExecutionTraceTable" {...props}>
    <Reference15Header number={5} title="Trace de execucao"/>
    <div className="tcrm-execution-trace__table" role="table"><div role="row"><span role="columnheader">Etapa executada</span><span role="columnheader">Ferramenta usada</span><span role="columnheader">Status</span><span role="columnheader">Duracao</span><span role="columnheader">Custo</span><span role="columnheader">Erro</span></div>{rows.map((row) => <div key={row[0]} role="row"><span role="cell"><b>{row[0]}</b> {row[1]}</span><span role="cell">{row[2]}</span><span role="cell"><Chip tone={row[3] === "Falhou" ? "danger" : row[3] === "Em andamento" ? "info" : row[3] === "Pendente" ? "neutral" : "success"}>{row[3]}</Chip></span><span role="cell">{row[4]}</span><span role="cell">{row[5]}</span><span role="cell" className={row[6] !== "-" ? "tcrm-reference15-danger" : undefined}>{row[6]}</span></div>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver trace completo</Button>
  </Panel>;
}

export interface AgentIncidentPanelProps extends React.HTMLAttributes<HTMLElement> {
    onReprocess?: () => void;
    onCreateTask?: () => void;
    onViewDetails?: () => void;
}

export function AgentIncidentPanel({ onReprocess, onCreateTask, onViewDetails, className, ...props }: AgentIncidentPanelProps) {
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-agent-incident", className)} data-component="AgentIncidentPanel" {...props}>
    <Reference15Header number={6} title="Incidente de agente"/>
    <dl><div><dt>Causa</dt><dd><Chip tone="danger">Falha de execucao</Chip></dd></div><div><dt>Impacto</dt><dd>Cliente nao recebeu resposta.</dd></div><div><dt>Objeto afetado</dt><dd>#CS-1043 · Joao Silva</dd></div><div><dt>Fallback manual</dt><dd className="tcrm-reference15-success"><Icon name="check" size="sm"/> Tarefa criada automaticamente</dd></div></dl>
    <footer><Button leadingIcon="refresh" onClick={onReprocess} size="sm" variant="primary">Reprocessar com seguranca</Button><Button leadingIcon="clipboard" onClick={onCreateTask} size="sm" variant="secondary">Criar tarefa</Button></footer>
    <Button className="tcrm-reference15-link" onClick={onViewDetails} size="sm" trailingIcon="arrowRight" variant="ghost">Ver mais detalhes</Button>
  </Panel>;
}

export interface EvaluationQualityPanelProps extends React.HTMLAttributes<HTMLElement> {
    onViewReport?: () => void;
}

export function EvaluationQualityPanel({ onViewReport, className, ...props }: EvaluationQualityPanelProps) {
    const metrics = [["Taxa de sucesso", "94,2%", "↑ 3,1 pp", "success"], ["Falhas", "5,8%", "↓ 1,2 pp", "danger"], ["Revisao humana", "18,6%", "↓ 2,4 pp", "info"], ["Confianca media", "82%", "↑ 4 pp", "success"], ["Casos problematicos", "128", "↑ 18 hoje", "warning"], ["SLA atendido", "98,7%", "↑ 1,5 pp", "success"]] as const;
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-evaluation-quality", className)} data-component="EvaluationQualityPanel" {...props}>
    <Reference15Header number={7} title="Painel de qualidade / evals"/>
    <div>{metrics.map(([label, value, delta, tone]) => <section key={label}><span>{label}</span><strong>{value}</strong><small className={`tcrm-reference15-${tone}`}>{delta}</small></section>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewReport} size="sm" trailingIcon="arrowRight" variant="ghost">Ver relatorio completo</Button>
  </Panel>;
}

export interface PrivacyRequestTableProps extends React.HTMLAttributes<HTMLElement> {
    onOpenRequest?: (requestId: string) => void;
    onViewAll?: () => void;
}

export function PrivacyRequestTable({ onOpenRequest, onViewAll, className, ...props }: PrivacyRequestTableProps) {
    const rows = [["REQ-1287", "Joao Silva", "Concluida", "success"], ["REQ-1286", "Ana Costa", "Em andamento", "info"], ["REQ-1285", "Mariana A.", "Aguardando dados", "warning"], ["REQ-1284", "Pedro L.", "Negada", "danger"]] as const;
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-privacy-request", className)} data-component="PrivacyRequestTable" {...props}>
    <Reference15Header number={10} title="Privacidade / LGPD"/>
    <div className="tcrm-privacy-request__table" role="table"><div role="row"><span role="columnheader">Solicitacao</span><span role="columnheader">Validar identidade</span><span role="columnheader">Exportar</span><span role="columnheader">Anonimizar</span><span role="columnheader">Negar</span><span role="columnheader">Status</span></div>{rows.map(([id, person, status, tone]) => <div key={id} role="row" onClick={() => onOpenRequest?.(id)}><span role="cell">{id}<small>{person}</small></span><Icon name="check" role="cell" size="sm" tone="success"/><Icon name="download" role="cell" size="sm"/><Icon name="lock" role="cell" size="sm"/><Icon name="x" role="cell" size="sm"/><Chip role="cell" tone={tone}>{status}</Chip></div>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as solicitacoes</Button>
  </Panel>;
}

export interface SupportGrantPanelProps extends React.HTMLAttributes<HTMLElement> {
    onTemporaryAccessChange?: (enabled: boolean) => void;
    onRevoke?: () => void;
}

export function SupportGrantPanel({ onTemporaryAccessChange, onRevoke, className, ...props }: SupportGrantPanelProps) {
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-support-grant", className)} data-component="SupportGrantPanel" {...props}>
    <Reference15Header number={11} title="Grant de suporte"/>
    <div className="tcrm-support-grant__field"><span>Acesso temporario</span><Toggle aria-label="Acesso temporario" compact defaultPressed onPressedChange={onTemporaryAccessChange}/></div>
    <div className="tcrm-support-grant__field"><span>Expiracao</span><Input aria-label="Expiracao" defaultValue="30/04/2024 18:00" fieldSize="sm" trailingIcon="calendar"/></div>
    <div className="tcrm-support-grant__field"><span>Escopo</span><Select aria-label="Escopo" defaultValue="contas" fieldSize="sm" options={[{ value: "contas", label: "Contas e Casos" }]}/></div>
    <div className="tcrm-support-grant__field"><span>Motivo</span><Input aria-label="Motivo" defaultValue="Suporte a incidente" fieldSize="sm"/></div>
    <Button leadingIcon="trash" onClick={onRevoke} size="sm" variant="destructive">Revogar acesso</Button>
  </Panel>;
}

export interface AdvancedReportsPanelProps extends React.HTMLAttributes<HTMLElement> {
    onViewAll?: () => void;
}

export function AdvancedReportsPanel({ onViewAll, className, ...props }: AdvancedReportsPanelProps) {
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-advanced-reports", className)} data-component="AdvancedReportsPanel" {...props}>
    <Reference15Header number={12} title="Relatorios avancados"/>
    <div className="tcrm-advanced-reports__charts">
      <section><strong>Grafico de linha</strong><small>Conversas · Conversoes</small><svg aria-hidden="true" className="tcrm-reference15-line-chart" viewBox="0 0 120 56"><polyline points="0,42 18,33 36,37 54,19 72,29 90,14 108,21 120,8"/><polyline points="0,50 18,44 36,48 54,38 72,42 90,29 108,35 120,24"/></svg></section>
      <section><strong>Grafico de barras</strong><small>Novos clientes</small><div className="tcrm-reference15-bar-chart">{[5, 8, 6, 11, 7, 13, 9, 12, 6, 4].map((height, index) => <i key={`bar-${height}-${index}`} style={{ height: `${height * 4}px` }}/>)}</div></section>
      <section><strong>Funil</strong><div className="tcrm-reference15-funnel"><i>Visitantes 24.890</i><i>Leads 6.152</i><i>Oportunidades 2.489</i><i>Clientes 1.102</i></div></section>
      <section><strong>Ranking de agentes</strong>{["Sam Frank 428", "Nikki Olaw 352", "Maria Lopes 301", "Joao Silva 287", "Carlos Lima 241"].map((row) => <span key={row}>{row}</span>)}</section>
      <section><strong>Heatmap de ocupacao</strong><small>Seg · Ter · Qua · Qui · Sex</small><div className="tcrm-reference15-heatmap">{Array.from({ length: 25 }, (_, index) => <i key={`heatmap-cell-${index}`} style={{ opacity: 0.2 + (index % 5) * 0.15 }}/>)}</div></section>
    </div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver painel completo</Button>
  </Panel>;
}

export interface ExportQueuePanelProps extends React.HTMLAttributes<HTMLElement> {
    onAction?: (exportId: string) => void;
    onViewAll?: () => void;
}

export function ExportQueuePanel({ onAction, onViewAll, className, ...props }: ExportQueuePanelProps) {
    const rows = [["conversas", "Relatorio de conversas", "CSV", "Agendada", "-", "info"], ["clientes", "Base de clientes", "XLSX", "Exportando", "62%", "info"], ["financeiro", "Relatorio financeiro", "PDF", "Pronto", "100%", "success"], ["auditoria", "Logs de auditoria", "CSV", "Falhou", "-", "danger"]] as const;
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-export-queue", className)} data-component="ExportQueuePanel" {...props}>
    <Reference15Header number={13} title="Exportacoes"/>
    <div className="tcrm-export-queue__table" role="table"><div role="row"><span role="columnheader">Exportacao</span><span role="columnheader">Formato</span><span role="columnheader">Agendada para</span><span role="columnheader">Status</span><span role="columnheader">Progresso</span><span role="columnheader">Acoes</span></div>{rows.map(([id, label, format, status, progress, tone], index) => <div key={id} role="row"><span role="cell">{label}</span><span role="cell">{format}</span><span role="cell">28/04/2024 {10 - index}:0{index}</span><Chip role="cell" tone={tone}>{status}</Chip><span role="cell">{progress}</span><span role="cell"><IconButton icon={status === "Pronto" ? "download" : status === "Falhou" ? "refresh" : "more"} label={`Acao de ${label}`} onClick={() => onAction?.(id)} size="sm" variant="ghost"/></span></div>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as exportacoes</Button>
  </Panel>;
}

export interface SegmentCommunicationPanelProps extends React.HTMLAttributes<HTMLElement> {
    onEdit?: () => void;
    onViewAudience?: () => void;
    onApprove?: () => void;
    onSchedule?: () => void;
}

export function SegmentCommunicationPanel({ onEdit, onViewAudience, onApprove, onSchedule, className, ...props }: SegmentCommunicationPanelProps) {
    return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-segment-communication", className)} data-component="SegmentCommunicationPanel" {...props}>
    <Reference15Header number={14} title="Segmentos e comunicados"/>
    <div className="tcrm-segment-communication__body"><section><span>Construtor do segmento</span><strong>Clientes inativos &gt; 60 dias</strong><Button onClick={onEdit} size="sm" variant="ghost">Editar</Button><span>Publico elegivel</span><strong>12.843 contatos</strong><Button onClick={onViewAudience} size="sm" variant="ghost">Ver lista</Button><span>Consentimento</span><strong className="tcrm-reference15-success">98,6% com consentimento</strong></section><section><span>Preview da mensagem</span><p>Ola {'{nome}'}, sentimos sua falta! Temos novidades que podem te interessar.</p><footer><span>Custo estimado<br /><strong>0,86 creditos</strong></span><span>Canais<br /><Icon name="whatsapp" size="sm"/> <Icon name="mail" size="sm"/> <Icon name="message" size="sm"/></span></footer></section></div>
    <footer><Button leadingIcon="send" onClick={onApprove} size="sm" variant="primary">Aprovar envio</Button><Button leadingIcon="calendar" onClick={onSchedule} size="sm" variant="secondary">Agendar</Button></footer>
  </Panel>;
}

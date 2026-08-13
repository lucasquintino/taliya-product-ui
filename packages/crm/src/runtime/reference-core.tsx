/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Avatar, Button, Chip, ConflictCard, DocumentPreview, FileUpload, Icon, IconButton, InlineAlert, MoneyInput, Panel, PrimitiveButton, Select, cn } from "@taliya/ui";

import type { ComponentTone } from "@taliya/ui";

export interface ReplacementMatcherCandidate {
    id: string;
    name: React.ReactNode;
    initials?: string;
    avatarSrc?: string;
    priority: React.ReactNode;
    schedule: React.ReactNode;
    actionLabel: React.ReactNode;
}

const image14MatcherCandidates: ReplacementMatcherCandidate[] = [
    { id: "ana", name: "Ana Beatriz", initials: "AB", priority: "Alta", schedule: "Qua 29/05 · 09:00", actionLabel: "Convidar" },
    { id: "bruno", name: "Bruno Lima", initials: "BL", priority: "Media", schedule: "Qua 29/05 · 11:00", actionLabel: "Reservar" },
    { id: "carla", name: "Carla Mendes", initials: "CM", priority: "Baixa", schedule: "Qui 30/05 · 10:00", actionLabel: "Convidar" }
];

export interface ReplacementMatcherPanelProps extends React.HTMLAttributes<HTMLElement> {
    candidates?: ReplacementMatcherCandidate[];
    onCandidateAction?: (candidate: ReplacementMatcherCandidate) => void;
    onViewAlternatives?: () => void;
}

export function ReplacementMatcherPanel({ candidates = image14MatcherCandidates, onCandidateAction, onViewAlternatives, className, ...props }: ReplacementMatcherPanelProps) {
    return (<Panel compact className={cn("tcrm-image14-panel", "tcrm-replacement-matcher", className)} data-component="ReplacementMatcherPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>5</span><h3>Matcher de reposicao</h3></header>
      <dl className="tcrm-replacement-matcher__summary">
        <div><dt>Credito disponivel</dt><dd>1 aula <small>Vence em 15/06/2024</small></dd></div>
        <div><dt>Vagas compativeis</dt><dd>3 vagas <small>Prox. 7 dias</small></dd></div>
        <div><dt>Melhor encaixe</dt><dd>Qua, 29/05 · 09:00 <small>Reformer · Sala 2</small></dd></div>
      </dl>
      <div className="tcrm-replacement-matcher__table" role="table" aria-label="Candidatos para reposicao">
        <div role="row"><span role="columnheader">Candidato (3)</span><span role="columnheader">Prioridade</span><span role="columnheader">Horario</span><span role="columnheader">Status</span></div>
        {candidates.map((candidate) => (<div key={candidate.id} role="row">
            <span role="cell"><Avatar name={candidate.initials ?? String(candidate.name)} size="xs" src={candidate.avatarSrc}/> {candidate.name}</span>
            <span role="cell">{candidate.priority}</span>
            <span role="cell">{candidate.schedule}</span>
            <span role="cell"><Button onClick={() => onCandidateAction?.(candidate)} size="sm" variant="ghost">{candidate.actionLabel}</Button></span>
          </div>))}
      </div>
      <footer><InlineAlert tone="danger">Conflito: Sala 2 indisponivel em 28/05 as 09:00.</InlineAlert><Button onClick={onViewAlternatives} size="sm" variant="secondary">Ver alternativas</Button></footer>
    </Panel>);
}

export interface WaitlistRow {
    id: string;
    name: React.ReactNode;
    priority: React.ReactNode;
    availability: React.ReactNode;
    origin: React.ReactNode;
    status: React.ReactNode;
    tone?: ComponentTone;
}

const image14WaitlistRows: WaitlistRow[] = [
    { id: "juliana", name: "Juliana Costa", priority: "Alta", availability: "Ter/Qui 09-11h", origin: "Website", status: "Aguardando", tone: "warning" },
    { id: "rafaela", name: "Rafaela Dias", priority: "Media", availability: "Qua/Sex 08-10h", origin: "Indicacao", status: "Convidado", tone: "info" },
    { id: "lucas", name: "Lucas Martins", priority: "Media", availability: "Seg/Qua 18-20h", origin: "Instagram", status: "Enviado", tone: "success" },
    { id: "patricia", name: "Patricia Nunes", priority: "Baixa", availability: "Sab 08-12h", origin: "Anterior", status: "Nao recebeu", tone: "neutral" },
    { id: "camila", name: "Camila Rocha", priority: "Baixa", availability: "Ter/Sex 17-19h", origin: "Website", status: "Aguardando", tone: "warning" }
];

export interface WaitlistPanelProps extends React.HTMLAttributes<HTMLElement> {
    rows?: WaitlistRow[];
    onRowSelect?: (row: WaitlistRow) => void;
}

export function WaitlistPanel({ rows = image14WaitlistRows, onRowSelect, className, ...props }: WaitlistPanelProps) {
    return (<Panel compact className={cn("tcrm-image14-panel", "tcrm-waitlist-panel", className)} data-component="WaitlistPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>6</span><h3>Lista de espera</h3></header>
      <div className="tcrm-waitlist-panel__table" role="table" aria-label="Lista de espera">
        <div role="row"><span role="columnheader">Interessado</span><span role="columnheader">Prioridade</span><span role="columnheader">Disponibilidade</span><span role="columnheader">Origem</span><span role="columnheader">Status convite</span></div>
        {rows.map((row) => (<PrimitiveButton key={row.id} onClick={() => onRowSelect?.(row)} role="row" type="button">
            <span role="cell">{row.name}</span><span role="cell"><Chip showDot={false} tone={row.priority === "Alta" ? "warning" : row.priority === "Media" ? "info" : "success"}>{row.priority}</Chip></span><span role="cell">{row.availability}</span><span role="cell">{row.origin}</span><span role="cell"><Chip showDot={false} tone={row.tone}>{row.status}</Chip></span>
          </PrimitiveButton>))}
      </div>
    </Panel>);
}

export interface ResourceConflictPanelProps extends React.HTMLAttributes<HTMLElement> {
    onApply?: () => void;
    onView?: () => void;
}

export function ResourceConflictPanel({ onApply, onView, className, ...props }: ResourceConflictPanelProps) {
    return (<Panel compact className={cn("tcrm-image14-panel", "tcrm-resource-conflict-panel", className)} data-component="ResourceConflictPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>7</span><h3>Conflito de recurso</h3></header>
      <ConflictCard compact description="Terca, 21/05 · 13:00 - 14:00" facts={[{ label: "Aulas afetadas", value: "2 aulas" }, { label: "Impacto", value: "12 alunos" }, { label: "Recurso", value: "Sala 2" }]} onApply={() => onApply?.()} onView={() => onView?.()} state="danger" suggestion="Mover para Sala 3" title="Sala ou professor indisponivel"/>
    </Panel>);
}

export interface DocumentViewerPanelProps extends React.HTMLAttributes<HTMLElement> {
    selectedPageId?: string;
    onPageSelect?: (pageId: string) => void;
    onDownload?: () => void;
    onSend?: () => void;
}

export function DocumentViewerPanel({ selectedPageId = "1", onPageSelect, onDownload, onSend, className, ...props }: DocumentViewerPanelProps) {
    return (<Panel compact className={cn("tcrm-image14-panel", "tcrm-document-viewer-panel", className)} data-component="DocumentViewerPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>8</span><h3>Viewer de documento/contrato</h3></header>
      <DocumentPreview client="Cliente: Ana Beatriz Souza" compact date="Data: 15/04/2024" history={[{ id: "h1", label: "Assinado por Ana Beatriz", time: "16/04/2024 10:32" }, { id: "h2", label: "Enviado para assinatura", time: "15/04/2024 09:15" }]} onDownload={() => onDownload?.()} onPageSelect={onPageSelect} onSend={() => onSend?.()} pages={[{ id: "1", label: "1" }, { id: "2", label: "2" }]} selectedPageId={selectedPageId} state="signed" title="Contrato de Prestacao de Servicos"/>
    </Panel>);
}

export type UploadReceiptState = "attached" | "pending" | "approved" | "error";

export interface UploadReceiptItem {
    id: string;
    title: React.ReactNode;
    meta: React.ReactNode;
    state: UploadReceiptState;
    detail?: React.ReactNode;
}

const image14UploadReceipts: UploadReceiptItem[] = [
    { id: "attached", title: "recibo_abril_2024.pdf", meta: "245 KB · PDF", state: "attached" },
    { id: "pending", title: "comprovante_(1).jpg", meta: "1.2 MB · JPG", state: "pending", detail: "Enviado em 20/05 14:32" },
    { id: "approved", title: "recibo_maio_2024.pdf", meta: "231 KB · PDF", state: "approved", detail: "Aprovado em 21/05 09:10" },
    { id: "error", title: "comprovante_(1).jpg", meta: "1.2 MB · JPG", state: "error", detail: "Falha na conexao" }
];

export interface UploadReceiptPanelProps extends React.HTMLAttributes<HTMLElement> {
    items?: UploadReceiptItem[];
    onUpload?: () => void;
    onItemAction?: (item: UploadReceiptItem) => void;
}

export function UploadReceiptPanel({ items = image14UploadReceipts, onUpload, onItemAction, className, ...props }: UploadReceiptPanelProps) {
    return (<Panel compact className={cn("tcrm-image14-panel", "tcrm-upload-receipt-panel", className)} data-component="UploadReceiptPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>9</span><h3>Upload / anexo / comprovante</h3></header>
      <div className="tcrm-upload-receipt-panel__content">
        <FileUpload actionLabel="Selecionar" className="tcrm-upload-receipt-panel__dropzone" description="PDF, JPG, PNG ate 10MB" onClick={onUpload} title="Arraste o arquivo aqui ou clique para selecionar"/>
        {items.map((item) => (<article className={cn("tcrm-upload-receipt-panel__item", `tcrm-upload-receipt-panel__item--${item.state}`)} key={item.id}>
            <small>{item.state === "attached" ? "Arquivo anexado" : item.state === "pending" ? "Comprovante pendente" : item.state === "approved" ? "Comprovante aprovado" : "Erro de upload"}</small>
            <div><Icon name={item.state === "error" ? "alertCircle" : "fileText"}/><span><strong>{item.title}</strong><small>{item.meta}</small></span><IconButton icon="moreVertical" label={`Opcoes de ${String(item.title)}`} onClick={() => onItemAction?.(item)} size="sm" variant="ghost"/></div>
            {item.detail ? <footer>{item.detail}</footer> : null}
            {item.state !== "attached" ? <Chip showDot={false} tone={item.state === "approved" ? "success" : item.state === "pending" ? "warning" : "danger"}>{item.state === "approved" ? "Aprovado" : item.state === "pending" ? "Pendente" : "Tentar novamente"}</Chip> : <Icon name="checkCircle"/>}
          </article>))}
      </div>
    </Panel>);
}

export interface ReconciliationSummaryRow {
    id: string;
    description: React.ReactNode;
    dueDate: React.ReactNode;
    expected: React.ReactNode;
    received: React.ReactNode;
    difference: React.ReactNode;
    status: React.ReactNode;
    tone?: ComponentTone;
}

const image14ReconciliationRows: ReconciliationSummaryRow[] = [
    { id: "mp", description: "Mensalidade · Maio/2024 · MP", dueDate: "10/05/2024", expected: "R$ 320,00", received: "R$ 320,00", difference: "R$ 0,00", status: "Conciliado", tone: "success" },
    { id: "ref", description: "Mensalidade · Maio/2024 · REF", dueDate: "10/05/2024", expected: "R$ 420,00", received: "R$ 400,00", difference: "- R$ 20,00", status: "Pendente", tone: "warning" }
];

export interface ReconciliationSummaryTableProps extends React.HTMLAttributes<HTMLElement> {
    rows?: ReconciliationSummaryRow[];
    onReconcile?: (row: ReconciliationSummaryRow) => void;
}

export function ReconciliationSummaryTable({ rows = image14ReconciliationRows, onReconcile, className, ...props }: ReconciliationSummaryTableProps) {
    return (<Panel compact className={cn("tcrm-image14-panel", "tcrm-reconciliation-summary", className)} data-component="ReconciliationSummaryTable" {...props}>
      <header className="tcrm-image14-panel__header"><span>10</span><h3>Linha de conciliacao</h3></header>
      <div className="tcrm-reconciliation-summary__table" role="table" aria-label="Linha de conciliacao">
        <div role="row"><span role="columnheader">Descricao</span><span role="columnheader">Vencimento</span><span role="columnheader">Pagamento esperado</span><span role="columnheader">Pagamento recebido</span><span role="columnheader">Diferenca</span><span role="columnheader">Status</span><span role="columnheader">Acao</span></div>
        {rows.map((row) => <div key={row.id} role="row"><strong role="cell">{row.description}</strong><span role="cell">{row.dueDate}</span><span role="cell">{row.expected}</span><span role="cell">{row.received}</span><span className={row.id === "ref" ? "tcrm-image14-danger" : undefined} role="cell">{row.difference}</span><span role="cell"><Chip showDot={false} tone={row.tone}>{row.status}</Chip></span><span role="cell"><IconButton icon={row.id === "ref" ? "check" : "link"} label={`Conciliar ${String(row.description)}`} onClick={() => onReconcile?.(row)} size="sm" variant={row.id === "ref" ? "selected" : "ghost"}/></span></div>)}
      </div>
    </Panel>);
}

export interface MoneyInputGroupProps extends React.HTMLAttributes<HTMLElement> {
    values?: {
        value: string;
        discount: string;
        fine: string;
        installment: string;
        invalid: string;
    };
    onInstallmentChange?: (value: string) => void;
}

export function MoneyInputGroup({ values = { value: "320,00", discount: "32,00", fine: "9,60", installment: "3", invalid: "0,00" }, onInstallmentChange, className, ...props }: MoneyInputGroupProps) {
    return (<Panel compact className={cn("tcrm-image14-panel", "tcrm-money-input-group", className)} data-component="MoneyInputGroup" {...props}>
      <header className="tcrm-image14-panel__header"><span>11</span><h3>Input de valor / moeda</h3></header>
      <div className="tcrm-money-input-group__fields">
        <label><span>Valor</span><MoneyInput aria-label="Valor" defaultValue={values.value} fieldSize="sm" fieldState="success"/></label>
        <label><span>Desconto</span><MoneyInput aria-label="Desconto" defaultValue={values.discount} fieldSize="sm" fieldState="success"/></label>
        <label><span>Multa</span><MoneyInput aria-label="Multa" defaultValue={values.fine} fieldSize="sm" fieldState="success"/></label>
        <label><span>Parcela</span><Select aria-label="Parcela" fieldSize="sm" onValueChange={onInstallmentChange} options={[{ value: "1", label: "1 / 12" }, { value: "2", label: "2 / 12" }, { value: "3", label: "3 / 12" }]} value={values.installment}/></label>
        <label><span className="tcrm-image14-danger">Valor (erro)</span><MoneyInput aria-label="Valor com erro" defaultValue={values.invalid} error="Valor deve ser maior que zero." fieldSize="sm"/></label>
      </div>
    </Panel>);
}

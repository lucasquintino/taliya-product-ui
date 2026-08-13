/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Avatar, Badge, Button, ChecklistItem, Chip, DataTable, Icon, IconButton, Panel, Select, Stepper, Timeline, Toggle, cn } from "@taliya/ui";

import type { ComponentTone, IconName, StepperStep, TabItem } from "@taliya/ui";

import { ProfileTabs } from "../patterns/shell.js";

const image13SetupSteps: StepperStep[] = [
    { id: "source", label: "Fonte de dados", description: "Concluído", state: "complete" },
    { id: "import", label: "Importação", description: "Concluído", state: "complete" },
    { id: "mapping", label: "Mapeamento", description: "Em andamento", state: "current" },
    { id: "duplicates", label: "Duplicidades", description: "Bloqueado", state: "blocked" },
    { id: "activation", label: "Ativação", description: "Pendente", state: "pending" }
];

export interface SetupWizardPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    steps?: StepperStep[];
    currentStepId?: string;
    progress?: number;
    onStepSelect?: (stepId: string) => void;
}

export function SetupWizardPanel({ steps = image13SetupSteps, currentStepId = "mapping", progress = 60, onStepSelect, className, ...props }: SetupWizardPanelProps) {
    return (<Panel compact className={cn("tcrm-reference-panel", "tcrm-setup-wizard-panel", className)} data-component="SetupWizardPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>1</span><h3>Wizard / stepper de setup</h3></header>
      <Stepper compact currentStepId={currentStepId} onStepSelect={onStepSelect} progress={progress} steps={steps}/>
    </Panel>);
}

export interface ActivationChecklistItem {
    id: string;
    title: React.ReactNode;
    owner: React.ReactNode;
    ownerAvatarSrc?: string;
    actionLabel: string;
    state: "complete" | "incomplete" | "warning" | "blocked";
    disabled?: boolean;
}

const image13ActivationItems: ActivationChecklistItem[] = [
    { id: "source", title: "Conectar fonte de dados", owner: "Sam Frank", actionLabel: "Revisar", state: "complete" },
    { id: "consent", title: "Revisar consentimento", owner: "Nikki Olaw", actionLabel: "Abrir", state: "incomplete" },
    { id: "owners", title: "Validar responsáveis", owner: "João Silva", actionLabel: "Validar", state: "warning" },
    { id: "publish", title: "Publicar perfis", owner: "Sara Alves", actionLabel: "Bloqueado", state: "blocked", disabled: true }
];

export interface ActivationChecklistPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onToggle"> {
    items?: ActivationChecklistItem[];
    onItemAction?: (item: ActivationChecklistItem) => void;
    onItemToggle?: (item: ActivationChecklistItem, checked: boolean) => void;
    onItemMenu?: (item: ActivationChecklistItem) => void;
}

export function ActivationChecklistPanel({ items = image13ActivationItems, onItemAction, onItemToggle, onItemMenu, className, ...props }: ActivationChecklistPanelProps) {
    return (<Panel compact className={cn("tcrm-reference-panel", "tcrm-activation-checklist", className)} data-component="ActivationChecklistPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>2</span><h3>Checklist de ativação</h3></header>
      <div aria-hidden="true" className="tcrm-activation-checklist__columns"><span>Item</span><span>Responsável</span><span>Ação rápida</span><span /></div>
      <div className="tcrm-activation-checklist__rows" role="list">
        {items.map((item) => (<div key={item.id} role="listitem"><ChecklistItem actionDisabled={item.disabled} actionLabel={item.actionLabel} disabled={item.disabled} menu={<IconButton icon="more" label={`Abrir opções de ${String(item.title)}`} onClick={() => onItemMenu?.(item)} size="sm" variant="ghost"/>} onAction={() => onItemAction?.(item)} onToggle={(checked) => onItemToggle?.(item, checked)} owner={item.owner} ownerAvatarSrc={item.ownerAvatarSrc} state={item.state} title={item.title}/></div>))}
      </div>
    </Panel>);
}

export interface DataConflictRow {
    id: string;
    severity: "high" | "medium" | "low";
    object: React.ReactNode;
    description: React.ReactNode;
    suggestion: React.ReactNode;
    owner: React.ReactNode;
    ownerAvatarSrc?: string;
}

const image13ConflictRows: DataConflictRow[] = [
    { id: "cpf", severity: "high", object: "Aluno", description: "CPF duplicado em 2 registros", suggestion: "Revisar e mesclar", owner: "Sam Frank" },
    { id: "phone", severity: "medium", object: "Contato", description: "Telefone em formato inválido", suggestion: "Corrigir formato", owner: "Nikki Olaw" },
    { id: "email", severity: "medium", object: "Responsável", description: "E-mail já associado a outro", suggestion: "Confirmar vínculo", owner: "João Silva" },
    { id: "birth", severity: "low", object: "Aluno", description: "Data de nascimento ausente", suggestion: "Complementar", owner: "Sara Alves" }
];

export interface DataConflictQueueProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    rows?: DataConflictRow[];
    onRowSelect?: (row: DataConflictRow) => void;
    onViewAll?: () => void;
}

export function DataConflictQueue({ rows = image13ConflictRows, onRowSelect, onViewAll, className, ...props }: DataConflictQueueProps) {
    const severityLabels = { high: "Alta", medium: "Média", low: "Baixa" } as const;
    const severityTones = { high: "danger", medium: "warning", low: "info" } as const;
    return (<Panel compact className={cn("tcrm-reference-panel", "tcrm-data-conflict-queue", className)} data-component="DataConflictQueue" {...props}>
      <header className="tcrm-reference-panel__header"><span>6</span><h3>Fila de conflitos de dados</h3></header>
      <DataTable compact columns={[
            { key: "severity", header: "Severidade", width: "15%", render: (row) => <Chip showDot={false} tone={severityTones[row.severity]}>{severityLabels[row.severity]}</Chip> },
            { key: "object", header: "Objeto", width: "15%" },
            { key: "description", header: "Descrição do conflito", width: "30%" },
            { key: "suggestion", header: "Ação sugerida", width: "23%" },
            { key: "owner", header: "Responsável", width: "17%", render: (row) => <span className="tcrm-data-conflict-queue__owner"><Avatar name={String(row.owner)} size="xs" src={row.ownerAvatarSrc}/>{row.owner}</span> }
        ]} onRowClick={onRowSelect} rows={rows}/>
      <Button className="tcrm-reference-panel__link" onClick={onViewAll} size="sm" variant="ghost">Ver todos os conflitos</Button>
    </Panel>);
}

const image13ProfileTabs: TabItem[] = [
    { value: "summary", label: "Resumo", content: null },
    { value: "agenda", label: "Agenda", content: null },
    { value: "finance", label: "Financeiro", content: null },
    { value: "history", label: "Histórico", content: null },
    { value: "documents", label: <span className="tcrm-profile-tabs-panel__count">Documentos <Badge tone="info">3</Badge></span>, content: null },
    { value: "permissions", label: "Permissões", content: null }
];

export interface ProfileTabsPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    items?: TabItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}

export function ProfileTabsPanel({ items = image13ProfileTabs, value, defaultValue = "summary", onValueChange, className, ...props }: ProfileTabsPanelProps) {
    return (<Panel compact className={cn("tcrm-reference-panel", "tcrm-profile-tabs-panel", className)} data-component="ProfileTabsPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>8</span><h3>Abas internas de perfil</h3></header>
      <ProfileTabs defaultValue={defaultValue} density="compact" items={items} onValueChange={onValueChange} value={value}/>
    </Panel>);
}

export interface ConsentHistoryRow {
    id: string;
    date: React.ReactNode;
    consent: React.ReactNode;
    origin: React.ReactNode;
    actor: React.ReactNode;
}

const image13ConsentHistory: ConsentHistoryRow[] = [
    { id: "whatsapp", date: "28/04/2024 14:32", consent: "WhatsApp permitido", origin: "Web", actor: "Sam Frank" },
    { id: "marketing", date: "10/03/2024 09:11", consent: "Opt-out marketing", origin: "App", actor: "Nikki Olaw" },
    { id: "email", date: "05/12/2023 16:45", consent: "E-mail permitido", origin: "Web", actor: "João Silva" }
];

export interface ConsentPreferencesPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    whatsappAllowed?: boolean;
    marketingAllowed?: boolean;
    preferredChannel?: string;
    preferredTime?: string;
    history?: ConsentHistoryRow[];
    onPreferenceChange?: (field: string, value: string | boolean) => void;
    onViewHistory?: () => void;
}

export function ConsentPreferencesPanel({ whatsappAllowed = true, marketingAllowed = false, preferredChannel = "whatsapp", preferredTime = "morning", history = image13ConsentHistory, onPreferenceChange, onViewHistory, className, ...props }: ConsentPreferencesPanelProps) {
    return (<Panel compact className={cn("tcrm-reference-panel", "tcrm-consent-preferences", className)} data-component="ConsentPreferencesPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>10</span><h3>Consentimento e preferências</h3></header>
      <div className="tcrm-consent-preferences__controls">
        <label><span>WhatsApp permitido</span><Toggle aria-label="WhatsApp permitido" compact onPressedChange={(value) => onPreferenceChange?.("whatsappAllowed", value)} pressed={whatsappAllowed}/></label>
        <label><span>Opt-out de marketing</span><Toggle aria-label="Opt-out de marketing" compact onPressedChange={(value) => onPreferenceChange?.("marketingAllowed", value)} pressed={marketingAllowed}/></label>
        <label><span>Canal preferido</span><Select aria-label="Canal preferido" onValueChange={(value) => onPreferenceChange?.("preferredChannel", value)} options={[{ value: "whatsapp", label: "WhatsApp" }, { value: "email", label: "E-mail" }]} value={preferredChannel}/></label>
        <label><span>Preferência de horário</span><Select aria-label="Preferência de horário" onValueChange={(value) => onPreferenceChange?.("preferredTime", value)} options={[{ value: "morning", label: "Manhã (08h–12h)" }, { value: "afternoon", label: "Tarde (12h–18h)" }]} value={preferredTime}/></label>
      </div>
      <div className="tcrm-consent-preferences__history">
        <strong>Histórico de consentimento</strong>
        <DataTable compact columns={[{ key: "date", header: "Data", width: "30%" }, { key: "consent", header: "Consentimento", width: "30%" }, { key: "origin", header: "Origem", width: "15%" }, { key: "actor", header: "Responsável", width: "25%" }]} rows={history}/>
      </div>
      <Button className="tcrm-reference-panel__link" onClick={onViewHistory} size="sm" variant="ghost">Ver histórico completo</Button>
    </Panel>);
}

export interface SensitiveTimelineEvent {
    id: string;
    group: React.ReactNode;
    title: React.ReactNode;
    description: React.ReactNode;
    actor?: React.ReactNode;
    icon: IconName;
    tone: ComponentTone;
    actionLabel?: string;
    status?: React.ReactNode;
}

const image13SensitiveEvents: SensitiveTimelineEvent[] = [
    { id: "profile", group: "Hoje, 14:32", title: "Atualização de cadastro", description: "Endereço atualizado", actor: "Sam Frank", icon: "checkCircle", tone: "success" },
    { id: "document", group: "Hoje, 10:15", title: "Documento restrito", description: "Verificação de renda", icon: "lock", tone: "warning", actionLabel: "Pedir acesso" },
    { id: "email", group: "Ontem, 16:40", title: "E-mail mascarado", description: "joao.***@gmail.com", icon: "lock", tone: "neutral" },
    { id: "access", group: "25/04/2024 11:22", title: "Acesso solicitado", description: "Histórico de pagamentos", icon: "info", tone: "info", status: "Pendente" },
    { id: "note", group: "20/04/2024 09:08", title: "Nota interna", description: "Aluno participativo nas aulas", actor: "Nikki Olaw", icon: "clipboard", tone: "success" }
];

export interface SensitiveTimelinePanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    events?: SensitiveTimelineEvent[];
    onEventAction?: (event: SensitiveTimelineEvent) => void;
}

export function SensitiveTimelinePanel({ events = image13SensitiveEvents, onEventAction, className, ...props }: SensitiveTimelinePanelProps) {
    return (<Panel compact className={cn("tcrm-reference-panel", "tcrm-sensitive-timeline", className)} data-component="SensitiveTimelinePanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>11</span><h3>Timeline sensível</h3></header>
      <Timeline compact items={events.map((event) => ({
            id: event.id,
            title: event.title,
            time: event.group,
            description: event.description,
            actor: event.actor,
            icon: event.icon,
            tone: event.tone,
            action: event.actionLabel ? <Button onClick={() => onEventAction?.(event)} size="sm" variant="secondary">{event.actionLabel}</Button> : event.status ? <Chip showDot={false}>{event.status}</Chip> : undefined
        }))} variant="sensitive"/>
    </Panel>);
}

export interface ClassSummaryCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
    title?: React.ReactNode;
    status?: React.ReactNode;
    students?: React.ReactNode;
    capacity?: React.ReactNode;
    openings?: React.ReactNode;
    waitlist?: React.ReactNode;
    nextClass?: React.ReactNode;
    teacher?: React.ReactNode;
    onViewDetails?: () => void;
}

export function ClassSummaryCard({ title = "Reformer Iniciante - R01", status = "Ativa", students = 8, capacity = 8, openings = 0, waitlist = 3, nextClass = "Quarta, 22/05 · 09:00 - 10:00 · Sala 2", teacher = "Maria Clara", onViewDetails, className, ...props }: ClassSummaryCardProps) {
    return (<Panel compact className={cn("tcrm-image14-panel", "tcrm-class-summary-card", className)} data-component="ClassSummaryCard" {...props}>
      <header>
        <span className="tcrm-class-summary-card__icon"><Icon name="book"/></span>
        <strong>{title}</strong>
        <Chip showDot={false} tone="success">{status}</Chip>
      </header>
      <dl className="tcrm-class-summary-card__metrics">
        <div><dt>Alunos</dt><dd>{students}</dd></div>
        <div><dt>Capacidade</dt><dd>{capacity}</dd></div>
        <div><dt>Vagas</dt><dd>{openings}</dd></div>
        <div><dt>Lista de espera</dt><dd className="tcrm-image14-danger">{waitlist}</dd></div>
      </dl>
      <dl className="tcrm-class-summary-card__details">
        <div><dt>Proxima aula</dt><dd>{nextClass}</dd></div>
        <div><dt>Professor</dt><dd>{teacher}</dd></div>
      </dl>
      <Button className="tcrm-image14-panel__link" onClick={onViewDetails} size="sm" trailingIcon="arrowRight" variant="ghost">Ver detalhes</Button>
    </Panel>);
}

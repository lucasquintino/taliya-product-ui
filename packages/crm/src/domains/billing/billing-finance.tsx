/** Finance queue, student, and class operational surfaces. */
import React from "react";
import { Button, ButtonGroup, Chip, Icon, List, ListItem, Panel, cn } from "@taliya/ui";
import { StudentSummary } from "../students/students-profile.js";
import { Roster } from "../agenda/index.js";
import type { RosterStudent } from "../agenda/index.js";

export interface FinanceQueueGridProps extends React.HTMLAttributes<HTMLElement> {
  density?: "default" | "compact";
}

export function FinanceQueueGrid({ className, density = "default", ...props }: FinanceQueueGridProps) {
  return <section aria-label="Filas financeiras" className={cn("tcrm-finance-queue-grid", `tcrm-finance-queue-grid--${density}`, className)} {...props} />;
}

export interface AgentRoutineIntroProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: React.ReactNode;
  description?: React.ReactNode;
}

export function AgentRoutineIntro({
  status = <Chip tone="success">Contratado</Chip>,
  description = "Escolha uma rotina para ajustar, simular ou publicar.",
  children,
  className,
  ...props
}: AgentRoutineIntroProps) {
  return (
    <div className={cn("tcrm-agent-routine-intro", className)} {...props}>
      {children ?? (
        <>
          {status}
          {description ? <p>{description}</p> : null}
        </>
      )}
    </div>
  );
}

export type StudentProfileAction = "open-schedule" | "open-finance" | "open-pending" | "open-notes" | "open-timeline" | "message" | "create-task" | "change-plan" | "pause-student";

export interface StudentProfileCompositionProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: "standard" | "compact";
  onAction?: (action: StudentProfileAction) => void;
}

interface StudentProfileListItemProps extends React.ComponentProps<typeof ListItem> {
  badge: React.ReactNode;
  compact: boolean;
}

function StudentProfileListItem({ badge, compact, ...props }: StudentProfileListItemProps) {
  return <ListItem action={compact ? badge : undefined} {...props}>{compact ? null : badge}</ListItem>;
}

export function StudentProfileOverviewGrid({ children, className, density = "standard", onAction, ...props }: StudentProfileCompositionProps) {
  const compact = density === "compact";
  return (
    <div className={cn("tcrm-student-profile-overview-grid", compact && "tcrm-student-profile-overview-grid--compact", className)} data-density={density} {...props}>
      {children ?? (
        <>
          <StudentSummary />
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="2. Agenda próxima">
            <h3>2. Agenda próxima</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="info">Marcada</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Qui 15/05 · 07:00" title="Reformer Iniciante" />
              <StudentProfileListItem badge={<Chip tone="info">Marcada</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Sex 17/05 · 07:00" title="Reformer Iniciante" />
              <StudentProfileListItem badge={<Chip tone="info">Marcada</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Seg 20/05 · 08:00" title="Pilates Solo" />
              <StudentProfileListItem badge={<Chip tone="warning">Pendente</Chip>} compact={compact} leading={<Icon name="clipboard" tone="warning" />} meta="1 aula disponível" title="Reposição pendente" />
            </List>
            <Button onClick={() => onAction?.("open-schedule")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver agenda</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="3. Plano e financeiro">
            <h3>3. Plano e financeiro</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="success">Ativo</Chip>} compact={compact} leading={<Icon name="creditCard" />} meta="Plano Mensal" title="Plano atual" />
              <ListItem leading={<Icon name="coins" />} meta="10/06/2024 · R$ 199,00" title="Próxima mensalidade" />
              <ListItem leading={<Icon name="coins" />} meta="05/04/2024 · R$ 199,00" title="Último pagamento" />
              <StudentProfileListItem badge={<Chip tone="warning">pagamento pendente</Chip>} compact={compact} leading={<Icon name="alert" tone="warning" />} meta="Pagamento pendente desde 05/04" title="Status financeiro" />
            </List>
            <Button onClick={() => onAction?.("open-finance")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver financeiro</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="4. Pendências">
            <h3>4. Pendências</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="user" />} meta="Dados cadastrais" title="Atualizar contato de emergência" />
              <ListItem leading={<Icon name="calendar" />} meta="Agenda" title="Confirmar disponibilidade para aula extra" />
              <ListItem leading={<Icon name="coins" tone="warning" />} meta="Financeiro" title="Pagamento pendente" />
            </List>
            <Button onClick={() => onAction?.("open-pending")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas pendências</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="5. Notas recentes">
            <h3>5. Notas recentes</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="clipboard" tone="info" />} meta="Sam Frank · 12/05/2024 14:32" title="Aluna pediu opção de reposição para próxima semana." />
              <ListItem leading={<Icon name="message" tone="info" />} meta="Nikki Olaw · 09/05/2024 10:15" title="Relatou leve desconforto no ombro direito." />
            </List>
            <Button onClick={() => onAction?.("open-notes")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas notas</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="6. Linha do tempo curta">
            <h3>6. Linha do tempo curta</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="whatsapp" tone="success" />} meta="12/05/2024 14:32 · Por Sam Frank" title="Mensagem via WhatsApp">Enviou lembrete da aula de quinta.</ListItem>
              <ListItem leading={<Icon name="checkCircle" tone="info" />} meta="10/05/2024 07:00 · Reformer Iniciante" title="Aula realizada">Presença registrada.</ListItem>
              <ListItem leading={<Icon name="coins" tone="success" />} meta="05/04/2024 10:32 · R$ 199,00" title="Pagamento recebido">Plano Mensal.</ListItem>
            </List>
            <Button onClick={() => onAction?.("open-timeline")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver linha do tempo completa</Button>
          </Panel>
        </>
      )}
    </div>
  );
}

export function StudentProfileActionRail({ children, className, density = "standard", onAction, ...props }: StudentProfileCompositionProps) {
  const compact = density === "compact";
  return (
    <div className={cn("tcrm-student-profile-action-rail", compact && "tcrm-student-profile-action-rail--compact", className)} data-density={density} {...props}>
      {children ?? (
        <>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Próximas ações">
            <h3>Próximas ações</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="info">Reformer Iniciante</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Qui, 15/05 · 07:00" title="Aula marcada" />
              <StudentProfileListItem badge={<Chip tone="warning">Pendente</Chip>} compact={compact} leading={<Icon name="refresh" tone="warning" />} meta="1 aula disponível" title="Repor aula pendente" />
              <StudentProfileListItem badge={<Chip tone="warning">Atenção</Chip>} compact={compact} leading={<Icon name="coins" tone="success" />} meta="R$ 199,00" title="Pagamento pendente" />
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Riscos / alertas">
            <h3>Riscos / alertas</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="warning">Atenção</Chip>} compact={compact} leading={<Icon name="shield" tone="warning" />} meta="Pagamento pendente desde 05/04" title="Financeiro em atraso" />
              <StudentProfileListItem badge={<Chip tone="success">Bom</Chip>} compact={compact} leading={<Icon name="checkCircle" tone="success" />} meta="8 de 10 aulas (80%)" title="Frequência estável" />
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Tarefas abertas">
            <h3>Tarefas abertas</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="info">Pendente</Chip>} compact={compact} leading={<Icon name="checkCircle" />} meta="Criada por Nikki Olaw · 02/05" title="Confirmar disponibilidade para aula extra" />
              <StudentProfileListItem badge={<Chip tone="info">Pendente</Chip>} compact={compact} leading={<Icon name="checkCircle" />} meta="Criada por Sam Frank · 28/04" title="Atualizar contato de emergência" />
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Última conversa">
            <h3>Última conversa</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="whatsapp" tone="success" />} meta="Você: Oi Ana Paula! Lembrando da sua aula..." title="WhatsApp · 12/05/2024 14:32">Ana Paula: Perfeito, obrigada pelo lembrete!</ListItem>
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__quick-actions" compact={compact} title="Ações rápidas">
            <h3>Ações rápidas</h3>
            <ButtonGroup>
              <Button leadingIcon="message" onClick={() => onAction?.("message")} variant="secondary">Enviar mensagem</Button>
              <Button leadingIcon="calendar" onClick={() => onAction?.("create-task")} variant="secondary">Criar tarefa</Button>
              <Button leadingIcon="creditCard" onClick={() => onAction?.("change-plan")} variant="secondary">Alterar plano</Button>
              <Button leadingIcon="pause" onClick={() => onAction?.("pause-student")} variant="secondary">Pausar aluno</Button>
            </ButtonGroup>
          </Panel>
        </>
      )}
    </div>
  );
}

export type ClassOperationalDetailAction = "view-students" | "open-vacancy" | "open-credit" | "open-enrollment" | "edit-notes";

export interface ClassOperationalDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: (action: ClassOperationalDetailAction) => void;
  onStudentAction?: (studentId: string) => void;
  students?: Array<RosterStudent | string>;
}

export function ClassOperationalDetail({ children, className, onAction, onStudentAction, students, ...props }: ClassOperationalDetailProps) {
  return (
    <div className={cn("tcrm-class-operational-detail", className)} data-component="ClassOperationalDetail" {...props}>
      {children ?? (
        <>
          <Panel className="tcrm-class-operational-detail__summary" compact>
            <dl>
              <div><Icon name="user" /><dt>Professor da aula</dt><dd>João Silva</dd></div>
              <div><Icon name="calendar" /><dt>Equipamento / recurso</dt><dd>Reformer 2</dd></div>
              <div><Icon name="users" /><dt>Capacidade</dt><dd>5/6</dd></div>
              <div><Icon name="clock" /><dt>Status</dt><dd><Chip tone="warning">Chamada em andamento</Chip></dd></div>
              <div><Icon name="calendar" /><dt>Origem</dt><dd>Agenda</dd></div>
            </dl>
            <p><Icon name="info" tone="info" /> Aula criada pela grade recorrente.</p>
          </Panel>
          <Panel className="tcrm-class-operational-detail__students" compact>
            <ButtonGroup align="between">
              <div><h3>Alunos esperados</h3><p>Clique no aluno para ver detalhes</p></div>
              <Button leadingIcon="eye" onClick={() => onAction?.("view-students")} size="sm" variant="secondary">Ver detalhes</Button>
            </ButtonGroup>
            <Roster onStudentAction={onStudentAction} students={students} variant="expected" />
          </Panel>
          <div className="tcrm-class-operational-detail__side">
            <Panel compact>
              <h3>Reposições e vagas</h3>
              <List divided>
                <ListItem action={<Icon name="chevronRight" />} leading={<Icon name="users" tone="success" />} onClick={() => onAction?.("open-vacancy")} title="1 vaga aberta">Disponível para encaixe</ListItem>
                <ListItem action={<Icon name="chevronRight" />} leading={<Icon name="sparkles" tone="info" />} onClick={() => onAction?.("open-credit")} title="1 crédito compatível">Elegível para uso nesta aula</ListItem>
                <ListItem action={<Icon name="chevronRight" />} leading={<Icon name="user" tone="info" />} onClick={() => onAction?.("open-enrollment")} title="1 aluno encaixado">Entrou por reposição</ListItem>
              </List>
            </Panel>
            <Panel compact>
              <ButtonGroup align="between"><h3>Observações da aula</h3><Button leadingIcon="edit" onClick={() => onAction?.("edit-notes")} size="sm" variant="secondary">Editar</Button></ButtonGroup>
              <p>Gabriela costuma avisar em cima da hora.<br />Verificar encaixe se Ana não vier.</p>
            </Panel>
          </div>
          <Panel className="tcrm-class-operational-detail__history" compact>
            <h3>Histórico da aula</h3>
            <List divided>
              <ListItem action={<Chip tone="neutral">Sistema</Chip>} leading={<Icon name="calendar" tone="info" />} meta="12/05 · 10:12" title="Aula criada pela grade">Recorrência: terça 17h</ListItem>
              <ListItem action={<Chip tone="info">Ana Carolina</Chip>} leading={<Icon name="user" tone="success" />} meta="12/05 · 15:47" title="Ana pediu reposição">Motivo: compromissos pessoais</ListItem>
              <ListItem action={<Chip tone="neutral">Recepção</Chip>} leading={<Icon name="user" tone="warning" />} meta="Hoje · 16:45" title="Chamada iniciada pela recepção">Execução da aula iniciada</ListItem>
            </List>
          </Panel>
        </>
      )}
    </div>
  );
}

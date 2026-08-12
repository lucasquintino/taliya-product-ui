/** Student, class, and agenda setup workspaces. */
import React from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Icon,
  IconButton,
  InlineGroup,
  List,
  ListItem,
  Panel,
  StatusDot,
  cn
} from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { SetupBlockHeader } from "./setup-shell.js";
import { SetupImportSourceCard } from "./setup-import-source-card.js";
import { SetupPagePanel } from "./setup-workspace-utilities.js";
import { WeeklyHoursGrid } from "../../patterns/weekly-hours-grid.js";
import type { WeeklyHoursGridSlot } from "../../patterns/weekly-hours-grid.js";
import { CrmWorklistTable } from "../../patterns/worklist-table.js";

export type SetupStudentSource = "files" | "photo" | "paste" | "manual";

export interface SetupStudentsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  onSourceSelect?: (source: SetupStudentSource) => void;
  onStudentSelect?: (studentId: string) => void;
  onStudentAction?: (studentId: string, action: "edit" | "remove" | "view") => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupStudentsWorkspace({ onSourceSelect, onStudentSelect, onStudentAction, onAction, className, ...props }: SetupStudentsWorkspaceProps) {
  const sources: Array<{ id: SetupStudentSource; title: string; description: string; icon: IconName }> = [
    { id: "files", title: "Importar arquivos", description: "Planilhas ou exportacoes", icon: "fileDown" },
    { id: "photo", title: "Enviar foto/anotacao", description: "Caderno, ficha ou print", icon: "camera" },
    { id: "paste", title: "Colar lista", description: "Nomes e telefones", icon: "menu" },
    { id: "manual", title: "Adicionar manualmente", description: "Um aluno por vez", icon: "users" }
  ];
  const students = [
    { id: "ana", name: "Ana Martins", initials: "AM", phone: "(11) 98888-1111", plan: "Pacote 8 aulas", origin: "planilha", status: "Pronto", tone: "success" as ComponentTone },
    { id: "carla", name: "Carla Souza", initials: "CS", phone: "(11) 97777-2222", plan: "Pilates 2x por semana", origin: "manual", status: "Pronto", tone: "success" as ComponentTone },
    { id: "roberto", name: "Roberto Lima", initials: "RL", phone: "Falta telefone", plan: "Plano nao informado", origin: "foto", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "mariana", name: "Mariana Alves", initials: "MA", phone: "Possivel duplicidade", plan: "Pacote 8 aulas", origin: "lista", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "beatriz", name: "Beatriz Nunes", initials: "BN", phone: "(11) 96666-3333", plan: "Sem plano ainda", origin: "planilha", status: "Pode seguir", tone: "info" as ComponentTone }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-students-workspace", className)} data-component="SetupStudentsWorkspace" {...props}>
      <SetupBlockHeader description="Adicione os alunos ativos do studio. Voce pode misturar planilhas, fotos, listas e cadastros manuais." step={6} title="Alunos" totalSteps={9} />
      <div className="tcrm-setup-students-workspace__summary-grid">
        <Panel compact><h3>Adicionar alunos</h3><div className="tcrm-setup-students-workspace__sources">{sources.map((source) => <SetupImportSourceCard description={source.description} icon={source.icon} key={source.id} onSelect={() => onSourceSelect?.(source.id)} title={source.title} />)}</div></Panel>
        <Panel compact><h3>Fontes adicionadas</h3><List divided>
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="fileDown" tone="success" />} meta="42 alunos encontrados · 3 pendencias" title="alunos_maio.xlsx" />
          <ListItem action={<Chip tone="warning">Revisar</Chip>} leading={<Icon name="camera" tone="info" />} meta="8 alunos encontrados · aguardando revisao" title="foto_caderno_01.png" />
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="menu" tone="info" />} meta="5 alunos encontrados" title="lista colada" />
          <ListItem action={<Chip>Rascunho</Chip>} leading={<Icon name="users" />} meta="2 alunos adicionados" title="manual" />
        </List><p>Voce pode adicionar mais fontes antes de continuar.</p></Panel>
        <Panel compact><h3>Resumo da base</h3><List>
          <ListItem leading={<Icon name="clipboard" tone="info" />} title="57 alunos preparados" />
          <ListItem leading={<Icon name="checkCircle" tone="success" />} title="49 prontos" />
          <ListItem leading={<Icon name="alert" tone="warning" />} title="6 precisam revisao" />
          <ListItem leading={<Icon name="users" tone="info" />} title="2 possiveis duplicidades" />
        </List><p>Obrigatorio: nome + WhatsApp/telefone.</p></Panel>
      </div>
      <CrmWorklistTable
        actionColumnWidth="104px"
        ariaLabel="Alunos preparados"
        caption="Para publicar, cada aluno precisa ter nome e WhatsApp/telefone."
        columns={[
          { key: "name", header: "Aluno", render: (row) => <InlineGroup><Avatar name={row.name} size="xs" /><strong>{row.name}</strong></InlineGroup>, width: "18%" },
          { key: "phone", header: "WhatsApp", width: "20%" },
          { key: "plan", header: "Plano", width: "24%" },
          { key: "origin", header: "Origem", render: (row) => <Chip>{row.origin}</Chip>, width: "14%" },
          { key: "status", header: "Status", render: (row) => <Chip tone={row.tone}>{row.status}</Chip>, width: "14%" }
        ]}
        density="compact"
        heading={<InlineGroup><h3>Alunos preparados</h3><Chip tone="info">Todos entram como Ativo</Chip></InlineGroup>}
        onRowSelect={(row) => onStudentSelect?.(row.id)}
        rowActions={(row) => <InlineGroup compact><IconButton icon="edit" label={`Editar ${row.name}`} onClick={() => onStudentAction?.(row.id, "edit")} size="sm" variant="ghost" /><IconButton icon="trash" label={`Remover ${row.name}`} onClick={() => onStudentAction?.(row.id, "remove")} size="sm" variant="ghost" /><IconButton icon="eye" label={`Ver ${row.name}`} onClick={() => onStudentAction?.(row.id, "view")} size="sm" variant="ghost" /></InlineGroup>}
        rows={students}
      />
      <ButtonGroup className="tcrm-setup-students-workspace__actions"><Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button><Button onClick={() => onAction?.("later")} variant="secondary">Configurar alunos depois</Button><Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button></ButtonGroup>
    </SetupPagePanel>
  );
}

export type SetupClassSource = "files" | "photo" | "paste" | "manual" | "later";

export interface SetupClassesWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  onSourceSelect?: (source: SetupClassSource) => void;
  onClassSelect?: (classId: string) => void;
  onClassAction?: (classId: string, action: "edit" | "remove" | "view") => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupClassesWorkspace({ onSourceSelect, onClassSelect, onClassAction, onAction, className, ...props }: SetupClassesWorkspaceProps) {
  const sources: Array<{ id: SetupClassSource; title: string; description: string; icon: IconName }> = [
    { id: "files", title: "Importar arquivos", description: "Planilhas ou exportacoes", icon: "fileDown" },
    { id: "photo", title: "Enviar foto/anotacao", description: "Caderno, grade ou print", icon: "camera" },
    { id: "paste", title: "Colar lista", description: "Dias e horarios", icon: "menu" },
    { id: "manual", title: "Criar manualmente", description: "Uma turma por vez", icon: "users" },
    { id: "later", title: "Nao tenho turmas prontas", description: "Montar a partir da agenda no proximo bloco", icon: "clock" }
  ];
  const classes = [
    { id: "ter-qui-18", name: "Ter/Qui 18h", days: "Ter, Qui", schedule: "18:00-19:00", capacity: "6 vagas", teacher: "Ana Martins", students: "5 alunos", status: "Pronto", tone: "success" as ComponentTone },
    { id: "seg-qua-07", name: "Seg/Qua 07h", days: "Seg, Qua", schedule: "07:00-08:00", capacity: "6 vagas", teacher: "Sem professor", students: "4 alunos", status: "Pode seguir", tone: "info" as ComponentTone },
    { id: "sexta-09", name: "Sexta 09h", days: "Sex", schedule: "09:30-10:00", capacity: "Falta capacidade", teacher: "Carla Souza", students: "2 alunos", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "ter-qui-19", name: "Ter/Qui 19h", days: "Ter, Qui", schedule: "19:00-20:00", capacity: "6 vagas", teacher: "Ana Martins", students: "Aluno nao encontrado", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "sabado-08", name: "Sabado 08h", days: "Sab", schedule: "08:00-09:00", capacity: "4 vagas", teacher: "Sem professor", students: "0 alunos", status: "Pode seguir", tone: "info" as ComponentTone }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-classes-workspace", className)} data-component="SetupClassesWorkspace" {...props}>
      <SetupBlockHeader description="Organize horarios fixos recorrentes, capacidade e vinculos simples com alunos." step={7} title="Turmas" totalSteps={9} />
      <div className="tcrm-setup-classes-workspace__summary-grid">
        <Panel compact><h3>Adicionar turmas</h3><div className="tcrm-setup-classes-workspace__sources">{sources.map((source) => <SetupImportSourceCard description={source.description} icon={source.icon} key={source.id} onSelect={() => onSourceSelect?.(source.id)} title={source.title} />)}</div></Panel>
        <Panel compact><h3>Fontes adicionadas</h3><List divided>
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="fileDown" tone="success" />} meta="8 turmas encontradas · 2 pendencias" title="grade_turmas.xlsx" />
          <ListItem action={<Chip tone="warning">Revisar</Chip>} leading={<Icon name="camera" tone="info" />} meta="3 turmas encontradas" title="foto_grade_horarios.png" />
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="menu" tone="info" />} meta="3 turmas encontradas" title="lista colada" />
        </List><p>Voce pode adicionar mais fontes antes de continuar.</p></Panel>
        <Panel compact><h3>Resumo das turmas</h3><List>
          <ListItem leading={<Icon name="users" tone="info" />} title="10 turmas preparadas" />
          <ListItem leading={<Icon name="checkCircle" tone="success" />} title="8 prontas" />
          <ListItem leading={<Icon name="alert" tone="warning" />} title="2 precisam revisao" />
          <ListItem leading={<Icon name="users" tone="info" />} title="34 alunos vinculados" />
        </List><p>A agenda sera montada no proximo bloco.</p></Panel>
      </div>
      <CrmWorklistTable
        actionColumnWidth="104px"
        ariaLabel="Turmas preparadas"
        caption="Para publicar uma turma, informe dias, horario e capacidade."
        columns={[
          { key: "name", header: "Turma", width: "14%" }, { key: "days", header: "Dias", width: "12%" }, { key: "schedule", header: "Horario", width: "14%" },
          { key: "capacity", header: "Capacidade", width: "14%" }, { key: "teacher", header: "Professor", width: "16%" }, { key: "students", header: "Alunos", width: "16%" },
          { key: "status", header: "Status", render: (row) => <Chip tone={row.tone}>{row.status}</Chip>, width: "14%" }
        ]}
        density="compact"
        heading={<InlineGroup><h3>Turmas preparadas</h3><Chip tone="info">Agenda sera montada depois</Chip></InlineGroup>}
        onRowSelect={(row) => onClassSelect?.(row.id)}
        rowActions={(row) => <InlineGroup compact><IconButton icon="edit" label={`Editar ${row.name}`} onClick={() => onClassAction?.(row.id, "edit")} size="sm" variant="ghost" /><IconButton icon="trash" label={`Remover ${row.name}`} onClick={() => onClassAction?.(row.id, "remove")} size="sm" variant="ghost" /><IconButton icon="eye" label={`Ver ${row.name}`} onClick={() => onClassAction?.(row.id, "view")} size="sm" variant="ghost" /></InlineGroup>}
        rows={classes}
      />
      <ButtonGroup className="tcrm-setup-classes-workspace__actions"><Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button><Button onClick={() => onAction?.("later")} variant="secondary">Configurar turmas depois</Button><Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button></ButtonGroup>
    </SetupPagePanel>
  );
}

export interface SetupAgendaWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  selectedClassId?: string;
  onClassSelect?: (classId: string) => void;
  onSlotSelect?: (slot: WeeklyHoursGridSlot) => void;
  onBackToClasses?: () => void;
  onAction?: (action: "save" | "continue") => void;
}

export function SetupAgendaWorkspace({ selectedClassId = "ter-qui-18", onClassSelect, onSlotSelect, onBackToClasses, onAction, className, ...props }: SetupAgendaWorkspaceProps) {
  const classControls = [
    { id: "ter-qui-18", title: "Ter/Qui 18h", meta: "2 aulas geradas · Ter e Qui", detail: "5 alunos · Pronto", tone: "info" as ComponentTone },
    { id: "seg-qua-07", title: "Seg/Qua 07h", meta: "2 aulas geradas · Seg e Qua", detail: "4 alunos · Pronto", tone: "success" as ComponentTone },
    { id: "sexta-09", title: "Sexta 09h", meta: "1 aula gerada · Sex", detail: "Falta capacidade · Revisar", tone: "warning" as ComponentTone },
    { id: "sabado-08", title: "Sabado 08h", meta: "1 aula gerada · Sab", detail: "Fora da janela · Aviso", tone: "warning" as ComponentTone },
    { id: "ter-qui-19", title: "Ter/Qui 19h", meta: "2 aulas geradas · Ter e Qui", detail: "Aluno pendente · Revisar", tone: "warning" as ComponentTone }
  ];
  const slots: WeeklyHoursGridSlot[] = [
    { id: "Seg-07", day: "Seg", start: "07:00", end: "08:00", label: "Seg/Qua 07h", meta: "4 alunos", tone: "success" },
    { id: "Qua-07", day: "Qua", start: "07:00", end: "08:00", label: "Seg/Qua 07h", meta: "4 alunos", tone: "success" },
    { id: "Sab-08", day: "Sab", start: "08:00", end: "09:00", label: "Sabado 08h", meta: "Fora da janela", tone: "warning" },
    { id: "Sex-09", day: "Sex", start: "09:00", end: "10:00", label: "Sexta 09h", meta: "Revisar capacidade", tone: "warning" },
    { id: "Ter-18", day: "Ter", start: "18:00", end: "19:00", label: "Ter/Qui 18h", meta: "5 alunos", tone: "info" },
    { id: "Qui-18", day: "Qui", start: "18:00", end: "19:00", label: "Ter/Qui 18h", meta: "5 alunos", tone: "info" },
    { id: "Ter-19", day: "Ter", start: "19:00", end: "20:00", label: "Ter/Qui 19h", meta: "Aluno pendente", tone: "warning" },
    { id: "Qui-19", day: "Qui", start: "19:00", end: "20:00", label: "Ter/Qui 19h", meta: "Aluno pendente", tone: "warning" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-agenda-workspace", className)} data-component="SetupAgendaWorkspace" {...props}>
      <SetupBlockHeader description="Revise a semana base gerada a partir das turmas antes de publicar." step={8} title="Agenda" totalSteps={9} />
      <div className="tcrm-setup-agenda-workspace__summary">
        <Panel compact><Icon name="calendar" tone="success" /><h3>Agenda gerada</h3><strong>24 aulas semanais</strong><span>10 turmas usadas</span><p>Criada a partir das turmas preparadas.</p></Panel>
        <Panel compact><Icon name="barChart" tone="success" /><h3>Cobertura</h3><strong>6 dias com aulas</strong><span>4 horarios principais</span><p>Dentro da janela de funcionamento.</p></Panel>
        <Panel compact><Icon name="alert" tone="warning" /><h3>Revisao</h3><strong>7 turmas prontas</strong><span>3 precisam atencao</span><p>Pendencias aparecem na semana e no controle.</p></Panel>
      </div>
      <div className="tcrm-setup-agenda-workspace__body">
        <Panel className="tcrm-setup-agenda-workspace__control" compact><h3>Controle da semana</h3><p>Veja como cada turma apareceu na agenda.</p><InlineGroup><Chip tone="info">Todas</Chip><Chip tone="warning">Revisar</Chip><Chip tone="warning">Avisos</Chip></InlineGroup><List>
          {classControls.map((item) => <ListItem action={<Icon name="chevronRight" />} key={item.id} meta={<><span>{item.meta}</span><small>{item.detail}</small></>} onClick={() => onClassSelect?.(item.id)} selected={selectedClassId === item.id} title={item.title} warning={item.tone === "warning"} />)}
        </List></Panel>
        <Panel className="tcrm-setup-agenda-workspace__calendar" compact><InlineGroup><h3>Agenda semanal completa</h3><Chip tone="info">Previa antes da publicacao</Chip></InlineGroup><WeeklyHoursGrid axis={["07h", "08h", "09h", "12h", "18h", "19h"]} days={["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]} onSlotClick={onSlotSelect} slots={slots} variant="schedule" /><InlineGroup className="tcrm-setup-agenda-workspace__legend"><span><StatusDot status="success" />Pronto</span><span><StatusDot status="info" />Selecionado</span><span><StatusDot status="warning" />Revisar</span><span><StatusDot status="paused" />Aviso</span></InlineGroup></Panel>
      </div>
      <ButtonGroup className="tcrm-setup-agenda-workspace__actions"><Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button><Button leadingIcon="arrowLeft" onClick={onBackToClasses} variant="secondary">Voltar para turmas</Button><Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button></ButtonGroup>
    </SetupPagePanel>
  );
}

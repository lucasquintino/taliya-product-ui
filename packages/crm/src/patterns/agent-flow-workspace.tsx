/** Agent flow workspace and preflight. */
import React from "react";
import { Button, FieldGrid, FieldStack, Panel, PrimitiveButton, Select, TagInput, Textarea, cn } from "@taliya/ui";
import { AgentFlowSectionPanel, ModeSelector, AgentFlowSettingsPanel, AgentFlowActionBar } from "./agent-catalog.js";
import { FlowBuilder } from "./agent-routine-workspace.js";

export type AgentFlowWorkspaceAction = "test" | "save" | "back";

export interface AgentFlowWorkspaceSettings {
  noticeDeadline?: string;
  nextStep?: string;
  exceptionOwners?: string[];
  messageTone?: string;
  messageTemplate?: string;
}

export interface AgentFlowWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: string;
  settings?: AgentFlowWorkspaceSettings;
  onModeChange?: (mode: string) => void;
  onSettingChange?: (field: keyof AgentFlowWorkspaceSettings, value: string | string[]) => void;
  onStepOpen?: (stepId: string) => void;
  onStepMenu?: (stepId: string) => void;
  onAction?: (action: AgentFlowWorkspaceAction) => void;
}

const defaultAgentFlowWorkspaceSettings = {
  noticeDeadline: "2h",
  nextStep: "reposicao",
  exceptionOwners: ["Recepção", "Coordenadora", "Dono/admin"],
  messageTone: "acolhedor",
  messageTemplate: "Oi, {{nome}}. Vi aqui que você não vai conseguir vir à aula de {{horário}}. Vou registrar sua falta e verificar o melhor próximo passo."
} satisfies Required<AgentFlowWorkspaceSettings>;

export function AgentFlowWorkspace({
  mode = "autonomo-excecoes",
  settings,
  onModeChange,
  onSettingChange,
  onStepOpen,
  onStepMenu,
  onAction,
  className,
  ...props
}: AgentFlowWorkspaceProps) {
  const resolvedSettings = { ...defaultAgentFlowWorkspaceSettings, ...settings };

  return (
    <div className={cn("tcrm-agent-flow-workspace", "tcrm-page-family-stack", className)} data-component="AgentFlowWorkspace" {...props}>
      <AgentFlowSectionPanel
        description="Este fluxo herdou o perfil Mais autônomo da rotina, mas você pode mudar só este fluxo."
        density="compact"
        kind="mode"
        title="Como este fluxo deve trabalhar?"
      >
        <ModeSelector onChange={onModeChange} value={mode} />
      </AgentFlowSectionPanel>
      <FlowBuilder density="compact" onStepMenu={onStepMenu} onStepOpen={onStepOpen} />
      <AgentFlowSettingsPanel>
        <FieldGrid columns={4}>
          <Select
            helperText="Depois desse prazo, chama a equipe."
            label="Prazo para aviso"
            onValueChange={(value) => onSettingChange?.("noticeDeadline", value)}
            options={[
              { value: "2h", label: "Até 2 horas antes da aula" },
              { value: "1h", label: "Até 1 hora antes da aula" },
              { value: "dia-anterior", label: "Até o dia anterior" }
            ]}
            value={resolvedSettings.noticeDeadline}
          />
          <Select
            helperText="A reposição segue pelas próprias regras."
            label="Próximo passo após falta"
            onValueChange={(value) => onSettingChange?.("nextStep", value)}
            options={[
              { value: "reposicao", label: "Criar tarefa de reposição" },
              { value: "mensagem", label: "Enviar mensagem ao aluno" },
              { value: "equipe", label: "Chamar equipe" }
            ]}
            value={resolvedSettings.nextStep}
          />
          <TagInput
            helperText="Quem recebe o caso quando a Taliya não pode seguir."
            items={resolvedSettings.exceptionOwners}
            label="Responsáveis por exceção"
            onRemove={(_, index) => onSettingChange?.("exceptionOwners", resolvedSettings.exceptionOwners.filter((__, itemIndex) => itemIndex !== index))}
            removable
          />
          <FieldStack>
            <Select
              label="Tom/template da mensagem"
              onValueChange={(value) => onSettingChange?.("messageTone", value)}
              options={[
                { value: "acolhedor", label: "Acolhedor" },
                { value: "direto", label: "Direto" },
                { value: "formal", label: "Formal" }
              ]}
              value={resolvedSettings.messageTone}
            />
            <Textarea
              density="compact"
              onChange={(event) => onSettingChange?.("messageTemplate", event.currentTarget.value)}
              value={resolvedSettings.messageTemplate}
            />
          </FieldStack>
        </FieldGrid>
      </AgentFlowSettingsPanel>
      <AgentFlowActionBar>
        <Button leadingIcon="play" onClick={() => onAction?.("test")} variant="primary">Testar este fluxo</Button>
        <Button leadingIcon="clipboard" onClick={() => onAction?.("save")} variant="secondary">Salvar ajuste</Button>
        <Button leadingIcon="arrowLeft" onClick={() => onAction?.("back")} variant="secondary">Voltar para rotina</Button>
      </AgentFlowActionBar>
    </div>
  );
}

export interface PreflightChecklistItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  state: "complete" | "incomplete" | "warning" | "blocked";
}

export function PreflightChecklist({
  items,
  title = "Pronta para publicar",
  description = "Nenhum bloqueio encontrado. A rotina pode entrar em operação com os limites abaixo.",
  onItemAction,
  onToggle,
  className
}: {
  items?: PreflightChecklistItem[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  onItemAction?: (itemId: string) => void;
  onToggle?: (itemId: string, checked: boolean) => void;
  className?: string;
}) {
  const checklist = items ?? [
    { id: "whatsapp", title: "WhatsApp conectado", state: "complete" as const },
    { id: "templates", title: "Templates aprovados", state: "complete" as const },
    { id: "responsaveis", title: "Responsáveis definidos", state: "complete" as const },
    { id: "quota", title: "Cota disponível", state: "complete" as const },
    { id: "auditoria", title: "Auditoria ativa", state: "complete" as const }
  ];
  return (
    <Panel compact className={cn("tcrm-preflight-checklist-panel", className)}>
      {title || description ? (
        <header>
          {title ? <h3>{title}</h3> : null}
          {description ? <p>{description}</p> : null}
        </header>
      ) : null}
      <div className="tcrm-preflight-checklist" role="list">
        {checklist.map((item) => (
          <span
            className={cn("tcrm-preflight-checklist__item", `tcrm-preflight-checklist__item--${item.state}`)}
            key={item.id}
            role="listitem"
          >
            <PrimitiveButton
              aria-checked={item.state === "complete"}
              className="tcrm-preflight-checklist__check"
              disabled={item.state === "blocked"}
              onClick={() => onToggle?.(item.id, item.state !== "complete")}
              role="checkbox"
              type="button"
            >
              <span aria-hidden="true" className={cn("tcrm-preflight-checklist__status", `tcrm-preflight-checklist__status--${item.state}`)} />
              <span>{item.title}</span>
              {item.description ? <small>{item.description}</small> : null}
            </PrimitiveButton>
            <PrimitiveButton className="tcrm-preflight-checklist__action" disabled={item.state === "blocked"} onClick={() => onItemAction?.(item.id)} type="button">Revisar</PrimitiveButton>
          </span>
        ))}
      </div>
    </Panel>
  );
}

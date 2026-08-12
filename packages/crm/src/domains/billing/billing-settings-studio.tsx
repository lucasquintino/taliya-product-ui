/** Studio, team, channel, and plan settings workspaces. */
import React from "react";
import { Avatar, Button, ButtonGroup, Chip, ConfirmDialog, InlineGroup, Input, List, ListItem, Modal, Panel, Select, cn } from "@taliya/ui";
import type { ComponentTone, SelectOption } from "@taliya/ui";
import { SetupStudioWorkspace } from "../settings/setup-welcome-workspaces.js";
import type { SetupStudioWorkspaceProps } from "../settings/setup-welcome-workspaces.js";
import { SetupChannelsWorkspace } from "../settings/setup-team-channels.js";
import type { SetupChannelsWorkspaceProps } from "../settings/setup-team-channels.js";
import { SetupPlansWorkspace } from "../settings/setup-plans-payment.js";
import type { SetupPlansWorkspaceProps } from "../settings/setup-plans-payment.js";
import { SetupBlockHeader } from "../settings/setup-shell.js";
import { SetupPagePanel } from "../settings/setup-workspace-utilities.js";
import { UnsavedChangesBar, SettingsWorkspaceControls, SettingsWorkspaceFeedback, resolveSettingsWorkspaceSaveState } from "./billing-settings-workspaces.js";
import type { SettingsWorkspaceSaveProps, SettingsWorkspaceOperationalProps } from "./billing-settings-workspaces.js";

export type SettingsStudioField =
  | "studioName"
  | "publicName"
  | "mainUnit"
  | "address"
  | "addressLine2"
  | "neighborhood"
  | "city"
  | "state"
  | "postalCode"
  | "timezone";

export interface SettingsStudioWorkspaceProps extends Omit<SetupStudioWorkspaceProps, "header" | "details" | "footer" | "onAction" | "disabled">, SettingsWorkspaceSaveProps, SettingsWorkspaceOperationalProps {
  values?: Partial<Record<SettingsStudioField, string>>;
  onFieldChange?: (field: SettingsStudioField, value: string) => void;
}

export function SettingsStudioWorkspace({
  values = {},
  onFieldChange,
  saveState = "saved",
  blockedReason,
  validationError,
  systemError,
  onRequestAccess,
  onRetry,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsStudioWorkspaceProps) {
  const field = (name: SettingsStudioField, fallback: string) => values[name] ?? fallback;
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <SetupStudioWorkspace
      className={cn("tcrm-settings-inherited-workspace", "tcrm-settings-studio-workspace", className)}
      data-component="SettingsStudioWorkspace"
      disabled={Boolean(blockedReason)}
      details={(
        <section className="tcrm-settings-studio-workspace__identity">
          <h3>Identidade e unidade principal</h3>
          <div className="tcrm-settings-studio-workspace__fields">
            <Input label="Nome do studio" onChange={(event) => onFieldChange?.("studioName", event.currentTarget.value)} value={field("studioName", "Studio Leticia")} />
            <Input label="Nome publico" onChange={(event) => onFieldChange?.("publicName", event.currentTarget.value)} value={field("publicName", "Studio Leticia")} />
            <Input label="Unidade principal" onChange={(event) => onFieldChange?.("mainUnit", event.currentTarget.value)} value={field("mainUnit", "Unidade Centro")} />
            <Input className="tcrm-settings-studio-workspace__field--wide" label="Endereco" onChange={(event) => onFieldChange?.("address", event.currentTarget.value)} value={field("address", "Rua das Flores, 120")} />
            <Input label="Complemento" onChange={(event) => onFieldChange?.("addressLine2", event.currentTarget.value)} value={field("addressLine2", "")} />
            <Input label="Bairro" onChange={(event) => onFieldChange?.("neighborhood", event.currentTarget.value)} value={field("neighborhood", "Centro")} />
            <Input label="Cidade" onChange={(event) => onFieldChange?.("city", event.currentTarget.value)} value={field("city", "Sao Paulo")} />
            <Select label="Estado" onValueChange={(value) => onFieldChange?.("state", value)} options={[{ value: "SP", label: "SP" }, { value: "RJ", label: "RJ" }, { value: "MG", label: "MG" }]} value={field("state", "SP")} />
            <Input label="CEP" onChange={(event) => onFieldChange?.("postalCode", event.currentTarget.value)} value={field("postalCode", "01001-000")} />
            <Select
              label="Fuso horario"
              onValueChange={(value) => onFieldChange?.("timezone", value)}
              options={[
                { value: "America/Sao_Paulo", label: "Brasilia (GMT-3)" },
                { value: "America/Manaus", label: "Manaus (GMT-4)" },
                { value: "America/Rio_Branco", label: "Rio Branco (GMT-5)" }
              ]}
              value={field("timezone", "America/Sao_Paulo")}
            />
          </div>
        </section>
      )}
      footer={<>
        <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
        <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
      </>}
      header={<SetupBlockHeader description="Edite a identidade do studio e a janela institucional de funcionamento." showBadge={false} title="Studio" />}
      {...props}
    />
  );
}

export type SettingsTeamMemberStatus = "active" | "inactive" | "invitePending";

export interface SettingsTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: SettingsTeamMemberStatus;
  lastAccess: string;
  avatarSrc?: string;
  isLastAdmin?: boolean;
}

export type SettingsTeamMemberAction = "edit" | "deactivate" | "reactivate" | "resend";

const defaultSettingsTeamMembers: SettingsTeamMember[] = [
  { id: "leticia", name: "Leticia Ramos", email: "leticia@studio.com", role: "Dono/Admin", status: "active", lastAccess: "Hoje, 09:42" },
  { id: "carla", name: "Carla Souza", email: "carla@studio.com", role: "Recepcao", status: "active", lastAccess: "Ontem, 18:15" },
  { id: "ana", name: "Ana Martins", email: "ana@studio.com", role: "Professor", status: "invitePending", lastAccess: "Convite enviado hoje" }
];

export interface SettingsTeamWorkspaceProps extends React.HTMLAttributes<HTMLElement>, SettingsWorkspaceSaveProps, SettingsWorkspaceOperationalProps {
  members?: SettingsTeamMember[];
  confirmSensitiveActions?: boolean;
  roleOptions?: SelectOption[];
  onInvite?: () => void;
  onOpenPermissions?: () => void;
  onMemberAction?: (member: SettingsTeamMember, action: SettingsTeamMemberAction) => void;
  onRoleChange?: (member: SettingsTeamMember, nextRole: string) => void;
}

export function SettingsTeamWorkspace({
  members = defaultSettingsTeamMembers,
  confirmSensitiveActions = true,
  roleOptions = [
    { value: "Dono/Admin", label: "Dono/Admin" },
    { value: "Recepcao", label: "Recepcao" },
    { value: "Professor", label: "Professor" }
  ],
  saveState = "saved",
  blockedReason,
  validationError,
  systemError,
  onRequestAccess,
  onRetry,
  onInvite,
  onOpenPermissions,
  onMemberAction,
  onRoleChange,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsTeamWorkspaceProps) {
  const [pendingAction, setPendingAction] = React.useState<{ member: SettingsTeamMember; action: "deactivate" | "reactivate" } | null>(null);
  const [roleEditorMember, setRoleEditorMember] = React.useState<SettingsTeamMember | null>(null);
  const [nextRole, setNextRole] = React.useState("");
  const [pendingRoleChange, setPendingRoleChange] = React.useState<{ member: SettingsTeamMember; nextRole: string } | null>(null);
  const statusContract: Record<SettingsTeamMemberStatus, { label: string; tone: ComponentTone }> = {
    active: { label: "Ativo", tone: "success" },
    inactive: { label: "Inativo", tone: "neutral" },
    invitePending: { label: "Convite pendente", tone: "warning" }
  };
  const requestMemberAction = (member: SettingsTeamMember, action: SettingsTeamMemberAction) => {
    if (action === "edit" && onRoleChange) {
      setNextRole(member.role);
      setRoleEditorMember(member);
      return;
    }
    if (confirmSensitiveActions && (action === "deactivate" || action === "reactivate")) {
      setPendingAction({ member, action });
      return;
    }
    onMemberAction?.(member, action);
  };
  const pendingIsBlocked = pendingAction?.action === "deactivate" && pendingAction.member.isLastAdmin;
  const isOwnerTransfer = pendingRoleChange?.nextRole === "Dono/Admin" && pendingRoleChange.member.role !== "Dono/Admin";
  const roleChangeIsBlocked = Boolean(pendingRoleChange?.member.isLastAdmin && pendingRoleChange.nextRole !== "Dono/Admin");
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <SetupPagePanel className={cn("tcrm-settings-team-workspace", className)} data-component="SettingsTeamWorkspace" {...props}>
      <SetupBlockHeader description="Gerencie as pessoas que acessam o CRM, seus papeis e o estado dos convites." showBadge={false} title="Equipe" />
      <SettingsWorkspaceControls blocked={Boolean(blockedReason)}>
        <Panel className="tcrm-settings-team-workspace__panel" compact>
        <InlineGroup justify="between">
          <div><h3>Usuarios do CRM</h3><p>Papeis detalhados continuam em Permissoes.</p></div>
          <Button leadingIcon="plus" onClick={onInvite} variant="secondary">Convidar pessoa</Button>
        </InlineGroup>
        <List divided>
          {members.map((member) => {
            const status = statusContract[member.status];
            const statusAction = member.status === "invitePending" ? "resend" : member.status === "inactive" ? "reactivate" : "deactivate";
            const statusActionLabel = member.status === "invitePending" ? "Reenviar convite" : member.status === "inactive" ? "Reativar" : "Desativar";
            return (
              <ListItem
                action={(
                  <InlineGroup>
                    <Chip tone={status.tone}>{status.label}</Chip>
                    <Button onClick={() => requestMemberAction(member, "edit")} size="sm" variant="ghost">Editar</Button>
                    <Button onClick={() => requestMemberAction(member, statusAction)} size="sm" variant="secondary">{statusActionLabel}</Button>
                  </InlineGroup>
                )}
                key={member.id}
                leading={<Avatar name={member.name} size="md" src={member.avatarSrc} />}
                meta={<>{member.email} · Ultimo acesso: {member.lastAccess}</>}
                title={<>{member.name} · {member.role}</>}
              />
            );
          })}
        </List>
        <Button leadingIcon="shield" onClick={onOpenPermissions} variant="ghost">Abrir Permissoes</Button>
        </Panel>
      </SettingsWorkspaceControls>
      <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
      <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
      <Modal
        description="Escolha o novo papel principal. Permissoes finas continuam na pagina Permissoes."
        footer={(
          <ButtonGroup align="end">
            <Button onClick={() => setRoleEditorMember(null)} size="sm" variant="secondary">Cancelar</Button>
            <Button
              disabled={!roleEditorMember || nextRole === roleEditorMember.role}
              onClick={() => {
                if (!roleEditorMember || nextRole === roleEditorMember.role) return;
                setPendingRoleChange({ member: roleEditorMember, nextRole });
                setRoleEditorMember(null);
              }}
              size="sm"
            >
              Revisar alteracao
            </Button>
          </ButtonGroup>
        )}
        onOpenChange={(open) => { if (!open) setRoleEditorMember(null); }}
        open={Boolean(roleEditorMember)}
        title={roleEditorMember ? `Alterar papel de ${roleEditorMember.name}` : "Alterar papel"}
        variant="simple"
      >
        <Select aria-label="Novo papel" onValueChange={setNextRole} options={roleOptions} value={nextRole} />
      </Modal>
      <ConfirmDialog
        blockedReason={pendingIsBlocked ? "O ultimo Dono/Admin nao pode ser desativado." : undefined}
        cancelLabel="Manter acesso"
        confirmLabel={pendingAction?.action === "reactivate" ? "Confirmar reativacao" : "Confirmar desativacao"}
        destructive={pendingAction?.action === "deactivate"}
        description={pendingIsBlocked
          ? "O ultimo Dono/Admin nao pode ser desativado. Transfira a administracao antes de remover este acesso."
          : pendingAction
            ? `${pendingAction.member.name} ${pendingAction.action === "reactivate" ? "voltara a acessar" : "perdera o acesso ao"} CRM. O historico operacional sera preservado.`
            : undefined}
        onCancel={() => setPendingAction(null)}
        onConfirm={() => {
          if (!pendingAction || pendingIsBlocked) return;
          onMemberAction?.(pendingAction.member, pendingAction.action);
          setPendingAction(null);
        }}
        onOpenChange={(open) => { if (!open) setPendingAction(null); }}
        open={Boolean(pendingAction)}
        summary={pendingAction ? <strong>{pendingAction.member.name} · {pendingAction.member.role}</strong> : undefined}
        title={pendingIsBlocked ? "Mantenha um Dono/Admin ativo" : pendingAction?.action === "reactivate" ? "Reativar acesso?" : "Desativar acesso?"}
        tone={pendingIsBlocked ? "sensitive" : undefined}
      />
      <ConfirmDialog
        blockedReason={roleChangeIsBlocked ? "Transfira a administracao antes de alterar o papel do ultimo Dono/Admin." : undefined}
        cancelLabel="Revisar papel"
        confirmLabel={isOwnerTransfer ? "Confirmar transferencia" : "Confirmar alteracao"}
        description={pendingRoleChange
          ? isOwnerTransfer
            ? `${pendingRoleChange.member.name} passara a ser Dono/Admin do studio. Esta transferencia altera o responsavel principal e ficara registrada na auditoria.`
            : `${pendingRoleChange.member.name} mudara de ${pendingRoleChange.member.role} para ${pendingRoleChange.nextRole}. O novo acesso sera aplicado imediatamente.`
          : undefined}
        onCancel={() => {
          if (pendingRoleChange) {
            setNextRole(pendingRoleChange.nextRole);
            setRoleEditorMember(pendingRoleChange.member);
          }
          setPendingRoleChange(null);
        }}
        onConfirm={() => {
          if (!pendingRoleChange || roleChangeIsBlocked) return;
          onRoleChange?.(pendingRoleChange.member, pendingRoleChange.nextRole);
          setPendingRoleChange(null);
        }}
        onOpenChange={(open) => { if (!open) setPendingRoleChange(null); }}
        open={Boolean(pendingRoleChange)}
        summary={pendingRoleChange ? <strong>{pendingRoleChange.member.name} · {pendingRoleChange.member.role} → {pendingRoleChange.nextRole}</strong> : undefined}
        title={roleChangeIsBlocked ? "Mantenha um Dono/Admin ativo" : isOwnerTransfer ? "Transferir Dono/Admin?" : "Confirmar alteracao de papel?"}
        tone="sensitive"
      />
    </SetupPagePanel>
  );
}

export interface SettingsChannelsWorkspaceProps extends Omit<SetupChannelsWorkspaceProps, "header" | "footer" | "onAction" | "disabled">, SettingsWorkspaceSaveProps, SettingsWorkspaceOperationalProps {}

export function SettingsChannelsWorkspace({ saveState = "saved", blockedReason, validationError, systemError, onRequestAccess, onRetry, onSave, onCancel, className, ...props }: SettingsChannelsWorkspaceProps) {
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <SetupChannelsWorkspace
      className={cn("tcrm-settings-inherited-workspace", className)}
      data-component="SettingsChannelsWorkspace"
      disabled={Boolean(blockedReason)}
      footer={<>
        <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
        <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
      </>}
      header={<SetupBlockHeader description="Defina os canais oficiais e acompanhe a conexao tecnica sem configurar mensagens ou automacoes." showBadge={false} title="Canais" />}
      {...props}
    />
  );
}

export interface SettingsPlansWorkspaceProps extends Omit<SetupPlansWorkspaceProps, "header" | "footer" | "onAction" | "destructiveAction" | "disabled">, SettingsWorkspaceSaveProps, SettingsWorkspaceOperationalProps {}

const defaultSettingsPlanStates: NonNullable<SetupPlansWorkspaceProps["planStates"]> = {
  weekly: { label: "Ativo", tone: "success", studentsUsing: 18 },
  pack: { label: "Ativo", tone: "success", studentsUsing: 7 },
  trial: { label: "Inativo", tone: "neutral", studentsUsing: 0 }
};

export function SettingsPlansWorkspace({ planStates = defaultSettingsPlanStates, saveState = "saved", blockedReason, validationError, systemError, onRequestAccess, onRetry, onSave, onCancel, className, ...props }: SettingsPlansWorkspaceProps) {
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <SetupPlansWorkspace
      className={cn("tcrm-settings-inherited-workspace", className)}
      data-component="SettingsPlansWorkspace"
      destructiveAction="deactivate"
      disabled={Boolean(blockedReason)}
      footer={<>
        <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
        <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
      </>}
      header={<SetupBlockHeader description="Configure o que o aluno compra, o consumo de aulas e as regras simples de reposicao." showBadge={false} title="Planos e modelos" />}
      planStates={planStates}
      {...props}
    />
  );
}

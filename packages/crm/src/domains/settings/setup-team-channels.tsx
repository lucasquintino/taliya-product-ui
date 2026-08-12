/** Team and communication channel setup workspaces. */
import React from "react";
import {
  Button,
  ButtonGroup,
  Chip,
  InlineGroup,
  InlineAlert,
  Input,
  List,
  ListItem,
  Panel,
  Select,
  StatusDot,
  cn
} from "@taliya/ui";
import type { ComponentTone } from "@taliya/ui";
import { SetupBlockHeader } from "./setup-shell.js";
import { SetupChoiceCard } from "./setup-welcome-workspaces.js";
import { SettingsWorkspaceControls, SetupPagePanel } from "./setup-workspace-utilities.js";
import { InviteRow, RoleCard } from "../../patterns/roles-and-invites.js";
import type { InviteRowData, InviteRowState } from "../../patterns/roles-and-invites.js";

export interface SetupTeamWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  ownerAvatarSrc?: string;
  onAddPerson?: () => void;
  onInviteOpen?: (invite: InviteRowData, state: InviteRowState) => void;
  onInviteEdit?: (invite: InviteRowData, state: InviteRowState) => void;
  onInviteRemove?: (invite: InviteRowData, state: InviteRowState) => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupTeamWorkspace({
  ownerAvatarSrc,
  onAddPerson,
  onInviteOpen,
  onInviteEdit,
  onInviteRemove,
  onAction,
  className,
  ...props
}: SetupTeamWorkspaceProps) {
  const invites: Array<{ state: InviteRowState; invite?: Partial<InviteRowData> }> = [
    { state: "prepared" },
    { state: "prepared", invite: { id: "carla-souza", initials: "CS", name: "Carla Souza", role: "Recepcao", email: "carla@studio.com", phone: "(11) 97777-2222" } },
    { state: "incomplete" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-team-workspace", className)} data-component="SetupTeamWorkspace" {...props}>
      <SetupBlockHeader
        description="Adicione as pessoas que vao usar o Taliya no comeco. Os convites serao enviados automaticamente quando o setup for publicado."
        step={2}
        title="Equipe"
      />
      <Panel className="tcrm-setup-team-workspace__content" compact>
        <section>
          <h3>1. Dono do studio</h3>
          <RoleCard avatarSrc={ownerAvatarSrc} roleLabel="Dono" selected />
        </section>
        <section className="tcrm-setup-team-workspace__add-person">
          <h3>2. Adicionar pessoa</h3>
          <div className="tcrm-setup-team-workspace__fields">
            <Input defaultValue="Ana Martins" fieldSize="sm" label="Nome" />
            <Input defaultValue="ana@studio.com" fieldSize="sm" label="E-mail" type="email" />
            <Input defaultValue="(11) 98888-1111" fieldSize="sm" label="WhatsApp" />
            <Select fieldSize="sm" label="Papel" options={[{ value: "teacher", label: "Professor" }, { value: "reception", label: "Recepcao" }, { value: "finance", label: "Financeiro" }]} value="teacher" />
          </div>
          <Button onClick={onAddPerson} variant="secondary">Adicionar pessoa</Button>
        </section>
        <section>
          <h3>3. Equipe preparada</h3>
          <List>
            {invites.map((item) => (
              <InviteRow
                invite={item.invite}
                key={item.invite?.id ?? item.state}
                onEdit={onInviteEdit}
                onOpen={onInviteOpen}
                onRemove={onInviteRemove}
                state={item.state}
              />
            ))}
          </List>
          <InlineAlert tone="info">Os convites ficam preparados agora e serao enviados automaticamente quando o setup inicial for publicado.</InlineAlert>
        </section>
      </Panel>
      <ButtonGroup className="tcrm-setup-team-workspace__actions">
        <Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button onClick={() => onAction?.("later")} variant="secondary">Configurar equipe depois</Button>
        <Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>
    </SetupPagePanel>
  );
}

export type SetupWhatsAppState = "business" | "personal" | "unknown" | "missing";

export interface SetupChannelsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  whatsAppState?: SetupWhatsAppState;
  connectionStatus?: "connected" | "pending" | "disconnected";
  disabled?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onWhatsAppStateChange?: (state: SetupWhatsAppState) => void;
  onConnectWhatsApp?: () => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupChannelsWorkspace({
  whatsAppState = "business",
  connectionStatus = "pending",
  disabled = false,
  header,
  footer,
  onWhatsAppStateChange,
  onConnectWhatsApp,
  onAction,
  className,
  ...props
}: SetupChannelsWorkspaceProps) {
  const connectionLabel = connectionStatus === "connected" ? "Conectado" : connectionStatus === "disconnected" ? "Desconectado" : "Pendente de conexao oficial";
  const connectionTone: ComponentTone = connectionStatus === "connected" ? "success" : connectionStatus === "disconnected" ? "danger" : "warning";
  const whatsAppOptions: Array<{ id: SetupWhatsAppState; title: string }> = [
    { id: "business", title: "Sim, ja esta no WhatsApp Business" },
    { id: "personal", title: "Ainda esta no WhatsApp pessoal" },
    { id: "unknown", title: "Nao sei" },
    { id: "missing", title: "Ainda nao tenho numero do studio" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-channels-workspace", className)} data-component="SetupChannelsWorkspace" {...props}>
      {header ?? <SetupBlockHeader
        description="Informe os canais oficiais do studio. O WhatsApp Business podera ser conectado oficialmente agora ou ficar como pendencia antes de ativar agentes e mensagens."
        step={3}
        title="Canais"
      />}
      <SettingsWorkspaceControls blocked={disabled}>
        <div className="tcrm-setup-channels-workspace__grid">
        <div className="tcrm-setup-channels-workspace__column">
          <Panel className="tcrm-setup-channels-workspace__whatsapp" compact>
            <h3>1. WhatsApp Business</h3>
            <Input defaultValue="(11) 99999-0000" fieldSize="sm" label="WhatsApp Business do studio" />
            <p>Esse numero esta no WhatsApp Business?</p>
            <div className="tcrm-setup-channels-workspace__choices">
              {whatsAppOptions.map((option) => (
                <SetupChoiceCard
                  description=""
                  key={option.id}
                  onSelect={() => onWhatsAppStateChange?.(option.id)}
                  selected={whatsAppState === option.id}
                  title={option.title}
                />
              ))}
            </div>
            <InlineGroup className="tcrm-setup-channels-workspace__connect" justify="between">
              <Chip icon={connectionStatus === "connected" ? "checkCircle" : "link"} tone={connectionTone}>{connectionLabel}</Chip>
              <Button leadingIcon="link" onClick={onConnectWhatsApp} variant="secondary">{connectionStatus === "connected" ? "Testar conexao" : "Conectar WhatsApp Business"}</Button>
            </InlineGroup>
            <p>Voce continuara usando o WhatsApp Business no celular. A conexao oficial libera atendimento pelo CRM e agentes quando tudo for publicado.</p>
          </Panel>
          <Panel className="tcrm-setup-channels-workspace__public" compact>
            <h3>3. Canais publicos opcionais</h3>
            <p>Adicione redes sociais se quiser. Elas ajudam a registrar onde o studio aparece, mas nao ativam automacoes neste setup inicial.</p>
            <div className="tcrm-setup-channels-workspace__public-fields">
              <Input defaultValue="@studioleticia" fieldSize="sm" label="Instagram" />
              <Input defaultValue="facebook.com/studioleticia" fieldSize="sm" label="Facebook" />
              <Input defaultValue="@studioleticia" fieldSize="sm" label="TikTok" />
              <Input defaultValue="@studioleticia" fieldSize="sm" label="X" />
              <Input defaultValue="studioleticia.com.br" fieldSize="sm" label="Site" />
            </div>
          </Panel>
        </div>
        <div className="tcrm-setup-channels-workspace__column">
          <Panel className="tcrm-setup-channels-workspace__email" compact>
            <h3>2. E-mail do studio</h3>
            <Input defaultValue="contato@studioleticia.com" fieldSize="sm" label="E-mail do studio" type="email" />
            <p>Usado para avisos, convites e comunicacao administrativa. Pode ser o e-mail do dono no comeco.</p>
            <Chip icon="checkCircle" tone="success">Pronto</Chip>
          </Panel>
          <Panel className="tcrm-setup-channels-workspace__status" compact>
            <h3>4. Status dos canais</h3>
            <List divided>
              <ListItem action={<StatusDot label={connectionLabel} status={connectionStatus === "connected" ? "success" : connectionStatus === "disconnected" ? "danger" : "warning"} />} title="WhatsApp Business" />
              <ListItem action={<StatusDot label="Pronto" status="success" />} title="E-mail" />
              <ListItem action={<StatusDot label="4 adicionados" status="info" />} title="Canais publicos" />
            </List>
            <InlineAlert tone="info">O CRM pode seguir. Mensagens e agentes pelo WhatsApp so serao ativados apos a conexao oficial.</InlineAlert>
          </Panel>
        </div>
        </div>
      </SettingsWorkspaceControls>
      {footer ?? <ButtonGroup className="tcrm-setup-channels-workspace__actions">
        <Button disabled={disabled} leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button disabled={disabled} onClick={() => onAction?.("later")} variant="secondary">Configurar canais depois</Button>
        <Button disabled={disabled} onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>}
    </SetupPagePanel>
  );
}

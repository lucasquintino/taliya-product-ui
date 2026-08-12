/** Setup welcome, consumption, and studio workspace compositions. */
import React from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  Icon,
  InlineAlert,
  InlineGroup,
  Input,
  List,
  ListItem,
  Panel,
  PrimitiveButton,
  Select,
  SegmentedControl,
  TimeInput,
  Toggle,
  cn
} from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import { SetupBlockHeader } from "./setup-shell.js";
import { SettingsWorkspaceControls, SetupContentGrid, SetupPagePanel } from "./setup-workspace-utilities.js";
import { WeeklyHoursGrid } from "../../patterns/weekly-hours-grid.js";

export type SetupWelcomeState = "first" | "returning" | "blocked" | "loading";

export interface SetupWelcomeProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  state?: SetupWelcomeState;
  studioName?: string;
  placeholder?: string;
  onStudioNameChange?: (value: string) => void;
  onStart?: () => void;
  disabled?: boolean;
}

export function SetupWelcome({
  state = "first",
  studioName,
  placeholder = "Ex.: Studio Letícia",
  onStudioNameChange,
  onStart,
  disabled = false,
  className,
  ...props
}: SetupWelcomeProps) {
  const [internalStudioName, setInternalStudioName] = React.useState(studioName ?? "");
  const [showNameError, setShowNameError] = React.useState(false);
  const isDisabled = disabled || state === "blocked" || state === "loading";
  const resolvedStudioName = studioName ?? internalStudioName;
  const buttonLabel = state === "returning" ? "Continuar setup guiado" : "Começar setup guiado";

  const handleStudioNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextStudioName = event.currentTarget.value;
    if (studioName === undefined) setInternalStudioName(nextStudioName);
    if (nextStudioName.trim()) setShowNameError(false);
    onStudioNameChange?.(nextStudioName);
  };

  const handleStart = () => {
    if (!resolvedStudioName.trim()) {
      setShowNameError(true);
      return;
    }
    onStart?.();
  };

  return (
    <section
      className={cn("tcrm-setup-welcome", className)}
      data-component="SetupWelcome"
      data-state={state}
      {...props}
    >
      <h1>Bem-vindo à Taliya</h1>
      <p className="tcrm-setup-welcome__subtitle">
        <span>Vamos preparar seu studio passo a passo,</span>
        <span>com ajuda do agente de configuração.</span>
      </p>
      <p className="tcrm-setup-welcome__prompt">Para começar, informe o nome do seu studio.</p>
      <Input
        aria-label="Nome do studio"
        className="tcrm-setup-welcome__input"
        disabled={isDisabled}
        error={showNameError ? "Informe o nome do studio para continuar." : undefined}
        onChange={handleStudioNameChange}
        placeholder={placeholder}
        required
        value={resolvedStudioName}
      />
      <Button
        className="tcrm-setup-welcome__button"
        disabled={isDisabled}
        loading={state === "loading"}
        onClick={handleStart}
        size="lg"
        variant="primary"
      >
        {buttonLabel}
      </Button>
    </section>
  );
}

export type SetupChoiceCardState = "default" | "recommended" | "selected" | "disabled";

export interface SetupChoiceCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  title?: string;
  description?: string;
  state?: SetupChoiceCardState;
  selected?: boolean;
  icon?: IconName;
  onSelect?: () => void;
}

export function SetupChoiceCard({
  title = "Pacote de aulas",
  description = "Pacote com quantidade de aulas por ciclo.",
  state = "default",
  selected = false,
  disabled = false,
  icon = "calendar",
  onSelect,
  className,
  type = "button",
  ...props
}: SetupChoiceCardProps) {
  const isSelected = selected || state === "selected";
  const isDisabled = disabled || state === "disabled";

  return (
    <PrimitiveButton
      aria-pressed={isSelected}
      className={cn("tcrm-setup-choice-card", className)}
      data-component="SetupChoiceCard"
      data-state={isDisabled ? "disabled" : isSelected ? "selected" : state}
      disabled={isDisabled}
      onClick={onSelect}
      type={type}
      {...props}
    >
      <span className="tcrm-setup-choice-card__icon" aria-hidden="true">
        {isSelected ? <span className="tcrm-setup-choice-card__selected-dot" /> : <Icon name={icon} />}
      </span>
      <span className="tcrm-setup-choice-card__body">
        <span className="tcrm-setup-choice-card__title">{title}</span>
        <span className="tcrm-setup-choice-card__description">{description}</span>
      </span>
    </PrimitiveButton>
  );
}

export type SetupConsumptionModel = "membership" | "class-pack" | "hybrid";

export interface SetupConsumptionWorkspaceProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  model?: SetupConsumptionModel;
  onModelSelect?: (model: SetupConsumptionModel) => void;
  onAction?: (action: "save" | "continue" | "later") => void;
  onSettingChange?: (setting: string, enabled: boolean) => void;
}

export function SetupConsumptionWorkspace({
  model = "class-pack",
  onModelSelect,
  onAction,
  onSettingChange,
  className,
  ...props
}: SetupConsumptionWorkspaceProps) {
  const models: Array<{ id: SetupConsumptionModel; title: string; description: string }> = [
    { id: "membership", title: "Mensalidade", description: "Cobranca recorrente por periodo." },
    { id: "class-pack", title: "Pacote de aulas", description: "Pacote com quantidade de aulas por ciclo." },
    { id: "hybrid", title: "Hibrido", description: "Combina mensalidade e pacotes." }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-consumption-workspace", className)} data-component="SetupConsumptionWorkspace" {...props}>
      <SetupBlockHeader
        badgeLabel="Rascunho"
        description="Defina como mensalidades, pacotes e reposicoes funcionam no setup inicial. Ajustes finos podem ficar para depois do go-live."
        title="Consumo de aulas"
      />

      <Panel className="tcrm-setup-consumption-workspace__models" compact>
        <h3>Modelo principal</h3>
        <SetupContentGrid>
          {models.map((item) => (
            <SetupChoiceCard
              description={item.description}
              key={item.id}
              onSelect={() => onModelSelect?.(item.id)}
              selected={model === item.id}
              title={item.title}
            />
          ))}
        </SetupContentGrid>
      </Panel>

      <div className="tcrm-setup-consumption-workspace__settings">
        <Panel compact>
          <h3>Pacote base</h3>
          <div className="tcrm-setup-consumption-workspace__field-row">
            <Input defaultValue="8" fieldSize="sm" label="Aulas por mes" type="number" />
            <Select fieldSize="sm" label="Validade" options={[{ value: "monthly", label: "Mensal" }]} value="monthly" />
          </div>
          <Toggle compact defaultPressed label="Renova automaticamente" onPressedChange={(checked) => onSettingChange?.("auto-renew", checked)} />
          <Toggle compact defaultPressed label="Saldo expira no fim do ciclo" onPressedChange={(checked) => onSettingChange?.("balance-expires", checked)} />
        </Panel>
        <Panel compact>
          <h3>Reposicoes</h3>
          <Toggle compact defaultPressed label="Permitir reposicao" onPressedChange={(checked) => onSettingChange?.("allow-replacement", checked)} />
          <Input defaultValue="7" fieldSize="sm" label="Prazo para usar reposicao" trailingText="dias" />
          <Select fieldSize="sm" label="Aviso minimo para gerar reposicao" options={[{ value: "12h", label: "12h" }]} value="12h" />
          <Toggle compact defaultPressed label="Reposicao consome vaga da turma" onPressedChange={(checked) => onSettingChange?.("replacement-uses-slot", checked)} />
        </Panel>
        <Panel compact>
          <h3>Excecoes simples</h3>
          <List divided>
            <ListItem action={<Chip tone="warning">Pode ficar para depois</Chip>} leading={<Icon name="calendar" tone="warning" />} title="Feriados" />
            <ListItem action={<Chip tone="warning">Revisar depois</Chip>} leading={<Icon name="calendar" tone="warning" />} title="Contratos antigos" />
            <ListItem action={<Chip tone="neutral">Nao gera reposicao</Chip>} leading={<Icon name="x" />} title="Faltas sem aviso" />
          </List>
        </Panel>
        <InlineAlert className="tcrm-setup-consumption-workspace__validation" tone="info" title="Validacao da configuracao">
          Esta regra base pode ser salva como rascunho. Feriados e contratos antigos podem ficar como pendencia segura.
        </InlineAlert>
      </div>

      <footer className="tcrm-setup-consumption-workspace__footer">
        <div>
          <h3>Acoes da etapa</h3>
          <ButtonGroup>
            <Button leadingIcon="check" onClick={() => onAction?.("save")} size="sm" variant="primary">Salvar rascunho</Button>
            <Button onClick={() => onAction?.("continue")} size="sm" trailingIcon="arrowRight" variant="secondary">Continuar</Button>
            <Button leadingIcon="clock" onClick={() => onAction?.("later")} size="sm" variant="secondary">Configurar depois</Button>
          </ButtonGroup>
        </div>
        <Panel compact>
          <InlineGroup><Icon name="barChart" size="24px" /><strong>Previa de impacto entra aqui</strong></InlineGroup>
          <p>Espaco reservado para a previa de impacto apos salvar as configuracoes.</p>
        </Panel>
      </footer>
    </SetupPagePanel>
  );
}

export interface SetupStudioWorkspaceProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  activeDays?: string[];
  scheduleMode?: "continuous" | "break";
  disabled?: boolean;
  header?: React.ReactNode;
  details?: React.ReactNode;
  footer?: React.ReactNode;
  onActiveDaysChange?: (days: string[]) => void;
  onScheduleModeChange?: (mode: "continuous" | "break") => void;
  onAdjustDay?: () => void;
  onAction?: (action: "save" | "continue") => void;
}

export function SetupStudioWorkspace({
  activeDays = ["Seg", "Ter", "Qua", "Qui", "Sex"],
  scheduleMode = "continuous",
  disabled = false,
  header,
  details,
  footer,
  onActiveDaysChange,
  onScheduleModeChange,
  onAdjustDay,
  onAction,
  className,
  ...props
}: SetupStudioWorkspaceProps) {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
  const toggleDay = (day: string) => {
    const next = activeDays.includes(day) ? activeDays.filter((item) => item !== day) : [...activeDays, day];
    onActiveDaysChange?.(next);
  };

  return (
    <SetupPagePanel className={cn("tcrm-setup-studio-workspace", className)} data-component="SetupStudioWorkspace" {...props}>
      {header ?? <SetupBlockHeader title="Studio" />}
      <SettingsWorkspaceControls blocked={disabled}>
        <div className="tcrm-setup-studio-workspace__grid">
        <Panel className="tcrm-setup-studio-workspace__form" compact>
          {details}
          <section>
            <h3>1. Dias de funcionamento</h3>
            <p>Em quais dias o studio funciona?</p>
            <div className="tcrm-setup-studio-workspace__days">
              {days.map((day) => (
                <Checkbox checked={activeDays.includes(day)} key={day} label={day} onChange={() => toggleDay(day)} />
              ))}
            </div>
          </section>
          <section>
            <h3>2. Horario geral</h3>
            <div className="tcrm-setup-studio-workspace__time-row">
              <TimeInput defaultValue="07:00" fieldSize="sm" label="Abre as" />
              <TimeInput defaultValue="21:00" fieldSize="sm" label="Fecha as" />
            </div>
            <p>O studio fecha em algum intervalo do dia?</p>
            <SegmentedControl
              label="Intervalo do studio"
              onChange={(value) => onScheduleModeChange?.(value as "continuous" | "break")}
              options={[{ value: "continuous", label: "Funciona direto" }, { value: "break", label: "Tem pausa" }]}
              value={scheduleMode}
            />
            <div className="tcrm-setup-studio-workspace__time-row">
              <TimeInput defaultValue="12:00" fieldSize="sm" label="Pausa comeca" />
              <TimeInput defaultValue="13:00" fieldSize="sm" label="Pausa termina" />
            </div>
          </section>
        </Panel>
        <Panel className="tcrm-setup-studio-workspace__preview" compact>
          <WeeklyHoursGrid onAdjustDay={onAdjustDay} />
        </Panel>
        </div>
      </SettingsWorkspaceControls>
      {footer ?? <ButtonGroup className="tcrm-setup-studio-workspace__actions">
        <Button disabled={disabled} leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button disabled={disabled} onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>}
    </SetupPagePanel>
  );
}

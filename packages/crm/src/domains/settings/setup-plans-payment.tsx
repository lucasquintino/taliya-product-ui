/** Plan and payment setup workspaces. */
import React from "react";
import {
  Button,
  ButtonGroup,
  Chip,
  Icon,
  InlineAlert,
  InlineGroup,
  Input,
  List,
  ListItem,
  Panel,
  SegmentedControl,
  cn
} from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { SetupBlockHeader } from "./setup-shell.js";
import { SettingsWorkspaceControls, SetupPagePanel } from "./setup-workspace-utilities.js";
import { SetupChoiceCard } from "./setup-welcome-workspaces.js";
import { IntegrationStatusRow } from "../billing/billing-settings-hub.js";

export type SetupPlanId = "weekly" | "pack" | "trial";
export type SetupPlanField = "name" | "type" | "value" | "quantity" | "recurrence" | "validity" | "replacement" | "replacementDeadline" | "replacementNotice";

export const setupPlansDefaultFieldValues: Record<SetupPlanField, string> = {
  name: "Pacote 8 aulas",
  type: "pack",
  value: "420,00",
  quantity: "8",
  recurrence: "none",
  validity: "30",
  replacement: "yes",
  replacementDeadline: "7",
  replacementNotice: "12"
};

export interface SetupPlansWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  selectedPlanId?: SetupPlanId;
  disabled?: boolean;
  fieldValues?: Partial<Record<SetupPlanField, string>>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  planStates?: Partial<Record<SetupPlanId, { label: string; tone: ComponentTone; studentsUsing?: number }>>;
  destructiveAction?: "remove" | "deactivate";
  onPlanSelect?: (planId: SetupPlanId) => void;
  onNewPlan?: () => void;
  onPlanAction?: (planId: SetupPlanId, action: "edit" | "duplicate" | "remove" | "deactivate") => void;
  onFieldChange?: (field: SetupPlanField, value: string) => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupPlansWorkspace({
  selectedPlanId = "pack",
  disabled = false,
  fieldValues = {},
  header,
  footer,
  planStates,
  destructiveAction = "remove",
  onPlanSelect,
  onNewPlan,
  onPlanAction,
  onFieldChange,
  onAction,
  className,
  ...props
}: SetupPlansWorkspaceProps) {
  const fieldValue = (field: SetupPlanField) => fieldValues[field] ?? setupPlansDefaultFieldValues[field];
  const plans: Array<{ id: SetupPlanId; title: string; type: string; value: string; replacement: string; tone: ComponentTone }> = [
    { id: "weekly", title: "Pilates 2x por semana", type: "Mensalidade por frequencia semanal", value: "R$ 360/mes · 2x por semana", replacement: "Permite reposicao", tone: "success" },
    { id: "pack", title: "Pacote 8 aulas", type: "Pacote de aulas", value: "R$ 420 · 8 aulas", replacement: "Permite reposicao", tone: "success" },
    { id: "trial", title: "Aula experimental", type: "Experimental/Avaliacao", value: "R$ 0 · 1 aula", replacement: "Nao gera reposicao", tone: "danger" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-plans-workspace", className)} data-component="SetupPlansWorkspace" {...props}>
      {header ?? <SetupBlockHeader
        description="Cadastre os planos que o studio oferece aos alunos. Voce pode comecar pelos principais e ajustar detalhes depois."
        step={4}
        title="Planos"
      />}
      <SettingsWorkspaceControls blocked={disabled}>
        <div className="tcrm-setup-plans-workspace__grid">
        <Panel className="tcrm-setup-plans-workspace__list" compact>
          <InlineGroup justify="between"><h3>Planos criados</h3><Button leadingIcon="plus" onClick={onNewPlan} size="sm" variant="secondary">Novo plano</Button></InlineGroup>
          {plans.map((plan) => (
            <Panel className={cn("tcrm-setup-plans-workspace__plan", selectedPlanId === plan.id && "tcrm-setup-plans-workspace__plan--selected")} compact key={plan.id}>
              <Button className="tcrm-setup-plans-workspace__plan-select" onClick={() => onPlanSelect?.(plan.id)} variant="ghost">
                <strong>{plan.title}</strong><span>{plan.type}</span><b>{plan.value}</b><Chip icon={plan.tone === "success" ? "checkCircle" : "x"} tone={plan.tone}>{plan.replacement}</Chip>
                {planStates?.[plan.id] ? <Chip tone={planStates[plan.id]?.tone}>{planStates[plan.id]?.label}</Chip> : null}
                {planStates?.[plan.id]?.studentsUsing !== undefined ? <span>{planStates[plan.id]?.studentsUsing} alunos usando</span> : null}
              </Button>
              <ButtonGroup>
                <Button leadingIcon="edit" onClick={() => onPlanAction?.(plan.id, "edit")} size="sm" variant="ghost">Editar</Button>
                <Button leadingIcon="copy" onClick={() => onPlanAction?.(plan.id, "duplicate")} size="sm" variant="ghost">Duplicar</Button>
                <Button leadingIcon={destructiveAction === "deactivate" ? "x" : "trash"} onClick={() => onPlanAction?.(plan.id, destructiveAction)} size="sm" tone="danger" variant="ghost">{destructiveAction === "deactivate" ? "Inativar" : "Remover"}</Button>
              </ButtonGroup>
            </Panel>
          ))}
        </Panel>
        <Panel className="tcrm-setup-plans-workspace__editor" compact>
          <InlineGroup justify="between"><div><h3>Editar plano selecionado</h3><p>Voce pode ajustar este plano depois do go-live.</p></div><Chip>Rascunho</Chip></InlineGroup>
          <Input fieldSize="sm" label="1. Nome do plano" onChange={(event) => onFieldChange?.("name", event.currentTarget.value)} value={fieldValue("name")} />
          <div className="tcrm-setup-plans-workspace__field"><strong>2. Tipo do plano</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--type" compact label="2. Tipo do plano" onChange={(value) => onFieldChange?.("type", value)} options={[{ value: "weekly", label: "Mensalidade por frequencia semanal" }, { value: "quantity", label: "Mensalidade por quantidade mensal" }, { value: "pack", label: "Pacote de aulas" }, { value: "single", label: "Aula avulsa" }, { value: "trial", label: "Experimental/Avaliacao" }, { value: "other", label: "Outro" }]} value={fieldValue("type")} /></div>
          <Input fieldSize="sm" label="3. Valor" leadingText="R$" onChange={(event) => onFieldChange?.("value", event.currentTarget.value)} value={fieldValue("value")} />
          <div className="tcrm-setup-plans-workspace__field"><strong>4. Quantidade de aulas</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--quantity" compact label="4. Quantidade de aulas" onChange={(value) => onFieldChange?.("quantity", value)} options={[{ value: "1", label: "1 aula" }, { value: "5", label: "5 aulas" }, { value: "8", label: "8 aulas" }, { value: "10", label: "10 aulas" }, { value: "12", label: "12 aulas" }, { value: "20", label: "20 aulas" }, { value: "custom", label: "Personalizado" }]} value={fieldValue("quantity")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><strong>5. Recorrencia</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--three" compact label="5. Recorrencia" onChange={(value) => onFieldChange?.("recurrence", value)} options={[{ value: "none", label: "Sem recorrencia" }, { value: "renew", label: "Renova automaticamente" }, { value: "later", label: "Decidir depois" }]} value={fieldValue("recurrence")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><strong>6. Validade</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--validity" compact label="6. Validade" onChange={(value) => onFieldChange?.("validity", value)} options={[{ value: "30", label: "30 dias" }, { value: "60", label: "60 dias" }, { value: "90", label: "90 dias" }, { value: "none", label: "Sem validade" }, { value: "custom", label: "Personalizado" }, { value: "later", label: "Decidir depois" }]} value={fieldValue("validity")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><strong>7. Reposicao</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--three" compact label="7. Reposicao" onChange={(value) => onFieldChange?.("replacement", value)} options={[{ value: "yes", label: "Sim" }, { value: "no", label: "Nao" }, { value: "later", label: "Decidir depois" }]} value={fieldValue("replacement")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><span>Prazo para usar a reposicao</span><SegmentedControl className="tcrm-setup-plans-workspace__segments--deadline" compact label="Prazo para usar a reposicao" onChange={(value) => onFieldChange?.("replacementDeadline", value)} options={[{ value: "7", label: "7 dias" }, { value: "15", label: "15 dias" }, { value: "30", label: "30 dias" }, { value: "cycle", label: "Ate o fim do ciclo" }, { value: "custom", label: "Personalizado" }]} value={fieldValue("replacementDeadline")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><span>Aviso minimo para gerar reposicao</span><SegmentedControl className="tcrm-setup-plans-workspace__segments--notice" compact label="Aviso minimo para gerar reposicao" onChange={(value) => onFieldChange?.("replacementNotice", value)} options={[{ value: "none", label: "Sem aviso minimo" }, { value: "2", label: "2h antes" }, { value: "6", label: "6h antes" }, { value: "12", label: "12h antes" }, { value: "24", label: "24h antes" }, { value: "custom", label: "Personalizado" }]} value={fieldValue("replacementNotice")} /></div>
          <InlineAlert tone="info">A aula prevista consome saldo normalmente. Quando a regra permitir, o sistema gera uma reposicao para compensar a falta.</InlineAlert>
        </Panel>
        <Panel className="tcrm-setup-plans-workspace__understanding" compact>
          <h3>Como o Taliya vai entender este plano</h3>
          <p>Este e um pacote de 8 aulas por R$ 420. O aluno tem 8 aulas no total, independentemente do tamanho do mes. Se esse aluno tiver horario fixo depois, cada aula prevista continua consumindo saldo do pacote. Reposicoes podem ser geradas quando o aluno avisa com 12h de antecedencia e ficam validas por 7 dias.</p>
          <List divided>
            <ListItem action="8 aulas" title="Saldo" />
            <ListItem action="30 dias" title="Validade" />
            <ListItem action="Sim, com aviso de 12h" title="Reposicao" />
            <ListItem action="Definido depois" title="Horario fixo" />
          </List>
        </Panel>
        </div>
      </SettingsWorkspaceControls>
      {footer ?? <ButtonGroup className="tcrm-setup-plans-workspace__actions">
        <Button disabled={disabled} leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button disabled={disabled} onClick={() => onAction?.("later")} variant="secondary">Configurar planos depois</Button>
        <Button disabled={disabled} onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>}
    </SetupPagePanel>
  );
}

export type SetupPaymentMethod = "pix" | "cash" | "card";

export interface SetupPaymentWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  selectedMethods?: SetupPaymentMethod[];
  onSelectedMethodsChange?: (methods: SetupPaymentMethod[]) => void;
  onLearnMore?: () => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupPaymentWorkspace({
  selectedMethods = ["pix", "cash", "card"],
  onSelectedMethodsChange,
  onLearnMore,
  onAction,
  className,
  ...props
}: SetupPaymentWorkspaceProps) {
  const methods: Array<{ id: SetupPaymentMethod; title: string; description: string; icon: IconName }> = [
    { id: "pix", title: "Pix", description: "Pagamento por Pix", icon: "banknote" },
    { id: "cash", title: "Dinheiro", description: "Recebido presencialmente", icon: "banknote" },
    { id: "card", title: "Cartao", description: "Cartao presencial", icon: "creditCard" }
  ];
  const toggleMethod = (method: SetupPaymentMethod) => {
    const next = selectedMethods.includes(method) ? selectedMethods.filter((item) => item !== method) : [...selectedMethods, method];
    onSelectedMethodsChange?.(next);
  };
  const flow = [
    { icon: "document" as IconName, label: "Plano gera cobranca" },
    { icon: "user" as IconName, label: "Aluno paga por um meio aceito" },
    { icon: "users" as IconName, label: "Equipe registra a baixa no Taliya" },
    { icon: "checkCircle" as IconName, label: "Cobranca fica paga" },
    { icon: "unlock" as IconName, label: "Aulas ou saldo sao liberados" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-payment-workspace", className)} data-component="SetupPaymentWorkspace" {...props}>
      <SetupBlockHeader description="Defina os meios aceitos no inicio e veja como o Taliya vai registrar pagamentos na operacao." step={5} totalSteps={9} title="Pagamento" />
      <Panel className="tcrm-setup-payment-workspace__methods" compact>
        <h3>1. Meios de pagamento</h3>
        <p>Selecione os meios que o studio aceita hoje. Os detalhes tecnicos e automacoes ficam para depois.</p>
        <div className="tcrm-setup-payment-workspace__method-grid">
          {methods.map((method) => (
            <SetupChoiceCard
              description={method.description}
              icon={method.icon}
              key={method.id}
              onSelect={() => toggleMethod(method.id)}
              selected={selectedMethods.includes(method.id)}
              title={method.title}
            />
          ))}
        </div>
      </Panel>
      <Panel className="tcrm-setup-payment-workspace__flow" compact>
        <h3>2. Exemplo da operacao</h3>
        <div className="tcrm-setup-payment-workspace__flow-steps">
          {flow.map((item, index) => (
            <React.Fragment key={item.label}>
              <div><Chip>{index + 1}</Chip><Icon name={item.icon} size="28px" /><strong>{item.label}</strong></div>
              {index < flow.length - 1 ? <Icon name="arrowRight" /> : null}
            </React.Fragment>
          ))}
        </div>
        <p><Icon name="info" /> Funciona para Pix, dinheiro ou cartao. No inicio, a confirmacao e feita pela equipe dentro do Taliya.</p>
      </Panel>
      <Panel className="tcrm-setup-payment-workspace__future" compact>
        <InlineGroup justify="between"><div><h3>3. Pagamentos Taliya</h3><p>Depois que o studio estiver operando, voce podera automatizar cobrancas e confirmacoes sem refazer este setup.</p></div><Chip>Pos-go-live</Chip></InlineGroup>
        <div className="tcrm-setup-payment-workspace__future-grid">
          <IntegrationStatusRow description="Identifica pagamentos e baixa cobrancas" provider="pix" showDivider={false} state="connected" title="Pix automatico" />
          <IntegrationStatusRow description="Permite cobranca digital pelo Taliya" provider="card" showDivider={false} state="connected" title="Cartao online" />
          <IntegrationStatusRow description="Cobra mensalidades recorrentes" provider="recurrence" showDivider={false} state="connected" title="Recorrencia automatica" />
          <IntegrationStatusRow description="Ajuda a conferir pagamentos recebidos" provider="reconciliation" showDivider={false} state="connected" title="Conciliacao" />
        </div>
        <InlineGroup justify="between"><InlineAlert tone="info">Agora: registro e baixa manual no Taliya. Depois: automacao financeira em Pagamentos Taliya.</InlineAlert><Button onClick={onLearnMore} variant="secondary">Entender Pagamentos Taliya</Button></InlineGroup>
      </Panel>
      <ButtonGroup className="tcrm-setup-payment-workspace__actions">
        <Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button onClick={() => onAction?.("later")} variant="secondary">Configurar pagamento depois</Button>
        <Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>
    </SetupPagePanel>
  );
}

export type SetupStudentSource = "files" | "photo" | "paste" | "manual";

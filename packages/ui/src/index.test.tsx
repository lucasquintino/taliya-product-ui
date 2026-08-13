import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { alertIconForTone } from "./components/workflow-utilities";

import {
  ActionMenu,
  AttachmentList,
  Avatar,
  AvatarStack,
  AuditTable,
  Badge,
  Breadcrumb,
  Button,
  Chip,
  CalendarCell,
  CalendarGrid,
  CalendarEventBlock,
  ChartPanelPrimitive,
  Checkbox,
  ChecklistItem,
  ComposerInput,
  ConfidenceMeter,
  ConfirmDialog,
  ConnectorLine,
  ContentGrid,
  ConflictCard,
  DataTable,
  DateInput,
  DiffTable,
  DocumentPreview,
  DropdownMenu,
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerSection,
  EmptyState,
  ErrorState,
  ExecutionRow,
  FileUpload,
  FieldGroup,
  FieldGrid,
  FieldStack,
  FilterBar,
  FilterChip,
  FilterMultiSelect,
  FilterSelect,
  FlowNode,
  Icon,
  IconButton,
  ImportProgressCard,
  InlineAlert,
  InlineGroup,
  Input,
  KeyValueRow,
  LoadingState,
  ListIcon,
  List,
  ListItem,
  MetricTile,
  MoneyInput,
  Modal,
  NavPill,
  Panel,
  PanelBody,
  PanelHeader,
  PasswordInput,
  Popover,
  PermissionTable,
  ProgressBar,
  PrimitiveButton,
  PrimitiveInput,
  RelationshipCard,
  Radio,
  SearchInput,
  ScrollArea,
  SegmentedControl,
  Select,
  SocialAuthButton,
  Stack,
  StatePage,
  StatusDot,
  StatusSummaryCard,
  Stepper,
  Tabs,
  TablePagination,
  TaliyaLogo,
  TagInput,
  Textarea,
  TimeInput,
  Timeline,
  Toggle,
  Toolbar,
  Tooltip,
  Toast,
  MessageBubble
} from "./index";

afterEach(() => cleanup());

describe("@taliya/ui primitives", () => {
  it("forwards file action and attachment removal callbacks", () => {
    const onAction = vi.fn();
    const onRemove = vi.fn();
    const attachment = { id: "contract", name: "contrato.pdf" };

    render(
      <>
        <FileUpload onAction={onAction} />
        <AttachmentList items={[attachment]} onRemove={onRemove} removable />
      </>
    );

    fireEvent.click(screen.getByRole("button", { name: "Selecionar" }));
    fireEvent.click(screen.getByRole("button", { name: "Remover contrato.pdf" }));

    expect(onAction).toHaveBeenCalledOnce();
    expect(onRemove).toHaveBeenCalledWith(attachment);
  });

  it("keeps direct interaction contracts for public input and action helpers", () => {
    const onNav = vi.fn();
    const onRadio = vi.fn();
    const onSocial = vi.fn();
    const onMenu = vi.fn();

    render(
      <>
        <NavPill onClick={onNav}>Agenda</NavPill>
        <PasswordInput aria-label="Senha" />
        <Radio label="Plano mensal" onChange={onRadio} />
        <SocialAuthButton onClick={onSocial} provider="Google" />
        <ActionMenu actions={[{ label: "Abrir", onSelect: onMenu }]} label="Acoes" />
      </>
    );

    fireEvent.click(screen.getByRole("button", { name: "Agenda" }));
    fireEvent.click(screen.getByRole("button", { name: "Mostrar senha" }));
    fireEvent.click(screen.getByRole("radio", { name: "Plano mensal" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar com Google" }));
    fireEvent.click(screen.getByRole("button", { name: "Acoes" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Abrir" }));

    expect(onNav).toHaveBeenCalledOnce();
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "text");
    expect(onRadio).toHaveBeenCalledOnce();
    expect(onSocial).toHaveBeenCalledOnce();
    expect(onMenu).toHaveBeenCalledOnce();
  });

  it("uses a placeholder as the accessible name when an input has no visible label", () => {
    render(<Input placeholder="Buscar registros" type="search" />);

    expect(screen.getByRole("searchbox", { name: "Buscar registros" })).toBeInTheDocument();
  });

  it("emits distinct badge tone classes", () => {
    render(
      <div>
        <Badge>Neutral</Badge>
        <Badge tone="success">Success</Badge>
        <Badge tone="info">Info</Badge>
        <Badge tone="warning">Warning</Badge>
        <Badge tone="danger">Danger</Badge>
      </div>
    );

    expect(screen.getByText("Neutral")).toHaveClass("tl-badge--neutral");
    expect(screen.getByText("Success")).toHaveClass("tl-badge--success");
    expect(screen.getByText("Info")).toHaveClass("tl-badge--info");
    expect(screen.getByText("Warning")).toHaveClass("tl-badge--warning");
    expect(screen.getByText("Danger")).toHaveClass("tl-badge--danger");
  });

  it("renders official inline alignment variants", () => {
    render(<InlineGroup data-testid="inline-group" justify="between"><span>Inicio</span><span>Fim</span></InlineGroup>);

    expect(screen.getByTestId("inline-group")).toHaveClass("tl-inline-group--justify-between");
  });

  it("renders stack with tokenized gap variants", () => {
    render(
      <Stack gap="lg" data-testid="stack">
        <span>Resumo</span>
        <span>Proxima acao</span>
      </Stack>
    );

    expect(screen.getByTestId("stack")).toHaveClass("tl-stack", "tl-stack--lg");
    expect(screen.getByText("Resumo")).toBeInTheDocument();
  });

  it("renders toolbar alignment and wrap variants", () => {
    render(
      <Toolbar align="start" data-testid="toolbar" justify="end" wrap>
        <Chip tone="warning">Mock</Chip>
        <Button size="sm">Acao</Button>
      </Toolbar>
    );

    expect(screen.getByTestId("toolbar")).toHaveClass(
      "tl-toolbar",
      "tl-toolbar--align-start",
      "tl-toolbar--justify-end",
      "tl-toolbar--wrap"
    );
  });

  it("renders field grid column variants", () => {
    render(
      <FieldGrid columns={4} data-testid="field-grid">
        <Input label="Nome" />
        <Input label="Email" />
      </FieldGrid>
    );

    expect(screen.getByTestId("field-grid")).toHaveClass("tl-field-grid", "tl-field-grid--4");
  });

  it("renders content grid column variants", () => {
    render(
      <ContentGrid columns={3} data-testid="content-grid">
        <DrawerSection title="Resumo">Conteudo</DrawerSection>
        <DrawerSection title="Origem">Agenda</DrawerSection>
      </ContentGrid>
    );

    expect(screen.getByTestId("content-grid")).toHaveClass("tl-content-grid", "tl-content-grid--3");
  });

  it("renders key value rows through the official list item anatomy", () => {
    render(<KeyValueRow label="Status" value="Completo" valueTone="success" />);

    expect(screen.getByText("Status").closest("[role='listitem']")).toHaveClass("tl-list-item");
    expect(screen.getByText("Completo")).toHaveClass("tl-meta-text", "tl-meta-text--success");
  });

  it("renders panel header title, metadata and actions", () => {
    const action = vi.fn();

    render(
      <Panel minHeight="md" data-testid="panel">
        <PanelHeader
          action={<Button onClick={action}>Atualizar</Button>}
          description="Resumo operacional"
          meta={<Chip tone="warning">3</Chip>}
          title="Painel de filas"
        />
      </Panel>
    );

    expect(screen.getByRole("heading", { name: "Painel de filas" })).toBeInTheDocument();
    expect(screen.getByTestId("panel")).toHaveClass("tl-panel--min-height-md");
    expect(screen.getByText("Resumo operacional")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Atualizar" }));

    expect(action).toHaveBeenCalledTimes(1);
  });

  it("renders panel body density variants", () => {
    render(
      <Panel>
        <PanelBody compact data-testid="panel-body">
          Conteudo
        </PanelBody>
      </Panel>
    );

    expect(screen.getByTestId("panel-body")).toHaveClass("tl-panel-body", "tl-panel-body--compact");
  });

  it("renders compact textarea density", () => {
    render(<Textarea data-testid="textarea" density="compact" label="Mensagem" />);

    expect(screen.getByTestId("textarea")).toHaveClass("tl-textarea", "tl-textarea--compact");
  });

  it("renders field stack density variants", () => {
    render(
      <FieldStack data-testid="field-stack" gap="md">
        <Input label="Nome" />
      </FieldStack>
    );

    expect(screen.getByTestId("field-stack")).toHaveClass("tl-field-stack", "tl-field-stack--md");
  });

  it("renders tag input with removable items", () => {
    const remove = vi.fn();

    render(
      <TagInput
        items={["Recepção", "Coordenação"]}
        label="Responsáveis"
        onRemove={remove}
        removable
      />
    );

    expect(screen.getByRole("group", { name: "Responsáveis" })).toBeInTheDocument();
    expect(screen.getByText("Recepção")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Remover Recepção" }));

    expect(remove).toHaveBeenCalledWith({ id: "Recepção", label: "Recepção" }, 0);
  });

  it("renders state page with semantic element variants", () => {
    render(
      <StatePage as="main" data-testid="state-page">
        <LoadingState title="Carregando" />
      </StatePage>
    );

    expect(screen.getByTestId("state-page")).toHaveClass("tl-state-page");
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByText("Carregando")).toBeInTheDocument();
  });

  it("renders accessible actions with icon-only labels", () => {
    render(
      <div>
        <Button leadingIcon="plus" loading>
          Criar tarefa
        </Button>
        <IconButton icon="search" label="Buscar" />
        <IconButton icon="refresh" label="Atualizando" loading />
      </div>
    );

    expect(screen.getByRole("button", { name: /criar tarefa/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /criar tarefa/i })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: /buscar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /atualizando/i })).toHaveAttribute("aria-busy", "true");
  });

  it("applies a base CSS size variable to standalone icons", () => {
    render(
      <div>
        <Icon data-testid="standalone-icon" name="chevronRight" size="sm" />
        <Icon data-testid="shopping-cart-icon" name="shoppingCart" />
        <Button data-testid="small-button" leadingIcon="plus" size="sm">
          Pequeno
        </Button>
      </div>
    );

    expect(screen.getByTestId("standalone-icon")).toHaveStyle({
      "--tl-icon-size": "var(--taliya-control-icon-size-sm)"
    });
    expect(screen.getByTestId("shopping-cart-icon")).toHaveClass("tl-icon");
    expect(screen.getByTestId("small-button").querySelector(".tl-icon")).toHaveClass("tl-icon");
  });

  it("renders operational status and progress primitives", () => {
    render(
      <div>
        <Chip tone="warning">Atencao</Chip>
        <StatusDot label="Pendente" status="pending" />
        <ProgressBar value={72} label="Uso do mes" />
      </div>
    );

    expect(screen.getByText("Atencao")).toBeInTheDocument();
    expect(screen.getByText("Pendente")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: /uso do mes/i })).toHaveAttribute(
      "aria-valuenow",
      "72"
    );
  });

  it("renders the canonical Taliya logo variants", () => {
    render(
      <div>
        <TaliyaLogo />
        <TaliyaLogo label="Marca Taliya" variant="mark" />
      </div>
    );

    expect(screen.getByRole("img", { name: "Taliya" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Marca Taliya" })).toBeInTheDocument();
  });

  it("renders form, table, drawer, state, and tabs anatomy", () => {
    render(
      <div>
        <Input label="Nome" defaultValue="Studio Taliya" />
        <DataTable
          columns={[{ key: "student", header: "Aluno" }]}
          rows={[{ id: "1", student: "Ana" }]}
        />
        <Drawer modal={false} open title="Tarefa">
          Conteudo
        </Drawer>
        <EmptyState title="Sem dados" action={<Button>Adicionar</Button>} />
        <Tabs
          items={[
            { value: "resumo", label: "Resumo", content: "Resumo" },
            { value: "historico", label: "Historico", content: "Historico" }
          ]}
        />
      </div>
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: /tarefa/i })).toBeInTheDocument();
    expect(screen.getByText("Sem dados")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /resumo/i })).toBeInTheDocument();
  });

  it("supports accessible tabs keyboard navigation and external panels", () => {
    const change = vi.fn();

    render(
      <Tabs
        aria-label="Perfil"
        items={[
          { value: "resumo", label: "Resumo", content: "Resumo" },
          { value: "agenda", label: "Agenda", content: "Agenda" },
          { value: "historico", label: "Historico", content: "Historico" }
        ]}
        onValueChange={change}
        showPanel={false}
      />
    );

    const tablist = screen.getByRole("tablist", { name: "Perfil" });
    const resumo = within(tablist).getByRole("tab", { name: "Resumo" });
    const agenda = within(tablist).getByRole("tab", { name: "Agenda" });

    expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
    resumo.focus();
    fireEvent.keyDown(resumo, { key: "ArrowRight" });

    expect(agenda).toHaveFocus();
    expect(agenda).toHaveAttribute("aria-selected", "true");
    expect(change).toHaveBeenCalledWith("agenda");
  });

  it("covers disabled and controlled tab navigation plus timeline metadata", () => {
    const onValueChange = vi.fn();
    render(
      <div>
        <Tabs
          aria-label="Navegacao"
          compact
          idBase="coverage-tabs"
          items={[
            { content: "Primeiro", label: "Primeiro", value: "one" },
            { content: "Bloqueado", disabled: true, label: "Bloqueado", value: "blocked" },
            { content: "Ultimo", label: "Ultimo", value: "last" }
          ]}
          onValueChange={onValueChange}
          showPanel={false}
          value="one"
        />
        <Timeline
          items={[{ actor: "Ana", description: "Detalhes", icon: "check", id: "1", meta: "CRM", time: "10:00", title: "Evento", tone: "warning" }]}
          variant="sensitive"
        />
        <Tabs items={[]} showPanel />
      </div>
    );

    const first = screen.getByRole("tab", { name: "Primeiro" });
    fireEvent.keyDown(first, { key: "ArrowRight" });
    fireEvent.keyDown(screen.getByRole("tab", { name: "Ultimo" }), { key: "ArrowLeft" });
    fireEvent.keyDown(screen.getByRole("tab", { name: "Primeiro" }), { key: "End" });

    expect(onValueChange).toHaveBeenCalled();
    expect(screen.getByText("Evento")).toBeInTheDocument();
  });

  it("supports modal dialog close and controlled open changes", async () => {
    const change = vi.fn();

    render(
      <Modal
        footer={<Button>Salvar</Button>}
        onOpenChange={change}
        open
        title="Novo atendimento"
      >
        <Input label="Nome" defaultValue="Joao Silva" />
      </Modal>
    );

    expect(screen.getByRole("dialog", { name: /novo atendimento/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /fechar modal/i }));

    await waitFor(() => expect(change).toHaveBeenCalledWith(false));
  });

  it("keeps hidden modal titles accessible for source-faithful simple dialogs", () => {
    render(
      <Modal description="Deseja salvar as alteracoes realizadas?" open title="Salvar alteracoes?" titleHidden>
        <Button>Salvar</Button>
      </Modal>
    );

    expect(screen.getByRole("dialog", { name: /salvar alteracoes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /salvar alteracoes/i })).toHaveClass("tl-sr-only");
  });

  it("supports confirm dialog callbacks and blocked confirmation", () => {
    const cancel = vi.fn();
    const confirm = vi.fn();

    render(
      <ConfirmDialog
        blockedReason="Sem permissao"
        confirmLabel="Excluir"
        destructive
        onCancel={cancel}
        onConfirm={confirm}
        open
        title="Excluir atendimento?"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: /excluir/i })).toBeDisabled();
    expect(confirm).not.toHaveBeenCalled();
  });

  it("supports drawer anatomy, close callback, and reusable sections", async () => {
    const change = vi.fn();

    render(
      <Drawer
        footer={<Button variant="primary">Salvar</Button>}
        onOpenChange={change}
        open
        title="Tarefa"
      >
        <DrawerSection title="Detalhes">
          <p>Conteudo</p>
        </DrawerSection>
      </Drawer>
    );

    expect(screen.getByRole("dialog", { name: /tarefa/i })).toBeInTheDocument();
    expect(screen.getByText("Detalhes")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /fechar painel/i }));

    await waitFor(() => expect(change).toHaveBeenCalledWith(false));
  });

  it("renders drawer header and footer as standalone primitives", () => {
    render(
      <div>
        <DrawerHeader title="Resumo" meta="Atualizado agora" onClose={() => undefined} />
        <DrawerFooter layout="grid">
          <Button>Assumir</Button>
          <Button>Delegar</Button>
        </DrawerFooter>
      </div>
    );

    expect(screen.getByText("Resumo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /fechar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delegar/i })).toBeInTheDocument();
  });

  it("opens popover content from a real trigger and closes on Escape", async () => {
    render(
      <Popover trigger={<Button>Mais opcoes</Button>} title="Opcoes">
        <Button leadingIcon="edit">Editar</Button>
      </Popover>
    );

    fireEvent.click(screen.getByRole("button", { name: /mais opcoes/i }));
    expect(await screen.findByText("Opcoes")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByText("Opcoes"), { key: "Escape" });

    await waitFor(() => expect(screen.queryByText("Opcoes")).not.toBeInTheDocument());
  });

  it("opens tooltip on focus with accessible tooltip content", async () => {
    render(
      <Tooltip delayDuration={0} label="Copiar link">
        <IconButton icon="copy" label="Copiar" />
      </Tooltip>
    );

    fireEvent.focus(screen.getByRole("button", { name: /copiar/i }));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Copiar link");
  });

  it("opens disabled-reason tooltip from a focusable wrapper", async () => {
    render(
      <Tooltip delayDuration={0} label="Mais opcoes" variant="disabled">
        <IconButton disabled icon="more" label="Mais opcoes" />
      </Tooltip>
    );

    const disabledButton = screen.getByRole("button", { name: /mais opcoes/i });
    fireEvent.focus(disabledButton.parentElement as HTMLElement);

    expect(await screen.findByRole("tooltip")).toHaveTextContent("Mais opcoes");
  });

  it("opens dropdown actions and closes after selection", () => {
    const select = vi.fn();

    render(<DropdownMenu actions={[{ label: "Editar", icon: "edit", onSelect: select }]} label="Mais" />);

    fireEvent.click(screen.getByRole("button", { name: "Mais" }));
    fireEvent.click(screen.getByRole("menuitem", { name: /editar/i }));

    expect(select).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Mais" })).toHaveAttribute("aria-expanded", "false");
  });

  it("supports dropdown keyboard navigation and returns focus to the trigger", async () => {
    render(
      <DropdownMenu
        actions={[
          { label: "Editar", icon: "edit" },
          { label: "Copiar", icon: "copy" },
          { label: "Excluir", icon: "x", destructive: true }
        ]}
        label="Mais"
      />
    );

    const trigger = screen.getByRole("button", { name: "Mais" });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });

    await waitFor(() => expect(screen.getByRole("menuitem", { name: /editar/i })).toHaveFocus());
    fireEvent.keyDown(screen.getByRole("menuitem", { name: /editar/i }), { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: /copiar/i })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("menuitem", { name: /copiar/i }), { key: "Escape" });
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders feedback primitives with accessible controls", () => {
    const closeToast = vi.fn();
    const dismissAlert = vi.fn();

    render(
      <div>
        <Toast closeLabel="Fechar toast" onClose={closeToast} title="Salvo" tone="success">
          Jornada atualizada
        </Toast>
        <InlineAlert onDismiss={dismissAlert} title="Conflito" tone="danger">
          Ajuste o horario
        </InlineAlert>
        <Chip tone="paused">Pausado</Chip>
        <Chip tone="info">Informacao</Chip>
        <Chip tone="update">Atualizacao</Chip>
        <Chip tone="quota">Cota</Chip>
        <StatusDot label="Atualizacao" status="update" />
        <InlineAlert title="Info" tone="info">Mensagem</InlineAlert>
        <Toast title="Neutro" tone="neutral">Mensagem neutra</Toast>
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: /fechar toast/i }));
    fireEvent.click(screen.getByRole("button", { name: /fechar alerta/i }));

    expect(closeToast).toHaveBeenCalledTimes(1);
    expect(dismissAlert).toHaveBeenCalledTimes(1);
  });

  it("covers non-dismissible and inline overlay contracts", () => {
    const closeInline = vi.fn();
    render(
      <div>
        <Drawer description="Detalhes" dismissible={false} footer={<Button>Salvar</Button>} headerStatus={<Badge>Ativo</Badge>} loading open title="Painel" />
        <Modal alert dismissible={false} icon="shield" open title="Modal protegido">Conteudo protegido</Modal>
        <Modal footer={<Button>Salvar</Button>} icon="checkCircle" inline onOpenChange={closeInline} open title="Modal inline">Conteudo inline</Modal>
        <Popover dismissible={false} open showArrow title="Popover protegido" trigger={<Button>Popover</Button>}>Conteudo popover</Popover>
        <Popover inline open title="Popover inline" trigger="Abrir">Conteudo inline popover</Popover>
      </div>
    );

    fireEvent.click(screen.getByRole("button", { hidden: true, name: /fechar modal/i }));
    fireEvent.keyDown(document.querySelector(".tl-modal--destructive") as HTMLElement, { key: "Escape" });
    fireEvent.pointerDown(document.body);

    expect(closeInline).toHaveBeenCalledWith(false);
    expect(screen.getByText("Conteudo popover")).toBeInTheDocument();
    expect(screen.getByText("Conteudo inline popover")).toBeInTheDocument();
  });

  it("renders avatar primitives with badges and add action", () => {
    const add = vi.fn();

    render(
      <div>
        <Avatar badge={<Badge tone="info">2</Badge>} name="Niki Olson" status="online" />
        <AvatarStack
          onAdd={add}
          showAdd
          people={[
            { id: "1", name: "Ana Paula" },
            { id: "2", name: "Julia Dias" },
            { id: "3", name: "Marcos Lima" },
            { id: "4", name: "Paula Reis" }
          ]}
        />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: /adicionar pessoa/i }));

    expect(screen.getByLabelText("Niki Olson")).toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument();
    expect(add).toHaveBeenCalledTimes(1);
  });

  it("covers avatar accessibility, selection, disabled, and stack limits", () => {
    render(
      <div>
        <Avatar aria-hidden disabled name="Ana Paula" selected size="2xl" status="blocked" />
        <Avatar name="Com Imagem" src="/avatar.png" />
        <AvatarStack max={1} people={[{ id: "1", name: "Ana" }, { id: "2", name: "Bia" }]} />
      </div>
    );

    expect(screen.getByText("AP")).toBeInTheDocument();
    expect(screen.getByAltText("")).toHaveAttribute("src", "/avatar.png");
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("removes filter chips through a separate accessible action", () => {
    const remove = vi.fn();

    render(
      <FilterChip removable onRemove={remove} selected>
        Alta prioridade
      </FilterChip>
    );

    fireEvent.click(screen.getByRole("button", { name: /remover alta prioridade/i }));

    expect(remove).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Alta prioridade" })).toHaveAttribute("aria-pressed", "true");
  });

  it("renders selected, count, and inline removable filter-chip anatomy", () => {
    render(
      <div>
        <FilterChip selected>Ativos</FilterChip>
        <FilterChip count="12">Pendentes</FilterChip>
        <FilterChip removable>Cliente VIP</FilterChip>
      </div>
    );

    expect(screen.getByRole("button", { name: "Ativos" })).toHaveClass("tl-filter-chip--selected");
    expect(screen.getByText("12")).toHaveClass("tl-filter-chip__count");
    expect(screen.getByRole("button", { name: "Cliente VIP" }).querySelector(".tl-icon")).not.toBeNull();
  });

  it("supports filter select and filter multi select states and behavior", async () => {
    const singleChange = vi.fn();
    const multiChange = vi.fn();

    render(
      <div>
        <FilterSelect
          label="Origem"
          onValueChange={singleChange}
          options={[
            { value: "agenda", label: "Agenda", icon: "calendar" },
            { value: "whatsapp", label: "WhatsApp", icon: "whatsapp" }
          ]}
        />
        <FilterMultiSelect
          defaultValue={["alta"]}
          label="Prioridade"
          onValueChange={multiChange}
          options={[
            { value: "alta", label: "Alta", icon: "alert" },
            { value: "media", label: "Media", icon: "clock" },
            { value: "baixa", label: "Baixa", icon: "minus", disabled: true }
          ]}
        />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: "Origem" }));
    fireEvent.click(await screen.findByRole("option", { name: /agenda/i }));
    expect(singleChange).toHaveBeenCalledWith("agenda");

    fireEvent.click(screen.getByRole("button", { name: /prioridade: alta/i }));
    fireEvent.click(await screen.findByRole("option", { name: "Media" }));
    expect(multiChange).toHaveBeenCalledWith(["alta", "media"]);
  });

  it("supports value-only filter select triggers without clear affordance", () => {
    render(
      <FilterSelect
        clearable={false}
        defaultValue="hoje"
        icon="calendar"
        label="Periodo"
        options={[
          { value: "hoje", label: "Hoje" },
          { value: "semana", label: "Esta semana" }
        ]}
        triggerDisplay="value"
      />
    );

    const trigger = screen.getByRole("button", { name: "Periodo: Hoje" });

    expect(trigger).toHaveTextContent("Hoje");
    expect(trigger).not.toHaveTextContent("Periodo");
    expect(trigger.querySelector("[data-filter-clear]")).not.toBeInTheDocument();
  });

  it("covers controlled filter loading, empty, clearing, and custom menu triggers", async () => {
    const onOpenChange = vi.fn();
    const onValueChange = vi.fn();
    render(
      <div>
        <FilterSelect emptyText="Sem origens" label="Origem" loading open options={[]} />
        <FilterMultiSelect emptyText="Sem prioridades" label="Prioridade" open options={[]} />
        <FilterSelect defaultValue="agenda" label="Filtro" onOpenChange={onOpenChange} onValueChange={onValueChange} options={[{ value: "agenda", label: "Agenda" }]} />
        <DropdownMenu
          actions={[{ label: "Primeiro" }, { disabled: true, label: "Desabilitado" }, { label: "Ultimo" }]}
          defaultOpen
          label="Acoes"
          trigger={({ label, onClick, onKeyDown }) => <button aria-label={label} onClick={onClick} onKeyDown={onKeyDown} type="button">Abrir</button>}
        />
      </div>
    );

    expect(await screen.findByText("Carregando opcoes...")).toBeInTheDocument();
    expect(await screen.findByText("Sem prioridades")).toBeInTheDocument();
    const filter = screen.getByRole("button", { name: "Filtro: Agenda" });
    fireEvent.click(filter.querySelector("[data-filter-clear]") as HTMLElement);
    expect(onValueChange).toHaveBeenCalledWith("");
    fireEvent.keyDown(screen.getByRole("button", { name: "Acoes" }), { key: "ArrowDown" });
    fireEvent.keyDown(screen.getByRole("menuitem", { name: "Primeiro" }), { key: "End" });
    fireEvent.keyDown(screen.getByRole("menuitem", { name: "Ultimo" }), { key: "ArrowUp" });
    fireEvent.pointerDown(document.body);
    expect(onOpenChange).toHaveBeenCalled();
  });

  it("covers controlled filter callbacks, multi-clear semantics, and owned native primitives", async () => {
    const onOpenChange = vi.fn();
    const onValueChange = vi.fn();
    const onMultiOpenChange = vi.fn();
    const onMultiValueChange = vi.fn();
    const onClick = vi.fn();

    render(
      <div>
        <PrimitiveButton onClick={onClick}>Owned button</PrimitiveButton>
        <PrimitiveInput aria-label="Owned input" defaultValue="ok" />
        <FilterSelect
          label="Controlado"
          onOpenChange={onOpenChange}
          onValueChange={onValueChange}
          open
          options={[{ value: "agenda", label: "Agenda" }, { value: "financeiro", label: "Financeiro" }]}
          value="agenda"
        />
        <FilterMultiSelect
          label="Multi"
          onOpenChange={onMultiOpenChange}
          onValueChange={onMultiValueChange}
          open
          options={[{ value: "a", label: "A" }, { value: "b", label: "B" }, { value: "c", label: "C" }]}
          value={["a", "b", "c"]}
        />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: "Owned button" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.click(await screen.findByRole("option", { name: "Financeiro" }));
    expect(onValueChange).toHaveBeenCalledWith("financeiro");
    fireEvent.click(screen.getByRole("button", { name: "Multi: 3" }).querySelector("[data-filter-clear]") as HTMLElement);
    expect(onMultiValueChange).toHaveBeenCalledWith([]);
    expect(onMultiOpenChange).toHaveBeenCalledWith(false);
  });

  it("falls back to avatar initials when an image fails", () => {
    const { container } = render(<Avatar name="Niki Olson" src="/missing-avatar.png" />);

    fireEvent.error(container.querySelector("img") as HTMLImageElement);

    expect(screen.getByText("NO")).toBeInTheDocument();
  });

  it("supports complete input states and clear action", () => {
    const clear = vi.fn();

    render(
      <div>
        <Input error="Campo obrigatorio" label="Email" placeholder="email@dominio.com" />
        <Input label="Busca" defaultValue="Ana" onClear={clear} />
        <DateInput label="Data" defaultValue="24 / 05 / 2026" />
        <TimeInput label="Horario" defaultValue="18 : 30" />
        <MoneyInput label="Valor" defaultValue="389,00" />
        <Input blockedReason="Sem permissao" label="Bloqueado" defaultValue="Protegido" />
      </div>
    );

    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    fireEvent.click(screen.getByRole("button", { name: /limpar busca/i }));
    expect(clear).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Data")).toBeInTheDocument();
    expect(screen.getByLabelText("Horario")).toBeInTheDocument();
    expect(screen.getByLabelText("Valor")).toHaveAttribute("inputmode", "decimal");
    expect(screen.getByLabelText("Bloqueado")).toBeDisabled();
  });

  it("covers form edge states, provider marks, and upload variants", async () => {
    const onRemove = vi.fn();
    const onSelect = vi.fn();
    render(
      <div>
        <Input fieldSize="lg" fieldState="success" helperText="Ajuda" label="Nome" leadingIcon="user" leadingIconTone="info" leadingText="Sr." loading onClear={vi.fn()} readOnly trailingIcon="check" trailingIconTone="success" trailingText="OK" />
        <Textarea blockedReason="Sem permissao" density="compact" label="Observacao" />
        <TagInput error="Invalido" items={[]} label="Tags" placeholder="Adicionar" />
        <TagInput items={["A", { id: "b", label: "B" }]} label="Tags 2" onRemove={onRemove} removable />
        <Select error="Erro" label="Plano" onValueChange={onSelect} open options={[{ label: "Mensal", value: "mensal" }, { disabled: true, label: "Anual", value: "anual" }]} placeholder="Selecione" />
        <Checkbox helperText="Ajuda" indeterminate label="Selecionar" />
        <Radio disabled helperText="Bloqueado" label="Opcao" />
        <SegmentedControl compact label="Visao" onChange={onSelect} options={[{ current: true, label: "Lista", value: "lista" }, { disabled: true, label: "Grade", value: "grade" }]} value="lista" variant="shell" />
        <SocialAuthButton provider="Microsoft">Microsoft</SocialAuthButton>
        <SocialAuthButton provider="Acme">Acme</SocialAuthButton>
        {(["idle", "dragging", "uploading", "error", "complete"] as const).map((state) => <FileUpload key={state} state={state} title={`Upload ${state}`} />)}
        <AttachmentList items={[{ id: "file", name: "arquivo.txt", state: "file" }, { id: "link", name: "link", state: "link" }, { id: "error", name: "falha", state: "error" }]} onRemove={onRemove} removable />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { hidden: true, name: "Remover A" }));
    fireEvent.click(screen.getByRole("option", { name: "Mensal" }));
    fireEvent.click(screen.getByRole("button", { hidden: true, name: "Grade" }));

    expect(onRemove).toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith("mensal");
    expect(screen.getByText("Upload complete")).toBeInTheDocument();
  });

  it("renders headless select with open menu and value selection", async () => {
    const change = vi.fn();

    render(
      <Select
        label="Status"
        onValueChange={change}
        options={[
          { value: "todos", label: "Todos" },
          { value: "pendentes", label: "Pendentes" },
          { value: "bloqueado", label: "Bloqueado", disabled: true }
        ]}
        placeholder="Selecionar"
      />
    );

    const trigger = screen.getByRole("combobox", { name: /status/i });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.click(await screen.findByRole("option", { name: /pendentes/i }));

    expect(change).toHaveBeenCalledWith("pendentes");
  });

  it("supports checkbox, toggle, segmented control, search, and filter composition", () => {
    const toggle = vi.fn();
    const segmented = vi.fn();
    const filter = vi.fn();

    render(
      <FieldGroup title="Filtros">
        <Checkbox indeterminate label="Alguns itens" />
        <Toggle label="Ativar" onClick={toggle} pressed />
        <SegmentedControl
          label="Periodo"
          onChange={segmented}
          options={[
            { value: "hoje", label: "Hoje" },
            { value: "semana", label: "Semana" }
          ]}
          value="hoje"
        />
        <FilterBar>
          <SearchInput onFilter={filter} placeholder="Buscar" resultCount="3" />
          <FilterChip selected>Ativos</FilterChip>
        </FilterBar>
      </FieldGroup>
    );

    expect(screen.getByRole("checkbox", { name: /alguns itens/i })).toHaveAttribute("aria-checked", "mixed");
    fireEvent.click(screen.getByRole("switch", { name: /ativar/i }));
    fireEvent.click(screen.getByRole("button", { name: /semana/i }));
    fireEvent.click(screen.getByRole("button", { name: /abrir filtros/i }));

    expect(toggle).toHaveBeenCalledTimes(1);
    expect(segmented).toHaveBeenCalledWith("semana");
    expect(filter).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Ativos" })).toHaveAttribute("aria-pressed", "true");
  });

  it("supports embedded search filter action anatomy", () => {
    const filter = vi.fn();

    render(<SearchInput filterPlacement="embedded" onFilter={filter} placeholder="Buscar tarefas" />);

    const searchRoot = screen.getByRole("searchbox").closest(".tl-search-input");
    expect(searchRoot).toHaveClass("tl-search-input--filter-embedded");

    fireEvent.click(screen.getByRole("button", { name: /abrir filtros/i }));
    expect(filter).toHaveBeenCalledTimes(1);
  });

  it("supports uncontrolled and controlled toggle behavior", () => {
    const controlledChange = vi.fn();

    render(
      <div>
        <Toggle label="Modo automatico" />
        <Toggle label="Modo bloqueado" onPressedChange={controlledChange} pressed />
      </div>
    );

    const uncontrolled = screen.getByRole("switch", { name: /modo automatico/i });
    const controlled = screen.getByRole("switch", { name: /modo bloqueado/i });

    expect(uncontrolled).toHaveAttribute("aria-checked", "false");
    fireEvent.click(uncontrolled);
    expect(uncontrolled).toHaveAttribute("aria-checked", "true");

    fireEvent.click(controlled);
    expect(controlled).toHaveAttribute("aria-checked", "true");
    expect(controlledChange).toHaveBeenCalledWith(false);
  });

  it("supports selectable data tables, numbered pagination, and progress helpers", () => {
    const select = vi.fn();
    const sort = vi.fn();
    const pageChange = vi.fn();
    const pageSize = vi.fn();

    render(
      <div>
        <DataTable
          columns={[
            { key: "subject", header: "Assunto", sortable: true },
            { key: "status", header: "Status" }
          ]}
          onRowSelect={select}
          onSortChange={sort}
          rows={[{ id: "cs-1", subject: "Restricao senha", status: "Em andamento" }]}
          selectable
          selectedRowIds={["cs-1"]}
          sort={{ key: "subject", direction: "ascending" }}
        />
        <TablePagination itemsPerPageValue={10} label="1-10 de 128" onItemsPerPageClick={pageSize} onPageChange={pageChange} page={1} pageCount={13} />
        <ProgressBar helperText="Proximo do limite" label="Uso" tone="danger" value={92} />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: /ordenar por assunto/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /selecionar linha cs-1/i }));
    fireEvent.click(screen.getByRole("button", { name: /alterar itens por pagina/i }));
    fireEvent.click(screen.getByRole("button", { name: "2" }));

    expect(screen.getByRole("columnheader", { name: /assunto/i })).toHaveAttribute("aria-sort", "ascending");
    expect(sort).toHaveBeenCalledWith({ key: "subject", direction: "descending" });
    expect(select).toHaveBeenCalledWith("cs-1", false);
    expect(pageSize).toHaveBeenCalledTimes(1);
    expect(pageChange).toHaveBeenCalledWith(2);
    expect(screen.getByRole("progressbar", { name: /uso/i })).toHaveAttribute("aria-valuenow", "92");
    expect(screen.getByText("Proximo do limite")).toBeInTheDocument();
  });

  it("supports batch 8 workflow primitives with real actions", () => {
    const stepSelect = vi.fn();
    const checklistToggle = vi.fn();
    const metricSelect = vi.fn();
    const requestAccess = vi.fn();
    const permissionRowClick = vi.fn();
    const openAudit = vi.fn();
    const auditRowClick = vi.fn();
    const diffRowClick = vi.fn();
    const pageSelect = vi.fn();
    const executionToggle = vi.fn();

    render(
      <div>
        <Stepper
          currentStepId="map"
          onStepSelect={stepSelect}
          progress={60}
          steps={[
            { id: "source", label: "Fonte", state: "complete" },
            { id: "map", label: "Mapeamento", state: "current" },
            { id: "blocked", label: "Duplicidades", state: "blocked" }
          ]}
        />
        <ChecklistItem onToggle={checklistToggle} owner="Sam Frank" state="incomplete" title="Revisar consentimento" />
        <MetricTile data-testid="batch8-metric" label="Casos abertos" onSelect={metricSelect} selected value="128" />
        <StatusSummaryCard state="ok" title="CRM ativo" />
        <StatusSummaryCard headingLevel={2} state="attention" title="Integração pendente" />
        <DiffTable onRowClick={diffRowClick} rows={[{ id: "plan", label: "Plano", before: "Pro", after: "Enterprise", status: "changed" }]} title="Diff" />
        <PermissionTable onRequestAccess={requestAccess} onRowClick={permissionRowClick} rows={[{ id: "reports", module: "Relatorios", profile: "Gestor", action: "Visualizar", state: "request" }]} />
        <AuditTable onOpenObject={openAudit} onRowClick={auditRowClick} rows={[{ id: "log-1", actor: "Sam", object: "#1", action: "Atualizou", time: "10:24", origin: "Web", status: "success" }]} />
        <ImportProgressCard metrics={[{ label: "Processados", value: "245" }]} state="running" title="Importando alunos.csv" value={78} />
        <RelationshipCard data-testid="batch8-relationship" name="Joao Pedro" onSelect={vi.fn()} selected variant="related" />
        <ConflictCard state="danger" title="Sala indisponivel" />
        <DocumentPreview onPageSelect={pageSelect} pages={[{ id: "1", label: "1" }]} state="signed" title="Contrato" />
        <ExecutionRow expanded onToggle={executionToggle} status="running" step={3} title="Gerar resposta" />
        <ConfidenceMeter segments={5} value={86} />
      </div>
    );

    expect(screen.getByRole("heading", { level: 2, name: "Integração pendente" })).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole("button", { name: /abrir alteracao plan/i }), { key: "Enter" });
    fireEvent.keyDown(screen.getByRole("button", { name: /abrir permissao reports/i }), { key: "Enter" });
    fireEvent.keyDown(screen.getByRole("row", { name: /abrir auditoria log-1/i }), { key: " " });
    fireEvent.click(screen.getByRole("button", { name: /mapeamento/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /revisar consentimento/i }));
    fireEvent.click(screen.getByRole("button", { name: /casos abertos/i }));
    fireEvent.click(screen.getByRole("button", { name: /solicitar acesso/i }));
    fireEvent.click(screen.getByRole("button", { name: /abrir log-1/i }));
    fireEvent.click(screen.getByRole("button", { name: /pagina 1/i }));
    fireEvent.click(screen.getByRole("button", { name: /gerar resposta/i }));

    expect(stepSelect).toHaveBeenCalledWith("map");
    expect(checklistToggle).toHaveBeenCalledWith(true);
    expect(metricSelect).toHaveBeenCalledTimes(1);
    expect(diffRowClick).toHaveBeenCalledWith("plan");
    expect(permissionRowClick).toHaveBeenCalledWith("reports");
    expect(requestAccess).toHaveBeenCalledWith("reports");
    expect(auditRowClick).toHaveBeenCalledWith("log-1");
    expect(openAudit).toHaveBeenCalledWith("log-1");
    expect(pageSelect).toHaveBeenCalledWith("1");
    expect(executionToggle).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("batch8-metric")).toBeInTheDocument();
    expect(screen.getByTestId("batch8-relationship")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: /confianca/i })).toHaveAttribute("aria-valuenow", "86");
  });

  it("covers workflow states, empty/loading/error branches, and action slots", () => {
    const noop = vi.fn();
    render(
      <div>
        {(["complete", "incomplete", "warning", "blocked"] as const).map((state) => (
          <ChecklistItem key={state} actionLabel="Abrir" description="Detalhe" menu={<Button>Menu</Button>} onAction={noop} onToggle={noop} owner="Ana" showStateChip state={state} title={`Checklist ${state}`} />
        ))}
        <MetricTile action={<Button>Detalhes</Button>} compact delta="+10%" helperText="Hoje" icon="chart" label="Operacional" onSelect={noop} progressValue={125} tone="positive" variant="operational" value="100" />
        <MetricTile disabled label="Desativado" tone="negative" value="0" />
        <DiffTable actor="Ana" actorLabel="Responsavel" meta="Hoje" onApprove={noop} onReject={noop} onRevert={noop} origin="Web" rows={["changed", "removed", "added", "approved", "rejected"].map((status) => ({ after: "Novo", before: "Antigo", id: status, label: status, status: status as "changed" }))} showStatusColumn title="Alteracoes" />
        <DiffTable error="Falha" rows={[]} />
        <DiffTable loading rows={[]} />
        <PermissionTable compact onRequestAccess={noop} rows={["allowed", "blocked", "request", "pending"].map((state) => ({ action: "Ver", id: state, module: state, profile: "Gestor", state: state as "allowed" }))} />
        <AuditTable rows={["success", "pending", "alert", "denied"].map((status) => ({ action: "Atualizou", actor: "Ana", id: status, object: "#1", origin: "Web", status: status as "success", time: "10:00" }))} />
        <AuditTable error="Falha" rows={[]} />
        <AuditTable loading rows={[]} />
        {(["running", "complete", "duplicate", "error", "paused"] as const).map((state) => (
          <ImportProgressCard key={state} compact={state === "paused"} fileName="dados.csv" helperText="Processando" onDetails={noop} onPause={noop} onRetry={noop} onResume={noop} state={state} summary={state === "complete"} title={`Import ${state}`} value={40} />
        ))}
        {(["primary", "related", "conflict"] as const).map((variant) => (
          <RelationshipCard details={[{ icon: "mail", value: "ana@example.com" }]} key={variant} name={`Relacionamento ${variant}`} onAction={noop} onSelect={noop} roleLabel="Aluno" variant={variant} />
        ))}
        {(["warning", "danger", "suggestion", "applied", "unresolved"] as const).map((state) => (
          <ConflictCard key={state} onApply={noop} onIgnore={noop} onView={noop} state={state} suggestion="Revisar" title={`Conflito ${state}`} />
        ))}
        {(["preview", "signed", "pending", "error", "loading"] as const).map((state) => (
          <DocumentPreview history={[{ id: "h1", label: "Historico", time: "09:00" }]} key={state} onDownload={noop} onFullscreen={noop} onPageSelect={noop} onSend={noop} onZoomIn={noop} onZoomOut={noop} pages={[{ id: "p1", label: "1" }, { id: "p2", label: "2" }]} state={state} title={`Documento ${state}`} />
        ))}
        {(["running", "success", "failed", "pending", "skipped"] as const).map((status) => (
          <ExecutionRow compact details="Detalhes" error={status === "failed" ? "Erro" : undefined} expanded onOpen={noop} onRetry={noop} status={status} step={1} title={`Execucao ${status}`} />
        ))}
        {(["low", "medium", "high", "unknown"] as const).map((level) => (
          <ConfidenceMeter helperText="Nivel" key={level} label={level} level={level} loading={level === "unknown"} segments={4} value={level === "low" ? 20 : 80} />
        ))}
        <SearchInput filterPlacement="embedded" loading onFilter={noop} resultCount="12" />
        {(["inbound", "outbound", "internal", "failed", "suggestion"] as const).map((variant) => (
          <MessageBubble action={<Button>Acao</Button>} confidence="90%" sender="Ana" status={variant === "failed" ? "failed" : "delivered"} timestamp="10:00" variant={variant}>Mensagem {variant}</MessageBubble>
        ))}
      </div>
    );

    expect(screen.getAllByText(/Checklist/)).toHaveLength(4);
    expect(screen.getByText("Import complete")).toBeInTheDocument();
    expect(screen.getByText("Documento signed")).toBeInTheDocument();
  });

  it("covers stable keys across repeated workflow and state collections", () => {
    render(
      <div>
        <ChartPanelPrimitive title="Mapa de calor" variant="heatmap" />
        <LoadingState title="Carregando dados" variant="skeleton" />
        <StatusSummaryCard
          details={[{ label: "Registros", value: "245" }, { label: "Erros", value: "2" }]}
          state="ok"
          title="Importacao concluida"
        />
        <StatusSummaryCard
          layout="hero"
          primaryAction={<Button>Continuar</Button>}
          secondaryAction={<Button variant="secondary">Depois</Button>}
          state="attention"
          title="Revisao necessaria"
        />
        <ImportProgressCard
          metrics={[{ label: "Processados", value: "245" }, { label: "Ignorados", value: "2" }]}
          state="success"
          title="Importacao finalizada"
        />
        <RelationshipCard avatarStatus={null} details={[{ icon: "mail", value: "joao@example.com" }, { value: <span>Sem icone</span> }]} name="Joao Pedro" />
        <ConflictCard facts={[{ label: "Sala", value: "Studio 2" }, { label: "Horario", value: "09:00" }]} state="danger" title="Conflito" />
        <ConfidenceMeter segments={3} value={67} />
        <ConfidenceMeter value={45} />
        <ConfidenceMeter value={0} />
      </div>
    );

    expect(screen.getByText("Mapa de calor")).toBeInTheDocument();
    expect(screen.getByText("Importacao concluida")).toBeInTheDocument();
    expect(screen.getByText("joao@example.com")).toBeInTheDocument();
    expect(screen.getByText("Studio 2")).toBeInTheDocument();
    expect(screen.getAllByRole("progressbar", { name: /confianca/i })[0]).toHaveAttribute("aria-valuenow", "67");
  });

  it("covers workflow action callbacks and controlled interaction branches", () => {
    const callbacks = {
      checklistAction: vi.fn(),
      diffApprove: vi.fn(),
      diffReject: vi.fn(),
      diffRevert: vi.fn(),
      permissionRequest: vi.fn(),
      permissionRow: vi.fn(),
      auditOpen: vi.fn(),
      auditRow: vi.fn(),
      importPause: vi.fn(),
      importResume: vi.fn(),
      importRetry: vi.fn(),
      importDetails: vi.fn(),
      relationshipSelect: vi.fn(),
      relationshipAction: vi.fn(),
      conflictApply: vi.fn(),
      conflictIgnore: vi.fn(),
      conflictView: vi.fn(),
      pageSelect: vi.fn(),
      download: vi.fn(),
      send: vi.fn(),
      zoomIn: vi.fn(),
      zoomOut: vi.fn(),
      fullscreen: vi.fn(),
      retry: vi.fn(),
      open: vi.fn(),
      toggle: vi.fn(),
      filter: vi.fn()
    };

    render(
      <div>
        <ChecklistItem actionLabel="Abrir checklist" onAction={callbacks.checklistAction} state="warning" title="Consentimento" />
        <DiffTable
          data-testid="workflow-diff"
          onApprove={callbacks.diffApprove}
          onReject={callbacks.diffReject}
          onRevert={callbacks.diffRevert}
          rows={[{ after: "Novo", before: "Antigo", id: "plan", label: "Plano", status: "approved" }]}
        />
        <PermissionTable
          data-testid="workflow-permissions"
          onRequestAccess={callbacks.permissionRequest}
          onRowClick={callbacks.permissionRow}
          rows={[{ action: "Ler", id: "reports", module: "Relatorios", profile: "Gestor", state: "request" }]}
        />
        <AuditTable
          data-testid="workflow-audit"
          onOpenObject={callbacks.auditOpen}
          onRowClick={callbacks.auditRow}
          rows={[{ action: "Atualizou", actor: "Ana", id: "log-1", object: "Aluno", origin: "Web", status: "denied", time: "10:00" }]}
        />
        <ImportProgressCard
          data-testid="workflow-import"
          onDetails={callbacks.importDetails}
          onPause={callbacks.importPause}
          onRetry={callbacks.importRetry}
          onResume={callbacks.importResume}
          state="paused"
          title="Importacao"
          value={45}
        />
        <RelationshipCard
          data-testid="workflow-relationship"
          name="Ana"
          onAction={callbacks.relationshipAction}
          onSelect={callbacks.relationshipSelect}
          selected
          variant="related"
        />
        <ConflictCard
          data-testid="workflow-conflict"
          compact
          onApply={callbacks.conflictApply}
          onIgnore={callbacks.conflictIgnore}
          onView={callbacks.conflictView}
          state="warning"
          suggestion="Usar horario sugerido"
          title="Conflito"
        />
        <DocumentPreview
          data-testid="workflow-document"
          history={[{ id: "h1", label: "Historico", time: "09:00" }]}
          onDownload={callbacks.download}
          onFullscreen={callbacks.fullscreen}
          onPageSelect={callbacks.pageSelect}
          onSend={callbacks.send}
          onZoomIn={callbacks.zoomIn}
          onZoomOut={callbacks.zoomOut}
          pages={[{ id: "p1", label: "1" }, { id: "p2", label: "2" }]}
          selectedPageId="p2"
          state="pending"
          title="Contrato"
        />
        <ExecutionRow
          data-testid="workflow-execution"
          details="Detalhes"
          expanded
          onOpen={callbacks.open}
          onRetry={callbacks.retry}
          onToggle={callbacks.toggle}
          status="failed"
          step={2}
          title="Executar"
        />
        <SearchInput data-testid="workflow-search" filterPlacement="separate" onFilter={callbacks.filter} placeholder="Buscar" />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: "Abrir checklist" }));
    fireEvent.click(within(screen.getByTestId("workflow-diff")).getByRole("button", { name: "Reverter" }));
    fireEvent.click(within(screen.getByTestId("workflow-diff")).getByRole("button", { name: "Rejeitar" }));
    fireEvent.click(within(screen.getByTestId("workflow-diff")).getByRole("button", { name: "Aprovar" }));
    fireEvent.click(within(screen.getByTestId("workflow-permissions")).getByRole("button", { name: "Solicitar acesso" }));
    fireEvent.click(within(screen.getByTestId("workflow-permissions")).getByRole("button", { name: /abrir permissao reports/i }));
    fireEvent.click(within(screen.getByTestId("workflow-audit")).getByRole("button", { name: "Abrir log-1" }));
    fireEvent.click(within(screen.getByTestId("workflow-audit")).getByRole("row", { name: /abrir auditoria log-1/i }));
    fireEvent.click(within(screen.getByTestId("workflow-import")).getByRole("button", { name: "Pausar" }));
    fireEvent.click(within(screen.getByTestId("workflow-import")).getByRole("button", { name: "Continuar" }));
    fireEvent.click(within(screen.getByTestId("workflow-import")).getByRole("button", { name: "Tentar novamente" }));
    fireEvent.click(within(screen.getByTestId("workflow-import")).getByRole("button", { name: "Ver detalhes" }));
    fireEvent.click(screen.getByTestId("workflow-relationship"));
    fireEvent.click(within(screen.getByTestId("workflow-relationship")).getByRole("button", { name: "Acao de Ana" }));
    fireEvent.click(within(screen.getByTestId("workflow-conflict")).getByRole("button", { name: "Aplicar sugestao" }));
    fireEvent.click(within(screen.getByTestId("workflow-conflict")).getByRole("button", { name: "Ignorar" }));
    fireEvent.click(within(screen.getByTestId("workflow-conflict")).getByRole("button", { name: "Ver cenario completo" }));
    fireEvent.click(within(screen.getByTestId("workflow-document")).getByRole("button", { name: "Pagina 1" }));
    fireEvent.click(within(screen.getByTestId("workflow-document")).getByRole("button", { name: "Baixar PDF" }));
    fireEvent.click(within(screen.getByTestId("workflow-document")).getByRole("button", { name: "Enviar por e-mail" }));
    fireEvent.click(within(screen.getByTestId("workflow-document")).getByRole("button", { name: "Aumentar zoom" }));
    fireEvent.click(within(screen.getByTestId("workflow-document")).getByRole("button", { name: "Reduzir zoom" }));
    fireEvent.click(within(screen.getByTestId("workflow-document")).getByRole("button", { name: "Tela cheia" }));
    fireEvent.click(within(screen.getByTestId("workflow-execution")).getAllByRole("button")[0]);
    fireEvent.click(within(screen.getByTestId("workflow-execution")).getByRole("button", { name: "Reprocessar" }));
    fireEvent.click(within(screen.getByTestId("workflow-execution")).getByRole("button", { name: "Abrir detalhes" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir filtros" }));

    expect(callbacks.checklistAction).toHaveBeenCalledOnce();
    expect(callbacks.diffApprove).toHaveBeenCalledOnce();
    expect(callbacks.diffReject).toHaveBeenCalledOnce();
    expect(callbacks.diffRevert).toHaveBeenCalledOnce();
    expect(callbacks.permissionRequest).toHaveBeenCalledWith("reports");
    expect(callbacks.permissionRow).toHaveBeenCalledWith("reports");
    expect(callbacks.auditOpen).toHaveBeenCalledWith("log-1");
    expect(callbacks.auditRow).toHaveBeenCalledWith("log-1");
    expect(callbacks.importPause).toHaveBeenCalledOnce();
    expect(callbacks.importResume).toHaveBeenCalledOnce();
    expect(callbacks.importRetry).toHaveBeenCalledOnce();
    expect(callbacks.importDetails).toHaveBeenCalledOnce();
    expect(callbacks.relationshipSelect).toHaveBeenCalledOnce();
    expect(callbacks.relationshipAction).toHaveBeenCalledOnce();
    expect(callbacks.conflictApply).toHaveBeenCalledOnce();
    expect(callbacks.conflictIgnore).toHaveBeenCalledOnce();
    expect(callbacks.conflictView).toHaveBeenCalledOnce();
    expect(callbacks.pageSelect).toHaveBeenCalledWith("p1");
    expect(callbacks.download).toHaveBeenCalledOnce();
    expect(callbacks.send).toHaveBeenCalledOnce();
    expect(callbacks.zoomIn).toHaveBeenCalledOnce();
    expect(callbacks.zoomOut).toHaveBeenCalledOnce();
    expect(callbacks.fullscreen).toHaveBeenCalledOnce();
    expect(callbacks.toggle).toHaveBeenCalledOnce();
    expect(callbacks.retry).toHaveBeenCalledOnce();
    expect(callbacks.open).toHaveBeenCalledOnce();
    expect(callbacks.filter).toHaveBeenCalledOnce();
  });

  it("covers alternate state, navigation, table, and overlay branches", async () => {
    const onSortChange = vi.fn();
    const onRowClick = vi.fn();
    const onRowSelect = vi.fn();
    const onPageChange = vi.fn();
    const rows = [{ id: "1", name: "Ana", status: "Ativa" }];

    render(
      <div>
        <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Alunos" }]} />
        <List grouped dense divided><ListItem title="Ana" subtitle="Ativa" leading={<Icon name="user" />} trailing="1" /></List>
        <EmptyState action={<Button>Recarregar</Button>} description="Tente novamente" icon="search" title="Vazio" variant="actionable" />
        <ErrorState action={<Button>Repetir</Button>} blocking description="Falha" title="Erro" />
        <DataTable
          columns={[{ key: "name", header: "Nome", sortable: true }, { key: "status", header: "Status", align: "right", render: (row) => <strong>{row.status}</strong> }]}
          compact
          density="dense"
          minWidth={420}
          onRowClick={onRowClick}
          onRowSelect={onRowSelect}
          onSortChange={onSortChange}
          pagination={<TablePagination label="1 de 1" page={1} pageCount={6} onPageChange={onPageChange} />}
          rowActions={() => <Button size="sm">Abrir</Button>}
          rows={rows}
          selectable
          selectedRowIds={["1"]}
          sort={{ key: "name", direction: "ascending" }}
        />
        <ScrollArea height={120}><span>Conteudo rolavel</span></ScrollArea>
        <Tabs items={[{ value: "one", label: "Um", content: "Painel um" }, { value: "two", label: "Dois", content: "Painel dois", disabled: true }]} showPanel={false} />
        <Timeline compact items={[{ id: "t1", title: "Evento", actor: "Ana", meta: "CRM", description: "Detalhe", action: <Button>Ver</Button>, time: "10:00" }]} variant="sensitive" />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: /ordenar por nome/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /selecionar linha 1/i }));
    fireEvent.click(screen.getByRole("row", { name: /Ana Ativa Abrir/ }));
    fireEvent.click(screen.getByRole("button", { name: "6" }));

    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
    expect(screen.getByText("Conteudo rolavel")).toBeInTheDocument();
    expect(onSortChange).toHaveBeenCalledWith({ key: "name", direction: "descending" });
    expect(onRowSelect).toHaveBeenCalledWith("1", false);
    expect(onRowClick).toHaveBeenCalledWith(rows[0]);
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("can render numbered pending step markers for setup shell steppers", () => {
    render(
      <Stepper
        currentStepId="dados"
        markerStyle="number"
        onStepSelect={vi.fn()}
        orientation="vertical"
        steps={[
          { id: "diagnostico", label: "Diagnostico", state: "complete" },
          { id: "dados", label: "Dados", state: "current" },
          { id: "agenda", label: "Agenda", state: "pending" }
        ]}
      />
    );

    expect(screen.getByRole("button", { name: /dados/i })).toHaveTextContent("2");
    expect(screen.getByRole("button", { name: /agenda/i })).toHaveTextContent("3");
  });

  it("covers stepper warning, pending, readonly, and progress modes", () => {
    render(
      <div>
        <Stepper
          onStepSelect={vi.fn()}
          orientation="vertical"
          progress={42}
          readonly
          steps={[
            { description: "Concluido", id: "done", label: "Concluido", state: "complete" },
            { description: "Aviso", id: "warning", label: "Aviso", state: "warning" },
            { description: "Pendente", id: "pending", label: "Pendente", state: "pending" },
            { id: "current", label: "Atual" }
          ]}
        />
        <Stepper steps={[{ id: "one", label: "Um" }]} />
      </div>
    );

    expect(screen.getByRole("progressbar", { name: "Progresso geral" })).toHaveAttribute("aria-valuenow", "42");
    expect(screen.getAllByText("Aviso")).toHaveLength(2);
  });

  it("covers extracted workflow guards and controlled branches", async () => {
    const onRowClick = vi.fn();
    const onFilterChange = vi.fn();
    const onMultiChange = vi.fn();
    const onSend = vi.fn();
    const onInternalChange = vi.fn();

    render(
      <div>
        <DiffTable loading rows={[]} />
        <AuditTable loading rows={[]} />
        <DiffTable onRowClick={onRowClick} rows={[{ after: "Novo", before: "Antigo", id: "plan", label: "Plano", status: "changed" }]} />
        <FilterSelect label="Estado" onValueChange={onFilterChange} open options={[{ disabled: true, label: "Bloqueado", value: "blocked" }]} />
        <FilterMultiSelect defaultValue={["a"]} label="Prioridade" onValueChange={onMultiChange} open options={[{ label: "A", value: "a" }, { label: "B", value: "b" }]} />
        <ComposerInput defaultValue="" onInternalChange={onInternalChange} onSend={onSend} />
      </div>
    );

    expect(screen.getByText("Carregando diff")).toBeInTheDocument();
    expect(screen.getByText("Carregando auditoria")).toBeInTheDocument();
    const row = screen.getByRole("button", { name: /abrir alteracao plan/i });
    fireEvent.keyDown(screen.getByText("Plano"), { key: "Enter" });
    fireEvent.keyDown(row, { key: "Enter" });
    fireEvent.keyDown(row, { key: " " });
    fireEvent.click(await screen.findByRole("option", { name: "Bloqueado" }));
    fireEvent.click(await screen.findByRole("option", { name: "A" }));
    fireEvent.click(await screen.findByRole("option", { name: "A" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Mensagem" }), { target: { value: "Atualizada" } });
    fireEvent.keyDown(screen.getByRole("textbox", { name: "Mensagem" }), { ctrlKey: true, key: "Enter" });
    fireEvent.click(screen.getByRole("switch", { name: "Nota interna" }));

    expect(onRowClick).toHaveBeenCalledWith("plan");
    expect(onFilterChange).not.toHaveBeenCalled();
    expect(onMultiChange).toHaveBeenCalled();
    expect(onSend).toHaveBeenCalledWith("Atualizada", { internal: false });
    expect(onInternalChange).toHaveBeenCalledWith(true);
    expect(alertIconForTone("paused")).toBe("pause");
    expect(alertIconForTone("neutral")).toBe("circle");
  });

  it("renders communication primitives and sends composer values", () => {
    const send = vi.fn();
    const internal = vi.fn();

    render(
      <div>
        <MessageBubble status="read" timestamp="09:16" variant="outbound">
          Posso encaixar quinta 9h.
        </MessageBubble>
        <MessageBubble variant="failed">Falha no envio</MessageBubble>
        <ComposerInput defaultValue="Confirmar horario" internal onInternalChange={internal} onSend={send} />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));
    fireEvent.click(screen.getByRole("switch", { name: /nota interna/i }));

    expect(send).toHaveBeenCalledWith("Confirmar horario", { internal: true });
    expect(internal).toHaveBeenCalledWith(false);
    expect(screen.getByRole("alert")).toHaveTextContent("Falha no envio");
  });

  it("covers controlled composer updates and keyboard send branches", () => {
    const onValueChange = vi.fn();
    const onSend = vi.fn();
    const onAttach = vi.fn();
    const onQuickReply = vi.fn();
    const onMedia = vi.fn();

    render(
      <ComposerInput
        actionsOrder={["media", "quickReply", "attach"]}
        onAttach={onAttach}
        onMedia={onMedia}
        onQuickReply={onQuickReply}
        onSend={onSend}
        onValueChange={onValueChange}
        quickReplyControl={<Button onClick={onQuickReply}>Respostas</Button>}
        showFieldIcon={false}
        value="Mensagem controlada"
      />
    );

    const input = screen.getByRole("textbox", { name: "Mensagem" });
    fireEvent.change(input, { target: { value: "Mensagem atualizada" } });
    fireEvent.keyDown(input, { ctrlKey: true, key: "Enter" });
    fireEvent.click(screen.getByRole("button", { name: "Anexar arquivo" }));
    fireEvent.click(screen.getByRole("button", { name: "Respostas" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir midia interna" }));

    expect(onValueChange).toHaveBeenCalledWith("Mensagem atualizada");
    expect(onSend).toHaveBeenCalledWith("Mensagem controlada", { internal: false });
    expect(onAttach).toHaveBeenCalledOnce();
    expect(onQuickReply).toHaveBeenCalledOnce();
    expect(onMedia).toHaveBeenCalledOnce();
  });

  it("renders calendar, flow, chart, connector, and timeline primitives", () => {
    const selectNode = vi.fn();
    const openMenu = vi.fn();

    render(
      <div>
        <CalendarGrid data-testid="calendar-grid">
          <CalendarCell day="21" events={[{ label: "Mat", tone: "info" }]} today />
          <CalendarCell day="22" />
        </CalendarGrid>
        <CalendarEventBlock capacity="9/10" meta="Joao Silva" time="08:00" title="Mat Pilates" />
        <ConnectorLine startNode variant="curved" />
        <FlowNode onClick={selectNode} onMenu={openMenu} status={<Chip>Evento</Chip>} title="Gatilho" variant="trigger" />
        <ChartPanelPrimitive title="Grafico de linha" />
        <Timeline items={[{ id: "1", icon: "check", title: "Receber mensagem", tone: "success" }]} variant="execution" />
      </div>
    );

    fireEvent.click(screen.getByRole("group", { name: /gatilho/i }));
    fireEvent.click(screen.getByRole("button", { name: /abrir opcoes do no/i }));

    expect(screen.getByRole("button", { name: /21/i })).toHaveAttribute("aria-current", "date");
    expect(screen.getByTestId("calendar-grid")).toHaveClass("tl-calendar-grid--7");
    expect(screen.getByText("Mat Pilates")).toBeInTheDocument();
    expect(screen.getByText("Grafico de linha")).toBeInTheDocument();
    expect(screen.getByText("Receber mensagem")).toBeInTheDocument();
    expect(selectNode).toHaveBeenCalledTimes(1);
    expect(openMenu).toHaveBeenCalledTimes(1);
  });

  it("covers calendar and chart visual variants", () => {
    render(
      <div>
        <CalendarGrid columns={5}>
          <CalendarCell
            conflict
            day="01"
            eyebrow="Maio"
            events={[{ id: "a", label: "Lotado", tone: "danger" }, { label: "B", tone: "warning" }, { label: "C" }, { label: "D" }, { label: "E" }]}
            muted
            selected
          />
          <CalendarCell day="02" events={[{ label: "Livre", tone: "success" }]} disabled />
        </CalendarGrid>
        {(["scheduled", "full", "available", "conflict", "cancelled"] as const).map((status) => (
          <CalendarEventBlock action={<Button>Acao</Button>} capacity="4/8" compact key={status} meta="Studio" status={status} time="09:00" title={status} />
        ))}
        {(["trigger", "condition", "action", "approval", "fallback", "blocked"] as const).map((variant) => (
          <FlowNode blocked={variant === "blocked"} description="Descricao" key={variant} selected={variant === "action"} status="Ativo" title={variant} variant={variant} />
        ))}
        <FlowNode onClick={vi.fn()} title="Interativo" />
        <ChartPanelPrimitive data={[{ label: "A", value: 22 }, { label: "B", value: 48 }, { label: "C", value: 72 }]} title="Barras" variant="bar" />
        <ChartPanelPrimitive data={[{ label: "A", value: 22 }, { label: "B", value: 48 }, { label: "C", value: 72 }]} title="Funil" variant="funnel" />
        <ChartPanelPrimitive data={[{ label: "A", value: 22 }, { label: "B", value: 48 }, { label: "C", value: 72 }]} title="Ranking" variant="ranking" />
        <ChartPanelPrimitive action={<Button>Atualizar</Button>} empty title="Sem dados" />
        <ChartPanelPrimitive loading title="Carregando" />
        <ConnectorLine endNode variant="straight" />
        <ListIcon icon="check" tone="success" />
      </div>
    );

    fireEvent.keyDown(screen.getByRole("button", { name: "Interativo" }), { key: "Enter" });
    expect(screen.getAllByText("Sem dados")).toHaveLength(2);
    expect(screen.getByText("Carregando")).toBeInTheDocument();
    expect(screen.getByTitle("Lotado")).toBeInTheDocument();
    expect(screen.getByText("Barras")).toBeInTheDocument();
  });

  it("covers feedback tones and overlay display modes", () => {
    const onDismiss = vi.fn();
    const onClose = vi.fn();

    render(
      <div>
        <Chip icon="check" showDot={false} tone="success">Confirmado</Chip>
        <Badge label="Aviso" tone="warning" variant="dot" />
        <Badge tone="danger" variant="count">3</Badge>
        <StatusDot label="Online" status="online" />
        <InlineAlert action={<Button>Resolver</Button>} onDismiss={onDismiss} title="Atenção" tone="success">Tudo certo</InlineAlert>
        <Toast action={<Button>Ver</Button>} onClose={onClose} title="Falha" tone="danger">Tente novamente</Toast>
        <Popover defaultOpen footer={<Button>Salvar</Button>} showArrow title="Detalhes" trigger={<Button>Abrir detalhes</Button>} width="lg">Conteúdo</Popover>
        <Popover inline open={false} title="Oculto" trigger="Ignorar">Não deve aparecer</Popover>
        <ScrollArea orientation="both">Área</ScrollArea>
        <ProgressBar helperText="Sincronizando" indeterminate label="Progresso" segmented tone="info" value={140} />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: "Fechar alerta" }));
    fireEvent.click(screen.getByRole("button", { name: /Fechar notifica/ }));

    expect(onDismiss).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
    expect(screen.queryByText("Não deve aparecer")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Progresso" })).not.toHaveAttribute("aria-valuenow");
  });
});

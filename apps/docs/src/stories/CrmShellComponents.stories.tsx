import { useState, type ReactNode } from "react";
import type { Meta } from "@storybook/react-vite";

import {
  CrmBrowserAddressBar,
  CrmBrowserChrome,
  CrmBrowserToolbar,
  CrmBrowserToolbarButton,
  CrmBrowserTrafficLights,
  CrmEmptyShellCanvas,
  CrmEmptyShellPageHeader,
  CrmEmptyShellTopbar,
  CrmEmptyShellWindow,
  CrmShellAvatar,
  CrmShellBrand,
  CrmShellBackButton,
  CrmShellGlobalActions,
  CrmProductShell,
  CrmShellSidebar,
  CrmShellTopNav,
  CrmSidebarFloatingButton,
  CrmSidebarNavigation,
  CrmSidebarUtilityNavigation,
  CrmTopbarActionButton,
  CrmTopbarNavChip,
  PageHeader,
  ProductWindowFrame,
  Sidebar,
  SidebarItem,
  Topbar,
  crmEmptyShellNavItems,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import { Button } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const meta: Meta = {
  title: "CRM / Shell / Components",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Fonte canonica: 79_round-4.1S_app-shell_01_base-web-sem-conteudo.png. O shell oficial de produto usa os componentes CRM / Shell / Components derivados dessa imagem e compoe Primitives / UI."
      }
    }
  }
};

export default meta;

function StorySurface({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <main className={`sb-crm-shell-story ${wide ? "sb-crm-shell-story--wide" : ""}`}>{children}</main>;
}

function ComponentSurface({ children }: { children: ReactNode }) {
  return <div className="sb-crm-shell-story__surface">{children}</div>;
}

export function ShellBrand() {
  return (
    <StorySurface>
      <ComponentSurface>
        <CrmShellBrand />
      </ComponentSurface>
    </StorySurface>
  );
}

export function BrowserTrafficLights() {
  return (
    <StorySurface>
      <ComponentSurface>
        <CrmBrowserTrafficLights />
      </ComponentSurface>
    </StorySurface>
  );
}

export function BrowserToolbarButtonStates() {
  const [pressed, setPressed] = useState(false);

  return (
    <StorySurface>
      <div className="sb-crm-shell-story__state-row">
        <CrmBrowserToolbarButton icon="book" label="Padrao" />
        <CrmBrowserToolbarButton className="is-hover" icon="star" label="Hover" />
        <CrmBrowserToolbarButton className="is-focus-visible" icon="chevronLeft" label="Focus" />
        <CrmBrowserToolbarButton className="is-active" icon="chevronRight" label="Active" />
        <CrmBrowserToolbarButton disabled icon="chevronRight" label="Desabilitado" />
        <CrmBrowserToolbarButton
          aria-pressed={pressed}
          icon={pressed ? "chevronLeft" : "star"}
          label="Interativo"
          onClick={() => setPressed((value) => !value)}
        />
      </div>
    </StorySurface>
  );
}

export function BrowserToolbar() {
  return (
    <StorySurface>
      <ComponentSurface>
        <CrmBrowserToolbar />
      </ComponentSurface>
    </StorySurface>
  );
}

export function BrowserAddressBar() {
  return (
    <StorySurface>
      <ComponentSurface>
        <CrmBrowserAddressBar />
      </ComponentSurface>
    </StorySurface>
  );
}

export function BrowserChrome() {
  return (
    <StorySurface wide>
      <div className="sb-crm-shell-story__chrome">
        <CrmBrowserChrome />
      </div>
    </StorySurface>
  );
}

export function ProductWindowFrameStory() {
  return (
    <StorySurface wide>
      <div className="sb-crm-shell-story__window-frame-set">
        <ProductWindowFrame className="sb-crm-shell-story__window-frame">
          <div className="sb-crm-shell-story__window-body">Browser frame</div>
        </ProductWindowFrame>
        <ProductWindowFrame className="sb-crm-shell-story__window-frame sb-crm-shell-story__window-frame--small" variant="app">
          <div className="sb-crm-shell-story__window-body">App frame</div>
        </ProductWindowFrame>
        <ProductWindowFrame className="sb-crm-shell-story__window-frame sb-crm-shell-story__window-frame--small" variant="frameless">
          <div className="sb-crm-shell-story__window-body">Frameless</div>
        </ProductWindowFrame>
      </div>
    </StorySurface>
  );
}

export function ShellBackButton() {
  const [pressed, setPressed] = useState(false);

  return (
    <StorySurface>
      <div className="sb-crm-shell-story__state-row">
        <CrmShellBackButton />
        <CrmShellBackButton className="is-hover" label="Voltar hover" />
        <CrmShellBackButton className="is-focus-visible" label="Voltar foco" />
        <CrmShellBackButton className="is-active" label="Voltar active" />
        <CrmShellBackButton aria-pressed={pressed} label="Voltar interativo" onClick={() => setPressed((value) => !value)} />
        <CrmShellBackButton disabled label="Voltar desabilitado" />
      </div>
    </StorySurface>
  );
}

export function SidebarFloatingButtonStates() {
  const [pressed, setPressed] = useState(false);

  return (
    <StorySurface>
      <div className="sb-crm-shell-story__state-row">
        <CrmSidebarFloatingButton icon="calendar" label="Agenda" />
        <CrmSidebarFloatingButton className="is-hover" icon="calendar" label="Agenda hover" />
        <CrmSidebarFloatingButton className="is-focus-visible" icon="calendar" label="Agenda foco" />
        <CrmSidebarFloatingButton className="is-active" icon="calendar" label="Agenda active" />
        <CrmSidebarFloatingButton alert icon="message" label="Conversas" />
        <CrmSidebarFloatingButton
          icon="settings"
          label="Configuracoes"
          onClick={() => setPressed((value) => !value)}
          pressed={pressed}
        />
        <CrmSidebarFloatingButton disabled icon="moon" label="Indisponivel" />
      </div>
    </StorySurface>
  );
}

export function ProductShellStory() {
  return (
    <StorySurface wide>
      <div className="sb-crm-shell-story__app-shell">
        <CrmProductShell avatarSrc={image79Avatar} subtitle="Operacao do studio" title="Hoje">
          <div className="sb-crm-shell-story__app-content">
            <span>Area de trabalho</span>
          </div>
        </CrmProductShell>
      </div>
    </StorySurface>
  );
}

export function ProductShellWindowFrame() {
  return (
    <StorySurface wide>
      <div className="sb-crm-shell-story__app-shell">
        <CrmProductShell avatarSrc={image79Avatar} frame="window" subtitle="Areas automatizadas do CRM" title="Agentes">
          <div className="sb-crm-shell-story__app-content">
            <span>Area em janela</span>
          </div>
        </CrmProductShell>
      </div>
    </StorySurface>
  );
}

export function ProductShellConfigurableInternal() {
  return (
    <StorySurface wide>
      <div className="sb-crm-shell-story__app-shell">
        <CrmProductShell
          navItems={[
            { id: "overview", label: "Visao geral", active: true },
            { id: "leads", label: "Leads" },
            { id: "landing", label: "Landing" }
          ]}
          pageHeaderActions={<Button size="sm" variant="secondary">Acao externa</Button>}
          regions={{ backButton: false, browserChrome: false, globalActions: false, sidebar: false }}
          subtitle="Leads e operacao"
          title="Taliya Internal"
          topbarEnd={<Button size="sm" variant="secondary">local</Button>}
          variant="internal"
        >
          <div className="sb-crm-shell-story__app-content">
            <span>Conteudo preparado pelo app consumidor</span>
          </div>
        </CrmProductShell>
      </div>
    </StorySurface>
  );
}

export function SidebarStory() {
  return (
    <StorySurface>
      <div className="sb-crm-shell-story__canonical-sidebar">
        <Sidebar />
      </div>
    </StorySurface>
  );
}

export function SidebarItemStates() {
  return (
    <StorySurface>
      <div className="sb-crm-shell-story__state-row">
        <SidebarItem icon="search" id="buscar" label="Buscar" />
        <SidebarItem active icon="home" id="hoje" label="Hoje" />
        <SidebarItem alert icon="inbox" id="inbox" label="Inbox" />
        <SidebarItem icon="moon" id="modo-noite" label="Modo noite" />
        <SidebarItem disabled icon="settings" id="config" label="Configuracoes" />
      </div>
    </StorySurface>
  );
}

export function TopbarStory() {
  return (
    <StorySurface wide>
      <div className="sb-crm-shell-story__canonical-topbar">
        <Topbar
          actions={<CrmShellGlobalActions avatarSrc={image79Avatar} />}
          activeTab="Jornadas"
          tabs={["Jornadas", "Tarefas", "Checklists", "Aprovacoes"]}
        />
      </div>
    </StorySurface>
  );
}

export function LegacyTopbarNavChipStates() {
  const [active, setActive] = useState(true);

  return (
    <StorySurface>
      <div className="sb-crm-shell-story__state-row">
        <CrmTopbarNavChip item={{ id: "hoje", label: "Hoje" }} />
        <CrmTopbarNavChip item={{ id: "jornadas", label: "Jornadas", active }} onClick={() => setActive((value) => !value)} />
        <CrmTopbarNavChip disabled item={{ id: "auditoria", label: "Auditoria" }} />
      </div>
    </StorySurface>
  );
}

export function TopbarActionButtonStates() {
  const [pressed, setPressed] = useState(false);

  return (
    <StorySurface>
      <div className="sb-crm-shell-story__state-row">
        <CrmTopbarActionButton icon="search" label="Buscar" />
        <CrmTopbarActionButton className="is-hover" icon="search" label="Buscar hover" />
        <CrmTopbarActionButton className="is-focus-visible" icon="search" label="Buscar foco" />
        <CrmTopbarActionButton className="is-active" icon="search" label="Buscar active" />
        <CrmTopbarActionButton alert icon="mail" label="Mensagens" />
        <CrmTopbarActionButton
          icon="bell"
          label="Notificacoes"
          onClick={() => setPressed((value) => !value)}
          pressed={pressed}
        />
        <CrmTopbarActionButton disabled icon="help" label="Ajuda indisponivel" />
      </div>
    </StorySurface>
  );
}

export function PageHeaderStory() {
  return (
    <StorySurface>
      <div className="sb-crm-shell-story__main-surface">
        <PageHeader actions={<Button size="sm">Acao</Button>} subtitle="Resumo operacional" title="Jornadas" />
      </div>
    </StorySurface>
  );
}

export function ShellAvatar() {
  const [selected, setSelected] = useState(false);

  return (
    <StorySurface>
      <div className="sb-crm-shell-story__state-row">
        <CrmShellAvatar name="Operadora" src={image79Avatar} />
        <CrmShellAvatar className="is-hover" name="Operadora hover" src={image79Avatar} />
        <CrmShellAvatar className="is-focus-visible" name="Operadora foco" src={image79Avatar} />
        <CrmShellAvatar className="is-active" name="Operadora active" src={image79Avatar} />
        <CrmShellAvatar
          name="Operadora selecionada"
          onClick={() => setSelected((value) => !value)}
          selected={selected}
          src={image79Avatar}
        />
        <CrmShellAvatar disabled name="Operadora indisponivel" src={image79Avatar} />
      </div>
    </StorySurface>
  );
}

export function GlobalActionsStory() {
  return (
    <StorySurface>
      <ComponentSurface>
        <CrmShellGlobalActions avatarSrc={image79Avatar} />
      </ComponentSurface>
    </StorySurface>
  );
}

export function SidebarNavigation() {
  const [activeId, setActiveId] = useState("agenda");
  const items = crmEmptyShellSidebarItems.map((item) => ({
    ...item,
    active: item.id === activeId
  }));

  return (
    <StorySurface>
      <div className="sb-crm-shell-story__sidebar-nav">
        <CrmSidebarNavigation items={items} onSelect={(item) => setActiveId(item.id)} />
      </div>
    </StorySurface>
  );
}

export function SidebarUtilityNavigation() {
  const [activeId, setActiveId] = useState("configuracoes");
  const items = crmEmptyShellSidebarUtilityItems.map((item) => ({
    ...item,
    active: item.id === activeId
  }));

  return (
    <StorySurface>
      <div className="sb-crm-shell-story__sidebar-utility">
        <CrmSidebarUtilityNavigation items={items} onSelect={(item) => setActiveId(item.id)} />
      </div>
    </StorySurface>
  );
}

export function ShellSidebar() {
  const [activeId, setActiveId] = useState("agenda");
  const [utilityActiveId, setUtilityActiveId] = useState("");
  const items = crmEmptyShellSidebarItems.map((item) => ({
    ...item,
    active: item.id === activeId
  }));
  const utilityItems = crmEmptyShellSidebarUtilityItems.map((item) => ({
    ...item,
    active: item.id === utilityActiveId
  }));

  return (
    <StorySurface>
      <div className="sb-crm-shell-story__sidebar">
        <CrmShellSidebar
          items={items}
          onSelect={(item) => {
            setActiveId(item.id);
            setUtilityActiveId("");
          }}
          onUtilitySelect={(item) => {
            setActiveId("");
            setUtilityActiveId(item.id);
          }}
          utilityItems={utilityItems}
        />
      </div>
    </StorySurface>
  );
}

export function ShellTopNav() {
  return (
    <StorySurface wide>
      <div className="sb-crm-shell-story__topnav">
        <CrmShellTopNav items={crmEmptyShellNavItems} />
      </div>
    </StorySurface>
  );
}

export function ShellGlobalActions() {
  return (
    <StorySurface>
      <ComponentSurface>
        <CrmShellGlobalActions avatarSrc={image79Avatar} />
      </ComponentSurface>
    </StorySurface>
  );
}

export function EmptyShellTopbar() {
  return (
    <StorySurface wide>
      <div className="sb-crm-shell-story__topbar">
        <CrmEmptyShellTopbar avatarSrc={image79Avatar} />
      </div>
    </StorySurface>
  );
}

export function EmptyShellPageHeader() {
  return (
    <StorySurface>
      <div className="sb-crm-shell-story__main-surface">
        <CrmEmptyShellPageHeader />
      </div>
    </StorySurface>
  );
}

export function EmptyShellCanvas() {
  return (
    <StorySurface wide>
      <div className="sb-crm-shell-story__canvas">
        <CrmEmptyShellCanvas />
      </div>
    </StorySurface>
  );
}

export function EmptyShellWindow() {
  return (
    <StorySurface wide>
      <CrmEmptyShellWindow>
        <CrmShellSidebar />
        <main className="tcrm-empty-shell-main">
          <CrmEmptyShellTopbar avatarSrc={image79Avatar} />
          <CrmEmptyShellPageHeader />
          <CrmEmptyShellCanvas />
        </main>
      </CrmEmptyShellWindow>
    </StorySurface>
  );
}

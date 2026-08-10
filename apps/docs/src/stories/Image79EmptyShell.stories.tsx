import type { Meta } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import { CrmEmptyShell } from "@taliya/crm";
import type { CrmEmptyShellState } from "@taliya/crm";

import image79Avatar from "../assets/image79-avatar.png";

import { playFirstInteractiveControl } from "./story-play";
const meta: Meta = {
  title: "CRM / Image Coverage / Image 79 Empty Shell",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Rota vazia oficial composta pelo mesmo CrmProductShell usado no CRM e no Internal. O canvas suporta estados vazio, carregando e indisponível sem duplicar a anatomia do shell."
      }
    }
  },
  play: playFirstInteractiveControl
};

export default meta;

function EmptyShellRoute({ state = "empty" }: { state?: CrmEmptyShellState }) {
  const [announcement, setAnnouncement] = useState("");
  return (
    <>
      <CrmEmptyShell
        avatarSrc={image79Avatar}
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil aberto"),
          onMessages: () => setAnnouncement("Mensagens abertas"),
          onNotifications: () => setAnnouncement("Notificações abertas"),
          onSearch: () => setAnnouncement("Busca aberta")
        }}
        onBack={() => setAnnouncement("Retorno acionado")}
        onNavChange={(id) => setAnnouncement(`Navegação aberta: ${id}`)}
        onRetry={() => setAnnouncement("Nova tentativa solicitada")}
        onSidebarSelect={(item) => setAnnouncement(`Área aberta: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Utilitário aberto: ${item.label}`)}
        state={state}
      />
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function Image79EmptyShell() {
  return <EmptyShellRoute />;
}

Image79EmptyShell.parameters = {
  docs: {
    description: {
      story: "Shell autenticado canônico sem conteúdo. Certificado pelo Codex em desktop, tablet e mobile; aprovação do product owner pendente."
    }
  },
  sourceImage: "79_round-4.1S_app-shell_01_base-web-sem-conteudo.png"
};

Image79EmptyShell.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: "Hoje" }));
  await expect(canvas.getByRole("button", { name: "Hoje" })).toHaveAttribute("aria-current", "page");
  await userEvent.click(canvas.getByRole("button", { name: "Agenda" }));
  await expect(canvas.getByRole("status")).toHaveTextContent("Área aberta: Agenda");
  await userEvent.click(canvas.getByRole("button", { name: "Buscar" }));
  await expect(canvas.getByRole("status")).toHaveTextContent("Busca aberta");
};

export function Loading() {
  return <EmptyShellRoute state="loading" />;
}

Loading.parameters = {
  docs: { description: { story: "Estado oficial de carregamento do canvas autenticado." } }
};

export function Unavailable() {
  return <EmptyShellRoute state="unavailable" />;
}

Unavailable.parameters = {
  docs: { description: { story: "Estado recuperavel de indisponibilidade do canvas autenticado." } }
};

Unavailable.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: "Tentar novamente" }));
  await expect(canvas.getByRole("status")).toHaveTextContent("Nova tentativa solicitada");
};

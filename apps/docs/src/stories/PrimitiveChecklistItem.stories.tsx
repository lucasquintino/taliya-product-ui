import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { ChecklistItem } from "@taliya/ui";

import source13JoaoPedro from "../assets/source13-joao-pedro.png";
import source13NikkiOlaw from "../assets/source13-nikki-olaw.png";
import source13SaraAlves from "../assets/source13-sara-alves.png";
import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ChecklistItem> = {
  title: "Primitives / UI / ChecklistItem",
  component: ChecklistItem,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [checked, setChecked] = useState(false);
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-checklist" number="2" title="Checklist de ativacao">
          <div className="sb-batch8-checklist-columns" aria-hidden="true">
            <span>Item</span>
            <span>Responsavel</span>
            <span>Acao rapida</span>
            <span />
          </div>
          <div role="list">
            <ChecklistItem actionLabel="Revisar" owner="Sam Frank" ownerAvatarSrc={source13JoaoPedro} state="complete" title="Conectar fonte de dados" />
            <ChecklistItem actionLabel="Abrir" onToggle={setChecked} owner="Nikki Olaw" ownerAvatarSrc={source13NikkiOlaw} state={checked ? "complete" : "incomplete"} title="Revisar consentimento" />
            <ChecklistItem actionLabel="Validar" owner="Joao Silva" ownerAvatarSrc={source13JoaoPedro} state="warning" title="Validar responsaveis" />
            <ChecklistItem actionLabel="Bloqueado" owner="Sara Alves" ownerAvatarSrc={source13SaraAlves} state="blocked" title="Publicar perfis" />
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}

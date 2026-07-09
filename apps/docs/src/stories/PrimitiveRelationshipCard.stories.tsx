import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { Icon, IconButton, RelationshipCard } from "@taliya/ui";

import source13JoaoPedro from "../assets/source13-joao-pedro.png";
import source13NikkiOlaw from "../assets/source13-nikki-olaw.png";
import source13SaraAlves from "../assets/source13-sara-alves.png";
import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof RelationshipCard> = {
  title: "Primitives / UI / RelationshipCard",
  component: RelationshipCard,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [selected, setSelected] = useState("joao");
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-relationship" number="9" title="Relacoes e familia">
          <div className="sb-batch8-relationship-row">
            <RelationshipCard avatarSrc={source13NikkiOlaw} avatarStatus={null} badge="Responsavel principal" details={[{ icon: "phone", value: "(11) 93456-7890" }, { icon: "mail", value: "nikki@email.com" }]} name="Nikki Olaw" onSelect={() => setSelected("nikki")} roleLabel="Mae" selected={selected === "nikki"} variant="primary" />
            <IconButton className="sb-batch8-relationship-connector" icon="phone" label="Telefone compartilhado" size="sm" variant="subtle" />
            <RelationshipCard avatarSrc={source13JoaoPedro} avatarStatus={null} badge="Plano Premium" highlight={<><small>saldo 0</small><strong>Debito</strong></>} name="Joao Pedro" onSelect={() => setSelected("joao")} roleLabel="12 anos - 7o Ano" selected={selected === "joao"} variant="related" />
            <IconButton className="sb-batch8-relationship-connector" icon="book" label="Relacao familiar" size="sm" variant="subtle" />
            <RelationshipCard avatarSrc={source13SaraAlves} avatarStatus={null} badge="Tia" badgeTone="neutral" details={[{ icon: "phone", value: "(11) 98765-4321" }, { icon: "mail", value: "sara@email.com" }]} name="Sara Alves" onSelect={() => setSelected("sara")} selected={selected === "sara"} variant="related" />
          </div>
          <footer className="sb-batch8-relationship-legend">
            <span><Icon name="check" size="sm" tone="success" />Telefone compartilhado</span>
            <span><Icon name="book" size="sm" tone="warning" />Relacao familiar</span>
            <span><Icon name="alertCircle" size="sm" tone="danger" />Possivel conflito</span>
          </footer>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}

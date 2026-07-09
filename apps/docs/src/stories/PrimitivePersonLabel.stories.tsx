import type { Meta } from "@storybook/react-vite";

import { InlineGroup, MetaText, PersonLabel } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";
import image79Avatar from "../assets/image79-avatar.png";

const meta: Meta<typeof PersonLabel> = {
  title: "Primitives / UI / PersonLabel",
  component: PersonLabel,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-inline" number="10" title="Person label">
          <div className="sb-batch4-inline-grid">
            <PersonLabel name="Sam Frank" />
            <PersonLabel name="Nikol Clev" />
            <PersonLabel name="Maria Claro" size="sm" />
            <PersonLabel avatarSrc={image79Avatar} name="Niki Olson" size="sm" />
            <span className="sb-batch4-disabled-inline">
              <PersonLabel name="Joao Silva" />
            </span>
            <InlineGroup>
              <MetaText>Responsavel</MetaText>
              <PersonLabel name="Sara Alves" />
            </InlineGroup>
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}

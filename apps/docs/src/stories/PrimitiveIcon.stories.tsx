import type { Meta } from "@storybook/react-vite";

import { Icon } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveRow, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof Icon> = {
  title: "Primitives / UI / Icon",
  component: Icon,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="sizes">
          <PrimitiveRow>
            <Icon name="search" size="sm" />
            <Icon name="search" size="md" />
            <Icon name="search" size="lg" />
          </PrimitiveRow>
        </PrimitiveState>
        <PrimitiveState label="tones">
          <PrimitiveRow>
            <Icon name="circle" tone="neutral" />
            <Icon name="checkCircle" tone="success" />
            <Icon name="circle" tone="info" />
            <Icon name="alert" tone="warning" />
            <Icon name="alert" tone="danger" />
            <Icon name="pause" tone="paused" />
            <Icon name="lock" tone="blocked" />
          </PrimitiveRow>
        </PrimitiveState>
        <PrimitiveState label="informative">
          <Icon label="Status de sucesso" name="checkCircle" tone="success" />
        </PrimitiveState>
        <PrimitiveState label="crm mode glyphs">
          <PrimitiveRow>
            <Icon name="fingerprint" tone="info" />
            <Icon name="hand" tone="info" />
            <Icon name="scale" tone="info" />
            <Icon name="rocket" tone="info" />
          </PrimitiveRow>
        </PrimitiveState>
        <PrimitiveState label="crm impact glyphs">
          <PrimitiveRow>
            <Icon name="user" tone="info" />
            <Icon name="banknote" tone="success" />
            <Icon name="percent" tone="warning" />
            <Icon name="shieldCheck" tone="info" />
          </PrimitiveRow>
        </PrimitiveState>
        <PrimitiveState label="crm config glyphs">
          <PrimitiveRow>
            <Icon name="slidersRound" tone="info" />
            <Icon name="settings" tone="info" />
            <Icon name="shield" tone="info" />
            <Icon name="shoppingCart" tone="info" />
          </PrimitiveRow>
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}

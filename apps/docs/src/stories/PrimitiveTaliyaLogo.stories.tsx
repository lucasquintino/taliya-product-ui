import type { Meta } from "@storybook/react-vite";

import { TaliyaLogo } from "@taliya/ui";

import { batch2SourceDescription, PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta: Meta<typeof TaliyaLogo> = {
  title: "Primitives / UI / TaliyaLogo",
  component: TaliyaLogo,
  parameters: { layout: "fullscreen", docs: { description: { component: batch2SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <PrimitiveMatrix>
        <PrimitiveState label="variants">
          <TaliyaLogo />
          <TaliyaLogo variant="compact" />
          <TaliyaLogo label="Taliya mark" variant="mark" />
        </PrimitiveState>
        <PrimitiveState label="inverse context">
          <div style={{ background: "var(--taliya-surface-selected)", borderRadius: "var(--taliya-radius-sm)", color: "var(--taliya-color-text-inverse)", padding: "var(--taliya-space-4)" }}>
            <TaliyaLogo />
          </div>
        </PrimitiveState>
      </PrimitiveMatrix>
    </PrimitivePage>
  );
}

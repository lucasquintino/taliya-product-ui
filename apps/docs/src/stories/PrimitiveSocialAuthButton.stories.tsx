import type { Meta } from "@storybook/react-vite";

import { SocialAuthButton } from "@taliya/ui";

import { batch3SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof SocialAuthButton> = {
  title: "Primitives / UI / SocialAuthButton",
  component: SocialAuthButton,
  parameters: { layout: "fullscreen", docs: { description: { component: batch3SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch3-actions" number="1" title="Social auth buttons">
          <SourceGrid className="sb-source-grid--4">
            <SourceItem label="Google">
              <SocialAuthButton provider="Google">Continuar com Google</SocialAuthButton>
            </SourceItem>
            <SourceItem label="Microsoft">
              <SocialAuthButton provider="Microsoft">Continuar com Microsoft</SocialAuthButton>
            </SourceItem>
            <SourceItem label="Custom">
              <SocialAuthButton provider="SSO">Entrar com SSO</SocialAuthButton>
            </SourceItem>
            <SourceItem label="Disabled">
              <SocialAuthButton disabled provider="Google">Continuar com Google</SocialAuthButton>
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}

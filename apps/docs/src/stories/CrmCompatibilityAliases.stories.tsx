import type { Meta, StoryObj } from "@storybook/react-vite";
import { CrmShellRoundButton, CrmShellTopNavItem, GlobalActions, LegacyComposer } from "@taliya/crm";
import { PrimitivePage } from "./PrimitiveStoryUtils";

const meta = {
  title: "CRM / Surface / Compatibility aliases",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Isolated compatibility coverage for published aliases. New consumers should use the canonical components named in each story description."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const CrmShellRoundButtonAlias: Story = {
  name: "CrmShellRoundButton (alias of IconButton)",
  render: () => (
    <PrimitivePage>
      <main aria-label="CrmShellRoundButton compatibility alias">
        <CrmShellRoundButton icon="search" label="Buscar" onClick={() => undefined} />
      </main>
    </PrimitivePage>
  )
};

export const CrmShellTopNavItemAlias: Story = {
  name: "CrmShellTopNavItem (alias of CrmTopbarNavChip)",
  render: () => (
    <PrimitivePage>
      <main aria-label="CrmShellTopNavItem compatibility alias">
        <CrmShellTopNavItem item={{ id: "hoje", label: "Hoje", active: true }} onClick={() => undefined} />
      </main>
    </PrimitivePage>
  )
};

export const GlobalActionsAlias: Story = {
  name: "GlobalActions (alias of CrmShellGlobalActions)",
  render: () => (
    <PrimitivePage>
      <main aria-label="GlobalActions compatibility alias">
        <GlobalActions />
      </main>
    </PrimitivePage>
  )
};

export const LegacyComposerAlias: Story = {
  name: "LegacyComposer (alias of Composer)",
  render: () => (
    <PrimitivePage>
      <main aria-label="LegacyComposer compatibility alias">
        <LegacyComposer />
      </main>
    </PrimitivePage>
  )
};

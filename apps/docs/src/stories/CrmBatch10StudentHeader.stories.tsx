import type { Meta, StoryObj } from "@storybook/react-vite";
import { StudentHeader } from "@taliya/crm";

import { Batch10ComponentStory, batch10StoryParameters } from "./CrmBatch10StoryFixtures";
import type { Batch10StoryComponent } from "./CrmBatch10StoryFixtures";
import source13JoaoPedro from "../assets/source13-joao-pedro.png";
import { PrimitivePage } from "./PrimitiveStoryUtils";

const component = "StudentHeader" satisfies Batch10StoryComponent;

const meta = {
  title: "CRM / Students / StudentHeader"
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: batch10StoryParameters,
  render: () => <Batch10ComponentStory component={component} />
};

export const SourceReference: Story = {
  parameters: { layout: "fullscreen" },
  render: () => <PrimitivePage><main className="sb-source-page"><StudentHeader avatarSrc={source13JoaoPedro} onNextAction={() => undefined} style={{ width: 480 }} variant="reference" /></main></PrimitivePage>
};

import { Batch10ComponentStory, batch10StoryParameters } from "./CrmBatch10StoryFixtures";
import type { Batch10StoryComponent } from "./CrmBatch10StoryFixtures";

const component = "FinancePriorityPanel" satisfies Batch10StoryComponent;

export default {
  title: "CRM / Finance / FinancePriorityPanel",
  ...batch10StoryParameters
};

export const AllStates = {
  name: "All States",
  render: () => <Batch10ComponentStory component={component} />
};

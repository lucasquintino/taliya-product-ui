import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClassDrawer } from "@taliya/crm";

import { Batch9ComponentStory, batch9StoryParameters } from "./CrmBatch9StoryFixtures";
import type { Batch9StoryComponent } from "./CrmBatch9StoryFixtures";

const component = "ClassDrawer" satisfies Batch9StoryComponent;

const meta = {
  title: "CRM / Operational / ClassDrawer"
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const AllStates: Story = {
  parameters: batch9StoryParameters,
  render: () => <Batch9ComponentStory component={component} />
};

export const ClassDetailRosterStatuses: Story = {
  parameters: batch9StoryParameters,
  render: () => (
    <ClassDrawer
      actionPlacement="content"
      actionHeading="Próximas ações"
      ariaLabel="Aula selecionada"
      availabilityNotice="Há 1 crédito de reposição compatível para esta vaga."
      availabilityTone="warning"
      compact
      rosterHeading="Alunos previstos (4)"
      rosterStatus={{ label: "Pendente", tone: "warning" }}
      showStudentStatus
      students={[
        { id: "ana", initials: "1", name: "Ana Carolina Souza", status: "pending" },
        { id: "beatriz", initials: "2", name: "Beatriz Lima", status: "pending" },
        { id: "felipe", initials: "3", name: "Felipe Andrade", status: "pending" },
        { id: "gabriela", initials: "4", name: "Gabriela Martins", status: "pending" }
      ]}
      variant="class-detail"
    />
  )
};

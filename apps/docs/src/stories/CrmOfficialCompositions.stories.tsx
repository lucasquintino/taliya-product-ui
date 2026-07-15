import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  AgentRoutineIntro,
  ClassOperationalDetail,
  ConfirmedSubscriptionPage,
  FinanceQueueGrid,
  PaymentCaseCard,
  SetupPagePanel,
  StudentProfileActionRail,
  StudentProfileOverviewGrid,
  SubscriptionReviewPage
} from "@taliya/crm";
import { Button, ButtonGroup, Panel } from "@taliya/ui";

const meta = {
  title: "CRM / Layout / Official Compositions",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const SubscriptionReview: Story = {
  render: () => <SubscriptionReviewPage />
};

export const ConfirmedSubscription: Story = {
  render: () => <ConfirmedSubscriptionPage />
};

export const FinanceQueues: Story = {
  render: () => (
    <FinanceQueueGrid>
      <PaymentCaseCard state="due" />
      <PaymentCaseCard state="overdue" />
      <PaymentCaseCard state="paid" />
    </FinanceQueueGrid>
  )
};

export const AgentRoutineIntroduction: Story = {
  render: () => <AgentRoutineIntro />
};

export const StudentProfile: Story = {
  render: () => (
    <>
      <StudentProfileOverviewGrid>
        <Panel><h2>Resumo do aluno</h2></Panel>
        <Panel><h3>Agenda</h3></Panel>
        <Panel><h3>Financeiro</h3></Panel>
        <Panel><h3>Documentos</h3></Panel>
        <Panel><h3>Historico</h3></Panel>
        <Panel><h3>Tarefas</h3></Panel>
      </StudentProfileOverviewGrid>
      <StudentProfileActionRail>
        <ButtonGroup>
          <Button>Enviar mensagem</Button>
          <Button variant="secondary">Criar tarefa</Button>
        </ButtonGroup>
      </StudentProfileActionRail>
    </>
  )
};

export const CompactStudentProfile: Story = {
  render: () => (
    <>
      <StudentProfileOverviewGrid density="compact" />
      <StudentProfileActionRail density="compact" />
    </>
  )
};

export const ClassOperationDetail: Story = {
  render: () => <ClassOperationalDetail />
};

export const SetupPanel: Story = {
  render: () => (
    <SetupPagePanel>
      <Panel><h2>Etapa de setup</h2><p>Conteudo oficial da configuracao guiada.</p></Panel>
    </SetupPagePanel>
  )
};

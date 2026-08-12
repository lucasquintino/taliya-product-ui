import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CheckoutPaymentCard } from "./domains/billing/billing-checkout";
import { ClassOperationalDetail } from "./domains/billing/billing-finance";
import { ApprovalPanel } from "./domains/billing/billing-approval-settings-core";
import { ImpactSummary, SettingsSection } from "./domains/billing/billing-impact-settings";
import { PermissionMatrix } from "./domains/billing/billing-permissions-settings";
import { SettingsNotificationsWorkspace } from "./domains/billing/billing-settings-final-b";
import { UsageLedgerTable } from "./domains/billing/billing-usage-ledger-table";
import { toneForState as billingToneForState } from "./domains/billing/billing-utilities";
import { AgentCard } from "./patterns/domain-actions";
import { AgentRoutineCard } from "./patterns/agent-catalog";
import { Composer, HandoffBanner, QuickReplyChips } from "./patterns/composer-and-handoff";
import { ConversationDrawer } from "./patterns/shell-layout-b";
import { ContextPanel } from "./patterns/shell-layout-a";
import { iconForFamily, toneForState as shellToneForState } from "./patterns/shell-utilities";
import { SupportTicketPanel } from "./domains/students/students-support";

afterEach(() => {
  cleanup();
});

describe("quality hardening coverage contracts", () => {
  it("covers moved billing states and domain actions", () => {
    const onAction = vi.fn();
    expect(ClassOperationalDetail({ onAction })).toBeTruthy();
    expect(AgentRoutineCard({ state: "draft", title: "Draft routine" })).toBeTruthy();
    render(
      <>
        <ApprovalPanel onAction={onAction} state="expired" />
        <CheckoutPaymentCard state="blocked" />
        <CheckoutPaymentCard state="coupon-error" />
        <ClassOperationalDetail onAction={onAction} />
        <ImpactSummary state="loading" />
        <ImpactSummary state="blocked" />
        <SettingsSection state="source" />
        <SettingsSection state="loading" />
        <PermissionMatrix state="loading" />
        <PermissionMatrix state="error" />
        <PermissionMatrix rows={[]} state="empty" />
        <AgentCard state="not-contracted" />
        <AgentRoutineCard state="blocked" />
      </>
    );

    for (const button of screen.getAllByRole("button")) fireEvent.click(button);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(5);
    expect(billingToneForState("read-only")).toBe("paused");
  });

  it("covers notification channels, usage origins, and support actions", () => {
    const onAction = vi.fn();
    expect(SettingsNotificationsWorkspace({
      onAlertToggle: onAction,
      onChannelChange: onAction,
      onFrequencyChange: onAction,
      unavailableChannelReasons: { whatsapp: "WhatsApp indisponivel", "after-hours": "Fora do horario" }
    })).toBeTruthy();
    expect(UsageLedgerTable({ rows: [], title: "Extrato vazio" })).toBeTruthy();
    render(
      <>
        <SettingsNotificationsWorkspace
          onAlertToggle={onAction}
          onChannelChange={onAction}
          onFrequencyChange={onAction}
          unavailableChannelReasons={{ whatsapp: "WhatsApp indisponivel", "after-hours": "Fora do horario" }}
        />
        <UsageLedgerTable
          onAction={onAction}
          rows={[
            { actionLabel: "Abrir importacao", caseLabel: "Importacao", id: "import", origin: "import", status: "estimated" },
            { actionLabel: "Abrir automacao", caseLabel: "Automacao", id: "automation", origin: "automation", status: "reprocessed" }
          ]}
        />
        <SupportTicketPanel onAction={onAction} state="access-active" />
        <SupportTicketPanel onAction={onAction} variant="internal" />
      </>
    );

    for (const button of screen.getAllByRole("button")) fireEvent.click(button);
    expect(onAction).toHaveBeenCalled();
  });

  it("covers shared shell utilities, context actions, drawers, and composer variants", () => {
    const onAction = vi.fn();
    expect(shellToneForState("blocked")).toBe("danger");
    expect(iconForFamily("Financeiro")).toBe("creditCard");
    expect(iconForFamily("Students")).toBe("users");
    expect(iconForFamily("Classes")).toBe("calendar");
    expect(iconForFamily("Settings")).toBe("settings");
    expect(iconForFamily("Agents")).toBe("bot");
    render(
      <>
        <ContextPanel onAction={onAction} onFactAction={onAction} onTaskAction={onAction} state="blocked" />
        <ConversationDrawer onAction={onAction} />
        <Composer disabled={false} onSend={onAction} />
        <Composer disabled loading />
        <HandoffBanner layout="compact" state="resumed" />
        <QuickReplyChips items={["Uma pergunta", { id: "action", kind: "action", label: "Uma acao", selected: true }]} onSelect={onAction} />
      </>
    );

    for (const button of screen.getAllByRole("button")) fireEvent.click(button);
    expect(screen.getByRole("button", { name: "Uma pergunta" })).toBeInTheDocument();
  });
});

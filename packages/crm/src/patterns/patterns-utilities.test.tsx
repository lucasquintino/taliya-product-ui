import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  CrmSurface,
  Reference15Header,
  componentLabel,
  iconForFamily,
  stateKey,
  toneForState
} from "./patterns-utilities";

afterEach(() => {
  cleanup();
});

describe("pattern utility contracts", () => {
  it("normalizes state labels and maps every supported tone", () => {
    expect(stateKey("Revisão urgente")).toBe("revisao-urgente");
    expect(stateKey(undefined)).toBe("");
    expect(componentLabel("PaymentDrawer")).toBe("Payment Drawer");

    expect(toneForState("success")).toBe("success");
    expect(toneForState("review")).toBe("warning");
    expect(toneForState("candidate")).toBe("info");
    expect(toneForState("blocked")).toBe("danger");
    expect(toneForState("read-only")).toBe("paused");
    expect(toneForState("unknown")).toBe("neutral");
  });

  it("resolves family icons and renders optional surface anatomy", () => {
    expect(iconForFamily("Agents")).toBe("bot");
    expect(iconForFamily("Agenda")).toBe("calendar");
    expect(iconForFamily("Financeiro")).toBe("wallet");
    expect(iconForFamily("Support")).toBe("message");
    expect(iconForFamily("Other")).toBe("clipboard");

    render(
      <>
        <CrmSurface
          action={<button type="button">Action</button>}
          component="UtilitySurface"
          description="Description"
          family="Support"
          meta="Meta"
          selected
          state="success"
          statusLabel="Ready"
          title="Surface title"
        >
          <span>Body</span>
        </CrmSurface>
        <CrmSurface component="MinimalSurface" />
        <Reference15Header number={15} title="Reference" />
      </>
    );

    expect(screen.getByText("Surface title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Meta")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    expect(screen.getByText("Reference")).toBeInTheDocument();
  });
});

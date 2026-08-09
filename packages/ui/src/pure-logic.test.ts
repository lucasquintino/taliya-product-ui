import { describe, expect, it } from "vitest";
import { Icon } from "./index";

describe("ui public logic", () => {
  it("exposes a stable primitive component contract", () => {
    expect(typeof Icon).toBe("function");
    expect(Icon.displayName ?? "Icon").toMatch(/Icon/);
  });
});

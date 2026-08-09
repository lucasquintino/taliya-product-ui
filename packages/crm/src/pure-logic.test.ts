import { describe, expect, it } from "vitest";
import { crmComponentNames } from "./index";

describe("crm public logic", () => {
  it("keeps the component registry unique and non-empty", () => {
    expect(crmComponentNames.length).toBeGreaterThan(0);
    expect(new Set(crmComponentNames).size).toBe(crmComponentNames.length);
  });
});

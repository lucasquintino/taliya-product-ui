import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import * as crm from "../index";

describe("@taliya/crm characterization contract", () => {
  it("keeps the public shell, page-kit, table, and drawer symbols callable", () => {
    expect(crm.CrmProductShell).toBeDefined();
    expect(crm.WorkListDetailPage).toBeDefined();
    expect(crm.CrmDrawer).toBeDefined();
    expect(crm.CrmWorklistTable).toBeDefined();
  });

  it("keeps the official domain registry stable", () => {
    expect(crm.crmComponentNames).toContain("CrmProductShell");
    expect(crm.crmComponentNames).toContain("CrmDrawer");
    expect(new Set(crm.crmComponentNames).size).toBe(crm.crmComponentNames.length);
  });

  it("keeps the documented CSS entry and all owned layers present", () => {
    const sourceDir = dirname(fileURLToPath(import.meta.url));
    const entry = readFileSync(resolve(sourceDir, "../styles.css"), "utf8");
    const css = `${entry}\n${["foundation.css", "primitives.css", "patterns.css", "domains.css"]
      .map((file) => readFileSync(resolve(sourceDir, "../styles", file), "utf8"))
      .join("\n")}`;
    expect(entry).toContain('@import "./styles/foundation.css"');
    expect(css).toContain(".tcrm-weekly-calendar-reference");
    expect(css).toContain(".tcrm-drawer-frame");
    expect(css).toContain(".tcrm-tenant-summary-drawer");
    expect(css).toContain(".tcrm-activation-checklist__columns");
    expect(css).toContain("color: var(--taliya-color-text-secondary)");
  });

  it("keeps every inventoried runtime export available during extraction", () => {
    const contract = JSON.parse(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../../../../tests/contracts/public-api/crm.json"), "utf8")) as {
      package: string;
      runtimeExports: string[];
    };
    expect(contract.package).toBe("@taliya/crm");
    expect(Object.keys(crm)).toEqual(expect.arrayContaining(contract.runtimeExports));
  });
});

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import * as ui from "../index";

describe("@taliya/ui characterization contract", () => {
  it("keeps the foundational public symbols callable before further extraction", () => {
    expect(ui.Button).toBeDefined();
    expect(typeof ui.Icon).toBe("function");
    expect(typeof ui.Input).toBe("function");
    expect(typeof ui.DataTable).toBe("function");
  });

  it("keeps the documented CSS entry and core selectors present", () => {
    const sourceDir = dirname(fileURLToPath(import.meta.url));
    const entry = readFileSync(resolve(sourceDir, "../styles.css"), "utf8");
    const css = `${entry}\n${["foundation.css", "controls.css", "patterns.css", "data-and-overlays.css"]
      .map((file) => readFileSync(resolve(sourceDir, "../styles", file), "utf8"))
      .join("\n")}`;
    expect(css).toContain(".tl-button");
    expect(css).toContain(".tl-table");
    expect(css).toContain("prefers-reduced-motion: reduce");
  });

  it("keeps every inventoried runtime export available during extraction", () => {
    const contract = JSON.parse(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../../../../tests/contracts/public-api/ui.json"), "utf8")) as {
      package: string;
      runtimeExports: string[];
    };
    expect(contract.package).toBe("@taliya/ui");
    expect(Object.keys(ui)).toEqual(expect.arrayContaining(contract.runtimeExports));
  });
});

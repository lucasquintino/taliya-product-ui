import { describe, expect, it } from "vitest";
import { allTokens, tokenToCssVar, tokenVar } from "./index";

describe("token pure logic", () => {
  it("maps every canonical token to a stable CSS variable", () => {
    for (const name of Object.keys(allTokens)) {
      expect(tokenToCssVar(name)).toMatch(/^--taliya-/);
      expect(tokenVar(name)).toBe(`var(${tokenToCssVar(name)})`);
    }
  });
});

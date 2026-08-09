import { expect, test } from "vitest";
import { readFileSync } from "node:fs";

test("reduced motion is explicitly suppressible", () => {
  const css = readFileSync("packages/ui/src/styles.css", "utf8");
  expect(css).toContain("prefers-reduced-motion: reduce");
  expect(css).toContain("transition-duration: 0.01ms");
});

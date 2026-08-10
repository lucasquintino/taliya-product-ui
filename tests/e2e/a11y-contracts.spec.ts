import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("public contract has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""));
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
});

test("public controls expose names, focus, and disabled semantics", async ({ page }) => {
  await page.goto("/");
  const input = page.getByRole("textbox", { name: "Nome do studio" });
  const save = page.getByRole("button", { name: "Salvar" });
  const blocked = page.getByRole("button", { name: "Bloqueado" });
  await expect(input).toBeVisible();
  await expect(save).toBeEnabled();
  await expect(blocked).toBeDisabled();
  await input.focus();
  await expect(input).toBeFocused();
});

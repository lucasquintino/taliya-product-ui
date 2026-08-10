import { expect, test } from "@playwright/test";

test("supported viewport retains named controls and reduced motion contract", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Salvar" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Nome do studio" })).toBeVisible();
  const reducedMotion = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  expect(reducedMotion).toBe(true);
});

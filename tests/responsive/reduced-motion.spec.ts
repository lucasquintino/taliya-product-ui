import { expect, test } from "@playwright/test";

test("mobile composition retains named controls", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Salvar" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Nome do studio" })).toBeVisible();
});

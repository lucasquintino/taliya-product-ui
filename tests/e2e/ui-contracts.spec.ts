import { expect, test } from "@playwright/test";

test("UI primitive callback, keyboard, and disabled contracts", async ({ page }) => {
  await page.goto("/");
  const save = page.getByRole("button", { name: "Salvar" });
  await expect(save).toBeVisible();
  await save.click();
  await expect(page.getByTestId("saved-state")).toHaveText("Salvo");
  await page.getByRole("textbox", { name: "Nome do studio" }).focus();
  await expect(page.getByRole("textbox", { name: "Nome do studio" })).toBeFocused();
  await expect(page.getByRole("button", { name: "Bloqueado" })).toBeDisabled();
});

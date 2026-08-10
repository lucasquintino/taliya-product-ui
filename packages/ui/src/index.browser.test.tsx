import { expect, test } from "@playwright/test";

test.describe("@taliya/ui browser contracts", () => {
  test("renders, focuses, invokes callbacks, and preserves keyboard access", async ({ page }) => {
    await page.goto("/");

    const name = page.getByRole("textbox", { name: "Nome do studio" });
    await name.focus();
    await expect(name).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Salvar" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("saved-state")).toHaveText("Salvo");
  });

  test("enforces disabled, loading, error, and blocked field contracts", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("button", { name: "Bloqueado" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Carregando", exact: true })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Carregando", exact: true })).toHaveAttribute("aria-busy", "true");
    await expect(page.getByRole("button", { name: "Sem permissão" })).toBeDisabled();
    await expect(page.getByRole("textbox", { name: "Campo com erro" })).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByRole("textbox", { name: "Campo bloqueado" })).toBeDisabled();
    await expect(page.getByText("Campo obrigatório")).toBeVisible();
    await expect(page.locator(".tl-field__hint").filter({ hasText: "Sem permissão" })).toBeVisible();
  });
});

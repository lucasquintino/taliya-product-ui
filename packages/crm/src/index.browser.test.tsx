import { expect, test } from "@playwright/test";

test.describe("@taliya/crm browser contracts", () => {
  test("preserves filter, table-row, drawer, and close callback boundaries", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("row", { name: /Ana Souza/ }).click();
    await expect(page.getByTestId("selected-row")).toHaveText("Ana Souza");

    await page.getByRole("textbox", { name: "Filtrar registros" }).fill("Marina");
    await expect(page.getByRole("row", { name: /Marina Lopes/ })).toBeVisible();
    await expect(page.getByRole("row", { name: /Ana Souza/ })).toHaveCount(0);

    await page.getByRole("button", { name: "Abrir drawer" }).click();
    await expect(page.getByRole("complementary", { name: "Detalhe do registro" })).toBeVisible();
    await page.getByRole("button", { name: "Fechar drawer" }).click();
    await expect(page.getByRole("complementary", { name: "Detalhe do registro" })).toHaveCount(0);
  });

  test("exposes loading, error, and empty states without backend coupling", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Tabela carregando" }).click();
    await expect(page.getByText("Carregando tabela")).toBeVisible();
    await page.getByRole("button", { name: "Tabela com erro" }).click();
    await expect(page.getByRole("alert")).toContainText("Falha de carregamento");
    await page.getByRole("button", { name: "Tabela vazia" }).click();
    await expect(page.getByText("Nenhum registro encontrado")).toBeVisible();
    await page.getByRole("button", { name: "Tabela pronta" }).click();
    await expect(page.getByRole("row", { name: /Ana Souza/ })).toBeVisible();
  });
});

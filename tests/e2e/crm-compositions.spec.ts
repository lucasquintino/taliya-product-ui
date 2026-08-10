import { expect, test } from "@playwright/test";

test("CRM composition renders prepared content without backend coupling", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("crm-composition")).toBeVisible();
  await expect(page.getByTestId("crm-composition").getByRole("heading", { name: "Contrato de browser" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Nome do studio" })).toHaveValue("Taliya");
});

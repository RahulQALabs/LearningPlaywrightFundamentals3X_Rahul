import { test, expect } from "@playwright/test";

//https://awesomeqa.com/xpath/

test("xpath hierarchy practice page opens", async ({ page }) => {
    await page.goto("https://awesomeqa.com/xpath/");
    await expect(page).toHaveURL(/xpath/);
});

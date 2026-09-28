import { test, expect } from "@playwright/test";

test('Verify the error message on Wingyfy', async ({ page }) => {

    await page.goto("https://app.wingify.com/#/login");
    let userName = page.getByRole('textbox', { name: "email" });    //name means you need to add the type
    let pass = page.getByRole('textbox', { name: "password" });

    await userName.fill('adcd@gmail.com');
    await pass.fill('123435');
});
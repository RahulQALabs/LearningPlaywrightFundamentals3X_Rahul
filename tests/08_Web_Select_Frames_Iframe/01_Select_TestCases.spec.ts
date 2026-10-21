import { test, expect } from "@playwright/test";

test('Verify Select dropdown', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/dropdown");
    
    // ---- Start your code here ----
    await page.locator("#dropdown").click();
    await page.selectOption("#dropdown","Option 2");

    await page.pause();
});

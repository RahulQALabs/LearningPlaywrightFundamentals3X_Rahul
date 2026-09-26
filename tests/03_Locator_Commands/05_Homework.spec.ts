import { test, expect } from "@playwright/test";

test('Verify the master multiple element url', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    let email = page.locator("#email");
    let password = page.locator("#password");
    let check_remember = page.locator("//input[@name='remember']");

    await email.fill("fdfdh@fdf.com");
    await password.fill("12345");
    await check_remember.click();

    await page.locator(".login-btn").click();

    const pageURL = page.url();
    console.log(pageURL);

    await page.pause();


})

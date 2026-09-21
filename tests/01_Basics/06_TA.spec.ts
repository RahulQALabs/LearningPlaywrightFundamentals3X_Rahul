// No need to create browser,conext and pages again and again, so use the below import statement.
//test is an object

//doubts - page is fixture and browser is direct fixture
import { test, expect } from "@playwright/test";

test("Navigating to the TTA website", async ({ page }) => {
    // async applied on the functions whether await applies on the statement
    page.goto("https://app.thetestingacademy.com/playwright/");
})

test("BCP - in app.vwo.com two roles", async ({ browser }) => {

    let adminContext = await browser.newContext();
    let userContext = await browser.newContext();
    let guestContext = await browser.newContext();

    let adminPage = await adminContext.newPage();
    await adminPage.goto("https://app.thetestingacademy.com/playwright/");

    let userPage = await userContext.newPage();
    await userPage.goto("https://sdet.live");

    let guestPage = await guestContext.newPage();
    await guestPage.goto("https://scrolltest.com");

    await adminPage.close();
    await userPage.close();
    await guestPage.close();
})
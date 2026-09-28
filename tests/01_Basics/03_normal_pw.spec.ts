import { test } from "@playwright/test";
import { chromium, Browser, BrowserContext, Page } from "playwright";

// Normal (raw) Playwright - no test runner fixtures, we create everything by hand.

test("normal pw - manual browser, context and page", async () => {

    let browser: Browser = await chromium.launch({ headless: false });
    let context: BrowserContext = await browser.newContext();
    let page: Page = await context.newPage();

    await page.goto("https://example.com");
    console.log("Title:", await page.title());

    //Cleanup - reverse order
    await page.close();
    await context.close();
    await browser.close();

});

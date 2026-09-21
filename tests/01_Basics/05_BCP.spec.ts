import { chromium, Browser, BrowserContext, Page } from "playwright";

//Page provides methods to interact with a single tab in a Browser, or an extension background page in Chromium. One Browser instance might have multiple Page instances.

async function run() {

    //Level 1 : Launch browser - heaviest operation, do it once
    let browser: Browser = await chromium.launch({ headless: false });
    console.log("Browser Launched", browser);

    //Level 2 : Create context - fresh session, isolated cookies
    let context: BrowserContext = await browser.newContext();
    console.log("Context Created", context);

    //Level 3 : Open Page - a tab inside the context
    let page: Page = await context.newPage();
    console.log("Page Opened", page);

    //Cleanup - reverse order
    await page.close();
    await context.close();
    await browser.close();
}
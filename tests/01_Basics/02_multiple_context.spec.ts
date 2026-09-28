import { test } from "@playwright/test";
import { chromium } from "playwright";

// Manual Browser -> Context -> Page, launched by hand (no fixtures).
// Two contexts = two fully isolated sessions (separate cookies/storage).

test("multi user - two isolated contexts", async () => {

    let browser = await chromium.launch({ headless: false });

    //Admin
    let adminContext = await browser.newContext();
    let adminPage = await adminContext.newPage();
    await adminPage.goto("https://app.vwo.com/login");
    console.log("Admin on login page");

    //Viewer - a separate context, so it does NOT share the admin's session
    let viewerContext = await browser.newContext();
    let viewerPage = await viewerContext.newPage();
    await viewerPage.goto("https://app.vwo.com/login");
    console.log("Viewer on login page");

    await adminContext.close();
    await viewerContext.close();
    await browser.close();

});

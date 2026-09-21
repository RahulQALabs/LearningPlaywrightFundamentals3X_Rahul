import { chromium } from "playwright";

async function multiUser() {

    let browser = await chromium.launch({ headless: false });

    //Admin
    let adminContext = await browser.newContext();
    let adminPage = await adminContext.newPage();
    await adminPage.goto("https://app.vwo.com/login");
    console.log("Admin on login page");

    //Viewer
    //Admin
    let viewerContext = await browser.newContext();
    let viewerPage = await viewerContext.newPage();
    await viewerPage.goto("https://app.vwo.com/login");
    console.log("Viewer on login page");

    await adminContext.close();
    await viewerContext.close();
    await browser.close();

}



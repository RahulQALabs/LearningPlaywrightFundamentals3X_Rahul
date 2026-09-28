import { chromium } from 'playwright';
import dotenv from "dotenv";       //dotenv is library                             // https://www.npmjs.com/package/dotenv
import path from 'path';

dotenv.config(
    {
         path: path.resolve('tests/05_Allure_Reporting/.env')
    }
);                          // Load the file

const VWO_USER = process.env.VWO_USER;
const VWO_PASS = process.env.VWO_PASS;


// if you use > --->  import {chromium } from 'playwright'; playwright means you need to create your browser ->from browser ---> create context ->from context---> create page -> page
//  Browser  -----------> Context ------------> Page (Manual creating of browser,context and page)


//if you use --> import { test, expect } from "@playwright/test"; --- > so playwright already done at fixture level (automatic use the playwright utilty, no need to manual create browser,context and page)


//Run Command  - npx --yes tsx tests/05_Allure_Reporting/01_SessionStorage.ts

//context will save in user-session.json file

async function saveSession() {

    //instanttempemail.com

    let browser = await chromium.launch({ headless: false });
    let context = await browser.newContext();
    let page = await context.newPage();

    await page.goto("https://app.wingify.com/#/login");

    await page.fill('#login-username', VWO_USER);   // dotenv will load data and read from .env file
    await page.fill('#login-password', VWO_PASS);

    await page.click("#js-login-btn");
    await page.waitForURL(/#\/(dashboard|home)/, { timeout: 25000 });

    await context.storageState({ path: "./user-session.json" });
    console.log("Session saved to user-session.json");

    await browser.close();

}


saveSession();
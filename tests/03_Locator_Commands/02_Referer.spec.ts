import { test } from "@playwright/test";

test('set referer for entire context', async ({ browser }) => {
    let context = await browser.newContext({
        extraHTTPHeaders: {
            "Referer": "https://thetestingacademy.com"
        }
    });
    let page = await context.newPage();
    await page.goto("https://app.vwo.com/#login");
    console.log("Page 1 - Partner referer included");
    await page.goto("https://catalon-demo-cura.herokuapp.com/profile.php#login");
    console.log("Page 2 - Partner referer included");
});
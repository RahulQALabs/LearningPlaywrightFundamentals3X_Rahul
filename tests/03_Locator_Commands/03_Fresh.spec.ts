import { test, expect } from "@playwright/test";

test('tc#1 Verify the vwo page is loaded', async ({ page }) => {

    await page.goto("https://app.vwo.com", {
        waitUntil: 'domcontentloaded',
        timeout: 3000,
        referer: 'httpd://sdet.live'
    });

    // Default Locators
    //  id, name, className, Tag, Custom Locator (Via CSS selector)

    // Css Seclector ->  Browser - Css Engine, Help you to find the element
    // by using the default locators
    // id => #id
    // className => .
    // name => [name="value"]
    // Tag => [tag]

    // <input 
    // type="email" 
    // class="text-input W(100%)" 
    // name="username" 
    // vwo-html-translate-attr="placeholder" 
    // vwo-html-translate-placeholder="login:enterEmailID" 
    // id="login-username" 
    // data-qa="hocewoqisi" 
    // placeholder="Enter email ID" 
    // data-gtm-form-interact-field-id="0"
    // >

    let usernameField = page.locator("#login-username");                 //we don't need await as it's retirn the locator, not promise
    let passwordField = page.locator("#login-password");
    let loginButton = page.locator("#js-login-btn");

    await usernameField.fill("abc@gmail.com");                           //fill returns the promise
    await passwordField.fill("12345");
    await loginButton.click();

     let errorMsg = page.locator("#js-notification-box-msg");
     await expect(errorMsg).toContainText("Your email, password, IP address or location did not match");

     await page.pause();
});
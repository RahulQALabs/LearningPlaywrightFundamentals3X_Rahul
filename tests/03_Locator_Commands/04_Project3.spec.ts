import { test, expect } from "@playwright/test";

test('Verify the error message in the wingyfy free trial', async ({ page }) => {

    await page.goto("https://wingify.com/free-trial/");

    let email = page.locator("//input[@id='free-trial-step1-email']");
    let check1 = page.locator("#free-trial-step1-gdpr-consent-checkboxcu-marketing-consent-checkbox");
    let check2 = page.locator("#free-trial-step1-gdpr-consent-checkboxcu-gdpr-consent-checkbox");
    let submit = page.locator("//button[@data-qa='page-su-submit']").first();
    let error_message = page.locator("//div[contains(@class,'invalid-reason')]").first();

    //I need to select 10th,11th like that element then we should use nth 
    //Example - page.locator("//div[contains(@class,'invalid-reason')]").nth(10);


    await email.fill("fjxgfjg");
    await check1.click();
    await check2.click();
    await submit.click();

    let error_msg_text = await error_message.textContent();

    expect(error_msg_text).toContain("The email address you entered is incorrect.");



});
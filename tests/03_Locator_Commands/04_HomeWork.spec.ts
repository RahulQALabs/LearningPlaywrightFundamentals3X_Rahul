import { test, expect } from "@playwright/test";

test("Verify the title after login", async ({ page }) => {

    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    let makeAppointmentBtn = page.locator("#btn-make-appointment");
    let userName = page.locator("#txt-username");
    let password = page.locator("#txt-password");
    let loginBtn = page.locator("#btn-login");
    let validationMsg=page.locator(".col-sm-12.text-center h2");

    await makeAppointmentBtn.click();
    await userName.fill("John Doe");
    await password.fill("ThisIsNotAPassword");
    await loginBtn.click();

    await expect(validationMsg).toContainText("Make Appointment");
});
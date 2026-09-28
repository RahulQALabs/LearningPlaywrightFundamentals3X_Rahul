import { test, expect } from "@playwright/test";

test("Verify the title after login", async ({ page }) => {

    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    let makeAppointmentBtn = page.getByRole('link', { name: "Make Appointment", exact: true });

    await makeAppointmentBtn.click();

    // await page.pause();

    //use Eli5 for understand the logics

});
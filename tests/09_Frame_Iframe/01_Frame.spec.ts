import { test, expect, Locator, FrameLocator } from "@playwright/test";

test('Verify Frame', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/frames/");

    // ---- Start your code here ----
    let vehicleFrame: FrameLocator = page.frameLocator("#frame-one");

    await vehicleFrame.locator('#RESULT_TextField-1').fill('Hyundai');
    await vehicleFrame.locator('#RESULT_TextField-2').fill('Rahul Kumar');
    await vehicleFrame.locator('#RESULT_TextField-3').fill('MH-12-AB-1234');
    await vehicleFrame.locator('#RESULT_RadioButton-1').click();
    await vehicleFrame.locator('select').selectOption({ label: 'SUV' });
    //await vehicleFrame.locator('#RESULT_RadioButton-1').selectOption('SUV');
    await vehicleFrame.locator('#RESULT_TextField-4').fill('2026');
    await vehicleFrame.locator('#RESULT_TextArea-1').fill('Test');
    await vehicleFrame.getByTestId('vehicle-submit').click();

    let output = await vehicleFrame.locator('#vehicle-output').innerText();
    console.log(output);
    
    await page.pause();
});

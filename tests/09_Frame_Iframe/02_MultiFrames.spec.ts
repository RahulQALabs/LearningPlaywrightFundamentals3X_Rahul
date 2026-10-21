import { test, expect, Locator, FrameLocator } from "@playwright/test";

test('Verify Multi Frame', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/frames/multi-frames");

    // ---- Start your code here ----
    let mainLocator: FrameLocator = await page.frameLocator("[name='main']");
    const headerText = await mainLocator.locator("#main-heading").innerText();
    console.log(headerText);

    const allFrames: Locator[] = await page.locator('//frame').all();
    console.log("Total number of the frames :", allFrames.length);

    for (const frame of allFrames) {
        console.log(await frame.getAttribute('name'), ':', await frame.getAttribute('title'));
    }

    let sideFrame: FrameLocator = await page.frameLocator("[name='side']");
    await sideFrame.getByTestId('side-link-registration').click();

    await mainLocator.locator('#RESULT_TextField-1').fill('Hyundai');
    await mainLocator.locator('#RESULT_TextField-2').fill('Rahul Kumar');
    await mainLocator.locator('#RESULT_TextField-3').fill('MH-12-AB-1234');
    await mainLocator.locator('#RESULT_RadioButton-1').click();
    await mainLocator.locator('select').selectOption({ label: 'SUV' });
    //await mainLocator.locator('#RESULT_RadioButton-1').selectOption('SUV');
    await mainLocator.locator('#RESULT_TextField-4').fill('2026');
    await mainLocator.locator('#RESULT_TextArea-1').fill('Test');
    await mainLocator.getByTestId('vehicle-submit').click();

    let output = await mainLocator.locator('#vehicle-output').innerText();
    console.log(output);

    await page.pause();
});

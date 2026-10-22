import { test, expect } from "@playwright/test";

test('Verify Keyboard Handle', async ({ page }) => {

    await page.goto("https://keycode.info/");

    // ---- Start your code here ----
    await page.keyboard.press('Enter');
    await page.keyboard.press('A');
    await page.screenshot({ path: 'screenshot/A.png' });   //Bydefault it will capture the screenshot abd keep in the root folder, so '/screenshot/' creates a folder named screenshot and keep A.png within it.

    await page.keyboard.press('ArrowLeft');
    await page.screenshot({ path: 'screenshot/ArrowLeft.png' });

    await page.keyboard.press('Shift+O');
    await page.screenshot({ path: 'screenshot/O.png' });

    await page.keyboard.press('Shift');
    await page.screenshot({ path: 'screenshot/Shift.png' });

    await page.pause();
});

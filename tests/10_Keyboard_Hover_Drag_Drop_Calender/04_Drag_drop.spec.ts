import { test, expect } from "@playwright/test";

test('Verify drag and drop between two columns', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/drag_and_drop");

    // ---- Start your code here ----
    const a = await page.locator('#column-a');
    const b = await page.locator('#column-b');

    await a.dragTo(b);

   //If drag drop is not working you can use force ----->  await a.dragTo(b,{force:true});

    await page.pause();
});

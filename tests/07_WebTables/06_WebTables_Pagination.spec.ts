import { test, expect } from "@playwright/test";

test('Verify Web Tables Part 6', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");
    // ---- Start your code here ----

    let name: string = 'Luca Greco';
    let row;

    while (true) {
        row = page.locator("#employees-tbody tr").filter({ hasText: name });
        if (await row.count()) {
            break;
        }
        const next = page.getByTestId('next-page');
        if (await next.isDisabled()) {
            throw new Error("No record found");
        }
        await next.click();
    }

    const email = await row.locator('td[data-col="email"]').innerText();
    console.log(email);

    const role = await row.locator('td[data-col="role"]').innerText();
    console.log(role);


    await page.pause();
});

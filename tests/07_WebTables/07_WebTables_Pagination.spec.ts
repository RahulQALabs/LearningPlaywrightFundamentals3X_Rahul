import { test, Page, expect, Locator } from "@playwright/test";

async function findRowByName(page: Page, name: string): Promise<Locator> {
    while (true) {
        const row = page.locator("#employees-tbody tr").filter({ hasText: name });
        if (await row.count()) {
            return row;
        }
        const next = page.getByTestId('next-page');
        if (await next.isDisabled()) throw new Error("No record found");
        await next.click();
    }
}

test('Verify Web Table pagination by finding a row by name', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");
    // ---- Start your code here ----

    let name: string = 'Luca Greco';
    const row=await findRowByName(page,name);
    const email = await row.locator('td[data-col="email"]').innerText();
    console.log(email);
    const role = await row.locator('td[data-col="role"]').innerText();
    console.log(role);


    await page.pause();
});

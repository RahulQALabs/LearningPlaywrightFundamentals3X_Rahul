import { test, expect } from "@playwright/test";

test('Verify Custom dropdown', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/select-boxes");

    // ---- Start your code here ----

    //① Single — searchable
    // await page.getByTestId('rs-single-input').click();
    // await page.getByRole('option', { name: 'Cypress', exact: true }).click();

    //You can use the below as well
    await page.locator('#rs-single').click();
    await page.getByText("Cypress").click();

    //② Multi — chips with remove
    await page.locator('#rs-multi').click();
    await page.getByRole('option', { name: 'Mocha', exact: true }).click();
    await page.getByRole('option', { name: 'Cucumber', exact: true }).click();
    await page.keyboard.press('Escape');

    //③ Creatable multi — type and Enter
    await page.locator('#rs-creatable').click();
    await page.getByRole('option', { name: 'performance', exact: true }).click();
    await page.getByRole('option', { name: 'api-testing', exact: true }).click();
    await page.keyboard.press('Escape');

    //⑤ Async — fetched on type
    await page.locator('#rs-async').click();
    await page.getByTestId('rs-async-input').fill('del');
    await expect(page.getByTestId('rs-async-menu')).toContainText('Pune');
    await page.getByRole('option', { name: 'delhi', exact: false }).click();

    await page.pause();
});

import { test, expect } from "@playwright/test";

test.describe('Verify Shadow DOM elements handling', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/widgets/shadow-dom");
    });

    test('Verify Shadow DOM card login and counter increment', async ({ page }) => {

        // ---- Start your code here ----
        //https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM

        const card = await page.getByTestId('card-account-card');
        const email = await card.locator('input[name="email"]').fill('test@academy.com');
        const pwd = await card.locator('input[name="password"]').fill('Test123');
        await card.getByTestId('card-account-submit').click();

        expect(await card.getByTestId('card-account-status'))
            .toContainText('test@academy.com');

        //we can va;idate at the page level as we, because it is a unique one locator on the page or card level
        //  expect(await page.getByTestId('card-account-status'))
        // .toContainText('test@academy.com');


        // ? - aria-label = 'Increment'
        const counterCart = await page.getByTestId('counter-cart');
        await counterCart.getByRole('button', { name: 'Increment' }).click();
        await counterCart.getByRole('button', { name: 'Increment' }).click();
        expect(counterCart.getByTestId('counter-value')).toHaveText('5');


        const nested = await page.getByTestId('nested-host');
        const nestEmail = await nested.locator('input[name="email"]').fill('rahul@test.com');
        const nestPwd = await nested.locator('input[name="password"]').fill('Test123');
        nested.getByTestId('card-inside-submit').click();

        expect(await nested.getByTestId('card-inside-status'))
            .toContainText('rahul@test.com');

        await page.pause();
    });
});

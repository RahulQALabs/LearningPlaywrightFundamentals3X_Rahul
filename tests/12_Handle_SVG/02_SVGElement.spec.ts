import { test, expect, Locator } from "@playwright/test";

test.describe('SVG Elements', () => {

    const url = "https://app.thetestingacademy.com/playwright/widgets/svg";

    // ---- Start your code here ----
    test.beforeEach(async ({ page }) => {
        console.log('Launch the url of each test cases');
        await page.goto(url);
    });

    test('Verify SVG elements handling', async ({ page }) => {
        const circleShape: Locator = page.locator('#circle-red');
        await circleShape.click();

        await page.waitForLoadState('networkidle');

        const output = await page.locator("#shapes-output").innerText();
        expect(output).toContain('Red circle');

        // await page.getByTestId('bar-q3').click();

        await page.getByRole('button', { name: /Q3 bar/ }).click();     // ====> /Q3 bar/ it is contains
        await page.getByRole('radio', { name: '4 Stars' }).click();

        let allBars = await page.locator('.bar').all();
        for (let b of allBars) {
            const height = await b.getAttribute('height');
            const dq = await b.getAttribute('data-quarter');
            const width = await b.getAttribute('width');

            console.log(b.textContent(), height, dq, width);
        }


        await page.pause();
    });

    //
});

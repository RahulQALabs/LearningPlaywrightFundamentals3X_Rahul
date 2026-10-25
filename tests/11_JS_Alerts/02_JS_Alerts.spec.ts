import { test, expect } from "@playwright/test";

//describe - It is group the test cases
test.describe('JavaScript Alerts', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    });

    test('Verify JS Alert accept', async ({ page }) => {

        //In Playwright - Before click any button , first we need to register the alert dialouge
        //Difference bw once vs on

        page.once('dialog', async dialog => {
            console.log('Alert type:', dialog.type());
            console.log('Alert message:', dialog.message());
            expect(dialog.message()).toBe('I am a JS Alert');
            await dialog.accept();
            //await dialog.dismiss();
        });

        await page.getByRole('button', { name: 'Click for JS Alert' }).click();
        // await page.pause();
    });

    test('Verify JS Confirm accept', async ({ page }) => {
        page.once('dialog', async dialog => {
            console.log('Alert type:', dialog.type());
            expect(dialog.type()).toBe('confirm');
            console.log('Alert message:', dialog.message());
            expect(dialog.message()).toBe('I am a JS Confirm');
            await dialog.accept();
            //await dialog.dismiss();
        });
        await page.locator('button', { hasText: 'Click for JS Confirm' }).click();
        await expect(page.locator('#result')).toHaveText('You clicked: Ok');

        await page.pause();

    });

     test('Verify JS Prompt accept with input text', async ({ page }) => { 

        const inputText='Hello From The Testing Academy';
         page.once('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.defaultValue()).toBe('');
            await dialog.accept(inputText);
            //await dialog.dismiss();
        });
        await page.locator('button', { hasText: 'Click for JS Prompt' }).click();
        await expect(page.locator('#result')).toHaveText(`You entered: ${inputText}`);


     });

});

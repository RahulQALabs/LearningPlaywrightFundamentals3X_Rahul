import { test, expect } from '@playwright/test';

test.skip('checkout with paypal', async ({ page }) => {
    //Never executes
});

test.only('login with rahul', async ({ page }) => {
    //only this test run, else everything in the file will be ignored/skip
});

test.fail('cart is total wrong, BUG-451', async () => {
    expect(90).toBe(100);  //actually returns 90
});

test.fixme('upload 2 GB file', async () => {
    //Skipped, but flagged as "needs fixing"
});

test('full regression report', async () => {
    test.slow();
    console.log(test.info().timeout);     //90000 instead of 30000
});

test('mobile layout', async ({ page, browserName }) => {
    test.fixme(browserName === 'webkit', 'Safari renders menu wrong');
    await page.goto("https://app.thetestingacademy.com/playwright/");
});
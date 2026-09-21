import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

    test('valid credential', async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/");
    });

    test('invalid password', async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/");
    });
});

// Run Command ------>>>> npx playwright test -g "Login Page"
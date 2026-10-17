import { test, expect } from "@playwright/test";

test('Verify Web Tables Part 4', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    const forgottenPwdLink = page.locator('a.list-group-item')
        .filter({ hasText: 'Forgotten Password' });
    await forgottenPwdLink.click();


    const privacyLink = page.locator('footer a')
        .filter({ hasText: 'Privacy Policy' });
    await privacyLink.click();

    await expect(privacyLink).toHaveAttribute('href','#privacy-policy');

    await page.pause();
});

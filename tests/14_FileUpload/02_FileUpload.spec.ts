import { test, expect } from "@playwright/test";
import path, { } from "path";

test.describe('Verify File Upload handling with preview', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/widgets/upload-download");
    });

    test('Verify single file upload with preview', async ({ page }) => {

        // ---- Start your code here ----

        const filePath = path.join(__dirname, 'test.txt');
        console.log(filePath);

        await page.locator('#single-upload').setInputFiles([filePath]);

        expect(await page.locator('#single-preview div span').first())
            .toContainText('test.txt');

        await page.pause();
    });
});

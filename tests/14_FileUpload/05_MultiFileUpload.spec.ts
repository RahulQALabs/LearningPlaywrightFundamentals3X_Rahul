import { test, expect } from "@playwright/test";
import path, { } from "path";

test.describe('Verify Multiple File Upload handling', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.patternfly.org/components/file-upload/multiple-file-upload/", { waitUntil: 'networkidle' });
    });

    test('Verify multiple files upload using file paths on PatternFly', async ({ page }) => {

        // ---- Start your code here ----
        // This input only accepts JPEG, Doc, PDF and PNG (check its accept attribute),
        // so test.txt would be silently dropped by the component.

        const filePath = path.join(__dirname, 'test.jpg');
        console.log(filePath);

        const filePath2 = path.join(__dirname, 'test.png');
        console.log(filePath2);

        await page.locator('.pf-v6-c-multiple-file-upload input').setInputFiles([filePath, filePath2]);

        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('2 of 2 files uploaded');
        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('test.jpg');
        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('test.png');

        await page.pause();
    });
});

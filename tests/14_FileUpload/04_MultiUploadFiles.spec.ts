import { test, expect } from "@playwright/test";
import path, { } from "path";

test.describe('Verify Multiple File Upload handling', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.patternfly.org/components/file-upload/multiple-file-upload/");
    });

    test('Verify multiple files upload using buffers on PatternFly', async ({ page }) => {

        // ---- Start your code here ----

        await page.locator('.pf-v6-c-multiple-file-upload input').setInputFiles([
            {
                name: 'test.txt',              // This is relative path of text file Ex \14_FileUpload\test.txt
                mimeType: 'txt',
                buffer: Buffer.from('image from the testing')
            },
            {
                name: 'test.jpg',
                mimeType: 'JPEG',
                buffer: Buffer.from('image from the testing')
            }

        ]);

        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('test.jpg');
        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('test.png');

        await page.pause();
    });
});

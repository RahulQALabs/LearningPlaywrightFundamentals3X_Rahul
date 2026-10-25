import { test, expect } from "@playwright/test";
import path, { } from "path";

test.describe('Verify Multiple File Upload handling', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/widgets/upload-download");
    });

    test('Verify multiple files upload using buffers on TTA', async ({ page }) => {

        // ---- Start your code here ----

        await page.locator('#multi-upload').setInputFiles([
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

        expect(await page.locator('#multi-preview'))
            .toContainText('test.txt');
            expect(await page.locator('#multi-preview'))
            .toContainText('test.jpg');

        await page.pause();
    });
});

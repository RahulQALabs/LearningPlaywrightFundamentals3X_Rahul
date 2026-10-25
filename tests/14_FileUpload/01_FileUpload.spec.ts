import { test, expect } from "@playwright/test";
import path, { } from "path";

test.describe('Verify File Upload handling', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/upload", { waitUntil: 'networkidle' });
    });

    test('Verify single file upload using file path', async ({ page }) => {

        // ---- Start your code here ----
        // File upload - we should have a file path 
        //_dir -> It will give you the current working dir full path + append the <file name>

        const filePath = path.join(__dirname, 'test.txt');
        console.log(filePath);

        const content = await page.locator('#content');
        await content.locator('#file-upload').setInputFiles([filePath]);

        await content.locator('#file-submit').click();

        expect(await page.locator('#uploaded-files')).toContainText('test.txt');
        console.log(await page.locator('#uploaded-files'));
        await page.pause();
    });
});

import { test, expect } from "@playwright/test";
import path, { } from "path";

test.describe('Verify Multiple File Upload with different formats', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.patternfly.org/components/file-upload/multiple-file-upload/", { waitUntil: 'networkidle' });
    });

    test('Verify pdf, doc, jpeg and txt upload using file paths on PatternFly', async ({ page }) => {

        // ---- Start your code here ----
        // Accepted file types on this page: JPEG, Doc, PDF, PNG.
        // .txt is NOT accepted, so the component drops it and only pdf + doc + jpeg get uploaded.

        const pdfPath = path.join(__dirname, 'test.pdf');
        console.log(pdfPath);

        const docPath = path.join(__dirname, 'sample.doc');
        console.log(docPath);

        const txtPath = path.join(__dirname, 'test.txt');
        console.log(txtPath);

        const jpgPath = path.join(__dirname, 'test.jpg');
        console.log(jpgPath);

        await page.locator('.pf-v6-c-multiple-file-upload input').setInputFiles([pdfPath, docPath, txtPath, jpgPath]);

        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('3 of 3 files uploaded');
        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('test.pdf');
        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('sample.doc');
        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('test.jpg');
        await expect(page.locator('.pf-v6-c-multiple-file-upload')).not.toContainText('test.txt');

        await page.pause();
    });
});

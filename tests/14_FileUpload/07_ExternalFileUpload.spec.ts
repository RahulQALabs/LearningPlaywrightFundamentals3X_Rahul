import { test, expect } from "@playwright/test";
import path, { } from "path";
import os from "os";

test.describe('Verify Multiple File Upload from an external folder', () => {

    // These files live OUTSIDE the project - an absolute path is all setInputFiles needs,
    // __dirname and relative paths are not mandatory.
    const externalDir = path.join(os.homedir(), 'playwright-uploads');

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.patternfly.org/components/file-upload/multiple-file-upload/", { waitUntil: 'networkidle' });
    });

    test('Verify pdf, doc and jpeg upload from outside the project directory', async ({ page }) => {

        // ---- Start your code here ----

        const pdfPath = path.join(externalDir, 'test.pdf');
        console.log(pdfPath);

        const docPath = path.join(externalDir, 'sample.doc');
        console.log(docPath);

        const jpgPath = path.join(externalDir, 'test.jpg');
        console.log(jpgPath);

        await page.locator('.pf-v6-c-multiple-file-upload input').setInputFiles([pdfPath, docPath, jpgPath]);

        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('3 of 3 files uploaded');
        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('test.pdf');
        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('sample.doc');
        await expect(page.locator('.pf-v6-c-multiple-file-upload')).toContainText('test.jpg');

        await page.pause();
    });
});

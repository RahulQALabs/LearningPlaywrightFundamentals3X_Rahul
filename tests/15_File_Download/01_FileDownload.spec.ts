import { test, expect } from "@playwright/test";

test.describe('Verify File Download', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/widgets/upload-download");
    });

    test('Download the text file', async ({ page }) => {

        // ---- Start your code here ---- Why I am not adding await here ?

        const [fileDownload] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-text').click()
        ]);

        await fileDownload.saveAs('./out/' + fileDownload.suggestedFilename());
    });

    test('Download the json file', async ({ page }) => {

        // ---- Start your code here ---- Why I am not adding await here ?

        const [fileDownload] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-json').click()
        ]);

        await fileDownload.saveAs('./out/' + fileDownload.suggestedFilename());
    });

    test('Download the static file', async ({ page }) => {

        // ---- Start your code here ---- Why I am not adding await here ?
        //Race condition ?
        
        const [fileDownload] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-static').click()
        ]);

        await fileDownload.saveAs('./out/' + fileDownload.suggestedFilename());

        await page.pause();
    });

});

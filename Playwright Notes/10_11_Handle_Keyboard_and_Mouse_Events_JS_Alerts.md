#  Handle Keyboard and Mouse Events, JS Alerts
> 1 Oct 2026

```
import { test, expect, Locator } from '@playwright/test';

test('Verify Hover for the spicejet', async ({ page }) => {
    await page.goto('https://www.spicejet.com/');
    await page.getByText("Add-ons", { exact: true }).hover();
    await page.getByText('FlyEarly', { exact: true }).click();

    // Code

   await page.pause();
});
```
**Hover Problem Statement**

![image.png](images/image_0lUcQDHwXX6L1j9W83ygi.png)



---

![image.png](images/image_XjtDmHop8qsC923S6TW2V.png)

```
import { test, expect, Locator } from '@playwright/test';

test.describe('Javascript Alerts', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    });



    test('JS Alert accept 1', async ({ page }) => {


        await page.getByRole('button', { name: "Click for JS Alert" }).click();
        page.once('dialog', async dialog => {
            console.log('Alert type:', dialog.type());
            console.log('Alert message:', dialog.message());
            expect(dialog.message()).toBe('I am a JS Alert');
            await dialog.accept();
        });
        await page.pause();
    });
    test('JS Alert accept 2', async ({ page }) => {

        page.once('dialog', async dialog => {
            console.log('Alert type:', dialog.type());
            expect(dialog.type()).toBe('confirm');
            console.log('Alert message:', dialog.message());
            expect(dialog.message()).toBe('I am a JS Confirm');
            await dialog.accept();
            //await dialog.dismiss();
        });

        await page.locator('button', { hasText: 'Click for JS Confirm' }).click();
        await expect(page.locator('#result')).toHaveText('You clicked: Ok');






    });
    test('JS Alert accept 3', async ({ page }) => {

        const inputText = 'Hello from The Testing Academy';

        page.once('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.defaultValue()).toBe('');
            await dialog.accept(inputText);
            //await dialog.dismiss();
        });

        await page.locator('button', { hasText: 'Click for JS Prompt' }).click();
        await expect(page.locator('#result')).toHaveText(`You entered: ${inputText}`);







    });
});
```
---

> 3rd Oct 2026

**Basic Auth**

Use the URL -> [admin:admin@the-internet.herokuapp.com/basic_auth](https://admin:admin@the-internet.herokuapp.com/basic_auth) 

 mostly, it is used in the staging or QA environments. The credential that you see, admin-admin, you can store it in the **env file** 

![image.png](images/image_BZx-kS_nPBhOrGZA2kwnI.png)




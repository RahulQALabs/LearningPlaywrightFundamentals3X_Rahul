import { test, expect } from "@playwright/test";

test('Verify Web Tables', async ({ page }) => {

    await page.goto("https://awesomeqa.com/webtable.html");

    const firstString = "//table[@id='customers']/tbody/tr[";
    const secondString = "]/td[";
    const thirdString = "]";

    const rowCount = await page.locator("//table[@id='customers']/tbody/tr").count();
    const cellCount = await page.locator("//table[@id='customers']/tbody/tr[2]/td").count();

    for (let row = 2; row <= rowCount; row++) {
        for (let cols = 1; cols <= cellCount; cols++) {

            //`` - This is called template literal
            const dynamicText = `${firstString}${row}${secondString}${cols}${thirdString}`;
            console.log(dynamicText);
            const ele = await page.locator(dynamicText).innerText();
            console.log(ele);

            if (ele.includes("Helen Bennett")) {
                const countryXpath = `${dynamicText}/following-sibling::td`;
                const countryName = await page.locator(countryXpath).innerText();
                console.log(`${ele} is staying in country ${countryName}`);
            }
        }
    }



    await page.pause();

});

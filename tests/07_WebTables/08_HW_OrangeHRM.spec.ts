import { test, expect } from "@playwright/test";

test('Verify Web Tables Part 7', async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    // ---- Start your code here ----
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();

    //Go to the list 
    await page.locator('.oxd-sidepanel-body span')
        .filter({ hasText: "PIM" })
        .click();

    await page.locator(".orangehrm-header-container button").click();

    await page.locator(".oxd-topbar-body-nav ul li")
        .filter({ hasText: "Add Employee" })
        .click();

    await page.getByPlaceholder("First Name").fill("Rahul");
    await page.getByPlaceholder("Middle Name").fill("K");
    await page.getByPlaceholder("Last Name").fill("Gupta");
    await page.locator('.oxd-input-group', { hasText: 'Employee Id' }).locator('input').fill("008");
    await page.locator(".oxd-form-actions button").filter({ hasText: "Save" }).click();

    await page.locator(".oxd-topbar-body-nav ul li")
        .filter({ hasText: "Employee List" })
        .click();

    await expect(page.locator(".oxd-table-card").first()).toBeVisible();


    let name: string = '997';
    let row;

    while (true) {
        row = page.locator(".oxd-table-card div.oxd-table-row").filter({ hasText: name });
        //page.locator('nav[aria-label="Pagination Navigation"] li:last-child button')
        if (await row.count()) {
            break;
        }
        const next = page.locator('button.oxd-pagination-page-item--previous-next:has(.bi-chevron-right)');
        if (await next.count() === 0) {
            throw new Error("No record found");
        }

        const firstRow = page.locator(".oxd-table-card div.oxd-table-row").first();
        const before = await firstRow.innerText();
        await next.click();
        await expect(firstRow).not.toHaveText(before);
    }

    await row.locator(".oxd-table-cell-actions button").last().click();
    await page.waitForTimeout(5000);
    await page.locator(".orangehrm-modal-footer button").last().click();
    await page.waitForTimeout(5000);


    //await page.pause();
});

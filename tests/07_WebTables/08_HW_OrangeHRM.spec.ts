import { test, expect } from "@playwright/test";

test('Verify OrangeHRM employee creation and search across pagination', async ({ page }) => {

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

    // Shared demo: a fixed Employee Id collides with other runs, so use a unique one per run.
    const employeeId: string = String(Date.now()).slice(-6);

    await page.getByPlaceholder("First Name").fill("Rahul");
    await page.getByPlaceholder("Middle Name").fill("K");
    await page.getByPlaceholder("Last Name").fill("Gupta");
    await page.locator('.oxd-input-group', { hasText: 'Employee Id' }).locator('input').fill(employeeId);
    await page.locator(".oxd-form-actions button").filter({ hasText: "Save" }).click();

    // A rejected Save only shows an inline error - nothing fails on its own, so verify it went through.
    await expect(page.locator(".oxd-input-field-error-message")).toHaveCount(0);
    await expect(page, "Employee not saved - the Employee Id was rejected").toHaveURL(/viewPersonalDetails/, { timeout: 20000 });

    await page.locator(".oxd-topbar-body-nav ul li")
        .filter({ hasText: "Employee List" })
        .click();

    await expect(page.locator(".oxd-table-card").first()).toBeVisible();


    let name: string = employeeId;
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

import { test, expect } from "@playwright/test";

// Rule of thumb: anything you create with chromium.launch() / newContext() / newPage(), you close — reverse order.
// Anything the fixture gave you (page, context from the signature), the runner closes.
// Closing a context also closes its pages, so no page.close() is needed here.

test('Verify two contexts keep separate sessions', async ({ browser }) => {
    const adminContext = await browser.newContext();
    const userContext = await browser.newContext();
    const guestContext = await browser.newContext();

    const adminPage = await adminContext.newPage();
    const userPage = await userContext.newPage();
    const guestPage = await guestContext.newPage();

    await adminPage.goto('https://example.com');
    await userPage.goto('https://example.com');
    await guestPage.goto('https://example.com');

    // Write into the admin session only.
    await adminPage.evaluate(() => localStorage.setItem('user', 'admin'));

    // Isolation proof: admin sees the value, the other contexts do not.
    expect(await adminPage.evaluate(() => localStorage.getItem('user'))).toBe('admin');
    expect(await userPage.evaluate(() => localStorage.getItem('user'))).toBeNull();
    expect(await guestPage.evaluate(() => localStorage.getItem('user'))).toBeNull();

    await adminContext.close();
    await userContext.close();
    await guestContext.close();
});

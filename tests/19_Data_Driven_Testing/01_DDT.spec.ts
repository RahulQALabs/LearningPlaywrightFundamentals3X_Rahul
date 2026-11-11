import { test, expect } from "@playwright/test";
import userData from './user.json';

test('Verify DDT', async ({ page }) => {
    console.log(userData.username);
    console.log(userData.password);
})
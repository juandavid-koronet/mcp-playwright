import { test, expect } from '@playwright/test';

test('abre la página de login', async ({ page }) => {
  await page.goto('https://e2e-testing.kometsales-noprod.com');
  await expect(page).toHaveURL(/login/);
  await expect(page.locator('#txtUserName')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toBeVisible();
});

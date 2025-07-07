import { test, expect } from '@playwright/test';

test.describe('Komet Sales Order Entry', () => {
  test('should create an order with customer search, location selection, and carrier assignment', async ({ page }) => {
    // Navigate to the Komet Sales login page
    await page.goto('https://e2e-testing.kometsales-noprod.com');

    // Enter username 'adam' and password 'R1X91\Y8Bfa}cxcQ'
    await page.getByRole('textbox', { name: 'Username' }).fill('adam');
    await page.getByRole('textbox', { name: 'Password' }).fill('R1X91\\Y8Bfa}cxcQ');

    // Click the login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Select 'Aflorar' company from the company selection page
    await page.locator('.ant-card').first().click();

    // Navigate to Order Entry from the main menu
    await page.getByRole('link', { name: 'Order Entry' }).click();

    // Select 'MI - Miami' location from the location dropdown
    await page.locator('#ddlLocation').selectOption(['MI - Miami']);

    // Enter 3 blank spaces in the customer field
    await page.getByRole('textbox', { name: 'Enter a customer name or' }).fill('   ');

    // Type 'juan' sequentially in the customer field
    await page.getByRole('textbox', { name: 'Enter a customer name or' }).pressSequentially('juan');

    // Press down arrow key to navigate to customer suggestion
    await page.keyboard.press('ArrowDown');

    // Press Enter to select 'Juan Vanegas' customer
    await page.keyboard.press('Enter');

    // Wait for customer information to load
    await expect(page.locator('text=juan')).toBeVisible();

    // Select 'Armellini' as the carrier
    await page.locator('#ddlCarrier').selectOption(['Armellini']);

    // Click Save to create the order
    await page.getByRole('link', { name: 'Save' }).click();

    // Verify the order was successfully saved
    await expect(page.locator('text=The order was successfully saved.')).toBeVisible();
    
    // Verify that an invoice number was generated
    await expect(page.locator('text=Invoice:')).toBeVisible();
    await expect(page.locator('text=(Pending)')).toBeVisible();
    
    // Verify the order details
    await expect(page.locator('text=MI - Miami')).toBeVisible();
    await expect(page.locator('text=Juan Vanegas')).toBeVisible();
    await expect(page.locator('text=Armellini')).toBeVisible();
    await expect(page.locator('text=Order Total:')).toBeVisible();
  });
});

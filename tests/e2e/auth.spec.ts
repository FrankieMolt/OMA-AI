import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('login page should show login form or demo button', async ({ page }) => {
    await page.goto('/login');
    
    // Check for login page elements
    await expect(page.locator('h1')).toContainText('Login');
    
    // Check for either email input (real auth) or demo button (demo mode)
    const hasEmailInput = await page.locator('#login-email').isVisible().catch(() => false);
    const hasDemoButton = await page.locator('button:has-text("Continue as Demo User")').isVisible().catch(() => false);
    
    // At least one should be visible
    expect(hasEmailInput || hasDemoButton).toBeTruthy();
  });

  test('register page should show registration form with required fields', async ({ page }) => {
    await page.goto('/register');
    
    // Wait for form to be visible
    await page.waitForSelector('form', { timeout: 10000 });
    
    // Check for registration form heading
    await expect(page.locator('h1')).toBeVisible();
    
    // Use type selectors for form inputs (most reliable)
    await expect(page.locator('input[type="text"]').first()).toBeVisible();
    await expect(page.locator('input[type="email"]').first()).toBeVisible();
    await expect(page.locator('input[type="password"]').first()).toBeVisible();
  });

  test('demo mode dashboard should show mock data', async ({ page }) => {
    await page.goto('/dashboard?demo=true');
    
    // Should show Demo Mode banner
    await expect(page.getByText(/demo mode/i).first()).toBeVisible();
    
    // Should show mock stats
    await expect(page.getByText('MCPs Owned')).toBeVisible();
    await expect(page.getByText('12,847')).toBeVisible();
  });
});

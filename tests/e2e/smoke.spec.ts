import { test, expect } from '@playwright/test';
test('homepage and public catalogue load',async({page})=>{await page.goto('/');await expect(page.locator('body')).toBeVisible();await page.goto('/products');await expect(page.locator('body')).toBeVisible()});
test('admin is not openly accessible',async({page})=>{await page.goto('/admin');await expect(page).not.toHaveURL(/\/admin\/?$/)});

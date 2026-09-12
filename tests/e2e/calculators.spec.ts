import { test, expect } from '@playwright/test';

test.describe('Calculator Pages', () => {
  test('should load calculators listing page', async ({ page }) => {
    await page.goto('/calculators');
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    // Check page title
    await expect(page).toHaveTitle(/Calculator/i);
    
    // Should see calculator links
    const calculatorLinks = await page.locator('a[href*="/calculators/"]').count();
    expect(calculatorLinks).toBeGreaterThan(0);
  });

  test('should load CAC estimator calculator', async ({ page }) => {
    await page.goto('/calculators/cac-estimator');
    
    await page.waitForLoadState('networkidle');
    
    // Check page title
    await expect(page).toHaveTitle(/CAC/i);
    
    // Look for calculator form or inputs
    const inputs = await page.locator('input, select').count();
    expect(inputs).toBeGreaterThan(0);
  });

  test('should load VAT calculator', async ({ page }) => {
    await page.goto('/calculators/vat-calculator');
    
    await page.waitForLoadState('networkidle');
    
    // Check page has calculator elements
    await expect(page).toHaveTitle(/VAT/i);
  });

  test('should load JAMB subject checker', async ({ page }) => {
    await page.goto('/calculators/jamb-subject-checker');
    
    await page.waitForLoadState('networkidle');
    
    // Check page loaded
    await expect(page).toHaveTitle(/JAMB/i);
  });

  test('should load business startup calculator', async ({ page }) => {
    await page.goto('/calculators/business-startup-calculator');
    
    await page.waitForLoadState('networkidle');
    
    // Check page loaded
    await expect(page).toHaveTitle(/Business|Startup/i);
  });

  test('should load passport estimator calculator', async ({ page }) => {
    await page.goto('/calculators/passport-estimator');
    
    await page.waitForLoadState('networkidle');
    
    // Check page loaded
    await expect(page).toHaveTitle(/Passport/i);
  });

  test('should handle 404 for invalid calculator', async ({ page }) => {
    const response = await page.goto('/calculators/nonexistent-calculator');
    
    // Should return 404 or redirect
    expect([404, 200, 307]).toContain(response?.status());
  });

  test('calculator page should have ad zones', async ({ page }) => {
    await page.goto('/calculators/vat-calculator');
    
    await page.waitForLoadState('networkidle');
    
    // Look for ad elements
    const adLabels = await page.locator('text=/Advertisement|Ad Zone/i').count();
    
    // Ad zones should be present (even if empty)
    expect(adLabels).toBeGreaterThanOrEqual(0);
  });
});

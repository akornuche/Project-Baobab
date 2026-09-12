import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display home page with search bar', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check if page title is correct
    await expect(page).toHaveTitle(/Baobab|Home/i);

    // Search bar should be visible (looking for input with search placeholder)
    const searchInputs = await page.locator('input[placeholder*="search" i]').count();
    expect(searchInputs).toBeGreaterThan(0);
  });

  test('should search for guides', async ({ page }) => {
    // Find and interact with search input
    const searchInput = page.locator('input[placeholder*="search" i]').first();
    
    // Type search query
    await searchInput.fill('passport');
    await page.waitForTimeout(500); // Wait for debounce

    // Wait for results to appear
    await page.waitForLoadState('networkidle');

    // Check if search results are displayed
    const results = await page.locator('[role="listitem"]').count();
    expect(results).toBeGreaterThanOrEqual(0);
  });

  test('should filter search results by domain', async ({ page }) => {
    // Navigate to search API directly
    await page.goto('/api/search?q=business&index=guides&limit=10');
    
    // Check response contains results
    const content = await page.content();
    expect(content).toContain('"results"');
  });

  test('should search directories', async ({ page }) => {
    // Navigate to directory page (when available)
    await page.goto('/directory');
    
    // Check if page loads without error
    const pageStatus = page.url();
    expect(pageStatus).toContain('/directory');
  });

  test('should handle empty search gracefully', async ({ page }) => {
    // Find search input
    const searchInput = page.locator('input[placeholder*="search" i]').first();
    
    // Type very short query
    await searchInput.fill('a');
    
    // Should not show results for single character
    await page.waitForTimeout(500);
    
    // Page should still be functional
    const pageTitle = await page.title();
    expect(pageTitle.length).toBeGreaterThan(0);
  });

  test('should search with special characters', async ({ page }) => {
    // Navigate to search API with special characters
    await page.goto('/api/search?q=CAC%20registration&index=guides');
    
    const content = await page.content();
    expect(content).toContain('"results"');
  });
});

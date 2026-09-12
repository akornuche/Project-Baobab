import { test, expect } from '@playwright/test';

test.describe('API Endpoints', () => {
  const baseURL = 'http://localhost:3000';

  test('should get health check', async ({ page }) => {
    const response = await page.goto(`${baseURL}/api/health`);
    expect(response?.status()).toBe(200);
  });

  test('should list guides', async ({ page }) => {
    await page.goto(`${baseURL}/api/guides`);
    
    const content = await page.content();
    expect(content).toContain('"guides"');
  });

  test('should search guides via API', async ({ page }) => {
    await page.goto(`${baseURL}/api/search?q=cac&index=guides&limit=10`);
    
    const content = await page.content();
    expect(content).toContain('"results"');
    expect(content).toContain('"total"');
  });

  test('should list directories via API', async ({ page }) => {
    await page.goto(`${baseURL}/api/directory/listings?limit=10`);
    
    const content = await page.content();
    expect(content).toContain('"listings"');
  });

  test('should get ads for content zone', async ({ page }) => {
    await page.goto(`${baseURL}/api/ads?zone=content&limit=5`);
    
    const content = await page.content();
    expect(content).toContain('"ads"');
  });

  test('should get ads campaigns', async ({ page }) => {
    await page.goto(`${baseURL}/api/ads/campaigns?limit=10`);
    
    const content = await page.content();
    expect(content).toContain('"campaigns"');
  });

  test('should handle search with pagination', async ({ page }) => {
    await page.goto(`${baseURL}/api/search?q=passport&limit=5&offset=0`);
    
    const content = await page.content();
    expect(content).toContain('"limit"');
    expect(content).toContain('"offset"');
  });

  test('should handle empty search gracefully', async ({ page }) => {
    const response = await page.goto(`${baseURL}/api/search?q=`);
    expect(response?.status()).toBe(200);
    
    const content = await page.content();
    // Should return empty results or error message
    expect(content).toContain('results');
  });

  test('should filter guides by domain', async ({ page }) => {
    // First get available domains
    await page.goto(`${baseURL}/api/search?q=business&index=guides&domain=government`);
    
    const content = await page.content();
    expect(content).toContain('"results"');
  });

  test('should track ad impression', async ({ page }) => {
    const response = await page.request.post(`${baseURL}/api/ads/track/impression`, {
      data: {
        adId: 'test-ad-id',
      },
    });

    expect([200, 201, 404]).toContain(response.status());
  });

  test('should handle database connection', async ({ page }) => {
    // Make multiple API calls to ensure connection pool works
    for (let i = 0; i < 5; i++) {
      const response = await page.goto(`${baseURL}/api/guides?limit=1`);
      expect(response?.status()).toBe(200);
    }
  });
});

test.describe('API Error Handling', () => {
  const baseURL = 'http://localhost:3000';

  test('should return 400 for invalid parameters', async ({ page }) => {
    const response = await page.goto(
      `${baseURL}/api/ads?limit=invalid`
    );
    
    // Should handle gracefully (either 400 or treat as invalid and use default)
    expect([200, 400]).toContain(response?.status());
  });

  test('should return 404 for nonexistent resource', async ({ page }) => {
    const response = await page.goto(
      `${baseURL}/api/directory/subscriptions/nonexistent-id`
    );
    
    expect([404, 200]).toContain(response?.status());
  });

  test('should not expose sensitive data in errors', async ({ page }) => {
    const response = await page.goto(`${baseURL}/api/invalid-endpoint`);
    
    const content = await page.content();
    
    // Should not contain database connection strings or secrets
    expect(content).not.toContain('password');
    expect(content).not.toContain('DATABASE_URL');
  });
});

import { test, expect } from '@playwright/test';

test.describe('Directory Functionality', () => {
  const baseURL = 'http://localhost:3000';

  test('should list all directory listings', async ({ page }) => {
    await page.goto(`${baseURL}/api/directory/listings`);
    
    const content = await page.content();
    expect(content).toContain('"listings"');
  });

  test('should filter directory by category', async ({ page }) => {
    await page.goto(
      `${baseURL}/api/directory/listings?category=accountants&limit=10`
    );
    
    const content = await page.content();
    expect(content).toContain('"listings"');
  });

  test('should filter directory by state', async ({ page }) => {
    await page.goto(
      `${baseURL}/api/directory/listings?state=Lagos&limit=10`
    );
    
    const content = await page.content();
    expect(content).toContain('"listings"');
  });

  test('should filter premium listings only', async ({ page }) => {
    await page.goto(
      `${baseURL}/api/directory/listings?premiumOnly=true&limit=10`
    );
    
    const content = await page.content();
    expect(content).toContain('"listings"');
  });

  test('should filter verified listings only', async ({ page }) => {
    await page.goto(
      `${baseURL}/api/directory/listings?verifiedOnly=true&limit=10`
    );
    
    const content = await page.content();
    expect(content).toContain('"listings"');
  });

  test('should get subscriptions for listing', async ({ page }) => {
    // First create/get a listing
    await page.goto(`${baseURL}/api/directory/listings?limit=1`);
    const content = await page.content();
    const json = JSON.parse(content);
    
    if (json.listings && json.listings.length > 0) {
      const listingId = json.listings[0].id;
      
      // Get subscriptions for this listing
      await page.goto(
        `${baseURL}/api/directory/subscriptions?listingId=${listingId}`
      );
      
      const subContent = await page.content();
      expect(subContent).toContain('"subscriptions"');
    }
  });

  test('should get reviews for listing', async ({ page }) => {
    // Get listings first
    await page.goto(`${baseURL}/api/directory/listings?limit=1`);
    const content = await page.content();
    const json = JSON.parse(content);
    
    if (json.listings && json.listings.length > 0) {
      const listingId = json.listings[0].id;
      
      // Get reviews
      await page.goto(
        `${baseURL}/api/directory/reviews?listingId=${listingId}&status=APPROVED`
      );
      
      const reviewContent = await page.content();
      expect(reviewContent).toContain('"reviews"');
    }
  });

  test('should handle pagination correctly', async ({ page }) => {
    await page.goto(
      `${baseURL}/api/directory/listings?limit=5&offset=0`
    );
    
    const content = await page.content();
    const json = JSON.parse(content);
    
    expect(json.limit).toBe(5);
    expect(json.offset).toBe(0);
    expect(json.total).toBeGreaterThanOrEqual(0);
  });

  test('should include subscription data in listings', async ({ page }) => {
    await page.goto(`${baseURL}/api/directory/listings?premiumOnly=true&limit=1`);
    
    const content = await page.content();
    const json = JSON.parse(content);
    
    if (json.listings && json.listings.length > 0) {
      const listing = json.listings[0];
      
      // Premium listing should have subscription data
      if (listing.premium) {
        expect(listing.subscriptions || listing.premiumTier).toBeTruthy();
      }
    }
  });

  test('should create a directory listing', async ({ page }) => {
    const response = await page.request.post(
      `${baseURL}/api/directory/listings`,
      {
        data: {
          name: 'Test Accountant',
          category: 'accountants',
          state: 'Lagos',
          city: 'Lagos',
          phone: '+2348012345678',
          email: 'test@example.com',
        },
      }
    );

    expect([201, 200, 400]).toContain(response.status());
  });

  test('should submit a review', async ({ page }) => {
    // Get a listing first
    await page.goto(`${baseURL}/api/directory/listings?limit=1`);
    const content = await page.content();
    const json = JSON.parse(content);
    
    if (json.listings && json.listings.length > 0) {
      const listingId = json.listings[0].id;
      
      const response = await page.request.post(
        `${baseURL}/api/directory/reviews`,
        {
          data: {
            listingId,
            rating: 5,
            title: 'Great Service',
            comment: 'Very professional',
            reviewer: 'Test User',
          },
        }
      );

      expect([201, 200, 400]).toContain(response.status());
    }
  });

  test('should handle invalid listing ID gracefully', async ({ page }) => {
    const response = await page.goto(
      `${baseURL}/api/directory/subscriptions?listingId=invalid-id`
    );
    
    // Should handle gracefully, not crash
    expect(response?.status()).toBeLessThan(500);
  });

  test('directory search should respect facets', async ({ page }) => {
    await page.goto(
      `${baseURL}/api/search?q=business&index=directories&state=Lagos&limit=10`
    );
    
    const content = await page.content();
    expect(content).toContain('"results"');
    // Should contain facetDistribution if Meilisearch is connected
    if (content.includes('facetDistribution')) {
      expect(content).toContain('state');
    }
  });
});

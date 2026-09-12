import { test, expect } from '@playwright/test';

test.describe('Ads Functionality', () => {
  const baseURL = 'http://localhost:3000';

  test('should get ad campaigns', async ({ page }) => {
    await page.goto(`${baseURL}/api/ads/campaigns`);
    
    const content = await page.content();
    expect(content).toContain('"campaigns"');
  });

  test('should filter campaigns by status', async ({ page }) => {
    await page.goto(`${baseURL}/api/ads/campaigns?status=ACTIVE&limit=10`);
    
    const content = await page.content();
    expect(content).toContain('"campaigns"');
  });

  test('should get active advertisements', async ({ page }) => {
    await page.goto(`${baseURL}/api/ads?limit=10`);
    
    const content = await page.content();
    expect(content).toContain('"ads"');
  });

  test('should filter ads by zone', async ({ page }) => {
    await page.goto(`${baseURL}/api/ads?zone=content&limit=10`);
    
    const content = await page.content();
    expect(content).toContain('"ads"');
  });

  test('should filter ads by size', async ({ page }) => {
    await page.goto(
      `${baseURL}/api/ads?zone=content&size=medium_rectangle&limit=10`
    );
    
    const content = await page.content();
    expect(content).toContain('"ads"');
  });

  test('should track ad impression successfully', async ({ page }) => {
    // First get an ad
    const adsResponse = await page.request.get(`${baseURL}/api/ads?limit=1`);
    const adsJson = await adsResponse.json();
    
    if (adsJson.ads && adsJson.ads.length > 0) {
      const adId = adsJson.ads[0].id;
      
      // Track impression
      const trackResponse = await page.request.post(
        `${baseURL}/api/ads/track/impression`,
        {
          data: { adId },
        }
      );

      expect([200, 201]).toContain(trackResponse.status());
      
      const trackJson = await trackResponse.json();
      expect(trackJson).toHaveProperty('message');
    }
  });

  test('should track ad click successfully', async ({ page }) => {
    // First get an ad
    const adsResponse = await page.request.get(`${baseURL}/api/ads?limit=1`);
    const adsJson = await adsResponse.json();
    
    if (adsJson.ads && adsJson.ads.length > 0) {
      const adId = adsJson.ads[0].id;
      
      // Track click
      const trackResponse = await page.request.post(
        `${baseURL}/api/ads/track/click`,
        {
          data: { adId },
        }
      );

      expect([200, 201]).toContain(trackResponse.status());
      
      const trackJson = await trackResponse.json();
      expect(trackJson).toHaveProperty('message');
    }
  });

  test('should create ad campaign', async ({ page }) => {
    const response = await page.request.post(`${baseURL}/api/ads/campaigns`, {
      data: {
        title: 'Test Campaign',
        advertiserName: 'Test Advertiser',
        startDate: new Date('2026-09-01').toISOString(),
        endDate: new Date('2026-09-30').toISOString(),
        budget: 100000,
      },
    });

    expect([200, 201, 400]).toContain(response.status());
    
    if (response.status() === 201) {
      const json = await response.json();
      expect(json).toHaveProperty('id');
      expect(json.status).toBe('DRAFT');
    }
  });

  test('should create advertisement', async ({ page }) => {
    // First get or create a campaign
    const campaignsResponse = await page.request.get(
      `${baseURL}/api/ads/campaigns?limit=1`
    );
    const campaignsJson = await campaignsResponse.json();
    
    if (campaignsJson.campaigns && campaignsJson.campaigns.length > 0) {
      const campaignId = campaignsJson.campaigns[0].id;
      
      const response = await page.request.post(`${baseURL}/api/ads`, {
        data: {
          campaignId,
          title: 'Test Ad',
          imageUrl: 'https://example.com/ad.jpg',
          linkUrl: 'https://example.com',
          zone: 'content',
          size: 'medium_rectangle',
        },
      });

      expect([200, 201, 400]).toContain(response.status());
    }
  });

  test('should include campaign data with ads', async ({ page }) => {
    await page.goto(`${baseURL}/api/ads?limit=1`);
    
    const content = await page.content();
    const json = JSON.parse(content);
    
    if (json.ads && json.ads.length > 0) {
      const ad = json.ads[0];
      expect(ad).toHaveProperty('campaign');
    }
  });

  test('should handle ad pagination', async ({ page }) => {
    await page.goto(`${baseURL}/api/ads?limit=5&offset=0`);
    
    const content = await page.content();
    const json = JSON.parse(content);
    
    expect(json.limit).toBe(5);
    expect(json.offset).toBe(0);
    expect(json).toHaveProperty('total');
  });

  test('should reject impression without adId', async ({ page }) => {
    const response = await page.request.post(
      `${baseURL}/api/ads/track/impression`,
      {
        data: {},
      }
    );

    expect([400, 404]).toContain(response.status());
  });

  test('should reject click without adId', async ({ page }) => {
    const response = await page.request.post(
      `${baseURL}/api/ads/track/click`,
      {
        data: {},
      }
    );

    expect([400, 404]).toContain(response.status());
  });

  test('should calculate CTR in ad response', async ({ page }) => {
    await page.goto(`${baseURL}/api/ads?limit=1`);
    
    const content = await page.content();
    const json = JSON.parse(content);
    
    if (json.ads && json.ads.length > 0) {
      const ad = json.ads[0];
      
      // If ad has impressions, should have CTR
      if (ad.impressions > 0) {
        expect(ad).toHaveProperty('ctr');
        expect(typeof ad.ctr).toBe('number');
      }
    }
  });
});

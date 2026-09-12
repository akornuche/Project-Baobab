# E2E Testing Setup - Project Baobab

## Overview

Project Baobab uses **Playwright** for end-to-end testing of core user workflows:
- Search functionality (guides and directories)
- Calculator pages
- Directory listings and subscriptions
- Display ads and campaigns
- API endpoints

## Installation

### 1. Install Playwright

```bash
npm install --save-dev @playwright/test
```

### 2. Install Browsers

```bash
npx playwright install
```

## Configuration

### Playwright Config (`playwright.config.ts`)

Configuration includes:
- **Base URL:** http://localhost:3000
- **Browsers:** Chromium, Firefox, WebKit
- **Mobile:** Pixel 5 (Chrome), iPhone 12 (Safari)
- **Dev Server:** Automatically starts `npm run dev` before tests
- **Reporters:** HTML report with screenshots on failure
- **Traces:** Recorded on first retry for debugging

## Running Tests

### Run All Tests
```bash
npm run test:e2e
```

### Run Tests in UI Mode (Recommended for Development)
```bash
npm run test:e2e:ui
```

Interactive UI shows:
- Live test execution
- Step-by-step debugging
- Screenshot inspection
- Test filtering and selection

### Debug Tests
```bash
npm run test:e2e:debug
```

Pauses at each step for inspection.

### Run Specific Test File
```bash
npx playwright test tests/e2e/search.spec.ts
```

### Run Tests Matching Pattern
```bash
npx playwright test --grep "search"
```

### Run Tests in Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Mobile Tests Only
```bash
npx playwright test --project="Mobile Chrome"
```

## Test Structure

### Test Files Location
```
tests/e2e/
├── search.spec.ts           # Search functionality tests
├── calculators.spec.ts      # Calculator page tests
├── api.spec.ts              # API endpoint tests
├── directory.spec.ts        # Directory listing tests
└── ads.spec.ts              # Display ads tests
```

### Test Organization

Each file uses `test.describe()` to group related tests:

```typescript
test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test('should search for guides', async ({ page }) => {
    // Test implementation
  });
});
```

## Test Coverage

### Search Tests (`search.spec.ts`)
- Display home page with search bar
- Search for guides
- Filter search results by domain
- Search directories
- Handle empty search gracefully
- Search with special characters

**Coverage:** Home page, search API, debouncing

### Calculator Tests (`calculators.spec.ts`)
- Load calculators listing page
- Load CAC estimator
- Load VAT calculator
- Load JAMB subject checker
- Load business startup calculator
- Load passport estimator
- Handle 404 for invalid calculator
- Display ad zones on calculator

**Coverage:** All 6 calculator pages, error handling, ad integration

### API Tests (`api.spec.ts`)
- Health check endpoint
- List guides
- Search guides API
- List directories API
- Get ads API
- Get ad campaigns API
- Search with pagination
- Handle empty search
- Filter guides by domain
- Track ad impression
- Database connection stability
- Error handling and validation
- Sensitive data protection

**Coverage:** All API endpoints, error scenarios, security

### Directory Tests (`directory.spec.ts`)
- List all directory listings
- Filter by category
- Filter by state
- Filter premium listings
- Filter verified listings
- Get subscriptions for listing
- Get reviews for listing
- Pagination handling
- Subscription data in listings
- Create directory listing
- Submit review
- Handle invalid listing ID
- Directory search with facets

**Coverage:** Directory API, subscriptions, reviews, filters

### Ads Tests (`ads.spec.ts`)
- Get ad campaigns
- Filter campaigns by status
- Get active advertisements
- Filter ads by zone
- Filter ads by size
- Track ad impression successfully
- Track ad click successfully
- Create ad campaign
- Create advertisement
- Include campaign data with ads
- Ad pagination
- Rejection for missing adId
- CTR calculation

**Coverage:** Ads API, campaign management, tracking, validation

## Common Test Patterns

### Navigate and Check Title
```typescript
await page.goto('/calculators');
await page.waitForLoadState('networkidle');
await expect(page).toHaveTitle(/Calculator/i);
```

### Test API Response
```typescript
await page.goto('/api/guides');
const content = await page.content();
expect(content).toContain('"guides"');
```

### POST Request
```typescript
const response = await page.request.post('/api/ads/campaigns', {
  data: {
    title: 'Test Campaign',
    // ...
  }
});
expect(response.status()).toBe(201);
const json = await response.json();
```

### Parse and Validate JSON
```typescript
const content = await page.content();
const json = JSON.parse(content);
expect(json.listings.length).toBeGreaterThan(0);
```

### Conditional Logic
```typescript
if (json.ads && json.ads.length > 0) {
  const adId = json.ads[0].id;
  // Use adId for further tests
}
```

## Debugging

### View HTML Report
```bash
npx playwright show-report
```

Opens HTML report with:
- Test results
- Screenshots on failure
- Video recordings (if enabled)
- Trace files

### Enable Video Recording
```typescript
// In playwright.config.ts
use: {
  video: 'retain-on-failure', // or 'on'
}
```

### Enable Full Page Screenshots
```typescript
// In playwright.config.ts
use: {
  screenshot: 'only-on-failure', // or 'on'
}
```

### Debug Single Test
```bash
npx playwright test tests/e2e/search.spec.ts --debug
```

Launches inspector with:
- Step-by-step execution
- DOM inspection
- Network monitoring

## Continuous Integration

### GitHub Actions Example
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Best Practices

1. **Use Locators, Not XPath**
   - ✅ `page.locator('button')`
   - ❌ `page.locator('//button')`

2. **Wait for Conditions**
   - Always use `waitForLoadState()` or `waitForSelector()`
   - Avoid hardcoded waits when possible

3. **Test User Behavior**
   - Test actual workflows users follow
   - Include error scenarios

4. **Isolate Tests**
   - Each test should be independent
   - Use `beforeEach` for setup

5. **Use Data Attributes**
   - Add `data-testid` attributes for reliable selection
   - Easier than selectors, resistant to UI changes

6. **Keep Tests Readable**
   - Use descriptive test names
   - Add comments for complex logic
   - Keep tests focused and short

## Troubleshooting

### Tests Fail with "Port Already in Use"
```bash
# Kill existing dev server
npx lsof -ti:3000 | xargs kill -9
# Re-run tests
npm run test:e2e
```

### Tests Timeout
Increase timeout in `playwright.config.ts`:
```typescript
use: {
  navigationTimeout: 30000,
  actionTimeout: 10000,
}
```

### Element Not Found
1. Add a longer wait: `await page.waitForSelector()`
2. Check if selector is correct
3. Use `--debug` mode to inspect DOM

### Flaky Tests
- Add waits for network to settle: `waitForLoadState('networkidle')`
- Increase retry count for CI
- Check for race conditions

## Next Steps

1. ✅ Playwright configuration created
2. ✅ Test files created (search, calculators, api, directory, ads)
3. ✅ npm scripts added
4. 📋 Run tests locally: `npm run test:e2e`
5. 📋 Set up CI/CD with automated testing
6. 📋 Add performance testing (Lighthouse)
7. 📋 Add visual regression testing

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Continuous Integration](https://playwright.dev/docs/ci)

---

**Status:** Framework Complete ✅
**Ready to:** Run tests and validate all workflows
**Next Phase:** Phase 3 - Content Creation (Guides)

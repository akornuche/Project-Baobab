import { GET, POST } from './route';

describe('Guides API', () => {
  test('GET should return guides', async () => {
    const request = new Request('http://localhost:3000/api/guides');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.guides).toBeDefined();
    expect(Array.isArray(data.guides)).toBe(true);
  });

  test('POST should create a new guide', async () => {
    const request = new Request('http://localhost:3000/api/guides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Guide',
        slug: 'test-guide',
        domainId: 'test-domain',
        subdomainId: 'test-subdomain',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.guide).toBeDefined();
    expect(data.guide.title).toBe('Test Guide');
  });

  test('POST should return error for missing required fields', async () => {
    const request = new Request('http://localhost:3000/api/guides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Guide',
        // Missing slug, domainId, subdomainId
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });
});
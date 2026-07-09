import { calculate } from './cac-estimator';

describe('CAC Estimator Calculator', () => {
  test('should calculate Business Name registration cost correctly', async () => {
    const result = await calculate({
      entity_type: 'business_name',
      share_capital: 0,
      use_agent: false,
      state: 'lagos',
    });

    expect(result.total).toBe(50000);
    expect(result.breakdown).toBeDefined();
    expect(result.breakdown['CAC Registration Fee']).toBe(50000);
    expect(result.time).toBeDefined();
  });

  test('should calculate Limited Company registration cost correctly', async () => {
    const result = await calculate({
      entity_type: 'limited_company',
      share_capital: 100000,
      use_agent: false,
      state: 'lagos',
    });

    expect(result.total).toBe(15000); // Base fee + stamp duties
    expect(result.breakdown).toBeDefined();
  });

  test('should add professional fee when agent is used', async () => {
    const result = await calculate({
      entity_type: 'business_name',
      share_capital: 0,
      use_agent: true,
      state: 'lagos',
    });

    expect(result.total).toBe(100000); // 50000 + 50000 professional fee
  });

  test('should calculate share capital surcharge correctly', async () => {
    const result = await calculate({
      entity_type: 'limited_company',
      share_capital: 500000,
      use_agent: false,
      state: 'lagos',
    });

    expect(result.total).toBeGreaterThan(15000); // Should include surcharge
  });
});
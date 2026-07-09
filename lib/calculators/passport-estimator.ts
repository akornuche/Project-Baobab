import { CalculatorResult } from '@/lib/types';

interface PassportInput {
  passport_type: string;
  state: string;
  expedited: boolean;
}

// Passport fees (2026)
const PASSPORT_FEES = {
  '24_pages': 10000,
  '48_pages': 15000,
  '64_pages': 20000,
};

// Processing times (days)
const PROCESSING_TIMES = {
  '24_pages': { standard: 7, expedited: 3 },
  '48_pages': { standard: 7, expedited: 3 },
  '64_pages': { standard: 7, expedited: 3 },
};

export async function calculate(inputs: PassportInput): Promise<CalculatorResult> {
  const { passport_type, expedited } = inputs;

  const baseFee = PASSPORT_FEES[passport_type as keyof typeof PASSPORT_FEES] || PASSPORT_FEES['24_pages'];
  const times = PROCESSING_TIMES[passport_type as keyof typeof PASSPORT_TIMES];

  const time = expedited ? `${times.expedited} days` : `${times.standard} days`;

  return {
    total: baseFee,
    breakdown: {
      'Passport Fee': baseFee,
    },
    time: time,
    disclaimer: 'Fees and processing times may vary by state. Verify with NIS before application.',
  };
}
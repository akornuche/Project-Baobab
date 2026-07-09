import { CalculatorResult } from '@/lib/types';

interface CACInput {
  entity_type: string;
  share_capital: number;
  use_agent: boolean;
  state: string;
}

interface CACFee {
  base_fee: number;
  share_capital_surcharge: number;
}

// CAC fee schedule (2026)
const CAC_FEES: Record<string, CACFee> = {
  business_name: {
    base_fee: 50000, // Includes VAT
    share_capital_surcharge: 0,
  },
  limited_company: {
    base_fee: 10000, // For up to ₦100,000 share capital
    share_capital_surcharge: 0,
  },
  limited_partnership: {
    base_fee: 15000,
    share_capital_surcharge: 0,
  },
};

// Share capital surcharge brackets for Ltd Company
const SHARE_CAPITAL_SURCHARGES: { max: number; surcharge: number }[] = [
  { max: 100000, surcharge: 0 },
  { max: 500000, surcharge: 5000 },
  { max: 1000000, surcharge: 10000 },
  { max: 5000000, surcharge: 25000 },
  { max: 10000000, surcharge: 50000 },
  { max: 50000000, surcharge: 100000 },
  { max: Infinity, surcharge: 250000 },
];

// Estimated processing times (days)
const PROCESSING_TIMES = {
  business_name: {
    standard: { min: 3, max: 7 },
    expedited: { min: 1, max: 2 },
  },
  limited_company: {
    standard: { min: 5, max: 10 },
    expedited: { min: 2, max: 4 },
  },
  limited_partnership: {
    standard: { min: 7, max: 14 },
    expedited: { min: 3, max: 7 },
  },
};

export async function calculate(inputs: CACInput): Promise<CalculatorResult> {
  const { entity_type, share_capital, use_agent, state } = inputs;

  // Calculate fees
  let cacFee = CAC_FEES[entity_type];
  if (!cacFee) {
    cacFee = CAC_FEES.business_name; // Default to business name
  }

  // Add share capital surcharge for Ltd Company
  let totalCacFee = cacFee.base_fee;
  if (entity_type === 'limited_company' && share_capital > 100000) {
    const surcharge = SHARE_CAPITAL_SURCHARGES.find(
      (s) => share_capital <= s.max
    )?.surcharge;
    if (surcharge) {
      totalCacFee += surcharge;
    }
  }

  // Add professional fee if using agent
  let professionalFee = 0;
  if (use_agent) {
    professionalFee = 50000; // Average professional fee
  }

  // Add stamp duties (varies by state)
  const stampDuties = 5000; // Base stamp duties

  // Total cost
  const totalCost = totalCacFee + professionalFee + stampDuties;

  // Time estimate
  const timeConfig = PROCESSING_TIMES[entity_type] || PROCESSING_TIMES.business_name;
  const timeRange = `${timeConfig.standard.min}-${timeConfig.standard.max} days`;

  return {
    total: totalCost,
    breakdown: {
      'CAC Registration Fee': totalCacFee,
      'Professional Fee (Agent)': professionalFee,
      'Stamp Duties': stampDuties,
    },
    time: timeRange,
    disclaimer: 'Estimates based on current public fees (2026). Verify with CAC before payment.',
    details: {
      entity_type,
      share_capital,
      use_agent,
      state,
      cac_fee: totalCacFee,
      professional_fee: professionalFee,
      stamp_duties: stampDuties,
    },
  };
}
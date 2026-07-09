import { CalculatorResult } from '@/lib/types';

interface BusinessStartupInput {
  entity_type: string;
  share_capital: number;
  use_agent: boolean;
  state: string;
  need_vat: boolean;
  need_paye: boolean;
  need_tin: boolean;
}

// Estimated fees (2026)
const CAC_FEES = {
  business_name: 50000,
  limited_company_100k: 10000,
  limited_company_above_100k: 15000,
};

const OTHER_FEES = {
  vat_registration: 10000,
  paye_registration: 5000,
  tin: 0,
  bank_account: 50000,
};

export async function calculate(inputs: BusinessStartupInput): Promise<CalculatorResult> {
  const { entity_type, share_capital, use_agent, need_vat, need_paye, need_tin } = inputs;

  let cacFee = 0;
  let professionalFee = use_agent ? 50000 : 0;
  let otherFees = 0;

  // Calculate CAC fee
  if (entity_type === 'business_name') {
    cacFee = CAC_FEES.business_name;
  } else if (entity_type === 'limited_company') {
    if (share_capital <= 100000) {
      cacFee = CAC_FEES.limited_company_100k;
    } else {
      cacFee = CAC_FEES.limited_company_above_100k;
    }
  }

  // Add other fees
  if (need_vat) otherFees += OTHER_FEES.vat_registration;
  if (need_paye) otherFees += OTHER_FEES.paye_registration;
  if (need_tin) otherFees += OTHER_FEES.tin;
  otherFees += OTHER_FEES.bank_account; // Assume everyone needs a bank account

  const totalCost = cacFee + professionalFee + otherFees;

  return {
    total: totalCost,
    breakdown: {
      'CAC Registration': cacFee,
      'Professional Fee (Agent)': professionalFee,
      'VAT Registration': need_vat ? OTHER_FEES.vat_registration : 0,
      'PAYE Registration': need_paye ? OTHER_FEES.paye_registration : 0,
      'TIN Registration': need_tin ? OTHER_FEES.tin : 0,
      'Bank Account Opening': OTHER_FEES.bank_account,
    },
    time: '14-30 days',
    disclaimer: 'Estimates based on current public fees (2026). Professional fees may vary.',
  };
}
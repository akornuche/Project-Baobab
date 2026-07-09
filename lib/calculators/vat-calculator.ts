import { CalculatorResult } from '@/lib/types';

interface VATInput {
  amount: number;
}

export async function calculate(inputs: VATInput): Promise<CalculatorResult> {
  const { amount } = inputs;

  // Nigeria VAT rate (2026): 7.5%
  const VAT_RATE = 0.075;
  const vatAmount = amount * VAT_RATE;
  const totalAmount = amount + vatAmount;

  return {
    total: totalAmount,
    breakdown: {
      'Original Amount': amount,
      'VAT (7.5%)': vatAmount,
    },
    disclaimer: 'VAT rate is 7.5% as of 2026. Verify with FIRS before payment.',
  };
}
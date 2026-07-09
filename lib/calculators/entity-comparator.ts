import { CalculatorResult } from '@/lib/types';

interface EntityComparisonInput {
  business_type: string;
  number_of_owners: number;
  investment_amount: number;
  liability_protection: boolean;
}

export async function calculate(inputs: EntityComparisonInput): Promise<CalculatorResult> {
  const { business_type, number_of_owners, investment_amount, liability_protection } = inputs;

  // Compare Business Name vs Limited Company
  const businessNamePros = [
    'Simple and quick to register (3-7 days)',
    'Lower registration cost (~₦50,000)',
    'Minimal paperwork and compliance',
    'Ideal for small businesses',
  ];

  const businessNameCons = [
    'Unlimited personal liability',
    'Cannot raise equity easily',
    'Perceives as smaller business',
    'Limited expansion potential',
  ];

  const limitedCompanyPros = [
    'Limited liability protection',
    'Easier to raise equity investment',
    'Professional corporate image',
    'Better for scaling and expansion',
    'Perpetual existence',
  ];

  const limitedCompanyCons = [
    'Higher registration cost (~₦100,000+)',
    'More complex compliance requirements',
    'Annual filings and audits',
    ' Longer registration process (14-30 days)',
  ];

  // Determine recommendation based on inputs
  let recommendation = 'Business Name';
  let confidence = 'Medium';

  if (investment_amount > 500000 || number_of_owners > 2 || liability_protection) {
    recommendation = 'Limited Company';
    confidence = 'High';
  } else if (investment_amount < 100000 && number_of_owners === 1 && !liability_protection) {
    recommendation = 'Business Name';
    confidence = 'High';
  }

  // Cost comparison
  const businessNameCost = 50000;
  const limitedCompanyCost = 100000;

  // Timeline comparison
  const businessNameTimeline = '3-7 days';
  const limitedCompanyTimeline = '14-30 days';

  return {
    total: 0, // No cost for comparison
    recommendation: {
      entity_type: recommendation,
      confidence,
      reasoning: `Based on your investment of ₦${investment_amount.toLocaleString()}, ${number_of_owners} owner(s), and ${liability_protection ? 'need for' : 'no need for'} liability protection`,
    },
    breakdown: {
      'Business Name Cost': `₦${businessNameCost.toLocaleString()}`,
      'Limited Company Cost': `₦${limitedCompanyCost.toLocaleString()}`,
      'Business Name Timeline': businessNameTimeline,
      'Limited Company Timeline': limitedCompanyTimeline,
    },
    pros_cons: {
      business_name: { pros: businessNamePros, cons: businessNameCons },
      limited_company: { pros: limitedCompanyPros, cons: limitedCompanyCons },
    },
    disclaimer: 'This is a general comparison. Consult with a legal advisor for your specific situation.',
  };
}
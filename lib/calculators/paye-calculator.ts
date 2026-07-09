import { CalculatorResult } from '@/lib/types';

interface PAYEInput {
  monthly_salary: number;
  number_of_employees: number;
  pension_contribution: boolean;
}

// PAYE tax brackets (2026)
const TAX_BRACKETS = [
  { max: 300000, rate: 0.07 },
  { max: 600000, rate: 0.11 },
  { max: 1100000, rate: 0.15 },
  { max: 2000000, rate: 0.19 },
  { max: 3200000, rate: 0.21 },
  { max: 6000000, rate: 0.24 },
  { max: Infinity, rate: 0.24 },
];

export async function calculate(inputs: PAYEInput): Promise<CalculatorResult> {
  const { monthly_salary, number_of_employees, pension_contribution } = inputs;

  const annual_salary = monthly_salary * 12;
  const total_annual_salary = annual_salary * number_of_employees;

  // Calculate PAYE (Progressive tax)
  let annual_paye = 0;
  let previous_max = 0;

  for (const bracket of TAX_BRACKETS) {
    if (annual_salary <= bracket.max) {
      const taxable_income = annual_salary - previous_max;
      annual_paye += taxable_income * bracket.rate;
      break;
    } else {
      const taxable_income = bracket.max - previous_max;
      annual_paye += taxable_income * bracket.rate;
    }
    previous_max = bracket.max;
  }

  const monthly_paye = annual_paye / 12;
  const total_monthly_paye = monthly_paye * number_of_employees;

  // Calculate NHF (2.5% of gross salary)
  const nfh_rate = 0.025;
  const monthly_nhf = monthly_salary * nfh_rate * number_of_employees;

  // Calculate HIT (1% of gross salary)
  const hit_rate = 0.01;
  const monthly_hit = monthly_salary * hit_rate * number_of_employees;

  // Calculate Pension (8% of gross salary - employee contribution)
  let monthly_pension = 0;
  let employer_pension = 0;

  if (pension_contribution) {
    const pension_rate = 0.08;
    monthly_pension = monthly_salary * pension_rate * number_of_employees;
    employer_pension = monthly_salary * 0.10 * number_of_employees; // Employer contribution (10%)
  }

  // Net pay calculation
  const monthly_net_pay = monthly_salary - monthly_paye - monthly_nhf - monthly_hit - (pension_contribution ? monthly_pension : 0);
  const total_monthly_net_pay = monthly_net_pay * number_of_employees;

  // Breakdown
  const breakdown = {
    'Gross Salary': `₦${monthly_salary.toLocaleString()}`,
    'PAYE (Monthly)': `₦${monthly_paye.toLocaleString()}`,
    'NHF (Monthly)': `₦${monthly_nhf.toLocaleString()}`,
    'HIT (Monthly)': `₦${monthly_hit.toLocaleString()}`,
    'Pension (Employee)': pension_contribution ? `₦${monthly_pension.toLocaleString()}` : 'N/A',
    'Pension (Employer)': pension_contribution ? `₦${employer_pension.toLocaleString()}` : 'N/A',
    'Net Pay': `₦${monthly_net_pay.toLocaleString()}`,
  };

  return {
    total: total_monthly_net_pay,
    breakdown,
    time: 'Immediate',
    disclaimer: 'Tax rates and calculations are estimates. Consult with a tax professional for accurate compliance.',
  };
}
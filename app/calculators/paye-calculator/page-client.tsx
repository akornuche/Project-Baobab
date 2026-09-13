'use client';

import { Calculator } from '@/components/Calculator/Calculator';
import { CalculatorResult } from '@/lib/types';

export default function PAYECalculatorPage() {
  const inputs = {
    title: 'PAYE/Payroll Tax Estimator',
    fields: [
      {
        key: 'monthly_salary',
        label: 'Monthly Salary (₦)',
        type: 'number',
        required: true,
        min: 0,
        step: 1000,
        hint: 'Enter gross monthly salary',
      },
      {
        key: 'number_of_employees',
        label: 'Number of Employees',
        type: 'number',
        required: true,
        min: 1,
        max: 1000,
        step: 1,
        hint: 'Total number of employees',
      },
      {
        key: 'pension_contribution',
        label: 'Include Pension Contributions?',
        type: 'boolean',
        required: false,
      },
    ],
  };

  const handleResult = (result: CalculatorResult) => {
    console.log('PAYE Calculation Result:', result);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">PAYE/Payroll Tax Estimator</h1>
      <Calculator inputs={inputs} logic="paye-calculator" onResult={handleResult} />
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">What happens next?</h3>
        <p className="text-sm text-gray-600">
          Once you've calculated your payroll costs, you can proceed with payroll processing.
          Check our guide on <a href="/guides/payroll-processing" className="text-blue-600 hover:underline">Payroll Processing</a> for complete steps.
        </p>
      </div>
    </div>
  );
}

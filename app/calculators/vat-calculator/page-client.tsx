'use client';

import { Calculator } from '@/components/Calculator/Calculator';
import { CalculatorResult } from '@/lib/types';

export default function VATCalculatorPage() {
  const inputs = {
    title: 'VAT Calculator',
    fields: [
      {
        key: 'amount',
        label: 'Sale Amount (₦)',
        type: 'number',
        required: true,
        min: 0,
        step: 1000,
        hint: 'Enter the amount before VAT',
      },
    ],
  };

  const handleResult = (result: CalculatorResult) => {
    console.log('VAT Calculation Result:', result);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">VAT Calculator</h1>
      <Calculator inputs={inputs} logic="vat-calculator" onResult={handleResult} />
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Understanding VAT in Nigeria</h3>
        <p className="text-sm text-gray-600">
          Value Added Tax (VAT) is 7.5% of the sale amount. This is collected by the seller and remitted to the Federal Inland Revenue Service (FIRS).
        </p>
      </div>
    </div>
  );
}

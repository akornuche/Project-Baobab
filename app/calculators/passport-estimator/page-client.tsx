'use client';

import { Calculator } from '@/components/Calculator/Calculator';
import { CalculatorResult } from '@/lib/types';

export default function PassportEstimatorPage() {
  const inputs = {
    title: 'Passport Cost & Processing Time Estimator',
    fields: [
      {
        key: 'passport_type',
        label: 'Passport Type',
        type: 'select',
        required: true,
        options: [
          { value: '24_pages', label: '24 Pages (Standard)' },
          { value: '48_pages', label: '48 Pages (Extended)' },
          { value: '64_pages', label: '64 Pages (Maximum)' },
        ],
      },
      {
        key: 'state',
        label: 'State of Application',
        type: 'select',
        required: true,
        options: [
          { value: 'abuja', label: 'Abuja (FCT)' },
          { value: 'lagos', label: 'Lagos' },
          { value: 'kano', label: 'Kano' },
          { value: 'other', label: 'Other State' },
        ],
      },
      {
        key: 'expedited',
        label: 'Expedited Processing',
        type: 'boolean',
        required: false,
      },
    ],
  };

  const handleResult = (result: CalculatorResult) => {
    console.log('Passport Estimate Result:', result);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Passport Cost & Processing Time Estimator</h1>
      <Calculator inputs={inputs} logic="passport-estimator" onResult={handleResult} />
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">What happens next?</h3>
        <p className="text-sm text-gray-600">
          Once you've estimated your costs, you can proceed to apply for your passport. Check our guide on 
          <a href="/guides/passport-application" className="text-blue-600 hover:underline"> How to Apply for a Nigerian International Passport</a>
          for step-by-step instructions.
        </p>
      </div>
    </div>
  );
}

'use client';

import { Calculator } from '@/components/Calculator/Calculator';
import { CalculatorResult } from '@/lib/types';

export default function EntityComparatorPage() {
  const inputs = {
    title: 'Business Name vs Limited Company Comparator',
    fields: [
      {
        key: 'business_type',
        label: 'Business Type',
        type: 'select',
        required: true,
        options: [
          { value: 'small_business', label: 'Small Business (₦0-500k)' },
          { value: 'medium_business', label: 'Medium Business (₦500k-5M)' },
          { value: 'large_business', label: 'Large Business (₦5M+)' },
        ],
      },
      {
        key: 'number_of_owners',
        label: 'Number of Owners',
        type: 'number',
        required: true,
        min: 1,
        max: 10,
        step: 1,
        hint: 'How many people will own the business?',
      },
      {
        key: 'investment_amount',
        label: 'Initial Investment (₦)',
        type: 'number',
        required: true,
        min: 0,
        step: 1000,
        hint: 'How much capital will you invest initially?',
      },
      {
        key: 'liability_protection',
        label: 'Do You Need Limited Liability Protection?',
        type: 'boolean',
        required: false,
      },
    ],
  };

  const handleResult = (result: CalculatorResult) => {
    console.log('Entity Comparison Result:', result);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Business Name vs Limited Company Comparator</h1>
      <Calculator inputs={inputs} logic="entity-comparator" onResult={handleResult} />
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">What should I do next?</h3>
        <p className="text-sm text-gray-600">
          Once you've determined the best entity type for your business, you can proceed with registration.
          Check our <a href="/guides/cac-business-name" className="text-blue-600 hover:underline">Business Name Registration</a> or 
          <a href="/guides/trademark-registration" className="text-blue-600 hover:underline"> Limited Company Registration</a> guides.
        </p>
      </div>
    </div>
  );
}

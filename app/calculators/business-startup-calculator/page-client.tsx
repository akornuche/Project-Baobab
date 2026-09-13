'use client';

import { Calculator } from '@/components/Calculator/Calculator';
import { CalculatorResult } from '@/lib/types';

export default function BusinessStartupCalculatorPage() {
  const inputs = {
    title: 'Business Startup Cost Calculator',
    fields: [
      {
        key: 'entity_type',
        label: 'Entity Type',
        type: 'select',
        required: true,
        options: [
          { value: 'business_name', label: 'Business Name' },
          { value: 'limited_company', label: 'Limited Company' },
        ],
      },
      {
        key: 'share_capital',
        label: 'Share Capital (₦)',
        type: 'number',
        required: true,
        min: 0,
        step: 1000,
        hint: 'Enter the total share capital for Limited Companies',
      },
      {
        key: 'use_agent',
        label: 'Use Accredited Agent',
        type: 'boolean',
        required: false,
      },
      {
        key: 'state',
        label: 'State of Registration',
        type: 'select',
        required: true,
        options: [
          { value: 'abuja', label: 'Abuja (FCT)' },
          { value: 'lagos', label: 'Lagos' },
          { value: 'kano', label: 'Kano' },
          { value: 'ogun', label: 'Ogun' },
          { value: 'other', label: 'Other State' },
        ],
      },
      {
        key: 'need_vat',
        label: 'Need VAT Registration?',
        type: 'boolean',
        required: false,
      },
      {
        key: 'need_paye',
        label: 'Need PAYE Registration?',
        type: 'boolean',
        required: false,
      },
      {
        key: 'need_tin',
        label: 'Need TIN Registration?',
        type: 'boolean',
        required: false,
      },
    ],
  };

  const handleResult = (result: CalculatorResult) => {
    console.log('Business Startup Estimate Result:', result);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Business Startup Cost Calculator</h1>
      <Calculator inputs={inputs} logic="business-startup-calculator" onResult={handleResult} />
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">What happens next?</h3>
        <p className="text-sm text-gray-600">
          Once you've estimated your startup costs, you can proceed to register your business. Check our 
          <a href="/guides/business-startup-checklist" className="text-blue-600 hover:underline"> Business Startup Checklist</a>
          for step-by-step instructions.
        </p>
      </div>
    </div>
  );
}

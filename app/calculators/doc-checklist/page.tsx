'use client';

import { Calculator } from '@/components/Calculator/Calculator';
import { CalculatorResult } from '@/lib/types';

export default function DocChecklistPage() {
  const inputs = {
    title: 'Document Requirements Checklist Generator',
    fields: [
      {
        key: 'process',
        label: 'Process',
        type: 'select',
        required: true,
        options: [
          { value: 'cac_business_name', label: 'CAC Business Name Registration' },
          { value: 'cac_limited_company', label: 'CAC Limited Company Registration' },
          { value: 'tin_registration', label: 'TIN Registration' },
          { value: 'bank_account', label: 'Business Bank Account' },
          { value: 'vat_registration', label: 'VAT Registration' },
        ],
      },
      {
        key: 'entity_type',
        label: 'Entity Type',
        type: 'select',
        required: true,
        options: [
          { value: 'individual', label: 'Individual/Sole Proprietor' },
          { value: 'company', label: 'Company' },
        ],
      },
      {
        key: 'is_foreigner',
        label: 'Are You a Foreigner?',
        type: 'boolean',
        required: false,
      },
    ],
  };

  const handleResult = (result: CalculatorResult) => {
    console.log('Document Checklist Result:', result);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Document Requirements Checklist Generator</h1>
      <Calculator inputs={inputs} logic="doc-checklist" onResult={handleResult} />
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Need help gathering these documents?</h3>
        <p className="text-sm text-gray-600">
          Check our guides on <a href="/guides/nin-registration" className="text-blue-600 hover:underline">NIN Registration</a>, 
          <a href="/guides/cac-business-name" className="text-blue-600 hover:underline">CAC Registration</a>, and 
          <a href="/guides/tin-registration" className="text-blue-600 hover:underline">TIN Registration</a>.
        </p>
      </div>
    </div>
  );
}
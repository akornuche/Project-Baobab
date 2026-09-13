'use client';

import { Calculator } from '@/components/Calculator/Calculator';
import { CalculatorResult } from '@/lib/types';

export default function JAMBSubjectCheckerPage() {
  const inputs = {
    title: 'JAMB Subject Combination Checker',
    fields: [
      {
        key: 'course',
        label: 'Desired Course of Study',
        type: 'select',
        required: true,
        options: [
          { value: 'medicine', label: 'Medicine and Surgery' },
          { value: 'engineering', label: 'Engineering' },
          { value: 'law', label: 'Law' },
          { value: 'accounting', label: 'Accounting' },
          { value: 'computer_science', label: 'Computer Science' },
          { value: 'economics', label: 'Economics' },
          { value: 'mass_communication', label: 'Mass Communication' },
          { value: 'nursing', label: 'Nursing' },
          { value: 'pharmacy', label: 'Pharmacy' },
          { value: 'other', label: 'Other Course' },
        ],
      },
    ],
  };

  const handleResult = (result: CalculatorResult) => {
    console.log('JAMB Subject Result:', result);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">JAMB Subject Combination Checker</h1>
      <Calculator inputs={inputs} logic="jamb-subject-checker" onResult={handleResult} />
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Understanding JAMB Subject Requirements</h3>
        <p className="text-sm text-gray-600">
          JAMB requires you to register for specific subjects based on your desired course. English Language is compulsory for all courses.
        </p>
      </div>
    </div>
  );
}

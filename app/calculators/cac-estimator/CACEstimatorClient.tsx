'use client';

import { Calculator } from '@/components/Calculator/Calculator';
import { CalculatorResult } from '@/lib/types';
import { CalculatorToolSchema } from '@/components/SEO/CalculatorSchema';
import { OptimizedImage } from '@/components/SEO/OptimizedImage';
import { getCalculatorImageAlt } from '@/lib/alt-text-manager';

export default function CACEstimatorClient() {
  const inputs = {
    title: 'CAC Registration Cost & Time Estimator',
    fields: [
      {
        key: 'entity_type',
        label: 'Entity Type',
        type: 'select',
        required: true,
        options: [
          { value: 'business_name', label: 'Business Name' },
          { value: 'limited_company', label: 'Limited Company' },
          { value: 'limited_partnership', label: 'Limited Partnership' },
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
    ],
  };

  const handleResult = (result: CalculatorResult) => {
    console.log('CAC Estimate Result:', result);
  };

  return (
    <>
      <CalculatorToolSchema
        name="CAC Registration Cost Estimator"
        description="Free calculator to estimate the cost and timeline for CAC business registration"
        url="https://baobab.ng/calculators/cac-estimator"
        category="Financial Calculator"
      />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="mb-6 rounded-lg overflow-hidden">
          <OptimizedImage
            src="https://baobab.ng/og-images/tools.jpg"
            alt={getCalculatorImageAlt('CAC Registration Cost Estimator')}
            width={800}
            height={300}
            priority={true}
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
            caption="CAC Registration Cost Estimator Tool"
          />
        </div>
        <h1 className="text-2xl font-bold mb-6">CAC Registration Cost & Time Estimator</h1>
        <Calculator inputs={inputs} logic="cac-estimator" onResult={handleResult} />
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">What happens next?</h3>
          <p className="text-sm text-gray-600">
            Once you&apos;ve estimated your costs, you can proceed to register your business with CAC.
            Check our guide on{' '}
            <a href="/guides/cac-business-name" className="text-blue-600 hover:underline">
              How to Register a Business Name with CAC
            </a>{' '}
            for step-by-step instructions.
          </p>
        </div>
      </div>
    </>
  );
}

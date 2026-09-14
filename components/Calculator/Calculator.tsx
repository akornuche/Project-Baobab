'use client';

import { useState } from 'react';
import { InputField, CalculatorResult, CalculatorProps } from './types';
import * as cacEstimator from '@/lib/calculators/cac-estimator';
import * as businessStartup from '@/lib/calculators/business-startup-calculator';
import * as passportEstimator from '@/lib/calculators/passport-estimator';
import * as vatCalculator from '@/lib/calculators/vat-calculator';
import * as jambChecker from '@/lib/calculators/jamb-subject-checker';
import * as entityComparator from '@/lib/calculators/entity-comparator';
import * as docChecklist from '@/lib/calculators/doc-checklist';
import * as payeCalculator from '@/lib/calculators/paye-calculator';
import * as invoiceGenerator from '@/lib/calculators/invoice-generator';

// Map of calculator logic names to their implementations
const calculators: Record<string, any> = {
  'cac-estimator': cacEstimator,
  'business-startup-calculator': businessStartup,
  'passport-estimator': passportEstimator,
  'vat-calculator': vatCalculator,
  'jamb-subject-checker': jambChecker,
  'entity-comparator': entityComparator,
  'doc-checklist': docChecklist,
  'paye-calculator': payeCalculator,
  'invoice-generator': invoiceGenerator,
};

export function Calculator({ inputs, logic, onResult }: CalculatorProps) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (key: string, value: any) => {
    setValues(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    inputs.forEach((input: InputField) => {
      if (input.required && (!values[input.key] || values[input.key] === '')) {
        newErrors[input.key] = `${input.label} is required`;
        isValid = false;
      } else if (input.validation && values[input.key]) {
        const validationError = input.validation(values[input.key]);
        if (validationError) {
          newErrors[input.key] = validationError;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleCalculate = async () => {
    if (!validateInputs()) return;

    setIsCalculating(true);
    setResult(null);

    try {
      // Use the direct calculator module based on logic reference
      const calculatorModule = calculators[logic];
      if (!calculatorModule) {
        throw new Error(`Calculator ${logic} not found`);
      }
      
      const calculationResult = await calculatorModule.calculate(values);

      setResult(calculationResult);
      if (onResult) {
        onResult(calculationResult);
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: 'Failed to calculate. Please try again.' });
    } finally {
      setIsCalculating(false);
    }
  };

  const renderInput = (input: InputField) => {
    const commonProps = {
      id: input.key,
      label: input.label,
      value: values[input.key] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        handleInputChange(input.key, e.target.value),
      error: errors[input.key],
      disabled: isCalculating,
      required: input.required,
    };

    switch (input.type) {
      case 'number':
        return (
          <div className="space-y-1">
            <label htmlFor={input.key} className="block text-sm font-medium text-gray-700">
              {input.label}
            </label>
            <input
              type="number"
              id={input.key}
              min={input.min}
              max={input.max}
              step={input.step || 1}
              className={`w-full rounded-md border ${errors[input.key] ? 'border-red-300' : 'border-gray-300'} px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              {...commonProps}
            />
            {input.hint && <p className="text-xs text-gray-500">{input.hint}</p>}
          </div>
        );

      case 'select':
        return (
          <div className="space-y-1">
            <label htmlFor={input.key} className="block text-sm font-medium text-gray-700">
              {input.label}
            </label>
            <select
              id={input.key}
              className={`w-full rounded-md border ${errors[input.key] ? 'border-red-300' : 'border-gray-300'} px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              {...commonProps}
            >
              <option value="">Select...</option>
              {input.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={input.key}
              checked={!!values[input.key]}
              onChange={(e) => handleInputChange(input.key, e.target.checked)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={input.key} className="text-sm font-medium text-gray-700">
              {input.label}
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">{inputs.title || 'Calculator'}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {inputs.fields.map((field: InputField) => (
          <div key={field.key}>{renderInput(field)}</div>
        ))}
      </div>

      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      <button
        onClick={handleCalculate}
        disabled={isCalculating}
        className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
          isCalculating
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isCalculating ? 'Calculating...' : 'Calculate'}
      </button>

      {result && (
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-lg font-semibold mb-4">Results</h4>
          {result.total !== undefined && (
            <div className="mb-4">
              <span className="text-sm text-gray-600">Total</span>
              <p className="text-2xl font-bold text-blue-600">
                {typeof result.total === 'number' ? `₦${result.total.toLocaleString()}` : result.total}
              </p>
            </div>
          )}
          {result.breakdown && (
            <div className="mb-4">
              <h5 className="text-sm font-medium mb-2">Breakdown</h5>
              <ul className="space-y-2">
                {Object.entries(result.breakdown).map(([key, value]) => (
                  <li key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium">
                      {typeof value === 'number' ? `₦${value.toLocaleString()}` : value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.time && (
            <div className="mb-4">
              <span className="text-sm text-gray-600">Estimated Time</span>
              <p className="text-lg font-medium">{result.time}</p>
            </div>
          )}
          {result.disclaimer && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-xs text-yellow-800">{result.disclaimer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
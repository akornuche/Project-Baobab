'use client';

import { Calculator } from '@/components/Calculator/Calculator';
import { CalculatorResult } from '@/lib/types';
import { useState } from 'react';

export default function InvoiceGeneratorPage() {
  const [invoiceData, setInvoiceData] = useState({
    business_name: '',
    client_name: '',
    invoice_number: '',
    date: new Date().toISOString().split('T')[0],
    line_items: [{ description: '', quantity: 1, unit_price: 0, tax_rate: 0.075 }],
  });

  const inputs = {
    title: 'Invoice Generator',
    fields: [
      {
        key: 'business_name',
        label: 'Business Name',
        type: 'text',
        required: true,
        hint: 'Your business name',
      },
      {
        key: 'client_name',
        label: 'Client Name',
        type: 'text',
        required: true,
        hint: 'Client business or individual name',
      },
      {
        key: 'invoice_number',
        label: 'Invoice Number',
        type: 'text',
        required: true,
        hint: 'Unique invoice identifier',
      },
      {
        key: 'date',
        label: 'Invoice Date',
        type: 'date',
        required: true,
      },
    ],
  };

  const handleResult = (result: CalculatorResult) => {
    console.log('Invoice Generation Result:', result);
  };

  const updateLineItem = (index: number, field: string, value: any) => {
    const updatedItems = [...invoiceData.line_items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, line_items: updatedItems });
  };

  const addLineItem = () => {
    setInvoiceData({
      ...invoiceData,
      line_items: [...invoiceData.line_items, { description: '', quantity: 1, unit_price: 0, tax_rate: 0.075 }],
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Invoice Generator</h1>
      <Calculator inputs={inputs} logic="invoice-generator" onResult={handleResult} />
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Need to add line items?</h3>
        <p className="text-sm text-gray-600">
          This is a basic invoice generator. For detailed line items, use a dedicated accounting software.
        </p>
      </div>
    </div>
  );
}
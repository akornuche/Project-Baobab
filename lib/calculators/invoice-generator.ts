import { CalculatorResult } from '@/lib/types';

interface InvoiceInput {
  business_name: string;
  client_name: string;
  invoice_number: string;
  date: string;
  line_items: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    tax_rate: number;
  }>;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  tax_rate: number;
  tax_amount: number;
}

interface InvoiceResult {
  business_name: string;
  client_name: string;
  invoice_number: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  total_tax: number;
  grand_total: number;
}

export async function calculate(inputs: InvoiceInput): Promise<CalculatorResult> {
  const { business_name, client_name, invoice_number, date, line_items } = inputs;

  // Calculate line items
  const items: InvoiceItem[] = line_items.map((item) => {
    const total = item.quantity * item.unit_price;
    const tax_amount = total * item.tax_rate;
    return {
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total,
      tax_rate: item.tax_rate,
      tax_amount,
    };
  });

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const total_tax = items.reduce((sum, item) => sum + item.tax_amount, 0);
  const grand_total = subtotal + total_tax;

  return {
    total: grand_total,
    breakdown: {
      Subtotal: `₦${subtotal.toLocaleString()}`,
      'Total Tax': `₦${total_tax.toLocaleString()}`,
      'Grand Total': `₦${grand_total.toLocaleString()}`,
    },
    disclaimer: 'This is a generated invoice template. Please review before sending to client.',
    invoice: {
      business_name,
      client_name,
      invoice_number,
      date,
      items,
      subtotal,
      total_tax,
      grand_total,
    },
  };
}
export interface InputField {
  key: string;
  label: string;
  type: 'number' | 'select' | 'boolean' | 'text';
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  hint?: string;
  validation?: (value: any) => string | null;
}

export interface CalculatorResult {
  total?: number | string;
  breakdown?: Record<string, number>;
  time?: string;
  disclaimer?: string;
  details?: Record<string, any>;
}

export interface CalculatorProps {
  inputs: {
    title?: string;
    fields: InputField[];
  };
  logic: string;
  onResult?: (result: CalculatorResult) => void;
}
export interface CalculatorResult {
  total?: number | string;
  breakdown?: Record<string, number>;
  time?: string;
  disclaimer?: string;
  details?: Record<string, any>;
}
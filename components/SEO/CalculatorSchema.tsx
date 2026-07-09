/**
 * Calculator-specific structured data for tools and calculators
 */

interface CalculatorProps {
  name: string;
  description: string;
  url: string;
  category?: string;
}

export function CalculatorToolSchema({
  name,
  description,
  url,
  category = 'Calculator',
}: CalculatorProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: category,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NGN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface PriceEstimateProps {
  name: string;
  description: string;
  price: string | number;
  currency?: string;
  pricingModel?: 'free' | 'one-time' | 'subscription' | 'variable';
}

export function PriceEstimateSchema({
  name,
  description,
  price,
  currency = 'NGN',
  pricingModel = 'variable',
}: PriceEstimateProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'PriceSpecification',
    name,
    description,
    priceCurrency: currency,
    price: String(price),
    pricingModel,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface TimeEstimateProps {
  name: string;
  estimatedDays: number;
  estimatedHours?: number;
}

export function TimeEstimateSchema({
  name,
  estimatedDays,
  estimatedHours,
}: TimeEstimateProps) {
  let duration = `P${estimatedDays}D`;
  if (estimatedHours) {
    duration += `T${estimatedHours}H`;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Duration',
    name,
    duration,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

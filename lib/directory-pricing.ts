/**
 * Directory Pricing Configuration
 * Defines pricing tiers and benefits for directory listings
 */

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;  // Price in NGN
  annualPrice: number;   // Price in NGN (discounted)
  benefits: string[];
  displayOrder: number;
}

export interface PricingConfig {
  currency: string;
  freeTrialDays: number;
  tiers: Record<string, PricingTier>;
}

export const DIRECTORY_PRICING: PricingConfig = {
  currency: 'NGN',
  freeTrialDays: 14,  // Free trial period for new listings
  tiers: {
    free: {
      id: 'free',
      name: 'Free',
      description: 'Basic directory listing',
      monthlyPrice: 0,
      annualPrice: 0,
      benefits: [
        'Basic business information',
        'Standard search visibility',
        '1 contact method',
        'Basic metrics (impressions, clicks)',
        'Community reviews',
      ],
      displayOrder: 1,
    },
    basic: {
      id: 'basic',
      name: 'Basic',
      description: 'Enhanced visibility and features',
      monthlyPrice: 5000,  // ~$10-15 USD
      annualPrice: 50000,  // Save 2 months
      benefits: [
        'All Free features',
        'Enhanced search ranking',
        '5 contact methods',
        'Custom business description',
        'Photo gallery (5 images)',
        'Monthly performance reports',
        'Featured badge',
        'Priority support',
      ],
      displayOrder: 2,
    },
    premium: {
      id: 'premium',
      name: 'Premium',
      description: 'Maximum visibility and business tools',
      monthlyPrice: 15000,  // ~$30-40 USD
      annualPrice: 150000,  // Save 2 months
      benefits: [
        'All Basic features',
        'Top search placement',
        'Unlimited contact methods',
        'Business analytics dashboard',
        'Photo gallery (50 images)',
        'Video support',
        'Verified badge',
        'Social media integration',
        'Appointment booking widget',
        'Email lead notifications',
        'Premium support (24/7)',
        'Featured listing (homepage)',
      ],
      displayOrder: 3,
    },
    enterprise: {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Dedicated support and advanced features',
      monthlyPrice: 50000,  // ~$100+ USD
      annualPrice: 500000,  // Save 2 months
      benefits: [
        'All Premium features',
        'Guaranteed top placement',
        'Dedicated account manager',
        'Custom branding',
        'API access',
        'Lead scoring and automation',
        'Multi-user team access',
        'Custom integrations',
        'White-label options',
        'Advanced analytics',
        'Priority feature requests',
        '24/7 phone support',
      ],
      displayOrder: 4,
    },
  },
};

/**
 * Get pricing for a specific tier
 */
export function getTierPricing(tierId: string, billingPeriod: 'monthly' | 'annual' = 'monthly') {
  const tier = DIRECTORY_PRICING.tiers[tierId];
  if (!tier) {
    return null;
  }

  const price = billingPeriod === 'annual' ? tier.annualPrice : tier.monthlyPrice;
  const durationMonths = billingPeriod === 'annual' ? 12 : 1;
  const effectiveMonthlyPrice = price / durationMonths;

  return {
    tier,
    price,
    billingPeriod,
    durationMonths,
    effectiveMonthlyPrice,
    currency: DIRECTORY_PRICING.currency,
  };
}

/**
 * Compare pricing tiers
 */
export function compareTiers() {
  return Object.values(DIRECTORY_PRICING.tiers).sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
}

/**
 * Calculate subscription end date based on start date and billing period
 */
export function calculateSubscriptionEndDate(
  startDate: Date,
  billingPeriod: 'monthly' | 'annual' = 'monthly'
): Date {
  const endDate = new Date(startDate);
  
  if (billingPeriod === 'annual') {
    endDate.setFullYear(endDate.getFullYear() + 1);
  } else {
    endDate.setMonth(endDate.getMonth() + 1);
  }
  
  return endDate;
}

/**
 * Check if a subscription is active
 */
export function isSubscriptionActive(startDate: Date, endDate: Date): boolean {
  const now = new Date();
  return now >= startDate && now <= endDate;
}

/**
 * Get days remaining in subscription
 */
export function getDaysRemaining(endDate: Date): number {
  const now = new Date();
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string = 'NGN'): string {
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString('en-NG')}`;
  }
  return `${amount.toLocaleString('en-US')} ${currency}`;
}

/**
 * Calculate subscription cost with discount
 */
export function calculateSubscriptionCost(
  tierId: string,
  billingPeriod: 'monthly' | 'annual' = 'monthly',
  discountPercentage: number = 0
) {
  const pricing = getTierPricing(tierId, billingPeriod);
  if (!pricing) {
    return null;
  }

  const discount = (pricing.price * discountPercentage) / 100;
  const total = pricing.price - discount;

  return {
    ...pricing,
    originalPrice: pricing.price,
    discountPercentage,
    discountAmount: discount,
    finalPrice: total,
  };
}

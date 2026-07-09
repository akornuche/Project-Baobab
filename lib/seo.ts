/**
 * SEO Configuration and Utilities
 * Central place for all SEO settings and helper functions
 */

export const SITE_CONFIG = {
  name: 'Baobab',
  title: 'Baobab - Get Things Done in Nigeria',
  description: 'Step-by-step guides, interactive tools, and verified professionals to help Nigerians accomplish administrative, business, and life tasks.',
  url: 'https://baobab.ng',
  image: 'https://baobab.ng/og-images/baobab-default.jpg',
  locale: 'en_NG',
  type: 'website',
  twitter: '@baobab_ng',
  email: 'hello@baobab.ng',
};

export const DOMAINS = {
  government: {
    slug: 'government',
    name: 'Government',
    description: 'Government services, business registration, identity documents, and compliance',
    color: '#dc2626',
  },
  business: {
    slug: 'business',
    name: 'Business',
    description: 'Starting a business, registration, funding, tax compliance, and HR management',
    color: '#2563eb',
  },
  education: {
    slug: 'education',
    name: 'Education',
    description: 'Exams, admissions, scholarships, and academic registrations',
    color: '#059669',
  },
};

export const CALCULATORS = [
  {
    slug: 'cac-estimator',
    name: 'CAC Registration Cost Estimator',
    description: 'Calculate the cost and time to register your business with CAC',
  },
  {
    slug: 'business-startup-calculator',
    name: 'Business Startup Cost Calculator',
    description: 'Estimate total startup costs including CAC, TIN, bank, and VAT',
  },
  {
    slug: 'passport-estimator',
    name: 'Passport Cost Estimator',
    description: 'Estimate passport application cost and processing time',
  },
  {
    slug: 'vat-calculator',
    name: 'VAT Calculator',
    description: 'Calculate VAT on sales at 7.5% rate',
  },
  {
    slug: 'jamb-subject-checker',
    name: 'JAMB Subject Checker',
    description: 'Find required subjects for your desired course',
  },
  {
    slug: 'entity-comparator',
    name: 'Business Structure Comparator',
    description: 'Compare Business Name vs Limited Company',
  },
  {
    slug: 'doc-checklist',
    name: 'Document Requirements Checker',
    description: 'Get required documents checklist for any process',
  },
  {
    slug: 'paye-calculator',
    name: 'PAYE & Payroll Calculator',
    description: 'Calculate employee salaries and tax deductions',
  },
  {
    slug: 'invoice-generator',
    name: 'Invoice Generator',
    description: 'Generate professional invoices',
  },
];

/**
 * Generate JSON-LD structured data for HowTo schema
 */
export function generateHowToSchema(
  guide: any
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description || guide.subtitle,
    image: `${SITE_CONFIG.url}/og-images/${guide.domain.slug}.jpg`,
    author: {
      '@type': 'Person',
      name: guide.reviewer?.name || 'Baobab',
    },
    datePublished: guide.publishedAt?.toISOString() || guide.createdAt.toISOString(),
    dateModified: guide.updatedAt.toISOString(),
    estimatedCost: guide.content?.estimatedCost || null,
    estimatedDuration: guide.content?.estimatedDuration || null,
  };
}

/**
 * Generate JSON-LD structured data for Article schema
 */
export function generateArticleSchema(
  guide: any
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description || guide.subtitle,
    image: `${SITE_CONFIG.url}/og-images/${guide.domain.slug}.jpg`,
    author: {
      '@type': 'Person',
      name: guide.reviewer?.name || 'Baobab',
    },
    datePublished: guide.publishedAt?.toISOString() || guide.createdAt.toISOString(),
    dateModified: guide.updatedAt.toISOString(),
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
  };
}

/**
 * Generate JSON-LD structured data for FAQPage schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD structured data for BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate JSON-LD structured data for Organization schema
 */
export function generateOrganizationSchema(): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    sameAs: [
      'https://twitter.com/baobab_ng',
      'https://www.instagram.com/baobab_ng',
      'https://www.linkedin.com/company/baobab-ng',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: SITE_CONFIG.email,
    },
  };
}

/**
 * Generate page title with site name
 */
export function generatePageTitle(title: string, separator = ' | '): string {
  return `${title}${separator}${SITE_CONFIG.name}`;
}

/**
 * Truncate description to SEO-friendly length
 */
export function truncateDescription(
  text: string,
  maxLength = 160
): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Generate keywords array from strings
 */
export function generateKeywords(
  ...keywords: string[]
): string {
  return keywords
    .filter((k) => k && k.trim())
    .map((k) => k.trim())
    .join(', ');
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(
  path: string
): string {
  return `${SITE_CONFIG.url}${path}`;
}

/**
 * Generate Open Graph image URL
 */
export function generateOGImageUrl(
  domainSlug: string
): string {
  return `${SITE_CONFIG.url}/og-images/${domainSlug}.jpg`;
}

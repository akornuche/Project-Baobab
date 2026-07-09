/**
 * Structured Data Components for SEO
 * JSON-LD schema markup for various content types
 */

interface HowToProps {
  title: string;
  description: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  estimatedTime?: string;
  estimatedCost?: string;
  steps?: Array<{
    name: string;
    description: string;
    image?: string;
  }>;
}

export function HowToSchema({
  title,
  description,
  image,
  author,
  datePublished,
  dateModified,
  estimatedTime,
  estimatedCost,
  steps = [],
}: HowToProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    image: image ? [image] : undefined,
    author: author
      ? {
          '@type': 'Person',
          name: author,
        }
      : undefined,
    datePublished,
    dateModified,
    estimatedTime: estimatedTime ? `PT${estimatedTime}` : undefined,
    estimatedCost: estimatedCost
      ? {
          '@type': 'PriceSpecification',
          priceCurrency: 'NGN',
          price: estimatedCost,
        }
      : undefined,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.description,
      image: step.image ? [step.image] : undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleProps {
  headline: string;
  description: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  organizationName?: string;
  organizationLogo?: string;
}

export function ArticleSchema({
  headline,
  description,
  image,
  author,
  datePublished,
  dateModified,
  organizationName = 'Baobab',
  organizationLogo = 'https://baobab.ng/logo.png',
}: ArticleProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image ? [image] : undefined,
    author: author
      ? {
          '@type': 'Person',
          name: author,
        }
      : undefined,
    datePublished,
    dateModified,
    publisher: {
      '@type': 'Organization',
      name: organizationName,
      logo: {
        '@type': 'ImageObject',
        url: organizationLogo,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OrganizationProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  social?: string[];
  email?: string;
}

export function OrganizationSchema({
  name = 'Baobab',
  url = 'https://baobab.ng',
  logo = 'https://baobab.ng/logo.png',
  description = 'Task-completion platform for Nigeria',
  social = [],
  email = 'hello@baobab.ng',
}: OrganizationProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs: social.length > 0 ? social : undefined,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface LocalBusinessProps {
  name: string;
  description?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode?: string;
  };
  phone?: string;
  url?: string;
  email?: string;
  image?: string;
  priceRange?: string;
  rating?: number;
  ratingCount?: number;
}

export function LocalBusinessSchema({
  name,
  description,
  address,
  phone,
  url,
  email,
  image,
  priceRange,
  rating,
  ratingCount,
}: LocalBusinessProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: 'NG',
    },
    telephone: phone,
    url,
    email,
    image,
    priceRange,
    aggregateRating: rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: rating,
          ratingCount,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface PersonProps {
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  affiliation?: string;
}

export function PersonSchema({
  name,
  url,
  image,
  jobTitle,
  affiliation,
}: PersonProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url,
    image,
    jobTitle,
    affiliation,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

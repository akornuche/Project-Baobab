/**
 * Metadata Builder
 * Centralized builder for generating consistent Metadata objects for all pages
 */

import type { Metadata } from 'next';

export interface PageMetadataInput {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: Date;
  modifiedTime?: Date;
  section?: string;
  tags?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const SITE_CONFIG = {
  name: 'Baobab',
  url: 'https://baobab.ng',
  logo: 'https://baobab.ng/logo.png',
  locale: 'en_NG',
  twitterHandle: '@baobab_ng',
  email: 'hello@baobab.ng',
};

/**
 * Build comprehensive Metadata object for Next.js 16
 */
export function buildMetadata(input: PageMetadataInput): Metadata {
  const {
    title,
    description,
    keywords = [],
    url,
    image = `${SITE_CONFIG.url}/og-images/baobab-default.jpg`,
    imageAlt = 'Baobab - Get Things Done in Nigeria',
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    canonical = url,
    noindex = false,
    nofollow = false,
  } = input;

  const fullTitle = `${title} | ${SITE_CONFIG.name}`;
  const truncatedDescription = description.length > 160 
    ? description.substring(0, 157) + '...'
    : description;

  const metadata: Metadata = {
    title: fullTitle,
    description: truncatedDescription,
    keywords: [...keywords, SITE_CONFIG.name, 'Nigeria'].join(', '),
    authors: author ? [{ name: author }] : undefined,
    creator: author || SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description: truncatedDescription,
      url,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: 'image/jpeg',
        },
      ],
      locale: SITE_CONFIG.locale,
      siteName: SITE_CONFIG.name,
      ...(type === 'article' && {
        publishedTime: publishedTime?.toISOString(),
        modifiedTime: modifiedTime?.toISOString(),
        authors: author ? [author] : undefined,
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: truncatedDescription,
      creator: SITE_CONFIG.twitterHandle,
      images: [image],
    },
    alternates: {
      canonical,
    },
  };

  // Add article-specific metadata
  if (type === 'article') {
    metadata.other = {
      ...metadata.other,
      'article:published_time': publishedTime?.toISOString(),
      'article:modified_time': modifiedTime?.toISOString(),
      'article:author': author,
      'article:section': section,
    };
  }

  return metadata;
}

/**
 * Build metadata for a guide page
 */
export function buildGuideMetadata(guide: {
  title: string;
  description?: string;
  subtitle?: string;
  slug: string;
  domain: { name: string; slug: string };
  subdomain: { name: string };
  reviewer?: { name: string };
  publishedAt?: Date;
  updatedAt: Date;
}): Metadata {
  const description =
    guide.description ||
    guide.subtitle ||
    `Learn how to ${guide.title.toLowerCase()} in Nigeria with step-by-step instructions.`;

  const keywords = [
    guide.title,
    guide.domain.name,
    guide.subdomain.name,
    'Nigeria',
    'guide',
    'how to',
  ];

  return buildMetadata({
    title: guide.title,
    description,
    keywords,
    url: `${SITE_CONFIG.url}/guides/${guide.slug}`,
    image: `${SITE_CONFIG.url}/og-images/${guide.domain.slug}.jpg`,
    imageAlt: guide.title,
    type: 'article',
    author: guide.reviewer?.name,
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt,
    section: guide.domain.name,
    tags: [guide.domain.name, guide.subdomain.name],
    canonical: `${SITE_CONFIG.url}/guides/${guide.slug}`,
  });
}

/**
 * Build metadata for a calculator page
 */
export function buildCalculatorMetadata(calculator: {
  slug: string;
  name: string;
  description: string;
}): Metadata {
  return buildMetadata({
    title: calculator.name,
    description: calculator.description,
    keywords: [calculator.name, 'calculator', 'Nigeria', 'estimator', 'tool'],
    url: `${SITE_CONFIG.url}/calculators/${calculator.slug}`,
    image: `${SITE_CONFIG.url}/og-images/calculators.jpg`,
    imageAlt: calculator.name,
    type: 'website',
    canonical: `${SITE_CONFIG.url}/calculators/${calculator.slug}`,
  });
}

/**
 * Build metadata for a category page
 */
export function buildCategoryMetadata(
  domain: { name: string; slug: string; description?: string },
  pageType: 'domain' | 'subdomain' = 'domain'
): Metadata {
  const title = pageType === 'domain' 
    ? `${domain.name} Guides | Baobab Nigeria`
    : `${domain.name} | Baobab Nigeria`;

  const description =
    domain.description ||
    `Browse step-by-step guides for ${domain.name.toLowerCase()} tasks in Nigeria.`;

  return buildMetadata({
    title: `${domain.name} Guides`,
    description,
    keywords: [domain.name, 'guides', 'Nigeria', pageType],
    url: `${SITE_CONFIG.url}/guides?${pageType === 'domain' ? 'domain' : 'subdomain'}=${domain.slug}`,
    image: `${SITE_CONFIG.url}/og-images/${domain.slug}.jpg`,
    imageAlt: domain.name,
    canonical: `${SITE_CONFIG.url}/guides?${pageType === 'domain' ? 'domain' : 'subdomain'}=${domain.slug}`,
  });
}

/**
 * Build metadata for a directory listing
 */
export function buildDirectoryMetadata(listing: {
  name: string;
  description?: string;
  category: string;
  city?: string;
  state?: string;
  slug?: string;
}): Metadata {
  const location = [listing.city, listing.state].filter(Boolean).join(', ');
  const description =
    listing.description ||
    `${listing.name} in ${location || 'Nigeria'}. ${listing.category}.`;

  return buildMetadata({
    title: `${listing.name} - ${listing.category}`,
    description,
    keywords: [listing.name, listing.category, 'Nigeria', location],
    url: `${SITE_CONFIG.url}/directories/${listing.slug || listing.name.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'profile',
  });
}

/**
 * Open Graph and Twitter Card metadata helpers
 * Ensures consistent social media sharing across all pages
 */

export interface OpenGraphConfig {
  title: string;
  description: string;
  url: string;
  type: 'website' | 'article' | 'profile' | 'video' | 'image';
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  locale?: string;
  siteName?: string;
  // Article-specific
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export interface TwitterCardConfig {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  creator?: string;
  site?: string;
  url?: string;
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(config: OpenGraphConfig): Record<string, string> {
  const tags: Record<string, string> = {
    'og:title': config.title,
    'og:description': config.description,
    'og:url': config.url,
    'og:type': config.type,
    'og:locale': config.locale || 'en_NG',
  };

  if (config.siteName) {
    tags['og:site_name'] = config.siteName;
  }

  if (config.image) {
    tags['og:image'] = config.image;
    if (config.imageWidth) {
      tags['og:image:width'] = String(config.imageWidth);
    }
    if (config.imageHeight) {
      tags['og:image:height'] = String(config.imageHeight);
    }
    if (config.imageAlt) {
      tags['og:image:alt'] = config.imageAlt;
    }
  }

  // Article-specific
  if (config.type === 'article') {
    if (config.publishedTime) {
      tags['article:published_time'] = config.publishedTime;
    }
    if (config.modifiedTime) {
      tags['article:modified_time'] = config.modifiedTime;
    }
    if (config.section) {
      tags['article:section'] = config.section;
    }
    if (config.authors && config.authors.length > 0) {
      config.authors.forEach((author, index) => {
        tags[`article:author${index > 0 ? index : ''}`] = author;
      });
    }
    if (config.tags && config.tags.length > 0) {
      config.tags.forEach((tag, index) => {
        tags[`article:tag${index}`] = tag;
      });
    }
  }

  return tags;
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(config: TwitterCardConfig): Record<string, string> {
  const tags: Record<string, string> = {
    'twitter:card': config.card,
    'twitter:title': config.title,
    'twitter:description': config.description,
  };

  if (config.image) {
    tags['twitter:image'] = config.image;
    if (config.imageAlt) {
      tags['twitter:image:alt'] = config.imageAlt;
    }
  }

  if (config.creator) {
    tags['twitter:creator'] = config.creator;
  }

  if (config.site) {
    tags['twitter:site'] = config.site;
  }

  if (config.url) {
    tags['twitter:url'] = config.url;
  }

  return tags;
}

/**
 * Generate complete metadata for social sharing
 */
export function generateSocialMetadata(
  config: Omit<OpenGraphConfig, 'type'> & {
    type?: 'website' | 'article';
    twitterCreator?: string;
  }
) {
  const ogConfig: OpenGraphConfig = {
    ...config,
    type: config.type || 'website',
  };

  const twitterConfig: TwitterCardConfig = {
    card: config.image ? 'summary_large_image' : 'summary',
    title: config.title,
    description: config.description,
    image: config.image,
    imageAlt: config.imageAlt,
    creator: config.twitterCreator || '@baobab_ng',
    site: '@baobab_ng',
    url: config.url,
  };

  return {
    openGraph: ogConfig,
    twitter: twitterConfig,
  };
}

/**
 * Get appropriate OG image URL based on context
 */
export function getOGImageUrl(
  context: 'default' | 'guides' | 'calculators' | 'domain',
  domainSlug?: string
): string {
  const base = 'https://baobab.ng/og-images';

  switch (context) {
    case 'domain':
      return domainSlug ? `${base}/${domainSlug}.jpg` : `${base}/baobab-default.jpg`;
    case 'guides':
      return `${base}/guides.jpg`;
    case 'calculators':
      return `${base}/calculators.jpg`;
    default:
      return `${base}/baobab-default.jpg`;
  }
}

/**
 * Format description for social sharing (Twitter max 280 chars, OG ideal 160 chars)
 */
export function formatSocialDescription(
  description: string,
  platform: 'twitter' | 'og' = 'og'
): string {
  const maxLength = platform === 'twitter' ? 280 : 160;

  if (description.length <= maxLength) {
    return description;
  }

  return description.substring(0, maxLength - 3) + '...';
}

/**
 * Get domain color for social branding
 */
export function getDomainColor(domainSlug: string): string {
  const colors: Record<string, string> = {
    government: '#dc2626', // Red
    business: '#2563eb', // Blue
    education: '#059669', // Green
  };

  return colors[domainSlug] || '#3b82f6';
}

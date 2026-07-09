/**
 * OG Image Manager
 * Centralized management of Open Graph images across the platform
 */

export interface OGImageConfig {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  domainColor: string;
  category: 'domain' | 'content-type' | 'default';
}

/**
 * Registry of all OG image configurations
 */
export const OG_IMAGE_REGISTRY: Record<string, OGImageConfig> = {
  'baobab-default': {
    slug: 'baobab-default',
    title: 'Baobab',
    subtitle: 'Get Things Done in Nigeria',
    icon: '🌳',
    domainColor: '#2563eb',
    category: 'default',
  },
  government: {
    slug: 'government',
    title: 'Government',
    subtitle: 'Business Registration, Identity, Taxes, Immigration',
    icon: '🏛️',
    domainColor: '#dc2626',
    category: 'domain',
  },
  business: {
    slug: 'business',
    title: 'Business',
    subtitle: 'Starting a Business, Funding, Compliance, Payroll',
    icon: '💼',
    domainColor: '#2563eb',
    category: 'domain',
  },
  education: {
    slug: 'education',
    title: 'Education',
    subtitle: 'WAEC, JAMB, NYSC, Scholarships, Admissions',
    icon: '🎓',
    domainColor: '#059669',
    category: 'domain',
  },
  guides: {
    slug: 'guides',
    title: 'Guides',
    subtitle: 'Step-by-step instructions for Nigerian tasks',
    icon: '📖',
    domainColor: '#7c3aed',
    category: 'content-type',
  },
  calculators: {
    slug: 'calculators',
    title: 'Calculators',
    subtitle: 'Interactive tools to estimate costs and plan tasks',
    icon: '🧮',
    domainColor: '#0891b2',
    category: 'content-type',
  },
  tools: {
    slug: 'tools',
    title: 'Tools',
    subtitle: 'Free calculators and estimators for Nigeria',
    icon: '⚙️',
    domainColor: '#0891b2',
    category: 'content-type',
  },
};

/**
 * Get OG image URL for a given context
 */
export function getOGImageUrl(
  context: 'guide' | 'calculator' | 'category' | 'default',
  slug?: string
): string {
  const base = 'https://baobab.ng/og-images';

  if (!slug) {
    return `${base}/baobab-default.jpg`;
  }

  // Map context to appropriate image
  const imageMap: Record<string, string> = {
    'guide-government': 'government',
    'guide-business': 'business',
    'guide-education': 'education',
    'calculator-cac': 'calculators',
    'category-guides': 'guides',
    'category-calculators': 'calculators',
  };

  const key = `${context}-${slug}`;
  const imageSlug = imageMap[key] || slug;

  return `${base}/${imageSlug}.jpg`;
}

/**
 * Get OG image config by slug
 */
export function getOGImageConfig(slug: string): OGImageConfig {
  return OG_IMAGE_REGISTRY[slug] || OG_IMAGE_REGISTRY['baobab-default'];
}

/**
 * Get all OG images in a category
 */
export function getOGImagesByCategory(
  category: 'domain' | 'content-type' | 'default'
): OGImageConfig[] {
  return Object.values(OG_IMAGE_REGISTRY).filter(
    (config) => config.category === category
  );
}

/**
 * Validate OG image URL
 */
export async function validateOGImageUrl(url: string): Promise<{
  valid: boolean;
  status?: number;
  contentType?: string;
  error?: string;
}> {
  try {
    const response = await fetch(url, { method: 'HEAD' });

    if (!response.ok) {
      return {
        valid: false,
        status: response.status,
        error: `HTTP ${response.status}`,
      };
    }

    const contentType = response.headers.get('content-type');

    if (!contentType?.includes('image')) {
      return {
        valid: false,
        contentType,
        error: `Invalid content type: ${contentType}`,
      };
    }

    return {
      valid: true,
      status: response.status,
      contentType,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate social media preview text
 */
export function generatePreviewText(
  title: string,
  platform: 'twitter' | 'facebook' | 'linkedin' = 'twitter'
): string {
  const maxLengths = {
    twitter: 280,
    facebook: 160,
    linkedin: 220,
  };

  const maxLength = maxLengths[platform];

  if (title.length <= maxLength) {
    return title;
  }

  return title.substring(0, maxLength - 3) + '...';
}

/**
 * Get domain slug from guide slug
 */
export function getDomainSlugFromGuide(guideDomain: string): string {
  const slugMap: Record<string, string> = {
    'Government': 'government',
    'Business': 'business',
    'Education': 'education',
  };

  return slugMap[guideDomain] || 'business';
}

/**
 * Get recommended OG image for guide
 */
export function getRecommendedOGImageForGuide(
  guideDomain: string,
  guideSlug?: string
): string {
  const domainSlug = getDomainSlugFromGuide(guideDomain);
  const imageSlug = `https://baobab.ng/og-images/${domainSlug}.jpg`;

  return imageSlug;
}

/**
 * Cache busting helper - useful for cache invalidation
 */
export function getOGImageUrlWithVersion(
  slug: string,
  version?: string
): string {
  const base = `https://baobab.ng/og-images/${slug}.jpg`;

  if (!version) {
    return base;
  }

  return `${base}?v=${version}`;
}

/**
 * Analytics helper - track OG image impressions
 */
export function trackOGImageImpression(
  slug: string,
  platform: 'twitter' | 'facebook' | 'linkedin' | 'other'
): void {
  // This would be implemented with your analytics service
  // Example: gtag event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'og_image_impression', {
      og_image_slug: slug,
      platform,
    });
  }
}

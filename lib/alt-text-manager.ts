/**
 * Alt Text Manager
 * Centralized management of alt text for images across the platform
 */

export interface AltTextConfig {
  key: string;
  template: string;
  description: string;
  examples: string[];
}

/**
 * Registry of alt text templates for different content types
 */
export const ALT_TEXT_TEMPLATES: Record<string, AltTextConfig> = {
  'domain-icon': {
    key: 'domain-icon',
    template: '{domain} domain icon',
    description: 'Icon representing a domain category',
    examples: [
      'Government domain icon',
      'Business domain icon',
      'Education domain icon',
    ],
  },
  'guide-header': {
    key: 'guide-header',
    template: '{guide_title} - How to guide for Nigeria',
    description: 'Header image for a how-to guide',
    examples: [
      'How to Register a Business Name with CAC - Step-by-step guide for Nigeria',
      'How to Apply for a Nigerian Passport - Complete guide',
    ],
  },
  'calculator-icon': {
    key: 'calculator-icon',
    template: '{calculator_name} - Interactive calculator tool',
    description: 'Icon or image for a calculator tool',
    examples: [
      'CAC Registration Cost Estimator - Interactive calculator tool',
      'Business Startup Calculator - Cost estimation tool',
    ],
  },
  'directory-listing': {
    key: 'directory-listing',
    template: '{business_name} - {category} in {location}',
    description: 'Photo or logo for a directory listing',
    examples: [
      'Baobab Legal Services - Business registration agent in Lagos',
      'ABC Accounting - Tax consultants in Abuja',
    ],
  },
  'og-image': {
    key: 'og-image',
    template: '{title} - Baobab Nigeria',
    description: 'Open Graph image for social sharing',
    examples: [
      'Business Registration Guide - Baobab Nigeria',
      'CAC Cost Calculator - Baobab Nigeria',
    ],
  },
  'badge-icon': {
    key: 'badge-icon',
    template: '{badge_type} badge icon',
    description: 'Status badge or verification icon',
    examples: [
      'Verified badge icon',
      'Premium listing badge icon',
      'Featured guide badge icon',
    ],
  },
  'flag-emoji': {
    key: 'flag-emoji',
    template: 'Flag of Nigeria',
    description: 'Nigerian flag emoji or image',
    examples: ['Flag of Nigeria'],
  },
  'state-map': {
    key: 'state-map',
    template: 'Map of {state}, Nigeria',
    description: 'Map showing a Nigerian state',
    examples: [
      'Map of Lagos State, Nigeria',
      'Map of Abuja (Federal Capital Territory), Nigeria',
    ],
  },
};

/**
 * Generate alt text from template
 */
export function generateAltText(
  templateKey: string,
  variables: Record<string, string>
): string {
  const config = ALT_TEXT_TEMPLATES[templateKey];

  if (!config) {
    console.warn(`Alt text template not found: ${templateKey}`);
    return 'Image';
  }

  let altText = config.template;

  // Replace all variables
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    altText = altText.replace(new RegExp(placeholder, 'g'), value);
  });

  return altText;
}

/**
 * Validate alt text length
 */
export function validateAltText(
  altText: string,
  maxLength: number = 125
): {
  valid: boolean;
  length: number;
  error?: string;
} {
  const trimmed = altText.trim();

  if (!trimmed) {
    return {
      valid: false,
      length: 0,
      error: 'Alt text cannot be empty',
    };
  }

  if (trimmed.length > maxLength) {
    return {
      valid: false,
      length: trimmed.length,
      error: `Alt text exceeds maximum length of ${maxLength} characters (currently ${trimmed.length})`,
    };
  }

  return {
    valid: true,
    length: trimmed.length,
  };
}

/**
 * Get alt text for guide image
 */
export function getGuideImageAlt(
  guideTitle: string,
  domainName?: string
): string {
  const domain = domainName ? ` (${domainName})` : '';
  return `${guideTitle}${domain} - Step-by-step guide for Nigeria`;
}

/**
 * Get alt text for calculator image
 */
export function getCalculatorImageAlt(calculatorName: string): string {
  return `${calculatorName} - Interactive calculator tool for Nigeria`;
}

/**
 * Get alt text for directory listing
 */
export function getDirectoryListingAlt(
  businessName: string,
  category: string,
  location?: string
): string {
  const parts = [businessName, category];

  if (location) {
    parts.push(`in ${location}`);
  }

  return `${parts.join(' - ')} in Nigeria`;
}

/**
 * Get alt text for badge or icon
 */
export function getBadgeAlt(badgeType: string): string {
  const badgeNames: Record<string, string> = {
    verified: 'Verified badge - This listing has been verified',
    premium: 'Premium badge - Premium listing',
    featured: 'Featured badge - Featured content',
    trusted: 'Trusted badge - Trusted provider',
    recommended: 'Recommended badge - Recommended by Baobab',
  };

  return badgeNames[badgeType] || `${badgeType} badge`;
}

/**
 * Best practices for alt text
 */
export const ALT_TEXT_GUIDELINES = {
  maxLength: 125,
  rules: [
    'Be concise and accurate',
    'Describe the content and function of the image',
    'Do not include "image of" or "picture of" (implied by alt attribute)',
    'Include relevant keywords when natural',
    'Avoid keyword stuffing',
    'If image contains text, include it in alt text',
    'For decorative images, use empty alt attribute (alt="")',
    'For complex images (charts, infographics), provide alternative text or long description',
  ],
  examples: {
    good: [
      'CAC business registration cost calculator interface showing input fields for entity type and share capital',
      'Verified professional in business registration services based in Lagos, Nigeria',
      'Step-by-step guide showing how to apply for Nigerian passport online',
    ],
    bad: [
      'image',
      'pic',
      'photo',
      'Click here',
      'Image of a guide',
      'Picture showing how to register business name',
    ],
  },
};

/**
 * Check if image is decorative
 */
export function isDecorativeImage(purpose: string): boolean {
  const decorativePurposes = ['divider', 'spacer', 'background', 'decoration'];
  return decorativePurposes.includes(purpose.toLowerCase());
}

/**
 * Get accessible image HTML
 */
export function getImageHTML(
  src: string,
  alt: string,
  title?: string,
  className?: string
): string {
  const titleAttr = title ? ` title="${title}"` : '';
  const classAttr = className ? ` class="${className}"` : '';

  return `<img src="${src}" alt="${alt}"${titleAttr}${classAttr} />`;
}

/**
 * Get image with caption HTML (accessible)
 */
export function getImageWithCaptionHTML(
  src: string,
  alt: string,
  caption: string,
  className?: string
): string {
  const classAttr = className ? ` class="${className}"` : '';

  return `<figure${classAttr}>
  <img src="${src}" alt="${alt}" />
  <figcaption>${caption}</figcaption>
</figure>`;
}

/**
 * Accessibility checklist for images
 */
export const IMAGE_ACCESSIBILITY_CHECKLIST = {
  'Alt Text': [
    'Alt text provided for all non-decorative images',
    'Alt text is concise (under 125 characters)',
    'Alt text describes content and purpose',
    'Alt text includes relevant keywords',
    'No "image of" or "picture of" in alt text',
  ],
  'Image Context': [
    'Image is relevant to surrounding content',
    'Image has visible caption if needed',
    'Image contrast is sufficient (4.5:1 minimum)',
    'Image is not solely reliant on color',
  ],
  'Technical': [
    'Image format optimized (WebP, AVIF preferred)',
    'Image dimensions appropriate for layout',
    'Image file size reasonable (<100KB)',
    'Responsive images using srcset',
    'Lazy loading implemented where appropriate',
  ],
  'SEO': [
    'Image filename is descriptive',
    'Image has descriptive alt text',
    'Image is in sitemap (for important images)',
    'Image structured data added if relevant',
  ],
};

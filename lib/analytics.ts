/**
 * Google Analytics 4 Integration
 * Handles analytics event tracking and user interactions
 */

export interface GAEvent {
  name: string;
  params: Record<string, string | number | boolean>;
}

export interface GAPageView {
  page_title: string;
  page_path: string;
  page_location?: string;
}

/**
 * Initialize Google Analytics
 * Call this from root layout
 */
export function initGA(measurementId: string) {
  if (!measurementId || typeof window === 'undefined') return;

  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(arguments);
  }
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_path: window.location.pathname,
  });
}

/**
 * Track page view
 */
export function trackPageView(pageView: GAPageView) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'page_view', pageView);
}

/**
 * Track custom event
 */
export function trackEvent(event: GAEvent) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', event.name, event.params);
}

/**
 * Common event types
 */
export const GAEvents = {
  GUIDE_VIEWED: 'guide_viewed',
  CALCULATOR_USED: 'calculator_used',
  SEARCH_PERFORMED: 'search_performed',
  TOOL_CLICKED: 'tool_clicked',
  DIRECTORY_VIEWED: 'directory_viewed',
  PREMIUM_UPGRADE: 'premium_upgrade',
  CONTENT_SHARED: 'content_shared',
  FORM_SUBMITTED: 'form_submitted',
  ERROR_OCCURRED: 'error_occurred',
  PERFORMANCE_ISSUE: 'performance_issue',
} as const;

/**
 * Track guide view
 */
export function trackGuideView(guideTitle: string, guideDomain: string) {
  trackEvent({
    name: GAEvents.GUIDE_VIEWED,
    params: {
      guide_title: guideTitle,
      guide_domain: guideDomain,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Track calculator usage
 */
export function trackCalculatorUse(calculatorName: string, result?: any) {
  trackEvent({
    name: GAEvents.CALCULATOR_USED,
    params: {
      calculator_name: calculatorName,
      result_generated: !!result,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Track search
 */
export function trackSearch(query: string, resultsCount: number) {
  trackEvent({
    name: GAEvents.SEARCH_PERFORMED,
    params: {
      search_query: query,
      results_count: resultsCount,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Track directory view
 */
export function trackDirectoryView(businessName: string, category: string) {
  trackEvent({
    name: GAEvents.DIRECTORY_VIEWED,
    params: {
      business_name: businessName,
      business_category: category,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Track content sharing
 */
export function trackContentShare(
  contentType: string,
  contentTitle: string,
  platform: string
) {
  trackEvent({
    name: GAEvents.CONTENT_SHARED,
    params: {
      content_type: contentType,
      content_title: contentTitle,
      share_platform: platform,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Track error
 */
export function trackError(errorName: string, errorMessage: string) {
  trackEvent({
    name: GAEvents.ERROR_OCCURRED,
    params: {
      error_name: errorName,
      error_message: errorMessage,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Setup Google Search Console verification
 */
export function getSearchConsoleVerification() {
  return {
    metaTag:
      'google-site-verification=your_verification_code_here',
    htmlFile: 'google-site-verification_file.html',
    dnsRecord: 'google-site-verification=your_dns_record_here',
  };
}

/**
 * Structured data for Search Console enhanced results
 */
export interface SearchConsoleStructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

/**
 * Generate sitemap metadata for Search Console
 */
export function generateSitemapMetadata() {
  return {
    sitemapUrl: 'https://baobab.ng/sitemap.xml',
    sitemapIndex: 'https://baobab.ng/sitemap-index.xml',
    robotsTxt: 'https://baobab.ng/robots.txt',
  };
}

/**
 * Rich snippets configuration for Search Console
 */
export const SEARCH_CONSOLE_RICH_SNIPPETS = {
  guides: {
    type: 'HowTo',
    properties: ['title', 'description', 'step', 'estimatedTime'],
  },
  calculators: {
    type: 'SoftwareApplication',
    properties: ['name', 'description', 'applicationCategory', 'offers'],
  },
  articles: {
    type: 'Article',
    properties: ['headline', 'description', 'datePublished', 'author'],
  },
  reviews: {
    type: 'LocalBusiness',
    properties: ['name', 'address', 'telephone', 'rating', 'review'],
  },
};

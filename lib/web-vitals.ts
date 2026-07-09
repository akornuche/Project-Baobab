/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals metrics for performance optimization
 */

export interface VitalsMetrics {
  LCP: number | null; // Largest Contentful Paint (ms) - target: < 2500ms
  FID: number | null; // First Input Delay (ms) - target: < 100ms
  CLS: number | null; // Cumulative Layout Shift - target: < 0.1
  FCP: number | null; // First Contentful Paint (ms)
  TTFB: number | null; // Time to First Byte (ms)
  INP: number | null; // Interaction to Next Paint (ms) - target: < 200ms
}

export interface VitalsThresholds {
  LCP: { good: number; needsImprovement: number }; // 2500, 4000
  FID: { good: number; needsImprovement: number }; // 100, 300
  CLS: { good: number; needsImprovement: number }; // 0.1, 0.25
  INP: { good: number; needsImprovement: number }; // 200, 500
}

export const VITALS_THRESHOLDS: VitalsThresholds = {
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  INP: { good: 200, needsImprovement: 500 },
};

/**
 * Send vitals data to analytics endpoint
 */
export async function reportWebVitals(vitals: VitalsMetrics) {
  // Only send non-null values
  const filteredVitals = Object.fromEntries(
    Object.entries(vitals).filter(([_, value]) => value !== null)
  );

  try {
    await fetch('/api/analytics/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...filteredVitals,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    });
  } catch (error) {
    console.debug('Failed to report web vitals:', error);
  }
}

/**
 * Get vitals assessment
 */
export function assessVitals(vitals: VitalsMetrics): Record<string, string> {
  const assessment: Record<string, string> = {};

  if (vitals.LCP !== null) {
    assessment.LCP =
      vitals.LCP <= VITALS_THRESHOLDS.LCP.good
        ? 'good'
        : vitals.LCP <= VITALS_THRESHOLDS.LCP.needsImprovement
          ? 'needs-improvement'
          : 'poor';
  }

  if (vitals.FID !== null) {
    assessment.FID =
      vitals.FID <= VITALS_THRESHOLDS.FID.good
        ? 'good'
        : vitals.FID <= VITALS_THRESHOLDS.FID.needsImprovement
          ? 'needs-improvement'
          : 'poor';
  }

  if (vitals.CLS !== null) {
    assessment.CLS =
      vitals.CLS <= VITALS_THRESHOLDS.CLS.good
        ? 'good'
        : vitals.CLS <= VITALS_THRESHOLDS.CLS.needsImprovement
          ? 'needs-improvement'
          : 'poor';
  }

  if (vitals.INP !== null) {
    assessment.INP =
      vitals.INP <= VITALS_THRESHOLDS.INP.good
        ? 'good'
        : vitals.INP <= VITALS_THRESHOLDS.INP.needsImprovement
          ? 'needs-improvement'
          : 'poor';
  }

  return assessment;
}

/**
 * Performance optimization recommendations
 */
export function getOptimizationRecommendations(
  vitals: VitalsMetrics
): string[] {
  const recommendations: string[] = [];

  if (vitals.LCP && vitals.LCP > VITALS_THRESHOLDS.LCP.good) {
    recommendations.push(
      'Optimize Largest Contentful Paint: lazy load images, defer non-critical CSS, use font-display: swap'
    );
  }

  if (vitals.FID && vitals.FID > VITALS_THRESHOLDS.FID.good) {
    recommendations.push(
      'Improve First Input Delay: break up long JavaScript tasks, use web workers for heavy computation'
    );
  }

  if (vitals.CLS && vitals.CLS > VITALS_THRESHOLDS.CLS.good) {
    recommendations.push(
      'Reduce Cumulative Layout Shift: set dimensions for images and ads, avoid inserting content above existing content'
    );
  }

  if (vitals.INP && vitals.INP > VITALS_THRESHOLDS.INP.good) {
    recommendations.push(
      'Optimize Interaction to Next Paint: reduce JavaScript execution time, optimize event handlers'
    );
  }

  return recommendations;
}

/**
 * Format vitals for display
 */
export function formatVitals(vitals: VitalsMetrics): Record<string, string> {
  return {
    LCP: vitals.LCP ? `${vitals.LCP.toFixed(0)}ms` : 'N/A',
    FID: vitals.FID ? `${vitals.FID.toFixed(0)}ms` : 'N/A',
    CLS: vitals.CLS ? `${vitals.CLS.toFixed(3)}` : 'N/A',
    FCP: vitals.FCP ? `${vitals.FCP.toFixed(0)}ms` : 'N/A',
    TTFB: vitals.TTFB ? `${vitals.TTFB.toFixed(0)}ms` : 'N/A',
    INP: vitals.INP ? `${vitals.INP.toFixed(0)}ms` : 'N/A',
  };
}

/**
 * Performance Metrics Utility for analytics
 */
export interface PerformanceMetrics {
  navigationTiming?: PerformanceNavigationTiming;
  resourceTiming?: PerformanceResourceTiming[];
  paintTiming?: PerformancePaintTiming[];
  fps?: number;
  memoryUsage?: number;
}

/**
 * Get performance metrics
 */
export function getPerformanceMetrics(): PerformanceMetrics {
  const metrics: PerformanceMetrics = {};

  try {
    // Navigation timing
    const navTiming = performance.getEntriesByType('navigation')[0];
    if (navTiming) {
      metrics.navigationTiming = navTiming as PerformanceNavigationTiming;
    }

    // Resource timing
    const resourceTiming = performance.getEntriesByType('resource');
    if (resourceTiming.length > 0) {
      metrics.resourceTiming = resourceTiming as PerformanceResourceTiming[];
    }

    // Paint timing
    const paintTiming = performance.getEntriesByType('paint');
    if (paintTiming.length > 0) {
      metrics.paintTiming = paintTiming as PerformancePaintTiming[];
    }

    // Memory usage (if available in browser)
    if ((performance as any).memory) {
      metrics.memoryUsage = (performance as any).memory.usedJSHeapSize;
    }
  } catch (error) {
    console.debug('Error collecting performance metrics:', error);
  }

  return metrics;
}

/**
 * Get Page Speed Insights summary
 */
export interface PageSpeedMetrics {
  score: number; // 0-100
  category: 'good' | 'needs-improvement' | 'poor';
  metrics: Record<string, any>;
}

export function assessPerformanceScore(vitals: VitalsMetrics): PageSpeedMetrics {
  let score = 100;

  // LCP (25% weight)
  if (vitals.LCP) {
    if (vitals.LCP > VITALS_THRESHOLDS.LCP.good) {
      score -= Math.min(25, (vitals.LCP / VITALS_THRESHOLDS.LCP.needsImprovement) * 25);
    }
  }

  // FID (25% weight)
  if (vitals.FID) {
    if (vitals.FID > VITALS_THRESHOLDS.FID.good) {
      score -= Math.min(25, (vitals.FID / VITALS_THRESHOLDS.FID.needsImprovement) * 25);
    }
  }

  // CLS (25% weight)
  if (vitals.CLS) {
    if (vitals.CLS > VITALS_THRESHOLDS.CLS.good) {
      score -= Math.min(25, (vitals.CLS / VITALS_THRESHOLDS.CLS.needsImprovement) * 25);
    }
  }

  // INP (25% weight)
  if (vitals.INP) {
    if (vitals.INP > VITALS_THRESHOLDS.INP.good) {
      score -= Math.min(25, (vitals.INP / VITALS_THRESHOLDS.INP.needsImprovement) * 25);
    }
  }

  score = Math.max(0, Math.round(score));

  return {
    score,
    category:
      score >= 90
        ? 'good'
        : score >= 50
          ? 'needs-improvement'
          : 'poor',
    metrics: {
      LCP: vitals.LCP,
      FID: vitals.FID,
      CLS: vitals.CLS,
      INP: vitals.INP,
    },
  };
}

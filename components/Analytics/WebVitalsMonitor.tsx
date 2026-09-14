'use client';

import { useEffect } from 'react';
import {
  reportWebVitals,
  VitalsMetrics,
  assessVitals,
  formatVitals,
} from '@/lib/web-vitals';

/**
 * Web Vitals Monitor Component
 * Tracks and reports Core Web Vitals metrics to analytics endpoint
 * Place this in root layout
 */
export function WebVitalsMonitor() {
  useEffect(() => {
    const vitals: VitalsMetrics = {
      LCP: null,
      FID: null,
      CLS: null,
      FCP: null,
      TTFB: null,
      INP: null,
    };

    // Observe Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        vitals.LCP = Math.round(lastEntry.renderTime || lastEntry.loadTime || 0);
        reportWebVitals(vitals);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.debug('LCP observer not supported');
    }

    // Observe First Input Delay (FID) - now called INP
    try {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          vitals.FID = Math.round(entry.processingDuration);
          reportWebVitals(vitals);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.debug('FID observer not supported');
    }

    // Observe Interaction to Next Paint (INP)
    try {
      const inpObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          vitals.INP = Math.round(entry.duration);
          reportWebVitals(vitals);
        });
      });
      inpObserver.observe({ entryTypes: ['event'] });
    } catch (e) {
      console.debug('INP observer not supported');
    }

    // Observe Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            vitals.CLS = Math.round(clsValue * 100) / 100;
            reportWebVitals(vitals);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.debug('CLS observer not supported');
    }

    // Get Navigation Timing metrics
    if (window.performance && window.performance.timing) {
      const navigationStart = window.performance.timing.navigationStart;
      const responseStart = window.performance.timing.responseStart;
      const firstContentfulPaint =
        window.performance.timing.domContentLoadedEventEnd;

      if (responseStart && navigationStart) {
        vitals.TTFB = responseStart - navigationStart;
      }

      if (firstContentfulPaint && navigationStart) {
        vitals.FCP = firstContentfulPaint - navigationStart;
      }

      reportWebVitals(vitals);
    }

    // Log vitals in development
    if (process.env.NODE_ENV === 'development') {
      const handlePageHide = () => {
        console.log(
          '📊 Final Web Vitals:',
          formatVitals(vitals),
          assessVitals(vitals)
        );
      };

      window.addEventListener('pagehide', handlePageHide);
      return () => window.removeEventListener('pagehide', handlePageHide);
    }
  }, []);

  // Monitor component - not rendered, just runs effects
  return null;
}

/**
 * Web Vitals Dashboard Component (for admin/analytics pages)
 */
interface WebVitalsDashboardProps {
  vitals: VitalsMetrics;
}

export function WebVitalsDashboard({ vitals }: WebVitalsDashboardProps) {
  const assessment = assessVitals(vitals);
  const formatted = formatVitals(vitals);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-50';
      case 'needs-improvement':
        return 'text-amber-600 bg-amber-50';
      case 'poor':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {/* LCP */}
      {vitals.LCP !== null && (
        <div className={`p-4 rounded-lg ${getStatusColor(assessment.LCP)}`}>
          <div className="text-xs font-semibold uppercase">LCP</div>
          <div className="text-2xl font-bold">{formatted.LCP}</div>
          <div className="text-xs">Largest Contentful Paint</div>
        </div>
      )}

      {/* FID */}
      {vitals.FID !== null && (
        <div className={`p-4 rounded-lg ${getStatusColor(assessment.FID)}`}>
          <div className="text-xs font-semibold uppercase">FID</div>
          <div className="text-2xl font-bold">{formatted.FID}</div>
          <div className="text-xs">First Input Delay</div>
        </div>
      )}

      {/* CLS */}
      {vitals.CLS !== null && (
        <div className={`p-4 rounded-lg ${getStatusColor(assessment.CLS)}`}>
          <div className="text-xs font-semibold uppercase">CLS</div>
          <div className="text-2xl font-bold">{formatted.CLS}</div>
          <div className="text-xs">Cumulative Layout Shift</div>
        </div>
      )}

      {/* FCP */}
      {vitals.FCP !== null && (
        <div className="p-4 rounded-lg bg-blue-50">
          <div className="text-xs font-semibold uppercase">FCP</div>
          <div className="text-2xl font-bold text-blue-600">{formatted.FCP}</div>
          <div className="text-xs">First Contentful Paint</div>
        </div>
      )}

      {/* TTFB */}
      {vitals.TTFB !== null && (
        <div className="p-4 rounded-lg bg-blue-50">
          <div className="text-xs font-semibold uppercase">TTFB</div>
          <div className="text-2xl font-bold text-blue-600">{formatted.TTFB}</div>
          <div className="text-xs">Time to First Byte</div>
        </div>
      )}

      {/* INP */}
      {vitals.INP !== null && (
        <div className={`p-4 rounded-lg ${getStatusColor(assessment.INP)}`}>
          <div className="text-xs font-semibold uppercase">INP</div>
          <div className="text-2xl font-bold">{formatted.INP}</div>
          <div className="text-xs">Interaction to Next Paint</div>
        </div>
      )}
    </div>
  );
}

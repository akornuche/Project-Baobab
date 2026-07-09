'use client';

import { useEffect } from 'react';
import { initGA, trackPageView } from '@/lib/analytics';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Google Analytics 4 Tracker Component
 * Initialize GA4 and track page views
 * Place this in root layout as a client component
 */
export function GA4Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize GA4 with measurement ID from environment
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (measurementId) {
      initGA(measurementId);
    }
  }, []);

  useEffect(() => {
    // Track page views on route change
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

    trackPageView({
      page_title: document.title,
      page_path: pathname,
      page_location: `${typeof window !== 'undefined' ? window.location.origin : ''}${url}`,
    });
  }, [pathname, searchParams]);

  return null;
}

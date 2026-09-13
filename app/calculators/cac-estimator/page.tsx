export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import CACEstimatorClient from './CACEstimatorClient';

export const metadata: Metadata = {
  title: 'CAC Registration Cost & Time Estimator | Baobab Nigeria',
  description: 'Calculate the exact cost and processing time to register your business with CAC. Get accurate estimates for Business Name, Limited Company, and sole proprietorship registration.',
  keywords: 'CAC registration cost, business registration Nigeria, CAC fees, registration time',
  openGraph: {
    title: 'CAC Registration Cost & Time Estimator',
    description: 'Calculate CAC registration costs and timeline for your business',
    url: 'https://baobab.ng/calculators/cac-estimator',
    type: 'website',
    images: [
      {
        url: 'https://baobab.ng/og-images/tools.jpg',
        width: 1200,
        height: 630,
        alt: 'CAC Registration Cost Estimator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CAC Registration Cost Estimator',
    description: 'Calculate CAC registration costs and timeline for your business',
    creator: '@baobab_ng',
  },
};

export default function CACEstimatorPage() {
  return <CACEstimatorClient />;
}

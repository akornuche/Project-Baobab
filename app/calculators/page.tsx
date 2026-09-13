export const dynamic = 'force-dynamic';

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Tools & Calculators | Baobab Nigeria',
  description: 'Use our interactive calculators to estimate costs, compare business structures, and plan your Nigerian administrative tasks. CAC costs, startup costs, VAT calculations, and more.',
  keywords: 'calculators, tools, cost estimator, Nigeria, business, VAT, PAYE, passport',
  openGraph: {
    title: 'Interactive Tools & Calculators',
    description: 'Free calculators and tools to help you plan',
    url: 'https://baobab.ng/calculators',
    type: 'website',
    images: [
      {
        url: 'https://baobab.ng/og-images/calculators.jpg',
        width: 1200,
        height: 630,
        alt: 'Baobab Calculators',
      },
    ],
  },
  alternates: {
    canonical: 'https://baobab.ng/calculators',
  },
};

export default function CalculatorsPage() {
  const tools = [
    {
      title: 'CAC Cost Estimator',
      description: 'Calculate the cost and time to register your business with CAC',
      href: '/calculators/cac-estimator',
    },
    {
      title: 'Business Startup Calculator',
      description: 'Estimate total startup costs including CAC, TIN, bank, and VAT',
      href: '/calculators/business-startup-calculator',
    },
    {
      title: 'Passport Cost Estimator',
      description: 'Estimate passport application cost and processing time',
      href: '/calculators/passport-estimator',
    },
    {
      title: 'VAT Calculator',
      description: 'Calculate VAT on sales (7.5% rate)',
      href: '/calculators/vat-calculator',
    },
    {
      title: 'JAMB Subject Checker',
      description: 'Find required subjects for your desired course',
      href: '/calculators/jamb-subject-checker',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Interactive Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Calculate costs, check requirements, and estimate timelines with our interactive tools.
          </p>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">More Tools Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're building more calculators and tools to help you accomplish tasks in Nigeria.
          </p>
          <Link href="/guides" className="text-blue-600 hover:underline">
            Browse guides
          </Link>
        </div>
      </div>
    </div>
  );
}
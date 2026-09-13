export const dynamic = 'force-dynamic';

import Link from 'next/link';
import type { Metadata } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: 'All Guides - Browse by Category | Baobab Nigeria',
  description: 'Browse step-by-step guides organized by Government, Business, and Education. Learn how to register businesses, apply for passports, prepare for exams, and more.',
  keywords: 'guides, how to, Nigeria, government, business, education, administrative tasks',
  openGraph: {
    title: 'All Guides - Baobab Nigeria',
    description: 'Browse step-by-step guides by category',
    url: 'https://baobab.ng/guides',
    type: 'website',
    images: [
      {
        url: 'https://baobab.ng/og-images/guides.jpg',
        width: 1200,
        height: 630,
        alt: 'Baobab Guides',
      },
    ],
  },
  alternates: {
    canonical: 'https://baobab.ng/guides',
  },
};

interface Guide {
  id: string;
  title: string;
  slug: string;
  domain: string;
  subdomain: string;
}

export default async function GuidesPage() {
  const allGuides = await prisma.guide.findMany({
    where: { published: true, isDeleted: false },
    include: {
      domain: true,
      subdomain: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const domains = [
    {
      name: 'Government',
      slug: 'government',
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      name: 'Business',
      slug: 'business',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      name: 'Education',
      slug: 'education',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
  ];

  // Group guides by domain
  const guidesByDomain = domains.map((domain) => ({
    ...domain,
    guides: allGuides.filter((g) => g.domain.slug === domain.slug),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            All Guides
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Step-by-step instructions to accomplish administrative, business, and life tasks in Nigeria.
          </p>
          <p className="text-lg text-gray-500">
            Showing {allGuides.length} verified guides
          </p>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {guidesByDomain.map((domain) => (
            <div key={domain.slug} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-3xl font-bold ${domain.color}`}>{domain.name}</h2>
                <Link
                  href={`/guides/${domain.slug}`}
                  className={`px-4 py-2 ${domain.bg} ${domain.color} font-medium rounded-lg hover:opacity-80`}
                >
                  View all {domain.guides.length} →
                </Link>
              </div>

              {domain.guides.length === 0 ? (
                <p className="text-gray-500 italic">No guides in this category yet</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {domain.guides.map((guide) => (
                    <Link
                      key={guide.id}
                      href={`/guides/${guide.slug}`}
                      className={`p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-blue-300 transition-all group`}
                    >
                      <h3 className={`text-xl font-semibold mb-3 text-gray-900 group-hover:${domain.color}`}>
                        {guide.title}
                      </h3>
                      {guide.subtitle && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {guide.subtitle}
                        </p>
                      )}
                      <div className="mt-3 text-sm text-gray-500">
                        {guide.subdomain.name}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination (placeholder - expand as guides grow) */}
      <div className="py-12 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            Want to see more guides? <a href="/contact" className="text-blue-600 hover:underline">Suggest a topic</a>
          </p>
        </div>
      </div>
    </div>
  );
}
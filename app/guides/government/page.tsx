export const dynamic = 'force-dynamic';

import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export async function generateMetadata() {
  return {
    title: 'Government Guides - Baobab Nigeria',
    description: 'Step-by-step guides for government services in Nigeria including business registration, taxes, immigration, and civil documents.',
    keywords: ['government guides', 'nigeria government services', 'business registration', 'CAC', 'taxes', 'immigration'],
  };
}

export default async function GovernmentGuidesPage() {
  const domain = await prisma.domain.findUnique({
    where: { slug: 'government' },
  });

  if (!domain) {
    notFound();
  }

  const guides = await prisma.guide.findMany({
    where: {
      domainId: domain.id,
      published: true,
      isDeleted: false,
    },
    include: {
      subdomain: true,
      _count: { select: { sources: true } },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const subdomains = await prisma.subdomain.findMany({
    where: { domainId: domain.id },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Government Services Guides</h1>
        <p className="text-gray-600">
          Complete step-by-step guides for all government services in Nigeria
        </p>
      </div>

      {/* Domain Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/guides/government"
          className={`px-4 py-2 rounded-lg font-medium ${
            true ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          All Services
        </Link>
        {subdomains.map((subdomain) => (
          <Link
            key={subdomain.id}
            href={`/guides/government?subdomain=${subdomain.slug}`}
            className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            {subdomain.name}
          </Link>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            href={`/guides/${guide.slug}`}
            className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-blue-300 transition-all group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {guide.subdomain.name}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600">
              {guide.title}
            </h3>
            {guide.subtitle && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {guide.subtitle}
              </p>
            )}
            <div className="mt-auto flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {guide._count.sources} sources
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{guides.length}</div>
            <div className="text-sm text-gray-600"> Guides Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {guides.reduce((acc, g) => acc + (g._count.sources || 0), 0)}
            </div>
            <div className="text-sm text-gray-600"> Sources Cited</div>
          </div>
        </div>
      </div>
    </div>
  );
}

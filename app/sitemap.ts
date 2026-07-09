import type { MetadataRoute } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const BASE_URL = 'https://baobab.ng';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all published guides
  const guides = await prisma.guide.findMany({
    where: { isDeleted: false, published: true },
    select: { slug: true, updatedAt: true, publishedAt: true },
    orderBy: { updatedAt: 'desc' },
  });

  // All calculator pages
  const calculators = [
    'cac-estimator',
    'business-startup-calculator',
    'passport-estimator',
    'vat-calculator',
    'jamb-subject-checker',
    'entity-comparator',
    'doc-checklist',
    'paye-calculator',
    'invoice-generator',
  ];

  // All domain pages
  const domains = [
    { slug: 'government', name: 'Government' },
    { slug: 'business', name: 'Business' },
    { slug: 'education', name: 'Education' },
  ];

  // Fetch all published subdomain pages
  const subdomains = await prisma.subdomain.findMany({
    where: { guides: { some: { published: true, isDeleted: false } } },
    select: { slug: true, updatedAt: true },
  });

  // Guide sitemaps
  const guideSitemaps: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: guide.updatedAt || guide.publishedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Calculator sitemaps
  const calculatorSitemaps: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${BASE_URL}/calculators/${calc}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Domain sitemaps
  const domainSitemaps: MetadataRoute.Sitemap = domains.map((domain) => ({
    url: `${BASE_URL}/guides?domain=${domain.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  // Subdomain sitemaps
  const subdomainSitemaps: MetadataRoute.Sitemap = subdomains.map((subdomain) => ({
    url: `${BASE_URL}/guides?subdomain=${subdomain.slug}`,
    lastModified: subdomain.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Static pages
  const staticSitemaps: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  return [
    ...staticSitemaps,
    ...guideSitemaps,
    ...calculatorSitemaps,
    ...domainSitemaps,
    ...subdomainSitemaps,
  ];
}

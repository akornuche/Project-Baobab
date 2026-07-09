import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import type { Metadata } from 'next';
import { GuidePageTemplate } from '@/components/Guide/GuidePageTemplate';
import { HowToSchema, ArticleSchema } from '@/components/SEO/StructuredData';

const prisma = new PrismaClient();

interface GuideData {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  content: any;
  domain: { name: string; slug: string };
  subdomain: { name: string; slug: string };
  tool?: { id: string; name: string; slug: string };
  reviewer?: { name: string };
  sources: Array<{ title?: string; url: string; verified: boolean }>;
  lastVerified?: string;
}

async function getGuide(slug: string): Promise<GuideData | null> {
  const guide = await prisma.guide.findUnique({
    where: { slug, isDeleted: false },
    include: {
      domain: true,
      subdomain: true,
      tool: true,
      reviewer: { select: { name: true } },
      sources: true,
    },
  });

  if (!guide) return null;

  try {
    const content = JSON.parse(guide.content || '{}');
    return {
      id: guide.id,
      title: guide.title,
      subtitle: guide.subtitle,
      description: guide.description,
      content,
      domain: { name: guide.domain.name, slug: guide.domain.slug },
      subdomain: { name: guide.subdomain.name, slug: guide.subdomain.slug },
      tool: guide.tool ? { id: guide.tool.id, name: guide.tool.name, slug: guide.tool.slug } : undefined,
      reviewer: guide.reviewer,
      sources: guide.sources,
      lastVerified: guide.lastVerified,
    };
  } catch (error) {
    console.error('Error parsing guide content:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const guide = await getGuide(params.slug);

  if (!guide) {
    return {
      title: 'Guide Not Found | Baobab Nigeria',
      description: 'The guide you are looking for does not exist on Baobab.',
    };
  }

  const title = `${guide.title} | Baobab Nigeria`;
  const description = guide.description || guide.subtitle || `Learn how to ${guide.title.toLowerCase()} in Nigeria with step-by-step instructions.`;
  const keywords = [
    guide.title,
    guide.domain.name,
    guide.subdomain.name,
    'Nigeria',
    'guide',
    'how to',
  ].join(', ');

  const url = `https://baobab.ng/guides/${guide.slug}`;
  const imageUrl = `https://baobab.ng/og-images/${guide.domain.slug}.jpg`;

  return {
    title,
    description: description.slice(0, 160),
    keywords,
    authors: guide.reviewer ? [{ name: guide.reviewer.name }] : undefined,
    creator: guide.reviewer?.name || 'Baobab',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: guide.title,
      description: description.slice(0, 160),
      url,
      type: 'article',
      images: [{ url, width: 1200, height: 630, alt: guide.title }],
      publishedTime: guide.lastVerified?.toISOString(),
      modifiedTime: new Date().toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: description.slice(0, 160),
      creator: '@baobab_ng',
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  const guides = await prisma.guide.findMany({
    where: { isDeleted: false },
    select: { slug: true },
  });
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function GuidePage({
  params,
}: {
  params: { slug: string };
}) {
  const guide = await getGuide(params.slug);

  if (!guide) {
    notFound();
  }

  const imageUrl = `https://baobab.ng/og-images/${guide.domain.slug}.jpg`;

  return (
    <>
      {/* HowTo Schema */}
      <HowToSchema
        title={guide.title}
        description={guide.description || guide.subtitle}
        image={imageUrl}
        author={guide.reviewer?.name}
        datePublished={new Date().toISOString()}
        dateModified={new Date().toISOString()}
        estimatedTime={guide.content?.timeline?.[0]?.estimatedTime || '2 hours'}
        estimatedCost={guide.content?.timeline?.[0]?.cost || '₦50,000'}
        steps={guide.content?.timeline?.map((step: any) => ({
          name: `Step ${step.stepNumber}`,
          description: step.description,
        })) || []}
      />

      {/* Article Schema */}
      <ArticleSchema
        headline={guide.title}
        description={guide.description || guide.subtitle}
        image={imageUrl}
        author={guide.reviewer?.name}
        datePublished={new Date().toISOString()}
        dateModified={new Date().toISOString()}
      />

      {/* Guide Page Component */}
      <GuidePageTemplate
        guide={{
          title: guide.title,
          subtitle: guide.subtitle,
          domainName: guide.domain.name,
          subdomainName: guide.subdomain.name,
          imageUrl,
          reviewerName: guide.reviewer?.name,
          lastVerified: guide.lastVerified?.toISOString(),
        }}
        content={guide.content}
      />
    </>
  );
}

'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/SEO/OptimizedImage';
import { getGuideImageAlt } from '@/lib/alt-text-manager';
import { BreadcrumbNavigation } from '@/components/SEO/InternalLinks';
import { SocialShareButtons } from '@/components/SEO/SocialShareButtons';

interface GuideContent {
  quickAnswer?: string;
  overview?: string;
  definitions?: GuideDefinition[];
  requirements?: GuideRequirement[];
  timeline?: GuideStep[];
  regulatory?: string;
  stats?: GuideStat[];
  commonMistakes?: GuideMistake[];
  relatedGuides?: RelatedLink[];
  relatedTools?: RelatedLink[];
  directoryCrossSell?: DirectoryCrossSell;
  feedback?: FeedbackSection;
}

interface GuideDefinition {
  term: string;
  definition: string;
  example?: string;
}

interface GuideRequirement {
  title: string;
  description: string;
  isMandatory?: boolean;
  notes?: string;
}

interface GuideStep {
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime?: string;
  inputs?: string[];
  outputs?: string[];
  cost?: string;
}

interface GuideStat {
  label: string;
  value: string;
  unit: string;
  source: string;
}

interface GuideMistake {
  title: string;
  description: string;
  solution: string;
  realExample?: string;
}

interface RelatedLink {
  slug: string;
  title: string;
  description?: string;
}

interface DirectoryCrossSell {
  title: string;
  category: string;
  description: string;
  listings?: DirectoryListing[];
}

interface DirectoryListing {
  id: string;
  name: string;
  description: string;
  verified: boolean;
  premium: boolean;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

interface FeedbackSection {
  reportOutdated?: {
    title: string;
    description: string;
  };
}

interface GuidePageProps {
  guide: {
    title: string;
    subtitle?: string;
    domainName: string;
    subdomainName: string;
    imageUrl: string;
    reviewerName?: string;
    lastVerified?: string;
  };
  content: GuideContent;
}

export function GuidePageTemplate({ guide, content }: GuidePageProps) {
  // Breadcrumb data
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: guide.domainName, url: `/guides/${guide.domainName.toLowerCase()}` },
    { name: guide.title, url: `/guides/${guide.slug}` },
  ];

  return (
    <article className="max-w-3xl mx-auto py-8 px-4">
      {/* Hero Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">
            {guide.domainName}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
            {guide.subdomainName}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {guide.title}
        </h1>

        {guide.subtitle && (
          <p className="text-xl text-gray-600 mb-4">{guide.subtitle}</p>
        )}

        {guide.reviewerName && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium">Reviewed by:</span>
            <span>{guide.reviewerName}</span>
          </div>
        )}

        {guide.lastVerified && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
            <span>🔍 Last verified:</span>
            <span>{new Date(guide.lastVerified).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Guide Header Image */}
      {guide.imageUrl && (
        <div className="mb-8 -mx-4 sm:rounded-lg overflow-hidden">
          <OptimizedImage
            src={guide.imageUrl}
            alt={getGuideImageAlt(guide.title, guide.domainName)}
            width={1200}
            height={400}
            priority={true}
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
            caption={`${guide.title} - Guide for Nigeria`}
          />
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <BreadcrumbNavigation items={breadcrumbs} className="mb-8" />

      {/* Quick Answer Box */}
      {content.quickAnswer && (
        <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Quick Answer
          </h2>
          <p className="text-gray-800">{content.quickAnswer}</p>
        </div>
      )}

      {/* Overview */}
      {content.overview && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="prose max-w-none text-gray-700">
            {content.overview}
          </div>
        </section>
      )}

      {/* Understanding the Basics */}
      {content.definitions && content.definitions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Understanding the Basics
          </h2>
          <div className="space-y-4">
            {content.definitions.map((def, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">{def.term}</h3>
                <p className="text-gray-700 text-sm">{def.definition}</p>
                {def.example && (
                  <p className="text-gray-600 text-sm mt-2">
                    <strong>Example:</strong> {def.example}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Requirements Checklist */}
      {content.requirements && content.requirements.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
          <div className="space-y-3">
            {content.requirements.map((req, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  {req.isMandatory ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-gray-400">○</span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{req.title}</h3>
                  <p className="text-gray-700 text-sm">{req.description}</p>
                  {req.notes && (
                    <p className="text-gray-600 text-xs mt-1">{req.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Timeline/Steps */}
      {content.timeline && content.timeline.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Step-by-Step Process</h2>
          <div className="space-y-6">
            {content.timeline.map((step) => (
              <div key={step.stepNumber} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.stepNumber}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <div className="prose max-w-none text-gray-700 text-sm">
                      {step.description}
                    </div>
                    {step.estimatedTime && (
                      <div className="mt-3 flex gap-4 text-xs text-gray-600">
                        {step.estimatedTime && (
                          <span className="flex items-center">
                            ⏱️ {step.estimatedTime}
                          </span>
                        )}
                        {step.cost && (
                          <span className="flex items-center text-green-600">
                            💰 {step.cost}
                          </span>
                        )}
                      </div>
                    )}
                    {step.inputs && step.inputs.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        <strong>Required:</strong> {step.inputs.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Regulatory Picture */}
      {content.regulatory && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            The Regulatory Picture
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg">
            <div className="prose max-w-none text-gray-700">
              {content.regulatory}
            </div>
          </div>
        </section>
      )}

      {/* Stats/Context Callout */}
      {content.stats && content.stats.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Facts</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {content.stats.map((stat, index) => (
              <div key={index} className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-700 mb-1">
                  {stat.value} <span className="text-lg">{stat.unit}</span>
                </div>
                <div className="text-sm text-gray-700">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.source}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Common Mistakes */}
      {content.commonMistakes && content.commonMistakes.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-red-700">
            What to Avoid
          </h2>
          <div className="space-y-4">
            {content.commonMistakes.map((mistake, index) => (
              <div key={index} className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">{mistake.title}</h3>
                <p className="text-gray-800 text-sm mb-2">{mistake.description}</p>
                <div className="bg-white p-3 rounded">
                  <p className="text-sm font-medium text-green-700 mb-1">
                    ✅ How to avoid:
                  </p>
                  <p className="text-sm text-gray-700">{mistake.solution}</p>
                </div>
                {mistake.realExample && (
                  <p className="text-xs text-gray-600 mt-2 italic">
                    Example: {mistake.realExample}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What Happens Next */}
      {(content.relatedGuides || content.relatedTools) && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
          
          {content.relatedGuides && content.relatedGuides.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Related Guides</h3>
              <div className="space-y-3">
                {content.relatedGuides.map((guide, index) => (
                  <Link
                    key={index}
                    href={guide.slug}
                    className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <h4 className="font-medium text-blue-800">{guide.title}</h4>
                    {guide.description && (
                      <p className="text-sm text-gray-600 mt-1">{guide.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {content.relatedTools && content.relatedTools.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Related Tools</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {content.relatedTools.map((tool, index) => (
                  <Link
                    key={index}
                    href={tool.slug}
                    className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <h4 className="font-medium text-green-800">{tool.title}</h4>
                    {tool.description && (
                      <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Directory Cross-Sell */}
      {content.directoryCrossSell && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {content.directoryCrossSell.title}
          </h2>
          <p className="text-gray-700 mb-4">
            {content.directoryCrossSell.description}
          </p>
          
          {content.directoryCrossSell.listings && (
            <div className="grid md:grid-cols-3 gap-4">
              {content.directoryCrossSell.listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{listing.name}</h3>
                    {listing.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        ✓ Verified
                      </span>
                    )}
                    {listing.premium && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{listing.description}</p>
                  {listing.contact && (
                    <div className="text-xs text-gray-500 space-y-1">
                      {listing.contact.phone && <div>📞 {listing.contact.phone}</div>}
                      {listing.contact.email && <div>✉️ {listing.contact.email}</div>}
                      {listing.contact.website && (
                        <div>🌐 <a href={listing.contact.website} className="text-blue-600 hover:underline">{listing.contact.website}</a></div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Feedback */}
      {content.feedback?.reportOutdated && (
        <section className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            {content.feedback.reportOutdated.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {content.feedback.reportOutdated.description}
          </p>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Report Issue
          </button>
        </section>
      )}

      {/* Sources */}
      {content.sources && content.sources.length > 0 && (
        <section className="mt-8 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">Sources</h2>
          <ul className="space-y-2">
            {content.sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source.url}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.title || source.url}
                </a>
                {source.verified && (
                  <span className="ml-2 text-green-600">✓ Verified</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Social Share */}
      <section className="mt-8 pt-8 border-t">
        <h3 className="font-medium mb-3">Share this guide</h3>
        <SocialShareButtons
          url={typeof window !== 'undefined' ? window.location.href : ''}
          title={guide.title}
          description={guide.subtitle || ''}
        />
      </section>
    </article>
  );
}

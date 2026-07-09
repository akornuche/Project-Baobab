'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface RelatedContent {
  title: string;
  url: string;
  description?: string;
  type: 'guide' | 'calculator' | 'directory';
  category?: string;
}

interface InternalLinksProps {
  currentUrl: string;
  currentType: 'guide' | 'calculator' | 'directory';
  currentCategory?: string;
  limit?: number;
}

export function RelatedContentLinks({
  currentUrl,
  currentType,
  currentCategory,
  limit = 3,
}: InternalLinksProps) {
  const [relatedContent, setRelatedContent] = useState<RelatedContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedContent = async () => {
      try {
        const response = await fetch('/api/related-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentUrl,
            currentType,
            currentCategory,
            limit,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setRelatedContent(data.content || []);
        }
      } catch (error) {
        console.error('Failed to fetch related content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedContent();
  }, [currentUrl, currentType, currentCategory, limit]);

  if (isLoading || relatedContent.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-semibold mb-6">Related Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedContent.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="flex items-start gap-2">
              <span className="text-xl">
                {item.type === 'guide'
                  ? '📖'
                  : item.type === 'calculator'
                    ? '🧮'
                    : '📋'}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 hover:text-blue-600">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
                {item.category && (
                  <p className="text-xs text-gray-500 mt-2">{item.category}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Breadcrumb Navigation Component with SEO schema
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNavigation({
  items,
  className = '',
}: BreadcrumbProps) {
  const schemaItems = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: schemaItems,
          }),
        }}
      />

      {/* Breadcrumb Navigation UI */}
      <nav
        className={`flex items-center space-x-2 text-sm ${className}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center space-x-2">
              {index < items.length - 1 ? (
                <>
                  <Link
                    href={item.url}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <span className="text-gray-400">/</span>
                </>
              ) : (
                <span
                  className="text-gray-900 font-semibold"
                  aria-current="page"
                >
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/**
 * Contextual Internal Links
 * Places relevant internal links within content sections
 */
interface ContextualLinkProps {
  text: string;
  url: string;
  context: string;
  position?: 'start' | 'end' | 'inline';
}

export function ContextualLink({
  text,
  url,
  context,
  position = 'inline',
}: ContextualLinkProps) {
  if (position === 'inline') {
    return (
      <Link href={url} className="text-blue-600 hover:underline font-medium">
        {text}
      </Link>
    );
  }

  return (
    <div className="my-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
      <p className="text-sm text-gray-600">
        {context}
        <Link
          href={url}
          className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
        >
          {text} →
        </Link>
      </p>
    </div>
  );
}

/**
 * Sitemap Links - Shows hierarchical structure
 */
interface SitemapLink {
  label: string;
  url: string;
  children?: SitemapLink[];
}

interface SitemapLinksProps {
  links: SitemapLink[];
  className?: string;
}

export function SitemapLinks({ links, className = '' }: SitemapLinksProps) {
  const renderLinks = (items: SitemapLink[], depth = 0) => (
    <ul
      className={`space-y-2 ${
        depth > 0 ? 'ml-4 border-l border-gray-200 pl-4' : ''
      }`}
    >
      {items.map((item) => (
        <li key={item.url}>
          <Link
            href={item.url}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {item.label}
          </Link>
          {item.children && item.children.length > 0 && (
            <>{renderLinks(item.children, depth + 1)}</>
          )}
        </li>
      ))}
    </ul>
  );

  return <div className={className}>{renderLinks(links)}</div>;
}

/**
 * Table of Contents with internal links
 */
interface TOCSection {
  id: string;
  title: string;
  level: 1 | 2 | 3;
  children?: TOCSection[];
}

interface TableOfContentsProps {
  sections: TOCSection[];
  className?: string;
}

export function TableOfContents({
  sections,
  className = '',
}: TableOfContentsProps) {
  const renderTOC = (items: TOCSection[], depth = 0) => (
    <ul className={`space-y-2 ${depth > 0 ? 'ml-4' : ''}`}>
      {items.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className={`text-blue-600 hover:text-blue-800 hover:underline ${
              depth === 0 ? 'font-medium' : ''
            }`}
          >
            {section.title}
          </a>
          {section.children && section.children.length > 0 && (
            <>{renderTOC(section.children, depth + 1)}</>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <nav className={`bg-gray-50 p-4 rounded-lg ${className}`}>
      <h3 className="font-semibold mb-4">Table of Contents</h3>
      {renderTOC(sections)}
    </nav>
  );
}

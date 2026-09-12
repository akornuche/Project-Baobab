'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearch } from '@/lib/useSearch';

interface GuideSearchProps {
  onResultSelect?: (guideSlug: string) => void;
  placeholder?: string;
  className?: string;
}

export function GuideSearch({
  onResultSelect,
  placeholder = 'Search guides...',
  className = '',
}: GuideSearchProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { results, loading, error } = useSearch('guides', { limit: 10 });

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.length >= 2) {
      await results; // Wait for search hook
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleResultClick = (slug: string) => {
    setShowResults(false);
    setQuery('');
    if (onResultSelect) {
      onResultSelect(slug);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search guides"
        />
        {loading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
          {error && (
            <div className="p-4 text-red-600">
              <p>Search error: {error}</p>
            </div>
          )}

          {results && results.length > 0 ? (
            <ul className="divide-y">
              {results.map((result: any) => (
                <li key={result.id}>
                  <Link href={`/guides/${result.slug}`}>
                    <a
                      onClick={() => handleResultClick(result.slug)}
                      className="block px-4 py-3 hover:bg-gray-50 transition"
                    >
                      <div className="font-medium text-gray-900">{result.title}</div>
                      {result.subtitle && (
                        <div className="text-sm text-gray-600 mt-1">{result.subtitle}</div>
                      )}
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {result.domain}
                        </span>
                        {result.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : !loading && query.length >= 2 ? (
            <div className="p-4 text-gray-500 text-center">No guides found</div>
          ) : null}
        </div>
      )}
    </div>
  );
}

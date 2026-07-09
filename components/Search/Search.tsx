'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  highlight?: string;
  domain?: string;
  subdomain?: string;
}

interface SearchProps {
  className?: string;
}

export function Search({ className = '' }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=10`);
        const data = await response.json();
        setResults(data.results || []);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      // Navigate to selected result
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setShowResults(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search guides, tools, directories..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setShowResults(true)}
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {showResults && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          )}

          {!isLoading && results.length === 0 && query.length >= 2 && (
            <div className="p-4 text-center text-gray-500">No results found</div>
          )}

          {!isLoading &&
            results.map((result, index) => (
              <Link
                key={result.id}
                href={`/guides/${result.id}`}
                className={`block px-4 py-3 hover:bg-gray-50 ${
                  index === selectedIndex ? 'bg-blue-50' : ''
                }`}
                onMouseDown={() => setShowResults(false)}
              >
                <h3
                  className="font-medium text-gray-900"
                  dangerouslySetInnerHTML={{ __html: result.highlight || result.title }}
                />
                {result.subtitle && (
                  <p className="text-sm text-gray-600 mt-1">{result.subtitle}</p>
                )}
                {(result.domain || result.subdomain) && (
                  <p className="text-xs text-gray-500 mt-1">
                    {result.domain} {result.subdomain && `> ${result.subdomain}`}
                  </p>
                )}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
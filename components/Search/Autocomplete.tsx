'use client';

import { useState, useEffect, useRef } from 'react';

interface AutocompleteItem {
  id: string;
  title: string;
  subtitle?: string;
  domain?: string;
  subdomain?: string;
  type: 'guide' | 'directory';
}

interface AutocompleteProps {
  placeholder?: string;
  onSelect?: (item: AutocompleteItem) => void;
}

export function SearchAutocomplete({
  placeholder = 'Search guides...',
  onSelect,
}: AutocompleteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AutocompleteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Fetch results when query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        const data = await response.json() as any;

        if (data.results && Array.isArray(data.results)) {
          // Map results to autocomplete format
          const autocompleteResults: AutocompleteItem[] = data.results
            .slice(0, 5)
            .map((result: any) => ({
              id: result.id || result.objectID,
              title: result.title || result.name,
              subtitle: result.subtitle || result.description,
              domain: result.domain,
              subdomain: result.subdomain,
              type: result.domain ? 'guide' : 'directory',
            }));

          setResults(autocompleteResults);
        }
      } catch (error) {
        console.error('Error fetching autocomplete:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      if (results[highlightIndex]) {
        handleSelect(results[highlightIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (item: AutocompleteItem) => {
    setQuery(item.title);
    setIsOpen(false);
    setHighlightIndex(0);
    onSelect?.(item);
  };

  // Highlight matching text
  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;
    
    const regex = new RegExp(`(${search})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-bold text-blue-600">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {query.length > 0 && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              setResults([]);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
          <div className="py-2">
            {isLoading ? (
              <div className="px-4 py-2 text-center text-gray-500">
                Searching...
              </div>
            ) : (
              results.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setHighlightIndex(index)}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    index === highlightIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {item.type === 'guide' ? (
                        <span className="text-2xl">📖</span>
                      ) : (
                        <span className="text-2xl">📋</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {item.domain && (
                          <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                            {item.domain}
                          </span>
                        )}
                        {item.subdomain && (
                          <span className="text-xs text-gray-500">
                            {item.subdomain}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {highlightMatch(item.title, query)}
                      </p>
                      {item.subtitle && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                          {highlightMatch(item.subtitle, query)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t">
            {isLoading ? 'Searching...' : `${results.length} results`}
          </div>
        </div>
      )}
    </div>
  );
}

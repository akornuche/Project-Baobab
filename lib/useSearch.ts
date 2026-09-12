/**
 * React Hook for Meilisearch
 * Provides search functionality with caching and debouncing
 */

import { useState, useCallback, useRef } from 'react';

export interface SearchResult {
  id: string;
  [key: string]: any;
}

export interface UseSearchOptions {
  limit?: number;
  debounceMs?: number;
  cacheMs?: number;
}

export function useSearch(indexName: string = 'guides', options: UseSearchOptions = {}) {
  const { limit = 20, debounceMs = 300, cacheMs = 5 * 60 * 1000 } = options;

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimer = useRef<NodeJS.Timeout>();
  const cacheRef = useRef<Map<string, { data: SearchResult[]; timestamp: number }>>(new Map());

  const search = useCallback(
    async (query: string, offset: number = 0) => {
      // Clear previous error
      setError(null);

      // Don't search for empty or very short queries
      if (!query || query.length < 2) {
        setResults([]);
        return;
      }

      // Check cache
      const cacheKey = `${query}:${offset}`;
      const cached = cacheRef.current.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < cacheMs) {
        setResults(cached.data);
        return;
      }

      // Clear previous debounce timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // Debounce the search
      debounceTimer.current = setTimeout(async () => {
        setLoading(true);
        try {
          const params = new URLSearchParams({
            q: query,
            index: indexName,
            limit: limit.toString(),
            offset: offset.toString(),
          });

          const response = await fetch(`/api/search?${params.toString()}`);
          if (!response.ok) {
            throw new Error('Search failed');
          }

          const data = await response.json();
          setResults(data.results || []);

          // Cache results
          cacheRef.current.set(cacheKey, {
            data: data.results || [],
            timestamp: Date.now(),
          });
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Search error');
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, debounceMs);
    },
    [indexName, limit, debounceMs, cacheMs]
  );

  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  return {
    results,
    loading,
    error,
    search,
    clearCache,
  };
}

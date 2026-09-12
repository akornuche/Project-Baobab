'use client';

import { useState, useMemo } from 'react';
import { useSearch } from '@/lib/useSearch';

interface DirectorySearchProps {
  category?: string;
  state?: string;
  onResultsChange?: (results: any[]) => void;
  className?: string;
}

export function DirectorySearch({
  category,
  state,
  onResultsChange,
  className = '',
}: DirectorySearchProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedState, setSelectedState] = useState(state || '');
  const { results, loading, error } = useSearch('directories', { limit: 50 });

  const filteredResults = useMemo(() => {
    let filtered = results || [];

    if (selectedCategory) {
      filtered = filtered.filter((r: any) => r.category === selectedCategory);
    }

    if (selectedState) {
      filtered = filtered.filter((r: any) => r.state === selectedState);
    }

    return filtered;
  }, [results, selectedCategory, selectedState]);

  const handleSearch = async (value: string) => {
    setQuery(value);
  };

  // Notify parent of results changes
  if (onResultsChange) {
    onResultsChange(filteredResults);
  }

  const categories = Array.from(new Set(results?.map((r: any) => r.category) || []));
  const states = Array.from(new Set(results?.map((r: any) => r.state) || []));

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name, email, phone..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search directories"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All States</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div>
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            Search error: {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}

        {!loading && filteredResults.length > 0 && (
          <div className="grid gap-4">
            {filteredResults.map((result: any) => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{result.name}</h3>
                    <p className="text-sm text-gray-600">{result.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {result.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        ✓ Verified
                      </span>
                    )}
                    {result.premium && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        ★ Premium
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>
                    <p className="text-gray-600">{result.category}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <p className="text-gray-600">
                      {result.city}, {result.state}
                    </p>
                  </div>
                  {result.phone && (
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <a href={`tel:${result.phone}`} className="text-blue-600 hover:underline">
                        {result.phone}
                      </a>
                    </div>
                  )}
                  {result.email && (
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <a href={`mailto:${result.email}`} className="text-blue-600 hover:underline">
                        {result.email}
                      </a>
                    </div>
                  )}
                  {result.website && (
                    <div>
                      <span className="font-medium text-gray-700">Website:</span>
                      <a href={result.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Visit
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredResults.length === 0 && query.length >= 2 && (
          <div className="text-center py-8 text-gray-500">No directories found matching your search</div>
        )}

        {!loading && filteredResults.length === 0 && !query && (
          <div className="text-center py-8 text-gray-500">Enter a search term or select filters</div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { DirectoryCard } from './DirectoryCard';

interface DirectoryListing {
  id: string;
  name: string;
  description: string;
  category: string;
  state: string;
  city: string;
  phone?: string;
  email?: string;
  website?: string;
  verified: boolean;
  premium: boolean;
}

interface DirectorySearchProps {
  listings: DirectoryListing[];
}

export function DirectorySearch({ listings }: DirectorySearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterPremium, setFilterPremium] = useState(false);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !filterCategory || listing.category === filterCategory;

    const matchesVerified = !filterVerified || listing.verified;

    const matchesPremium = !filterPremium || listing.premium;

    return matchesSearch && matchesCategory && matchesVerified && matchesPremium;
  });

  const categories = Array.from(new Set(listings.map((l) => l.category)));

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search directories..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center pt-6">
            <input
              type="checkbox"
              id="verified"
              checked={filterVerified}
              onChange={(e) => setFilterVerified(e.target.checked)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="verified" className="ml-2 block text-sm text-gray-700">
              Verified Only
            </label>
          </div>

          <div className="flex items-center pt-6">
            <input
              type="checkbox"
              id="premium"
              checked={filterPremium}
              onChange={(e) => setFilterPremium(e.target.checked)}
              className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <label htmlFor="premium" className="ml-2 block text-sm text-gray-700">
              Premium Only
            </label>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Showing {filteredListings.length} of {listings.length} listings
        </p>
        {filteredListings.length > 0 && (
          <p className="text-sm text-gray-500">
            {filteredListings.filter((l) => l.premium).length} premium listings
          </p>
        )}
      </div>

      {/* Directory Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">
            <p>No listings found matching your criteria.</p>
          </div>
        ) : (
          filteredListings.map((listing) => (
            <DirectoryCard
              key={listing.id}
              {...listing}
              onClick={() => console.log('Clicked:', listing.id)}
            />
          ))
        )}
      </div>
    </div>
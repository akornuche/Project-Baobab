'use client';

import { Ad } from './Ad';
import { useState, useEffect } from 'react';

interface AdZoneProps {
  zone: 'header' | 'sidebar' | 'content' | 'footer' | 'infeed';
  size?: 'leaderboard' | 'medium_rectangle' | 'skyscraper' | 'square' | 'half_page';
  className?: string;
  limit?: number;
}

export function AdZone({ zone, size = 'medium_rectangle', className = '', limit = 3 }: AdZoneProps) {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          zone,
          size,
          limit: limit.toString(),
        });

        const response = await fetch(`/api/ads?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch ads');

        const data = await response.json();
        setAds(data.ads || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching ads:', err);
        setError(err instanceof Error ? err.message : 'Failed to load ads');
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [zone, size, limit]);

  if (loading) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 text-center ${className}`}>
        <span className="text-sm text-gray-500">Loading ads...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 text-center ${className}`}>
        <span className="text-sm text-gray-500">Ad Zone: {zone}</span>
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 text-center ${className}`}>
        <span className="text-sm text-gray-500">No ads available</span>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {ads.map((ad) => (
        <Ad key={ad.id} ad={ad} />
      ))}
    </div>
  );
}
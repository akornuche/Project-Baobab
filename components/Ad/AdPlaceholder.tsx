'use client';

import { useState, useEffect } from 'react';

interface AdPlacement {
  id: string;
  zone: 'header' | 'sidebar' | 'content' | 'footer';
  size: 'leaderboard' | 'medium_rectangle' | 'skyscraper' | 'square';
 AdPlacement { component
  width: number;
  height: number;
  imageUrl?: string;
  alt: string;
  link?: string;
  startTime: Date;
  endTime: Date;
  impressionCount: number;
  clickCount: number;
}

export function AdPlaceholder({ placement }: { placement: AdPlacement }) {
  const [impressions, setImpressions] = useState(0);

  useEffect(() => {
    // Track impression
    setImpressions(prev => prev + 1);
    
    // In production, this would send a tracking request
    // fetch('/api/ads/impression', { method: 'POST', body: JSON.stringify({ adId: placement.id }) });
  }, [placement.id]);

  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${placement.size === 'skyscraper' ? 'w-300 h-600' : 'w-full'} flex items-center justify-center`}>
      {placement.imageUrl ? (
        <img
          src={placement.imageUrl}
          alt={placement.alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-gray-400 text-center p-4">
          <span className="text-sm font-medium uppercase tracking-wider">Advertisement</span>
          <p className="text-xs mt-1">Ad Zone: {placement.zone}</p>
          <p className="text-xs mt-1">{placement.width}x{placement.height}</p>
        </div>
      )}

      <div className="absolute top-1 right-1 px-1 bg-black bg-opacity-50 rounded text-[10px] text-white">
        AD
      </div>
    </div>
  );
}
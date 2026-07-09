'use client';

import { useState, useEffect } from 'react';

interface Ad {
  id: string;
  zone: 'header' | 'sidebar' | 'content' | 'footer' | 'infeed';
  size: 'leaderboard' | 'medium_rectangle' | 'skyscraper' | 'square' | 'half_page';
  imageUrl?: string;
  alt: string;
  link?: string;
  startTime: Date;
  endTime: Date;
  impressionCount: number;
  clickCount: number;
}

interface AdProps {
  ad: Ad;
  className?: string;
}

export function Ad({ ad, className = '' }: AdProps) {
  const [impressions, setImpressions] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Track impression
    setImpressions(prev => prev + 1);
    
    // In production, this would send a tracking request
    // fetch('/api/ads/impression', { method: 'POST', body: JSON.stringify({ adId: ad.id }) });
  }, [ad.id]);

  const handleClick = () => {
    setIsClicking(true);
    
    // In production, this would send a click tracking request
    // fetch('/api/ads/click', { method: 'POST', body: JSON.stringify({ adId: ad.id }) });
    
    // Navigate to ad link
    if (ad.link) {
      window.open(ad.link, '_blank');
    }
  };

  // Determine size based on size prop
  const sizeClasses = {
    leaderboard: 'w-full h-90',
    medium_rectangle: 'w-full h-250',
    skyscraper: 'w-300 h-600',
    square: 'w-full h-250',
    half_page: 'w-full h-600',
  };

  const sizeClass = sizeClasses[ad.size];

  return (
    <div 
      className={`relative bg-gray-50 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.01] ${className} ${sizeClass}`}
      onClick={handleClick}
    >
      <div className="absolute top-2 left-2">
        <span className="px-2 py-1 bg-black bg-opacity-70 rounded text-[10px] text-white font-medium uppercase tracking-wider">
          Advertisement
        </span>
      </div>

      {ad.imageUrl ? (
        <img
          src={ad.imageUrl}
          alt={ad.alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="text-center p-4">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2 block">
              Ad Space
            </span>
            <p className="text-xs text-gray-400">
              {ad.zone} • {ad.size.replace('_', ' ')}
            </p>
          </div>
        </div>
      )}

      {isClicking && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <span className="text-white font-medium">Opening advertisement...</span>
        </div>
      )}
    </div>
  );
}
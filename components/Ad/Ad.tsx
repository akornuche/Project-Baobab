'use client';

import { useState, useEffect } from 'react';

interface Ad {
  id: string;
  zone: 'header' | 'sidebar' | 'content' | 'footer' | 'infeed';
  size: 'leaderboard' | 'medium_rectangle' | 'skyscraper' | 'square' | 'half_page';
  title: string;
  imageUrl?: string;
  altText?: string;
  linkUrl?: string;
  campaign?: { advertiserName?: string };
}

interface AdProps {
  ad: Ad;
  className?: string;
}

export function Ad({ ad, className = '' }: AdProps) {
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    // Track impression on mount
    if (!tracked) {
      trackImpression();
      setTracked(true);
    }
  }, [ad.id, tracked]);

  const trackImpression = async () => {
    try {
      await fetch('/api/ads/track/impression', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: ad.id }),
      });
    } catch (error) {
      console.error('Failed to track impression:', error);
    }
  };

  const trackClick = async () => {
    try {
      await fetch('/api/ads/track/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: ad.id }),
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  const handleClick = async () => {
    await trackClick();
    
    if (ad.linkUrl) {
      window.open(ad.linkUrl, '_blank');
    }
  };

  // Determine size classes
  const sizeClasses: Record<string, string> = {
    leaderboard: 'w-full h-[90px]',
    medium_rectangle: 'w-full h-[250px]',
    skyscraper: 'w-[300px] h-[600px]',
    square: 'w-full h-[250px]',
    half_page: 'w-full h-[600px]',
  };

  const sizeClass = sizeClasses[ad.size] || sizeClasses.medium_rectangle;

  return (
    <div 
      className={`relative bg-gray-50 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.01] ${className} ${sizeClass}`}
      onClick={handleClick}
      role="img"
      aria-label={ad.altText || `Advertisement: ${ad.title}`}
    >
      <div className="absolute top-2 left-2 z-10">
        <span className="px-2 py-1 bg-black bg-opacity-70 rounded text-[10px] text-white font-medium uppercase tracking-wider">
          Advertisement
        </span>
      </div>

      {ad.imageUrl ? (
        <img
          src={ad.imageUrl}
          alt={ad.altText || ad.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="text-center p-4">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2 block">
              {ad.title}
            </span>
            {ad.campaign?.advertiserName && (
              <p className="text-xs text-gray-500">
                by {ad.campaign.advertiserName}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { Ad } from './Ad';
import { useState, useEffect } from 'react';

interface AdZoneProps {
  zone: 'header' | 'sidebar' | 'content' | 'footer' | 'infeed';
  size?: 'leaderboard' | 'medium_rectangle' | 'skyscraper' | 'square' | 'half_page';
  className?: string;
}

// Placeholder ads data for demo
const mockAds: Record<string, any[]> = {
  header: [
    {
      id: 'header-ad-1',
      zone: 'header',
      size: 'leaderboard',
      imageUrl: 'https://placehold.co/728x90/e2e8f0/475569?text=Header+Ad',
      alt: 'Header Advertisement',
      link: 'https://example.com/ad1',
      startTime: new Date('2026-01-01'),
      endTime: new Date('2027-01-01'),
      impressionCount: 0,
      clickCount: 0,
    },
  ],
  sidebar: [
    {
      id: 'sidebar-ad-1',
      zone: 'sidebar',
      size: 'skyscraper',
      imageUrl: 'https://placehold.co/300x600/e2e8f0/475569?text=Sidebar+Ad',
      alt: 'Sidebar Advertisement',
      link: 'https://example.com/ad2',
      startTime: new Date('2026-01-01'),
      endTime: new Date('2027-01-01'),
      impressionCount: 0,
      clickCount: 0,
    },
  ],
  content: [
    {
      id: 'content-ad-1',
      zone: 'content',
      size: 'medium_rectangle',
      imageUrl: 'https://placehold.co/300x250/e2e8f0/475569?text=Content+Ad',
      alt: 'Content Advertisement',
      link: 'https://example.com/ad3',
      startTime: new Date('2026-01-01'),
      endTime: new Date('2027-01-01'),
      impressionCount: 0,
      clickCount: 0,
    },
  ],
  footer: [
    {
      id: 'footer-ad-1',
      zone: 'footer',
      size: 'leaderboard',
      imageUrl: 'https://placehold.co/728x90/e2e8f0/475569?text=Footer+Ad',
      alt: 'Footer Advertisement',
      link: 'https://example.com/ad4',
      startTime: new Date('2026-01-01'),
      endTime: new Date('2027-01-01'),
      impressionCount: 0,
      clickCount: 0,
    },
  ],
  infeed: [
    {
      id: 'infeed-ad-1',
      zone: 'infeed',
      size: 'medium_rectangle',
      imageUrl: 'https://placehold.co/300x250/e2e8f0/475569?text=In+Feed+Ad',
      alt: 'In-Feed Advertisement',
      link: 'https://example.com/ad5',
      startTime: new Date('2026-01-01'),
      endTime: new Date('2027-01-01'),
      impressionCount: 0,
      clickCount: 0,
    },
  ],
};

export function AdZone({ zone, size = 'medium_rectangle', className = '' }: AdZoneProps) {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    // In production, this would fetch ads from the API
    // fetch(`/api/ads?zone=${zone}&size=${size}`)
    const zoneAds = mockAds[zone] || [];
    
    // Filter by size if specified
    const filteredAds = size ? zoneAds.filter(ad => ad.size === size) : zoneAds;
    setAds(filteredAds);
  }, [zone, size]);

  if (ads.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg p-4 text-center ${className}`}>
        <span className="text-sm text-gray-500">Ad Zone: {zone}</span>
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
'use client';

import { AdZone } from './AdZone';

interface DisplayAdsProps {
  className?: string;
}

export function DisplayAds({ className = '' }: DisplayAdsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Ad Zone */}
      <AdZone zone="header" size="leaderboard" className="hidden lg:block" />

      {/* Sidebar Ad Zone */}
      <div className="hidden lg:block">
        <AdZone zone="sidebar" size="skyscraper" />
      </div>

      {/* Content Ad Zone */}
      <AdZone zone="content" size="medium_rectangle" />

      {/* Footer Ad Zone */}
      <AdZone zone="footer" size="leaderboard" />
    </div>
  );
}
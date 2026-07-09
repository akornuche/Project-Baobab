'use client';

interface PremiumBadgeProps {
  isPremium: boolean;
  className?: string;
}

export function PremiumBadge({ isPremium, className = '' }: PremiumBadgeProps) {
  if (!isPremium) return null;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-sm ${className}`}>
      <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
      Premium
    </span>
  );
}
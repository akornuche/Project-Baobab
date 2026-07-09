'use client';

interface VerifiedBadgeProps {
  isVerified: boolean;
  className?: string;
}

export function VerifiedBadge({ isVerified, className = '' }: VerifiedBadgeProps) {
  if (!isVerified) return null;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ${className}`}>
      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
      Verified
    </span>
  );
}
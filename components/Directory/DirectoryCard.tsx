'use client';

import { PremiumBadge } from './PremiumBadge';
import { VerifiedBadge } from './VerifiedBadge';

interface DirectoryCardProps {
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
  onClick?: () => void;
  className?: string;
}

export function DirectoryCard({
  id,
  name,
  description,
  category,
  state,
  city,
  phone,
  email,
  website,
  verified,
  premium,
  onClick,
  className = '',
}: DirectoryCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              {name}
              <PremiumBadge isPremium={premium} />
              <VerifiedBadge isVerified={verified} />
            </h3>
            <p className="text-sm text-gray-500 mt-1">{category}</p>
          </div>
          <div className="flex gap-2">
            {verified && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                ✓
              </span>
            )}
            {premium && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-50 text-yellow-700">
                ⭐
              </span>
            )}
          </div>
        </div>

        {description && <p className="text-gray-600 mb-4 text-sm">{description}</p>}

        <div className="space-y-2">
          {(phone || email || website) && (
            <div className="flex flex-wrap gap-2">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  📞 {phone}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  ✉️ {email}
                </a>
              )}
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  🌐 Website
                </a>
              )}
            </div>
          )}

          <div className="text-sm text-gray-500 mt-2">
            📍 {city}, {state}
          </div>
        </div>
      </div>

      {premium && (
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-5 py-3 rounded-b-lg">
          <p className="text-xs text-yellow-800 text-center">
            ⭐ Premium listing - verified and promoted
          </p>
        </div>
      )}
    </div>
  );
}
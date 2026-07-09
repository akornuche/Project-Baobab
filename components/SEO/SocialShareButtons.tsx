'use client';

import React from 'react';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  via?: string;
  hashtags?: string[];
}

export function SocialShareButtons({
  url,
  title,
  description,
  image,
  via = 'baobab_ng',
  hashtags = ['Nigeria', 'Guide', 'HowTo'],
}: SocialShareButtonsProps) {
  // Encode URL components
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);
  const encodedHashtags = hashtags.map(encodeURIComponent).join(',');

  // Social share URLs
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=${via}&hashtags=${encodedHashtags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };

  return (
    <div className="flex flex-wrap gap-3 py-4 border-t border-b">
      <span className="text-sm font-semibold text-gray-600 py-2">Share:</span>

      {/* Twitter */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z" />
        </svg>
        <span className="ml-2 text-sm font-medium hidden sm:inline">Twitter</span>
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z" />
        </svg>
        <span className="ml-2 text-sm font-medium hidden sm:inline">Facebook</span>
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
        <span className="ml-2 text-sm font-medium hidden sm:inline">LinkedIn</span>
      </a>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.364-3.905 6.75-1.896 10.334 1.926 3.482 6.519 4.694 10.047 2.759l.335-.196 3.497.91-.923-3.022.156-.251a9.046 9.046 0 001.4-5.251c-.393-5.02-4.945-8.986-10.009-8.986" />
        </svg>
        <span className="ml-2 text-sm font-medium hidden sm:inline">WhatsApp</span>
      </a>

      {/* Email */}
      <a
        href={shareLinks.email}
        className="inline-flex items-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        aria-label="Share via Email"
        title="Share via Email"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="ml-2 text-sm font-medium hidden sm:inline">Email</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        }}
        className="inline-flex items-center px-3 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
        aria-label="Copy link"
        title="Copy link to clipboard"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        <span className="ml-2 text-sm font-medium hidden sm:inline">Copy</span>
      </button>
    </div>
  );
}

/**
 * Display current page URL and social preview
 */
interface SocialPreviewProps {
  title: string;
  description: string;
  image?: string;
  url: string;
}

export function SocialPreview({
  title,
  description,
  image,
  url,
}: SocialPreviewProps) {
  return (
    <div className="mt-8 border-t pt-8">
      <h3 className="text-lg font-semibold mb-4">How this page appears on social media:</h3>

      {/* Twitter Preview */}
      <div className="mb-6 border rounded-lg p-4 bg-gray-50">
        <h4 className="text-xs font-semibold text-gray-500 mb-2">Twitter</h4>
        <div className="bg-white border rounded p-3">
          <p className="text-sm font-bold text-gray-900">{title}</p>
          <p className="text-sm text-gray-600 mt-1">
            {description.length > 100
              ? description.substring(0, 97) + '...'
              : description}
          </p>
          <p className="text-xs text-blue-600 mt-2">baobab.ng</p>
        </div>
      </div>

      {/* Facebook Preview */}
      <div className="mb-6 border rounded-lg p-4 bg-gray-50">
        <h4 className="text-xs font-semibold text-gray-500 mb-2">Facebook</h4>
        <div className="bg-white border rounded overflow-hidden">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-32 object-cover"
            />
          )}
          <div className="p-3">
            <p className="text-sm text-gray-500">Baobab Nigeria</p>
            <p className="text-sm font-bold text-gray-900 mt-1">{title}</p>
            <p className="text-sm text-gray-600 mt-1">
              {description.length > 100
                ? description.substring(0, 97) + '...'
                : description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

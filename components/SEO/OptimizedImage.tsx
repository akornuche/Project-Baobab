'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  title?: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  caption?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Optimized Image Component
 * Wraps Next.js Image with SEO best practices
 */
export function OptimizedImage({
  src,
  alt,
  title,
  width,
  height,
  priority = false,
  className = '',
  objectFit = 'cover',
  quality = 85,
  sizes,
  onLoad,
  caption,
  loading,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <figure className={className}>
      <div className="relative overflow-hidden bg-gray-100">
        {/* Skeleton loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse" />
        )}

        {/* Image */}
        {!hasError ? (
          <Image
            src={src}
            alt={alt}
            title={title || alt}
            width={width}
            height={height}
            priority={priority}
            quality={quality}
            sizes={sizes}
            loading={loading}
            className={`w-full h-auto ${
              objectFit !== 'fill' ? 'object-' + objectFit : ''
            } ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onLoadingComplete={handleLoad}
            onError={handleError}
          />
        ) : (
          /* Fallback for image errors */
          <div className="flex items-center justify-center bg-gray-200 text-gray-400 w-full h-full">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-xs">Image unavailable</p>
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * SEO-optimized responsive image
 */
export function ResponsiveImage({
  src,
  alt,
  title,
  width,
  height,
  className = '',
  priority = false,
  caption,
}: Omit<OptimizedImageProps, 'sizes' | 'quality'>) {
  const aspectRatio = (height / width) * 100;

  return (
    <div
      style={{
        paddingBottom: `${aspectRatio}%`,
      }}
      className={`relative w-full overflow-hidden bg-gray-100 ${className}`}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        priority={priority}
        quality={85}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
        className="absolute inset-0"
        caption={caption}
      />
    </div>
  );
}

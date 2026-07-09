// Simple in-memory cache for development
// In production, use Redis or Cloudflare Cache

interface CacheEntry {
  data: any;
  expires: number;
}

const cache: Record<string, CacheEntry> = {};

export function cacheGet<T>(key: string): T | null {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    delete cache[key];
    return null;
  }
  return entry.data as T;
}

export function cacheSet<T>(key: string, data: T, ttlSeconds: number = 300): void {
  cache[key] = {
    data,
    expires: Date.now() + ttlSeconds * 1000,
  };
}

export function cacheDelete(key: string): void {
  delete cache[key];
}

export function cacheClear(): void {
  Object.keys(cache).forEach((key) => {
    if (Date.now() > cache[key].expires) {
      delete cache[key];
    }
  });
}
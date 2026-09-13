/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip prerendering for all pages during build - use dynamic rendering on first request
  experimental: {
    // Disable static generation entirely to allow Vercel builds without DATABASE_URL
    allowDynamicPageRendering: true,
  },
  reactStrictMode: true,
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Rewrites for API routes
  async rewrites() {
    return {
      beforeFiles: [
        // API rewrites here if needed
      ],
    };
  },
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

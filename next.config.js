/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile pdfjs-dist to avoid syntax unsupported by older build targets.
  transpilePackages: ['pdfjs-dist'],
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        canvas: false, // Canvas error fix korar jonne
      };
      // Legacy alias-ta eখান theke remove kora hoyeche
    }
    
    // topLevelAwait support enable kora holo
    config.experiments = { 
      ...config.experiments, 
      topLevelAwait: true 
    };

    return config;
  },
};

module.exports = nextConfig;
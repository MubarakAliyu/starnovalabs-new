import path from 'node:path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack never picks up a stray lockfile
  // from a parent directory.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/mission', destination: '/about#mission', permanent: true },
      { source: '/services', destination: '/studio', permanent: true },
    ];
  },
};

export default nextConfig;

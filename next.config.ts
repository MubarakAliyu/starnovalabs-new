import path from 'node:path';

import type { NextConfig } from 'next';

/**
 * No nonce-based CSP.
 *
 * The App Router emits inline bootstrap scripts on static pages, and a nonce
 * has to be generated per request — which would force every page to render
 * dynamically and cost us the static output. 'unsafe-inline' for scripts is the
 * trade we accept to keep the site static; everything else is locked down, and
 * 'unsafe-eval' is not permitted.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: CSP },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack never picks up a stray lockfile
  // from a parent directory.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      { source: '/mission', destination: '/about#mission', permanent: true },
      { source: '/services', destination: '/studio', permanent: true },
    ];
  },
};

export default nextConfig;

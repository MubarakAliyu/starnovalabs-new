import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The lab is a development gallery and the API has nothing to index.
      disallow: ['/lab', '/api/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}

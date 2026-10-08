import type { MetadataRoute } from 'next';

import { legalPages } from '@/content/legal';
import { products } from '@/content/products';
import { work } from '@/content/work';
import { isPublishable } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';

/** Only routes we actually want indexed. /lab and the API are never here. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    '/',
    '/kids-in-tech',
    '/products',
    '/studio',
    '/work',
    '/about',
    '/partner',
    '/contact',
    ...legalPages.map((page) => `/${page.slug}`),
  ];

  const productRoutes = products
    .filter((product) => product.visible && product.indexable && product.slug !== 'kids-in-tech')
    .map((product) => product.href);

  const workRoutes = work.filter(isPublishable).map((item) => `/work/${item.slug}`);

  return [...staticRoutes, ...productRoutes, ...workRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}

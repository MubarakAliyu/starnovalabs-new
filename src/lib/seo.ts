import type { Metadata } from 'next';

import { site } from '@/content/site';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.starnovalabs.com';

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. /products/kitos. Drives the canonical. */
  path: string;
  /** Overrides the route's own OG image. */
  image?: string;
  noindex?: boolean;
  /** Use the title exactly, without the "— StarNova Labs" template. */
  absoluteTitle?: boolean;
}

/**
 * One place that decides canonical, Open Graph and Twitter for every route, so
 * no page can quietly ship without them.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
  absoluteTitle = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_NG',
      title: absoluteTitle ? title : `${title} — ${site.name}`,
      description,
      url,
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle ? title : `${title} — ${site.name}`,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

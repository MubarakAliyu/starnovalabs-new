import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LegalPageLayout } from '@/components/sections/legal/LegalPageLayout';
import { legalPageBySlug } from '@/content/legal';
import { buildMetadata } from '@/lib/seo';

const page = legalPageBySlug('safeguarding')!;

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: `/${page.slug}`,
});

export default function SafeguardingPage() {
  if (!page) notFound();
  return <LegalPageLayout page={page} />;
}

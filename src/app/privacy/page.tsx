import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LegalPageLayout } from '@/components/sections/legal/LegalPageLayout';
import { legalPageBySlug } from '@/content/legal';
import { buildMetadata } from '@/lib/seo';

const page = legalPageBySlug('privacy')!;

export const metadata: Metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: `/${page.slug}`,
});

export default function PrivacyPage() {
  if (!page) notFound();
  return <LegalPageLayout page={page} />;
}

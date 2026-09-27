import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageStub } from '@/components/sections/PageStub';
import { productSlugs, type ProductSlug } from '@/content/products';

const DETAILS: Record<ProductSlug, { name: string; label: string; lead: string }> = {
  kitos: {
    name: 'KITOS',
    label: 'Product · In testing',
    lead: 'Kids in Tech OS — the learning platform that carries students past the bootcamp: pathways, portfolios, challenges, a parent dashboard and school leaderboards.',
  },
  edustack: {
    name: 'EDUSTACK',
    label: 'Product · In scoping',
    lead: 'School management software for the institutions that host our programmes.',
  },
  skillstack: {
    name: 'SKILLSTACK',
    label: 'Product · In scoping',
    lead: 'A future-skills platform for learners who have outgrown the classroom.',
  },
};

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

function detailFor(slug: string) {
  return (productSlugs as readonly string[]).includes(slug)
    ? DETAILS[slug as ProductSlug]
    : undefined;
}

export async function generateMetadata({
  params,
}: PageProps<'/products/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const detail = detailFor(slug);
  return { title: detail ? detail.name : 'Product' };
}

export default async function ProductPage({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params;
  const detail = detailFor(slug);
  if (!detail) notFound();

  return <PageStub index="02" label={detail.label} title={detail.name} lead={detail.lead} />;
}

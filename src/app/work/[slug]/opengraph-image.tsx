import { ogImage, size, contentType } from '@/app/opengraph-image';
import { work } from '@/content/work';
import { publishable } from '@/lib/content';

export { size, contentType };
export const alt = 'StarNova Labs case study';

export function generateStaticParams() {
  return publishable(work).map((item) => ({ slug: item.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = work.find((entry) => entry.slug === slug);
  return ogImage(item?.client ?? 'Work', 'Case study');
}

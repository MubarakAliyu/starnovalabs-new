import { ogImage, size, contentType } from '@/app/opengraph-image';
import { productBySlug, productSlugs } from '@/content/products';

export { size, contentType };
export const alt = 'StarNova Labs product';

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  return ogImage(product?.name ?? 'Products', product?.category ?? 'Portfolio');
}

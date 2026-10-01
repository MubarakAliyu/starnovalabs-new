import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { ProductRow } from '@/components/ui/ProductRow';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { home } from '@/content/home';
import { products } from '@/content/products';
import { publishable } from '@/lib/content';

export function HomePortfolio() {
  const visible = publishable(products);

  return (
    <Chapter theme="paper">
      <Container>
        <SectionLabel index="03" label={home.portfolio.label} className="mb-14" />
        <RevealText as="h2" variant="lines" className="t-h2 mb-16 max-w-[18ch]">
          {home.portfolio.heading}
        </RevealText>
      </Container>

      <Container>
        <ul className="flex flex-col">
          {visible.map((product, index) => (
            <ProductRow key={product.slug} product={product} index={index} />
          ))}
        </ul>
      </Container>
    </Chapter>
  );
}

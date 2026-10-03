import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { ProductRow } from '@/components/ui/ProductRow';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { home } from '@/content/home';
import { img } from '@/content/images';
import { products } from '@/content/products';
import { publishable } from '@/lib/content';

/** Resolved here, on the server, and handed to the client row as data. */
const PREVIEWS: Record<
  string,
  { file: string; frame?: 'browser'; kind?: 'photo' | 'logo' }
> = {
  'kids-in-tech': { file: '/images/groups/cohort-classroom.jpg' },
  kitos: { file: '/images/kitos/kitos-2.png', frame: 'browser' },
  'nurala-learning': { file: '/logos/products/nurala-onLight.png', kind: 'logo' },
  edustack: { file: '/images/edustack/edustack-home.png', frame: 'browser' },
};

export function HomePortfolio() {
  const visible = publishable(products);

  return (
    <Chapter theme="paper">
      <Container>
        <SectionLabel index="03" label={home.portfolio.label} className="mb-14" />
        <RevealText as="h2" variant="lines" className="t-display-m mb-16 max-w-[18ch]">
          {home.portfolio.heading}
        </RevealText>
      </Container>

      <Container>
        <ul className="flex flex-col">
          {visible.map((product, index) => (
            <ProductRow
              key={product.slug}
              product={product}
              index={index}
              preview={
                PREVIEWS[product.slug]
                  ? {
                      image: img(PREVIEWS[product.slug]!.file),
                      frame: PREVIEWS[product.slug]!.frame,
                      kind: PREVIEWS[product.slug]!.kind,
                    }
                  : undefined
              }
            />
          ))}
        </ul>
      </Container>
    </Chapter>
  );
}

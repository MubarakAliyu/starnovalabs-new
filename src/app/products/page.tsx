import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/seo';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { MaturityStrip } from '@/components/sections/products/MaturityStrip';
import { Button } from '@/components/ui/Button';
import { ProductRow } from '@/components/ui/ProductRow';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { img } from '@/content/images';
import { productsIndex, products } from '@/content/products';
import { publishable } from '@/lib/content';

export const metadata: Metadata = buildMetadata({
  title: 'Products',
  description:
    'Programmes that prove it and platforms that scale it: Kids in Tech, KITOS, EduStack, NurAla Learning and SkillStack.',
  path: '/products',
});

/**
 * Row previews are resolved here, in a server component. Looking them up inside
 * ProductRow would pull the whole generated image module — every blur
 * placeholder — into the client bundle.
 */
const PREVIEWS: Record<string, { file: string; frame?: 'browser'; kind?: 'photo' | 'logo' }> = {
  'kids-in-tech': { file: '/images/groups/cohort-classroom.jpg' },
  kitos: { file: '/images/kitos/kitos-2.png', frame: 'browser' },
  edustack: { file: '/images/edustack/edustack-home.png', frame: 'browser' },
  'nurala-learning': { file: '/logos/products/nurala-onLight.png', kind: 'logo' },
};

export default function ProductsPage() {
  const visible = publishable(products).filter((product) => product.visible);

  return (
    <>
      <Chapter theme="paper" className="pt-[calc(var(--header-h)+clamp(64px,10vw,140px))]">
        <Container>
          <SectionLabel index="01" label="Portfolio" className="mb-12" />
          <RevealText as="h1" variant="hero" className="t-display-xxl">
            {productsIndex.title}
          </RevealText>
          <div className="grid-page mt-14">
            <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-7">
              <RevealText as="p" variant="words" className="t-lead text-body">
                {productsIndex.lead}
              </RevealText>
            </div>
          </div>
        </Container>
      </Chapter>

      <Chapter theme="paper-2" tight>
        <Container>
          <SectionLabel index="02" label="Where each one stands" className="mb-12" />
          <MaturityStrip products={visible} />
        </Container>
      </Chapter>

      <Chapter theme="paper">
        <Container>
          <SectionLabel index="03" label="The portfolio" className="mb-12" />
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

      <Chapter theme="paper-2" tight>
        <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <RevealText as="h2" variant="lines" className="t-display-m max-w-[18ch]">
            {productsIndex.cta.heading}
          </RevealText>
          <Button href={productsIndex.cta.href} variant="primary" size="lg" arrow>
            {productsIndex.cta.label}
          </Button>
        </Container>
      </Chapter>
    </>
  );
}

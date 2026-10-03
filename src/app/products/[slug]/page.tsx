import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { StickerPop } from '@/components/motion/StickerPop';
import { CTASection } from '@/components/sections/CTASection';
import { StageTimeline } from '@/components/sections/products/StageTimeline';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { Sticker } from '@/components/ui/Sticker';
import { img } from '@/content/images';
import {
  STAGE_FILL,
  productBySlug,
  productSlugs,
  products,
  type Product,
} from '@/content/products';
import { isPublishable } from '@/lib/content';

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/products/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: 'Product' };

  return {
    title: product.fullName ? `${product.name} — ${product.fullName}` : product.name,
    description: product.oneLiner,
    robots: product.indexable ? undefined : { index: false, follow: false },
  };
}

/** Each chapter alternates so no two adjacent bands share a colour. */
function ProductHero({ product }: { product: Product }) {
  const theme = product.accent === 'blue' ? 'blue' : product.accent === 'ink' ? 'ink' : 'navy';

  return (
    <Chapter theme={theme} className="pt-[calc(var(--header-h)+clamp(64px,10vw,140px))]">
      <Container>
        <SectionLabel index="01" label={product.category} theme="dark" className="mb-12" />

        <div className="grid-page items-end">
          <div className="col-span-4 sm:col-span-8 lg:col-span-7">
            <RevealText as="h1" variant="hero" className="t-display-xxl">
              {product.name}
            </RevealText>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {product.fullName ? (
                <StickerPop delay={0.3}>
                  <Sticker fill="white" rotate={-3}>
                    {product.fullName}
                  </Sticker>
                </StickerPop>
              ) : null}
              <StickerPop delay={0.38}>
                <Sticker fill={STAGE_FILL[product.stage]} rotate={2}>
                  {product.stageLabel}
                </Sticker>
              </StickerPop>
            </div>

            <RevealText as="p" variant="words" className="t-lead mt-10 max-w-[46ch] opacity-90">
              {product.oneLiner}
            </RevealText>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              {/* An empty href means the destination is not public yet. */}
              {product.cta.href ? (
                <Button href={product.cta.href} variant="primary" size="lg" arrow>
                  {product.cta.label}
                </Button>
              ) : null}
              {product.secondaryCta ? (
                <Button href={product.secondaryCta.href} variant="secondary" size="lg" arrow>
                  {product.secondaryCta.label}
                </Button>
              ) : null}
            </div>
          </div>

          {product.logo ? (
            <div className="col-span-4 mt-14 sm:col-span-5 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <div className="flex items-center justify-center bg-white p-12">
                <Photo
                  image={img(product.logo)}
                  sizes="(min-width: 1024px) 28vw, 60vw"
                  fit="contain"
                  className="aspect-16/10 w-full bg-transparent"
                />
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </Chapter>
  );
}

export default async function ProductPage({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params;
  const product = productBySlug(slug);

  // Invisible products have no page at all.
  if (!product || !product.visible || slug === 'kids-in-tech') notFound();

  const related = products.filter(
    (other) => other.visible && other.slug !== product.slug && isPublishable(other),
  );
  // Screens only ship once there are real ones to show.
  const showScreens = product.images.length > 0;

  return (
    <>
      <ProductHero product={product} />

      {product.problem || product.intro ? (
        <Chapter theme="paper">
          <Container>
            <SectionLabel index="02" label="Why it exists" className="mb-14" />
            <div className="grid-page">
              {product.problem ? (
                <div className="col-span-4 sm:col-span-8 lg:col-span-6">
                  <RevealText as="h2" variant="lines" className="t-display-m">
                    {product.problem}
                  </RevealText>
                </div>
              ) : null}
              {product.intro ? (
                <div className="col-span-4 mt-10 sm:col-span-6 lg:col-span-5 lg:col-start-8 lg:mt-0">
                  <RevealText as="p" variant="words" className="t-body text-body">
                    {product.intro}
                  </RevealText>
                </div>
              ) : null}
            </div>
          </Container>
        </Chapter>
      ) : null}

      {product.audiences?.length ? (
        <Chapter theme="paper-2" tight>
          <Container>
            <SectionLabel index="03" label="Who it is for" className="mb-10" />
            <ul className="flex flex-wrap items-center gap-4">
              {product.audiences.map((audience, index) => (
                <li key={audience}>
                  <StickerPop delay={0.1 + index * 0.06}>
                    <Sticker fill={index % 2 === 0 ? 'white' : 'blue'} rotate={index % 2 ? 2 : -2}>
                      {audience}
                    </Sticker>
                  </StickerPop>
                </li>
              ))}
            </ul>
          </Container>
        </Chapter>
      ) : null}

      {product.features?.length ? (
        <Chapter theme="paper">
          <Container>
            <SectionLabel index="04" label="What it does" className="mb-14" />
            <ul className="grid gap-10 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
              {product.features.map((feature) => (
                <li key={feature.title} className="flex flex-col gap-4 border-t border-line pt-6">
                  <StarGlyph className="h-4 w-4 text-blue" />
                  <h3 className="t-h3 flex flex-wrap items-center gap-3">
                    {feature.title}
                    {feature.roadmap === 'later' ? (
                      <span className="t-label text-muted">Coming later</span>
                    ) : null}
                  </h3>
                  <p className="t-body text-body">{feature.body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Chapter>
      ) : null}

      {showScreens ? (
        <Chapter theme="navy">
          <Container>
            <SectionLabel index="05" label="Screens" theme="dark" className="mb-14" />
            <ul className="grid gap-10 lg:grid-cols-2">
              {product.images.map((file) => (
                <li key={file}>
                  <Photo
                    image={img(file)}
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    frame="browser"
                    className="aspect-16/10"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Chapter>
      ) : null}

      {product.roadmap?.length ? (
        <Chapter theme="paper">
          <Container>
            <SectionLabel index="06" label="Roadmap" className="mb-14" />
            <StageTimeline phases={product.roadmap} />
            {product.roadmapNote ? (
              <p className="t-label mt-12 text-muted">{product.roadmapNote}</p>
            ) : null}
          </Container>
        </Chapter>
      ) : null}

      {related.length ? (
        <Chapter theme="paper-2" tight>
          <Container>
            <SectionLabel index="07" label="Also from StarNova" className="mb-10" />
            <ul className="flex flex-col">
              {related.map((other) => (
                <li key={other.slug} className="border-t border-line last:border-b">
                  <Button href={other.href} variant="link" arrow className="w-full justify-start py-6">
                    {other.name}
                  </Button>
                </li>
              ))}
            </ul>
          </Container>
        </Chapter>
      ) : null}

      <CTASection
        headline="BUILD EDUCATION TECHNOLOGY WITH US."
        actions={[
          { label: 'Partner with us', href: '/partner#product', variant: 'accent' },
          { label: 'Contact us', href: '/contact?topic=product', variant: 'secondary' },
        ]}
        size="l"
      />
    </>
  );
}

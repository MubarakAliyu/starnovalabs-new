import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { Arrow } from '@/components/ui/Arrow';
import { BrandGraphic } from '@/components/ui/BrandGraphic';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Sticker } from '@/components/ui/Sticker';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { work } from '@/content/work';
import { isPublishable, publishable } from '@/lib/content';

/**
 * In production only permitted case studies exist. In development the example
 * entry is included so the template can be built and reviewed.
 */
export function generateStaticParams() {
  return publishable(work).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((entry) => entry.slug === slug);
  if (!item) return { title: 'Case study' };
  return {
    title: item.client,
    description: item.summary,
    // An unapproved study is never indexed, even where it renders.
    robots: item.permission ? undefined : { index: false, follow: false },
  };
}

export default async function CaseStudyPage({ params }: PageProps<'/work/[slug]'>) {
  const { slug } = await params;
  const item = work.find((entry) => entry.slug === slug);
  if (!item || !isPublishable(item)) notFound();

  const others = publishable(work).filter((entry) => entry.slug !== item.slug);
  const next = others[0];

  return (
    <>
      <Chapter theme="navy" className="pt-[calc(var(--header-h)+clamp(64px,10vw,140px))]">
        <Container>
          <SectionLabel index="01" label="Case study" theme="dark" className="mb-12" />
          <RevealText as="h1" variant="hero" className="t-display-xl">
            {item.client}
          </RevealText>

          <dl className="mt-14 grid gap-8 sm:grid-cols-3">
            {item.sector ? (
              <div>
                <dt className="t-label text-paper/50">Sector</dt>
                <dd className="t-body mt-2">{item.sector}</dd>
              </div>
            ) : null}
            {item.year ? (
              <div>
                <dt className="t-label text-paper/50">Year</dt>
                <dd className="t-body mt-2">{item.year}</dd>
              </div>
            ) : null}
            <div>
              <dt className="t-label text-paper/50">Services</dt>
              <dd className="mt-2 flex flex-wrap gap-3">
                {item.services.map((service) => (
                  <Sticker key={service} fill="white" rotate={-2}>
                    {service}
                  </Sticker>
                ))}
              </dd>
            </div>
          </dl>
        </Container>
      </Chapter>

      {item.challenge ? (
        <Chapter theme="paper">
          <Container>
            <SectionLabel index="02" label="The challenge" className="mb-12" />
            <RevealText as="h2" variant="lines" className="t-display-m max-w-[18ch]">
              {item.challenge}
            </RevealText>
          </Container>
        </Chapter>
      ) : null}

      {item.approach ? (
        <Chapter theme="paper-2">
          <Container>
            <SectionLabel index="03" label="The approach" className="mb-12" />
            <div className="grid-page">
              <div className="col-span-4 sm:col-span-6 lg:col-span-5">
                <RevealText as="p" variant="words" className="t-body text-body">
                  {item.approach}
                </RevealText>
              </div>
            </div>
            {/* Real imagery replaces this once a client approves it. */}
            <div className="mt-16">
              <BrandGraphic variant="blade-field" theme="blue" />
            </div>
          </Container>
        </Chapter>
      ) : null}

      {item.outcome ? (
        <Chapter theme="ink">
          <Container>
            <SectionLabel index="04" label="The outcome" theme="dark" className="mb-12" />
            <RevealText as="h2" variant="lines" className="t-display-m max-w-[18ch]">
              {item.outcome}
            </RevealText>
          </Container>
        </Chapter>
      ) : null}

      {next ? (
        <Chapter theme="paper" tight>
          <Container>
            <p className="t-label mb-6 text-body">Next case study</p>
            <TransitionLink
              href={`/work/${next.slug}`}
              className="group flex items-center gap-6 no-underline"
            >
              <span className="t-display-m link-underline">{next.client}</span>
              <Arrow className="text-4xl group-hover:-rotate-45" />
            </TransitionLink>
          </Container>
        </Chapter>
      ) : null}
    </>
  );
}

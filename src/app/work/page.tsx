import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/seo';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { CTASection } from '@/components/sections/CTASection';
import { Arrow } from '@/components/ui/Arrow';
import { BrandGraphic } from '@/components/ui/BrandGraphic';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Sticker } from '@/components/ui/Sticker';
import { work, workIndex } from '@/content/work';
import { publishable } from '@/lib/content';

export const metadata: Metadata = buildMetadata({
  title: 'Work',
  description:
    'Selected projects from the StarNova Labs studio. Case studies are published once the client has agreed to them.',
  path: '/work',
});

export default function WorkPage() {
  const cases = publishable(work);

  return (
    <>
      <Chapter theme="paper" className="pt-[calc(var(--header-h)+clamp(64px,10vw,140px))]">
        <Container>
          <SectionLabel index="01" label="Work" className="mb-12" />
          <RevealText as="h1" variant="hero" className="t-display-xxl">
            {workIndex.title}
          </RevealText>
          <div className="grid-page mt-14">
            <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-7">
              <RevealText as="p" variant="words" className="t-lead text-body">
                {workIndex.lead}
              </RevealText>
            </div>
          </div>
        </Container>
      </Chapter>

      {cases.length > 0 ? (
        <Chapter theme="paper">
          <Container>
            <ul className="grid gap-12 md:grid-cols-2 md:gap-8">
              {cases.map((item) => (
                <li key={item.slug}>
                  <TransitionLink
                    href={`/work/${item.slug}`}
                    className="group flex flex-col gap-5 no-underline"
                  >
                    <div className="overflow-hidden">
                      <BrandGraphic
                        variant="star-crop"
                        theme="navy"
                        className="transition-transform duration-[800ms] ease-out group-hover:scale-105"
                      />
                    </div>
                    <h2 className="t-h3 flex items-center gap-3">
                      {item.client}
                      <Arrow className="group-hover:-rotate-45" />
                    </h2>
                    {item.summary ? <p className="t-body text-body">{item.summary}</p> : null}
                    <ul className="flex flex-wrap gap-3">
                      {item.services.map((service) => (
                        <li key={service}>
                          <Sticker fill="white" rotate={-2}>
                            {service}
                          </Sticker>
                        </li>
                      ))}
                    </ul>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </Container>
        </Chapter>
      ) : (
        <Chapter theme="ink" tight>
          <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <RevealText as="h2" variant="lines" className="t-display-m max-w-[20ch]">
              {workIndex.empty.heading}
            </RevealText>
            <Button href={workIndex.empty.cta.href} variant="primary" size="lg" arrow>
              {workIndex.empty.cta.label}
            </Button>
          </Container>
        </Chapter>
      )}

      <CTASection
        headline="GOT SOMETHING TO BUILD?"
        actions={[
          { label: 'Start a project', href: '/contact?topic=client', variant: 'accent' },
          { label: 'Visit the Studio', href: '/studio', variant: 'secondary' },
        ]}
        size="l"
      />
    </>
  );
}

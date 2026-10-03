import type { Metadata } from 'next';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { CTASection } from '@/components/sections/CTASection';
import { ServiceRow } from '@/components/sections/studio/ServiceRow';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { img } from '@/content/images';
import { studio } from '@/content/services';
import { work } from '@/content/work';
import { publishable } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Studio',
  description: studio.hero.lead,
};

export default function StudioPage() {
  const publishedWork = publishable(work);

  return (
    <>
      <Chapter theme="paper" className="pt-[calc(var(--header-h)+clamp(64px,10vw,140px))]">
        <Container>
          <SectionLabel index="01" label={studio.hero.label} className="mb-12" />
          <RevealText as="h1" variant="hero" className="t-display-xxl">
            {studio.hero.title}
          </RevealText>
          <div className="grid-page mt-14">
            <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-7">
              <RevealText as="p" variant="words" className="t-lead text-body">
                {studio.hero.lead}
              </RevealText>
            </div>
          </div>
        </Container>
      </Chapter>

      <Chapter theme="paper">
        <Container>
          <SectionLabel index="02" label={studio.servicesSection.label} className="mb-12" />
          <RevealText as="h2" variant="lines" className="t-display-m mb-16 max-w-[16ch]">
            {studio.servicesSection.heading}
          </RevealText>

          <div className="flex flex-col">
            {studio.services.map((service) => (
              <ServiceRow key={service.title} title={service.title} items={service.items} />
            ))}
          </div>
        </Container>
      </Chapter>

      <Chapter theme="navy">
        <Container>
          <SectionLabel index="03" label={studio.process.label} theme="dark" className="mb-12" />
          <RevealText as="h2" variant="lines" className="t-display-m mb-16 max-w-[16ch]">
            {studio.process.heading}
          </RevealText>

          <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {studio.process.steps.map((step) => (
              <li key={step.index} className="flex flex-col gap-4 border-t border-line-dark pt-6">
                <span className="t-display-l text-blue-lit">{step.index}</span>
                <h3 className="t-h3">{step.title}</h3>
                <p className="t-body text-paper/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Chapter>

      <Chapter theme="paper-2">
        <Container>
          <SectionLabel index="04" label={studio.platforms.label} className="mb-12" />
          <RevealText as="h2" variant="lines" className="t-display-m mb-16 max-w-[16ch]">
            {studio.platforms.heading}
          </RevealText>

          <ul className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {studio.platforms.items.map((platform) => (
              <li key={platform.name} className="flex flex-col gap-6">
                <Photo
                  image={img(platform.image)}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  frame="browser"
                  className="aspect-16/10"
                />
                <div className="flex flex-col gap-3">
                  <h3 className="t-h3">{platform.name}</h3>
                  <p className="t-body text-body">{platform.body}</p>
                  <Button href={platform.href} variant="link" arrow className="mt-2">
                    See {platform.name}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Chapter>

      {publishedWork.length === 0 ? (
        <Chapter theme="ink" tight>
          <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <RevealText as="h2" variant="lines" className="t-display-m max-w-[20ch]">
              {studio.empty.heading}
            </RevealText>
            <Button href={studio.empty.cta.href} variant="primary" size="lg" arrow>
              {studio.empty.cta.label}
            </Button>
          </Container>
        </Chapter>
      ) : null}

      <CTASection headline={studio.cta.headline} actions={studio.cta.actions} />
    </>
  );
}

import type { Metadata } from 'next';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { img } from '@/content/images';
import { partnerPage } from '@/content/partner';

export const metadata: Metadata = {
  title: 'Partner with us',
  description: partnerPage.hero.lead,
};

export default function PartnerPage() {
  return (
    <>
      <Chapter theme="paper" className="pt-[calc(var(--header-h)+clamp(64px,10vw,140px))]">
        <Container>
          <SectionLabel index="00" label={partnerPage.hero.label} className="mb-12 max-w-2xl" />
          <RevealText as="h1" variant="hero" className="t-display-xl max-w-[12ch]">
            {partnerPage.hero.title}
          </RevealText>
          <div className="grid-page mt-14">
            <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-7">
              <RevealText as="p" variant="words" className="t-lead text-body">
                {partnerPage.hero.lead}
              </RevealText>
            </div>
          </div>
        </Container>
      </Chapter>

      {partnerPage.sections.map((section, index) => {
        const dark = section.theme === 'navy' || section.theme === 'blue';
        // Alternate which side the image sits on.
        const imageFirst = index % 2 === 1;
        return (
          <Chapter key={section.id} id={section.id} theme={section.theme}>
            <Container>
              <SectionLabel
                index={section.index}
                label={section.label}
                theme={dark ? 'dark' : 'light'}
                className="mb-14"
              />

              <div className="grid-page">
                <div className="col-span-4 sm:col-span-8 lg:col-span-6">
                  <RevealText as="h2" variant="lines" className="t-display-m">
                    {section.heading}
                  </RevealText>
                </div>

                <div className="col-span-4 mt-10 sm:col-span-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
                  <ul className="flex flex-col gap-5">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-4">
                        <StarGlyph
                          className={`mt-[0.45em] h-3 w-3 ${
                            section.theme === 'blue'
                              ? 'text-white'
                              : dark
                                ? 'text-gold-lit'
                                : 'text-blue'
                          }`}
                        />
                        <span className={`t-body ${dark ? 'opacity-90' : 'text-body'}`}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-12">
                    <Button
                      href={section.cta.href}
                      variant={dark ? 'outline' : 'solid-ink'}
                      size="lg"
                      arrow
                    >
                      {section.cta.label}
                    </Button>
                  </div>
                </div>

                <div
                  className={
                    imageFirst
                      ? 'col-span-4 mt-14 sm:col-span-8 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:mt-0'
                      : 'col-span-4 mt-14 sm:col-span-8 lg:col-span-6 lg:col-start-1 lg:mt-16'
                  }
                >
                  <Photo
                    image={img(section.image)}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    frame={section.imageFrame}
                    parallax={index % 2 === 0 ? 0.1 : -0.1}
                    className="aspect-4/3"
                  />
                </div>
              </div>
            </Container>
          </Chapter>
        );
      })}
    </>
  );
}

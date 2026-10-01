import type { Metadata } from 'next';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { CTASection } from '@/components/sections/CTASection';
import { AboutJourney } from '@/components/sections/about/AboutJourney';
import { AboutMission } from '@/components/sections/about/AboutMission';
import { AboutStory } from '@/components/sections/about/AboutStory';
import { AboutTeam } from '@/components/sections/about/AboutTeam';
import { AboutValues } from '@/components/sections/about/AboutValues';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { about } from '@/content/about';

export const metadata: Metadata = {
  title: 'About',
  description: about.hero.lead,
};

export default function AboutPage() {
  return (
    <>
      <Chapter theme="paper" className="pt-[calc(var(--header-h)+clamp(64px,10vw,140px))]">
        <Container>
          <SectionLabel index="01" label={about.hero.label} className="mb-12 max-w-2xl" />
          <RevealText as="h1" variant="hero" className="t-display-xl max-w-[14ch]">
            {about.hero.title}
          </RevealText>
          <div className="grid-page mt-14">
            <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-7">
              <RevealText as="p" variant="words" className="t-lead text-body">
                {about.hero.lead}
              </RevealText>
            </div>
          </div>
        </Container>
      </Chapter>

      <AboutStory />
      <AboutMission />
      <AboutValues />
      <AboutTeam />
      <AboutJourney />

      <CTASection headline={about.cta.headline} actions={about.cta.actions} size="l" />
    </>
  );
}

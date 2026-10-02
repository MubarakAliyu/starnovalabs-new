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
import { Photo } from '@/components/ui/Photo';
import { PhotoBand } from '@/components/ui/PhotoBand';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { about } from '@/content/about';
import { img } from '@/content/images';

export const metadata: Metadata = {
  title: 'About',
  description: about.hero.lead,
};

/** Community and classroom frames for the closing band. */
const LIFE_BAND = [
  '/images/community/break-time.jpg',
  '/images/classroom/class-in-session.jpg',
  '/images/community/board-games.jpg',
  '/images/classroom/projector-lesson.jpg',
  '/images/community/chess-match.jpg',
  '/images/classroom/coding-and-chess.jpg',
  '/images/community/chess-bootcamp2.jpg',
  '/images/classroom/room-wide-1.jpg',
].map(img);

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

        <Photo
          image={img('/images/groups/cohort-kebbi-outdoor.jpg')}
          sizes="100vw"
          priority
          reveal="up"
          className="mt-20 aspect-16/10 lg:aspect-21/9"
          wrapperClassName="full-bleed"
        />
      </Chapter>

      <AboutStory />
      <AboutMission />
      <AboutValues />
      <AboutTeam />
      <AboutJourney />

      <Chapter theme="paper-2" tight flush className="py-16">
        <Container>
          <SectionLabel index="06" label="Life at StarNova" className="mb-10" />
        </Container>
        <PhotoBand
          images={LIFE_BAND}
          ariaLabel="Photographs of life at StarNova: classes in session, breaks, board games and group work."
        />
      </Chapter>

      <CTASection headline={about.cta.headline} actions={about.cta.actions} size="l" />
    </>
  );
}

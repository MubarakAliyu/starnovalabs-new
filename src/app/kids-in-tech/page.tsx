import type { Metadata } from 'next';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { StickerPop } from '@/components/motion/StickerPop';
import { CTASection } from '@/components/sections/CTASection';
import { CohortTrack } from '@/components/sections/kit/CohortTrack';
import { PathwayDiagram } from '@/components/sections/kit/PathwayDiagram';
import { Button } from '@/components/ui/Button';
import { Gallery } from '@/components/ui/Gallery';
import { Photo } from '@/components/ui/Photo';
import { Quote } from '@/components/ui/Quote';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Stat } from '@/components/ui/Stat';
import { Sticker } from '@/components/ui/Sticker';
import { VideoLoop } from '@/components/ui/VideoLoop';
import { img } from '@/content/images';
import { kit } from '@/content/kit';
import { stats } from '@/content/stats';
import { testimonials } from '@/content/testimonials';
import { publishable } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Kids in Tech',
  description: kit.hero.lead,
};

export default function KidsInTechPage() {
  const visibleStats = publishable(stats);
  const visibleTestimonial = publishable(testimonials)[0];
  const asOf = visibleStats.find((stat) => stat.asOf)?.asOf;
  const gallery = kit.gallery.map(img);

  return (
    <>
      {/* 01 — Hero */}
      <Chapter theme="paper" className="pt-[calc(var(--header-h)+clamp(48px,8vw,120px))]">
        <Container>
          <SectionLabel index="01" label={kit.hero.label} className="mb-12" />

          <div className="grid-page items-end">
            <div className="col-span-4 sm:col-span-8 lg:col-span-7">
              <RevealText as="h1" variant="hero" className="t-display-xxl max-w-[9ch]">
                {kit.hero.title}
              </RevealText>
              <p className="t-label mt-6 text-body">{kit.hero.coBrand}</p>

              <RevealText as="p" variant="words" className="t-lead mt-10 max-w-[44ch] text-body">
                {kit.hero.lead}
              </RevealText>

              <ul className="mt-10 flex flex-wrap items-center gap-4">
                {kit.hero.stickers.map((sticker, index) => (
                  <li key={sticker.text}>
                    <StickerPop delay={0.3 + index * 0.07}>
                      <Sticker fill={sticker.fill} rotate={sticker.rotate}>
                        {sticker.text}
                      </Sticker>
                    </StickerPop>
                  </li>
                ))}
              </ul>

              <div className="mt-12 flex flex-wrap items-center gap-5">
                <Button href={kit.hero.primaryCta.href} variant="primary" size="lg" arrow>
                  {kit.hero.primaryCta.label}
                  <span className="sr-only"> (opens kidsintech.school)</span>
                </Button>
                <Button href={kit.hero.secondaryCta.href} variant="link" arrow>
                  {kit.hero.secondaryCta.label}
                </Button>
              </div>
            </div>

            <div className="col-span-4 mt-14 sm:col-span-6 lg:col-span-5 lg:col-start-8 lg:mt-0">
              <VideoLoop
                src="/video/kit-classroom-loop.mp4"
                poster="/video/kit-classroom-poster.jpg"
                label="A Kids in Tech bootcamp session in progress."
                className="aspect-4/5"
              />
            </div>
          </div>
        </Container>
      </Chapter>

      {/* 02 — The problem */}
      <Chapter theme="paper-2">
        <Container>
          <SectionLabel index="02" label={kit.problem.label} className="mb-14" />
          <div className="grid-page">
            <div className="col-span-4 sm:col-span-8 lg:col-span-6">
              <RevealText as="h2" variant="lines" className="t-display-m">
                {kit.problem.heading}
              </RevealText>
            </div>
            <div className="col-span-4 mt-10 sm:col-span-6 lg:col-span-5 lg:col-start-8 lg:mt-0">
              <RevealText as="p" variant="words" className="t-body text-body">
                {kit.problem.body}
              </RevealText>
            </div>
          </div>
        </Container>
      </Chapter>

      {/* 03 — How a cohort works */}
      <Chapter theme="paper" flush className="section-pad">
        <Container>
          <SectionLabel index="03" label={kit.cohort.label} className="mb-12" />
          <RevealText as="h2" variant="lines" className="t-display-m mb-16 max-w-[16ch]">
            {kit.cohort.heading}
          </RevealText>
        </Container>

        <Container>
          <CohortTrack skipHref="#tracks">
            {kit.cohort.steps.map((step) => (
              <article
                key={step.index}
                className="flex shrink-0 flex-col gap-5 lg:w-[30rem]"
              >
                <Photo
                  image={img(step.image)}
                  sizes="(min-width: 1024px) 30rem, 100vw"
                  className="aspect-4/3"
                />
                <span className="t-display-l text-blue">{step.index}</span>
                <h3 className="t-h3">{step.title}</h3>
                <p className="t-body max-w-[34ch] text-body">{step.body}</p>
              </article>
            ))}
          </CohortTrack>
        </Container>
      </Chapter>

      {/* 04 — Tracks: the page's blue chapter */}
      <Chapter theme="blue" id="tracks">
        <Container>
          <RevealText as="h2" variant="lines" className="t-display-m mb-16 max-w-[14ch]">
            {kit.tracks.heading}
          </RevealText>

          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {kit.tracks.items.map((track) => (
              <li
                key={track.index}
                className="group flex flex-col gap-5 bg-white p-6 text-ink transition-transform duration-[450ms] ease-out hover:-translate-y-2"
              >
                {track.video ? (
                  <VideoLoop
                    src={track.video.src}
                    poster={track.video.poster}
                    label={track.video.label}
                    className="aspect-4/3"
                  />
                ) : (
                  <Photo
                    image={img(track.image)}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="aspect-4/3"
                  />
                )}
                <span className="t-display-l text-blue transition-transform duration-[450ms] ease-out group-hover:rotate-45">
                  {track.index}
                </span>
                <h3 className="t-h3">{track.name}</h3>
                <p className="t-label text-body">{track.subtitle}</p>
                <p className="t-body text-body">{track.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-20">
            <PathwayDiagram
              label={kit.tracks.pathway.label}
              steps={kit.tracks.pathway.steps}
            />
          </div>
        </Container>
      </Chapter>

      {/* 05 — How we teach */}
      <Chapter theme="paper">
        <Container>
          <SectionLabel index="05" label={kit.teaching.label} className="mb-12" />
          <RevealText as="h2" variant="lines" className="t-display-m mb-16 max-w-[16ch]">
            {kit.teaching.heading}
          </RevealText>

          <ol className="flex flex-col">
            {kit.teaching.principles.map((principle) => (
              <li
                key={principle.index}
                className="grid grid-cols-1 gap-4 border-t border-line py-10 md:grid-cols-[6rem_1fr_1.1fr] md:items-baseline md:gap-8"
              >
                <span className="t-display-l text-blue" aria-hidden="true">
                  {principle.index}
                </span>
                <h3 className="t-h3">{principle.title}</h3>
                <RevealText as="p" variant="words" className="t-body text-body">
                  {principle.body}
                </RevealText>
              </li>
            ))}
          </ol>
        </Container>
      </Chapter>

      {/* 06 — Impact */}
      <Chapter theme="navy">
        <Container>
          <SectionLabel index="06" label={kit.impact.label} theme="dark" className="mb-12" />
          <RevealText as="h2" variant="lines" className="t-display-m mb-16 max-w-[16ch]">
            {kit.impact.heading}
          </RevealText>

          {visibleStats.length > 0 ? (
            <>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
                {visibleStats.map((stat, index) => (
                  <li key={stat.id}>
                    <Stat stat={stat} underline={index === 0} theme="dark" />
                  </li>
                ))}
              </ul>
              {asOf ? <p className="t-label mt-8 text-paper/50">Figures as of {asOf}</p> : null}
            </>
          ) : null}

          {visibleTestimonial ? (
            <Quote testimonial={visibleTestimonial} theme="dark" className="mt-20" />
          ) : null}
        </Container>
      </Chapter>

      {/* 07 — For schools / for parents */}
      <Chapter theme="paper-2">
        <Container>
          <div className="grid-page">
            <div className="col-span-4 sm:col-span-8 lg:col-span-5">
              <RevealText as="h2" variant="lines" className="t-display-m">
                {kit.audiences.schools.heading}
              </RevealText>
              <p className="t-body mt-8 text-body">{kit.audiences.schools.body}</p>
              <div className="mt-10">
                <Button href={kit.audiences.schools.cta.href} variant="primary" size="lg" arrow>
                  {kit.audiences.schools.cta.label}
                </Button>
              </div>
            </div>

            <div className="col-span-4 mt-16 sm:col-span-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
              <RevealText as="h2" variant="lines" className="t-display-m">
                {kit.audiences.parents.heading}
              </RevealText>
              <p className="t-body mt-8 text-body">{kit.audiences.parents.body}</p>
              <div className="mt-10 flex flex-col items-start gap-5">
                <Button href={kit.audiences.parents.cta.href} variant="secondary" size="lg" arrow>
                  {kit.audiences.parents.cta.label}
                  <span className="sr-only"> (opens kidsintech.school)</span>
                </Button>
                <Button href={kit.audiences.parents.safeguarding.href} variant="link" arrow>
                  {kit.audiences.parents.safeguarding.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Chapter>

      {/* 08 — Gallery */}
      <Chapter theme="paper">
        <Container>
          <SectionLabel index="08" label="Inside a cohort" className="mb-12" />
        </Container>
        <Container>
          <Gallery images={gallery} />
        </Container>
      </Chapter>

      <CTASection headline={kit.cta.headline} actions={kit.cta.actions} />
    </>
  );
}

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { StickerPop } from '@/components/motion/StickerPop';
import { Button } from '@/components/ui/Button';
import { Quote } from '@/components/ui/Quote';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Stat } from '@/components/ui/Stat';
import { Sticker } from '@/components/ui/Sticker';
import { home } from '@/content/home';
import { stats } from '@/content/stats';
import { testimonials } from '@/content/testimonials';
import { publishable } from '@/lib/content';

const { proof } = home;

export function HomeProof() {
  const visibleStats = publishable(stats);
  const visibleTestimonial = publishable(testimonials)[0];
  // Only shown when a figure actually carries a date.
  const asOf = visibleStats.find((stat) => stat.asOf)?.asOf;

  return (
    <Chapter theme="navy">
      <Container>
        <SectionLabel index="02" label={proof.label} theme="dark" className="mb-14" />

        <div className="grid-page">
          <div className="col-span-4 sm:col-span-8 lg:col-span-6">
            <RevealText as="h2" variant="lines" className="t-h2">
              {proof.heading}
            </RevealText>
          </div>
          <div className="col-span-4 mt-8 sm:col-span-6 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <RevealText as="p" variant="words" className="t-lead text-paper/80">
              {proof.lead}
            </RevealText>
          </div>
        </div>

        {visibleStats.length > 0 ? (
          <>
            <ul className="mt-24 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
              {visibleStats.map((stat, index) => (
                <li key={stat.id}>
                  <Stat stat={stat} underline={index === 0} theme="dark" />
                </li>
              ))}
            </ul>
            {asOf ? <p className="t-label mt-8 text-paper/50">Figures as of {asOf}</p> : null}
          </>
        ) : null}

        <div className="mt-20 flex flex-wrap items-center gap-5">
          {proof.tracks.map((track, index) => (
            <StickerPop key={track} delay={0.2 + index * 0.08}>
              <Sticker fill={index === 0 ? 'gold' : 'white'} rotate={index % 2 === 0 ? -3 : 3}>
                {track}
              </Sticker>
            </StickerPop>
          ))}
        </div>

        {visibleTestimonial ? (
          <Quote testimonial={visibleTestimonial} theme="dark" className="mt-20" />
        ) : null}

        <div className="mt-20">
          <Button href={proof.cta.href} variant="outline" size="lg" arrow>
            {proof.cta.label}
          </Button>
        </div>
      </Container>
    </Chapter>
  );
}

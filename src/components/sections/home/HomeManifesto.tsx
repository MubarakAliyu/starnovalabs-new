import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { ScrubbedStrip } from '@/components/motion/ScrubbedStrip';
import { Arrow } from '@/components/ui/Arrow';
import { Photo } from '@/components/ui/Photo';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { home } from '@/content/home';
import { img } from '@/content/images';

const { manifesto } = home;

/** One row of the scrubbed strip: words separated by the house arrow. */
function StripRow({ words, row }: { words: readonly string[]; row: 'a' | 'b' }) {
  return (
    <div
      data-strip-row={row}
      // The strip scrubs through ink/10 and the sentence is already on the
      // ScrubbedStrip root, so these words are decoration.
      aria-hidden="true"
      className="t-display-l flex w-max shrink-0 items-center gap-8 whitespace-nowrap uppercase"
    >
      {words.map((word, index) => (
        <span key={word} className="flex items-center gap-8">
          {word}
          {index < words.length - 1 ? (
            <Arrow className="h-[0.35em] w-[0.35em] text-blue" />
          ) : null}
        </span>
      ))}
    </div>
  );
}

export function HomeManifesto() {
  const stripLabel = `${manifesto.strip.rowA.join(' to ')}. ${manifesto.strip.rowB.join(' to ')}.`;

  return (
    <Chapter theme="paper">
      <Container>
        <SectionLabel index="01" label={manifesto.label} className="mb-14" />

        <div className="grid-page">
          <div className="col-span-4 sm:col-span-8 lg:col-span-10">
            <RevealText as="h2" variant="lines" className="t-display-l max-w-[20ch]">
              {manifesto.headline}
            </RevealText>
          </div>

          {/* A tall frame on the left, a wide one dropped below it on the
              right, so the pair reads as a spread rather than a row. */}
          <div className="col-span-4 mt-12 sm:col-span-4 lg:col-span-5 lg:col-start-1 lg:mt-20">
            <Photo
              image={img('/images/coding/mentor-at-laptop.jpg')}
              sizes="(min-width: 1024px) 40vw, 100vw"
              parallax={0.1}
              className="aspect-4/5"
            />
          </div>

          <div className="col-span-4 mt-12 sm:col-span-4 lg:col-span-5 lg:col-start-7 lg:mt-16">
            <RevealText as="p" variant="words" className="t-body text-body">
              {manifesto.body}
            </RevealText>

            <Photo
              image={img('/images/classroom/full-class-wide.jpg')}
              sizes="(min-width: 1024px) 40vw, 100vw"
              parallax={-0.12}
              className="mt-12 aspect-16/10 lg:mt-24"
            />
          </div>
        </div>
      </Container>

      <ScrubbedStrip ariaLabel={stripLabel} className="mt-24 text-ink/10">
        <StripRow words={manifesto.strip.rowA} row="a" />
        <StripRow words={manifesto.strip.rowB} row="b" />
      </ScrubbedStrip>
    </Chapter>
  );
}

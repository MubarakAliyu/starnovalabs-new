import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { ScrubbedStrip } from '@/components/motion/ScrubbedStrip';
import { Arrow } from '@/components/ui/Arrow';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { home } from '@/content/home';

const { manifesto } = home;

/** One row of the scrubbed strip: words separated by the house arrow. */
function StripRow({ words, row }: { words: readonly string[]; row: 'a' | 'b' }) {
  return (
    <div
      data-strip-row={row}
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

          <div className="col-span-4 mt-12 sm:col-span-6 lg:col-span-5 lg:col-start-7 lg:mt-16">
            <RevealText as="p" variant="words" className="t-body text-body">
              {manifesto.body}
            </RevealText>
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

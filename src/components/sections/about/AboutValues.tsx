import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { about } from '@/content/about';
import { values } from '@/content/values';

/**
 * The values render in full regardless of their pending status, and carry no
 * PENDING badge. They describe how the team already works rather than making a
 * claim about the world, so the production filter would be the wrong tool. This
 * is the single deliberate exception, flagged in the Batch 2 summary.
 */
export function AboutValues() {
  return (
    <Chapter theme="paper">
      <Container>
        <SectionLabel index="03" label={about.valuesSection.label} className="mb-14" />
        <RevealText as="h2" variant="lines" className="t-h2 mb-20 max-w-[16ch]">
          {about.valuesSection.heading}
        </RevealText>

        <ol className="flex flex-col">
          {values.map((value) => (
            <li
              key={value.index}
              className="grid grid-cols-1 gap-4 border-t border-line py-10 md:grid-cols-[6rem_1fr_1.1fr] md:items-baseline md:gap-8"
            >
              <span className="t-display-l text-blue" aria-hidden="true">
                {value.index}
              </span>
              <h3 className="t-h3">{value.title}</h3>
              <RevealText as="p" variant="words" className="t-body text-body">
                {value.body}
              </RevealText>
            </li>
          ))}
        </ol>
      </Container>
    </Chapter>
  );
}

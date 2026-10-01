import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { DrawLine } from '@/components/motion/DrawLine';
import { RevealText } from '@/components/motion/RevealText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { Sticker } from '@/components/ui/Sticker';
import { about } from '@/content/about';
import { journey } from '@/content/journey';
import { publishable } from '@/lib/content';

export function AboutJourney() {
  const items = publishable(journey);

  return (
    <Chapter theme="paper">
      <Container>
        <SectionLabel index="05" label={about.journeySection.label} className="mb-14" />
        <RevealText as="h2" variant="lines" className="t-h2 mb-20 max-w-[16ch]">
          {about.journeySection.heading}
        </RevealText>

        <div className="relative pl-10">
          {/* The rule draws itself as the list scrolls past. */}
          <div className="absolute top-2 bottom-2 left-[7px] w-px">
            <DrawLine className="h-full" />
          </div>

          <ol className="flex flex-col gap-10">
            {items.map((item) => (
              <li key={item.title} className="relative">
                {/* Decorative marker; the sticker carries the state in text. */}
                <StarGlyph className="absolute top-[0.35em] -left-10 h-4 w-4 text-gold" />
                <div className="flex flex-wrap items-center gap-4">
                  <RevealText as="h3" variant="lines" className="t-h3">
                    {item.title}
                  </RevealText>
                  <Sticker
                    fill={item.state === 'achieved' ? 'white' : 'blue'}
                    rotate={item.state === 'achieved' ? -2 : 3}
                  >
                    {item.state === 'achieved' ? 'Achieved' : 'In progress'}
                  </Sticker>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Chapter>
  );
}

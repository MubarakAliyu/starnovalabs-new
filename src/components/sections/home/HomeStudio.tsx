import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { Button } from '@/components/ui/Button';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { home } from '@/content/home';

export function HomeStudio() {
  return (
    <Chapter theme="paper-2" tight>
      <Container>
        <RevealText as="h2" variant="lines" className="t-h2 max-w-[16ch]">
          {home.studio.heading}
        </RevealText>

        <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {home.studio.columns.map((column) => (
            <li key={column.title} className="flex flex-col gap-4 border-t border-line pt-6">
              <h3 className="t-h3 flex items-center gap-3">
                <StarGlyph className="text-blue" />
                {column.title}
              </h3>
              <p className="t-body text-body">{column.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <Button href={home.studio.cta.href} variant="text-arrow" arrow>
            {home.studio.cta.label}
          </Button>
        </div>
      </Container>
    </Chapter>
  );
}

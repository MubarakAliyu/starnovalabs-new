import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { home } from '@/content/home';
import { img } from '@/content/images';

export function HomeStudio() {
  return (
    <Chapter theme="paper-2" tight>
      <Container>
        <RevealText as="h2" variant="lines" className="t-display-m max-w-[16ch]">
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

        <div className="mt-16 grid items-end gap-12 lg:grid-cols-[1fr_minmax(0,34rem)]">
          <Button href={home.studio.cta.href} variant="text-arrow" arrow>
            {home.studio.cta.label}
          </Button>

          <Photo
            image={img('/images/kitos/kitos-27.png')}
            sizes="(min-width: 1024px) 34vw, 100vw"
            frame="browser"
            caption="KITOS — a platform we built"
            className="aspect-16/10"
          />
        </div>
      </Container>
    </Chapter>
  );
}

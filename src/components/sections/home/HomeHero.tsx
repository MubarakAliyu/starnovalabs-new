import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { Parallax } from '@/components/motion/Parallax';
import { RevealText } from '@/components/motion/RevealText';
import { StickerPop } from '@/components/motion/StickerPop';
import { Button } from '@/components/ui/Button';
import { Logomark } from '@/components/ui/Logo';
import { Photo } from '@/components/ui/Photo';
import { Sticker } from '@/components/ui/Sticker';
import { home } from '@/content/home';
import { img } from '@/content/images';

/**
 * The Home hero. Three layers move at different speeds — the headline barely
 * trails, the graphic leads, the stickers run ahead — which is what gives the
 * section depth without a single drop shadow.
 */
export function HomeHero() {
  return (
    <Chapter
      theme="paper"
      className="relative pt-[calc(var(--header-h)+clamp(48px,8vw,120px))] pb-16 lg:pb-24"
    >
      <Container className="relative">
        <Parallax speed={0.1} className="relative z-10">
          {/* The sentence is announced once, from the h1's own label. */}
          <h1 className="t-display-xxl" aria-label={home.hero.lines.join(' ')}>
            {home.hero.lines.map((line, index) => {
              const last = index === home.hero.lines.length - 1;
              return (
                <span key={line} className="flex items-end gap-[0.08em]">
                  {/* w-max keeps the line tight once SplitText wraps it in
                      block-level line divs, so the mark stays on this line. */}
                  <RevealText
                    as="span"
                    variant="hero"
                    delay={index * 0.02}
                    srHidden
                    className="w-max"
                  >
                    {line}
                  </RevealText>
                  {/* Keeps real whitespace between the lines in textContent —
                      the lines are separate elements, so without this they
                      concatenate. sr-only takes it out of the layout, and it
                      sits outside the element SplitText rewrites. */}
                  {last ? null : <span className="sr-only"> </span>}
                  {/* The mark closes the sentence, set as a glyph. */}
                  {last ? (
                    <Logomark color="blue" className="mb-[0.06em] h-[0.8em] w-[0.8em]" />
                  ) : null}
                </span>
              );
            })}
          </h1>
        </Parallax>

        <div className="grid-page relative z-10 mt-16">
          <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-1">
            <RevealText as="p" variant="words" className="t-lead text-body">
              {home.hero.lead}
            </RevealText>

            <Parallax speed={0.3} disabledBelow={1024}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {home.hero.stickers.map((sticker, index) => (
                  <StickerPop key={sticker.text} delay={0.35 + index * 0.08}>
                    <Sticker fill={sticker.fill} rotate={sticker.rotate}>
                      {sticker.text}
                    </Sticker>
                  </StickerPop>
                ))}
              </div>
            </Parallax>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button href="/products" variant="solid-ink" size="lg" arrow>
                Explore our products
              </Button>
              <Button href="/partner" variant="text-arrow" arrow>
                Partner with us
              </Button>
            </div>
          </div>
        </div>

        {/*
          Last in the DOM so it reads after the call to action on a phone.
          From 1024 it lifts out of flow to sit beside the headline, overlapping
          the second line from behind.
        */}
        <Parallax
          speed={-0.15}
          disabledBelow={1024}
          className="mt-14 lg:absolute lg:top-[14%] lg:right-[var(--page-margin)] lg:z-0 lg:mt-0 lg:w-[40%]"
        >
          <Photo
            image={img('/images/groups/cohort-handbooks-wide.jpg')}
            sizes="(min-width: 1024px) 42vw, 100vw"
            priority
            caption="Kids in Tech cohort, 2026"
            className="aspect-4/3 lg:aspect-4/5"
          />
        </Parallax>
      </Container>
    </Chapter>
  );
}

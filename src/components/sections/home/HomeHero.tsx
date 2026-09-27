import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { Marquee } from '@/components/motion/Marquee';
import { RevealText } from '@/components/motion/RevealText';
import { StickerPop } from '@/components/motion/StickerPop';
import { Button } from '@/components/ui/Button';
import { Logomark } from '@/components/ui/Logo';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { Sticker } from '@/components/ui/Sticker';
import { home } from '@/content/home';

/**
 * The temporary Home hero. Its job in this batch is to prove the
 * loader → hero → curtain choreography end to end.
 */
export function HomeHero() {
  return (
    <>
      <Chapter theme="paper" className="pt-[calc(var(--header-h)+clamp(48px,8vw,120px))] pb-0">
        <Container>
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
                  {/* The mark closes the sentence, set as a glyph. */}
                  {last ? (
                    <Logomark color="blue" className="mb-[0.06em] h-[0.8em] w-[0.8em]" />
                  ) : null}
                </span>
              );
            })}
          </h1>

          <div className="grid-page mt-16">
            <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-7">
              <RevealText as="p" variant="words" className="t-lead text-body">
                {home.hero.lead}
              </RevealText>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {home.hero.stickers.map((sticker, index) => (
                  <StickerPop key={sticker.text} delay={0.35 + index * 0.08}>
                    <Sticker fill={sticker.fill} rotate={sticker.rotate}>
                      {sticker.text}
                    </Sticker>
                  </StickerPop>
                ))}
              </div>

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
        </Container>
      </Chapter>

      <Chapter theme="paper" flush className="pt-24 pb-24">
        <Marquee
          ariaLabel={`What we build: ${home.marquee.join(', ')}`}
          speed={40}
          className="full-bleed"
          items={home.marquee.map((word) => (
            <span key={word} className="t-display-l flex items-center gap-10 pr-10 uppercase">
              {word}
              <StarGlyph className="text-blue h-[0.3em] w-[0.3em]" />
            </span>
          ))}
        />
      </Chapter>
    </>
  );
}

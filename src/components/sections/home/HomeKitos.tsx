import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { StickerPop } from '@/components/motion/StickerPop';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Sticker } from '@/components/ui/Sticker';
import { home } from '@/content/home';
import { img } from '@/content/images';

const { kitos } = home;

/** The page's one full-bleed blue chapter. */
export function HomeKitos() {
  return (
    <Chapter theme="blue">
      <Container>
        <div className="grid-page items-end">
          <div className="col-span-4 sm:col-span-8 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-6">
              <RevealText as="h2" variant="lines" className="t-display-xl">
                {kitos.title}
              </RevealText>
              <StickerPop delay={0.4}>
                <Sticker fill="white" rotate={-4}>
                  {kitos.sticker}
                </Sticker>
              </StickerPop>
            </div>

            <RevealText as="p" variant="words" className="t-lead mt-10 max-w-[44ch] text-white">
              {kitos.lead}
            </RevealText>

            <ul className="mt-12 flex flex-wrap items-center gap-4">
              {kitos.features.map((feature, index) => (
                <li key={feature}>
                  <StickerPop delay={0.35 + index * 0.06}>
                    <Sticker
                      fill={index % 2 === 0 ? 'white' : 'ink'}
                      rotate={index % 2 === 0 ? -3 : 2}
                    >
                      {feature}
                    </Sticker>
                  </StickerPop>
                </li>
              ))}
            </ul>

            <div className="mt-14">
              <Button href={kitos.cta.href} variant="solid-ink" size="lg" arrow>
                {kitos.cta.label}
              </Button>
            </div>
          </div>

          {/* Three real KITOS screens, stacked with depth: the back two drift
              at different speeds so the group reads as one object. */}
          <div className="col-span-4 mt-16 sm:col-span-6 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <div className="relative">
              <Photo
                image={img('/images/kitos/kitos-31.png')}
                sizes="(min-width: 1024px) 30vw, 60vw"
                frame="browser"
                parallax={0.3}
                wrapperClassName="absolute -top-[4%] -right-[6%] hidden w-[86%] rotate-2 lg:block"
                className="aspect-16/10"
              />
              <Photo
                image={img('/images/kitos/kitos-27.png')}
                sizes="(min-width: 1024px) 30vw, 60vw"
                frame="browser"
                parallax={0.2}
                wrapperClassName="absolute top-[8%] -left-[6%] hidden w-[86%] -rotate-2 lg:block"
                className="aspect-16/10"
              />
              <Photo
                image={img('/images/kitos/kitos-2.png')}
                sizes="(min-width: 1024px) 34vw, 100vw"
                frame="browser"
                parallax={0.1}
                wrapperClassName="relative z-10"
                className="aspect-16/10"
              />
            </div>
          </div>
        </div>
      </Container>
    </Chapter>
  );
}

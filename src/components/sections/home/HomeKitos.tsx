import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { StickerPop } from '@/components/motion/StickerPop';
import { BrandGraphic } from '@/components/ui/BrandGraphic';
import { Button } from '@/components/ui/Button';
import { Sticker } from '@/components/ui/Sticker';
import { home } from '@/content/home';

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

          {/* Stands in until KITOS screenshots with mock data exist. */}
          <div className="col-span-4 mt-16 sm:col-span-6 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <BrandGraphic variant="tile" theme="paper" />
          </div>
        </div>
      </Container>
    </Chapter>
  );
}

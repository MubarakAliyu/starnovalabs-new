import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { StickerPop } from '@/components/motion/StickerPop';
import { PendingBadge } from '@/components/ui/PendingBadge';
import { Sticker } from '@/components/ui/Sticker';
import { about } from '@/content/about';
import { Photo } from '@/components/ui/Photo';
import { img } from '@/content/images';
import { site } from '@/content/site';

const { missionVision } = about;

/**
 * Vision and mission. These render in production even while their status is
 * pending: they are the approved-by-default wording, and the alternative in the
 * Company Profile still has to be reconciled (see the TODO in content/about).
 */
export function AboutMission() {
  return (
    <Chapter theme="navy" id="mission" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <Photo
          image={img('/images/groups/cohort-families.jpg')}
          sizes="100vw"
          reveal={false}
          className="h-full"
          wrapperClassName="h-full"
        />
        {/* 0.86 keeps paper text past 7:1 over the lightest part of the frame. */}
        <span className="absolute inset-0 bg-navy/[0.86]" />
      </div>

      <Container className="relative">
        <div className="grid-page gap-y-20">
          {[missionVision.vision, missionVision.mission].map((block, index) => (
            <div
              key={block.title}
              className={
                index === 0
                  ? 'col-span-4 sm:col-span-8 lg:col-span-5'
                  : 'col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-8'
              }
            >
              <h2 className="t-label mb-8 text-blue-lit">
                {block.title}
                <PendingBadge item={missionVision} />
              </h2>
              <RevealText as="p" variant="lines" className="t-h2">
                {block.body}
              </RevealText>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <StickerPop delay={0.3}>
            <Sticker fill="gold" rotate={-3}>
              {site.tagline}
            </Sticker>
          </StickerPop>
        </div>
      </Container>
    </Chapter>
  );
}

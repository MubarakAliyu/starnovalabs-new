import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { PinnedSequence } from '@/components/motion/PinnedSequence';
import { RevealText } from '@/components/motion/RevealText';
import { Photo } from '@/components/ui/Photo';
import { VideoLoop } from '@/components/ui/VideoLoop';
import { home } from '@/content/home';
import { img } from '@/content/images';

const { connects } = home;

/** One media element per panel, crossfading on the same scrub as the text. */
const MEDIA = [
  { kind: 'video' as const },
  { kind: 'screens' as const },
  { kind: 'photo' as const, file: '/images/groups/cohort-stairs.jpg' },
];

function PanelMedia({ index }: { index: number }) {
  const media = MEDIA[index];
  if (!media) return null;

  if (media.kind === 'video') {
    return (
      <VideoLoop
        src="/video/kit-classroom-loop.mp4"
        poster="/video/kit-classroom-poster.jpg"
        label="A Kids in Tech bootcamp session in progress."
        className="aspect-4/5"
      />
    );
  }

  if (media.kind === 'screens') {
    return (
      <div className="relative">
        <Photo
          image={img('/images/kitos/kitos-7.png')}
          sizes="(min-width: 1024px) 34vw, 100vw"
          frame="browser"
          wrapperClassName="absolute -top-[5%] -right-[6%] hidden w-[88%] lg:block"
          className="aspect-16/10"
          reveal={false}
        />
        <Photo
          image={img('/images/kitos/kitos-2.png')}
          sizes="(min-width: 1024px) 38vw, 100vw"
          frame="browser"
          wrapperClassName="relative z-10"
          className="aspect-16/10"
          reveal={false}
        />
      </div>
    );
  }

  return (
    <Photo
      image={img(media.file)}
      sizes="(min-width: 1024px) 38vw, 100vw"
      className="aspect-4/5"
      reveal={false}
    />
  );
}

/**
 * Three panels that step through a pinned viewport on a wide screen and stack
 * on a narrow one. The markup is the same in both cases, so the reading order
 * never depends on the scroll position.
 */
export function HomeConnects() {
  return (
    <Chapter theme="paper" flush>
      <PinnedSequence className="lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <Container className="section-pad lg:py-0">
          <RevealText as="h2" variant="lines" className="t-h2 max-w-[18ch]">
            {connects.heading}
          </RevealText>

          {/* A thin bar that fills as the sequence advances. */}
          <div
            aria-hidden="true"
            className="mt-10 hidden h-px w-full bg-line lg:block"
            data-sequence-track
          >
            <span data-sequence-progress className="block h-px w-0 bg-blue" />
          </div>

          {/* Stacked in flow on a phone; overlaid on a wide screen so the pinned
              sequence can step one panel over the last. */}
          <ol className="mt-16 grid gap-16 lg:relative lg:mt-14 lg:min-h-[52vh]">
            {connects.panels.map((panel, index) => (
              <li
                key={panel.index}
                data-panel
                className="grid gap-8 border-t border-line pt-8 lg:absolute lg:inset-x-0 lg:top-0 lg:grid-cols-2 lg:items-center lg:gap-16"
              >
                {/* Media first on a phone, beside the text from 1024. */}
                <div className="lg:order-2 lg:max-h-[46vh] lg:overflow-hidden">
                  <PanelMedia index={index} />
                </div>

                <div className="flex flex-col gap-5 lg:order-1 lg:max-w-[24ch]">
                  <span className="t-counter text-blue">{panel.index}</span>
                  <h3 className="t-h3">{panel.title}</h3>
                  <p className="t-body text-body">{panel.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </PinnedSequence>
    </Chapter>
  );
}

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { PinnedSequence } from '@/components/motion/PinnedSequence';
import { RevealText } from '@/components/motion/RevealText';
import { Photo } from '@/components/ui/Photo';
import { VideoLoop } from '@/components/ui/VideoLoop';
import { home } from '@/content/home';
import { img } from '@/content/images';

const { connects } = home;

/** One media element per step, all in the same 4:5 frame. */
function PanelMedia({ index }: { index: number }) {
  if (index === 0) {
    return (
      <VideoLoop
        src="/video/kit-classroom-loop.mp4"
        poster="/video/kit-classroom-poster.jpg"
        label="A Kids in Tech bootcamp session in progress."
        className="aspect-4/5"
      />
    );
  }

  if (index === 1) {
    return (
      <Photo
        image={img('/images/kitos/kitos-2.png')}
        sizes="(min-width: 1024px) 38vw, 100vw"
        className="aspect-4/5"
        fit="cover"
        position="top"
        reveal={false}
      />
    );
  }

  return (
    <Photo
      image={img('/images/groups/cohort-stairs.jpg')}
      sizes="(min-width: 1024px) 38vw, 100vw"
      className="aspect-4/5"
      reveal={false}
    />
  );
}

/**
 * Three steps through one pinned viewport on a wide screen, stacked on a
 * narrow one. On desktop the step list stays put on the left and only the body
 * text and the media change, so nothing ever overlaps.
 */
export function HomeConnects() {
  return (
    <Chapter theme="paper" flush>
      <PinnedSequence className="lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <Container className="section-pad lg:py-0">
          <RevealText as="h2" variant="lines" className="t-display-m max-w-[18ch]">
            {connects.heading}
          </RevealText>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
            {/* The step list: persistent on desktop, hidden on mobile where
                each block carries its own heading instead. */}
            <ol className="hidden lg:col-span-5 lg:block">
              {connects.panels.map((panel, index) => (
                <li
                  key={panel.index}
                  data-step
                  data-active={index === 0}
                  className="group flex items-center gap-5 border-l-2 border-transparent py-4 pl-5 transition-[opacity,border-color] duration-300 data-[active=false]:opacity-30 data-[active=true]:border-blue data-[active=true]:opacity-100"
                >
                  <span className="t-display-l text-blue">{panel.index}</span>
                  <span className="t-h3">{panel.title}</span>
                </li>
              ))}
            </ol>

            {/* One text slot and one media slot; the panels swap through them. */}
            <div className="relative lg:col-span-7 lg:min-h-[58vh]">
              {connects.panels.map((panel, index) => (
                <article
                  key={panel.index}
                  data-panel
                  className="grid gap-8 border-t border-line pt-8 not-first:mt-16 lg:absolute lg:inset-0 lg:mt-0 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-center lg:gap-10 lg:border-0 lg:pt-0 lg:not-first:mt-0"
                >
                  <div className="flex flex-col gap-4 lg:order-2">
                    <PanelMedia index={index} />
                  </div>

                  <div className="flex flex-col gap-4 lg:order-1">
                    {/* The mobile heading; desktop reads it from the step list. */}
                    <span className="t-counter text-blue lg:hidden">{panel.index}</span>
                    <h3 className="t-h3 lg:hidden">{panel.title}</h3>
                    <p className="t-body text-body">{panel.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Fills as the sequence advances. */}
          <div
            aria-hidden="true"
            className="mt-12 hidden h-px w-full bg-line lg:block"
            data-sequence-track
          >
            <span data-sequence-progress className="block h-px w-0 bg-blue" />
          </div>
        </Container>
      </PinnedSequence>
    </Chapter>
  );
}

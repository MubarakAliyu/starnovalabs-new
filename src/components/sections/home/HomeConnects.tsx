import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { PinnedSequence } from '@/components/motion/PinnedSequence';
import { RevealText } from '@/components/motion/RevealText';
import { home } from '@/content/home';

const { connects } = home;

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

          {/* Stacked in flow on a phone; overlaid on a wide screen so the pinned
              sequence can step one panel over the last. */}
          <ol className="mt-16 grid gap-10 lg:relative lg:mt-20 lg:min-h-[42vh]">
            {connects.panels.map((panel) => (
              <li
                key={panel.index}
                data-panel
                className="flex flex-col gap-5 border-t border-line pt-8 lg:absolute lg:inset-x-0 lg:top-0 lg:max-w-[22ch]"
              >
                <span className="t-counter text-blue">{panel.index}</span>
                <h3 className="t-h3">{panel.title}</h3>
                <p className="t-body text-body">{panel.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </PinnedSequence>
    </Chapter>
  );
}

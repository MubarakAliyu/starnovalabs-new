import { Container } from '@/components/layout/Container';
import { Chapter } from '@/components/layout/Chapter';
import { RevealText } from '@/components/motion/RevealText';
import { about } from '@/content/about';

/**
 * Deliberately asymmetric: the pull-quote holds columns 1–6 and the prose sits
 * out on 7–11, so nothing is centred (Master §4).
 */
export function AboutStory() {
  return (
    <Chapter theme="paper">
      <Container>
        <div className="grid-page">
          <figure className="col-span-4 sm:col-span-8 lg:col-span-6">
            <blockquote>
              <RevealText as="p" variant="lines" className="t-display-l">
                {about.story.quote}
              </RevealText>
            </blockquote>
            <figcaption className="t-label mt-8 text-body">
              — {about.story.attribution}
            </figcaption>
          </figure>

          <div className="col-span-4 mt-14 flex flex-col gap-6 sm:col-span-6 lg:col-span-5 lg:col-start-8 lg:mt-0">
            {about.story.body.map((paragraph) => (
              <RevealText key={paragraph} as="p" variant="words" className="t-body text-body">
                {paragraph}
              </RevealText>
            ))}
          </div>
        </div>
      </Container>
    </Chapter>
  );
}

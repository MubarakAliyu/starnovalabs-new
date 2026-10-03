import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { Gallery } from '@/components/ui/Gallery';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { img } from '@/content/images';

/** Nine frames of the programme as it actually looks. */
const GALLERY = [
  '/images/classroom/demo-day.jpg',
  '/images/community/chess-with-mentor.jpg',
  '/images/coding/girls-coding.jpg',
  '/images/groups/cohort-kebbi-outdoor.jpg',
  '/images/projects/scratch-on-laptop.jpg',
  '/images/community/foosball.jpg',
  '/images/classroom/instructor-helping.jpg',
  '/images/projects/bootcamp-handbooks.jpg',
  '/images/community/jenga.jpg',
].map(img);

export function HomeInside() {
  return (
    <Chapter theme="paper">
      <Container>
        <SectionLabel index="04" label="Inside the classroom" className="mb-14" />
        <RevealText as="h2" variant="lines" className="t-display-m mb-16 max-w-[16ch]">
          Real rooms. Real projects.
        </RevealText>
      </Container>

      <Container>
        <Gallery images={GALLERY} />
      </Container>
    </Chapter>
  );
}

import { Chapter } from '@/components/layout/Chapter';
import { Marquee } from '@/components/motion/Marquee';
import { PhotoBand } from '@/components/ui/PhotoBand';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { home } from '@/content/home';
import { img } from '@/content/images';

/** Classroom, coding and community — deliberately no group shots here. */
const BAND = [
  '/images/classroom/instructor-helping.jpg',
  '/images/coding/girls-coding.jpg',
  '/images/community/chess-with-mentor.jpg',
  '/images/coding/mentor-at-laptop.jpg',
  '/images/classroom/demo-day.jpg',
  '/images/community/foosball.jpg',
  '/images/coding/pair-coding.jpg',
  '/images/classroom/instructor-teaching.jpg',
  '/images/community/jenga.jpg',
].map(img);

export function HomeMarquee() {
  return (
    <Chapter theme="paper-2" flush className="py-20">
      <Marquee
        ariaLabel={`What we build: ${home.marquee.join(', ')}`}
        speed={40}
        className="full-bleed"
        items={home.marquee.map((word) => (
          <span key={word} className="t-display-l flex items-center gap-10 pr-10 uppercase">
            {word}
            <StarGlyph className="h-[0.3em] w-[0.3em] text-blue" />
          </span>
        ))}
      />

      <PhotoBand
        images={BAND}
        ariaLabel="Photographs from Kids in Tech sessions: students coding, instructors helping, and breaks between classes."
        className="mt-16"
      />
    </Chapter>
  );
}

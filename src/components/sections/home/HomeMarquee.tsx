import { Chapter } from '@/components/layout/Chapter';
import { Marquee } from '@/components/motion/Marquee';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { home } from '@/content/home';

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
    </Chapter>
  );
}

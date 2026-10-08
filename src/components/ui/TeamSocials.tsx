import { SOCIAL_ICONS } from '@/components/ui/social-icons';
import { TEAM_SOCIAL_LABEL, TEAM_SOCIAL_ORDER, type TeamSocial } from '@/content/team';
import { cn } from '@/lib/utils';

/**
 * A person's own accounts, as a row of marks beside their name on the team
 * card. Always drawn in the house order, whichever ones they have.
 *
 * The 20px glyph sits in a 40px hit area, which leaves 10px of padding on each
 * side. The row is pulled right by that 10px (-mr-[10px]) so the last glyph's
 * right edge lands on the container edge — flush with the portrait above it —
 * while the hit areas stay full size.
 */
export function TeamSocials({
  name,
  socials,
  className,
}: {
  name: string;
  socials?: TeamSocial[];
  className?: string;
}) {
  if (!socials || socials.length === 0) return null;

  const ordered = TEAM_SOCIAL_ORDER.map((type) =>
    socials.find((social) => social.type === type),
  ).filter((social): social is TeamSocial => Boolean(social));

  if (ordered.length === 0) return null;

  return (
    <ul className={cn('-mr-[10px] flex shrink-0 items-center gap-1', className)}>
      {ordered.map((social) => (
        <li key={social.type}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            // Says whose account it is, and that it leaves the site. A personal
            // site is not somewhere you are "on", so it gets its own phrasing.
            aria-label={
              social.type === 'website'
                ? `${name}'s personal website (opens in a new tab)`
                : `${name} on ${TEAM_SOCIAL_LABEL[social.type]} (opens in a new tab)`
            }
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-[4px]',
              'text-ink/70 transition-colors duration-200',
              'hover:text-blue focus-visible:text-blue',
            )}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
              {SOCIAL_ICONS[social.type]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

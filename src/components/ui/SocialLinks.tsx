import { SOCIAL_ICONS } from '@/components/ui/social-icons';
import { SOCIAL_OWNER_NAME, type SocialLink } from '@/content/site';
import { cn } from '@/lib/utils';

interface SocialLinksProps {
  links: readonly SocialLink[];
  /** Shows the platform name beside the mark. */
  withLabels?: boolean;
  className?: string;
}

export function SocialLinks({ links, withLabels = false, className }: SocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {links.map((social) => (
        <li key={social.url}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            // Says whose account it is, and that it leaves the site.
            aria-label={`${SOCIAL_OWNER_NAME[social.owner]} on ${social.label} (opens in a new tab)`}
            className={cn(
              'inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-[4px] px-2',
              'opacity-80 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100',
              withLabels && 'min-w-0 pr-3',
            )}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
              fill="currentColor"
            >
              {SOCIAL_ICONS[social.platform]}
            </svg>
            {withLabels ? <span className="t-label">{social.label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

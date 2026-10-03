import { SOCIAL_OWNER_NAME, type SocialLink, type SocialPlatform } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * Official marks, drawn monochrome so they take the surrounding colour and stay
 * legible on paper, navy, ink and blue alike. Inline rather than a dependency.
 */
const ICONS: Record<SocialPlatform, React.ReactNode> = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C21.6 8.65 23 10.9 23 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21h-4V9Z" />
  ),
  x: (
    <path d="M17.53 3H20.5l-6.49 7.42L21.5 21h-5.86l-4.6-6.01L5.78 21H2.8l6.94-7.93L2.5 3h6.01l4.16 5.5L17.53 3Zm-1.04 16.2h1.65L7.6 4.72H5.83L16.49 19.2Z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.58.01 4.84.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.84s-.01 3.58-.07 4.84c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.84.07s-3.58-.01-4.84-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.84c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5.01-4.74.07-.9.04-1.39.19-1.72.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.82-.32 1.72C3.41 8.9 3.4 9.26 3.4 12s.01 3.1.07 4.34c.04.9.19 1.39.32 1.72.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.82.28 1.72.32 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.39-.19 1.72-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.82.32-1.72.06-1.24.07-1.6.07-4.34s-.01-3.1-.07-4.34c-.04-.9-.19-1.39-.32-1.72a2.9 2.9 0 0 0-.69-1.06 2.9 2.9 0 0 0-1.06-.69c-.33-.13-.82-.28-1.72-.32C15.5 4.01 15.14 4 12 4Zm0 3.03a4.97 4.97 0 1 1 0 9.94 4.97 4.97 0 0 1 0-9.94Zm0 1.8a3.17 3.17 0 1 0 0 6.34 3.17 3.17 0 0 0 0-6.34Zm5.2-3.2a1.16 1.16 0 1 1 0 2.33 1.16 1.16 0 0 1 0-2.33Z" />
  ),
  youtube: (
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45a2.78 2.78 0 0 0-1.95 1.97A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
  ),
};

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
              {ICONS[social.platform]}
            </svg>
            {withLabels ? <span className="t-label">{social.label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

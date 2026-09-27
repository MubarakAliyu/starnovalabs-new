import { ChapterThemeReporter } from '@/components/layout/ChapterThemeReporter';
import { cn } from '@/lib/utils';

export type ChapterTheme = 'paper' | 'paper-2' | 'navy' | 'blue' | 'ink';

const THEMES: Record<ChapterTheme, string> = {
  paper: 'bg-paper text-ink',
  'paper-2': 'bg-paper-2 text-ink',
  navy: 'bg-navy text-paper',
  blue: 'bg-blue text-white',
  ink: 'bg-ink text-paper',
};

interface ChapterProps {
  theme?: ChapterTheme;
  /** Section rhythm. Tight sections use the shorter padding token. */
  tight?: boolean;
  /** Drop the vertical padding entirely — for full-bleed bands. */
  flush?: boolean;
  id?: string;
  as?: 'section' | 'div' | 'header' | 'footer';
  className?: string;
  children: React.ReactNode;
}

/**
 * A full-bleed art-directed band (Master §4). It publishes its theme via
 * data-theme, which the header watches so it can invert over dark chapters.
 */
export function Chapter({
  theme = 'paper',
  tight = false,
  flush = false,
  id,
  as: Tag = 'section',
  className,
  children,
}: ChapterProps) {
  return (
    <Tag
      id={id}
      data-theme={theme}
      data-chapter
      className={cn(
        'relative w-full',
        THEMES[theme],
        !flush && (tight ? 'section-pad-tight' : 'section-pad'),
        className,
      )}
    >
      <ChapterThemeReporter />
      {children}
    </Tag>
  );
}

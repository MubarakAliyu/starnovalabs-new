'use client';

import { useRef } from 'react';

import { ScrollTrigger, useGSAP } from '@/lib/gsap';

/**
 * Tells the header which chapter is currently under it, by writing
 * html[data-header-theme]. The header's colours follow in CSS, so there is no
 * React state and no re-render on every scroll.
 */
export function ChapterThemeReporter() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const chapter = ref.current?.closest<HTMLElement>('[data-chapter]');
    if (!chapter) return;
    const theme = chapter.dataset.theme ?? 'paper';

    const trigger = ScrollTrigger.create({
      trigger: chapter,
      // The band counts as "under the header" from the moment it reaches it.
      start: 'top top+=44',
      end: 'bottom top+=44',
      onToggle: (self) => {
        if (self.isActive) document.documentElement.dataset.headerTheme = theme;
      },
      onRefresh: (self) => {
        if (self.isActive) document.documentElement.dataset.headerTheme = theme;
      },
    });

    return () => trigger.kill();
  }, []);

  return <span ref={ref} aria-hidden="true" className="sr-only" />;
}

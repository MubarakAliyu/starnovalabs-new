'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef, type MouseEvent } from 'react';

import { useTransition } from '@/components/motion/TransitionProvider';
import { useLenisSafe } from '@/components/motion/SmoothScroll';
import { isExternalHref, isHashHref } from '@/lib/utils';

type TransitionLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  href: string;
};

/**
 * The only link component used for internal navigation. Plain left-clicks to a
 * different pathname run the blue curtain; everything else behaves like a
 * normal link — new tabs, modifier clicks, mailto:, tel:, external sites and
 * in-page anchors all bypass it (Master §5).
 */
export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink({ href, onClick, target, ...rest }, ref) {
    const { navigate } = useTransition();
    const pathname = usePathname();
    const lenis = useLenisSafe();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      // Anything that is not a plain left-click stays native.
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (target && target !== '_self')
      ) {
        return;
      }

      if (isExternalHref(href)) return;

      if (isHashHref(href)) {
        const node = document.querySelector(href);
        if (node && lenis) {
          event.preventDefault();
          const header = document.querySelector('header');
          lenis.scrollTo(node as HTMLElement, {
            offset: -(header?.getBoundingClientRect().height ?? 0),
            duration: 1.2,
          });
        }
        return;
      }

      const [targetPath] = href.split('#');
      if (targetPath === pathname) return;

      event.preventDefault();
      navigate(href);
    };

    return <Link ref={ref} href={href} target={target} onClick={handleClick} {...rest} />;
  },
);

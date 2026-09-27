'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

import { MenuOverlay } from '@/components/layout/MenuOverlay';
import { Magnetic } from '@/components/motion/Magnetic';
import { useMotion } from '@/components/motion/MotionProvider';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { primaryNav } from '@/content/nav';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

const MENU_ID = 'site-menu';

/**
 * Hides on the way down, returns on the way up, goes solid past 40px, and
 * inverts over dark chapters (Master §5).
 */
export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const { motion } = useMotion();
  const closeMenu = useCallback(() => setOpen(false), []);
  const pathname = usePathname();

  useGSAP(
    () => {
      const header = ref.current;
      if (!header) return;

      const show = gsap.quickTo(header, 'yPercent', { duration: 0.45, ease: EASE.out });
      let hidden = false;

      const trigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll();
          header.dataset.scrolled = y > 40 ? 'true' : 'false';

          // Never hide while the menu is open, or near the top of the page.
          if (open || y < 120 || motion === 'reduced') {
            if (hidden) {
              hidden = false;
              show(0);
            }
            return;
          }

          if (self.direction === 1 && !hidden) {
            hidden = true;
            show(-100);
          } else if (self.direction === -1 && hidden) {
            hidden = false;
            show(0);
          }
        },
      });

      return () => trigger.kill();
    },
    { dependencies: [open, motion] },
  );

  return (
    <>
      <header
        ref={ref}
        data-site-header
        data-scrolled="false"
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-18 lg:h-22',
          'border-b border-transparent',
          'data-[scrolled=true]:border-[var(--header-line)] data-[scrolled=true]:bg-[var(--header-bg)]',
        )}
      >
        <div className="container-page flex h-full items-center justify-between gap-6">
          <TransitionLink
            href="/"
            aria-label="StarNova Labs — home"
            className="relative block shrink-0"
          >
            <span data-logo-variant="onLight" className="block">
              <Logo variant="onLight" priority />
            </span>
            <span data-logo-variant="onDark" className="absolute inset-0 block">
              <Logo variant="onDark" priority />
            </span>
          </TransitionLink>

          <div className="flex items-center gap-2 lg:gap-6">
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-6">
                {primaryNav.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <TransitionLink
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className="t-label group relative flex min-h-11 items-center gap-2"
                      >
                        {active ? <StarGlyph className="text-gold" /> : null}
                        <span className="relative block overflow-hidden">
                          <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                            {item.label}
                          </span>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                          >
                            {item.label}
                          </span>
                        </span>
                      </TransitionLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden lg:block">
              <Button href="/contact" variant="solid-ink" size="md">
                Let&apos;s talk
              </Button>
            </div>

            <Magnetic className="inline-block">
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls={MENU_ID}
                className="t-label flex min-h-11 cursor-pointer items-center gap-3 px-2"
              >
                <span data-magnetic-label>Menu</span>
                <span aria-hidden="true" className="relative block h-3 w-6">
                  <span
                    className={cn(
                      'absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-out',
                      open ? 'top-1/2 rotate-45' : 'top-0',
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 block h-px w-full bg-current transition-transform duration-300 ease-out',
                      open ? 'top-1/2 -rotate-45' : 'top-full',
                    )}
                  />
                </span>
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      <MenuOverlay id={MENU_ID} open={open} onClose={closeMenu} returnFocusRef={menuButtonRef} />
    </>
  );
}

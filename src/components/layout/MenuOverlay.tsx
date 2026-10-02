'use client';

import { useCallback, useEffect, useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { useScrollLock } from '@/components/motion/SmoothScroll';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { Logo } from '@/components/ui/Logo';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { menuNav } from '@/content/nav';
import { site, telHref } from '@/content/site';
import { isPublishable } from '@/lib/content';
import { gsap } from '@/lib/gsap';
import { EASE } from '@/lib/motion';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface MenuOverlayProps {
  id: string;
  open: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * The full-screen navy menu (Master §5). It wipes open as a circle from the
 * Menu button, traps focus while it is up, closes on Escape, and hands focus
 * back to the button it came from.
 */
export function MenuOverlay({ id, open, onClose, returnFocusRef }: MenuOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { motion } = useMotion();
  const previouslyOpen = useRef(false);

  useScrollLock(open);

  const originFromButton = useCallback(() => {
    const button = returnFocusRef.current;
    if (!button) return '100% 0%';
    const bounds = button.getBoundingClientRect();
    const x = ((bounds.left + bounds.width / 2) / window.innerWidth) * 100;
    const y = ((bounds.top + bounds.height / 2) / window.innerHeight) * 100;
    return `${x.toFixed(1)}% ${y.toFixed(1)}%`;
  }, [returnFocusRef]);

  // Open and close animations.
  useEffect(() => {
    const panel = ref.current;
    if (!panel) return;

    const links = linksRef.current?.querySelectorAll<HTMLElement>('[data-menu-line]') ?? [];
    const origin = originFromButton();

    if (open) {
      panel.hidden = false;

      if (motion === 'reduced') {
        gsap.set(panel, { clipPath: 'circle(150% at 50% 50%)', autoAlpha: 1 });
        gsap.fromTo(links, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, stagger: 0 });
      } else {
        gsap.set(panel, { autoAlpha: 1 });
        gsap.fromTo(
          panel,
          { clipPath: `circle(0% at ${origin})` },
          { clipPath: `circle(150% at ${origin})`, duration: 0.7, ease: EASE.inOut },
        );
        gsap.fromTo(
          links,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, ease: EASE.out, stagger: 0.06, delay: 0.3 },
        );
      }

      // Focus lands on Close, which is the way out of the dialog.
      closeRef.current?.focus({ preventScroll: true });
      previouslyOpen.current = true;
      return;
    }

    if (!previouslyOpen.current) {
      panel.hidden = true;
      return;
    }

    // Closing is the same wipe, 1.3× faster.
    const duration = motion === 'reduced' ? 0.15 : 0.7 / 1.3;
    gsap.to(panel, {
      clipPath: `circle(0% at ${origin})`,
      duration,
      ease: EASE.inOut,
      onComplete: () => {
        panel.hidden = true;
        gsap.set(panel, { autoAlpha: 0 });
      },
    });
    returnFocusRef.current?.focus({ preventScroll: true });
    // onClose is deliberately not a dependency: it is not used here, and an
    // unstable identity would replay the wipe on every parent render.
  }, [motion, open, originFromButton, returnFocusRef]);

  // Escape closes; Tab cycles inside.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;
      const panel = ref.current;
      if (!panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null,
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  return (
    <div
      ref={ref}
      id={id}
      hidden
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      data-theme="navy"
      className="bg-navy text-paper fixed inset-0 z-60 overflow-y-auto opacity-0"
      data-lenis-prevent
    >
      {/*
        The overlay covers the header, so it reproduces it: same container, same
        height, lockup on the left and the close control exactly where the Menu
        button was.
      */}
      <div className="container-page flex h-18 items-center justify-between gap-6 lg:h-22">
        <Logo variant="onDark" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="nav-link flex min-h-11 cursor-pointer items-center gap-3 px-2"
        >
          Close
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span className="absolute top-1/2 left-0 block h-px w-full rotate-45 bg-current" />
            <span className="absolute top-1/2 left-0 block h-px w-full -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <div className="container-page flex min-h-[calc(100%-5.5rem)] flex-col justify-between gap-16 pt-12 pb-16">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <nav aria-label="Menu" className="md:col-span-7">
            <ul ref={linksRef} className="flex flex-col gap-2">
              {menuNav.map((item, index) => (
                <li key={item.href} className="overflow-hidden">
                  <div data-menu-line className="line-mask-pad">
                    <TransitionLink
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-4 no-underline"
                    >
                      <span className="t-label text-blue-lit">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="t-display-l transition-transform duration-500 ease-out group-hover:translate-x-3">
                        {item.label}
                      </span>
                    </TransitionLink>

                    {item.children ? (
                      <ul className="mt-2 mb-4 ml-10 flex flex-wrap gap-x-6 gap-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <TransitionLink
                              href={child.href}
                              onClick={onClose}
                              className="t-label link-underline text-paper/70 flex min-h-11 items-center hover:text-white"
                            >
                              {child.label}
                            </TransitionLink>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-8 md:col-span-4 md:col-start-9 md:self-end">
            <div className="flex flex-col gap-2">
              <span className="t-label text-paper/50">Contact</span>
              <a href={`mailto:${site.email}`} className="t-lead link-underline w-fit">
                {site.email}
              </a>
              {site.phones.map((phone) => (
                <a key={phone} href={telHref(phone)} className="t-body link-underline w-fit">
                  {phone}
                </a>
              ))}
            </div>

            {isPublishable(site.location) ? (
              <div className="flex flex-col gap-2">
                <span className="t-label text-paper/50">Where</span>
                <p className="t-body flex items-center gap-2">
                  <StarGlyph className="text-gold-lit" />
                  {site.location.value}
                </p>
              </div>
            ) : null}

            {site.socials.length > 0 ? (
              <div className="flex flex-col gap-2">
                <span className="t-label text-paper/50">Elsewhere</span>
                <ul className="flex flex-wrap gap-4">
                  {site.socials.map((social) => (
                    <li key={social.url}>
                      <a
                        href={social.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="t-label link-underline flex min-h-11 items-center"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <p className="t-label text-paper/40">{site.tagline}</p>
      </div>
    </div>
  );
}

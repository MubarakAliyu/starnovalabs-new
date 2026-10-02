'use client';

import { useRef, type MouseEvent, type ReactNode } from 'react';

import { Magnetic } from '@/components/motion/Magnetic';
import { useMotion } from '@/components/motion/MotionProvider';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { Arrow } from '@/components/ui/Arrow';
import { gsap } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { cn, isExternalHref } from '@/lib/utils';

/**
 * The old names stay valid — pages across the site use them — and map onto the
 * four roles the design actually has.
 */
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'link'
  | 'solid-ink'
  | 'outline'
  | 'solid-blue'
  | 'text-arrow';

type ButtonSize = 'md' | 'lg';

const ROLE: Record<ButtonVariant, 'primary' | 'secondary' | 'accent' | 'link'> = {
  primary: 'primary',
  'solid-ink': 'primary',
  secondary: 'secondary',
  outline: 'secondary',
  accent: 'accent',
  'solid-blue': 'accent',
  link: 'link',
  'text-arrow': 'link',
};

interface ButtonProps {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Adds the house arrow, which turns to the star's diagonal on hover. */
  arrow?: boolean;
  /** Overrides the colours when the surrounding theme cannot be inferred. */
  tone?: 'light' | 'dark';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

/**
 * The house control. Set in Mango, and coloured from the nearest [data-theme]
 * ancestor in CSS rather than from a prop, so no button can end up invisible
 * on a section it was not written for.
 */
export function Button({
  href,
  variant = 'primary',
  size = 'md',
  arrow,
  tone,
  type = 'button',
  disabled,
  onClick,
  className,
  children,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const { motion } = useMotion();
  const role = ROLE[variant];
  const showArrow = arrow ?? role === 'link';
  const floods = role === 'primary' || role === 'secondary';

  const flood = (event: MouseEvent<HTMLElement>, to: number) => {
    if (motion === 'reduced' || !floods) return;
    const host = ref.current;
    const node = host?.querySelector<HTMLElement>('[data-flood]');
    if (!host || !node) return;
    const bounds = host.getBoundingClientRect();
    gsap.set(node, {
      left: event.clientX - bounds.left,
      top: event.clientY - bounds.top,
      xPercent: -50,
      yPercent: -50,
    });
    gsap.to(node, {
      scale: to,
      duration: to === 1 ? 0.45 : 0.35,
      ease: EASE.snappy,
      overwrite: true,
    });
  };

  const inner = (
    <>
      {floods ? <span data-flood aria-hidden="true" className="btn__flood" /> : null}
      <span data-magnetic-label className="btn__label">
        {children}
        {showArrow ? (
          <Arrow
            className={cn(
              size === 'lg' ? 'text-[22px]' : 'text-[18px]',
              'group-hover:-rotate-45 group-focus-visible:-rotate-45',
            )}
          />
        ) : null}
      </span>
    </>
  );

  const classes = cn(
    'btn group',
    `btn--${role}`,
    role !== 'link' && `btn--${size}`,
    disabled && 'pointer-events-none opacity-50',
    className,
  );

  const shared = {
    className: classes,
    'data-tone': tone,
    onMouseEnter: (event: MouseEvent<HTMLElement>) => flood(event, 1),
    onMouseLeave: (event: MouseEvent<HTMLElement>) => flood(event, 0),
    onClick,
    ...rest,
  };

  let element: ReactNode;

  if (href && isExternalHref(href)) {
    element = (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        rel="noopener noreferrer"
        target={href.startsWith('http') ? '_blank' : undefined}
        {...shared}
      >
        {inner}
      </a>
    );
  } else if (href) {
    element = (
      <TransitionLink ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...shared}>
        {inner}
      </TransitionLink>
    );
  } else {
    element = (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        {...shared}
      >
        {inner}
      </button>
    );
  }

  return <Magnetic className="inline-block">{element}</Magnetic>;
}

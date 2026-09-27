'use client';

import { useRef, type MouseEvent, type ReactNode } from 'react';

import { Magnetic } from '@/components/motion/Magnetic';
import { useMotion } from '@/components/motion/MotionProvider';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { Arrow } from '@/components/ui/Arrow';
import { gsap } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { cn, isExternalHref } from '@/lib/utils';

type ButtonVariant = 'solid-ink' | 'solid-blue' | 'outline' | 'text-arrow';
type ButtonSize = 'md' | 'lg';

const SIZES: Record<ButtonSize, string> = {
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-15 px-8 text-base',
};

const VARIANTS: Record<ButtonVariant, string> = {
  'solid-ink': 'bg-ink text-white',
  'solid-blue': 'bg-blue text-white',
  outline: 'bg-transparent text-ink ring-1 ring-current',
  'text-arrow': 'bg-transparent px-0 text-ink',
};

interface ButtonProps {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Adds the house arrow, which turns to the star's diagonal on hover. */
  arrow?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

/**
 * The house control (Master §5). Solid variants flood blue from wherever the
 * pointer entered, the label rolls, and the arrow turns 45°. Magnetic on fine
 * pointers only; everything degrades to a plain colour change without motion.
 */
export function Button({
  href,
  variant = 'solid-ink',
  size = 'md',
  arrow = variant === 'text-arrow',
  type = 'button',
  disabled,
  onClick,
  className,
  children,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const { motion } = useMotion();
  const floods = variant === 'solid-ink' || variant === 'outline';

  const onEnter = (event: MouseEvent<HTMLElement>) => {
    if (motion === 'reduced' || !floods) return;
    const node = ref.current?.querySelector<HTMLElement>('[data-flood]');
    const host = ref.current;
    if (!node || !host) return;
    const bounds = host.getBoundingClientRect();
    gsap.set(node, {
      left: event.clientX - bounds.left,
      top: event.clientY - bounds.top,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    });
    gsap.to(node, { scale: 1, duration: 0.45, ease: EASE.snappy, overwrite: true });
  };

  const onLeave = (event: MouseEvent<HTMLElement>) => {
    if (motion === 'reduced' || !floods) return;
    const node = ref.current?.querySelector<HTMLElement>('[data-flood]');
    const host = ref.current;
    if (!node || !host) return;
    const bounds = host.getBoundingClientRect();
    gsap.set(node, { left: event.clientX - bounds.left, top: event.clientY - bounds.top });
    gsap.to(node, { scale: 0, duration: 0.35, ease: EASE.snappy, overwrite: true });
  };

  const inner = (
    <>
      {floods ? (
        <span
          data-flood
          aria-hidden="true"
          className="pointer-events-none absolute h-[220%] w-[220%] scale-0 rounded-full bg-blue"
          style={{ aspectRatio: '1' }}
        />
      ) : null}

      {/* The label rolls: the copy underneath slides up to replace it. */}
      <span
        data-magnetic-label
        className="relative z-10 flex items-center gap-3 overflow-hidden"
      >
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
            {children}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
          >
            {children}
          </span>
        </span>
        {arrow ? (
          <Arrow className="group-hover:-rotate-45 group-focus-visible:-rotate-45" />
        ) : null}
      </span>
    </>
  );

  const classes = cn(
    'group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-[4px]',
    't-label leading-none no-underline transition-colors duration-200',
    'active:scale-[0.97] active:transition-transform',
    SIZES[size],
    VARIANTS[variant],
    variant === 'solid-blue' && 'hover:bg-blue-press',
    variant === 'text-arrow' && 'h-auto min-h-11 underline-offset-4',
    disabled && 'pointer-events-none opacity-50',
    className,
  );

  const shared = {
    className: classes,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
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

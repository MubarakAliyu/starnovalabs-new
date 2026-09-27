/**
 * Motion tokens (Master §5). Imported by both server and client code, so this
 * file must stay free of GSAP imports.
 */

export const EASE = {
  out: 'expo.out',
  inOut: 'power4.inOut',
  snappy: 'power3.out',
  spring: 'elastic.out(1,0.45)',
  scrub: 'none',
} as const;

/** CSS equivalents, for the few places a transition beats a tween. */
export const EASE_CSS = {
  out: 'cubic-bezier(0.16,1,0.3,1)',
  inOut: 'cubic-bezier(0.76,0,0.24,1)',
  snappy: 'cubic-bezier(0.25,1,0.5,1)',
} as const;

/** Durations in seconds. */
export const DUR = {
  xs: 0.15,
  sm: 0.25,
  md: 0.45,
  lg: 0.8,
  xl: 1.2,
} as const;

/** Stagger steps in seconds. */
export const STAGGER = {
  lines: 0.08,
  words: 0.04,
  chars: 0.018,
  items: 0.06,
} as const;

/** Loader budget in milliseconds (Master §5 "Ignition"). */
export const LOADER = {
  min: 1200,
  target: 2200,
  cap: 2800,
} as const;

export type MotionMode = 'full' | 'reduced';

export const MOTION_STORAGE_KEY = 'snl-motion';
export const INTRO_STORAGE_KEY = 'snl-intro';

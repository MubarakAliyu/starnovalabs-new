'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { DUR, EASE } from '@/lib/motion';

/**
 * Single registration point for GSAP. Import GSAP from here and nowhere else,
 * so plugins are registered exactly once and never pulled into a server bundle.
 */
let registered = false;

if (typeof window !== 'undefined' && !registered) {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
  gsap.defaults({ ease: EASE.out, duration: DUR.lg });
  registered = true;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

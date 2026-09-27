'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { useLenisSafe } from '@/components/motion/SmoothScroll';

export type TransitionPhase = 'idle' | 'covering' | 'covered' | 'revealing';

export interface CurtainHandle {
  /** Bring the blue panel down. Resolves once the view is fully covered. */
  cover: () => Promise<void>;
  /** Lift the panel again. Resolves when it is gone. */
  reveal: () => Promise<void>;
  /** Show the mono counter while a slow route is still loading. */
  showWaiting: (waiting: boolean) => void;
}

interface TransitionContextValue {
  /** True once the current page may run its hero entrance. */
  revealed: boolean;
  navigate: (href: string) => void;
  /** Called by the Loader, which owns the reveal on the very first view. */
  signalReveal: () => void;
  registerCurtain: (handle: CurtainHandle | null) => void;
  notifyRouteMounted: () => void;
  /** True while the Loader still has the screen. */
  claimFirstReveal: () => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  revealed: true,
  navigate: () => {},
  signalReveal: () => {},
  registerCurtain: () => {},
  notifyRouteMounted: () => {},
  claimFirstReveal: () => {},
});

/** Hero entrances wait on this. */
export function useTransitionReveal() {
  const { revealed } = useContext(TransitionContext);
  return { revealed };
}

export function useTransition() {
  return useContext(TransitionContext);
}

const COVER_MS = 550;
const REVEAL_MS = 600;
/** The hero starts before the panel has finished leaving. */
const REVEAL_OVERLAP_MS = 250;
const WAITING_AFTER_MS = 1500;
const FORCE_REVEAL_MS = 5000;
const REDUCED_FADE_MS = 150;
const POP_FADE_MS = 250;

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const lenis = useLenisSafe();
  const { motion } = useMotion();

  const [revealed, setRevealed] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const curtainRef = useRef<CurtainHandle | null>(null);
  const phaseRef = useRef<TransitionPhase>('idle');
  const firstRouteRef = useRef(true);
  const loaderOwnsFirstRef = useRef(false);
  const popRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  // Back/forward gets a short fade instead of the full curtain.
  useEffect(() => {
    const onPop = () => {
      popRef.current = true;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const registerCurtain = useCallback((handle: CurtainHandle | null) => {
    curtainRef.current = handle;
  }, []);

  const claimFirstReveal = useCallback(() => {
    loaderOwnsFirstRef.current = true;
  }, []);

  const announceAndFocus = useCallback(() => {
    const heading = document.querySelector<HTMLElement>('main h1');
    const title = heading?.textContent?.trim() || document.title;
    setAnnouncement(`Navigated to ${title}`);
    // Move focus to the new page's heading so keyboard users land in content.
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }, []);

  const signalReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  const finishReveal = useCallback(() => {
    clearTimers();
    const wasCovered = phaseRef.current === 'covered' || phaseRef.current === 'covering';

    if (wasCovered && motion !== 'reduced') {
      phaseRef.current = 'revealing';
      curtainRef.current?.showWaiting(false);
      void curtainRef.current?.reveal().then(() => {
        phaseRef.current = 'idle';
      });
      after(REVEAL_MS - REVEAL_OVERLAP_MS, () => setRevealed(true));
    } else if (wasCovered) {
      phaseRef.current = 'revealing';
      void curtainRef.current?.reveal().then(() => {
        phaseRef.current = 'idle';
      });
      setRevealed(true);
    } else {
      phaseRef.current = 'idle';
      setRevealed(true);
    }

    announceAndFocus();
  }, [after, announceAndFocus, clearTimers, motion]);

  const notifyRouteMounted = useCallback(() => {
    // The very first mount belongs to the Loader, not to a transition.
    if (firstRouteRef.current) {
      firstRouteRef.current = false;
      if (!loaderOwnsFirstRef.current) setRevealed(true);
      return;
    }

    if (popRef.current) {
      popRef.current = false;
      clearTimers();
      phaseRef.current = 'idle';
      setRevealed(true);
      announceAndFocus();
      const main = document.getElementById('main');
      if (main && motion !== 'reduced') {
        main.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: POP_FADE_MS,
          easing: 'ease-out',
        });
      }
      return;
    }

    finishReveal();
  }, [announceAndFocus, clearTimers, finishReveal, motion]);

  const navigate = useCallback(
    (href: string) => {
      if (phaseRef.current !== 'idle') return;

      setRevealed(false);
      phaseRef.current = 'covering';
      router.prefetch(href);

      let proceeded = false;
      const proceed = () => {
        if (proceeded) return;
        proceeded = true;
        phaseRef.current = 'covered';
        router.push(href);
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);

        // A slow route gets a counter, and can never strand the visitor.
        after(WAITING_AFTER_MS, () => curtainRef.current?.showWaiting(true));
        after(FORCE_REVEAL_MS, () => finishReveal());
      };

      const budget = motion === 'reduced' ? REDUCED_FADE_MS : COVER_MS;
      const cover = curtainRef.current?.cover();
      if (cover) void cover.then(proceed);
      // The animation frame loop stops in a backgrounded tab, which would
      // otherwise leave the click swallowed and the navigation never made.
      after(budget + 400, proceed);
    },
    [after, finishReveal, lenis, motion, router],
  );

  const value = useMemo(
    () => ({
      revealed,
      navigate,
      signalReveal,
      registerCurtain,
      notifyRouteMounted,
      claimFirstReveal,
    }),
    [claimFirstReveal, navigate, notifyRouteMounted, registerCurtain, revealed, signalReveal],
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div aria-live="polite" role="status" className="sr-only">
        {announcement}
      </div>
    </TransitionContext.Provider>
  );
}

export const TRANSITION_TIMING = {
  COVER_MS,
  REVEAL_MS,
  REDUCED_FADE_MS,
} as const;

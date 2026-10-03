'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { INTRO_STORAGE_KEY, MOTION_STORAGE_KEY, type MotionMode } from '@/lib/motion';

interface MotionContextValue {
  motion: MotionMode;
  /** True until the first client resolve, so components can avoid animating during hydration. */
  resolved: boolean;
  setMotion: (mode: MotionMode) => void;
  toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextValue>({
  motion: 'full',
  resolved: false,
  setMotion: () => {},
  toggleMotion: () => {},
});

function readStoredMotion(): MotionMode | null {
  try {
    const stored = window.localStorage.getItem(MOTION_STORAGE_KEY);
    return stored === 'full' || stored === 'reduced' ? stored : null;
  } catch {
    return null;
  }
}

function writeStoredMotion(mode: MotionMode) {
  try {
    window.localStorage.setItem(MOTION_STORAGE_KEY, mode);
  } catch {
    /* Storage can be blocked; the preference is simply not persisted. */
  }
}

/**
 * Resolves the motion mode from (a) the footer toggle stored in localStorage,
 * else (b) the OS prefers-reduced-motion setting, and publishes it on
 * <html data-motion>. Every animated component reads this.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  // Read the mode the bootstrap script already resolved, so the very first
  // client render is correct and nothing has to remount after hydration.
  const [motion, setMotionState] = useState<MotionMode>(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.motion === 'reduced'
      ? 'reduced'
      : 'full',
  );
  const [resolved, setResolved] = useState(() => typeof document !== 'undefined');

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    const resolve = () => {
      const stored = readStoredMotion();
      setMotionState(stored ?? (query.matches ? 'reduced' : 'full'));
      setResolved(true);
    };

    resolve();

    // Only follow the OS when the visitor has not made an explicit choice.
    const onChange = () => {
      if (readStoredMotion() === null) resolve();
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motion;
  }, [motion]);

  const setMotion = useCallback((mode: MotionMode) => {
    writeStoredMotion(mode);
    setMotionState(mode);
  }, []);

  const toggleMotion = useCallback(() => {
    setMotionState((current) => {
      const next: MotionMode = current === 'full' ? 'reduced' : 'full';
      writeStoredMotion(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ motion, resolved, setMotion, toggleMotion }),
    [motion, resolved, setMotion, toggleMotion],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  return useContext(MotionContext);
}

/**
 * Runs in <head> before the first paint. It resolves the motion mode and
 * decides, there and then, whether the intro plays and in which form — so a
 * returning visitor never sees a flash of the loader, and a first-time visitor
 * never sees a flash of the page.
 *
 * The home page replays the loader on every full load, because that is the
 * moment it is for: full the first time in a session, short on later reloads.
 * Every other entry page keeps the once-per-session rule, so arriving deep in
 * the site is not gated on an animation. Client-side navigation never replays
 * it — the controller runs once per document.
 *
 * ?intro=1 forces the full version, ?intro=0 skips it, reduced motion skips it.
 */
export const motionBootstrapScript = `(function(){var d=document.documentElement;var m='full';try{var s=localStorage.getItem('${MOTION_STORAGE_KEY}');m=(s==='full'||s==='reduced')?s:(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'reduced':'full');}catch(e){}d.dataset.motion=m;function skip(){d.dataset.intro='done';}try{var q=location.search;var force=/[?&]intro=1(&|$)/.test(q);var off=/[?&]intro=0(&|$)/.test(q);var home=location.pathname==='/';var seen=false;try{seen=sessionStorage.getItem('${INTRO_STORAGE_KEY}')==='done';}catch(e){}if(off){skip();try{sessionStorage.setItem('${INTRO_STORAGE_KEY}','done');}catch(e){}}else if(force){d.dataset.introVariant='full';}else if(m==='reduced'){skip();}else if(home){d.dataset.introVariant=seen?'short':'full';}else if(seen){skip();}else{d.dataset.introVariant='full';}}catch(e){if(m==='reduced'){skip();}}})();`;

export const loaderCriticalCss = `html:not([data-intro="done"]) [data-loader]{position:fixed;top:0;right:0;bottom:0;left:0;z-index:100;display:block;background-color:#0B1B2E;color:#fff;pointer-events:none}html[data-intro="done"] [data-loader]{display:none}`;

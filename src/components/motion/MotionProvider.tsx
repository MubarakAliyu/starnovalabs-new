'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { MOTION_STORAGE_KEY, type MotionMode } from '@/lib/motion';

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
 * Runs before hydration so the first paint already carries the right mode —
 * this is what stops the loader flashing for visitors who asked for less motion.
 */
export const motionBootstrapScript = `(function(){try{var s=localStorage.getItem('${MOTION_STORAGE_KEY}');var m=(s==='full'||s==='reduced')?s:(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'reduced':'full');document.documentElement.dataset.motion=m;}catch(e){document.documentElement.dataset.motion='full';}})();`;

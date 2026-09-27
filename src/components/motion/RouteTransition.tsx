'use client';

import { useEffect, useRef } from 'react';

import { useTransition } from '@/components/motion/TransitionProvider';

/**
 * Tells the TransitionProvider that a new route is on screen. It must fire
 * exactly once per mount, so the callback is read from a ref rather than
 * tracked as a dependency.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const { notifyRouteMounted } = useTransition();
  const notify = useRef(notifyRouteMounted);
  useEffect(() => {
    notify.current = notifyRouteMounted;
  }, [notifyRouteMounted]);

  useEffect(() => {
    notify.current();
  }, []);

  return <>{children}</>;
}

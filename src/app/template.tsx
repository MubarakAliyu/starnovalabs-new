import { RouteTransition } from '@/components/motion/RouteTransition';

/**
 * A template remounts on every navigation, which is exactly the signal the
 * curtain needs to know the new route is on screen.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <RouteTransition>{children}</RouteTransition>;
}

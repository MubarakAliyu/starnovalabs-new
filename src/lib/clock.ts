/**
 * Reading the clock is impure, so it has no business inside a component that
 * might be prerendered or re-rendered. This helper exists for the one place
 * that legitimately needs the time the request was served: the contact page
 * stamps its form so the route handler can tell how long the visitor took.
 *
 * That page is rendered per request, never cached, so the value is honest. Do
 * not reach for this from a component that renders more than once.
 */
export function requestTimeMs(): number {
  return Date.now();
}

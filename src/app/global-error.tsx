'use client';

import { useEffect } from 'react';

/**
 * The last resort: this replaces the whole document, so it carries its own
 * html and body and cannot rely on the app's layout, fonts or styles.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Only the digest; a raw message may not be safe to surface.
    console.error('[global error]', error.digest ?? error.message);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0D12',
          color: '#F5F9FC',
          fontFamily: 'system-ui, sans-serif',
          padding: '2rem',
        }}
      >
        <main style={{ maxWidth: '36rem' }}>
          <h1 style={{ fontSize: '2.5rem', lineHeight: 1.1, margin: 0 }}>
            Something went wrong.
          </h1>
          <p style={{ marginTop: '1.5rem', lineHeight: 1.6, opacity: 0.8 }}>
            The site could not be loaded. Please try again, or email
            info@starnovalabs.com.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '2rem',
              padding: '0.9rem 1.6rem',
              background: '#F5F9FC',
              color: '#0A0D12',
              border: 0,
              borderRadius: 4,
              font: 'inherit',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

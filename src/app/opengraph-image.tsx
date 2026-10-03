import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { site } from '@/content/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.name} — ${site.tagline}`;

/**
 * The default share card. Per-route cards reuse ogImage() with their own title.
 *
 * Mango is read straight off disk as a buffer — the licence forbids modifying
 * the file, and this does not touch it.
 */
export async function mangoFont() {
  const file = path.join(
    process.cwd(),
    'src/fonts/mango-grotesque/MangoGrotesque-SemiBold.woff',
  );
  return readFile(file);
}

export async function ogImage(title: string, eyebrow?: string) {
  const mango = await mangoFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0B1B2E',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {eyebrow ? (
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#2C9BD1',
            }}
          >
            {eyebrow}
          </div>
        ) : (
          <div style={{ display: 'flex' }} />
        )}

        <div
          style={{
            display: 'flex',
            fontFamily: 'Mango',
            fontSize: title.length > 28 ? 110 : 150,
            lineHeight: 0.9,
            color: '#F5F9FC',
            textTransform: 'uppercase',
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* The logomark tile, drawn inline so no network fetch is needed. */}
          <svg width="56" height="56" viewBox="0 0 253 253">
            <rect width="253" height="253" rx="16" fill="#0074A9" />
            <path
              d="M116.272 223.389C117.78 225.976 120.937 225.624 120.938 222.252V183.889C120.937 154.387 97.0216 130.473 67.5205 130.473H58.5869L116.272 223.389ZM183.886 130.473C154.385 130.473 130.469 154.388 130.469 183.889V192.822L223.385 135.138C225.972 133.63 225.621 130.473 222.248 130.473H183.886ZM135.134 28.0234C133.626 25.436 130.469 25.7875 130.469 29.1602V67.5225C130.469 97.0237 154.385 120.939 183.886 120.939H192.819L135.134 28.0234ZM28.0225 116.273C25.4352 117.781 25.7859 120.938 29.1582 120.938H67.5215C97.0228 120.938 120.938 97.0226 120.938 67.5215V58.5879L28.0225 116.273Z"
              fill="#FFFFFF"
            />
          </svg>
          <div style={{ display: 'flex', fontSize: 28, color: '#F5F9FC' }}>{site.name}</div>
        </div>

        {/* The blue rule along the bottom edge. */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 12,
            backgroundColor: '#0074A9',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Mango', data: mango, style: 'normal', weight: 600 }],
    },
  );
}

export default async function Image() {
  return ogImage("Build what's next.", site.tagline);
}

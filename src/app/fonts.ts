import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

/**
 * Mango Grotesque — display face.
 * The .woff files are used exactly as supplied (licence forbids modification),
 * so there is no subsetting and no WOFF2 conversion. Only 400 and 600 exist:
 * `font-synthesis: none` in globals.css stops the browser faking other weights.
 * This is the only preloaded family.
 */
export const display = localFont({
  src: [
    {
      path: '../fonts/mango-grotesque/MangoGrotesque-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/mango-grotesque/MangoGrotesque-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['Archivo', 'Arial Narrow', 'sans-serif'],
});

/** Archivo — all headings below display size, and the fallback for glyphs Mango lacks. */
export const heading = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-heading',
  display: 'swap',
  preload: false,
});

/** Inter — body and UI text. */
export const text = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-text',
  display: 'swap',
});

/** JetBrains Mono — stickers, labels, counters, code-tag idiom. */
export const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});

export const fontVariables = [
  display.variable,
  heading.variable,
  text.variable,
  mono.variable,
].join(' ');

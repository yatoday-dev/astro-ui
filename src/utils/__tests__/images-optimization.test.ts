import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ImageMetadata } from 'astro';

import { getImagesOptimized, getSizes } from '../images-optimization';

// Echoes the breakpoints it was handed so a test can read the ladder that
// getBreakpoints() actually produced straight off the srcset.
const echoBreakpoints = async (_image: unknown, breakpoints: number[]) =>
  breakpoints.map((w) => ({ src: `/img-${w}.webp`, width: w }));

const localImage = (width: number, height: number): ImageMetadata =>
  ({ src: `/src-${width}.jpg`, width, height, format: 'jpg' }) as ImageMetadata;

const widthsOf = (srcset?: string | null): number[] =>
  (srcset ?? '')
    .split(',')
    .filter(Boolean)
    .map((candidate) => Number(candidate.trim().split(' ')[1].replace('w', '')));

describe('getBreakpoints (via getImagesOptimized)', () => {
  it('never offers a candidate wider than the source', async () => {
    const { attributes } = await getImagesOptimized(localImage(1024, 683), { layout: 'cover' }, echoBreakpoints);

    const widths = widthsOf(attributes.srcset);
    expect(Math.max(...widths)).toBe(1024);
    expect(widths.every((w) => w <= 1024)).toBe(true);
  });

  it('emits no duplicate widths for a source smaller than the ladder', async () => {
    // The default ladder runs to 6016px. Every step past the source used to be
    // requested anyway, and each came back as another copy of the same file.
    const { attributes } = await getImagesOptimized(localImage(1024, 683), { layout: 'cover' }, echoBreakpoints);

    const widths = widthsOf(attributes.srcset);
    expect(widths).toEqual([...new Set(widths)]);
    expect(widths).toEqual([640, 750, 828, 960, 1024]);
  });

  it('still caps the ladder with the full-resolution source', async () => {
    const { attributes } = await getImagesOptimized(localImage(900, 600), { layout: 'fullWidth' }, echoBreakpoints);

    expect(widthsOf(attributes.srcset)).toContain(900);
  });

  it('clamps the 2x candidate of a constrained image to the source', async () => {
    // width 800 wants a 1600px 2x candidate, but the file only has 1024px.
    const { attributes } = await getImagesOptimized(
      localImage(1024, 683),
      { layout: 'constrained', width: 800 },
      echoBreakpoints
    );

    const widths = widthsOf(attributes.srcset);
    expect(widths).not.toContain(1600);
    expect(Math.max(...widths)).toBe(1024);
  });

  it('clamps a fixed layout to the source', async () => {
    const { attributes } = await getImagesOptimized(
      localImage(1000, 500),
      { layout: 'fixed', width: 800, height: 400 },
      echoBreakpoints
    );

    expect(widthsOf(attributes.srcset)).toEqual([800, 1000]);
  });

  it('leaves the ladder alone for a remote image, whose size is unknowable', async () => {
    const { attributes } = await getImagesOptimized(
      'https://cdn.example.com/photo.jpg',
      { layout: 'cover', width: 1024, height: 683 },
      echoBreakpoints
    );

    expect(Math.max(...widthsOf(attributes.srcset))).toBeGreaterThan(1024);
  });

  it('honours an explicit widths list, still bounded by the source', async () => {
    const { attributes } = await getImagesOptimized(
      localImage(1024, 683),
      { layout: 'cover', widths: [400, 800, 2000] },
      echoBreakpoints
    );

    expect(widthsOf(attributes.srcset)).toEqual([400, 800, 1024]);
  });
});

describe('getSizes', () => {
  it('derives sizes for the layouts whose width the layout alone determines', () => {
    expect(getSizes(800, 'constrained')).toBe('(min-width: 800px) 800px, 100vw');
    expect(getSizes(800, 'fixed')).toBe('800px');
    expect(getSizes(800, 'fullWidth')).toBe('100vw');
  });

  it('returns undefined for container-relative layouts rather than guessing', () => {
    expect(getSizes(800, 'cover')).toBeUndefined();
    expect(getSizes(800, 'responsive')).toBeUndefined();
    expect(getSizes(800, 'contained')).toBeUndefined();
  });
});

describe('missing-sizes warning', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => warn.mockRestore());

  // Each case needs an image the dedupe has not seen: `warnedSizes` is module
  // state keyed by src, so a width reused from an earlier test stays silent.
  it('warns when a container-relative layout ships without sizes', async () => {
    await getImagesOptimized(localImage(1111, 700), { layout: 'cover' }, echoBreakpoints);

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('has no `sizes`');
  });

  it('stays quiet once sizes is supplied', async () => {
    await getImagesOptimized(
      localImage(1222, 800),
      { layout: 'cover', sizes: '(min-width: 1024px) 50vw, 100vw' },
      echoBreakpoints
    );

    expect(warn).not.toHaveBeenCalled();
  });

  it('stays quiet for fullWidth, where 100vw is already correct', async () => {
    await getImagesOptimized(localImage(1333, 900), { layout: 'fullWidth' }, echoBreakpoints);

    expect(warn).not.toHaveBeenCalled();
  });

  it('reports a given image only once', async () => {
    const image = localImage(1444, 900);
    await getImagesOptimized(image, { layout: 'responsive' }, echoBreakpoints);
    await getImagesOptimized(image, { layout: 'responsive' }, echoBreakpoints);

    expect(warn).toHaveBeenCalledTimes(1);
  });
});

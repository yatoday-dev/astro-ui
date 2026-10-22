import { describe, it, expect, vi, beforeEach } from 'vitest';

const { getImage } = vi.hoisted(() => ({
  getImage: vi.fn(async ({ width }: { src: unknown; width?: number }) => ({
    src: `/_astro/og-${width ?? 0}.jpg`,
    attributes: { width, height: 600 },
  })),
}));

vi.mock('astro:assets', () => ({ getImage }));

import { adaptOpenGraphImages } from '../images';

const site = new URL('https://example.com/');

describe('adaptOpenGraphImages', () => {
  beforeEach(() => {
    getImage.mockClear();
  });

  it('uses an image under public/ as it is, never through astro:assets', async () => {
    // getImage cannot size a public path: it threw MissingImageDimension.
    const { images } = await adaptOpenGraphImages(
      { images: [{ url: '/og/home.jpg', width: 1200, height: 630, alt: 'The office' }] },
      site
    );

    expect(images).toEqual([{ url: 'https://example.com/og/home.jpg', width: 1200, height: 630, alt: 'The office' }]);
    expect(getImage).not.toHaveBeenCalled();
  });

  it('uses an absolute URL on a host it does not know as it is, never through astro:assets', async () => {
    // getImage refused a host outside image.domains (RemoteImageNotAllowed)
    // and downloaded one inside it on every build.
    const { images } = await adaptOpenGraphImages(
      { images: [{ url: 'https://media.example.org/listing/42/cover.jpg', alt: 'Terrace' }] },
      site
    );

    expect(images).toEqual([
      { url: 'https://media.example.org/listing/42/cover.jpg', width: undefined, height: undefined, alt: 'Terrace' },
    ]);
    expect(getImage).not.toHaveBeenCalled();
  });

  it('resizes an image on a CDN unpic knows by its URL', async () => {
    const { images } = await adaptOpenGraphImages(
      { images: [{ url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg', alt: 'Sample' }] },
      site
    );

    expect(images).toHaveLength(1);
    expect(images?.[0]).toMatchObject({ width: 1200, height: 626, alt: 'Sample' });
    expect(images?.[0].url).toContain('w_1200');
    expect(getImage).not.toHaveBeenCalled();
  });

  it('leaves out an image of ~/assets/images that does not exist', async () => {
    // It used to come back with an empty URL, which Metadata turned into the site's address.
    const { images } = await adaptOpenGraphImages({ images: [{ url: '~/assets/images/missing.jpg' }] }, site);

    expect(images).toEqual([]);
  });
});

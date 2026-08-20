import type { ImageMetadata } from 'astro';
import type { HTMLAttributes } from 'astro/types';
import { getImage } from 'astro:assets';
import { parseUrl, transformUrl } from 'unpic';

type Layout = 'fixed' | 'constrained' | 'fullWidth' | 'cover' | 'responsive' | 'contained';

export interface ImageProps extends Omit<HTMLAttributes<'img'>, 'src'> {
  src?: string | ImageMetadata | null;
  width?: string | number | null;
  height?: string | number | null;
  alt?: string | null;
  loading?: 'eager' | 'lazy' | null;
  decoding?: 'sync' | 'async' | 'auto' | null;
  class?: string;
  style?: string;
  srcset?: string | null;
  sizes?: string | null;
  fetchpriority?: 'high' | 'low' | 'auto' | null;

  layout?: Layout;
  widths?: number[] | null;
  aspectRatio?: string | number | null;
  objectFit?: string;
  objectPosition?: string;

  format?: string;
}

export type ImagesOptimizer = (
  image: ImageMetadata | string,
  breakpoints: number[],
  width?: number,
  height?: number,
  format?: string
) => Promise<Array<{ src: string; width: number }>>;

/* ******* */
const config = {
  // FIXME: Use this when image.width is minor than deviceSizes
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

  deviceSizes: [
    640, // older and lower-end phones
    750, // iPhone 6-8
    828, // iPhone XR/11
    960, // older horizontal phones
    1080, // iPhone 6-8 Plus
    1280, // 720p
    1668, // Various iPads
    1920, // 1080p
    2048, // QXGA
    2560, // WQXGA
    3200, // QHD+
    3840, // 4K
    4480, // 4.5K
    5120, // 5K
    6016, // 6K
  ],

  formats: ['image/webp'],
};

const computeHeight = (width: number, aspectRatio: number) => {
  return Math.floor(width / aspectRatio);
};

const parseAspectRatio = (aspectRatio: number | string | null | undefined): number | undefined => {
  if (typeof aspectRatio === 'number') {
    return aspectRatio;
  }

  if (typeof aspectRatio === 'string') {
    const match = aspectRatio.match(/(\d+)\s*[/:]\s*(\d+)/);

    if (match) {
      const [, num, den] = match.map(Number);
      if (den && !isNaN(num)) {
        return num / den;
      }
    } else {
      const numericValue = parseFloat(aspectRatio);
      if (!isNaN(numericValue)) {
        return numericValue;
      }
    }
  }

  return undefined;
};

/**
 * Derives the `sizes` attribute from the layout, where the layout alone is
 * enough to know how wide the image will render.
 *
 * `cover`, `responsive` and `contained` size to whatever their container is,
 * which nothing here can see, so they deliberately return `undefined` rather
 * than a guess. The browser then falls back to assuming `100vw` and picks a
 * candidate for the full viewport, which over-fetches badly for an image that
 * only occupies part of it. Pass `sizes` explicitly at the call site for those
 * layouts — {@link getImagesOptimized} warns when it is missing.
 */
export const getSizes = (width?: number, layout?: Layout): string | undefined => {
  if (!width || !layout) {
    return undefined;
  }
  switch (layout) {
    // If screen is wider than the max size, image width is the max size,
    // otherwise it's the width of the screen
    case 'constrained':
      return `(min-width: ${width}px) ${width}px, 100vw`;

    // Image is always the same width, whatever the size of the screen
    case 'fixed':
      return `${width}px`;

    // Image is always the width of the screen
    case 'fullWidth':
      return '100vw';

    default:
      return undefined;
  }
};

const pixelate = (value?: number) => (value || value === 0 ? `${value}px` : undefined);

const getStyle = ({
  width,
  height,
  aspectRatio,
  layout,
  objectFit = 'cover',
  objectPosition = 'center',
  background,
}: {
  width?: number;
  height?: number;
  aspectRatio?: number;
  objectFit?: string;
  objectPosition?: string;
  layout?: string;
  background?: string;
}) => {
  const styleEntries: Array<[prop: string, value: string | undefined]> = [
    ['object-fit', objectFit],
    ['object-position', objectPosition],
  ];

  // If background is a URL, set it to cover the image and not repeat
  if (background?.startsWith('https:') || background?.startsWith('http:') || background?.startsWith('data:')) {
    styleEntries.push(['background-image', `url(${background})`]);
    styleEntries.push(['background-size', 'cover']);
    styleEntries.push(['background-repeat', 'no-repeat']);
  } else {
    styleEntries.push(['background', background]);
  }
  if (layout === 'fixed') {
    styleEntries.push(['width', pixelate(width)]);
    styleEntries.push(['height', pixelate(height)]);
    styleEntries.push(['object-position', 'top left']);
  }
  if (layout === 'constrained') {
    styleEntries.push(['max-width', pixelate(width)]);
    styleEntries.push(['max-height', pixelate(height)]);
    styleEntries.push(['aspect-ratio', aspectRatio ? `${aspectRatio}` : undefined]);
    styleEntries.push(['width', '100%']);
  }
  if (layout === 'fullWidth') {
    styleEntries.push(['width', '100%']);
    styleEntries.push(['aspect-ratio', aspectRatio ? `${aspectRatio}` : undefined]);
    styleEntries.push(['height', pixelate(height)]);
  }
  if (layout === 'responsive') {
    styleEntries.push(['width', '100%']);
    styleEntries.push(['height', 'auto']);
    styleEntries.push(['aspect-ratio', aspectRatio ? `${aspectRatio}` : undefined]);
  }
  if (layout === 'contained') {
    styleEntries.push(['max-width', '100%']);
    styleEntries.push(['max-height', '100%']);
    styleEntries.push(['object-fit', 'contain']);
    styleEntries.push(['aspect-ratio', aspectRatio ? `${aspectRatio}` : undefined]);
  }
  if (layout === 'cover') {
    styleEntries.push(['max-width', '100%']);
    styleEntries.push(['max-height', '100%']);
  }

  const styles = Object.fromEntries(styleEntries.filter(([, value]) => value));

  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
};

/**
 * Drops any breakpoint wider than the source image.
 *
 * Asking the optimizer for a width the source cannot supply does not produce a
 * bigger image, it re-encodes the same pixels: every step past the intrinsic
 * width comes back byte-identical, so the build writes several copies of one
 * file and the srcset offers the browser several candidates that only differ
 * by their `w` descriptor. A 1024px source run against the default ladder
 * emitted eleven identical 1024px variants.
 *
 * The source width itself is appended so the largest candidate is still the
 * full-resolution image. `sourceWidth` is only known for local images
 * (`ImageMetadata`); for a remote URL the ladder is returned untouched.
 */
const clampToSource = (breakpoints: number[], sourceWidth?: number): number[] =>
  sourceWidth ? [...breakpoints.filter((w) => w < sourceWidth), sourceWidth] : breakpoints;

const getBreakpoints = ({
  width,
  breakpoints,
  layout,
  sourceWidth,
}: {
  width?: number;
  breakpoints?: number[];
  layout: Layout;
  sourceWidth?: number;
}): number[] => {
  const ladder = breakpoints || config.deviceSizes;

  // These layouts size to their container, which is not knowable here, so the
  // whole ladder is a candidate and only the source width bounds it.
  if (layout === 'fullWidth' || layout === 'cover' || layout === 'responsive' || layout === 'contained') {
    return clampToSource(ladder, sourceWidth);
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  if (layout === 'fixed') {
    return clampToSource([width, doubleWidth], sourceWidth);
  }
  if (layout === 'constrained') {
    return clampToSource(
      [
        // Always include the image at 1x and 2x the specified width
        width,
        doubleWidth,
        // Filter out any resolutions that are larger than the double-res image
        ...ladder.filter((w) => w < doubleWidth),
      ],
      sourceWidth
    );
  }

  return [];
};

/* ** */
export const astroAsseetsOptimizer: ImagesOptimizer = async (
  image,
  breakpoints,
  _width,
  _height,
  format = undefined
) => {
  if (!image) {
    return [];
  }

  return Promise.all(
    breakpoints.map(async (w: number) => {
      const result = await getImage({ src: image, width: w, inferSize: true, ...(format ? { format } : {}) });

      return {
        src: result?.src,
        width: result?.attributes?.width ?? w,
        height: result?.attributes?.height,
      };
    })
  );
};

export const isUnpicCompatible = (image: string) => {
  return typeof parseUrl(image) !== 'undefined';
};

/* ** */
export const unpicOptimizer: ImagesOptimizer = async (image, breakpoints, width, height, format = undefined) => {
  if (!image || typeof image !== 'string') {
    return [];
  }

  const urlParsed = parseUrl(image);
  if (!urlParsed) {
    return [];
  }

  return Promise.all(
    breakpoints.map(async (w: number) => {
      const _height = width && height ? computeHeight(w, width / height) : height;
      const url =
        transformUrl({
          url: image,
          width: w,
          height: _height,
          cdn: urlParsed.cdn,
          ...(format ? { format } : {}),
        }) || image;
      return {
        src: String(url),
        width: w,
        height: _height,
      };
    })
  );
};

// A container-relative layout cannot derive its own `sizes`, and without one
// the browser assumes the image spans the viewport. Surfaced at build time so
// it is caught here rather than in a Lighthouse report. Reported once per
// image so a component used on every page does not flood the log.
const CONTAINER_RELATIVE_LAYOUTS: ReadonlySet<Layout> = new Set(['cover', 'responsive', 'contained']);
const warnedSizes = new Set<string>();

const warnIfSizesMissing = (image: ImageMetadata | string, layout: Layout, sizes?: string | null): void => {
  if (sizes || !CONTAINER_RELATIVE_LAYOUTS.has(layout)) {
    return;
  }
  const src = typeof image === 'string' ? image : image.src;
  if (warnedSizes.has(src)) {
    return;
  }
  warnedSizes.add(src);
  console.warn(
    `[astro-ui] <Image layout="${layout}"> has no \`sizes\`, so the browser will assume it spans ` +
      `the full viewport and download a candidate sized for that. Pass \`sizes\` describing the ` +
      `container, e.g. sizes="(min-width: 1024px) 50vw, 100vw". Image: ${src}`
  );
};

/* ** */
export async function getImagesOptimized(
  image: ImageMetadata | string,
  {
    src: _,
    width,
    height,
    sizes,
    aspectRatio,
    objectFit,
    objectPosition,
    widths,
    layout = 'constrained',
    style = '',
    format,
    ...rest
  }: ImageProps,
  transform: ImagesOptimizer = () => Promise.resolve([])
): Promise<{ src: string; attributes: HTMLAttributes<'img'> }> {
  // Captured before `width` is defaulted below: `width` may be a caller's
  // desired render width, while this is what the file can actually supply.
  const sourceWidth = typeof image === 'string' ? undefined : Number(image.width) || undefined;

  if (typeof image !== 'string') {
    width ||= Number(image.width) || undefined;
    height ||= typeof width === 'number' ? computeHeight(width, image.width / image.height) : undefined;
  }

  width = (width && Number(width)) || undefined;
  height = (height && Number(height)) || undefined;

  widths ||= config.deviceSizes;
  sizes ||= getSizes(Number(width) || undefined, layout);
  warnIfSizesMissing(image, layout, sizes);
  aspectRatio = parseAspectRatio(aspectRatio);

  // Calculate dimensions from aspect ratio
  if (aspectRatio) {
    if (width) {
      if (height) {
        /* empty */
      } else {
        height = width / aspectRatio;
      }
    } else if (height) {
      width = Number(height * aspectRatio);
    } else if (layout !== 'fullWidth') {
      // Fullwidth images have 100% width, so aspectRatio is applicable
      console.error('When aspectRatio is set, either width or height must also be set');
      console.error('Image', image);
    }
  } else if (width && height) {
    aspectRatio = width / height;
  } else if (layout !== 'fullWidth') {
    // Fullwidth images don't need dimensions
    console.error('Either aspectRatio or both width and height must be set');
    console.error('Image', image);
  }

  let breakpoints = getBreakpoints({ width, breakpoints: widths, layout, sourceWidth });
  breakpoints = [...new Set(breakpoints)].sort((a, b) => a - b);

  const srcset = (await transform(image, breakpoints, Number(width) || undefined, Number(height) || undefined, format))
    .map(({ src, width }) => `${src} ${width}w`)
    .join(', ');

  return {
    src: typeof image === 'string' ? image : image.src,
    attributes: {
      width,
      height,
      srcset: srcset || undefined,
      sizes,
      style: `${getStyle({
        width,
        height,
        aspectRatio,
        objectFit,
        objectPosition,
        layout,
      })}${style ?? ''}`,
      ...rest,
    },
  };
}

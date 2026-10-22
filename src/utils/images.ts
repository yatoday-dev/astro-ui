import { astroAsseetsOptimizer, isUnpicCompatible, unpicOptimizer } from './images-optimization';

import type { OpenGraph, OpenGraphMedia } from '../components/Metadata/types';
import type { ImageMetadata } from 'astro';

const load = async function () {
  let images: Record<string, () => Promise<unknown>> | undefined;
  try {
    images = import.meta.glob(
      '/src/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}'
    );
  } catch (error) {
    // continue regardless of error
    console.error(error);
  }
  return images;
};

let _images: Record<string, () => Promise<unknown>> | undefined;

/** */
export const fetchLocalImages = async () => {
  _images = _images || (await load());
  return _images;
};

/** */
export const findImage = async (
  imagePath?: string | ImageMetadata | null
): Promise<string | ImageMetadata | undefined | null> => {
  // Not string
  if (typeof imagePath !== 'string') {
    return imagePath;
  }

  // Absolute paths
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
    return imagePath;
  }

  // Relative paths or not "~/assets/"
  if (!imagePath.startsWith('~/assets/images')) {
    return imagePath;
  }

  const images = await fetchLocalImages();
  const key = imagePath.replace('~/', '/src/');

  return images && typeof images[key] === 'function'
    ? ((await images[key]()) as { default: ImageMetadata }).default
    : null;
};

/**
 * Prepares the OpenGraph images of a page for their meta tags.
 *
 * Only an image of the site's own `~/assets/images` goes through `astro:assets`
 * — the build has the file, so it can be resized and re-encoded for a social
 * card. An image given by its URL is already published: an absolute URL on a
 * CDN unpic knows is resized by that CDN's own URL parameters, and any other
 * URL (absolute, or a path under `public/`) is used as it is, with the width,
 * height and alt the caller gave. `getImage` cannot take such an image:
 * a path under `public/` has no dimensions for it to read (MissingImageDimension),
 * a host outside `image.domains` is refused (RemoteImageNotAllowed), and a
 * host inside it would be downloaded on every build only to be re-encoded.
 *
 * An image that cannot be resolved — a `~/assets/images` file that does not
 * exist — is left out, rather than kept with an empty URL that the page would
 * turn into its site's address.
 */
export const adaptOpenGraphImages = async (
  openGraph: OpenGraph = {},
  astroSite: URL | undefined = new URL('')
): Promise<OpenGraph> => {
  if (!openGraph?.images?.length) {
    return openGraph;
  }

  const defaultWidth = 1200;
  const defaultHeight = 626;

  /** The optimizers' result carries a height when they know it; their type only promises the width. */
  const heightOf = (optimized: { src: string; width: number }): number | undefined =>
    'height' in optimized && typeof optimized.height === 'number' ? optimized.height : undefined;

  const adaptImage = async (image: OpenGraphMedia): Promise<OpenGraphMedia | undefined> => {
    if (!image?.url) {
      return undefined;
    }

    const resolvedImage = (await findImage(image.url)) as ImageMetadata | string | null | undefined;
    if (!resolvedImage) {
      return undefined;
    }

    if (typeof resolvedImage === 'string') {
      const isRemote = resolvedImage.startsWith('http://') || resolvedImage.startsWith('https://');
      if (isRemote && isUnpicCompatible(resolvedImage)) {
        const [resized] = await unpicOptimizer(resolvedImage, [defaultWidth], defaultWidth, defaultHeight, 'jpg');

        return {
          url: String(new URL(resized.src, astroSite)),
          width: resized.width,
          height: heightOf(resized),
          alt: image.alt,
        };
      }

      return {
        url: String(new URL(resolvedImage, astroSite)),
        width: image.width,
        height: image.height,
        alt: image.alt,
      };
    }

    const [width, height] =
      resolvedImage.width <= defaultWidth ? [resolvedImage.width, resolvedImage.height] : [defaultWidth, defaultHeight];
    const [optimized] = await astroAsseetsOptimizer(resolvedImage, [width], width, height, 'jpg');
    if (!optimized?.src) {
      return undefined;
    }

    return {
      url: String(new URL(optimized.src, astroSite)),
      width: optimized.width,
      height: heightOf(optimized),
      // The optimizer only reworks the file; the description of what is
      // in the picture survives as the caller wrote it.
      alt: image.alt,
    };
  };

  const adaptedImages = (await Promise.all(openGraph.images.map(adaptImage))).filter(
    (image): image is OpenGraphMedia => image !== undefined
  );

  return { ...openGraph, images: adaptedImages };
};

export const createImageSrcBySize = (src: string, size: number, format: string = ''): string | undefined => {
  if (!src) {
    return;
  }

  const imageFilename = src.split('/').pop()!;
  const imageBaseName = imageFilename.split('.').slice(0, -1).join('.');
  const imageExt = format || imageFilename.split('.').pop()!;

  return src.replace(imageFilename, `${imageBaseName}-${size}.${imageExt}`);
};

export const getImagePathBySize = (src: string, size: number, format: string = ''): string => {
  if (!src) {
    return '';
  }

  const imageFilename = src.split('/').pop()!;
  const imageBaseName = imageFilename.split('.').slice(0, -1).join('.');
  const imageExt = format || imageFilename.split('.').pop()!;

  return `${src.replace(imageFilename, `${imageBaseName}-${size}.${imageExt}`)}?width=${size}`;
};

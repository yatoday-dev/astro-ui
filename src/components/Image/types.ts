// Re-export the canonical Image props so the public API stays in sync with
// what the component actually accepts. The real definition lives next to the
// optimizer (`utils/images-optimization.ts`) and supports `src` as
// string | ImageMetadata, plus `widths`, `sizes`, `srcset`, and every other
// <img> attribute. A hand-maintained subset here let the two drift.
import type { ImageProps } from '../../utils/images-optimization';

export type { ImageProps };

export type SvelteImageProps = ImageProps & {
  ref?: HTMLImageElement | null;
};

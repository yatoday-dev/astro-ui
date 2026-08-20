// `astro:assets` is a virtual module the Astro build provides; vitest runs
// outside that build, so images-optimization.ts is pointed here instead (see
// the alias in vitest.config.ts). Only the surface the module imports is
// stubbed — tests drive the resizing through the `transform` argument of
// getImagesOptimized rather than through this.
export const getImage = async ({ width }: { src: unknown; width?: number }) => ({
  src: `/stub-${width ?? 0}.webp`,
  attributes: { width },
});

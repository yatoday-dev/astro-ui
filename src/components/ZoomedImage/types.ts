import type { Image } from '../../types';
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type ZoomedImageProps = {} & Image;

export type SvelteZoomedImageProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & ZoomedImageProps;

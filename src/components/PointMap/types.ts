import type {HotspotPoint} from "../../types";
import type { Snippet } from 'svelte';

export type PointMapProps = {
  via?: any;
  items: HotspotPoint[];
  pointsDisplayMode?: 'always' | 'hover' | undefined; // controls visibility of hotspot points
  classes?: Record<string, string>;
}

export type SveltePointMapProps = {
  via?: any;
  items?: HotspotPoint[];
  pointsDisplayMode?: 'always' | 'hover' | undefined;
  classes?: Record<string, string>;
  children?: Snippet;
}

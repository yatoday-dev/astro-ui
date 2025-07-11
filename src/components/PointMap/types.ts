import type {HotspotPoint} from "../../types";

export type PointMapProps = {
  via?: any;
  items: HotspotPoint[];
  pointsDisplayMode?: 'always' | 'hover' | undefined; // controls visibility of hotspot points
  classes?: Record<string, string>;
}

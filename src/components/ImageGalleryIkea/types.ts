import type { Image } from '../../types';

export type ImageGalleryIkeaProps = {
  id?: string;
  height?: string;
  withNavigation?: boolean;
  classes?: Record<string, string>;
  images?: Image[];
};

import type { Image, ToAction } from '../../types';
import type { WidgetWrapperProps } from '~/components/WidgetWrapper/types.ts';
import type { HeadlineProps } from '~/components/Headline/types.ts';

export type WidgetHero2Props = {
  position?: 'center' | 'left' | 'right';
  content?: string;
  actions?: string | ToAction[];
  image?: string | Image;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;

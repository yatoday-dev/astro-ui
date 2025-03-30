import type { WidgetWrapperProps } from '../WidgetWrapper/types';
import type { HeadlineProps } from '../Headline/types';
import type { Card1Props } from '../Card1/types';
import type { Card2Props } from '../Card2/types';
import type { Card3Props } from '../Card3/types';

export type WidgetCardSliderProps = {
  via?: any;
  items?: Card1Props[] | Card2Props[] | Card3Props[];
  isAfterContent?: boolean;
  withNavigation?: boolean;
} & WidgetWrapperProps &
  Omit<HeadlineProps, 'classes'>;

import type { WidgetWrapperProps } from "../WidgetWrapper/types";
import type {HeroSectionProps} from "../HeroSection/types";

export type WidgetHeroSliderProps = {
  items?: HeroSectionProps[];
  height: string;
  isAfterContent: boolean;
  withPagination: boolean;
  withNavigation: boolean;
} & WidgetWrapperProps;

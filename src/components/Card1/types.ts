import type {HTMLTag} from 'astro/types';
import type {Card0Props} from "../Card0/types";
import type {CallToActionProps} from "../CallToAction/types";

export type Card1Props = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  icon?: string;
  callToAction?: CallToActionProps;
  data?: INameValue[];
  links?: ILink[];
  badge?: any;
} & Card0Props;

interface ILink {
  href?: string;
  text?: string;
}

interface INameValue {
  name?: string;
  value?: string;
}

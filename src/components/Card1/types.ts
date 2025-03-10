import type {HTMLTag} from 'astro/types';
import type {Card0Props} from "../Card0/types";
import type {ICallToAction} from "../CallToAction/types";

export type Card1Props = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  icon?: string;
  callToAction?: ICallToAction;
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

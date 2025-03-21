import type { HTMLTag } from 'astro/types';
import type { Card0Props } from '../Card0/types';
import type { ToAction, Link, NameValue } from '../../types';

export type Card1Props = {
  asHeader?: HTMLTag;
  title?: string;
  description?: string;
  icon?: string;
  callToAction?: ToAction;
  data?: NameValue[];
  links?: Link[];
  badge?: string;
} & Card0Props;

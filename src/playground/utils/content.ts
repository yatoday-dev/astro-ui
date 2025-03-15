// @ts-ignore
import { getCollection, render, type CollectionEntry } from 'astro:content';
import { cleanSlug, trimSlash } from '../../utils';

const BLOG_BASE = 'docs';
const POST_PERMALINK_PATTERN = trimSlash(`${BLOG_BASE}/%slug%`);

interface Category {
  slug: string;
  title: string;
}

interface Categories {
  [key: string]: Category;
}

import type { Post } from '../types';

const generatePermalink = async ({
  id,
  slug,
  category,
}: {
  id: string;
  slug: string;
  category: string | undefined;
}) => {
  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '');
  return permalink
    .split('/')
    .map((el: string) => trimSlash(el))
    .filter((el: string) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<'docs'>): Promise<Post> => {
  const { id, data } = post;
  const { Content } = await render(post);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    draft = false,
    metadata = {},
  } = data;

  const slug = cleanSlug(id); // cleanSlug(rawSlug.split('/').pop());

  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, category: category?.slug }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,

    draft: draft,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API
  };
};

const load = async function (): Promise<Array<Post>> {
  const posts = await getCollection('docs');
  const normalizedPosts = posts.map(async (post: Post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))
    .sort((a: Post, b: Post) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .sort((a: Post, b: Post) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    })
    .filter((post: Post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

/** */
export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

export const getCategories = async () => {
  const posts = await fetchPosts();
  const categories: Categories = {};
  posts.map((post) => {
    if (post.category?.slug) {
      categories[post.category?.slug] = post.category;
    }
  });
  return categories;
};

/** */
export const getStaticPathsBlogPost = async () => {
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      docs: post.permalink,
    },
    props: { post },
  }));
};

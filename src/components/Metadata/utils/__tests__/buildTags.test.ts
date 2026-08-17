import { describe, it, expect } from 'vitest';
import { buildTags } from '../buildTags';

describe('buildTags - Twitter card', () => {
  it('should derive card text and image from OpenGraph', () => {
    const tags = buildTags({
      title: 'Page title',
      description: 'Page description',
      openGraph: {
        title: 'OG title',
        description: 'OG description',
        images: [{ url: 'https://example.com/og.jpg', alt: 'OG alt' }],
      },
      twitter: { cardType: 'summary_large_image' },
    });

    expect(tags).toContain('<meta name="twitter:card" content="summary_large_image">');
    expect(tags).toContain('<meta name="twitter:title" content="OG title">');
    expect(tags).toContain('<meta name="twitter:description" content="OG description">');
    expect(tags).toContain('<meta name="twitter:image" content="https://example.com/og.jpg">');
    expect(tags).toContain('<meta name="twitter:image:alt" content="OG alt">');
  });

  it('should fall back to the page title and description when OpenGraph has none', () => {
    const tags = buildTags({
      title: 'Page title',
      description: 'Page description',
      twitter: { cardType: 'summary' },
    });

    expect(tags).toContain('<meta name="twitter:title" content="Page title">');
    expect(tags).toContain('<meta name="twitter:description" content="Page description">');
    expect(tags).not.toContain('twitter:image');
  });

  it('should prefer explicit Twitter values over the OpenGraph ones', () => {
    const tags = buildTags({
      title: 'Page title',
      openGraph: {
        title: 'OG title',
        description: 'OG description',
        images: [{ url: 'https://example.com/og.jpg', alt: 'OG alt' }],
      },
      twitter: {
        cardType: 'summary_large_image',
        title: 'Twitter title',
        description: 'Twitter description',
        image: 'https://example.com/twitter.jpg',
        imageAlt: 'Twitter alt',
      },
    });

    expect(tags).toContain('<meta name="twitter:title" content="Twitter title">');
    expect(tags).toContain('<meta name="twitter:description" content="Twitter description">');
    expect(tags).toContain('<meta name="twitter:image" content="https://example.com/twitter.jpg">');
    expect(tags).toContain('<meta name="twitter:image:alt" content="Twitter alt">');
    expect(tags).not.toContain('<meta name="twitter:title" content="OG title">');
  });

  it('should emit the site and creator handles', () => {
    const tags = buildTags({
      twitter: { cardType: 'summary', site: '@site', handle: '@author' },
    });

    expect(tags).toContain('<meta name="twitter:site" content="@site">');
    expect(tags).toContain('<meta name="twitter:creator" content="@author">');
  });

  it('should emit no Twitter tags when the card is not configured', () => {
    const tags = buildTags({
      title: 'Page title',
      description: 'Page description',
      openGraph: { title: 'OG title' },
    });

    expect(tags).not.toContain('twitter:');
  });
});

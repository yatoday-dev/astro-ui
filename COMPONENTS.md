# @yatoday/astro-ui Component Library

This document provides a comprehensive reference for the `@yatoday/astro-ui` component library. Copy this file into projects that use the library to help AI assistants understand available components.

## About This Library

**@yatoday/astro-ui** is a component library built primarily for Astro, with partial Svelte 5 support. It provides 56 ready-to-use UI components for building modern websites.

- **NPM Package**: `@yatoday/astro-ui`
- **Repository**: https://github.com/yatoday-dev/astro-ui
- **Documentation**: https://astro-ui.dev.yatoday.es
- **Current Version**: 0.16.2 (early development, stable at v1.0)


## Installation & Usage

### Install the Package

```bash
npm install @yatoday/astro-ui
```

### Import Components

```astro
---
// Astro components
import { Button, Card1, WidgetHero1 } from '@yatoday/astro-ui/astro';

// Svelte components (limited availability)
import { Button, Card0 } from '@yatoday/astro-ui/svelte';

// Utilities
import { cn, trimSlash, createPath } from '@yatoday/astro-ui';
---
```

### Required Styles

Add the library's Tailwind CSS to your project:

```css
/* In your global CSS */
@import '@yatoday/astro-ui/styles/themes/default.css';
```

Or configure Tailwind to include the library's content:

```js
// tailwind.config.js
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@yatoday/astro-ui/dist/**/*.{astro,svelte,js,ts}'
  ]
}
```

---

## Component Catalog

### Interactive Components

#### Button
Versatile button component supporting both button and anchor elements.

```astro
<Button variant="primary" size="lg">Click me</Button>
<Button href="/about" variant="outline">Learn More</Button>
<Button variant="ghost" icon="tabler:settings" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` \| `'primary'` \| `'accent'` \| `'destructive'` \| `'outline'` \| `'ghost'` \| `'link'` | `'default'` | Visual style |
| `size` | `'default'` \| `'sm'` \| `'lg'` \| `'icon'` | `'default'` | Button size |
| `text` | `string` | - | Button text (alternative to slot) |
| `icon` | `string` | - | Icon name |
| `href` | `string` | - | Makes button an anchor element |
| `type` | `'button'` \| `'submit'` \| `'reset'` | `'button'` | Button type |

**Svelte**: Fully implemented

---

#### QuantitySwitch
Quantity selector with increment/decrement buttons.

```astro
<QuantitySwitch value={1} variant="outline" size="default" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` \| `'primary'` \| `'accent'` \| `'destructive'` \| `'outline'` \| `'ghost'` | `'default'` | Visual style |
| `size` | `'default'` \| `'sm'` \| `'lg'` | `'default'` | Component size |
| `value` | `number` | `0` | Current quantity |

**Svelte**: Fully implemented

---

#### CopyToClipboard
Button to copy text to clipboard.

```astro
<CopyToClipboard text="Text to copy" variant="outline" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Text to copy |
| `variant` | Button variants | `'default'` | Button style |
| `size` | Button sizes | `'default'` | Button size |

**Svelte**: Fully implemented

---

#### DarkMode
Dark mode toggle button.

```astro
<DarkMode initialMode="system" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialMode` | `'system'` \| `'light'` \| `'dark'` \| `'light:only'` \| `'dark:only'` | `'system'` | Initial mode |
| `label` | `string` | - | Accessibility label |
| `iconName` | `string` | - | Custom icon |

---

#### BackToTopButton
Scroll-to-top button that appears after scrolling.

```astro
<BackToTopButton scrollOffset={400} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scrollOffset` | `number` | `300` | Scroll distance before showing |
| `selector` | `string` | - | Target element selector |

---

#### CookieConsent
GDPR/cookie consent banner with Google Consent Mode v2 support.

```astro
<CookieConsent
  title="Cookie Settings"
  description="We use cookies..."
  allowText="Accept All"
  denyText="Reject All"
  position="bottom"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Banner title |
| `description` | `string` | - | Banner description |
| `allowText` | `string` | - | Accept button text |
| `denyText` | `string` | - | Reject button text |
| `position` | `'bottom'` \| `'top'` \| `'center'` | `'bottom'` | Banner position |
| `cookieName` | `string` | - | Cookie name for consent |
| `cookieExpireDays` | `number` | - | Cookie expiration |
| `googleAnalyticsId` | `string` | - | GA ID for consent mode |

---

### Card Components

All cards extend `Card0` with different feature combinations.

#### Card0
Base card component with image, content, and badge positioning.

```astro
<Card0 image={{ src: '/img.jpg', alt: 'Image' }}>
  <p>Card content</p>
  <Fragment slot="badge">Featured</Fragment>
</Card0>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `Image` | - | Card image |
| `as` | `string` | `'article'` | HTML tag |
| `badge` | `string` | - | Badge text (or use slot) |
| `badgeTopRight` | `string` | - | Top-right badge |
| `badgeBottomRight` | `string` | - | Bottom-right badge |
| `badgeBottomLeft` | `string` | - | Bottom-left badge |
| `widths` | `number[]` | - | Responsive image widths |
| `sizes` | `string` | - | Image sizes attribute |

**Svelte**: Fully implemented

---

#### Card1
Feature card with title, description, icon, actions, data points, and links.

```astro
<Card1
  title="Feature"
  description="Description text"
  icon="tabler:star"
  callToAction={{ text: 'Learn More', href: '/feature' }}
  data={[{ name: 'Price', value: '$99' }]}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Card title |
| `description` | `string` | Card description |
| `icon` | `string` | Icon name |
| `callToAction` | `ToAction \| ToAction[]` | Action button(s) |
| `data` | `NameValue[]` | Key-value data points |
| `links` | `Link[]` | Additional links |
| `asHeader` | `string` | Title HTML tag |

---

#### Card2
Simplified card with title, description, icon, and single CTA.

```astro
<Card2
  title="Service"
  description="Service description"
  icon="tabler:rocket"
  url="/service"
/>
```

---

#### Card3
Card with title, description, badge, and multiple CTAs.

```astro
<Card3
  title="Product"
  description="Product info"
  badge="New"
  callToAction={[
    { text: 'Buy', href: '/buy' },
    { text: 'Details', href: '/details', variant: 'outline' }
  ]}
/>
```

---

#### Card4
Card with icon, title, description, and footer slot.

```astro
<Card4
  title="FAQ Item"
  description="Answer to frequently asked question"
  icon="tabler:help"
/>
```

---

#### Card5
Card with author information support.

```astro
<Card5
  title="Article"
  description="Article excerpt"
  author="John Doe"
  authorDescription="Software Engineer"
  image={{ src: '/author.jpg', alt: 'Author' }}
/>
```

---

#### Card6
Card variant with image sizing controls.

```astro
<Card6
  title="Gallery Item"
  description="Item description"
  image={{ src: '/item.jpg', alt: 'Item' }}
  widths={[400, 800]}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

---

#### Card7
Minimal card with icon, title, description, and single CTA.

```astro
<Card7
  title="Quick Link"
  description="Brief description"
  icon="tabler:arrow-right"
  callToAction={{ text: 'Go', href: '/page' }}
/>
```

---

### Widget Components

Widgets are high-level section components for building page layouts. All widgets extend `WidgetWrapper`.

#### WidgetWrapper
Base wrapper for all widgets providing consistent styling.

```astro
<WidgetWrapper id="section" isDark={false} containerClass="max-w-6xl">
  <p>Section content</p>
</WidgetWrapper>
```

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Section ID |
| `isDark` | `boolean` | Dark background variant |
| `containerClass` | `string` | Container CSS classes |
| `bg` | `string` | Background element (slot content) |
| `as` | `string` | HTML tag (default: `section`) |

---

#### WidgetHero0 / WidgetHero1 / WidgetHero2
Hero section variants with different layouts.

```astro
<WidgetHero1
  title="Welcome"
  description="Hero description"
  tagline="Tagline"
  image={{ src: '/hero.jpg', alt: 'Hero' }}
  actions={[
    { text: 'Get Started', href: '/start', variant: 'primary' },
    { text: 'Learn More', href: '/about', variant: 'outline' }
  ]}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Hero title |
| `description` | `string` | Hero description |
| `tagline` | `string` | Small tagline above title |
| `image` | `Image` | Hero image |
| `actions` | `ToAction[]` | CTA buttons |
| `stats` | `Stat[]` | Statistics to display |
| `links` | `Link[]` | Additional links |
| `position` | `string` | Content position |

---

#### WidgetHeroSlider
Hero slider with multiple slides.

```astro
<WidgetHeroSlider
  height="600px"
  withNavigation
  withPagination
  items={[
    { title: 'Slide 1', description: '...', image: {...} },
    { title: 'Slide 2', description: '...', image: {...} }
  ]}
/>
```

---

#### WidgetNavbar
Navigation bar with menu links, actions, and theme toggle.

```astro
<WidgetNavbar
  isSticky
  showToggleTheme
  links={[
    { text: 'Home', href: '/' },
    { text: 'Products', href: '/products', links: [
      { text: 'Category 1', href: '/products/cat1' },
      { text: 'Category 2', href: '/products/cat2' }
    ]}
  ]}
  actions={[
    { text: 'Contact', href: '/contact', variant: 'primary' }
  ]}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `links` | `IMenuLink[]` | Navigation links (supports nesting) |
| `actions` | `ToAction[]` | Action buttons |
| `isSticky` | `boolean` | Sticky header |
| `isDark` | `boolean` | Dark variant |
| `showToggleTheme` | `boolean` | Show dark mode toggle |

---

#### WidgetFooter
Footer section with links, social links, and branding.

```astro
<WidgetFooter
  theme="dark"
  links={[
    { title: 'Company', links: [
      { text: 'About', href: '/about' },
      { text: 'Careers', href: '/careers' }
    ]}
  ]}
  socialLinks={[
    { icon: 'tabler:brand-twitter', href: 'https://twitter.com/...' }
  ]}
  note="© 2024 Company. All rights reserved."
/>
```

---

#### WidgetContent
Content section with image, items, hotspots, and CTA.

```astro
<WidgetContent
  title="Features"
  subtitle="What we offer"
  isReversed
  image={{ src: '/content.jpg', alt: 'Features' }}
  items={[
    { title: 'Feature 1', description: 'Description', icon: 'tabler:check' },
    { title: 'Feature 2', description: 'Description', icon: 'tabler:check' }
  ]}
  callToAction={{ text: 'Learn More', href: '/features' }}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Section title |
| `subtitle` | `string` | Section subtitle |
| `tagline` | `string` | Tagline above title |
| `image` | `Image` | Section image |
| `items` | `Item[]` | Feature items |
| `isReversed` | `boolean` | Reverse image/content order |
| `columns` | `number` | Items grid columns |
| `callToAction` | `ToAction` | CTA button |

---

#### WidgetFeaturesCard
Features section with card grid.

```astro
<WidgetFeaturesCard
  title="Our Services"
  columns={3}
  items={[
    { title: 'Service 1', description: '...', icon: 'tabler:star' },
    { title: 'Service 2', description: '...', icon: 'tabler:heart' }
  ]}
/>
```

---

#### WidgetFaq1 / WidgetFaq2
FAQ sections - card grid (Faq1) or accordion (Faq2).

```astro
<WidgetFaq2
  title="FAQ"
  openFirstItem
  items={[
    { question: 'Question 1?', answer: 'Answer 1' },
    { question: 'Question 2?', answer: 'Answer 2' }
  ]}
/>
```

---

#### WidgetTestimonials
Testimonials grid section.

```astro
<WidgetTestimonials
  title="What People Say"
  columns={3}
  items={[
    { testimonial: 'Great product!', name: 'John', job: 'CEO' },
    { testimonial: 'Highly recommend', name: 'Jane', job: 'Designer' }
  ]}
/>
```

---

#### WidgetStats
Statistics widget section.

```astro
<WidgetStats
  title="Our Impact"
  items={[
    { name: 'Customers', value: '10K+' },
    { name: 'Projects', value: '500+' }
  ]}
/>
```

---

#### WidgetBrands
Brand logos display section.

```astro
<WidgetBrands
  title="Trusted By"
  images={[
    { src: '/brands/logo1.svg', alt: 'Brand 1' },
    { src: '/brands/logo2.svg', alt: 'Brand 2' }
  ]}
/>
```

---

#### WidgetSteps1 / WidgetStepsTimeline
Process/steps sections.

```astro
<WidgetStepsTimeline
  title="How It Works"
  items={[
    { title: 'Step 1', description: 'First step', icon: 'tabler:number-1' },
    { title: 'Step 2', description: 'Second step', icon: 'tabler:number-2' }
  ]}
/>
```

---

#### WidgetCallToAction1
Call-to-action widget section.

```astro
<WidgetCallToAction1
  title="Ready to Start?"
  subtitle="Join thousands of happy customers"
  actions={[
    { text: 'Get Started', href: '/signup', variant: 'primary' }
  ]}
/>
```

---

#### WidgetCardSlider
Card slider widget with Swiper.

```astro
<WidgetCardSlider
  title="Featured"
  withNavigation
  items={[...cardItems]}
/>
```

---

#### WidgetSwiperPhotoSlider
Photo slider widget.

```astro
<WidgetSwiperPhotoSlider
  title="Gallery"
  imagesFolder="/images/gallery"
  withNavigation
/>
```

---

### Layout & SEO Components

#### Layout
Page layout wrapper with metadata support.

```astro
<Layout
  title="Page Title"
  description="Page description"
  openGraph={{ image: '/og-image.jpg' }}
>
  <main>Page content</main>
</Layout>
```

---

#### Metadata / SEO
SEO metadata components.

```astro
<Metadata
  title="Page Title"
  description="Description"
  canonical="https://example.com/page"
  openGraph={{ title: 'OG Title', image: '/og.jpg' }}
/>
```

---

#### Analytics
Google Analytics and GTM integration.

```astro
<Analytics googleAnalyticsId="G-XXXXXXX" partytown />
```

---

#### SiteVerification
Site verification meta tags.

```astro
<SiteVerification googleSiteVerificationId="xxx" />
```

---

### Image Components

#### Image
Optimized image component using unpic.

```astro
<Image
  src="/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  layout="constrained"
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `src` | `string` | Image source |
| `alt` | `string` | Alt text |
| `width` | `number` | Image width |
| `height` | `number` | Image height |
| `layout` | `'fixed'` \| `'constrained'` \| `'fullWidth'` \| `'cover'` \| `'responsive'` \| `'contained'` | Layout mode |
| `loading` | `'lazy'` \| `'eager'` | Loading strategy |

---

#### ZoomedImage
Image with zoom functionality on click.

```astro
<ZoomedImage src="/photo.jpg" alt="Click to zoom" />
```

---

#### ImagePreload
Preload link tags for critical images (LCP optimization).

```astro
<ImagePreload src="/hero.jpg" fetchpriority="high" />
```

---

#### ImageGalleryIkea
IKEA-style image gallery with vertical thumbnail navigation.

```astro
<ImageGalleryIkea
  images={[
    { src: '/img1.jpg', alt: 'Image 1' },
    { src: '/img2.jpg', alt: 'Image 2' }
  ]}
  withNavigation
/>
```

---

#### PointMap
Interactive hotspot/point map with popup cards.

```astro
<PointMap
  via={Card2}
  items={[
    { x: 25, y: 30, title: 'Feature 1', description: '...' },
    { x: 75, y: 60, title: 'Feature 2', description: '...' }
  ]}
  pointsDisplayMode="hover"
/>
```

---

### Navigation Components

#### Breadcrumbs / BreadcrumbsItem
Breadcrumb navigation with structured data.

```astro
<Breadcrumbs
  ariaLabel="Breadcrumb"
  items={[
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { label: 'Current Page', currentPage: true }
  ]}
/>
```

---

### Content Components

#### Headline
Section headline with title, subtitle, and tagline.

```astro
<Headline
  title="Section Title"
  subtitle="Section subtitle text"
  tagline="Tagline"
  position="center"
/>
```

---

#### HeroSection
Hero content section (used inside WidgetHeroSlider).

```astro
<HeroSection
  title="Hero Title"
  description="Description"
  image={{ src: '/hero.jpg', alt: 'Hero' }}
  callToAction={[{ text: 'CTA', href: '/action' }]}
/>
```

---

#### Timeline
Vertical timeline component.

```astro
<Timeline
  defaultIcon="tabler:circle"
  items={[
    { title: '2020', description: 'Event 1' },
    { title: '2021', description: 'Event 2' }
  ]}
/>
```

---

#### Stats0
Statistics display component.

```astro
<Stats0
  items={[
    { name: 'Users', value: '10K+' },
    { name: 'Revenue', value: '$1M+' }
  ]}
/>
```

---

### Utility Components

#### ConditionalWrapper
Conditionally wraps content based on a condition.

```astro
<ConditionalWrapper condition={hasLink} href="/link">
  <span>Content</span>
</ConditionalWrapper>
```

**Svelte**: Fully implemented

---

#### Background
Simple background wrapper.

```astro
<Background isDark>
  <div>Content with dark background</div>
</Background>
```

---

### Grid Components

#### ItemGrid0 / ItemGrid1
Responsive grid layouts.

```astro
<ItemGrid0 columns={3}>
  <Card2 title="Item 1" />
  <Card2 title="Item 2" />
  <Card2 title="Item 3" />
</ItemGrid0>
```

---

### Slider Components

#### SwiperSlider
Generic Swiper slider wrapper.

```astro
<SwiperSlider id="my-slider" withNavigation>
  <div class="swiper-slide">Slide 1</div>
  <div class="swiper-slide">Slide 2</div>
</SwiperSlider>
```

---

## Common Types

```typescript
// Action button
type ToAction = {
  text?: string;
  href?: string;
  icon?: string;
  variant?: ButtonVariant;
  class?: string;
}

// Image
type Image = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Menu link (supports nesting)
type IMenuLink = {
  text: string;
  href?: string;
  links?: IMenuLink[];
  icon?: string;
}

// Name-value pair
type NameValue = {
  name: string;
  value: string;
}

// FAQ item
type FaqItem = {
  question: string;
  answer: string;
}

// Testimonial
type Testimonial = {
  testimonial: string;
  name: string;
  job?: string;
  image?: Image;
}
```

---

## Contributing to the Library

If you need to modify the library for your project:

### Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/yatoday-dev/astro-ui.git
cd astro-ui

# 2. Install dependencies
npm install

# 3. Start development server (documentation site)
npm run dev

# 4. Link locally for testing in other projects
npm link

# In your project:
npm link @yatoday/astro-ui
```

### Making Changes

```bash
# Run checks before committing
npm run check          # All checks (Astro, ESLint, Prettier)
npm run fix            # Auto-fix issues

# Build for testing
npm run build:package  # Build NPM package (outputs to dist/)

# After local changes, rebuild:
npm run build:local
# Changes will be reflected in linked projects
```

### Creating New Components

```bash
# Generate component scaffold
npm run create-component MyComponent

# This creates:
# src/components/MyComponent/
#   ├── MyComponent.astro
#   ├── MyComponent.svelte (stub)
#   └── types.ts
```

### Testing

```bash
npm test              # Run tests once
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Key Files

| File | Purpose |
|------|---------|
| `src/components/` | All component source files |
| `src/utils/` | Utility functions |
| `src/assets/styles/themes/` | CSS theme files |
| `scripts/build.js` | Build orchestration |
| `scripts/buildImports.js` | Auto-generates entry points |
| `dist/` | NPM package output (auto-generated) |

### Important Notes

- **Never edit `dist/` files directly** - they are auto-generated
- Entry points (`dist/astro.js`, `dist/svelte.js`) are created by scanning components
- Use `cn()` utility for class merging (handles Tailwind conflicts)
- Follow Svelte 5 patterns: `$props()`, `$bindable()`, `{@render}`
- Check `CLAUDE.md` in the repository for detailed development guidelines

---

## Quick Reference

### Most Used Components

| Component | Use Case |
|-----------|----------|
| `Button` | Actions, links, CTAs |
| `Card1` / `Card2` | Feature cards, content cards |
| `WidgetHero1` | Hero sections |
| `WidgetNavbar` | Navigation header |
| `WidgetFooter` | Page footer |
| `WidgetContent` | Content sections with image |
| `WidgetFeaturesCard` | Feature grids |
| `WidgetFaq2` | FAQ accordion |
| `Image` | Optimized images |
| `Headline` | Section headers |

### Import Cheatsheet

```astro
---
// All Astro components
import {
  Button,
  Card1, Card2, Card3,
  WidgetHero1, WidgetNavbar, WidgetFooter,
  WidgetContent, WidgetFeaturesCard,
  Image, Headline
} from '@yatoday/astro-ui/astro';

// Utilities
import { cn, trimSlash, createPath } from '@yatoday/astro-ui';
---
```

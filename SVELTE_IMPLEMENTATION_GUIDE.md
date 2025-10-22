# Svelte Implementation Guide

This guide provides step-by-step instructions for implementing the 47 missing Svelte components in @yatoday/astro-ui.

## Current Status

**Completed Svelte Implementations (5/52):**
- Button (39 lines) - src/components/Button/Button.svelte
- Card0 (30 lines) - src/components/Card0/Card0.svelte
- ConditionalWrapper (18 lines) - src/components/ConditionalWrapper/ConditionalWrapper.svelte
- CopyToClipboard (50 lines) - src/components/CopyToClipboard/CopyToClipboard.svelte
- QuantitySwitch (106 lines) - src/components/QuantitySwitch/QuantitySwitch.svelte

**Stub Components (47/52):**
All other components have placeholder .svelte files containing only:
```svelte
<script lang="ts">
  import type { ComponentNameProps } from './types'
</script>
```

## Implementation Priority

### Tier 1: Foundation Components (High Impact)
These are core UI elements used throughout applications:

1. **DarkMode** - Theme toggle functionality
2. **Image** - Image component with optimization
3. **Breadcrumbs** + **BreadcrumbsItem** - Navigation
4. **Headline** - Typography component
5. **Background** - Layout component

### Tier 2: Layout & Container Components
Essential for page structure:

6. **Layout** - Page layout wrapper
7. **WidgetWrapper** - Widget container
8. **HeroSection** - Hero sections
9. **CallToAction** - CTA sections

### Tier 3: Widget Components
Complex page sections (implement after studying Astro versions):

10. **WidgetHero0**, **WidgetHero1**, **WidgetHero2** - Hero variants
11. **WidgetFeatures0**, **WidgetFeaturesCard** - Feature sections
12. **WidgetNavbar** - Navigation bar
13. **WidgetFooter** - Footer component
14. **WidgetCallToAction1** - CTA widget
15. **WidgetFaq1** - FAQ sections
16. **WidgetTestimonials** - Testimonial sections
17. **WidgetStats** - Statistics display
18. **WidgetSteps1**, **WidgetStepsTimeline** - Step/process displays
19. **WidgetContent** - Content sections
20. **WidgetBrands** - Brand showcase

### Tier 4: Card Components
Display components for content:

21. **Card1** through **Card7** - Card variants
22. **ItemGrid0**, **ItemGrid1** - Grid layouts

### Tier 5: Specialized Components
Advanced functionality:

23. **Stats0** - Statistics component
24. **Timeline** - Timeline display
25. **SwiperSlider**, **WidgetCardSlider**, **WidgetHeroSlider**, **WidgetSwiperPhotoSlider** - Slider variants
26. **ImageGalleryIkea** - Image gallery
27. **PointMap** - Interactive map
28. **ZoomedImage** - Image zoom functionality
29. **BackToTopButton** - Scroll to top
30. **SiteVerification** - SEO/verification meta tags
31. **Metadata** - SEO metadata
32. **Analytics** - Analytics integration

## Implementation Workflow

### Step 1: Study the Reference Implementations

Before implementing any component, thoroughly review these 5 examples:

#### Button.svelte - Best for Learning:
```svelte
<script lang="ts">
  import { cn } from '~/utils';
  import { themeVariants } from "./theme-variants.ts";
  import type { SvelteButtonProps } from "~/components/Button/types.ts";

  let {
    class: className = '',
    variant = 'default',
    size = 'default',
    ref = $bindable(null),
    href = undefined,
    text = undefined,
    type = 'button',
    children,
    ...restProps
  }: SvelteButtonProps = $props()
</script>

{#if href}
  <a bind:this={ref} class={cn(themeVariants({ size, variant }), className)} {href} {...restProps}>
    {text}
    {@render children?.()}
  </a>
{:else}
  <button bind:this={ref} class={cn(themeVariants({ size, variant }), className)} {type} {...restProps}>
    {text}
    {@render children?.()}
  </button>
{/if}
```

**Key Patterns:**
- Conditional element rendering (`{#if href}`)
- Two-way binding with `$bindable()` for `ref`
- Spreading rest props (`{...restProps}`)
- Using `cn()` for class merging
- Rendering children with `{@render children?.()}`
- Theme variants integration

#### Card0.svelte - Best for Complex Layouts:
Study this for components with multiple slots and complex structure.

#### ConditionalWrapper.svelte - Best for Wrapper Patterns:
Study this for conditional wrapper logic.

#### CopyToClipboard.svelte - Best for Interactivity:
Study this for client-side state management and event handling.

#### QuantitySwitch.svelte - Best for Complex State:
Study this for components with significant internal state and two-way binding.

### Step 2: Analyze the Astro Component

Before implementing, read the corresponding `.astro` file to understand:

1. **Props and their defaults**
2. **Slot usage** (default slot, named slots)
3. **Conditional rendering logic**
4. **Class name handling**
5. **Sub-component imports**
6. **Special Astro features** that need Svelte equivalents

Example analysis for a Widget component:
```astro
---
// Astro frontmatter
import type { WidgetHeroProps as Props } from './types';
import Headline from '../Headline/Headline.astro';
import Button from '../Button/Button.astro';

const { title, subtitle, callToAction, image } = Astro.props;
---

<section>
  {title && <Headline title={title} subtitle={subtitle} />}
  {image && <img src={image.src} alt={image.alt} />}
  {callToAction && <Button {...callToAction} />}
  <slot />
</section>
```

Svelte equivalent considerations:
- Import Svelte versions of sub-components
- Use `{#if}` blocks instead of `&&`
- Use snippets instead of slots
- Handle props with `$props()`

### Step 3: Update or Create Types

Check `types.ts` to see if `SvelteComponentProps` exists. If not, add it:

```typescript
// types.ts
import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';

// Generic props (used by both frameworks)
export type ComponentNameProps = {
  title?: string;
  subtitle?: string;
  class?: string;
}

// Svelte-specific props (add if needed)
export type SvelteComponentNameProps = WithElementRef<HTMLAttributes<HTMLDivElement>> &
  ComponentNameProps & {
    ref?: HTMLDivElement | null;
    children?: Snippet;
  };
```

**When to create separate Svelte types:**
- Component needs element reference binding (`ref`)
- Component accepts HTML attributes (class, id, style, data-*, aria-*, etc.)
- Component needs snippet/children prop
- Component has event handlers

**When to use just ComponentProps:**
- Simple presentation components
- Components that only render sub-components
- No direct DOM element exposure

### Step 4: Implement the Svelte Component

#### Basic Template:

```svelte
<script lang="ts">
  import { cn } from '~/utils';
  import type { SvelteComponentNameProps } from './types';

  // Import sub-components (Svelte versions)
  import SubComponent from '../SubComponent/SubComponent.svelte';

  let {
    class: className = '',
    ref = $bindable(null),
    children,
    // ... other props with defaults
    ...restProps
  }: SvelteComponentNameProps = $props()

  // Component state (if needed)
  let localState = $state(initialValue);
</script>

<div bind:this={ref} class={cn('base-classes', className)} {...restProps}>
  {#if condition}
    <SubComponent {...subProps} />
  {/if}

  {@render children?.()}
</div>
```

#### Key Svelte 5 Patterns:

1. **Props Declaration:**
```svelte
let {
  prop1 = 'default',
  prop2,
  class: className = '',
  ref = $bindable(null),
  children,
  ...restProps
}: Props = $props()
```

2. **Conditional Rendering:**
```svelte
{#if condition}
  <Element />
{:else if otherCondition}
  <OtherElement />
{:else}
  <DefaultElement />
{/if}
```

3. **List Rendering:**
```svelte
{#each items as item, index (item.id)}
  <Item {...item} />
{/each}
```

4. **Children/Slot Rendering:**
```svelte
{@render children?.()}
```

5. **Named Snippets (if component has named slots in Astro):**
```svelte
<script lang="ts">
  let {
    header,  // Snippet for header
    footer,  // Snippet for footer
    children // Default content
  }: Props = $props()
</script>

<div>
  {#if header}
    {@render header()}
  {/if}

  {@render children?.()}

  {#if footer}
    {@render footer()}
  {/if}
</div>
```

6. **Element Binding:**
```svelte
<div bind:this={ref}>
```

7. **State Management:**
```svelte
let count = $state(0);
let doubled = $derived(count * 2);
```

8. **Event Handling:**
```svelte
<button onclick={() => handleClick()}>
```

### Step 5: Handle Common Conversion Patterns

#### Astro Slots → Svelte Snippets

**Astro:**
```astro
<slot />
<slot name="header" />
```

**Svelte:**
```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    header,  // Snippet | undefined
    children // Snippet | undefined
  }: Props = $props()
</script>

{@render header?.()}
{@render children?.()}
```

#### Astro Conditionals → Svelte If Blocks

**Astro:**
```astro
{title && <h1>{title}</h1>}
```

**Svelte:**
```svelte
{#if title}
  <h1>{title}</h1>
{/if}
```

#### Astro Arrays → Svelte Each Blocks

**Astro:**
```astro
{items.map(item => <Item {...item} />)}
```

**Svelte:**
```svelte
{#each items as item (item.id)}
  <Item {...item} />
{/each}
```

#### Class Name Handling

Always use the `cn()` utility:
```svelte
<script lang="ts">
  import { cn } from '~/utils';
  import { themeVariants } from './theme-variants';

  let { class: className = '', variant = 'default' } = $props()
</script>

<div class={cn(themeVariants({ variant }), className)}>
```

#### Sub-component Imports

**Astro:**
```astro
---
import Button from '../Button/Button.astro';
---
<Button text="Click me" />
```

**Svelte:**
```svelte
<script lang="ts">
  import Button from '../Button/Button.svelte';
</script>
<Button text="Click me" />
```

⚠️ **Important:** Always import the `.svelte` version, not `.astro`.

### Step 6: Test the Implementation

1. **Run type checking:**
```bash
npm run check:astro
```

2. **Test in the documentation site:**
   - Update the corresponding `.mdx` file in `src/data/docs/` to use your Svelte component
   - Run `npm run dev`
   - Verify all examples work correctly

3. **Compare with Astro version:**
   - Both should render identically
   - Both should accept the same props
   - Both should handle edge cases the same way

4. **Write tests (if complex behavior):**
```typescript
// ComponentName/__tests__/ComponentName.test.ts
import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import ComponentName from '../ComponentName.svelte';

describe('ComponentName', () => {
  it('renders with default props', () => {
    const { container } = render(ComponentName);
    expect(container.querySelector('.base-class')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(ComponentName, {
      props: { variant: 'primary' }
    });
    expect(container.querySelector('.variant-primary')).toBeInTheDocument();
  });
});
```

5. **Build package:**
```bash
npm run build:package
```

Verify your component is included in `dist/svelte.js`.

### Step 7: Document (if creating new component)

If you created a completely new component (not implementing an existing stub), add documentation:

```mdx
---
title: ComponentName
category: UI
---

import Demo from '~/playground/components/Demo.astro';
import ComponentName from '~/components/ComponentName/ComponentName.astro';

# ComponentName

Brief description of what the component does.

<Demo title="Basic Usage">
  <ComponentName prop1="value" />
</Demo>

<Demo title="With Variants">
  <ComponentName variant="primary" />
  <ComponentName variant="secondary" />
</Demo>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | undefined | Description |
| variant | 'default' \| 'primary' | 'default' | Variant style |

## Usage

\`\`\`astro
---
import ComponentName from '@yatoday/astro-ui/astro';
---

<ComponentName prop1="value" />
\`\`\`

\`\`\`svelte
<script>
  import ComponentName from '@yatoday/astro-ui/svelte';
</script>

<ComponentName prop1="value" />
\`\`\`
```

## Common Pitfalls and Solutions

### Pitfall 1: Forgetting to Import Svelte Versions

❌ **Wrong:**
```svelte
<script lang="ts">
  import Button from '../Button/Button.astro'; // Wrong!
</script>
```

✅ **Correct:**
```svelte
<script lang="ts">
  import Button from '../Button/Button.svelte';
</script>
```

### Pitfall 2: Not Using Optional Chaining for Snippets

❌ **Wrong:**
```svelte
{@render children()} <!-- Will error if children is undefined -->
```

✅ **Correct:**
```svelte
{@render children?.()}
```

### Pitfall 3: Forgetting $bindable for ref

❌ **Wrong:**
```svelte
let { ref = null }: Props = $props()
```

✅ **Correct:**
```svelte
let { ref = $bindable(null) }: Props = $props()
```

### Pitfall 4: Not Spreading restProps

❌ **Wrong:**
```svelte
<div class={className}>
```

✅ **Correct:**
```svelte
<div class={className} {...restProps}>
```

This allows users to pass arbitrary HTML attributes.

### Pitfall 5: Using Astro-Specific Features

Some Astro features don't have direct Svelte equivalents:

**Astro.slots.has():**
```astro
{Astro.slots.has('header') && <slot name="header" />}
```

**Svelte equivalent:**
```svelte
{#if header}
  {@render header()}
{/if}
```

**set:html (dangerous HTML injection):**
```astro
<div set:html={htmlString} />
```

**Svelte equivalent:**
```svelte
<div>{@html htmlString}</div>
```

### Pitfall 6: Theme Variants Not Imported

❌ **Wrong:**
```svelte
<div class={cn(variant, className)}>
```

✅ **Correct:**
```svelte
<script lang="ts">
  import { themeVariants } from './theme-variants';
</script>
<div class={cn(themeVariants({ variant }), className)}>
```

## Component-Specific Implementation Notes

### Analytics & Metadata Components

These often use Astro-specific head injection:
```astro
<!-- Analytics.astro -->
<script is:inline>
  // Script content
</script>
```

For Svelte, these may need to be implemented differently or use `<svelte:head>`:
```svelte
<svelte:head>
  <script>
    // Script content
  </script>
</svelte:head>
```

⚠️ **Note:** Some components like Analytics, Metadata, and SiteVerification may be better suited to remain Astro-only due to framework-specific head management.

### Widget Components

Widget components are typically large and complex. Implementation strategy:

1. **Start with the structure** - Layout and container elements
2. **Add sub-components** - Import Svelte versions of all sub-components
3. **Add conditional logic** - Convert Astro conditionals to Svelte if blocks
4. **Add props spreading** - Ensure all props are properly passed to sub-components
5. **Test thoroughly** - Widgets often have many edge cases

### Slider Components (Swiper-based)

Components using Swiper.js:
- WidgetHeroSlider
- WidgetCardSlider
- WidgetSwiperPhotoSlider
- SwiperSlider

These require:
1. Import Swiper Svelte components
2. Configure Swiper modules
3. Handle reactive updates
4. Manage Swiper lifecycle

Example pattern:
```svelte
<script lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import { Navigation, Pagination } from 'swiper/modules';

  let modules = [Navigation, Pagination];
</script>

<Swiper {modules} navigation pagination>
  {#each slides as slide}
    <SwiperSlide>
      <!-- Slide content -->
    </SwiperSlide>
  {/each}
</Swiper>
```

### Image Components

Components using image optimization (unpic):
- Image
- Background

Ensure proper import and prop passing:
```svelte
<script lang="ts">
  import { Image } from 'unpic';
</script>

<Image src={src} alt={alt} layout="constrained" {...restProps} />
```

## Testing Checklist

Before considering a Svelte implementation complete:

- [ ] Component renders without errors
- [ ] All props work as expected
- [ ] Default props work correctly
- [ ] Class name merging works (`className` prop + internal classes)
- [ ] Children/snippets render correctly
- [ ] Conditional rendering works
- [ ] Sub-components are imported from Svelte versions
- [ ] Element binding (ref) works if applicable
- [ ] Component matches Astro version's visual output
- [ ] Type checking passes (`npm run check`)
- [ ] Linting passes (`npm run check:eslint`)
- [ ] Documentation examples work
- [ ] Build succeeds (`npm run build:package`)
- [ ] Tests pass (if tests exist)

## Progress Tracking

As you implement components, track progress here:

### Tier 1 - Foundation (0/5)
- [ ] DarkMode
- [ ] Image
- [ ] Breadcrumbs
- [ ] BreadcrumbsItem
- [ ] Headline

### Tier 2 - Layout (0/4)
- [ ] Layout
- [ ] WidgetWrapper
- [ ] HeroSection
- [ ] CallToAction

### Tier 3 - Widgets (0/20)
- [ ] WidgetHero0
- [ ] WidgetHero1
- [ ] WidgetHero2
- [ ] WidgetFeatures0
- [ ] WidgetFeaturesCard
- [ ] WidgetNavbar
- [ ] WidgetFooter
- [ ] WidgetCallToAction1
- [ ] WidgetFaq1
- [ ] WidgetTestimonials
- [ ] WidgetStats
- [ ] WidgetSteps1
- [ ] WidgetStepsTimeline
- [ ] WidgetContent
- [ ] WidgetBrands
- [ ] WidgetCardSlider
- [ ] WidgetHeroSlider
- [ ] WidgetSwiperPhotoSlider
- [ ] Background
- [ ] Analytics

### Tier 4 - Cards (0/8)
- [ ] Card1
- [ ] Card2
- [ ] Card3
- [ ] Card4
- [ ] Card5
- [ ] Card6
- [ ] Card7
- [ ] ItemGrid0
- [ ] ItemGrid1

### Tier 5 - Specialized (0/10)
- [ ] Stats0
- [ ] Timeline
- [ ] SwiperSlider
- [ ] ImageGalleryIkea
- [ ] PointMap
- [ ] ZoomedImage
- [ ] BackToTopButton
- [ ] SiteVerification
- [ ] Metadata

**Total Progress: 5/52 (9.6%)**

## Quick Reference: File Locations

- **Component files:** `/src/components/ComponentName/ComponentName.svelte`
- **Type definitions:** `/src/components/ComponentName/types.ts`
- **Theme variants:** `/src/components/ComponentName/theme-variants.ts`
- **Tests:** `/src/components/ComponentName/__tests__/ComponentName.test.ts`
- **Documentation:** `/src/data/docs/ComponentName.mdx`
- **Utils:** `/src/utils/` (DOMUtils.ts, URLUtils.ts, images-optimization.ts)
- **Reference implementations:**
  - `/src/components/Button/Button.svelte`
  - `/src/components/Card0/Card0.svelte`
  - `/src/components/ConditionalWrapper/ConditionalWrapper.svelte`
  - `/src/components/CopyToClipboard/CopyToClipboard.svelte`
  - `/src/components/QuantitySwitch/QuantitySwitch.svelte`

## Additional Resources

- **Svelte 5 Documentation:** https://svelte-5-preview.vercel.app/docs
- **Svelte 5 Runes:** https://svelte-5-preview.vercel.app/docs/runes
- **bits-ui (for WithElementRef):** https://www.bits-ui.com/
- **Tailwind Variants:** https://www.tailwind-variants.org/
- **Swiper Svelte:** https://swiperjs.com/svelte
- **unpic Image:** https://unpic.pics/

## Getting Help

If you encounter issues:

1. Check the 5 reference implementations first
2. Compare with the Astro version
3. Review Svelte 5 documentation for new syntax
4. Check if similar patterns exist in other components
5. Run type checking to catch errors early
6. Test in the dev server frequently

Good luck with the implementations! 🚀

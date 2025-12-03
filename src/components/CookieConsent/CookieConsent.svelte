<script lang="ts">
  import { cn } from '../../utils';
  import type { SvelteCookieConsentProps } from './types';
  import { onMount } from 'svelte';

  let {
    title,
    description,
    denyText = 'Deny',
    allowText = 'Allow all',
    cookieName = 'cookie_consent',
    cookieExpireDays = 365,
    position = 'bottom',
    classes = {},
    titleSnippet,
    descriptionSnippet,
    ref = $bindable(null),
    ...restProps
  }: SvelteCookieConsentProps = $props();

  const {
    container: containerClass = '',
    content: contentClass = '',
    title: titleClass = '',
    description: descriptionClass = '',
    actions: actionsClass = '',
    denyButton: denyButtonClass = '',
    allowButton: allowButtonClass = '',
  } = classes;

  const positionClasses: Record<string, string> = {
    bottom: 'bottom-0 left-0 right-0',
    top: 'top-0 left-0 right-0',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  let isVisible = $state(false);

  function getConsent(): string | null {
    if (typeof document === 'undefined') return null;
    const value = document.cookie
      .split('; ')
      .find(row => row.startsWith(cookieName + '='));
    return value ? value.split('=')[1] : null;
  }

  function setConsent(status: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (cookieExpireDays * 24 * 60 * 60 * 1000));
    document.cookie = `${cookieName}=${status};expires=${date.toUTCString()};path=/;SameSite=Lax`;
  }

  function handleConsent(accepted: boolean): void {
    const status = accepted ? 'accepted' : 'denied';
    setConsent(status);
    isVisible = false;

    // Dispatch custom events
    const eventName = accepted ? 'cookie-consent-accepted' : 'cookie-consent-denied';
    window.dispatchEvent(new CustomEvent(eventName, { detail: { status } }));

    window.dispatchEvent(new CustomEvent('cookie-consent-changed', {
      detail: { status, accepted }
    }));

    if (accepted) {
      window.dispatchEvent(new CustomEvent('cookie-consent-analytics-enabled'));
    }
  }

  function handleDeny(): void {
    handleConsent(false);
  }

  function handleAllow(): void {
    handleConsent(true);
  }

  onMount(() => {
    const consent = getConsent();
    if (!consent) {
      isVisible = true;
    } else if (consent === 'accepted') {
      window.dispatchEvent(new CustomEvent('cookie-consent-analytics-enabled'));
    }

    // Expose API for external use
    (window as any).CookieConsent = {
      getStatus: getConsent,
      show: () => { isVisible = true; },
      hide: () => { isVisible = false; },
      accept: () => handleConsent(true),
      deny: () => handleConsent(false),
      reset: () => {
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        isVisible = true;
      }
    };
  });
</script>

{#if isVisible}
  <div
    bind:this={ref}
    id="cookie-consent-banner"
    class={cn(
      'fixed z-[9999]',
      positionClasses[position],
      containerClass
    )}
    {...restProps}
  >
    <div
      class={cn(
        'bg-background border-t border-border shadow-lg',
        position === 'center' && 'border rounded-lg max-w-lg mx-4',
        position !== 'center' && 'w-full',
        contentClass
      )}
    >
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col gap-4">
          {#if titleSnippet}
            {@render titleSnippet()}
          {:else if title}
            <h2
              class={cn('text-lg font-semibold text-foreground', titleClass)}
            >
              {@html title}
            </h2>
          {/if}

          {#if descriptionSnippet}
            {@render descriptionSnippet()}
          {:else if description}
            <p
              class={cn('text-sm text-muted-foreground', descriptionClass)}
            >
              {@html description}
            </p>
          {/if}

          <div class={cn('flex flex-wrap gap-3', actionsClass)}>
            <button
              type="button"
              onclick={handleDeny}
              class={cn(
                'px-6 py-2.5 text-sm font-medium rounded-md',
                'bg-primary text-primary-foreground',
                'hover:bg-primary/90 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                denyButtonClass
              )}
            >
              {denyText}
            </button>

            <button
              type="button"
              onclick={handleAllow}
              class={cn(
                'px-6 py-2.5 text-sm font-medium rounded-md',
                'bg-primary text-primary-foreground',
                'hover:bg-primary/90 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                allowButtonClass
              )}
            >
              {allowText}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

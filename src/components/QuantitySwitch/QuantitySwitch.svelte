<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cn, id } from '../../utils';
  import type {SvelteQuantitySwitchProps} from "./types.ts";
  import {themeVariants, buttonVariants} from "./theme-variants.ts";

  type $$Props = SvelteQuantitySwitchProps;

  let className: $$Props['class'] = undefined;
  export let variant: $$Props['variant'] = 'default';
  export let size: $$Props['size'] = 'default';
  export { className as class };

  export let value = 1;
  export let max = 100;
  export let min = 0;
  export let step = 1;
  export let label = '';
  export let readonly = undefined;

  const dispatch = createEventDispatcher();
  const quantityInputId = `quantity_input_${id()}`;

  function decrease() {
    const previousValue = value;
    value - step >= min ? value -= step : value = min;
    dispatch('value', { currentValue: value, previousValue });
  }

  function increase() {
    const previousValue = value;
    value + step <= max ? value += step : value = max;
    dispatch('value', { currentValue: value, previousValue });
  }

  function checkValue() {
    if (value > max) value = max;
    if (value < min) value = min;
  }

  $: value && checkValue();
</script>

<style>

</style>

<div class={cn(themeVariants({ variant, size, className }))}>
  <label class="screen-reader-text" for={quantityInputId}>
    {label}
  </label>
  <input
    type={readonly ? "text" : "number"}
    id={quantityInputId}
    class="text-center h-full p-0 m-0 border-none w-full focus:outline-none font-bold bg-transparent text-inherit"
    name="quantity"
    bind:value={value} aria-label="Product quantity"
    size="4"
    min={min}
    max={max}
    step={step}
    placeholder=""
    inputmode="numeric"
    autocomplete="off"
    {readonly}
    on:blur
    on:change
    on:click
    on:focus
    on:focusin
    on:focusout
    on:keydown
    on:keypress
    on:keyup
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:mousemove
    on:paste
    on:input
    on:wheel|passive
    {...$$restProps}
  >
  <div class="quantity-nav absolute w-full left-0 top-0 h-0 flex justify-between">
    <button
      type="button"
      on:click={decrease}
      tabindex="0"
      class={cn('group select-none rounded-l-full', buttonVariants({ variant, size }))}
    >
      <slot name="plus">
        <svg xmlns="http://www.w3.org/2000/svg" class="transition-transform scale-50 group-active:scale-75" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
      </slot>
    </button>
    <button
      type="button"
      on:click={increase}
      tabindex="0"
      class={cn('group select-none rounded-r-full', buttonVariants({ variant, size }))}
    >
      <slot name="plus">
        <svg xmlns="http://www.w3.org/2000/svg" class="transition-transform scale-50 group-active:scale-75" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m-7-7h14"/></svg>
      </slot>
    </button>
  </div>
</div>

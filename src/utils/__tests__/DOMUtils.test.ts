import { describe, it, expect, beforeEach } from 'vitest';

import { setMenuToggleExpanded } from '../DOMUtils';

describe('setMenuToggleExpanded', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button type="button" aria-expanded="false" aria-controls="header-menu" data-yt-toggle-menu></button>
      <nav id="header-menu" class="hidden"></nav>
    `;
  });

  const toggle = () => document.querySelector('[data-yt-toggle-menu]') as HTMLElement;

  it('marks the toggle open, for assistive technology and for its icon', () => {
    setMenuToggleExpanded(toggle(), true);

    expect(toggle().getAttribute('aria-expanded')).toBe('true');
    expect(toggle().classList.contains('expanded')).toBe(true);
  });

  it('marks it closed again', () => {
    setMenuToggleExpanded(toggle(), true);
    setMenuToggleExpanded(toggle(), false);

    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    expect(toggle().classList.contains('expanded')).toBe(false);
  });

  it('closes every toggle a selector matches, a slotted one too', () => {
    document.body.insertAdjacentHTML(
      'beforeend',
      '<button class="expanded" aria-expanded="true" data-yt-toggle-menu></button>'
    );
    setMenuToggleExpanded(toggle(), true);

    setMenuToggleExpanded('[data-yt-toggle-menu]', false);

    document.querySelectorAll('[data-yt-toggle-menu]').forEach((element) => {
      expect(element.getAttribute('aria-expanded')).toBe('false');
      expect(element.classList.contains('expanded')).toBe(false);
    });
  });
});

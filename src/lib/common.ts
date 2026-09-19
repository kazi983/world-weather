export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number,
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  // TypeScript特殊ルール: この形式のthisはコンパイル時に消える
  return function (this: unknown, ...args: Args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Duration (ms) must match the `.text-transition` opacity transition in global.scss.
export const TEXT_TRANSITION_DELAY = 200;

/**
 * Fades an element out, runs `update` once the fade-out finishes, then fades
 * it back in. `element` must carry the `text-transition` class.
 */
export function withTransition(
  element: HTMLElement,
  update: () => void,
  delay: number = TEXT_TRANSITION_DELAY,
): void {
  element.classList.add('is-updating');

  window.setTimeout(() => {
    update();
    element.classList.remove('is-updating');
  }, delay);
}

/** Swaps an element's text content through a fade-out/fade-in transition. */
export function setTextWithTransition(
  element: HTMLElement,
  text: string,
  delay: number = TEXT_TRANSITION_DELAY,
): void {
  if (element.textContent === text) {
    return;
  }

  withTransition(
    element,
    () => {
      element.textContent = text;
    },
    delay,
  );
}

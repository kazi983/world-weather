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

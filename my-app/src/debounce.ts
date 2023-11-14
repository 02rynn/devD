type DebounceOptions = { wait: number; immediate?: boolean };

export function debounce(
  func: Function,
  { wait = 1000, immediate = false }: DebounceOptions
) {
  let debounceTimer: NodeJS.Timeout | null = null;

  const debounced = (e: any) => {
    if (debounceTimer) {
      cancel();
    }

    if (immediate) {
      clearTimeout(debounceTimer as NodeJS.Timeout);
      return Promise.resolve(func(e));
    }

    return new Promise((resolve, _) => {
      debounceTimer = setTimeout(() => {
        resolve(func(e));
      }, wait);
    });
  };

  const cancel = () => {
    clearTimeout(debounceTimer as NodeJS.Timeout);
    debounceTimer = null;
  };

  return {
    debounced,
    cancel,
  };
}

export function debounce(func, wait = 1000, immediate = false) {
  let debounceTimer;

  const debounced = (e) => {
    if (immediate) {
      clearTimeout(debounceTimer);
      return Promise.resolve(func(e));
    }

    return new Promise((resolve, _) => {
      debounceTimer = setTimeout(() => {
        resolve(func(e));
      }, wait);
    });
  };

  const cancel = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
  };

  return {
    debounced,
    cancel,
  };
}

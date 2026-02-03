import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(() => {
    // Initialize with the current value
    if (typeof window !== 'undefined') {
      return matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener('change', onChange);
    // Don't call setValue synchronously here - the initial state is already set

    return () => result.removeEventListener('change', onChange);
  }, [query]);

  return value;
}

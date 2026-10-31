import { useCallback,useSyncExternalStore } from "react";

/** Whether a media query matches; false during server rendering. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback((notify: () => void) => { const m = window.matchMedia(query); m.addEventListener("change", notify); return () => m.removeEventListener("change", notify); }, [query]);
  const get = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, get, () => false);
}

import { useState } from "react";

/** Runs an async confirm: keeps the overlay open while pending, closes on success, keeps the error on failure. */
export function useAsyncConfirm(onConfirm?: () => unknown) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = async (close: () => void) => {
    if (!onConfirm) return close();
    setPending(true);
    setError(null);
    try {
      await onConfirm();
      setPending(false);
      close();
    } catch (e) {
      setPending(false);
      setError(e instanceof Error && e.message ? e.message : "");
    }
  };
  return { pending, error, run, reset: () => setError(null) };
}

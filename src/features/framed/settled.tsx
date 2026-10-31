
/** Awaits a result or invokes a callback; use a callback to catch synchronous throws as well as rejections. */
export async function settled(actionOrResult: unknown) {
  try { await (typeof actionOrResult === "function" ? actionOrResult() : actionOrResult); return true; } catch { return false; }
}

import { createContext, useContext, useLayoutEffect, useMemo, type ReactNode } from "react";
import { registerDocumentTheme } from "./document-theme";
import { ThemeContext } from "./helpers";
import type { ThemeSettings } from "./types";

const ThemeDepthContext = createContext(0);

/**
 * Applies document-wide theme variables so portalled overlays share their provider's tokens.
 * The innermost mounted provider wins; unmounting restores the outer provider or original document settings.
 */
export function ThemeProvider({
  theme = "light",
  brand = "denim",
  neutral = "cream",
  density = "comfortable",
  children,
}: ThemeSettings & { children: ReactNode }) {
  const depth = useContext(ThemeDepthContext) + 1;
  const value = useMemo(() => ({ theme, brand, neutral, density }), [theme, brand, neutral, density]);
  useLayoutEffect(() => registerDocumentTheme(value, depth), [value, depth]);
  return <ThemeDepthContext value={depth}><ThemeContext value={value}>{children}</ThemeContext></ThemeDepthContext>;
}

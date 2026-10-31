import * as stylex from "@stylexjs/stylex";
import * as themes from "./tokens.stylex";
import type { ThemeSettings } from "./types";

type Settings = Required<ThemeSettings>;
const presets = {
  lightCreamComfortable: themes.lightCreamComfortable,
  lightCreamCompact: themes.lightCreamCompact,
  lightGreyComfortable: themes.lightGreyComfortable,
  lightGreyCompact: themes.lightGreyCompact,
  darkCreamComfortable: themes.darkCreamComfortable,
  darkCreamCompact: themes.darkCreamCompact,
  darkGreyComfortable: themes.darkGreyComfortable,
  darkGreyCompact: themes.darkGreyCompact,
};
const knownClasses = new Set(Object.values(presets).flatMap((value) => stylex.props(value, themes.aliases.root).className?.split(" ") ?? []));
const attributes = ["plumbTheme", "plumbBrand", "plumbNeutral", "plumbDensity"] as const;
const mounted = new Map<symbol, { settings: Settings; depth: number; order: number }>();
let order = 0;
let baseline: { classes: string[]; attributes: Record<string, string | undefined>; scheme: string } | undefined;

function apply() {
  const root = document.documentElement;
  const active = [...mounted.values()].sort((a, b) => b.depth - a.depth || b.order - a.order)[0];
  root.classList.remove(...[...root.classList].filter((name) => knownClasses.has(name)));
  if (active) {
    const { theme, brand, neutral, density } = active.settings;
    const key = `${theme}${neutral[0].toUpperCase() + neutral.slice(1)}${density[0].toUpperCase() + density.slice(1)}` as keyof typeof presets;
    root.classList.add(...(stylex.props(themes.aliases.root, presets[key]).className?.split(" ") ?? []));
    Object.assign(root.dataset, { plumbTheme: theme, plumbBrand: brand, plumbNeutral: neutral, plumbDensity: density });
    root.style.colorScheme = theme;
  } else if (baseline) {
    root.classList.add(...baseline.classes);
    for (const name of attributes) {
      const previous = baseline.attributes[name];
      if (previous === undefined) delete root.dataset[name];
      else root.dataset[name] = previous;
    }
    root.style.colorScheme = baseline.scheme;
    baseline = undefined;
  }
}

/** Document themes follow React provider depth, including when child effects mount before parent effects. */
export function registerDocumentTheme(settings: Settings, depth: number): () => void {
  if (!mounted.size) {
    const root = document.documentElement;
    baseline = {
      classes: [...root.classList].filter((name) => knownClasses.has(name)),
      attributes: Object.fromEntries(attributes.map((name) => [name, root.dataset[name]])),
      scheme: root.style.colorScheme,
    };
  }
  const id = Symbol();
  mounted.set(id, { settings, depth, order: ++order });
  apply();
  return () => { mounted.delete(id); apply(); };
}

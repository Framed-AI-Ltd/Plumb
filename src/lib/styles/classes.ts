import * as stylex from "@stylexjs/stylex";
import { recipes } from "./recipes";

/** Composes atomic recipes while retaining stable semantic hooks for consumers and state relationships. */
export function cx(base: string = "", extra?: string): string {
  const names = `${base} ${extra ?? ""}`.trim().split(/\s+/);
  const contextual = [recipes["plumb-element"], ...names.filter(name => name.startsWith("plumb-element-")).map(name => recipes[name as keyof typeof recipes])].filter(Boolean);
  // React Aria can render a button as a text link without a native JSX tag.
  if (names.includes("plumb-link")) contextual.push(recipes["plumb-element-button"]);
  const components = names.filter(name => !name.startsWith("plumb-element")).map(name => recipes[name as keyof typeof recipes]).filter(Boolean);
  // Generic descendant recipes coexist. Explicit component/variant recipes compose
  // in caller order, so a calendar popover can override the generic popover size.
  return [...new Set(["plumb-element", ...names, ...contextual.map(style => stylex.props(style).className), stylex.props(...components).className])].join(" ");
}

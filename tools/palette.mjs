// Plumb colour source of truth, chosen in order (see docs/COLOR.md).
import { converter, formatHex } from "culori";

const hsv = (h, s, v) => formatHex({ mode: "hsv", h, s, v });
const ok = (l, c, h) => formatHex({ mode: "oklch", l, c, h });

// Colours are chosen in order, each derived from the one before (see docs/COLOR.md).
// 1. Primary: Denim. Trustworthy blue at a calm, workwear chroma; Ant base (shade 6).
export const brands = { denim: { label: "Denim", base: hsv(212, 0.5, 0.72) } };
export const defaultBrand = "denim";
export const brandHue = 252; // OKLCH hue of the Denim base
// 2. Neutrals: cream, tinted toward Denim's complement (≈ 72°) so the base reads warm and homey.
// 3. Secondary accent: Clay, at the warm split-complement of Denim. Brand mark and categories only.
// 4. Functional: same calm chroma family as Denim, hues far from it and from each other.
export const functional = {
  success: ok(0.7, 0.13, 160), // jade: clear of Denim and, by lightness, of error under red–green CVD
  warning: ok(0.76, 0.13, 80),
  error: ok(0.6, 0.16, 28), // brick
};
// 5. Decorative: one lightness and chroma for all, hues spread around the wheel, so they read as one family.
export const decorative = {
  clay: ok(0.66, 0.085, brandHue + 180 - 24),
  rose: ok(0.66, 0.075, 8),
  honey: ok(0.7, 0.085, 88),
  sage: ok(0.66, 0.065, 142),
  lake: ok(0.66, 0.065, 222),
  spruce: ok(0.66, 0.065, 185),
};

// Neutrals (cream): Ant-style levels of one warm ink over the page.
export const neutralsCream = {
  light: { ink: ok(0.24, 0.018, 72), layout: ok(0.965, 0.008, 72), container: "#ffffff" },
  dark: { ink: ok(0.97, 0.008, 72), layout: ok(0.165, 0.006, 72), container: ok(0.225, 0.008, 72), elevated: ok(0.27, 0.009, 72) },
};

const lchOf = converter("oklch");
export const activeBrandHue = lchOf(brands[defaultBrand].base).h ?? 0;
export const activeNeutralHue = lchOf(neutralsCream.light.layout).h ?? 72;

// Verifies that Plumb's colours work together, beyond contrast:
// harmony (complement, matched chroma), separation of roles, and
// distinguishability under colour-vision deficiencies. Exits non-zero on failure.
import { converter, differenceCiede2000, filterDeficiencyDeuter, filterDeficiencyProt, filterDeficiencyTrit, formatHex } from "culori";
import { generate } from "@ant-design/colors";
import { activeBrandHue as brandHue, activeNeutralHue, brands, decorative, defaultBrand, functional } from "./palette.mjs";

const lch = converter("oklch");
const de = differenceCiede2000();
const hueGap = (a, b) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));
const brand = brands[defaultBrand].base;
const neutralHue = activeNeutralHue;
const results = [];
const check = (name, pass, detail) => results.push({ name, pass, detail });

// 1. Harmony: neutrals sit near the brand's complement.
check("Cream neutrals complement Denim", Math.abs(hueGap(brandHue, neutralHue) - 180) <= 15, `gap ${hueGap(brandHue, neutralHue)}° (target 180 ± 15)`);
// 2. Secondary accent (clay) is warm split-complement.
const clayH = lch(decorative.clay).h;
check("Clay is Denim's warm split-complement", hueGap(brandHue, clayH) >= 140, `gap ${hueGap(brandHue, clayH).toFixed(0)}°`);
// 3. Brand never reads as status.
for (const [n, c] of Object.entries(functional)) {
  const g = hueGap(brandHue, lch(c).h);
  check(`Brand vs ${n} hue separation ≥ 60°`, g >= 60, `${g.toFixed(0)}°`);
}
// 4. Calm chroma: brand and decorative bases sit in one restrained band (no neon).
const bandC = [brand, ...Object.values(decorative)].map((c) => lch(c).c);
check("Brand + decorative chroma within 0.06–0.10", bandC.every((c) => c >= 0.06 && c <= 0.1), bandC.map((c) => c.toFixed(3)).join(", "));
const decL = Object.values(decorative).map((c) => lch(c).l);
check("Decorative lightness matched (spread ≤ 0.05)", Math.max(...decL) - Math.min(...decL) <= 0.05, decL.map((l) => l.toFixed(2)).join(", "));
// 5. Distinguishable under colour-vision deficiencies (ΔE2000 ≥ 12), tested on the shades the UI
//    actually renders: 7 (icons, solids) and 8 (text).
const sims = { normal: (c) => c, deuteranopia: filterDeficiencyDeuter(1), protanopia: filterDeficiencyProt(1), tritanopia: filterDeficiencyTrit(1) };
const pairs = [["success", "error"], ["warning", "error"], ["success", "warning"], ["brand", "success"], ["brand", "error"], ["brand", "warning"]];
const ramps = Object.fromEntries(Object.entries({ ...functional, brand }).map(([k, v]) => [k, generate(v)]));
for (const [sim, f] of Object.entries(sims))
  for (const [a, b] of pairs) {
    const d = Math.min(...[6, 7].map((i) => de(f(ramps[a][i]), f(ramps[b][i]))));
    check(`${sim}: ${a} vs ${b} ΔE ≥ 12 (shades 7–8)`, d >= 12, d.toFixed(1));
  }

const failed = results.filter((r) => !r.pass);
for (const r of results) console.log(`${r.pass ? "✓" : "✗"} ${r.name} — ${r.detail}`);
console.log(`\n${results.length - failed.length}/${results.length} palette checks passed.${failed.length ? " Colour-alone distinctions that fail are still covered by icons and labels (principle: never colour alone)." : ""}`);
if (failed.length) process.exitCode = 1;
void formatHex;

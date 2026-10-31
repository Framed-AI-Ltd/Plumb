// Generates src/styles/tokens.css and docs/PALETTE.md.
//
// Colour follows Ant Design's system: every colour is a 10-shade ramp generated
// from one base colour (shade 6) with Ant's own algorithm (@ant-design/colors),
// neutrals are levels of one ink colour over the background, and each shade has
// one job. Where Ant's defaults miss WCAG AA, Plumb uses the next darker shade;
// those deviations are listed in docs/PRINCIPLES.md. Contrast is proven for every
// brand × neutral × theme combination; any failure stops the build.
import { readFile, writeFile } from "node:fs/promises";

async function emit(path, content) {
  if (!process.argv.includes("--check")) return writeFile(path, content);
  if (await readFile(path, "utf8").catch(() => null) !== content) {
    throw new Error(`Generated file is stale: ${path}. Run pnpm generate and stage the results.`);
  }
}
import { generate } from "@ant-design/colors";
import { clampRgb, converter, formatHex, wcagContrast } from "culori";

import { brands, decorative, defaultBrand, functional, neutralsCream } from "./palette.mjs";



// Neutrals: Ant expresses text, borders, and fills as levels of one ink colour.
const neutrals = {
  cream: neutralsCream,
  grey: {
    light: { ink: "#000000", layout: "#f5f5f5", container: "#ffffff" },
    dark: { ink: "#ffffff", layout: "#000000", container: "#141414", elevated: "#1f1f1f" },
  },
};
// Ant v5 neutral levels; secondary (0.65→0.74), tertiary (0.45→0.68), and control border
// (0.15→0.54) are raised so every text level and input boundary meets WCAG AA.
const levels = {
  text: 0.88, textSecondary: 0.74, textTertiary: 0.68, textDisabled: 0.25,
  border: 0.16, borderSecondary: 0.09, fill: 0.12, fillSecondary: 0.075, fillTertiary: 0.045, fillQuaternary: 0.025,
  controlBorder: 0.54,
};
const mix = (fg, bg, a) => {
  const p = (h, i) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  return "#" + [0, 1, 2].map((i) => Math.round(p(fg, i) * a + p(bg, i) * (1 - a)).toString(16).padStart(2, "0")).join("");
};

const ramp = (base, theme, bg) =>
  theme === "light" ? generate(base) : generate(base, { theme: "dark", backgroundColor: bg });

function neutralVars(theme, n) {
  const { ink, layout, container } = n;
  const elevated = n.elevated ?? container;
  const v = {
    "bg-layout": layout,
    "bg-container": container,
    "bg-elevated": elevated,
  };
  for (const [k, a] of Object.entries(levels)) v[k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)] = mix(ink, container, a);
  // Light: a whisper over the cream page. Dark: tinted over the card so table heads and totals keep a fill.
  v["fill-layout"] = theme === "light" ? mix(ink, layout, levels.fillTertiary) : mix(ink, container, 0.07);
  if (theme === "dark") {
    v["fill-tertiary"] = mix(ink, container, 0.06);
    v["fill-quaternary"] = mix(ink, container, 0.035);
  }
  return v;
}

// Ant's solid is shade 6 and its text shade 7; Plumb takes the first shade from 7
// upward that meets AA, so every brand stays accessible without greying its light shades.
function brandVars(r, theme, layout) {
  const light = theme === "light";
  const pick = (from, ok) => {
    for (let i = from; i <= 10; i++) if (ok(r[i - 1])) return i;
    return 10;
  };
  // White text on the solid in both themes. In dark ramps shades get lighter as they rise,
  // so walk down from 7 to the brightest mid denim that still holds 4.5:1 (hover is one step lighter).
  let solid;
  if (light) solid = pick(7, (c) => wcagContrast("#ffffff", c) >= 4.5 && wcagContrast("#ffffff", r[Math.min(r.indexOf(c) + 1, 9)]) >= 4.5);
  else {
    solid = 6;
    for (let i = 7; i >= 3; i--) if (wcagContrast("#ffffff", r[i - 1]) >= 4.5 && wcagContrast("#ffffff", r[i]) >= 4.5) { solid = i; break; }
  }
  const text = pick(light ? 7 : 8, (c) => [r[0], r[1], layout, "#ffffff"].every((bg) => wcagContrast(c, bg) >= (light || bg !== "#ffffff" ? 4.5 : 0)));
  return {
    ...colourVars("brand", r),
    "accent-solid": `var(--brand-${solid})`,
    "accent-solid-hover": `var(--brand-${light ? Math.min(solid + 1, 10) : solid + 1})`,
    "accent-text": `var(--brand-${text})`,
    "accent-text-hover": `var(--brand-${Math.min(text + 1, 10)})`,
    // Focus must stand out from the page, so in dark mode it uses the light text shade, not the solid.
    "focus-ring": `var(--brand-${light ? solid : text})`,
  };
}

// Ant's light shades vary in lightness by hue, so tags of different hues looked different in weight.
// Decorative and functional shades 1–5 are re-set to one lightness ladder per theme; only hue and chroma differ.
function evenTints(r, base, theme, kind = "decorative") {
  const h = converter("oklch")(base).h;
  // Chroma rises smoothly toward the base (≥ 60 % of it by shade 4); each step is ≥ 0.025 L apart.
  // Brand: same ladder idea; chroma floor so calm, low-saturation primaries don't produce grey tints.
  const c6 = kind === "brand" ? Math.max(converter("oklch")(base).c, 0.06) : converter("oklch")(base).c;
  const ladder = theme === "light"
    ? [[0.975, 0.22], [0.945, 0.36], [0.905, 0.5], [0.86, 0.66], [0.8, 0.82]]
    : kind === "status"
      ? [[0.255, 0.16], [0.29, 0.24], [0.34, 0.36], [0.4, 0.55], [0.48, 0.75]]
      : [[0.27, 0.32], [0.32, 0.45], [0.37, 0.55], [0.43, 0.68], [0.5, 0.82]];
  const n = kind === "brand" ? 4 : 5;
  return r.map((c, i) => (i < n ? formatHex(clampRgb({ mode: "oklch", l: ladder[i][0], c: ladder[i][1] * c6, h })) : c));
}

// Shade jobs (1-indexed): 1 bg · 2 hover bg · 3 border · 4 hover border · 6 base/icon · 7 solid & text · 8 hover/pressed solid & strong text.
function colourVars(name, r) {
  const v = {};
  r.forEach((c, i) => (v[`${name}-${i + 1}`] = c));
  return v;
}
function semantic(theme) {
  const light = theme === "light";
  return {
    // Ant's default input border (#d9d9d9 equivalent): soft by design, below 3:1; see PRINCIPLES.md.
    "field-border": light ? "color-mix(in srgb, var(--control-border) 45%, var(--bg-container))" : "color-mix(in srgb, var(--control-border) 60%, var(--bg-container))",
    "field-bg": light ? "color-mix(in srgb, var(--bg-layout) 70%, var(--bg-container))" : "var(--fill-layout)",
    "field-bg-hover": light ? "var(--bg-layout)" : "var(--fill-secondary)",
    "accent-bg": "var(--brand-1)",
    "accent-bg-hover": "var(--brand-2)",
    "accent-border": "var(--brand-3)",
    "accent-border-hover": "var(--brand-4)",
    "on-accent": "#ffffff",
    "focus-halo": light ? "var(--brand-2)" : "var(--brand-3)",
    ...Object.fromEntries(
      ["success", "warning", "error", "info"].flatMap((f) => {
        const src = f === "info" ? "brand" : f;
        return [
          [`${f}-bg`, `var(--${src}-1)`],
          [`${f}-border`, `var(--${src}-3)`],
          [`${f}-icon`, `var(--${src}-7)`],
          [`${f}-text`, `var(--${src}-${light ? 8 : 9})`],
          [`${f}-solid`, `var(--${src}-${light ? 7 : 6})`],
        ];
      }),
    ),
    "shadow-1": light
      ? "0 1px 2px 0 rgb(42 33 24 / 0.04), 0 1px 6px -1px rgb(42 33 24 / 0.03), 0 2px 4px 0 rgb(42 33 24 / 0.03)"
      : "0 1px 2px 0 rgb(0 0 0 / 0.3), 0 2px 6px -1px rgb(0 0 0 / 0.25)",
    "shadow-2": light
      ? "0 6px 16px 0 rgb(42 33 24 / 0.08), 0 3px 6px -4px rgb(42 33 24 / 0.12), 0 9px 28px 8px rgb(42 33 24 / 0.05)"
      : "0 6px 16px 0 rgb(0 0 0 / 0.45), 0 3px 6px -4px rgb(0 0 0 / 0.5), 0 9px 28px 8px rgb(0 0 0 / 0.3)",
    "control-shadow": light ? "0 2px 0 rgb(42 33 24 / 0.03)" : "0 2px 0 rgb(0 0 0 / 0.2)",
    "primary-shadow": light ? "0 2px 0 color-mix(in srgb, var(--brand-6) 18%, transparent)" : "0 2px 0 rgb(0 0 0 / 0.25)",
    highlight: light ? "inset 0 1px 0 rgb(255 255 255 / 0.6)" : "inset 0 1px 0 rgb(255 255 255 / 0.04)",
    inset: light ? "inset 0 1px 2px rgb(42 33 24 / 0.05)" : "inset 0 1px 2px rgb(0 0 0 / 0.3)",
    scrim: light ? "rgb(42 33 24 / 0.35)" : "rgb(0 0 0 / 0.6)",
  };
}

const block = (sel, vars) => `${sel} {\n${Object.entries(vars).map(([k, v]) => `  --${k}: ${v};`).join("\n")}\n}\n`;
const resolved = {};
let css = `/* Generated by tools/build-tokens.mjs from Ant Design colour ramps. Do not edit. */
:root {
  --font-heading: "Plus Jakarta Sans Variable", "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body: "Inter Variable", Inter, system-ui, sans-serif;
  --text-display: 650 2rem/1.25 var(--font-heading);
  --text-title: 650 1.75rem/1.25 var(--font-heading);
  --text-heading: 600 1.125rem/1.4 var(--font-heading);
  --text-subheading: 600 1rem/1.45 var(--font-heading);
  --text-body: 400 0.875rem/1.57 var(--font-body);
  --text-label: 500 0.8125rem/1.45 var(--font-body);
  --text-caption: 400 0.75rem/1.5 var(--font-body);
  --text-overline: 600 0.75rem/1.4 var(--font-body);
  --space-0: 0; --space-1: 2px; --space-2: 4px; --space-3: 8px; --space-4: 12px; --space-5: 16px;
  --space-6: 20px; --space-7: 24px; --space-8: 32px; --space-9: 40px; --space-10: 48px; --space-11: 64px;
  --radius-xs: 4px; --radius-sm: 6px; --radius-md: 8px; --radius-lg: 12px; --radius-xl: 16px; --radius-pill: 999px;
  --control-h: 34px; --control-h-sm: 28px; --control-h-lg: 42px;
  --card-inset: 24px;
  --focus-width: 2px;
  --tab-row-offset: calc(12px + 12px + 22px + 1px + var(--space-6));
  --on-media: #ffffff;
  --media-scrim: rgb(0 0 0 / 0.85);
  --media-label-bg: rgb(0 0 0 / 0.6);
  --media-divider-shadow: 0 0 0 1px rgb(0 0 0 / 0.2);
  --sidebar-shadow: 4px 0 16px -8px rgb(42 33 24 / 0.08);
  --switch-thumb-shadow: 0 2px 4px rgb(0 35 11 / 0.2);
  --duration-fast: 120ms; --duration-base: 200ms;
  --ease: cubic-bezier(0.2, 0, 0, 1);
}
[data-plumb-density="compact"] { --control-h: 28px; --control-h-sm: 24px; }
@media (prefers-reduced-motion: reduce) { :root { --duration-fast: 0ms; --duration-base: 0ms; } }
`;
for (const theme of ["light", "dark"]) {
  const bg = neutrals.cream[theme].container;
  const fixed = {};
  for (const [n, b] of Object.entries(functional)) Object.assign(fixed, colourVars(n, evenTints(ramp(b, theme, bg), b, theme, "status")));
  for (const [n, b] of Object.entries(decorative)) Object.assign(fixed, colourVars(n, evenTints(ramp(b, theme, bg), b, theme)));
  const base = { ...neutralVars(theme, neutrals.cream[theme]), ...brandVars(ramp(brands[defaultBrand].base, theme, bg), theme, neutrals.cream[theme].layout), ...fixed, ...semantic(theme) };
  const sel = theme === "light" ? ':root,\n[data-plumb-theme="light"]' : '[data-plumb-theme="dark"]';
  css += block(sel, { "color-scheme": theme, ...base }).replace("--color-scheme", "color-scheme");
  for (const [id, n] of Object.entries(neutrals))
    css += block(`[data-plumb-theme="${theme}"][data-plumb-neutral="${id}"]`, neutralVars(theme, n[theme]));
  for (const [id, b] of Object.entries(brands))
    css += block(`[data-plumb-theme="${theme}"][data-plumb-brand="${id}"]`, brandVars(ramp(b.base, theme, bg), theme, neutrals.cream[theme].layout));
  // Resolve every combination for the contrast proof.
  for (const [nid, n] of Object.entries(neutrals))
    for (const [bid, b] of Object.entries(brands)) {
      const m = { ...fixed, ...neutralVars(theme, n[theme]), ...brandVars(ramp(b.base, theme, bg), theme, n[theme].layout) };
      for (const [k, v] of Object.entries({ ...semantic(theme), ...m })) m[k] = typeof v === "string" && v.startsWith("var(--") ? m[v.slice(6, -1)] : v;
      resolved[`${theme}/${bid}/${nid}`] = m;
    }
}
css += `@media (prefers-contrast: more) {
  [data-plumb-theme] { --text-secondary: var(--text); --border: var(--control-border); --border-secondary: var(--border); --accent-text: var(--brand-9); }
}
`;

const pairs = [
  ["text", "bg-layout", 7], ["text", "bg-container", 7], ["text", "bg-elevated", 7],
  ["text-secondary", "bg-layout", 4.5], ["text-secondary", "bg-container", 4.5], ["text-secondary", "fill-layout", 4.5],
  ["text-tertiary", "bg-container", 4.5], ["text-tertiary", "bg-layout", 4.5],
  ["control-border", "bg-container", 3],
  ["control-border", "bg-layout", 3],
  ["text", "fill-layout", 7],
  ["text-tertiary", "fill-layout", 4.5],
  ["on-accent", "accent-solid", 4.5], ["on-accent", "accent-solid-hover", 4.5],
  ["accent-text", "bg-container", 4.5], ["accent-text", "bg-layout", 4.5], ["accent-text", "accent-bg", 4.5], ["accent-text", "accent-bg-hover", 4.5],
  ["focus-ring", "bg-container", 3], ["focus-ring", "bg-layout", 3],
  ...["success", "warning", "error", "info"].flatMap((f) => [[`${f}-text`, `${f}-bg`, 4.5], [`${f}-text`, "bg-container", 4.5], [`${f}-icon`, `${f}-bg`, 3]]),
  ["on-accent", "error-solid", 4.5],
  ...Object.keys(decorative).flatMap((d) => [[`${d}-8`, `${d}-1`, 4.5], [`${d}-8`, `${d}-2`, 4.5]]),
];
const failures = [];
let checks = 0;
for (const [combo, m] of Object.entries(resolved))
  for (const [fg, bgk, min] of pairs) {
    checks++;
    if (!m[fg] || !m[bgk]) { failures.push(`${combo}: missing ${m[fg] ? bgk : fg}`); continue; }
    const ratio = wcagContrast(m[fg], m[bgk]);
    if (!(ratio >= min)) failures.push(`${combo}: ${fg} (${m[fg]}) on ${bgk} (${m[bgk]}) ${ratio.toFixed(2)} < ${min}`);
  }
if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`${failures.length} of ${checks} contrast checks failed.`);
  process.exit(1);
}
await emit("src/styles/tokens.css", css);

// The CSS file remains a machine-readable palette audit artifact. Runtime variables and
// themes are compiled by StyleX; components never import the audit stylesheet.
const declarationMap = (body) => Object.fromEntries([...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const blocks = [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ selector: m[1].trim(), values: declarationMap(m[2]) }));
const common = blocks.find((b) => b.selector === ":root").values;
const light = blocks.find((b) => b.selector.includes('[data-plumb-theme="light"]') && !b.selector.includes('[data-plumb-neutral')).values;
const dark = blocks.find((b) => b.selector === '[data-plumb-theme="dark"]').values;
const key = (name) => name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const mapKeys = (values) => Object.fromEntries(Object.entries(values).map(([k, v]) => [key(k), v]));
const definitions = { ...common, ...light };
const conditional = (values) => {
  const result = mapKeys(values);
  for (const name of ["duration-fast", "duration-base"]) result[key(name)] = { default: values[name], "@media (prefers-reduced-motion: reduce)": "0ms" };
  for (const [name, value] of Object.entries({ "text-secondary": "var(--text)", border: "var(--control-border)", "border-secondary": "var(--border)", "accent-text": "var(--brand-9)" })) {
    result[key(name)] = { default: values[name], "@media (prefers-contrast: more)": value };
  }
  return result;
};
let stylexSource = '// Generated by tools/build-tokens.mjs. Edit palette.mjs or the generator.\nimport * as stylex from "@stylexjs/stylex";\n\n';
stylexSource += `export const tokens = stylex.defineVars(${JSON.stringify(conditional(definitions), null, 2)});\n\n`;
for (const theme of ["light", "dark"]) for (const neutral of ["cream", "grey"]) for (const density of ["comfortable", "compact"]) {
  const neutralValues = blocks.find((b) => b.selector === `[data-plumb-theme="${theme}"][data-plumb-neutral="${neutral}"]`).values;
  const values = { ...common, ...(theme === "dark" ? dark : light), ...neutralValues, ...(density === "compact" ? { "control-h": "28px", "control-h-sm": "24px" } : {}) };
  const name = `${theme}${neutral[0].toUpperCase() + neutral.slice(1)}${density[0].toUpperCase() + density.slice(1)}`;
  stylexSource += `export const ${name} = stylex.createTheme(tokens, ${JSON.stringify(conditional(values), null, 2)});\n\n`;
}
stylexSource += 'export const aliases = stylex.create({ root: {\n' + Object.keys(definitions).map((name) => `  "--${name}": tokens.${key(name)},`).join('\n') + '\n} });\n';
await emit("src/lib/theme/tokens.stylex.ts", stylexSource);

const L = resolved[`light/${defaultBrand}/cream`];
const coolors = (keys) => `[open](https://coolors.co/${keys.map((k) => L[k].slice(1)).join("-")})`;
const sw = (keys) => keys.map((k) => `\`${L[k]}\``).join(" · ");
const rampRow = (name) => {
  const keys = Array.from({ length: 10 }, (_, i) => `${name}-${i + 1}`);
  return `| ${name} | ${sw(keys)} | ${coolors(keys)} |`;
};
await emit(
  "docs/PALETTE.md",
  `# Plumb palette

Generated by \`tools/build-tokens.mjs\` with Ant Design's palette algorithm (\`@ant-design/colors\`). Each row is a 10-shade ramp from one base colour (shade 6). Open a row in coolors.co to explore; bring changes back as base colours in the generator so contrast stays proven.

## Base colours
| Role | Base (shade 6) |
| --- | --- |
${Object.entries(brands).map(([id, b]) => `| Brand · ${b.label}${id === defaultBrand ? " (default)" : ""} | \`${b.base}\` |`).join("\n")}
${Object.entries(functional).map(([id, b]) => `| Functional · ${id} | \`${b}\` |`).join("\n")}
${Object.entries(decorative).map(([id, b]) => `| Decorative · ${id} | \`${b}\` |`).join("\n")}

## Light ramps (default brand, cream neutrals)
| Ramp | Shades 1 → 10 | coolors.co |
| --- | --- | --- |
${["brand", ...Object.keys(functional), ...Object.keys(decorative)].map(rampRow).join("\n")}

## Neutrals (cream)
| Level | Colour |
| --- | --- |
${["bg-layout", "bg-container", "fill-tertiary", "fill-secondary", "border-secondary", "border", "control-border", "text-tertiary", "text-secondary", "text"].map((k) => `| ${k} | \`${L[k]}\` |`).join("\n")}
`,
);
console.log(`Generated tokens and palette ${process.argv.includes("--check") ? "verified" : "written"}; ${checks} contrast checks passed (${Object.keys(brands).length} brands × 2 neutrals × 2 themes).`);

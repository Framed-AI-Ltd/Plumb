// Lint: TypeScript, React hooks, accessibility, and a guard against untranslated text in components.
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import boundaries from "eslint-plugin-boundaries";
import stylex from "./tools/stylex-compat.mjs";
import project from "./tools/eslint-rules.mjs";

export default tseslint.config(
  { ignores: ["dist", "storybook-static", "review", "review-*/**", "playwright-report", "test-results", ".semgrep/tests/**", "node_modules", "src/styles/tokens.css"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { globals: { ...globals.browser } },
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      // React Aria handles labelling through its own components and context.
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/no-autofocus": ["error", { ignoreNonDOM: true }],
      // Plumb components take a `role` prop (a person's job), which isn't an ARIA role.
      "jsx-a11y/aria-role": ["error", { ignoreNonDOM: true }],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries, stylex, plumb: project },
    settings: {
      "import/resolver": { typescript: { project: "./tsconfig.json" } },
      "boundaries/elements": [
        { type: "app", pattern: "src/app" },
        { type: "feature", pattern: "src/features/*", capture: ["feature"] },
        { type: "lib", pattern: "src/lib" },
        { type: "lib", pattern: "src/components" },
        { type: "lib", pattern: "src/styles" },
        { type: "lib", pattern: "src/i18n" },
        { type: "app", pattern: "src" },
      ],
    },
    rules: {
      "plumb/file-length": "warn",
      "plumb/feature-facades": "error",
      "stylex/valid-styles": "error",
      "stylex/valid-shorthands": "error",
      "boundaries/dependencies": ["error", { default: "allow", policies: [
        { from: { element: { type: "lib" } }, disallow: { to: { element: { type: ["feature", "app"] } } } },
        { from: { element: { type: "feature" } }, disallow: { to: { element: { type: "app" } } } },
      ] }],
    },
  },
  {
    // Components take every visible word from the message catalogue (src/i18n), so apps can translate them.
    files: ["src/**/*.tsx"],
    rules: {
      "no-restricted-syntax": ["error",
        { selector: "JSXText[value=/[A-Za-z]{2,}/]", message: "Put user-visible text in src/i18n and use t()." },
        { selector: "JSXAttribute[name.name=/^(aria-label|title|placeholder|alt|label)$/] > Literal[value=/[A-Za-z]{2,}/]", message: "Put user-visible text in src/i18n and use t()." },
      ],
    },
  },
  {
    // Page templates are the reference for building screens: only Plumb components, no one-off styling.
    files: ["stories/layouts/**/*.tsx"],
    rules: {
      "no-restricted-syntax": ["error",
        { selector: "JSXAttribute[name.name=/^(style|className)$/]", message: "Layout templates use Plumb components and props only; add a prop or component instead." },
        { selector: "JSXOpeningElement[name.name=/^(div|span|section|nav|ul|ol|li|button|input|table|h[1-6])$/]", message: "Layout templates use Plumb components only." },
      ],
    },
  },
  // Tools run in Node; some pass callbacks to the browser (Playwright page.evaluate).
  { files: ["tools/**/*.mjs", "*.config.{js,ts}"], languageOptions: { globals: { ...globals.node, ...globals.browser } } },
);

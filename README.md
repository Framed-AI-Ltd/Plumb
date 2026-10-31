# Plumb

The design system for **Framed**, a platform for contractors to turn intake into scopes, estimates, proposals, and property records. Plumb is calm, warm, and restrained, and it is honest about what is known: unknown values stay unknown, private numbers stay private, and AI output stays a draft until a person accepts it.

- **Accessible by construction:** built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/). Keyboard, screen reader, and focus behaviour follow WAI-ARIA, and every story is checked with axe.
- **Made for money and facts:** components for estimates, allowances, taxes, payment schedules, provenance, revisions, and approvals. Their arithmetic rules are unit-tested.
- **Localized:** numbers, currency, dates, and every built-in word follow the locale (English and French included).
- **StyleX:** authored styles compile to distributable CSS; consumers load the stylesheet without a StyleX build configuration.

## Install

```sh
pnpm add @framed-ai/plumb
```

React and React DOM 19.x, version 19.2 or later are peer dependencies. React Aria, Lucide, and the fonts come with the package. If your app also uses `react-aria-components` directly, keep it on a compatible version so both share one copy (contexts like `RouterProvider` only work with one copy).

## Use

```tsx
import "@framed-ai/plumb/styles.css";
import "@framed-ai/plumb/fonts.css"; // optional: Plus Jakarta Sans + Inter, self-hosted
import { Button, LocaleProvider, Money, ThemeProvider, ToastProvider } from "@framed-ai/plumb";

export function App() {
  return (
    <LocaleProvider locale="en-CA" currency="CAD">
      <ThemeProvider theme="light">
        <Money amount={31580} /> <Button variant="primary">Send proposal</Button>
        <ToastProvider />
      </ThemeProvider>
    </LocaleProvider>
  );
}
```

- **Theme:** `ThemeProvider` takes `theme` (`light` or `dark`), `density`, `neutral`. It sets data attributes on `<html>`, so portalled overlays match.
- **Locale:** `LocaleProvider` sets the locale, default currency, and `messages` overrides. Add a language by copying `@framed-ai/plumb/i18n/en.json`, translating it, and passing it as `messages`.
- **Icons:** [Lucide](https://lucide.dev) only. See [docs/ICONS.md](docs/ICONS.md).

## Find a component

| Start here | |
| --- | --- |
| [Storybook](https://framed-ai-ltd.github.io/Plumb/) | Every component and complete page templates (**Layouts → Page templates**) |
| [docs/LAYOUTS.md](docs/LAYOUTS.md) | How to build a page, and how to tell if a component is missing |
| [docs/COMPONENTS.md](docs/COMPONENTS.md) | Generated catalogue of every export ([catalog.json](docs/catalog.json) for tools and agents) |
| [docs/PRINCIPLES.md](docs/PRINCIPLES.md) | Visual, interaction and truth principles |
| [docs/COLOR.md](docs/COLOR.md) · [docs/PALETTE.md](docs/PALETTE.md) | How the colours were chosen, verified, and generated |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the repo is put together |
| [docs/RESEARCH.md](docs/RESEARCH.md) | The UI research behind the rules |


## Develop

```sh
pnpm install
pnpm dev          # Storybook on http://127.0.0.1:6007
pnpm check        # tokens + contrast proof, palette, i18n, types, lint, unit tests, catalogue
pnpm review       # with Storybook running: screenshot and axe-check every story → review/index.html
pnpm test:calendar # open calendars, keyboard selection, themes, locales and small screens
pnpm review:responsive # with Storybook: all page templates at 320/390/768/1280px, light/dark
pnpm test:browser # edit identity, pending saves, microphone permission and approval regressions
pnpm package:smoke # actual tarball: strict consumer types, ESM/SSR, styles, fonts and locales
pnpm build        # dist/: ESM, type declarations, styles.css, fonts.css, i18n
```

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. AI coding agents should start with [AGENTS.md](AGENTS.md).

## Status

Version 0.0.1. The API may change before 1.0; changes are recorded in [CHANGELOG.md](CHANGELOG.md).

## License

Plumb is source-available under the [PolyForm Noncommercial License 1.0.0](LICENSE) (`PolyForm-Noncommercial-1.0.0`). It permits noncommercial use, modification, and sharing under its terms, including its listed personal and organizational uses.

Except for the named-individual permission below, commercial use outside the licence's permitted purposes requires a separate written licence from the relevant copyright holders. Contact **Aria AzadiPour** or **Anskey Miranda** to request a commercial licence. Third-party dependencies retain their own licences. See [the licensing guide](docs/LICENSING.md) for scope, notices, contributions, and commercial permissions.

**Aria AzadiPour** and **Anskey Miranda** may use Plumb royalty-free for commercial or noncommercial projects outside Framed, without further commercial-licence approval. See the [named-individual permission](docs/LICENSING.md#permission-for-aria-azadipour-and-anskey-miranda) for its scope.

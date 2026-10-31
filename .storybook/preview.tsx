import "../src/styles/fonts.css";
import "../src/styles/index.css";
import type { Preview } from "@storybook/react-vite";
import { LocaleProvider, ThemeProvider, ToastProvider } from "../src";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme",
      toolbar: { title: "Theme", icon: "contrast", items: ["light", "dark"], dynamicTitle: true },
    },
    neutral: {
      description: "Neutrals",
      toolbar: { title: "Neutrals", icon: "circlehollow", dynamicTitle: true, items: [{ value: "cream", title: "Cream" }, { value: "grey", title: "Grey" }] },
    },
    density: {
      description: "Density",
      toolbar: { title: "Density", icon: "component", items: ["comfortable", "compact"], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "light", neutral: "cream", density: "comfortable" },
  decorators: [
    (Story, { globals, parameters }) => (
      <LocaleProvider locale="en-CA" currency="CAD">
      <ThemeProvider
        theme={globals.theme}
        neutral={globals.neutral}
        density={globals.density}
      >
        <div style={parameters.layout === "fullscreen" ? undefined : { padding: 24 }}>
          <Story />
        </div>
        <ToastProvider />
      </ThemeProvider>
      </LocaleProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
    controls: { expanded: true },
    options: {
      storySort: { order: ["Start here", "Foundations", "Components", "Layouts", ["Guide", "Page templates"], "Framed", "Workflow"] },
    },
  },
};
export default preview;

import stylex from "@stylexjs/unplugin";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  async viteFinal(config) {
    config.envDir = false;
    config.base = process.env.STORYBOOK_BASE_PATH || "./";
    config.plugins = [...(config.plugins ?? []), stylex.vite({ useCSSLayers: false, propertyValidationMode: "throw" })];
    return config;
  },
  framework: "@storybook/react-vite",
  core: { disableTelemetry: true },
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
};
export default config;

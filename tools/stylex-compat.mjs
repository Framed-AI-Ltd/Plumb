import stylex from "@stylexjs/eslint-plugin";

// StyleX 0.19.1 compiles :is() state selectors, but its ESLint allow-list omits
// them (and media-nested pseudo-elements) in conditional values. Its scroll-snap
// list also omits CSS proximity. Keep every other upstream check;
// strict compiler validation and browser regressions validate these selectors.
const upstream = stylex.rules["valid-styles"];
export default {
  ...stylex,
  rules: {
    ...stylex.rules,
    "valid-styles": {
      ...upstream,
      create(context) {
        const report = (diagnostic) => {
          const key = diagnostic.node?.parent?.key;
          const name = key?.value ?? key?.name;
          if (diagnostic.message === "Invalid Pseudo class or At Rule used for conditional style value"
            && typeof name === "string" && /^(?::is\(.+\)(?:::(?:before|after))?|::before|::after)$/.test(name)) return;
          if (diagnostic.message?.startsWith("scrollSnapType value must be one of:")
            && /^(?:x|y) proximity$/.test(diagnostic.node?.value ?? "")) return;
          context.report(diagnostic);
        };
        return upstream.create(Object.create(context, { report: { value: report } }));
      },
    },
  },
};

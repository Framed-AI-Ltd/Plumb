import path from "node:path";

const sourcePath = (filename) => filename.replaceAll("\\", "/").split("/src/")[1];

export default {
  rules: {
    "file-length": {
      meta: { type: "suggestion", schema: [], messages: {
        soft: "{{lines}} lines exceeds the 100-line guideline. Consider a meaningful split.",
        strong: "STRONG WARNING: {{lines}} lines exceeds 200. Prioritize a meaningful split; this remains advisory.",
      } },
      create(context) {
        return { Program(node) {
          const lines = context.sourceCode.lines.length;
          if (lines > 100) context.report({ node, messageId: lines > 200 ? "strong" : "soft", data: { lines } });
        } };
      },
    },
    "feature-facades": {
      meta: { type: "problem", schema: [], messages: {
        private: "Import another feature through its index facade, never its internals.",
      } },
      create(context) {
        const filename = context.filename;
        const current = sourcePath(filename)?.split("/");
        const check = (node) => {
          const specifier = node.source?.value;
          if (typeof specifier !== "string" || !specifier.startsWith(".")) return;
          const target = sourcePath(path.resolve(path.dirname(filename), specifier))?.split("/");
          if (target?.[0] !== "features") return;
          if (current?.[0] === "features" && current[1] === target[1]) return;
          if (target.length > 2 && !/^index(?:\.[cm]?[jt]sx?)?$/.test(target.slice(2).join("/"))) {
            context.report({ node: node.source, messageId: "private" });
          }
        };
        return { ImportDeclaration: check, ImportExpression: check, ExportNamedDeclaration: check, ExportAllDeclaration: check };
      },
    },
  },
};

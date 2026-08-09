import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // ABTalks copy is editorial and full of contractions/typographic quotes;
      // escaping every apostrophe hurts readablity more than it helps safety.
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;

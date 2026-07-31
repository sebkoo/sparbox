const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier");
module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  { ignores: ["dist/*", ".expo/*"] },
  {
    files: ["src/agent/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "zod",
              message:
                "src/agent/ takes validation as a Parser<T> from src/domain/, never a schema.",
            },
            {
              name: "react",
              message:
                "src/agent/ is pure TypeScript and must stay node-testable.",
            },
            {
              name: "react-native",
              message:
                "src/agent/ is pure TypeScript and must stay node-testable.",
            },
          ],
          patterns: [
            {
              group: ["@/stores", "@/stores/*", "@/app", "@/app/*"],
              message:
                "src/agent/ imports no store and no screen — configuration arrives as arguments.",
            },
            {
              group: ["expo", "expo-*", "expo/*"],
              message:
                "src/agent/ takes platform capabilities as arguments, never as imports.",
            },
          ],
        },
      ],
    },
  },
]);

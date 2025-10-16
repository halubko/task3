import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser"
import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"
import prettierPlugin from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    plugins: {
      "typescript-eslint": tseslint,
      prettier: prettierPlugin,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      prettierConfig,
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
      sourceType: "module",
    },
    rules: {
      "prettier/prettier": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-extra-parens": [
        "error",
        "all",
        {
          nestedBinaryExpressions: false,
        },
      ],
      curly: "error",
      eqeqeq: "error",
      "no-magic-numbers": [
        "warn",
        {
          ignore: [0, 1],
          ignoreArrayIndexes: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
    ignores: ["webpack.config.js"],
  },
])
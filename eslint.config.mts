import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser"
import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"
import prettierPlugin from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"
import path from "path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        project: [path.resolve(__dirname, "./tsconfig.json")],
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
      "prettier/prettier": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-unused-vars": "warn",
      "no-console": "warn",
      curly: "error",
      eqeqeq: "error",
      "@typescript-eslint/no-explicit-any": "warn",
    },
    ignores: ["webpack.config.js"],
  },
])
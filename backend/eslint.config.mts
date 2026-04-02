import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist", "node_modules", "generated"],
  },
  {
    files: ["**/*.{js,ts}"],
    languageOptions: { globals: globals.node, sourceType: "module" },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
]);

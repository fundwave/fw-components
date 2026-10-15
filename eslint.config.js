import reactPlugin from "eslint-plugin-react";

import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";

import typescriptParser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [".github/**"]
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      ...reactPlugin.configs.flat.recommended.languageOptions,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  {
    rules: {
      "no-eval": "error",
      "no-useless-escape": "error",
      // "no-use-before-define": ["warn", { functions: false, classes: true, variables: true }],
      "block-scoped-var": "error",
      "no-alert": "error",
      "no-script-url": "error",
      "no-var": "error",
      "prefer-const": "error",
      "array-callback-return": ["error", { checkForEach: true }],
      "no-extra-boolean-cast": "off",
      "react/jsx-key": "off",
      "prefer-template": "warn",
      "no-self-compare": "warn",
      "no-duplicate-imports": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "eqeqeq": "warn",
      "max-depth": ["warn", 3],
      "no-inline-comments": "warn",
      "no-multi-assign": "warn",
      "require-await": "warn"
    }
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    plugins: {
      jsdoc
    },
    rules: {
      "jsdoc/require-jsdoc": [
        "off",
        {
          enableFixer: false,
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true
          }
        }
      ]
    }
  },
  {
    files: ["**/*.test.js", "**/*.test.ts", "**/*.spec.js", "**/*.spec.ts"],
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    },
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "require-await": "off"
    }
  }
];

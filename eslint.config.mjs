import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable specific TypeScript rules
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      // Optional: disable the unescaped entities rule
      "react/no-unescaped-entities": "off",
      "no-unused-vars": "off",
      // Disable the no-console rule
      "no-console": "off",
      // Disable the no-debugger rule
      "no-debugger": "off",
      // Disable the no-undef rule        
      "no-undef": "off",
      // Disable the no-restricted-syntax rule
      "no-restricted-syntax": "off",
      // Disable the no-constant-condition rule
      "no-constant-condition": "off",
      // Disable the no-duplicate-imports rule          
      "no-duplicate-imports": "off",
      // Disable the no-shadow rule
      "no-shadow": "off",
      // Disable the no-unused-expressions rule
      "no-unused-expressions": "off",
      // Disable the no-use-before-define rule          
      "no-use-before-define": "off",
      // Disable the no-var rule
      "no-var": "off",
      // Disable the prefer-const rule
      "prefer-const": "off",
      // Disable the prefer-rest-params rule
      "prefer-rest-params": "off",              
      // allowObjectTypes
      "no-restricted-syntax": [
        "error",
        {
          selector: "ForInStatement",
          message: "for...in loops are not allowed. Use Object.keys() or Object.entries() instead.",
        },
        {
          selector: "LabeledStatement",
          message: "Labeled statements are not allowed.",
        },
      ],
      // Disable the no-unsafe-optional-chaining rule
      "no-unsafe-optional-chaining": "off",

    },
  },
];

export default eslintConfig;

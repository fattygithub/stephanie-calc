import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-eval": "warn"
    },
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        module: "readonly",
        require: "readonly",
        setTimeout: "readonly"
      }
    }
  }
];
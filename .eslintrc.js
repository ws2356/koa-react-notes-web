module.exports = {
  extends: [
    "react-app",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:functional/external-recommended",
    "plugin:functional/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "functional"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "comma-dangle": ["error"],
    "consistent-return": 0,
    "functional/functional-parameters": "off",
    "functional/no-conditional-statement": "off",
    "functional/no-expression-statement": "off",
    "functional/no-let": ["error", { allowLocalMutation: true }],
    "functional/no-method-signature": "off",
    "functional/prefer-readonly-type": "off",
    "functional/no-return-void": "off",
    "functional/no-try-statement": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.test.ts",
          "**/*.test.tsx",
          "craco.config.js",
          ".storybook/**",
          "src/stories/**",
        ],
      },
    ],
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelComponents: ["label"],
        labelAttributes: ["htmlFor"],
        controlComponents: ["Text"],
      },
    ],
    "max-len": 0,
    "no-alert": "off",
    "no-const-assign": ["error"],
    "no-param-reassign": 0,
    "operator-linebreak": "off",
    "prefer-const": ["error"],
    "react/destructuring-assignment": "off",
    "react/jsx-curly-newline": "off",
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-unescaped-entities": 0,
    eqeqeq: ["error", "always", { null: "ignore" }],
    indent: "off",
    quotes: ["error", "double"],
    semi: 2,
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src/"]],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
};

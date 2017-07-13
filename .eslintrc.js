module.exports = {
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module"
  },
  rules: {
    "no-undef": "off",
    semi: "error",
    quotes: "error"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  }
};

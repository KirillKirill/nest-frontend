module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "prettier", "airbnb/hooks"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  parser: "babel-eslint",
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "lines-between-class-members": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx"] },
    ],
    "react/prop-types": "off",
    "no-param-reassign": "off",
    "import/no-useless-path-segments": "off",
  },
}

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parser: "vue-eslint-parser",
  extends: [
    "plugin:vue/essential",
    "@vue/standard",
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "semi": [2, "always"],
    "quotes": [2, "double", {"avoidEscape": true}]
  }
}

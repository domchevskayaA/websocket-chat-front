module.exports = {
    root: true,
    env: {
      // this section will be used to determine which APIs are available to us
      // (i.e are we running in a browser environment or a node.js env)
      node: true,
      browser: true
    },
    parserOptions: {
    },
    extends: [
      // use the recommended rule set for both plain javascript and vue
      "eslint:recommended",
      "plugin:vue/recommended"
    ],
    rules: {
      // we should always disable console logs and debugging in productions
      "vue/require-default-prop": "off",
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    }
  };
  
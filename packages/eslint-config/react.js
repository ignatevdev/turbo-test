module.exports = {
  extends: ["next", "./index"],
  overrides: [],
  rules: {
    // React
    "react/jsx-wrap-multilines": [
      "error",
      { declaration: false, assignment: false },
    ],
    "react/jsx-fragments": [1, "element"],
    "react/jsx-no-undef": [2, { allowGlobals: true }],
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-curly-spacing": "off",
    "react/no-unknown-property": "off",
    "react/jsx-sort-props": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-curly-brace-presence": [
      1,
      { props: "never", children: "never" },
    ],
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "jsx-a11y/label-has-associated-control": "off",
  },
};

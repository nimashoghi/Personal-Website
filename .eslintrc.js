module.exports = {
    extends: ["airbnb", "prettier"],
    rules: {
        "react/jsx-props-no-spreading": "off",
        "react/jsx-indent": "off",
        "react/jsx-indent-props": "off",
        "react/jsx-filename-extension": "off",
        "react/require-default-props": "off",
    },
    parser: "babel-eslint",
    env: {
        browser: true,
        node: true,
    },
}

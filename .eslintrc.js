module.exports = {
    "plugins": [
        "jest"
    ],
    "extends": [
      "airbnb-base",
      "plugin:jest/recommended"
    ],
    "rules": {
      "no-console": "off",
      "comma-dangle": "off"
    },
    "settings": {
      "import/core-modules": ["aws-sdk"]
    }
};

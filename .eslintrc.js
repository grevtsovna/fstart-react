module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "linebreak-style": ["error", "windows"],
    "comma-dangle": ["error", "never"],
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/forbid-prop-types": ['error', {
      forbid: ['any', 'array'],
      checkContextTypes: true,
      checkChildContextTypes: true,
    }],
    "react/jsx-one-expression-per-line": "off"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  }
};

module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "linebreak-style": ["error", "unix"],
    "comma-dangle": ["error", "never"],
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  }
};

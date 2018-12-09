module.exports = {
  "extends": "airbnb",
  "rules": {
    "linebreak-style": ["error", "unix"],
    "comma-dangle": ["error", "never"],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  }
};

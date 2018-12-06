module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'linebreak-style': ["error", "windows"],
    'comma-dangle': ["error", "never"]
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      }
    }
  }
};

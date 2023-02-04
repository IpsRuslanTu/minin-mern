module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'react/react-in-jsx-scope': 0,
    'quotes': ['error', 'single'],
    'jsx-quotes': [2, 'prefer-single'],
    'semi': ['error', 'never'],
    'react/jsx-indent': [2, 2],
    'indent': ['error', 2],
    'react/prop-types': 'off'
  }
}

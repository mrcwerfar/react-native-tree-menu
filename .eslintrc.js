module.exports = {
  'parser': 'babel-eslint',
  'ecmaFeatures': {
    'classes': true,
    'jsx': true
  },
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'          //<===== NB! Lagt til 26.04.2017 Fikk bort linter-meldinga 'Unused ...' selv komponent var i bruk: SE: https://github.com/babel/babel-eslint/issues/6
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'no-console': 'off',                //<==== NB! Lagt til 26.04.2017
    'indent': [
      'error',
      'tab'
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};

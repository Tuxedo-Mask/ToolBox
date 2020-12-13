module.exports = {
  'extends': ['eslint:recommended', 'google'],
  'rules': {
    'max-len': ['error', { 'code': 120 }],
  },
  'env': {
    'node': true,
    'es6': true,
  },
  'parserOptions': {
    'ecmaVersion': 8,
  },
  'parser': 'babel-eslint',
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-indent': [2, 4],
    'react/jsx-indent-props': [2, 4],
    indent: [2, 4],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'import/no-unresolved': 'off',
    'camelcase': 'off',
    'import/prefer-default-export': 'off',
    "linebreak-style": 0,
    'no-unused-vars': 'off',
    'no-return-await':"off",
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'jsx-a11y/control-has-associated-label': 'warn',
    'jsx-a11y/label-has-associated-control': 'warn',
    'no-shadow': 'off',
    'no-console': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'max-len': ['error', { ignoreComments: true, code: 200 }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'jsx-a11y/anchor-has-content': 'warn',
    'no-plusplus': 'off',
    'consistent-return': 'warn',
    'no-return-assign': 'warn',
    'array-callback-return': 'warn',
    'class-methods-use-this': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
  },

  globals: {
    document: true,
    foo: true,
    window: true
  },

  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
}

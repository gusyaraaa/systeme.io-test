const esRules = {
  'no-var': 'error',
  'no-undef': 'error',
  'no-unused-vars': 'warn',
  'no-unused-expressions': 'error',
  'no-param-reassign': 'error',
  'no-shadow': 'error',
  'no-else-return': 'error',
  'no-useless-escape': 'error',
  'no-return-await': 'error',
  'default-case': 'error',
  'no-fallthrough': 'error',
  'prettier/prettier': ['warn', { usePrettierrc: true }],
  'css-modules/no-undef-class': 'warn',
  'css-modules/no-unused-class': 'warn',
}

// React
const reactRules = {
  'react/no-children-prop': 'off',
  'react/self-closing-comp': 'error',
  'react/no-unused-prop-types': 'warn',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'off',
}

// Typescript
const tsRules = {
  'no-undef': 'off',
  'no-shadow': 'off',
  'no-unused-vars': 'off',
  'react/jsx-no-undef': 'off',
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-use-before-define': 'error',
  '@typescript-eslint/no-redeclare': ['error'],
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  '@typescript-eslint/array-type': 'error',
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    { assertionStyle: 'as' },
  ],
  '@typescript-eslint/no-array-constructor': 'error',
  '@typescript-eslint/member-ordering': 'error',
  '@typescript-eslint/no-empty-function': 'warn',
  '@typescript-eslint/no-misused-new': 'error',
  '@typescript-eslint/no-unnecessary-condition': 'off',
  '@typescript-eslint/no-unnecessary-qualifier': 'error',
  '@typescript-eslint/no-unnecessary-type-arguments': 'error',
  '@typescript-eslint/no-unused-vars': 'warn',
  '@typescript-eslint/no-useless-constructor': 'error',
  '@typescript-eslint/prefer-includes': 'error',
  '@typescript-eslint/require-await': 'error',
}

// Import
const importRules = {
  'import/no-dynamic-require': 'error',
  'import/no-self-import': 'error',
  'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
  'import/no-duplicates': 'error',
  'import/extensions': [
    'error',
    'never',
    {
      ignorePackages: true,
      svg: 'always',
    },
  ],
  'import/export': 'error',
  'import/newline-after-import': 'error',
  'import/first': 'error',
  'import/no-mutable-exports': 'error',
  'import/no-cycle': 'error',
  'import/order': 'off',
}

const env = { browser: true, node: true }

const settings = {
  react: { version: 'detect' },
  'import/resolver': {
    node: {
      paths: ['src/'],
    },
  },
}

module.exports = {
  overrides: [
    {
      env,
      files: ['**/*.js', '**/*.jsx', '**/*.json'],
      extends: ['prettier'],
      plugins: ['prettier', 'react', 'react-hooks', 'import'],
      settings,
      rules: {
        ...esRules,
        ...reactRules,
        ...importRules,
      },
    },
    {
      env,
      files: ['**/*.d.ts', '**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:import/typescript',
        'plugin:css-modules/recommended',
        'prettier',
      ],
      plugins: [
        'css-modules',
        'prettier',
        '@typescript-eslint',
        'react',
        'react-hooks',
        'import',
      ],
      settings,
      rules: {
        ...esRules,
        ...tsRules,
        ...reactRules,
        ...importRules,
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
  ],
}

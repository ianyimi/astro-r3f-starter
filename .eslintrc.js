module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: ['plugin:astro/recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:astro/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['prettier', 'astro', 'react', 'nanoid', '@typescript-eslint', 'simple-import-sort', 'import'],
  settings: {
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
      },
    }
  },
  rules: {
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.astro', '.jsx', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // `react` first, `next` second, then packages starting with a character
          ['^react$', '^next', '^[a-z]'],
          // Packages starting with `@`
          ['^@'],
          // Packages starting with `~`
          ['^~'],
          // Imports starting with `../`
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Imports starting with `./`
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports
          ['^.+\\.s?css$'],
          // Side effect imports
          ['^\\u0000'],
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      },
    },
    {
      files: ['*.js, *.jsx, *.ts, *.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // `react` first, `next` second, then packages starting with a character
              ['^react$', '^next', '^[a-z]'],
              // Packages starting with `@`
              ['^@'],
              // Packages starting with `~`
              ['^~'],
              // Imports starting with `../`
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Imports starting with `./`
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports
              ['^.+\\.s?css$'],
              // Side effect imports
              ['^\\u0000'],
            ],
          },
        ],
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ['**/*.astro/*.js', '*.astro/*.js'],
      parser: '@typescript-eslint/parser',
    },
  ],
};

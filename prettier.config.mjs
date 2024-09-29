/** @type {import("prettier").Config} */
const prettier = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  printWidth: 80,
  tabWidth: 2,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [
    {
      files: ['tsconfig*.json'],
      options: {
        parser: 'json',
        trailingComma: 'none',
      },
    },
  ],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '^server-only$',
    '^next(/?)(.*)$',
    '^react(.*)$',
    '^@[^/].*$',
    '<THIRD_PARTY_MODULES>',
    '^@/api/(.*)$',
    '^@/components/(.*)$',
    '^@/const/(.*)$',
    '^@/hooks/(.*)$',
    '^@/lib/(.*)$',
    '^@/styles/(.*)$',
    '^@/types/(.*)$',
    '^@/utils/(.*)$',
    '^[./]',
  ],
};

export default prettier;

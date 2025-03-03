/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  bracketSpacing: true,
  endOfLine: 'lf',
  overrides: [{ files: '*.yml', options: { singleQuote: false } }],
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
  proseWrap: 'always',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};

export default config;

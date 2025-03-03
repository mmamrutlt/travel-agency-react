import en from './locales/en.json';

// eslint-disable-next-line unused-imports/no-unused-vars
const resources = { en } as const;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: typeof resources;
  }
}

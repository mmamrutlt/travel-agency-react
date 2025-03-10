import en from './locales/en.json';

const resources = { en } as const;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: typeof resources;
  }
}

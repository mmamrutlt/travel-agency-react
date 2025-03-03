import { sentryVitePlugin } from '@sentry/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import path from 'path';
import { type UserConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';

// https://vitejs.dev/config/
export default {
  plugins: [
    TanStackRouterVite(),
    viteReact(),
    tailwindcss(),
    analyzer(),
    // Put the Sentry vite plugin after all other plugins
    sentryVitePlugin({
      org: process.env.VITE_SENTRY_ORG,
      project: process.env.VITE_SENTRY_PROJECT,

      // Auth tokens can be obtained from https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/
      authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
    }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
} satisfies UserConfig;

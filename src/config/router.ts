import { createRouter } from '@tanstack/react-router';

import type { FileRouteTypes } from '../routeTree.gen';
import { routeTree } from '../routeTree.gen';

export const router = createRouter({ routeTree });

export type AvailableRoutes = FileRouteTypes['id'];

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

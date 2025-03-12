import { createQueryKeys } from '@lukemorales/query-key-factory';
import { skipToken } from '@tanstack/react-query';

import type { RequestParams } from '../types';
import { getFlightDetail, getFlightsList } from './api';

export const queries = createQueryKeys('flights', {
  detail: (flightId: string) => {
    return {
      queryKey: [flightId],
      queryFn: () => {
        return flightId ? getFlightDetail(flightId) : (skipToken as never);
      },
    };
  },
  list: (params: RequestParams) => {
    return {
      queryKey: [params],
      queryFn: () => {
        return getFlightsList(params);
      },
    };
  },
});

import { createQueryKeys } from '@lukemorales/query-key-factory';
import { skipToken } from '@tanstack/react-query';

import type { RequestParams } from '../types';
import { getAirlineDetail, getAirlinesList } from './api';

export const queries = createQueryKeys('airlines', {
  detail: (airlineId: string) => {
    return {
      queryKey: [airlineId],
      queryFn: () => {
        return airlineId ? getAirlineDetail(airlineId) : (skipToken as never);
      },
    };
  },
  list: (params: RequestParams) => {
    return {
      queryKey: [params],
      queryFn: () => {
        return getAirlinesList(params);
      },
    };
  },
});

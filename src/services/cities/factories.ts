import { createQueryKeys } from '@lukemorales/query-key-factory';
import { skipToken } from '@tanstack/react-query';

import type { RequestParams } from '../types';
import { getCitiesList, getCityDetail } from './api';

export const queries = createQueryKeys('cities', {
  detail: (cityId: string) => {
    return {
      queryKey: [cityId],
      queryFn: () => {
        return cityId ? getCityDetail(cityId) : (skipToken as never);
      },
    };
  },
  list: (params: RequestParams) => {
    return {
      queryKey: [params],
      queryFn: () => {
        return getCitiesList(params);
      },
    };
  },
});

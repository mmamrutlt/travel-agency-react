import { createQueryKeys } from '@lukemorales/query-key-factory';
import { skipToken } from '@tanstack/react-query';

import type { RequestParams } from '../types';
import { createPayment, getPaymentsDetail, getPaymentsList } from './api';

export const queries = createQueryKeys('payments', {
  detail: (paymentId: string) => {
    return {
      queryKey: [paymentId],
      queryFn: () => {
        return paymentId ? getPaymentsDetail(paymentId) : (skipToken as never);
      },
    };
  },
  list: (params: RequestParams) => {
    return {
      queryKey: [params],
      queryFn: () => {
        return getPaymentsList(params);
      },
    };
  },
});

export const mutations = { create: createPayment };

import { useMutation, useQuery } from '@tanstack/react-query';

import type { RequestParams, UseMutationProps, UseQueryProps } from '@/services/types';
import { mutations, queries } from './factories';

export const usePaymentsDetailQuery = (
  paymentId: string,
  props?: UseQueryProps<typeof queries.detail>,
) => {
  return useQuery({ ...queries.detail(paymentId), ...props });
};

export const usePaymentsListQuery = (
  params: RequestParams,
  props?: UseQueryProps<typeof queries.list>,
) => {
  return useQuery({ ...queries.list(params), ...props });
};

export const usePaymentsCreateMutation = (props?: UseMutationProps<typeof mutations.create>) => {
  return useMutation({ mutationFn: mutations.create, ...props });
};

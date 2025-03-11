import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { RequestParams, UseQueryProps } from '@/services/types';
import { createAirline } from './api';
import { queries } from './factories';

export const useAirlinesDetailQuery = (
  airlineId: string,
  props?: UseQueryProps<typeof queries.detail>,
) => {
  return useQuery({ ...queries.detail(airlineId), ...props });
};

export const useAirlinesListQuery = (
  params: RequestParams,
  props?: UseQueryProps<typeof queries.list>,
) => {
  return useQuery({ ...queries.list(params), ...props });
};

export const useCreateAirlineMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAirline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.list._def });
    },
  });
};

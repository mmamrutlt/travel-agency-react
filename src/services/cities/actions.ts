import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { RequestParams, UseQueryProps } from '@/services/types';
import { createCity } from './api';
import { queries } from './factories';

export const useCitiesDetailQuery = (
  cityId: string,
  props?: UseQueryProps<typeof queries.detail>,
) => {
  return useQuery({ ...queries.detail(cityId), ...props });
};

export const useCitiesListQuery = (
  params: RequestParams,
  props?: UseQueryProps<typeof queries.list>,
) => {
  return useQuery({ ...queries.list(params), ...props });
};

export const useCreateCityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.list._def });
    },
  });
};

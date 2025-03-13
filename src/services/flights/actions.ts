import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { RequestParams, UseQueryProps } from '@/services/types';
import { createFlight, deleteFlight } from './api';
import { queries } from './factories';

export const useFlightsDetailQuery = (
  flightId: string,
  props?: UseQueryProps<typeof queries.detail>,
) => {
  return useQuery({ ...queries.detail(flightId), ...props });
};

export const useFlightsListQuery = (
  params: RequestParams,
  props?: UseQueryProps<typeof queries.list>,
) => {
  return useQuery({ ...queries.list(params), ...props });
};

export const useCreateFlightMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.list._def });
    },
  });
};

export const useDeleteFlightMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.list._def });
    },
  });
};

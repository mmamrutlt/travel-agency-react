import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

type QueryKey = { queryKey: readonly unknown[]; queryFn: (...args: never) => unknown };

type QueryFnReturnType<T> = T extends (...args: never) => QueryKey
  ? Awaited<ReturnType<ReturnType<T>['queryFn']>>
  : T extends QueryKey
    ? Awaited<ReturnType<T['queryFn']>>
    : never;

type QueryKeyReturnType<T> = T extends (...args: never) => QueryKey
  ? ReturnType<T>['queryKey']
  : T extends QueryKey
    ? T['queryKey']
    : never;

export type UseQueryProps<T extends ((...args: never) => QueryKey) | QueryKey> = Omit<
  UseQueryOptions<QueryFnReturnType<T>, unknown, QueryFnReturnType<T>, QueryKeyReturnType<T>>,
  'queryFn' | 'queryKey'
>;

export type UseMutationProps<T extends (...args: never) => unknown> = Omit<
  UseMutationOptions<Awaited<ReturnType<T>>, unknown, Parameters<T>[0]>,
  'mutationFn'
>;

export interface RequestParams {
  page?: number;
  pageSize?: number;
}

interface ServicePagination {
  count: number;
  currentPage: number;
  links: { next: string; previous: string };
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ServiceResponse<T> {
  data: T;
  pagination?: ServicePagination;
  status: number;
  success: boolean;
}

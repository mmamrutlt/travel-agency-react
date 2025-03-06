import { useMemo } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import { z } from 'zod';

import type { PaginationState } from '@/components/ui/table';
import type { AvailableRoutes } from '@/config/router';

const PAGE_SIZE = 10;

const paginationValidation = z.object({
  page: z.number(),
  pageSize: z.number(),
});

export const paginationValidationWithDefaults = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(PAGE_SIZE),
});

export const usePagination = (path: AvailableRoutes) => {
  const { useNavigate, useSearch } = getRouteApi(path);

  const search = useSearch();
  const navigate = useNavigate();

  const { page, pageSize } = useMemo(() => {
    return paginationValidation.parse(search);
  }, [search]);

  const pageIndex = page - 1;

  const changePage = ({ pageIndex: newPageIndex, pageSize: newPageSize }: PaginationState) => {
    navigate({
      search: (prev) => {
        return { ...prev, page: newPageIndex + 1, pageSize: newPageSize };
      },
    });
  };

  const changePageSize = (pageSize: number) => {
    navigate({
      search: (prev) => {
        return { ...prev, pageSize, page: 1 };
      },
    });
  };

  const resetPage = () => {
    return changePage({ pageIndex: 0, pageSize: PAGE_SIZE });
  };

  return { actions: { changePage, changePageSize, resetPage }, page, pageIndex, pageSize };
};

import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { DataTable } from '@/components/ui/table';
import {
  paginationValidationWithDefaults,
  searchTextValidation,
  useDebounce,
  usePagination,
  useSearchText,
} from '@/hooks';
import { useTranslation } from '@/i18n';
import { usePaymentsListQuery } from '@/services';
import { usePaymentsTable } from './-hooks';

const PaymentsPage = () => {
  const {
    actions: { changePage },
    page,
    pageIndex,
    pageSize,
  } = usePagination(Route.id);
  const { searchText } = useSearchText(Route.id);

  const debouncedSearchText = useDebounce(searchText, 500);

  const { t } = useTranslation();

  const { data, isLoading } = usePaymentsListQuery({
    pageSize,
    page,
    searchText: debouncedSearchText,
  });

  const table = usePaymentsTable({
    data: data?.data ?? [],
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        changePage(updater({ pageIndex, pageSize }));
      }
    },
    pageCount: data?.pagination?.totalPages,
  });

  return (
    <div className="flex flex-col gap-y-2 p-4">
      <h1>{t('payments.title')}</h1>

      <DataTable
        isLoading={isLoading}
        path={Route.id}
        table={table}
        withColumnVisibility
        withSearch
      />
    </div>
  );
};

export const Route = createFileRoute('/_private/payments/')({
  component: PaymentsPage,
  validateSearch: z.object({
    ...searchTextValidation.shape,
    ...paginationValidationWithDefaults.shape,
  }),
});

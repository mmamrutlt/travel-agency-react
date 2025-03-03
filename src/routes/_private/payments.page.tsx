import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { DataTable, type PaginationState } from '@/components/ui/table';
import { usePaymentsListQuery } from '@/services';
import { usePaymentsTable } from './-hooks';

const PAGE_SIZE = 10;

const PaymentsPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const { data, isLoading } = usePaymentsListQuery({
    pageSize: pagination.pageSize,
    page: pagination.pageIndex + 1,
  });

  const table = usePaymentsTable({
    data: data?.data ?? [],
    state: { pagination },
    onPaginationChange: setPagination,
    pageCount: data?.pagination?.totalPages,
  });

  return (
    <div className="p-4">
      <DataTable isLoadingData={isLoading} table={table} />
    </div>
  );
};

export const Route = createFileRoute('/_private/payments/')({ component: PaymentsPage });

import { useMemo } from 'react';

import { createColumnHelper, useTable, type UseTableProps } from '@/components/ui/table';
import { useTranslation } from '@/i18n';
import type { Payment } from '@/services/payments/types';

export const usePaymentsTable = ({
  data = [],
  ...props
}: Omit<UseTableProps<Payment>, 'columns'>) => {
  const { t } = useTranslation();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Payment>();

    return [
      columnHelper.accessor('status', {
        header: t('payments.table.columns.status'),
        cell: ({ row }) => {
          return <div className="capitalize">{row.getValue('status')}</div>;
        },
      }),
      columnHelper.accessor('email', {
        header: t('payments.table.columns.email'),
        cell: ({ row }) => {
          return <div className="lowercase">{row.getValue('email')}</div>;
        },
      }),
      columnHelper.accessor('amount', {
        header: () => {
          return <div className="text-right">{t('payments.table.columns.amount')}</div>;
        },
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue('amount'));

          // Format the amount as a dollar amount
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(amount);

          return <div className="text-right font-medium">{formatted}</div>;
        },
      }),
    ];
  }, [t]);

  return useTable({ columns, data, ...props });
};

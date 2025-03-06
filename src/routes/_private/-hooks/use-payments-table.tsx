import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { Icons } from '@/components/ui/icons';
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
        meta: { stringifiedHeader: t('payments.table.columns.status') },
        header: t('payments.table.columns.status'),
        cell: ({ row }) => {
          return <div className="capitalize">{row.getValue('status')}</div>;
        },
      }),
      columnHelper.accessor('email', {
        meta: { stringifiedHeader: t('payments.table.columns.email') },
        header: t('payments.table.columns.email'),
        cell: ({ row }) => {
          return <div className="lowercase">{row.getValue('email')}</div>;
        },
      }),
      columnHelper.accessor('amount', {
        meta: { stringifiedHeader: t('payments.table.columns.amount') },
        header: t('payments.table.columns.amount'),
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue('amount'));

          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(amount);

          return <div className="font-medium">{formatted}</div>;
        },
      }),
      columnHelper.display({
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          return (
            <div className="text-right">
              <Dropdown.Menu>
                <Dropdown.MenuTrigger asChild>
                  <Button className="size-8" variant="ghost">
                    <span className="sr-only">{t('payments.table.columns.actions.ariaLabel')}</span>

                    <Icons.MoreHorizontal />
                  </Button>
                </Dropdown.MenuTrigger>

                <Dropdown.MenuContent align="end">
                  <Dropdown.MenuLabel>
                    {t('payments.table.columns.actions.title')}
                  </Dropdown.MenuLabel>

                  <Dropdown.MenuItem
                    onClick={() => {
                      return navigator.clipboard.writeText(row.getValue('email'));
                    }}
                  >
                    {t('payments.table.columns.actions.copyPaymentEmail')}
                  </Dropdown.MenuItem>
                </Dropdown.MenuContent>
              </Dropdown.Menu>
            </div>
          );
        },
      }),
    ];
  }, [t]);

  return useTable({ columns, data, ...props });
};

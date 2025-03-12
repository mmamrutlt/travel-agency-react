import { useMemo } from 'react';

import { createColumnHelper, useTable, type UseTableProps } from '@/components/ui/table';
import { useTranslation } from '@/i18n';
import type { City } from '@/services/cities/types';

export const useCitiesTable = ({ data = [], ...props }: Omit<UseTableProps<City>, 'columns'>) => {
  const { t } = useTranslation();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<City>();

    return [
      columnHelper.accessor('id', {
        header: () => {
          return t('cities.id');
        },
      }),
      columnHelper.accessor('name', {
        header: () => {
          return t('cities.name');
        },
      }),
      columnHelper.accessor('incoming_flights', {
        header: () => {
          return t('cities.incoming_flights');
        },
      }),
      columnHelper.accessor('outgoing_flights', {
        header: () => {
          return t('cities.outgoing_flights');
        },
      }),
    ];
  }, [t]);

  return useTable({ columns, data, ...props });
};

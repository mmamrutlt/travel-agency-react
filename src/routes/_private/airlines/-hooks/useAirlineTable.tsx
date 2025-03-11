import { useMemo } from 'react';

import { createColumnHelper, useTable, type UseTableProps } from '@/components/ui/table';
import { useTranslation } from '@/i18n';
import type { Airline } from '@/services/airlines/types';

export const useAirlinesTable = ({
  data = [],
  ...props
}: Omit<UseTableProps<Airline>, 'columns'>) => {
  const { t } = useTranslation();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Airline>();

    return [
      columnHelper.accessor('id', {
        header: () => {
          return t('airlines.id');
        },
      }),
      columnHelper.accessor('name', {
        header: () => {
          return t('airlines.name');
        },
      }),
      columnHelper.accessor('description', {
        header: () => {
          return t('airlines.description');
        },
      }),
      columnHelper.accessor('flights_count', {
        header: () => {
          return t('airlines.flights_count');
        },
      }),
    ];
  }, [t]);

  return useTable({ columns, data, ...props });
};

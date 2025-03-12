import { useMemo } from 'react';

import { createColumnHelper, useTable, type UseTableProps } from '@/components/ui/table';
import { useTranslation } from '@/i18n';
import type { Flight } from '@/services/flights/types';

export const useFlightsTable = ({
  data = [],
  ...props
}: Omit<UseTableProps<Flight>, 'columns'>) => {
  const { t } = useTranslation();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Flight>();

    return [
      columnHelper.accessor('id', {
        header: () => {
          return t('flights.id');
        },
      }),
      columnHelper.accessor('departure_date', {
        header: () => {
          return t('flights.departure_date');
        },
      }),
      columnHelper.accessor('arrival_date', {
        header: () => {
          return t('flights.arrival_date');
        },
      }),
      columnHelper.accessor('departure_city_id', {
        header: () => {
          return t('flights.departure_city_id');
        },
      }),
      columnHelper.accessor('arrival_city_id', {
        header: () => {
          return t('flights.arrival_city_id');
        },
      }),
      columnHelper.accessor('airline_id', {
        header: () => {
          return t('flights.airline_id');
        },
      }),
    ];
  }, [t]);

  return useTable({ columns, data, ...props });
};

import { useMemo } from 'react';
import { format } from 'date-fns';

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
        cell: ({ getValue }) => {
          const date = getValue();
          return format(new Date(date), 'MMM dd, yyyy - HH:mm');
        },
      }),
      columnHelper.accessor('arrival_date', {
        header: () => {
          return t('flights.arrival_date');
        },
        cell: ({ getValue }) => {
          const date = getValue();
          return format(new Date(date), 'MMM dd, yyyy - HH:mm');
        },
      }),
      columnHelper.accessor('departureCity.name', {
        header: () => {
          return t('flights.departure_city');
        },
      }),
      columnHelper.accessor('arrivalCity.name', {
        header: () => {
          return t('flights.arrival_city');
        },
      }),
      columnHelper.accessor('airline.name', {
        header: () => {
          return t('flights.airline');
        },
      }),
    ];
  }, [t]);

  return useTable({ columns, data, ...props });
};

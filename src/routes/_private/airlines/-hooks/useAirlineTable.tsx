import { useMemo } from 'react';

import { createColumnHelper, useTable, type UseTableProps } from '@/components/ui/table';
import { useTranslation } from '@/i18n';
import { useDeleteAirlineMutation } from '@/services/airlines';
import type { Airline } from '@/services/airlines/types';

export const useAirlinesTable = ({
  data = [],
  ...props
}: Omit<UseTableProps<Airline>, 'columns'> & {}) => {
  const { t } = useTranslation();

  const deleteAirline = useDeleteAirlineMutation();

  const handleDelete = (airlineId: string) => {
    if (window.confirm(t('airlines.deleteConfirmation'))) {
      deleteAirline.mutate(airlineId);
    }
  };

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
      columnHelper.display({
        id: 'actions',
        header: () => {
          return t('common.delete');
        },
        cell: ({ row }) => {
          return (
            <button
              className="rounded-md bg-red-600 px-2 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-200 hover:text-red-600"
              key={row.id}
              onClick={() => {
                return handleDelete(row.original.id);
              }}
            >
              {t('common.delete')}
            </button>
          );
        },
      }),
    ];
  }, [t, handleDelete]);

  return useTable({ columns, data, ...props });
};

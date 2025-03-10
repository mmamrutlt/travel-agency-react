import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { DataTable } from '@/components/ui/table';
import { createColumnHelper, useTable } from '@/components/ui/table';
import { paginationValidationWithDefaults, usePagination } from '@/hooks';
import { useTranslation } from '@/i18n';
import { useCitiesListQuery, useCreateCityMutation } from '@/services/cities';
import type { City } from '@/services/cities/types';
import { CreateCityForm, formSchema, type FormValues } from './-components/create-city-form';

const CitiesPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columnHelper = createColumnHelper<City>();

  const {
    actions: { changePage },
    page,
    pageIndex,
    pageSize,
  } = usePagination('/_private/cities/');

  const columns = [
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

  const {
    data: cities,
    error,
    isLoading,
  } = useCitiesListQuery({
    page,
    pageSize,
  });

  const table = useTable({
    data: cities?.data ?? [],
    columns,
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex, pageSize });
        changePage(newState);
      }
    },
    pageCount: cities?.pagination?.totalPages,
  });

  const createCity = useCreateCityMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleCreateCity = async (data: FormValues) => {
    await createCity.mutateAsync(data);
    setIsModalOpen(false);
    form.reset();
  };

  if (isLoading) {
    return <div>{t('cities.loading')}</div>;
  }

  if (error) {
    return <div>{t('cities.error')}</div>;
  }

  return (
    <div className="flex flex-col gap-y-2 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('cities.title')}</h1>
        <Button
          onClick={() => {
            return setIsModalOpen(true);
          }}
        >
          {t('cities.modal.addNewCity')}
        </Button>
      </div>

      <DataTable isLoading={isLoading} table={table} />

      <Modal
        cancelText={t('cities.modal.cancel')}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            form.reset();
          }
        }}
        onSave={() => {
          return form.handleSubmit(handleCreateCity)();
        }}
        open={isModalOpen}
        saveText={t('cities.modal.save')}
        title={t('cities.modal.title')}
      >
        <CreateCityForm form={form} />
      </Modal>
    </div>
  );
};

export const Route = createFileRoute('/_private/cities/')({
  component: CitiesPage,
  validateSearch: z.object({
    ...paginationValidationWithDefaults.shape,
  }),
});

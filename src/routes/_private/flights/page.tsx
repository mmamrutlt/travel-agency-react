import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { DataTable } from '@/components/ui/table';
import { paginationValidationWithDefaults, usePagination } from '@/hooks';
import { useTranslation } from '@/i18n';
import { useCreateFlightMutation, useFlightsListQuery } from '@/services/flights';
import { CreateFlightForm, formSchema, type FormValues } from './-components/create-flight-form';
import { useFlightsTable } from './-hooks/useFlightTable';

const ROUTE_ID = '/_private/flights/';
const FlightsPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    actions: { changePage },
    page,
    pageIndex,
    pageSize,
  } = usePagination(ROUTE_ID);

  const {
    data: flights,
    error,
    isLoading,
  } = useFlightsListQuery({
    page,
    pageSize,
  });

  const table = useFlightsTable({
    data: flights?.data ?? [],
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex, pageSize });
        changePage(newState);
      }
    },
    pageCount: flights?.pagination?.totalPages,
  });

  const createFlight = useCreateFlightMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departure_date: '',
      arrival_date: '',
      departure_city_id: '',
      arrival_city_id: '',
      airline_id: '',
    },
  });

  const handleCreateFlight = async (data: FormValues) => {
    await createFlight.mutateAsync(data);
    setIsModalOpen(false);
    form.reset();
  };

  if (isLoading) {
    return <div>{t('common.loading')}</div>;
  }

  if (error) {
    return <div>{t('common.error')}</div>;
  }

  return (
    <div className="flex flex-col gap-y-2 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('flights.title')}</h1>
        <Button
          onClick={() => {
            return setIsModalOpen(true);
          }}
        >
          {t('flights.modal.addNewFlight')}
        </Button>
      </div>
      <DataTable isLoading={isLoading} table={table} />
      <Modal
        cancelText={t('common.cancel')}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            form.reset();
          }
        }}
        onSave={form.handleSubmit(handleCreateFlight)}
        open={isModalOpen}
        saveText={t('flights.modal.save')}
        title={t('flights.modal.title')}
      >
        <CreateFlightForm form={form} />
      </Modal>
    </div>
  );
};

export const Route = createFileRoute('/_private/flights/')({
  component: FlightsPage,
  validateSearch: z.object({
    ...paginationValidationWithDefaults.shape,
  }),
});

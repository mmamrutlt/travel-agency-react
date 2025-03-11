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
import { useAirlinesListQuery, useCreateAirlineMutation } from '@/services/airlines';
import { CreateAirlineForm, formSchema, type FormValues } from './-components/create-airline-form';
import { useAirlinesTable } from './-hooks/useAirlineTable';

const AirlinesPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    actions: { changePage },
    page,
    pageIndex,
    pageSize,
  } = usePagination(Route.id);

  const {
    data: airlines,
    error,
    isLoading,
  } = useAirlinesListQuery({
    page,
    pageSize,
  });

  const table = useAirlinesTable({
    data: airlines?.data ?? [],
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex, pageSize });
        changePage(newState);
      }
    },
    pageCount: airlines?.pagination?.totalPages,
  });

  const createAirline = useCreateAirlineMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleCreateAirline = async (data: FormValues) => {
    try {
      await createAirline.mutateAsync(data);
      setIsModalOpen(false);
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        form.setError('name', { message: error.message });
      }
    }
  };

  if (isLoading) {
    return <div>{t('airlines.loading')}</div>;
  }

  if (error) {
    return <div>{t('airlines.error')}</div>;
  }

  return (
    <div className="flex flex-col gap-y-2 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('airlines.title')}</h1>
        <Button
          onClick={() => {
            return setIsModalOpen(true);
          }}
        >
          {t('airlines.modal.addNewAirline')}
        </Button>
      </div>
      <DataTable isLoading={isLoading} table={table} />
      <Modal
        cancelText={t('airlines.modal.cancel')}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            form.reset();
          }
        }}
        onSave={form.handleSubmit(handleCreateAirline)}
        open={isModalOpen}
        saveText={t('airlines.modal.save')}
        title={t('airlines.modal.title')}
      >
        <CreateAirlineForm form={form} />
      </Modal>
    </div>
  );
};

export const Route = createFileRoute('/_private/airlines/')({
  component: AirlinesPage,
  validateSearch: z.object({
    ...paginationValidationWithDefaults.shape,
  }),
});

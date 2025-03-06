import { type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/ui/input';

export const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type FormValues = z.infer<typeof formSchema>;

interface CreateCityFormProps {
  form: UseFormReturn<FormValues>;
}

export const CreateCityForm = ({ form }: CreateCityFormProps) => {
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <div className="space-y-4">
      <div>
        <Input {...register('name')} placeholder="Name of the city" />
        {errors.name ? <span className="text-sm text-red-500">{errors.name.message}</span> : null}
      </div>
    </div>
  );
};

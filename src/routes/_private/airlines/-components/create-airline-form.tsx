import { type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/ui/input';

export const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

interface CreateAirlineFormProps {
  form: UseFormReturn<FormValues>;
}

export const CreateAirlineForm = ({ form }: CreateAirlineFormProps) => {
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <div className="space-y-4">
      <div>
        <Input id="name" {...register('name')} placeholder="Name of the airline" />
        {errors.name ? <span className="text-sm text-red-500">{errors.name.message}</span> : null}
      </div>
      <div>
        <Input
          id="description"
          {...register('description')}
          placeholder="Description of the airline"
        />
        {errors.description ? (
          <span className="text-sm text-red-500">{errors.description.message}</span>
        ) : null}
      </div>
    </div>
  );
};

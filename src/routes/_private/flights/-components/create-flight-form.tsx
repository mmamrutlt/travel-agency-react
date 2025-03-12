import { type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components/ui/input';

export const formSchema = z.object({
  departure_date: z.string().min(1, 'Departure date is required'),
  arrival_date: z.string().min(1, 'Arrival date is required'),
  departure_city_id: z.string().min(1, 'Departure city is required'),
  arrival_city_id: z.string().min(1, 'Arrival city is required'),
  airline_id: z.string().min(1, 'Airline is required'),
});

export type FormValues = z.infer<typeof formSchema>;

interface CreateFlightFormProps {
  form: UseFormReturn<FormValues>;
}

export const CreateFlightForm = ({ form }: CreateFlightFormProps) => {
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <div className="space-y-4">
      <div>
        <Input
          id="departure_date"
          {...register('departure_date')}
          className="w-full"
          min={new Date().toISOString().slice(0, 16)}
          type="datetime-local"
        />
        {errors.departure_date ? (
          <span className="text-sm text-red-500">{errors.departure_date.message}</span>
        ) : null}
      </div>
      <div>
        <Input
          id="arrival_date"
          {...register('arrival_date')}
          className="w-full"
          min={new Date().toISOString().slice(0, 16)}
          type="datetime-local"
        />
        {errors.arrival_date ? (
          <span className="text-sm text-red-500">{errors.arrival_date.message}</span>
        ) : null}
      </div>
    </div>
  );
};

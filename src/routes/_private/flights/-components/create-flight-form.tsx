import { type UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDropdownAirlinesListQuery } from '@/services/airlines/actions';
import { useDropdownCitiesListQuery } from '@/services/cities/actions';
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
  const { t } = useTranslation();
  const {
    formState: { errors },
    register,
    setValue,
    watch,
  } = form;

  const { data: airlines } = useDropdownAirlinesListQuery();
  const { data: cities } = useDropdownCitiesListQuery();

  const selectedAirlineId = watch('airline_id');
  const selectedDepartureCityId = watch('departure_city_id');
  const selectedArrivalCityId = watch('arrival_city_id');

  return (
    <div className="space-y-4">
      <div>
        <Label>{t('flights.departure_date')}</Label>
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
        <Label>{t('flights.arrival_date')}</Label>
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
      <div>
        <Label>{t('flights.modal.airline')}</Label>
        <Dropdown.Menu>
          <Dropdown.MenuTrigger asChild>
            <Button className="w-full justify-between" variant="outline">
              {airlines?.data.find((a) => {
                return a.id === selectedAirlineId;
              })?.name || t('flights.modal.select_airline')}
            </Button>
          </Dropdown.MenuTrigger>
          <Dropdown.MenuContent className="max-h-[200px] w-full overflow-y-auto">
            {airlines?.data.map((airline) => {
              return (
                <Dropdown.MenuItem
                  key={airline.id}
                  onSelect={() => {
                    return setValue('airline_id', airline.id);
                  }}
                >
                  {airline.name}
                </Dropdown.MenuItem>
              );
            })}
          </Dropdown.MenuContent>
        </Dropdown.Menu>
        {errors.airline_id ? (
          <span className="text-sm text-red-500">{errors.airline_id.message}</span>
        ) : null}
      </div>
      <div>
        <Label>{t('flights.modal.departure_city')}</Label>
        <Dropdown.Menu>
          <Dropdown.MenuTrigger asChild>
            <Button className="w-full justify-between" variant="outline">
              {cities?.data.find((a) => {
                return a.id === selectedDepartureCityId;
              })?.name || t('flights.modal.select_departure_city')}
            </Button>
          </Dropdown.MenuTrigger>
          <Dropdown.MenuContent className="max-h-[200px] w-full overflow-y-auto">
            {cities?.data.map((city) => {
              return (
                <Dropdown.MenuItem
                  key={city.id}
                  onSelect={() => {
                    return setValue('departure_city_id', city.id);
                  }}
                >
                  {city.name}
                </Dropdown.MenuItem>
              );
            })}
          </Dropdown.MenuContent>
        </Dropdown.Menu>
        {errors.departure_city_id ? (
          <span className="text-sm text-red-500">{errors.departure_city_id.message}</span>
        ) : null}
      </div>
      <div>
        <Label>{t('flights.modal.arrival_city')}</Label>
        <Dropdown.Menu>
          <Dropdown.MenuTrigger disabled={!selectedDepartureCityId} asChild>
            <Button
              className="w-full justify-between"
              disabled={!selectedDepartureCityId}
              variant="outline"
            >
              {cities?.data.find((a) => {
                return a.id === selectedArrivalCityId;
              })?.name || t('flights.modal.select_arrival_city')}
            </Button>
          </Dropdown.MenuTrigger>
          <Dropdown.MenuContent className="max-h-[200px] w-full overflow-y-auto">
            {cities?.data
              .filter((city) => {
                return city.id !== selectedDepartureCityId;
              })
              .map((city) => {
                return (
                  <Dropdown.MenuItem
                    key={city.id}
                    onSelect={() => {
                      return setValue('arrival_city_id', city.id);
                    }}
                  >
                    {city.name}
                  </Dropdown.MenuItem>
                );
              })}
          </Dropdown.MenuContent>
        </Dropdown.Menu>
        {errors.arrival_city_id ? (
          <span className="text-sm text-red-500">{errors.arrival_city_id.message}</span>
        ) : null}
      </div>
    </div>
  );
};

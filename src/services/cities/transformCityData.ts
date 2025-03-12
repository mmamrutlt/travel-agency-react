import { z } from 'zod';

import type { BackendFlight } from '../flights/types';
import type { City } from './types';

export interface BackendCity {
  id: number;
  name: string;
  arrivalFlights: BackendFlight[];
  departureFlights: BackendFlight[];
}

export const citySchema = z.object({
  id: z.number(),
  name: z.string(),
  arrivalFlights: z.array(z.any()),
  departureFlights: z.array(z.any()),
});

export type CityResponse = z.infer<typeof citySchema>;

export const transformCityData = (city: CityResponse): City => {
  return {
    id: String(city.id),
    name: city.name,
    incoming_flights: city.arrivalFlights.length,
    outgoing_flights: city.departureFlights.length,
  };
};

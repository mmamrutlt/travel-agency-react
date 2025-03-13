import { z } from 'zod';

import type { Airline } from './types';

export const airlineSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  flights: z.array(z.any()),
});

export type AirlineResponse = z.infer<typeof airlineSchema>;

export const transformAirlineData = (airline: AirlineResponse): Airline => {
  return {
    id: String(airline.id),
    name: airline.name,
    description: airline.description,
    flights_count: airline.flights.length,
  };
};

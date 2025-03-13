import type { Airline } from '../airlines/types';
import type { City } from '../cities/types';

export interface Flight {
  id: number;
  departure_date: string;
  arrival_date: string;
  departureCity: City;
  arrivalCity: City;
  airline: Airline;
}

import { privateApi } from '@/config/api';
import type { BackendFlight } from '../flights/types';
import type { RequestParams, ServiceResponse } from '../types';
import type { Flight } from './types';

const transformFlightData = (flight: BackendFlight): Flight => {
  return {
    id: String(flight.id),
    departure_date: flight.departure_date,
    arrival_date: flight.arrival_date,
    departure_city_id: String(flight.departure_city_id),
    arrival_city_id: String(flight.arrival_city_id),
    airline_id: String(flight.airline_id),
  };
};

export const getFlightsList = async ({
  page,
  pageSize,
  searchText,
}: RequestParams): Promise<ServiceResponse<Flight[]>> => {
  const response = await privateApi.get<ServiceResponse<BackendFlight[]>>('flights', {
    params: { page, pageSize, searchText },
  });

  return {
    ...response.data,
    data: response.data.data.map(transformFlightData),
  };
};

export const getFlightDetail = async (flightId: string) => {
  return privateApi.get<ServiceResponse<Flight>>(`flights/${flightId}`);
};

export const createFlight = async (data: {
  departure_date: string;
  arrival_date: string;
  departure_city_id: string;
  arrival_city_id: string;
  airline_id: string;
}): Promise<ServiceResponse<Flight>> => {
  const response = await privateApi.post<ServiceResponse<Flight>>('flights', data);
  return response.data;
};

export const deleteFlight = async (flightId: string): Promise<ServiceResponse<void>> => {
  const response = await privateApi.delete<ServiceResponse<void>>(`flights/${flightId}`);
  return response.data;
};

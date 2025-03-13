import { privateApi } from '@/config/api';
import type { RequestParams, ServiceResponse } from '../types';
import type { Flight } from './types';

export const getFlightsList = async ({
  page,
  pageSize,
  searchText,
}: RequestParams): Promise<ServiceResponse<Flight[]>> => {
  const response = await privateApi.get<ServiceResponse<Flight[]>>('flights', {
    params: { page, pageSize, searchText },
  });

  return response.data;
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

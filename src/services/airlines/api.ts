import { privateApi } from '@/config/api';
import type { BackendFlight } from '../flights/types';
import type { RequestParams, ServiceResponse } from '../types';
import type { Airline } from './types';

interface BackendAirline {
  id: number;
  name: string;
  description: string;
  flights: BackendFlight[];
}

const transformAirlineData = (airline: BackendAirline): Airline => {
  return {
    id: String(airline.id),
    name: airline.name,
    description: airline.description,
    flights_count: airline.flights.length,
  };
};

export const getAirlinesList = async ({
  page,
  pageSize,
  searchText,
}: RequestParams): Promise<ServiceResponse<Airline[]>> => {
  const response = await privateApi.get<ServiceResponse<BackendAirline[]>>('airlines', {
    params: { page, pageSize, searchText },
  });

  return {
    ...response.data,
    data: response.data.data.map(transformAirlineData),
  };
};

export const getAirlineDetail = async (airlineId: string) => {
  return privateApi.get<ServiceResponse<Airline>>(`airlines/${airlineId}`);
};

export const createAirline = async (data: {
  name: string;
  description: string;
}): Promise<ServiceResponse<Airline>> => {
  const response = await privateApi.post<ServiceResponse<Airline>>('airlines', data);
  return response.data;
};

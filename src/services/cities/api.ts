import { privateApi } from '@/config/api';
import type { BackendFlight } from '../flights/types';
import type { RequestParams, ServiceResponse } from '../types';
import type { City } from './types';

interface BackendCity {
  id: number;
  name: string;
  arrivalFlights: BackendFlight[];
  departureFlights: BackendFlight[];
}

const transformCityData = (city: BackendCity): City => {
  return {
    id: String(city.id),
    name: city.name,
    incoming_flights: city.arrivalFlights.length,
    outgoing_flights: city.departureFlights.length,
  };
};

export const getCitiesList = async ({
  page,
  pageSize,
  searchText,
}: RequestParams): Promise<ServiceResponse<City[]>> => {
  const response = await privateApi.get<ServiceResponse<BackendCity[]>>('cities', {
    params: { page, pageSize, searchText },
  });

  return {
    ...response.data,
    data: response.data.data.map(transformCityData),
  };
};

export const getCityDetail = async (cityId: string) => {
  return privateApi.get<ServiceResponse<City>>(`cities/${cityId}`);
};

export const createCity = async (data: { name: string }): Promise<ServiceResponse<City>> => {
  const response = await privateApi.post<ServiceResponse<City>>('cities', data);
  return response.data;
};

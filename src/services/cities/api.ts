import { privateApi } from '@/config/api';
import type { RequestParams, ServiceResponse } from '../types';
import { type CityResponse, citySchema, transformCityData } from './transformCityData';
import type { City } from './types';

export const getCitiesList = async ({
  page,
  pageSize,
  searchText,
}: RequestParams): Promise<ServiceResponse<City[]>> => {
  const response = await privateApi.get<ServiceResponse<CityResponse[]>>('cities', {
    params: { page, pageSize, searchText },
  });

  const validatedData = response.data.data.map((city) => {
    return citySchema.parse(city);
  });

  return {
    ...response.data,
    data: validatedData.map(transformCityData),
  };
};

export const getCityDetail = async (cityId: string) => {
  return privateApi.get<ServiceResponse<City>>(`cities/${cityId}`);
};

export const createCity = async (data: { name: string }): Promise<ServiceResponse<City>> => {
  const response = await privateApi.post<ServiceResponse<City>>('cities', data);
  return response.data;
};

import { privateApi } from '@/config/api';
import type { RequestParams, ServiceResponse } from '../types';
import type { City } from './types';

export const getCitiesList = async ({
  page,
  pageSize,
  searchText,
}: RequestParams): Promise<ServiceResponse<City[]>> => {
  const response = await privateApi.get<ServiceResponse<City[]>>('cities', {
    params: { page, pageSize, searchText },
  });
  return response.data;
};

export const getCityDetail = async (cityId: string) => {
  return privateApi.get<ServiceResponse<City>>(`cities/${cityId}`);
};

export const createCity = async (data: { name: string }): Promise<ServiceResponse<City>> => {
  const response = await privateApi.post<ServiceResponse<City>>('cities', data);
  return response.data;
};

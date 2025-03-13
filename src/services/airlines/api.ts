import { privateApi } from '@/config/api';
import type { RequestParams, ServiceResponse } from '../types';
import { type AirlineResponse, transformAirlineData } from './transformAirlineData';
import type { Airline } from './types';

export const getAirlinesList = async ({
  page,
  pageSize,
  searchText,
}: RequestParams): Promise<ServiceResponse<Airline[]>> => {
  const response = await privateApi.get<ServiceResponse<AirlineResponse[]>>('airlines', {
    params: { page, pageSize, searchText },
  });

  return {
    ...response.data,
    data: response.data.data.map(transformAirlineData),
  };
};

export const getDropdownAirlinesList = async (): Promise<ServiceResponse<Airline[]>> => {
  const response = await privateApi.get<ServiceResponse<AirlineResponse[]>>('airlines/dropdown');
  return {
    ...response.data,
    data: response.data.data.map((airline) => {
      return {
        ...airline,
        id: String(airline.id),
      };
    }),
  };
};

export const getAirlineDetail = async (airlineId: string) => {
  return privateApi.get<ServiceResponse<Airline>>(`airlines/${airlineId}`);
};

export const createAirline = async (data: {
  name: string;
  description: string;
}): Promise<ServiceResponse<Airline>> => {
  try {
    const response = await privateApi.post<ServiceResponse<Airline>>('airlines', data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('422')) {
      throw new Error('The name has already been taken.');
    }
    throw error;
  }
};

export const deleteAirline = async (airlineId: string): Promise<ServiceResponse<void>> => {
  const response = await privateApi.delete<ServiceResponse<void>>(`airlines/${airlineId}`);
  return response.data;
};

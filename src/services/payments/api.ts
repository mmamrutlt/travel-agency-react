import { privateApi } from '@/config/api';
import type { RequestParams, ServiceResponse } from '../types';
import type { CreatePaymentResponse, Payment } from './types';

export const getPaymentsDetail = async (paymentId: string) => {
  return privateApi.get<ServiceResponse<Payment[]>>(`payments/${paymentId}`);
};

export const getPaymentsList = async (
  params: RequestParams,
): Promise<ServiceResponse<Payment[]>> => {
  const MOCK_DATA: Payment[] = [
    // cspell:disable
    { id: '1', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '2', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '3', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '4', amount: 874, status: 'success', email: 'Silas22@example.com' },
    { id: '5', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '6', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '7', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '8', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '9', amount: 874, status: 'success', email: 'Silas22@example.com' },
    { id: '10', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '11', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '12', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '13', amount: 874, status: 'success', email: 'Silas22@example.com' },
    { id: '14', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '15', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '16', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '17', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '18', amount: 874, status: 'success', email: 'Silas22@example.com' },
    { id: '19', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '20', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '21', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '22', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '23', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '24', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '25', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '26', amount: 874, status: 'success', email: 'Silas22@example.com' },
    { id: '27', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '28', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '29', amount: 874, status: 'success', email: 'Silas22@example.com' },
    { id: '30', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '31', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '32', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '33', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '34', amount: 874, status: 'success', email: 'Silas22@example.com' },
    { id: '35', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '36', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '37', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '38', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '39', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '40', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '41', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '42', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '43', amount: 874, status: 'success', email: 'Silas22@example.com' },
    { id: '44', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '45', amount: 874, status: 'success', email: 'Silas22@example.com' },
    { id: '46', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '47', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '48', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '49', amount: 874, status: 'success', email: 'Silas22@example.com' },
    { id: '50', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '51', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '52', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '53', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '54', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '55', amount: 316, status: 'success', email: 'ken99@example.com' },
    { id: '56', amount: 242, status: 'success', email: 'Abe45@example.com' },
    { id: '57', amount: 837, status: 'processing', email: 'Monserrat44@example.com' },
    { id: '58', amount: 874, status: 'success', email: 'Silas22@example.com' },
    { id: '59', amount: 721, status: 'failed', email: 'carmella@example.com' },
    { id: '60', amount: 316, status: 'success', email: 'ken99@example.com' },
    // cspell:enable
  ];

  if (params.pageSize) {
    const startIndex = ((params.page ?? 1) - 1) * params.pageSize;

    const data = MOCK_DATA.slice(startIndex, startIndex + params.pageSize);

    return Promise.resolve({
      data,
      pagination: {
        total: MOCK_DATA.length,
        currentPage: params.page ?? 1,
        totalPages: Math.ceil(MOCK_DATA.length / params.pageSize),
        perPage: params.pageSize,
        links: { next: '', previous: '' },
        count: data.length,
      },
      status: 200,
      success: true,
    });
  }

  return Promise.resolve({ data: MOCK_DATA, status: 200, success: true });

  // return privateApi.get<ServiceResponse<Payment[]>>('payments', { params });
};

export const createPayment = async (payment: Payment) => {
  return privateApi.post<ServiceResponse<CreatePaymentResponse>>('payments', payment);
};

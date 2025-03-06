import { privateApi } from '@/config/api';
import type { RequestParams, ServiceResponse } from '../types';
import type { CreatePaymentResponse, Payment } from './types';

export const getPaymentsDetail = async (paymentId: string) => {
  return privateApi.get<ServiceResponse<Payment[]>>(`payments/${paymentId}`);
};

export const getPaymentsList = async ({
  page,
  pageSize,
  searchText,
}: RequestParams): Promise<ServiceResponse<Payment[]>> => {
  const sleep = (ms: number) => {
    return new Promise((resolve) => {
      return setTimeout(resolve, ms);
    });
  };

  await sleep(500);

  const MOCK_DATA: Payment[] = [
    // cspell:disable
    { id: '1', amount: 923, status: 'success', email: 'brian24@filterme.com' },
    { id: '2', amount: 430, status: 'processing', email: 'michael62@filterme.com' },
    { id: '3', amount: 312, status: 'failed', email: 'ashley19@filterme.com' },
    { id: '4', amount: 751, status: 'success', email: 'robert55@filterme.com' },
    { id: '5', amount: 880, status: 'processing', email: 'jessica47@filterme.com' },
    { id: '6', amount: 203, status: 'failed', email: 'david77@filterme.com' },
    { id: '7', amount: 670, status: 'success', email: 'jason36@filterme.com' },
    { id: '8', amount: 409, status: 'processing', email: 'lisa52@filterme.com' },
    { id: '9', amount: 587, status: 'failed', email: 'mark89@filterme.com' },
    { id: '10', amount: 320, status: 'success', email: 'susan61@filterme.com' },
    { id: '11', amount: 900, status: 'processing', email: 'daniel33@filterme.com' },
    { id: '12', amount: 500, status: 'failed', email: 'steven82@filterme.com' },
    { id: '13', amount: 411, status: 'success', email: 'karen45@filterme.com' },
    { id: '14', amount: 780, status: 'processing', email: 'charles74@filterme.com' },
    { id: '15', amount: 230, status: 'failed', email: 'nancy59@filterme.com' },
    { id: '16', amount: 545, status: 'success', email: 'patrick91@filterme.com' },
    { id: '17', amount: 810, status: 'processing', email: 'julia48@filterme.com' },
    { id: '18', amount: 299, status: 'failed', email: 'matthew63@filterme.com' },
    { id: '19', amount: 650, status: 'success', email: 'victor39@filterme.com' },
    { id: '20', amount: 378, status: 'processing', email: 'elizabeth84@filterme.com' },
    { id: '21', amount: 712, status: 'failed', email: 'frank66@filterme.com' },
    { id: '22', amount: 405, status: 'success', email: 'deborah78@filterme.com' },
    { id: '23', amount: 822, status: 'processing', email: 'george57@filterme.com' },
    { id: '24', amount: 150, status: 'failed', email: 'kevin29@filterme.com' },
    { id: '25', amount: 603, status: 'success', email: 'paul92@filterme.com' },
    { id: '26', amount: 950, status: 'processing', email: 'kimberly71@filterme.com' },
    { id: '27', amount: 287, status: 'failed', email: 'ryan68@filterme.com' },
    { id: '28', amount: 430, status: 'success', email: 'gregory40@filterme.com' },
    { id: '29', amount: 789, status: 'processing', email: 'sharon85@filterme.com' },
    { id: '30', amount: 520, status: 'failed', email: 'andrew60@filterme.com' },
    { id: '31', amount: 345, status: 'success', email: 'peter93@filterme.com' },
    { id: '32', amount: 701, status: 'processing', email: 'michelle58@filterme.com' },
    { id: '33', amount: 670, status: 'failed', email: 'brandon86@filterme.com' },
    { id: '34', amount: 234, status: 'success', email: 'linda80@filterme.com' },
    { id: '35', amount: 889, status: 'processing', email: 'timothy37@filterme.com' },
    { id: '36', amount: 260, status: 'failed', email: 'dennis50@filterme.com' },
    { id: '37', amount: 604, status: 'success', email: 'rebecca75@filterme.com' },
    { id: '38', amount: 918, status: 'processing', email: 'larry83@filterme.com' },
    { id: '39', amount: 325, status: 'failed', email: 'nicholas42@filterme.com' },
    { id: '40', amount: 410, status: 'success', email: 'helen76@filterme.com' },
    { id: '41', amount: 785, status: 'processing', email: 'adam64@filterme.com' },
    { id: '42', amount: 543, status: 'failed', email: 'ronald46@filterme.com' },
    { id: '43', amount: 678, status: 'success', email: 'cynthia87@filterme.com' },
    { id: '44', amount: 800, status: 'processing', email: 'barbara41@filterme.com' },
    { id: '45', amount: 370, status: 'failed', email: 'edward56@filterme.com' },
    { id: '46', amount: 495, status: 'success', email: 'terry98@filterme.com' },
    { id: '47', amount: 745, status: 'processing', email: 'benjamin90@filterme.com' },
    { id: '48', amount: 312, status: 'failed', email: 'betty67@filterme.com' },
    { id: '49', amount: 549, status: 'success', email: 'donald70@filterme.com' },
    { id: '50', amount: 876, status: 'processing', email: 'stephanie51@filterme.com' },
    { id: '51', amount: 421, status: 'failed', email: 'gerald65@filterme.com' },
    { id: '52', amount: 620, status: 'success', email: 'rachel88@filterme.com' },
    { id: '53', amount: 940, status: 'processing', email: 'anthony30@filterme.com' },
    { id: '54', amount: 289, status: 'failed', email: 'angela79@filterme.com' },
    { id: '55', amount: 670, status: 'success', email: 'justin43@filterme.com' },
    { id: '56', amount: 800, status: 'processing', email: 'anna97@filterme.com' },
    { id: '57', amount: 367, status: 'failed', email: 'christopher32@filterme.com' },
    { id: '58', amount: 570, status: 'success', email: 'kathleen99@filterme.com' },
    { id: '59', amount: 830, status: 'processing', email: 'jeffrey35@filterme.com' },
    { id: '60', amount: 478, status: 'failed', email: 'jacob28@filterme.com' },
    // cspell:enable
  ];

  let data = MOCK_DATA;

  if (searchText) {
    data = MOCK_DATA.filter(({ email }) => {
      return email.toLowerCase().includes((searchText ?? '').toLowerCase());
    });
  }

  if (pageSize) {
    const startIndex = ((page ?? 1) - 1) * pageSize;

    const slicedData = data.slice(startIndex, startIndex + pageSize);

    return Promise.resolve({
      data: slicedData,
      pagination: {
        total: data.length,
        currentPage: page ?? 1,
        totalPages: Math.ceil(data.length / pageSize),
        perPage: pageSize,
        links: { next: '', previous: '' },
        count: slicedData.length,
      },
      status: 200,
      success: true,
    });
  }

  return Promise.resolve({ data, status: 200, success: true });

  // TODO: return privateApi.get<ServiceResponse<Payment[]>>('payments', { params });
};

export const createPayment = async (payment: Payment) => {
  return privateApi.post<ServiceResponse<CreatePaymentResponse>>('payments', payment);
};

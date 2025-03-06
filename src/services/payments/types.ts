type Status = 'pending' | 'processing' | 'success' | 'failed';

export interface Payment {
  id: string;
  amount: number;
  status: Status;
  email: string;
}

export interface CreatePaymentResponse {
  payment: Payment;
}

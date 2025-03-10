export interface City {
  id: string;
  name: string;
  incoming_flights: number;
  outgoing_flights: number;
}

export interface ServiceResponse<T> {
  data: T;
  status: number;
  success: boolean;
  pagination?: {
    total: number;
    currentPage: number;
    totalPages: number;
    perPage: number;
    links: {
      next: string;
      previous: string;
    };
    count: number;
  };
}

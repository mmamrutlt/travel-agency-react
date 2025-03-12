export interface BackendFlight {
  id: number;
  departure_date: string;
  arrival_date: string;
  departure_city_id: number;
  arrival_city_id: number;
  airline_id: number;
}

export interface Flight {
  id: string;
  departure_date: string;
  arrival_date: string;
  departure_city_id: string;
  arrival_city_id: string;
  airline_id: string;
}

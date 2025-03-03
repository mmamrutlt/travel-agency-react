export interface LoginResponse {
  authToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// API response types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
}

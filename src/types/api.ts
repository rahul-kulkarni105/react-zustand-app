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

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  createdAt: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

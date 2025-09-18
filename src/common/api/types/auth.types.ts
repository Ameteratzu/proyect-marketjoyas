// src/common/api/types/auth.types.ts

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  fullName: string;
  documentType: string;
  phone: string;
  password: string;
};

export type User = {
  access_token: string;
  user: {
    sub: number;
    email: string;
    rol: string;
    fullName: string;
  };
};

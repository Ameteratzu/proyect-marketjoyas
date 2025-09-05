// src/features/Login/types.ts
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
  id: string;
  email: string;
  fullName: string;
  token: string; // JWT o similar
};

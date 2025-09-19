export type UiUser = {
  fullName: string;
  email: string;
  phone: string;
  documentType: string;
  documentNumber: string;
  ordersCount: number;
  initials: string;
};

export type Address = {
  id: string;
  label: string;
  streetName: string;
  streetNumber: string;
  district: string;
  province: string;
  department: string;
  reference?: string;
  phone?: string;
  isPrimary?: boolean;
};
// src/pages/Admin/pages/Certificates/modal/useCertificateForm.ts
import { useState } from "react";

export type CertificateFormValues = {
  storeName: string;
  address: string;
  product: string;
  client: string;
  doc: string;
  gemstone: string; // id de la gema (string para el <select>)
  material: string; // id del material (string para el <select>)
  country: string;
  price: string; // precio como string en el form, lo convertimos al enviar
  description: string;
  image: File | null;
};

export const EMPTY_CERTIFICATE_FORM: CertificateFormValues = {
  storeName: "",
  address: "",
  product: "",
  client: "",
  doc: "",
  gemstone: "",
  material: "",
  country: "Perú", // valor por defecto para cumplir contrato
  price: "",
  description: "",
  image: null,
};

export function useCertificateForm(initial?: Partial<CertificateFormValues>) {
  const [values, setValues] = useState<CertificateFormValues>({
    ...EMPTY_CERTIFICATE_FORM,
    ...initial,
  });

  const onChange =
    <K extends keyof CertificateFormValues>(key: K) =>
    (v: CertificateFormValues[K]) =>
      setValues((s) => ({ ...s, [key]: v }));

  const onInput =
    <K extends keyof CertificateFormValues>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setValues((s) => ({ ...s, [key]: e.target.value as any }));

  return { values, onChange, onInput, setValues };
}

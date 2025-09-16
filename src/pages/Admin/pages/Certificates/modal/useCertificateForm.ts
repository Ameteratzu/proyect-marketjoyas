import { useState } from "react";

export type CertificateFormValues = {
  storeName: string;
  address: string;
  product: string;
  client: string;
  doc: string;
  gemstone: string; // Piedra preciosa
  weight: string; // Peso (p. ej. 10 gr)
  material: string;
  country: string;
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
  weight: "",
  material: "",
  country: "",
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

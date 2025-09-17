import ModalBase from "./ModalBase";
import ImageDropzone from "./ImageDropzone";
import { useEffect, useRef, useState } from "react";
import { useCertificateForm } from "./useCertificateForm";
import { EMPTY_CERTIFICATE_FORM } from "./useCertificateForm";
import type { CertificateFormValues } from "./useCertificateForm";
import { cn } from "@/lib/cn";
import React from "react";
import {
  fetchGems,
  fetchMaterials,
  type OptionItem,
} from "../api/certificates.api";

type Props = {
  open: boolean;
  onClose: () => void;
  // onSubmit debe resolver a true/false para saber si cerramos el modal
  onSubmit?: (values: CertificateFormValues) => Promise<boolean> | boolean;
  mode?: "create" | "edit";
  className?: string;
};

// ====== LÍMITES DE UI ======
const MAX_DESC = 70;

export default function CreateEditCertificateModal({
  open,
  onClose,
  onSubmit,
  mode = "create",
  className,
}: Props) {
  const { values, onChange, onInput, setValues } = useCertificateForm();
  const [materials, setMaterials] = useState<OptionItem[]>([]);
  const [gems, setGems] = useState<OptionItem[]>([]);
  const [loadingOpts, setLoadingOpts] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const firstRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && mode === "create") {
      setValues(EMPTY_CERTIFICATE_FORM);
  // limpiar banners al abrir
  setSubmitError(null);
  setSubmitting(false);
      setTimeout(() => firstRef.current?.focus(), 40);
    }
  }, [open, mode, setValues]);

  // Cargar opciones cuando se abre
  useEffect(() => {
    let cancelled = false;
    if (!open) return;
    setLoadingOpts(true);
    Promise.all([fetchMaterials(), fetchGems()])
      .then(([m, g]) => {
        if (cancelled) return;
        setMaterials(m);
        setGems(g);
      })
      .catch(() => {
        if (cancelled) return;
        // Silencioso; podríamos mostrar un aviso si falla
      })
      .finally(() => {
        if (!cancelled) setLoadingOpts(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const title =
    mode === "create" ? "Crear Nuevo Certificado" : "Editar Certificado";

  // Cerrar modal limpiando mensajes/estado
  const handleClose = () => {
    setSubmitError(null);
    setSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    

    // Normalizar campos
    const desc = (values.description || "").trim();

    // Validación simple en cliente para evitar 400/500 innecesarios
    const missing: string[] = [];
    if (!values.storeName?.trim()) missing.push("Nombre de la tienda");
    if (!values.address?.trim()) missing.push("Dirección");
    if (!values.product?.trim()) missing.push("Nombre del Producto");
    if (!values.client?.trim()) missing.push("Nombre del Cliente");
    if (!values.doc?.trim()) missing.push("DNI/RUC del cliente");
    if (!values.country?.trim()) missing.push("País");

    const gemId = Number(values.gemstone);
    const matId = Number(values.material);
    if (Number.isNaN(gemId) || gemId <= 0) missing.push("Piedra Preciosa");
    if (Number.isNaN(matId) || matId <= 0) missing.push("Material");

    // Límite de descripción
    if (desc.length > MAX_DESC) {
      setSubmitError(
        `La descripción es demasiado larga (máximo ${MAX_DESC} caracteres). Actualmente: ${desc.length}.`
      );
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (missing.length) {
      setSubmitError(
        `Faltan campos requeridos: ${missing.join(
          ", "
        )}. Selecciona opciones válidas en Material y Piedra Preciosa.`
      );
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await (onSubmit?.({ ...values, description: desc }) ?? false);
      if (res) {
  // Éxito: el padre cierra el modal y muestra toast.
      } else {
        setSubmitError("No se registró correctamente");
        scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err: any) {
      // Mensaje legible para 500 por longitudes
      const serverMsg =
        err?.response?.data?.message ||
        err?.message ||
        "No se registró correctamente";
      let human = String(serverMsg);
      if (human.toLowerCase().includes("internal server error")) {
        human = `Error del servidor. Si estabas enviando una descripción muy larga, intenta con menos de ${MAX_DESC} caracteres.`;
      }
      setSubmitError(human);
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
    setSubmitting(false);
  };

  return (
    <ModalBase
      open={open}
  onClose={handleClose}
      title={title}
      className={cn("max-w-5xl", className)}
    >
      <div className="flex flex-col max-h-[90vh]">
        <header className="flex items-center justify-between border-b border-black/10 px-5 py-4 shrink-0">
          <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
          <button
            aria-label="Cerrar"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-neutral/50 cursor-pointer"
            onClick={handleClose}
            type="button"
          >
            <span className="i-[heroicons-outline:x-mark] w-5 h-5" />
          </button>
        {submitError && (
          <div className="p-3 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm">
            {submitError}
          </div>
        )}
        </header>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-5 py-5 space-y-8 scrollbar-thin scrollbar-thumb-neutral/40 scrollbar-track-transparent"
          >
            <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
              <div className="space-y-5">
                <Field label="Nombre de la tienda">
                  <Input
                    ref={firstRef}
                    value={values.storeName}
                    onChange={onInput("storeName")}
                    placeholder="Ingrese nombre de la tienda"
                  />
                </Field>
                <Field label="Nombre del Producto">
                  <Input
                    value={values.product}
                    onChange={onInput("product")}
                    placeholder="Ingresar nombre del producto"
                  />
                </Field>
                <Field label="DNI/RUC del cliente">
                  <Input
                    value={values.doc}
                    onChange={onInput("doc")}
                    placeholder="Documento"
                  />
                </Field>
                <Field label="Material">
                  <Select
                    value={values.material}
                    onChange={onInput("material")}
                    placeholder={
                      loadingOpts
                        ? "Cargando materiales..."
                        : "--- Seleccionar material ---"
                    }
                    disabled={loadingOpts}
                  >
                    {materials.map((m) => (
                      <option key={m.id} value={String(m.id)}>
                        {m.nombre}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="País">
                  <Select
                    value={values.country}
                    onChange={onInput("country")}
                    placeholder="--- Seleccionar país ---"
                  >
                    <option>Perú</option>
                    <option>Chile</option>
                    <option>Colombia</option>
                    <option>México</option>
                  </Select>
                </Field>
              </div>
              <div className="space-y-5">
                <Field label="Dirección">
                  <Input
                    value={values.address}
                    onChange={onInput("address")}
                    placeholder="Ingrese una dirección"
                  />
                </Field>
                <Field label="Nombre del Cliente">
                  <Input
                    value={values.client}
                    onChange={onInput("client")}
                    placeholder="Ingresar nombre completo"
                  />
                </Field>
                <Field label="Piedra Preciosa">
                  <Select
                    value={values.gemstone}
                    onChange={onInput("gemstone")}
                    placeholder={
                      loadingOpts
                        ? "Cargando gemas..."
                        : "--- Seleccionar gema ---"
                    }
                    disabled={loadingOpts}
                  >
                    {gems.map((g) => (
                      <option key={g.id} value={String(g.id)}>
                        {g.nombre}
                      </option>
                    ))}
                  </Select>
                </Field>

                {/* Precio: si lo usas en tu form, mantenlo aquí */}
                <Field label="Precio">
                  <Input
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    value={values.price}
                    onChange={onInput("price")}
                    placeholder="Ej. 1399.00"
                    className="pr-12"
                  />
                </Field>

                <Field label="Descripcion">
                  <div className="space-y-1">
                    <Textarea
                      value={values.description}
                      onChange={onInput("description")}
                      placeholder="Agregar una descripcion corta del producto"
                      rows={3}
                      maxLength={MAX_DESC}
                    />
                    <div className="text-right text-xs text-graphite/60">
                      {(values.description || "").length}/{MAX_DESC}
                    </div>
                  </div>
                </Field>
              </div>
            </div>
            <div>
              <Label>Imagen del producto</Label>
              <ImageDropzone
                value={values.image}
                onChange={onChange("image")}
              />
            </div>
          </div>
          <footer className="shrink-0 border-t border-black/10 bg-white px-5 py-4 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "inline-flex h-11 items-center rounded-full btn-ghost px-8 text-sm font-medium transition-colors"
              )}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={cn(
                "inline-flex h-11 items-center rounded-full btn-primary px-8 text-sm font-medium transition-colors",
                submitting && "opacity-70 cursor-not-allowed"
              )}
            >
              {submitting
                ? mode === "create"
                  ? "Creando..."
                  : "Guardando..."
                : mode === "create"
                ? "Crear Certificado"
                : "Guardar cambios"}
            </button>
          </footer>
        </form>
      </div>
    </ModalBase>
  );
}

// -------------------- UI Subcomponents --------------------

const baseField =
  "w-full h-11 rounded-md border border-black/15 bg-neutral/20 px-3 text-sm placeholder:text-graphite/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition shadow-inner";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-graphite/80 tracking-tight">
      {children}
    </label>
  );
}

type BasicProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};
const Input = React.forwardRef<HTMLInputElement, BasicProps>(function Input(
  { className, ...rest },
  ref
) {
  return <input ref={ref} className={cn(baseField, className)} {...rest} />;
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder?: string;
};
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, placeholder, children, value, ...rest },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn(baseField, "appearance-none pr-8")}
      value={value}
      {...rest}
    >
      {placeholder && !value && <option value="">{placeholder}</option>}
      {children}
    </select>
  );
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, rows = 2, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(baseField, "min-h-[44px] resize-none py-2")}
        {...rest}
      />
    );
  }
);

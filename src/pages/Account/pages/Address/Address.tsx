import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Address as AddressType } from "../../types";
import EmptyState from "./components/EmptyState";
import AddressCard from "./components/AddressCard";
import AddressForm from "./components/AddressForm";
import { LuPlus } from "react-icons/lu";

function makeMock(): AddressType[] {
  return [
    {
      id: "addr_1",
      label: "Dirección principal",
      streetName: "Av. Samuel Alcázar",
      streetNumber: "1509-3",
      district: "Rímac",
      province: "Lima",
      department: "Lima",
      reference: "",
      phone: "+51 997 999 999",
      isPrimary: true,
    },
  ];
}

export default function Address() {
  const { t } = useTranslation("account");

  // Diseño primero: mock en memoria. Luego se reemplaza por fetch real.
  const initial = useMemo(() => makeMock(), []);
  const [addresses, setAddresses] = useState<AddressType[]>(initial);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editing, setEditing] = useState<AddressType | null>(null);

  function onCreateClick() {
    setEditing(null);
    setShowForm(true);
    // scroll al form tras abrir
    setTimeout(() => {
      const el = document.getElementById("address-form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function onCancel() {
    setEditing(null);
    setShowForm(false);
    // scroll al tope de la sección tras cerrar el formulario
    setTimeout(() => {
      const top = document.getElementById("address-top");
      if (top) top.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  // Diseño: insert/update local sin API
  function onSubmit(a: AddressType) {
    if (editing) {
      setAddresses((prev) => prev.map((x) => (x.id === a.id ? a : x)));
    } else {
      setAddresses((prev) => [{ ...a, id: crypto.randomUUID() }, ...prev]);
    }
    setEditing(null);
    setShowForm(false);
  }

  function onEdit(a: AddressType) {
    setEditing(a);
    setShowForm(true);
    // scroll al form
    setTimeout(() => {
      const el = document.getElementById("address-form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function onDelete(a: AddressType) {
    // Diseño: confirm nativo
    if (window.confirm(t("address.confirmDelete") as string)) {
      setAddresses((prev) => prev.filter((x) => x.id !== a.id));
    }
  }

  const isEmpty = addresses.length === 0;

  return (
    <div className="p-6 md:p-8 space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="address-top" className="text-lg font-semibold text-neutral-900 scroll-mt-24 md:scroll-mt-28">
            {t("address.sectionTitle")}
          </h2>

          {/* Botón “Agregar dirección” en header de la sección */}
          {!isEmpty && (
            <button
              type="button"
              onClick={onCreateClick}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
            >
              <LuPlus className="text-lg" />
              <span>{t("address.addBtn")}</span>
            </button>
          )}
        </div>

        {/* Estado vacío */}
        {isEmpty && (
          <EmptyState onClick={onCreateClick} ctaLabel={t("address.addBtn")} />
        )}

        {/* Lista de direcciones */}
        {!isEmpty && (
          <div className="grid gap-4">
            {addresses.map(function (a) {
              return (
                <AddressCard
                  key={a.id}
                  address={a}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Formulario de alta/edición */}
    {(showForm || editing) && (
        <section
          id="address-form"
      className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm scroll-mt-24 md:scroll-mt-28"
        >
          <h3 className="text-base font-semibold text-neutral-900">
            {editing
              ? t("address.form.editTitle")
              : t("address.form.createTitle")}
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            {t("address.form.requiredHelp")}
          </p>

          <div className="mt-5">
            <AddressForm
              initialValue={editing ?? undefined}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
          </div>
        </section>
      )}
    </div>
  );
}

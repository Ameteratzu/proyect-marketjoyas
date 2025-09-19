import { useEffect, useMemo, useState } from "react";
import type { Address } from "../../../types";
import {
  getDepartmentsLabeled,
  getProvincesLabeled,
  getDistrictsLabeled,
} from "../../../../../common/utils/ubigeo";
import type { Labeled } from "../../../../../common/utils/ubigeo";


type Props = {
  initialValue?: Address;
  onSubmit: (a: Address) => void;
  onCancel: () => void;
};

function empty(): Address {
  return {
    id: "",
    label: "Dirección",
    streetName: "",
    streetNumber: "",
    district: "",
    province: "",
    department: "",
    reference: "",
    phone: "",
    isPrimary: false,
  };
}

export default function AddressForm(props: Props) {
  const [value, setValue] = useState<Address>(props.initialValue ?? empty());

  // Estados locales de CÓDIGOS (solo UI/metadata)
  const [depCode, setDepCode] = useState<string>("");
  const [provCode, setProvCode] = useState<string>("");
  const [distCode, setDistCode] = useState<string>("");

  // Si viene initialValue con nombres, intentamos resolver códigos al montar (best-effort)
  useEffect(() => {
    if (props.initialValue) {
      setValue(props.initialValue);
    }
  }, [props.initialValue]);

  const departamentos = useMemo<Labeled[]>(() => getDepartmentsLabeled(), []);
  const provincias = useMemo<Labeled[]>(
    () => getProvincesLabeled(depCode),
    [depCode]
  );
  const distritos = useMemo<Labeled[]>(
    () => getDistrictsLabeled(provCode),
    [provCode]
  );

  function update<K extends keyof Address>(key: K, v: Address[K]) {
    setValue((prev) => ({ ...prev, [key]: v }));
  }

  // Handlers de selects usando value = code, label = name:
  function onChangeDepartment(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value;
    setDepCode(code);
    setProvCode("");
    setDistCode("");

    const matches = departamentos.find((d) => d.code === code);
    update("department", matches?.name ?? "");
    update("province", "");
    update("district", "");
  }

  function onChangeProvince(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value;
    setProvCode(code);
    setDistCode("");

    const matches = provincias.find((p) => p.code === code);
    update("province", matches?.name ?? "");
    update("district", "");
  }

  function onChangeDistrict(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value;
    setDistCode(code);

    const matches = distritos.find((d) => d.code === code);
    update("district", matches?.name ?? "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // value ya tiene NOMBRES (department/province/district) → listo para backend
    // Si quieres conservar los códigos, podrías añadirlos en un campo paralelo (no enviado) o anexarlos:
    // const ubigeoCodes = { depCode, provCode, distCode };

    const payload = { ...value };
    if (!payload.id) payload.id = crypto.randomUUID();

    // ejemplo: si más adelante el backend pidiera también el ubigeo de 6 dígitos:
    // const dist = distCode || (provCode && distritos[0]?.code) || "";
    // payload.ubigeo = dist;

    props.onSubmit(payload);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Departamento */}
      <div>
        <label className="block text-sm text-neutral-600 mb-1">
          Departamento
        </label>
        <select
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white"
          value={depCode}
          onChange={onChangeDepartment}
          required
        >
          <option value="">Seleccione</option>
          {departamentos.map((dep) => (
            <option key={dep.code} value={dep.code}>
              {dep.name}
            </option>
          ))}
        </select>
      </div>

      {/* Provincia */}
      <div>
        <label className="block text-sm text-neutral-600 mb-1">Provincia</label>
        <select
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white"
          value={provCode}
          onChange={onChangeProvince}
          required
          disabled={!depCode}
        >
          <option value="">Seleccione</option>
          {provincias.map((prov) => (
            <option key={prov.code} value={prov.code}>
              {prov.name}
            </option>
          ))}
        </select>
      </div>

      {/* Distrito */}
      <div>
        <label className="block text-sm text-neutral-600 mb-1">Distrito</label>
        <select
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white"
          value={distCode}
          onChange={onChangeDistrict}
          required
          disabled={!provCode}
        >
          <option value="">Seleccione</option>
          {distritos.map((dis) => (
            <option key={dis.code} value={dis.code}>
              {dis.name}
            </option>
          ))}
        </select>
      </div>

      {/* Nombre de la calle */}
      <div>
        <label className="block text-sm text-neutral-600 mb-1">
          Nombre de la calle
        </label>
        <input
          className="w-full rounded-lg border border-neutral-300 px-3 py-2"
          value={value.streetName}
          onChange={(e) => update("streetName", e.target.value)}
          placeholder="Ingresar nombre de la calle"
          required
        />
      </div>

      {/* Número */}
      <div>
        <label className="block text-sm text-neutral-600 mb-1">
          N° de calle
        </label>
        <input
          className="w-full rounded-lg border border-neutral-300 px-3 py-2"
          value={value.streetNumber}
          onChange={(e) => update("streetNumber", e.target.value)}
          placeholder="123, 123-A, Mz Lt"
          required
        />
      </div>

      {/* Referencia */}
      <div>
        <label className="block text-sm text-neutral-600 mb-1">
          Dpto/Oficina/Casa (opcional)
        </label>
        <input
          className="w-full rounded-lg border border-neutral-300 px-3 py-2"
          value={value.reference ?? ""}
          onChange={(e) => update("reference", e.target.value)}
          placeholder="Dpto 502, Casa A, Piso 3"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm text-neutral-600 mb-1">Teléfono</label>
        <input
          className="w-full rounded-lg border border-neutral-300 px-3 py-2"
          value={value.phone ?? ""}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+51 999 999 999"
        />
      </div>

      {/* Principal */}
      <div className="col-span-1 md:col-span-2">
        <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={!!value.isPrimary}
            onChange={(e) => update("isPrimary", e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300"
          />
          <span>Marcar como dirección principal</span>
        </label>
      </div>

      {/* Botonera */}
      <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={props.onCancel}
          className="px-5 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}

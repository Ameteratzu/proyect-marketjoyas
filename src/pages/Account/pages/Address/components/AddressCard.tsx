import type { Address } from "../../../types";
import { LuMapPin, LuPenLine, LuTrash2 } from "react-icons/lu";

type Props = {
  address: Address;
  onEdit: (a: Address) => void;
  onDelete: (a: Address) => void;
};

export default function AddressCard(props: Props) {
  const a = props.address;

  return (
    <div className="rounded-2xl border border-neutral-200 p-4 flex items-start justify-between shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-700 grid place-items-center">
          <LuMapPin />
        </div>
        <div>
          <p className="text-sm text-neutral-500">
            {a.isPrimary ? "Dirección principal" : "Dirección"}
          </p>
          <p className="text-neutral-900 font-medium">
            {a.streetName} {a.streetNumber}
          </p>
          <p className="text-neutral-700">
            {a.district}, {a.province} {a.department}
          </p>
          {a.phone ? (
            <p className="text-neutral-600 text-sm mt-1">{a.phone}</p>
          ) : null}
          {a.reference ? (
            <p className="text-neutral-500 text-sm">{a.reference}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={function () {
            props.onDelete(a);
          }}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50"
        >
          <LuTrash2 />
        </button>
        <button
          type="button"
          onClick={function () {
            props.onEdit(a);
          }}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50"
        >
          <LuPenLine />
        </button>
      </div>
    </div>
  );
}

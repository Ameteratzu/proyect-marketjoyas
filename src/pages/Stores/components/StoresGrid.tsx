import type { Store } from "../stores.type";
import StoreCard from "./StoreCard";

type Props = { stores: Store[] };

export default function StoresGrid({ stores }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stores.map((s) => (
        <StoreCard key={s.id} store={s} />
      ))}
    </div>
  );
}

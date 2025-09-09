type Props = { inStock: boolean };

export default function StockBadge({ inStock }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-1.5 py-1.5 text-[16px] font-medium text-white ${
        inStock
          ? "bg-primary ring-1"
          : "bg-orange-700 ring-1"
      }`}
    >
      {inStock ? "En stock" : "Sin stock"}
    </span>
  );
}

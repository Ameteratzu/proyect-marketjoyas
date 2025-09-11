type Tab = "products" | "reviews";

type Props = {
  value: Tab;
  onChange: (t: Tab) => void;
  leftLabel: string;
  rightLabel: string;
};

export default function StoreTabs({
  value,
  onChange,
  leftLabel,
  rightLabel,
}: Props) {
  const Btn = ({ tab, label }: { tab: Tab; label: string }) => (
    <button
      onClick={() => onChange(tab)}
      className={`relative px-4 py-3 text-3xl font-semibold cursor-pointer ${
        value === tab
          ? "text-primary"
          : "text-graphite/70 hover:text-primary"
      }`}
      aria-current={value === tab ? "true" : undefined}
    >
      {label}
      <span
        aria-hidden="true"
        className={`absolute left-0 right-0 -bottom-[1px] h-[3px] transition ${
          value === tab ? "bg-primary" : "bg-transparent"
        }`}
      />
    </button>
  );

  return (
    <div className="container-p mt-6 border-b border-black/10 flex items-center justify-center gap-8">
      <Btn tab="products" label={leftLabel} />
      <Btn tab="reviews" label={rightLabel} />
    </div>
  );
}

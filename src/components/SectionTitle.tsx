type Props = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  decor?: "full" | "short";
  lineThickness?: "thin" | "medium" | "thick";
};

export default function SectionTitle({
  children,
  id,
  className,
  decor = "full",
  lineThickness = "thin",
}: Props) {
  const thickness =
    lineThickness === "thick"
      ? "h-[3px]"
      : lineThickness === "medium"
      ? "h-[2px]"
      : "h-px";

  return (
    <h2
      id={id}
      className={`relative uppercase my-8 text-center text-primary font-sans text-2xl md:text-3xl ${
        className ?? ""
      }`}
    >
      {decor === "full" && (
        <>
          <span className="px-6 bg-bg-light relative z-[1]">{children}</span>
          <span
            aria-hidden="true"
            className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 bg-primary/30 ${thickness}`}
          />
        </>
      )}
      {decor === "short" && (
        <span className="inline-flex items-center gap-6">
          <span
            aria-hidden="true"
            className={`bg-primary/25 w-24 sm:w-40 ${thickness}`}
          />
          <span className="relative z-[1] tracking-wide">{children}</span>
          <span
            aria-hidden="true"
            className={`bg-primary/25 w-24 sm:w-40 ${thickness}`}
          />
        </span>
      )}
    </h2>
  );
}

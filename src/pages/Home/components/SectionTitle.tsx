type Props = { children: React.ReactNode; id?: string; className?: string };
export default function SectionTitle({ children, id, className }: Props) {
  return (
    <h2
      id={id}
      className={`relative my-8 text-center text-primary font-display text-2xl md:text-3xl ${
        className ?? ""
      }`}
    >
      <span className="px-6 bg-fondo relative z-[1]">{children}</span>
      <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-primary/30" />
    </h2>
  );
}

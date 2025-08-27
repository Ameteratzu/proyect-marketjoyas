import Header from "@/features/header/Header";

type Props = { children: React.ReactNode };

export default function AppShell(props: Props) {
  return (
    <div className="min-h-dvh bg-fondo text-oscuro">
      <Header />
      <main id="content">{props.children}</main>
    </div>
  );
}

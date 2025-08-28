import Header from "@/features/header/Header";
import ScrollToTop from "@/routes/ScrollToTop";

type Props = { children: React.ReactNode };

export default function AppShell(props: Props) {
  return (
    <div className="min-h-dvh bg-fondo text-oscuro">
      <Header />
      <ScrollToTop />
      <main id="content">{props.children}</main>
    </div>
  );
}

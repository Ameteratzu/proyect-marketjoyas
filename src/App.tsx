import AppRouter from "@/routes/Router";
import { ToastProvider } from "@/components/Toast";
export default function App() {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  );
}

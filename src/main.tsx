import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { setAuthToken } from "@/common/api/http";
import "./app/providers/I18n.tsx";

import { Provider } from "react-redux";
import { store } from "./common/store/store.ts"; // la ruta de tu store

// Inicializar token desde localStorage al arrancar
try {
  const raw = localStorage.getItem("user");
  if (raw) {
    const parsed = JSON.parse(raw);
    const token = parsed?.access_token ?? parsed?.user?.access_token ?? null;
    setAuthToken(token ?? null);
  }
} catch {
  setAuthToken(null);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>
);

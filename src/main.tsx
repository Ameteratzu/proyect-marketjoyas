import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./app/providers/I18n.tsx";

import { Provider } from "react-redux";
import { store } from "./common/store/store.ts"; // la ruta de tu store

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>
);

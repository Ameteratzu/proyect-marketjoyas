// src/common/api/http.ts
import axios from "axios";

// Base homogénea:
// - DEV: Vite proxy o .env
// - PROD: Nginx proxy (/api -> backend)
const API_BASE_URL =
  (import.meta as any)?.env?.VITE_API_URL?.toString() || "/api";

// Cliente principal
export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: "application/json" },
});

// --- Auth helper (igual que tenías) ---
export function setAuthToken(token: string | null) {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
}

// --- Interceptor: añade Bearer desde localStorage si no estaba ---
http.interceptors.request.use((config: any) => {
  try {
    const hasHeader = !!(config.headers as any)?.Authorization;
    if (!hasHeader) {
      const token = localStorage.getItem("token");
      if (token) {
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // en SSR o navegadores raros, ignorar
  }
  return config;
});

// --- Logs de salida (opcionales, como tenías) ---
http.interceptors.request.use(
  (config: any) => {
    try {
      const method = (config.method || "GET").toUpperCase();
      const url = `${config.baseURL || ""}${config.url || ""}`;
      const hasAuth = !!(config.headers as any)?.Authorization;
      console.log(`[http] -> ${method} ${url}`, {
        params: config.params,
        data: config.data,
        authHeader: hasAuth ? "Bearer <set>" : "<none>",
      });
    } catch {}
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (res) => {
    try {
      const method = (res.config?.method || "GET").toUpperCase();
      const url = `${res.config?.baseURL || ""}${res.config?.url || ""}`;
      const ct = (res.headers?.["content-type"] || "").toString();
      console.log(`[http] <- ${res.status} ${method} ${url}`, {
        contentType: ct,
      });
    } catch {}
    return res;
  },
  (err) => {
    try {
      const method = (err.config?.method || "GET").toUpperCase();
      const url = `${err.config?.baseURL || ""}${err.config?.url || ""}`;
      const status = err?.response?.status;
      console.log(`[http] x- ${status ?? "ERR"} ${method} ${url}`);
      const body = err?.response?.data;
      if (body?.message) {
        console.log("[http] error body:", {
          ...body,
          message: Array.isArray(body.message)
            ? body.message.join(" | ")
            : body.message,
        });
      } else if (body) {
        console.log("[http] error body:", body);
      }
    } catch {}
    return Promise.reject(err);
  }
);

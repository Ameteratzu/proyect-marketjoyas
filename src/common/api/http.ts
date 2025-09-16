import axios from "axios";
import { API_BASE_URL } from "../constants/urls";

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: "application/json" },
});

// Configurador del token desde fuera (login/logout/init)
export function setAuthToken(token: string | null) {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
}

http.interceptors.response.use(
  (res) => res,
  (err) => {
    // Log básico; aquí podríamos intentar refresh si existiera endpoint
    if (err?.response?.status === 401) {
      console.warn("HTTP 401 - Unauthorized");
    }
    return Promise.reject(err);
  }
);

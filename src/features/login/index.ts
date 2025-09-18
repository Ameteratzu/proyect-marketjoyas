// Reexporta el componente AuthModal (para poder usarlo sin ruta larga)
export { default as AuthModal } from "./components/AuthModal";

// Reexporta todo lo que está en hooks.ts (ejemplo: useAuth)
export * from "./hooks";

// Reexporta todos los tipos definidos en types.ts (User, LoginCredentials, etc.)
export * from "./types";

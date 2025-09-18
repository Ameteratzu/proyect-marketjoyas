// src/common/validation/validations.ts

// Validación de correo
export function validateEmail(email: string): string | null {
  if (!email) return "emailRequired";
  if (!/\S+@\S+\.\S+/.test(email)) return "emailInvalid";
  return null;
}

// Validación de DNI (8 dígitos numéricos)
export function validateDNI(dni: string): string | null {
  if (!dni) return "dniRequired";
  if (!/^\d{8}$/.test(dni)) return "dniInvalid";
  return null;
}

// Validación de celular
export function validatePhone(phone: string): string | null {
  if (!phone) return "phoneRequired";
  if (!/^\d{9}$/.test(phone)) return "phoneInvalid";
  return null;
}

// Validación de contraseña
export function validatePassword(password: string): string | null {
  if (!password) return "passwordRequired";
  if (password.length < 6) return "passwordMinLength";
  if (!/[A-Z]/.test(password)) return "passwordUppercase";
  if (!/[a-z]/.test(password)) return "passwordLowercase";
  if (!/[0-9]/.test(password)) return "passwordNumber";
  if (!/[^A-Za-z0-9]/.test(password)) return "passwordSpecialChar";
  return null;
}

// Validación de nombre completo
export function validateFullName(fullName: string): string | null {
  if (!fullName) return "fullNameRequired";
  if (fullName.length < 3) return "fullNameMinLength";
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(fullName)) return "fullNameInvalid"; 
  return null;
}

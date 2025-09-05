// src/features/Login/validations.ts

// Validación de correo
export function validateEmail(email: string): string | null {
  if (!email) return "El correo es obligatorio";
  if (!/\S+@\S+\.\S+/.test(email)) return "El correo no es válido";
  return null;
}

// Validación de DNI (8 dígitos numéricos)
export function validateDNI(dni: string): string | null {
  if (!dni) return "El DNI es obligatorio";
  if (!/^\d{8}$/.test(dni)) return "El DNI debe tener 8 dígitos numéricos";
  return null;
}

// Validación de celular
export function validatePhone(phone: string): string | null {
  if (!phone) return "El celular es obligatorio";
  if (!/^\d{9}$/.test(phone)) return "El celular debe tener 9 dígitos";
  return null;
}

// Validación de contraseña
export function validatePassword(password: string): string | null {
  if (!password) return "La contraseña es obligatoria";
  if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres";
  if (!/[A-Z]/.test(password)) return "Debe tener al menos una mayúscula";
  if (!/[a-z]/.test(password)) return "Debe tener al menos una minúscula";
  if (!/[0-9]/.test(password)) return "Debe tener al menos un número";
  if (!/[^A-Za-z0-9]/.test(password)) return "Debe tener al menos un caracter especial";
  return null;
}


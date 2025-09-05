// Definimos el tipo de datos que se necesitan para iniciar sesión
export type LoginCredentials = {
  email: string;
  password: string;
};

// Definimos el tipo de datos que se necesitan para registrarse
export type RegisterData = {
  email: string;
  fullName: string;     
  documentType: string; 
  phone: string;        
  password: string;     
};

// Definimos el tipo de datos que representa a un usuario en el sistema
export type User = {
  id: string;       
  email: string;    
  fullName: string; 
  token: string;   
};

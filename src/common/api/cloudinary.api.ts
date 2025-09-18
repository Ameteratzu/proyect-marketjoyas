import axios from "axios";

export type CloudinaryUploadResponse = {
  url: string;
  public_id: string;
};

const MAX_MB = 2; // límite amigable del lado cliente (ajústalo si backend soporta más)
const MAX_BYTES = MAX_MB * 1024 * 1024;

// Cliente SIN baseURL -> usa rutas relativas y cae en el proxy de Vite en dev
const uploadHttp = axios.create({
  headers: { Accept: "application/json" },
});

export async function uploadToCloudinary(
  file: File
): Promise<CloudinaryUploadResponse> {
  // Validación y compresión simple: si pasa de 2MB, avisa (el flujo de compresión lo manejamos desde el caller)
  if (file.size > MAX_BYTES) {
    throw new Error(
      `La imagen supera ${MAX_MB}MB. Por favor selecciona una imagen más ligera o deja que la app la comprima.`
    );
  }

  const form = new FormData();
  form.append("file", file);

  // OJO: ruta RELATIVA para que dispare el proxy en dev
  const { data } = await uploadHttp.post<CloudinaryUploadResponse>(
    "/cloudinary/upload",
    form,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return data;
}

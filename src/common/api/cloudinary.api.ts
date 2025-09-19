import { http } from "@/common/api/http";

export type CloudinaryUploadResponse = {
  url: string;
  public_id: string;
};

const MAX_MB = 2;
const MAX_BYTES = MAX_MB * 1024 * 1024;

export async function uploadToCloudinary(
  file: File
): Promise<CloudinaryUploadResponse> {
  if (file.size > MAX_BYTES) {
    throw new Error(
      `La imagen supera ${MAX_MB}MB. Por favor selecciona una imagen más ligera o permite la compresión.`
    );
  }

  const form = new FormData();
  form.append("file", file);

  // Gracias a baseURL=/api esto pega a /api/cloudinary/upload
  const { data } = await http.post<CloudinaryUploadResponse>(
    "/cloudinary/upload",
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return data;
}

export async function getCloudinarySignature() {
  const { data } = await http.get("/cloudinary/generate-signature");
  return data; // { signature, timestamp, apiKey, cloudName, uploadPreset }
}

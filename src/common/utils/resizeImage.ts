export type CompressOptions = {
  maxWidth?: number; // reescala si la imagen es más ancha
  quality?: number; // 0..1 (calidad JPEG/WEBP)
  mimeType?: "image/jpeg" | "image/webp";
};

export async function compressImage(
  file: File,
  {
    maxWidth = 1280,
    quality = 0.82,
    mimeType = "image/jpeg",
  }: CompressOptions = {}
): Promise<File> {
  // Crear bitmap
  const img = await createImageBitmap(file);
  let { width, height } = img;

  if (width > maxWidth) {
    const ratio = maxWidth / width;
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.drawImage(img, 0, 0, width, height);
  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, mimeType, quality)
  );

  if (!blob) return file;

  const ext = mimeType === "image/webp" ? "webp" : "jpg";
  const name = file.name.replace(/\.[^.]+$/, `.${ext}`);
  return new File([blob], name, { type: mimeType, lastModified: Date.now() });
}

import { useRef, useState } from "react";
import { LuImageUp } from 'react-icons/lu';

type Props = {
  value?: File | null;
  onChange: (file: File | null) => void;
};

export default function ImageDropzone({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOver, setIsOver] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onChange(f);
  };

  return (
    <div
      className={`rounded-xl border border-dashed border-black/20 p-6 text-center transition ${
        isOver ? "bg-neutral/40" : "bg-neutral/20"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={onDrop}
      onClick={openPicker}
      role="button"
      tabIndex={0}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {value ? (
        <div className="flex items-center justify-center gap-3">
          <img
            src={URL.createObjectURL(value)}
            alt="Producto"
            className="h-20 w-20 rounded-lg object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-medium">{value.name}</p>
            <p className="text-xs text-graphite/70">
              {(value.size / 1024).toFixed(0)} KB
            </p>
          </div>
        </div>
      ) : (
        <div className="text-graphite/80">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full border border-black/10">
            <LuImageUp className="w-5 h-5" />
          </div>
          <p className="text-sm">
            Arrastra una imagen aquí o{" "}
            <span className="underline">haz click para seleccionar</span>
          </p>
        </div>
      )}
    </div>
  );
}

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  fullName: string;
};

export default function WelcomeModal({ open, onClose, fullName }: Props) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose(); // se cierra automáticamente después de 3 segundos
    }, 3000);

    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-medium">Bienvenido, {fullName}!</p>
      </div>
    </div>
  );
}

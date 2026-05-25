"use client";

import { X, CheckCircle, XCircle, Info } from "lucide-react";
import { Toast, ToastType } from "@/hooks/useToast";

type Props = {
  toasts: Toast[];
  removeToast: (id: number) => void;
};

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-4 w-4 flex-shrink-0" />,
  error: <XCircle className="h-4 w-4 flex-shrink-0" />,
  info: <Info className="h-4 w-4 flex-shrink-0" />,
};

const styles: Record<ToastType, string> = {
  success: "bg-black text-white",
  error: "bg-red-600 text-white",
  info: "bg-[#000E8A] text-white",
};

export default function ToastContainer({ toasts, removeToast }: Props) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 min-w-[260px] max-w-[340px] shadow-lg animate-slide-up ${styles[toast.type]}`}
        >
          {icons[toast.type]}
          <p className="flex-1 font-beatriceDeckMedium text-[12px] tracking-wide">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="opacity-70 hover:opacity-100 transition-opacity">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

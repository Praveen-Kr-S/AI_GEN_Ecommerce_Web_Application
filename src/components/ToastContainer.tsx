import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-neutral-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg border border-neutral-700 min-w-[280px] max-w-sm animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'info' ? (
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="flex-1 font-medium text-xs sm:text-sm">{toast.message}</span>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-neutral-400 hover:text-white p-1 rounded transition-colors"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

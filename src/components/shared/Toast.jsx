import { useData } from "../../contexts/DataContext";

const COLORS = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-yellow-500",
  info: "bg-electric",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useData();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${COLORS[t.type] || COLORS.info} text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-[slideIn_0.3s_ease] min-w-[280px]`}
        >
          <span className="flex-1 text-sm font-medium">{t.message}</span>
          <button onClick={() => removeToast(t.id)} className="opacity-70 hover:opacity-100 text-lg leading-none">&times;</button>
        </div>
      ))}
    </div>
  );
}

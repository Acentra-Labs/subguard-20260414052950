export default function StatCard({ label, value, accent, icon }) {
  const color = accent === "green" ? "text-green-600" : accent === "red" ? "text-red-600" : accent === "yellow" ? "text-yellow-600" : "text-navy-900";
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
        </div>
        {icon && <div className="text-3xl opacity-80">{icon}</div>}
      </div>
    </div>
  );
}

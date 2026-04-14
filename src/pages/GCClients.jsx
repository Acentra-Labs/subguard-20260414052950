import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { formatCurrency, formatDate } from "../utils/helpers";
import StatusBadge from "../components/shared/StatusBadge";

export default function GCClients() {
  const { gcClients, subcontractors } = useData();
  const [search, setSearch] = useState("");

  const filtered = gcClients.filter(
    (gc) =>
      gc.companyName.toLowerCase().includes(search.toLowerCase()) ||
      gc.contact.toLowerCase().includes(search.toLowerCase()) ||
      gc.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">GC Clients</h1>
          <p className="text-sm text-gray-500 mt-0.5">{gcClients.length} general contractors</p>
        </div>
        <input
          type="text"
          placeholder="Search by name, contact, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric focus:border-electric transition-all outline-none w-full sm:w-72 text-sm"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((gc) => {
          const subs = subcontractors.filter((s) => s.gcId === gc.id);
          const compliant = subs.filter((s) => s.status === "Compliant").length;
          const rate = subs.length > 0 ? Math.round((compliant / subs.length) * 100) : 0;

          return (
            <div key={gc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-navy-900">{gc.companyName}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{gc.contact} &middot; {gc.location}</p>
                  <p className="text-sm text-gray-400 mt-0.5">{gc.email} &middot; {gc.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link to="/subcontractors/add" className="text-sm bg-electric text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors">
                    + Add Sub
                  </Link>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Subcontractors</p>
                  <p className="text-xl font-bold text-navy-900">{subs.length}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Compliance</p>
                  <p className={`text-xl font-bold ${rate >= 80 ? "text-green-600" : rate >= 60 ? "text-yellow-600" : "text-red-600"}`}>{rate}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">WC Min</p>
                  <p className="text-sm font-semibold text-gray-700">{formatCurrency(gc.wcMinLimit)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">GL Min</p>
                  <p className="text-sm font-semibold text-gray-700">{formatCurrency(gc.glMinLimit)}</p>
                </div>
              </div>

              {subs.length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-500 mb-2">Subcontractors</p>
                  <div className="flex flex-wrap gap-2">
                    {subs.map((s) => (
                      <div key={s.id} className="flex items-center gap-1.5 text-xs">
                        <StatusBadge status={s.status} />
                        <span className="text-gray-600">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                <span>Terms: {gc.paymentTerms}</span>
                <span>Updated {formatDate(gc.updated_at)}</span>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">No GC clients match your search.</div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { daysUntil, formatDate } from "../utils/helpers";
import StatusBadge from "../components/shared/StatusBadge";

const FILTERS = ["All", "Compliant", "Expiring", "Expired", "Pending"];

export default function Subcontractors() {
  const { subcontractors, certificates, gcClients } = useData();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = subcontractors.filter((s) => {
    if (filter !== "All" && s.status !== filter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.ein.includes(search)) return false;
    return true;
  });

  function gcName(gcId) {
    return gcClients.find((g) => g.id === gcId)?.companyName || "Unassigned";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Subcontractors</h1>
          <p className="text-sm text-gray-500 mt-0.5">{subcontractors.length} total across all GCs</p>
        </div>
        <Link to="/subcontractors/add" className="bg-electric text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium self-start">
          + Add Subcontractor
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name or EIN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric focus:border-electric transition-all outline-none text-sm flex-1"
        />
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-electric text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((sub) => {
          const subCerts = certificates.filter((c) => c.subId === sub.id);
          const wc = subCerts.find((c) => c.type === "WC");
          const gl = subCerts.find((c) => c.type === "GL");

          return (
            <div key={sub.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-navy-900">{sub.name}</h2>
                    <StatusBadge status={sub.status} />
                    {sub.soleProprietorFlag && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">Sole Prop</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{sub.businessType} &middot; EIN: {sub.ein}</p>
                  <p className="text-sm text-gray-400">{sub.contact} &middot; {gcName(sub.gcId)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link to="/certificates" className="text-xs text-electric hover:underline">View Certs</Link>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <CertCard label="Workers' Comp" cert={wc} />
                <CertCard label="General Liability" cert={gl} />
              </div>

              {sub.soleProprietorFlag && (
                <div className="mt-3 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-xs text-orange-800">
                  <strong>Idaho Code \u00A772-216:</strong> GC becomes statutory employer of uninsured sole proprietor&rsquo;s workers. Verify WC coverage or obtain signed exemption.
                </div>
              )}

              {sub.agentName && (
                <div className="mt-3 text-xs text-gray-400">
                  Agent: {sub.agentName} ({sub.agentAgency}) &middot; {sub.agentEmail}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">No subcontractors match your filters.</div>
        )}
      </div>
    </div>
  );
}

function CertCard({ label, cert }) {
  if (!cert) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="text-xs text-gray-400 mt-1">No certificate on file</p>
      </div>
    );
  }
  const days = daysUntil(cert.expirationDate);
  const bg = cert.status === "Compliant" ? "bg-green-50 border-green-200" : cert.status === "Expired" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200";
  return (
    <div className={`${bg} border rounded-lg p-3`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-700">{label}</p>
        <StatusBadge status={cert.status} />
      </div>
      <p className="text-xs text-gray-500 mt-1">{cert.carrier || "—"} &middot; {cert.policyNumber || "Pending"}</p>
      {days !== null && (
        <p className="text-xs text-gray-400 mt-0.5">
          {days > 0 ? `Expires in ${days} days` : `Expired ${Math.abs(days)} days ago`} &middot; {formatDate(cert.expirationDate)}
        </p>
      )}
    </div>
  );
}

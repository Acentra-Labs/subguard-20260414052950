import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { daysUntil, formatDate } from "../utils/helpers";
import StatusBadge from "../components/shared/StatusBadge";

export default function Certificates() {
  const { user } = useAuth();
  const { certificates, gcClients, updateCertificateStatus, sendVerificationRequest, addToast } = useData();
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [gcFilter, setGcFilter] = useState("all");

  const filtered = certificates.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (typeFilter !== "all" && c.type !== typeFilter) return false;
    if (gcFilter !== "all" && String(c.gcId) !== gcFilter) return false;
    return true;
  });

  function handleValidate(cert) {
    updateCertificateStatus(cert.id, "Compliant");
    addToast(`${cert.subName} ${cert.type} marked as compliant`, "success");
  }

  function handleRequestVerification(cert) {
    sendVerificationRequest(cert.id, user?.id);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Certificates</h1>
        <p className="text-sm text-gray-500 mt-0.5">{certificates.length} certificates tracked</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-electric focus:border-electric outline-none">
            <option value="all">All Statuses</option>
            <option value="Compliant">Compliant</option>
            <option value="Expiring">Expiring</option>
            <option value="Expired">Expired</option>
            <option value="Pending">Pending</option>
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-electric focus:border-electric outline-none">
            <option value="all">All Types</option>
            <option value="WC">Workers&rsquo; Comp</option>
            <option value="GL">General Liability</option>
          </select>
          <select value={gcFilter} onChange={(e) => setGcFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-electric focus:border-electric outline-none">
            <option value="all">All GCs</option>
            {gcClients.map((gc) => <option key={gc.id} value={String(gc.id)}>{gc.companyName}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((cert) => {
          const days = daysUntil(cert.expirationDate);
          const gcName = gcClients.find((g) => g.id === cert.gcId)?.companyName || "—";

          return (
            <div key={cert.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-navy-900">{cert.subName}</h2>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">{cert.type}</span>
                    <StatusBadge status={cert.status} />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{cert.carrier || "Awaiting carrier info"} &middot; {cert.policyNumber || "No policy number"}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{gcName} &middot; Agent: {cert.agentName || "Unassigned"}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {cert.status !== "Compliant" && (
                    <button onClick={() => handleValidate(cert)} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
                      Mark Compliant
                    </button>
                  )}
                  <button onClick={() => handleRequestVerification(cert)} className="text-xs bg-electric text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors">
                    Request Verification
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-gray-400">Effective</span>
                  <p className="text-gray-600 font-medium">{formatDate(cert.effectiveDate)}</p>
                </div>
                <div>
                  <span className="text-gray-400">Expires</span>
                  <p className={`font-medium ${days !== null && days <= 30 && days > 0 ? "text-yellow-600" : days !== null && days <= 0 ? "text-red-600" : "text-gray-600"}`}>
                    {formatDate(cert.expirationDate)}
                    {days !== null && <span className="ml-1">({days > 0 ? `${days}d` : "past"})</span>}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Limits</span>
                  <p className="text-gray-600 font-medium">{cert.coverageLimits || "—"}</p>
                </div>
                <div>
                  <span className="text-gray-400">Add&rsquo;l Insured</span>
                  <p className={`font-medium ${cert.additionalInsured ? "text-green-600" : "text-gray-400"}`}>
                    {cert.additionalInsured ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">No certificates match your filters.</div>
        )}
      </div>
    </div>
  );
}

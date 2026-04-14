import { useData } from "../contexts/DataContext";
import { daysUntil } from "../utils/helpers";
import StatCard from "../components/shared/StatCard";
import StatusBadge from "../components/shared/StatusBadge";

export default function Reports() {
  const { gcClients, subcontractors, certificates, addToast } = useData();

  const totalSubs = subcontractors.length;
  const compliant = subcontractors.filter((s) => s.status === "Compliant").length;
  const expiring = subcontractors.filter((s) => s.status === "Expiring").length;
  const expired = subcontractors.filter((s) => s.status === "Expired").length;
  const pending = subcontractors.filter((s) => s.status === "Pending").length;
  const rate = totalSubs > 0 ? Math.round((compliant / totalSubs) * 100) : 0;

  const wcCerts = certificates.filter((c) => c.type === "WC");
  const glCerts = certificates.filter((c) => c.type === "GL");
  const wcCompliant = wcCerts.filter((c) => c.status === "Compliant").length;
  const glCompliant = glCerts.filter((c) => c.status === "Compliant").length;

  const expiringCerts = certificates
    .filter((c) => { const d = daysUntil(c.expirationDate); return d !== null && d > 0 && d <= 60; })
    .sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));

  function handleExport() {
    addToast("Report exported (demo — CSV download would trigger here)", "info");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Compliance Report</h1>
          <p className="text-sm text-gray-500 mt-0.5">Aggregate view across all GC clients</p>
        </div>
        <button onClick={handleExport} className="bg-electric text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium self-start">
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Compliance Rate" value={`${rate}%`} accent={rate >= 80 ? "green" : rate >= 60 ? "yellow" : "red"} />
        <StatCard label="Compliant Subs" value={compliant} accent="green" />
        <StatCard label="Expiring (30d)" value={expiring} accent="yellow" />
        <StatCard label="Expired / Pending" value={`${expired} / ${pending}`} accent="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-navy-900 mb-4">Workers&rsquo; Comp Coverage</h2>
          <div className="space-y-2">
            <Row label="Total Certificates" value={wcCerts.length} />
            <Row label="Compliant" value={wcCompliant} accent="green" />
            <Row label="Non-Compliant" value={wcCerts.length - wcCompliant} accent="red" />
            <Row label="Compliance Rate" value={`${wcCerts.length > 0 ? Math.round((wcCompliant / wcCerts.length) * 100) : 0}%`} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-navy-900 mb-4">General Liability Coverage</h2>
          <div className="space-y-2">
            <Row label="Total Certificates" value={glCerts.length} />
            <Row label="Compliant" value={glCompliant} accent="green" />
            <Row label="Non-Compliant" value={glCerts.length - glCompliant} accent="red" />
            <Row label="Compliance Rate" value={`${glCerts.length > 0 ? Math.round((glCompliant / glCerts.length) * 100) : 0}%`} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-base font-semibold text-navy-900 mb-4">GC Compliance Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">GC Client</th>
                <th className="pb-3 font-medium text-center">Subs</th>
                <th className="pb-3 font-medium text-center">Compliant</th>
                <th className="pb-3 font-medium text-center">Expiring</th>
                <th className="pb-3 font-medium text-center">Expired</th>
                <th className="pb-3 font-medium text-center">Rate</th>
              </tr>
            </thead>
            <tbody>
              {gcClients.map((gc) => {
                const subs = subcontractors.filter((s) => s.gcId === gc.id);
                const c = subs.filter((s) => s.status === "Compliant").length;
                const ex = subs.filter((s) => s.status === "Expiring").length;
                const exp = subs.filter((s) => s.status === "Expired").length;
                const r = subs.length > 0 ? Math.round((c / subs.length) * 100) : 0;
                return (
                  <tr key={gc.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 font-medium text-gray-800">{gc.companyName}</td>
                    <td className="py-3 text-center">{subs.length}</td>
                    <td className="py-3 text-center text-green-600 font-medium">{c}</td>
                    <td className="py-3 text-center text-yellow-600">{ex}</td>
                    <td className="py-3 text-center text-red-600">{exp}</td>
                    <td className="py-3 text-center">
                      <span className={`font-semibold ${r >= 80 ? "text-green-600" : r >= 60 ? "text-yellow-600" : "text-red-600"}`}>{r}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {expiringCerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-navy-900 mb-4">Expiring Within 60 Days</h2>
          <div className="space-y-2">
            {expiringCerts.map((c) => {
              const days = daysUntil(c.expirationDate);
              return (
                <div key={c.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{c.subName} — {c.type}</p>
                    <p className="text-xs text-gray-500">{c.carrier} &middot; {c.policyNumber}</p>
                  </div>
                  <span className="text-sm font-semibold text-yellow-700">{days}d left</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, accent }) {
  const color = accent === "green" ? "text-green-600" : accent === "red" ? "text-red-600" : "text-gray-800";
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-semibold ${color}`}>{value}</span>
    </div>
  );
}

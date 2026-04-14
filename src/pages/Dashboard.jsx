import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { daysUntil, formatDate } from "../utils/helpers";
import StatCard from "../components/shared/StatCard";
import StatusBadge from "../components/shared/StatusBadge";

export default function Dashboard() {
  const { user } = useAuth();
  const { gcClients, subcontractors, certificates, addToast } = useData();

  const totalSubs = subcontractors.length;
  const compliant = subcontractors.filter((s) => s.status === "Compliant").length;
  const expiring = subcontractors.filter((s) => s.status === "Expiring").length;
  const expired = subcontractors.filter((s) => s.status === "Expired").length;
  const pending = subcontractors.filter((s) => s.status === "Pending").length;
  const complianceRate = totalSubs > 0 ? Math.round((compliant / totalSubs) * 100) : 0;

  const recentCerts = [...certificates]
    .filter((c) => c.expirationDate)
    .sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Welcome back, {user?.name?.split(" ")[0]}</h1>
        <p className="text-gray-500 text-sm mt-1">Compliance overview across all GC clients</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="GC Clients" value={gcClients.length} icon={"\u{1F3E2}"} />
        <StatCard label="Subcontractors" value={totalSubs} icon={"\u{1F477}"} />
        <StatCard label="Compliant" value={compliant} accent="green" icon={"\u2705"} />
        <StatCard label="Expiring Soon" value={expiring} accent="yellow" icon={"\u23F3"} />
        <StatCard label="Expired / Missing" value={expired + pending} accent="red" icon={"\u26A0\uFE0F"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-navy-900 mb-4">Compliance Rate</h2>
          <div className="flex items-end gap-4">
            <span className={`text-5xl font-bold ${complianceRate >= 80 ? "text-green-600" : complianceRate >= 60 ? "text-yellow-600" : "text-red-600"}`}>
              {complianceRate}%
            </span>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${complianceRate >= 80 ? "bg-green-500" : complianceRate >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${complianceRate}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{compliant} of {totalSubs} subs compliant</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-navy-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link to="/subcontractors/add" className="flex items-center gap-2 px-3 py-2.5 bg-electric/5 hover:bg-electric/10 text-electric rounded-lg text-sm font-medium transition-colors">
              + Add Subcontractor
            </Link>
            <Link to="/certificates" className="flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-sm text-gray-600 transition-colors">
              {"\u{1F4C4}"} View Certificates
            </Link>
            <button
              onClick={() => addToast("Compliance check complete — 2 issues found", "warning")}
              className="flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-sm text-gray-600 transition-colors w-full text-left"
            >
              {"\u{1F50D}"} Run Compliance Check
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-navy-900 mb-4">Upcoming Expirations</h2>
          <div className="space-y-2.5">
            {recentCerts.map((c) => {
              const days = daysUntil(c.expirationDate);
              return (
                <div key={c.id} className="flex items-center justify-between text-sm">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 truncate">{c.subName}</p>
                    <p className="text-xs text-gray-400">{c.type} &middot; {formatDate(c.expirationDate)}</p>
                  </div>
                  <StatusBadge status={days <= 0 ? "Expired" : days <= 30 ? "Expiring" : "Compliant"} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-base font-semibold text-navy-900 mb-4">GC Client Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Company</th>
                <th className="pb-3 font-medium">Contact</th>
                <th className="pb-3 font-medium text-center">Subs</th>
                <th className="pb-3 font-medium text-center">Compliant</th>
                <th className="pb-3 font-medium text-center">Rate</th>
              </tr>
            </thead>
            <tbody>
              {gcClients.map((gc) => {
                const rate = gc.subscriberCount > 0 ? Math.round((gc.compliantSubs / gc.subscriberCount) * 100) : 0;
                return (
                  <tr key={gc.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 font-medium text-gray-800">{gc.companyName}</td>
                    <td className="py-3 text-gray-500">{gc.contact}</td>
                    <td className="py-3 text-center">{gc.subscriberCount}</td>
                    <td className="py-3 text-center text-green-600 font-medium">{gc.compliantSubs}</td>
                    <td className="py-3 text-center">
                      <span className={`font-semibold ${rate >= 80 ? "text-green-600" : rate >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                        {rate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ToastContainer from "../shared/Toast";

const NAV = [
  { path: "/dashboard", label: "Dashboard", icon: "\u{1F4CA}" },
  { path: "/gc-clients", label: "GC Clients", icon: "\u{1F3E2}" },
  { path: "/subcontractors", label: "Subcontractors", icon: "\u{1F477}" },
  { path: "/certificates", label: "Certificates", icon: "\u{1F4C4}" },
  { path: "/agent-portal", label: "Agent Portal", icon: "\u{2709}\uFE0F" },
  { path: "/reports", label: "Reports", icon: "\u{1F4C8}" },
];

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-navy-900 text-white shadow-lg sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent-cyan rounded-lg flex items-center justify-center text-navy-900 font-bold text-sm">SG</div>
              <span className="text-lg font-bold tracking-tight">SubGuard</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-cyan-200">{user?.name}</span>
            <span className="hidden sm:block text-xs px-2 py-0.5 bg-white/10 rounded-full capitalize">{user?.role}</span>
            <button onClick={handleLogout} className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/30 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`fixed md:sticky md:top-16 top-16 left-0 z-20 w-60 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
          <nav className="p-3 space-y-1">
            {NAV.map((item) => {
              const active = location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/");
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-electric/10 text-electric" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6 min-w-0">
          <Outlet />
        </main>
      </div>

      <footer className="bg-navy-900 text-gray-400 py-4 text-center text-xs">
        Built by{" "}
        <a href="https://acentralabs.com" className="text-accent-cyan hover:underline" target="_blank" rel="noopener noreferrer">
          Acentra Labs
        </a>{" "}
        &middot; SubGuard &copy; {new Date().getFullYear()}
      </footer>

      <ToastContainer />
    </div>
  );
}

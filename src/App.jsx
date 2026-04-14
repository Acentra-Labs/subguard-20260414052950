import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GCClients from "./pages/GCClients";
import Subcontractors from "./pages/Subcontractors";
import AddSubcontractor from "./pages/AddSubcontractor";
import Certificates from "./pages/Certificates";
import AgentPortal from "./pages/AgentPortal";
import Reports from "./pages/Reports";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="gc-clients" element={<GCClients />} />
        <Route path="subcontractors" element={<Subcontractors />} />
        <Route path="subcontractors/add" element={<AddSubcontractor />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="agent-portal" element={<AgentPortal />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

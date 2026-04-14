import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email) { setError("Email is required"); return; }
    setLoading(true);
    setTimeout(() => {
      const err = login(email, password);
      if (err) { setError(err); setLoading(false); return; }
      navigate("/dashboard");
    }, 600);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-cyan rounded-2xl mb-4">
            <span className="text-navy-900 font-black text-2xl">SG</span>
          </div>
          <h1 className="text-3xl font-bold text-white">SubGuard</h1>
          <p className="text-cyan-200 mt-1 text-sm">Subcontractor Insurance Compliance</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dawn@subguard.io"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric focus:border-electric transition-all outline-none"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Any password for demo"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric focus:border-electric transition-all outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy-900 text-white py-2.5 rounded-lg font-semibold hover:bg-navy-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500 font-medium mb-2 text-center">Demo Accounts</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                ["dawn@subguard.io", "Consultant"],
                ["sarah@acentralabs.com", "Admin"],
                ["mark@tvbuilders.com", "Contractor"],
                ["tom@beckettins.com", "Agent"],
              ].map(([em, role]) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setEmail(em)}
                  className="text-left px-2.5 py-2 bg-gray-50 hover:bg-electric/5 rounded-lg transition-colors border border-gray-100"
                >
                  <span className="block font-medium text-gray-700">{role}</span>
                  <span className="text-gray-400 truncate block">{em}</span>
                </button>
              ))}
            </div>
          </div>
        </form>

        <p className="text-center text-cyan-300/60 text-xs mt-6">
          Built by <a href="https://acentralabs.com" className="underline hover:text-cyan-200">Acentra Labs</a>
        </p>
      </div>
    </div>
  );
}

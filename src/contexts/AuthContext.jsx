import { createContext, useContext, useState, useEffect } from "react";
import mockData from "../data/mockData";

const AuthContext = createContext(null);

const DEMO_USERS = {
  "dawn@subguard.io": mockData.consultants[0],
  "sarah@acentralabs.com": mockData.consultants[1],
  "mark@tvbuilders.com": { id: 101, name: "Mark Davidson", email: "mark@tvbuilders.com", role: "contractor", firm: "Treasure Valley Builders" },
  "tom@beckettins.com": { id: 201, name: "Tom Beckett", email: "tom@beckettins.com", role: "agent", firm: "Beckett Insurance Group" },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("sg_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  function login(email, _password) {
    const found = DEMO_USERS[email];
    if (!found) return "Invalid credentials. Try a demo account.";
    setUser(found);
    localStorage.setItem("sg_user", JSON.stringify(found));
    return null;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("sg_user");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

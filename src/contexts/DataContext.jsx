import { createContext, useContext, useState, useCallback } from "react";
import mockData from "../data/mockData";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [gcClients, setGcClients] = useState(mockData.gcClients);
  const [subcontractors, setSubcontractors] = useState(mockData.subcontractors);
  const [certificates, setCertificates] = useState(mockData.certificates);
  const [verificationRequests, setVerificationRequests] = useState(mockData.verificationRequests);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addSubcontractor = useCallback((data) => {
    const newSub = {
      id: Date.now(),
      gcId: data.gcId || gcClients[0]?.id,
      name: data.name,
      businessType: data.businessType,
      ein: data.ein,
      contact: data.contact || "",
      email: data.email || "",
      phone: data.phone || "",
      soleProprietorFlag: data.soleProprietor || false,
      agentId: null,
      agentName: data.agentName || "",
      agentAgency: data.agentAgency || "",
      agentEmail: data.agentEmail || "",
      agentPhone: data.agentPhone || "",
      status: "Pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setSubcontractors((prev) => [...prev, newSub]);
    return newSub;
  }, [gcClients]);

  const addCertificate = useCallback((data) => {
    const newCert = {
      ...data,
      id: Date.now() + Math.random(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setCertificates((prev) => [...prev, newCert]);
    return newCert;
  }, []);

  const updateCertificateStatus = useCallback((certId, status) => {
    setCertificates((prev) =>
      prev.map((c) => (c.id === certId ? { ...c, status, updated_at: new Date().toISOString() } : c))
    );
  }, []);

  const sendVerificationRequest = useCallback((certId, requestedBy) => {
    const req = {
      id: Date.now(),
      certificateId: certId,
      requestedBy,
      sentAt: new Date().toISOString(),
      responseType: null,
      respondedAt: null,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    setVerificationRequests((prev) => [...prev, req]);
    addToast("Verification request sent to agent", "success");
    return req;
  }, [addToast]);

  return (
    <DataContext.Provider
      value={{
        gcClients,
        subcontractors,
        certificates,
        verificationRequests,
        toasts,
        addToast,
        removeToast,
        addSubcontractor,
        addCertificate,
        updateCertificateStatus,
        sendVerificationRequest,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}

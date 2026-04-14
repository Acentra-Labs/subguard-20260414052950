import { useState } from "react";
import { useData } from "../contexts/DataContext";

export default function AgentPortal() {
  const { addToast } = useData();
  const [step, setStep] = useState("form");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subName: "", policyNumber: "", carrier: "", effectiveDate: "", expirationDate: "", type: "WC",
  });

  function set(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleUpload() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      setResponse("upload");
      addToast("Certificate uploaded successfully", "success");
    }, 1200);
  }

  function handleValidate() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      setResponse("valid");
      addToast("Coverage confirmed as still valid", "success");
    }, 800);
  }

  function handleOptOut() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      setResponse("not_agent");
      addToast("Opt-out recorded", "info");
    }, 800);
  }

  if (step === "success") {
    const messages = {
      upload: { title: "Certificate Uploaded", desc: "The GC and consultant have been notified. Your response has been recorded in the audit trail." },
      valid: { title: "Coverage Confirmed", desc: "Thank you for confirming the policy is still active. No further action needed." },
      not_agent: { title: "Opt-Out Recorded", desc: "We've noted that you are no longer this subcontractor's agent. The consultant will follow up." },
    };
    const msg = messages[response];
    return (
      <div className="max-w-lg mx-auto mt-12 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="text-5xl mb-4">{response === "not_agent" ? "\u{1F4E4}" : "\u2705"}</div>
          <h1 className="text-2xl font-bold text-navy-900">{msg.title}</h1>
          <p className="text-gray-500 mt-2">{msg.desc}</p>
          <button onClick={() => { setStep("form"); setResponse(""); }} className="mt-6 text-sm text-electric hover:underline">
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Insurance Agent Portal</h1>
        <p className="text-sm text-gray-500 mt-0.5">Respond to certificate verification requests &mdash; no login required</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="bg-electric/5 border border-electric/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-navy-900 font-medium">Verification requested for:</p>
          <p className="text-lg font-bold text-navy-900 mt-1">Smith Plumbing LLC</p>
          <p className="text-sm text-gray-500 mt-0.5">Requested by Treasure Valley Builders &middot; Workers&rsquo; Comp &amp; General Liability</p>
        </div>

        <h2 className="text-base font-semibold text-navy-900 mb-4">Choose your response:</h2>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-5 hover:border-electric transition-colors">
            <h3 className="font-semibold text-gray-800 mb-3">Option A: Upload New Certificate</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <input placeholder="Policy Number" value={formData.policyNumber} onChange={(e) => set("policyNumber", e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-electric focus:border-electric outline-none" />
              <input placeholder="Carrier" value={formData.carrier} onChange={(e) => set("carrier", e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-electric focus:border-electric outline-none" />
              <input type="date" value={formData.effectiveDate} onChange={(e) => set("effectiveDate", e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-electric focus:border-electric outline-none" />
              <input type="date" value={formData.expirationDate} onChange={(e) => set("expirationDate", e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-electric focus:border-electric outline-none" />
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4 hover:border-electric transition-colors cursor-pointer">
              <p className="text-sm text-gray-500">Drag &amp; drop COI PDF here, or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">ACORD 25/28 format preferred &middot; Max 10MB</p>
            </div>
            <button onClick={handleUpload} disabled={loading} className="w-full bg-electric text-white py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Upload Certificate
            </button>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 hover:border-green-400 transition-colors">
            <h3 className="font-semibold text-gray-800 mb-2">Option B: Confirm Coverage is Still Valid</h3>
            <p className="text-sm text-gray-500 mb-3">Click below to confirm that the existing policy is still active with no changes.</p>
            <button onClick={handleValidate} disabled={loading} className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Yes, Coverage is Still Valid
            </button>
          </div>

          <div className="border border-gray-200 rounded-xl p-5 hover:border-orange-300 transition-colors">
            <h3 className="font-semibold text-gray-800 mb-2">Option C: No Longer This Sub&rsquo;s Agent</h3>
            <p className="text-sm text-gray-500 mb-3">Select this if you no longer represent this subcontractor. You can optionally provide the new agent&rsquo;s contact info.</p>
            <input placeholder="New agent's email (optional)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:ring-2 focus:ring-electric focus:border-electric outline-none" />
            <button onClick={handleOptOut} disabled={loading} className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              I Am No Longer This Sub&rsquo;s Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

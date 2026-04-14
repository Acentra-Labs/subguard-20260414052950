import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { validateEin } from "../utils/helpers";

export default function AddSubcontractor() {
  const { gcClients, addSubcontractor, addToast } = useData();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", businessType: "", ein: "", contact: "", email: "", phone: "",
    gcId: gcClients[0]?.id || "", soleProprietor: false,
    agentName: "", agentAgency: "", agentEmail: "", agentPhone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.businessType) e.businessType = "Select a business type";
    if (!form.ein.trim()) e.ein = "EIN is required";
    else if (!validateEin(form.ein)) e.ein = "Format: XX-XXXXXXX";
    if (!form.gcId) e.gcId = "Select a GC";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      addSubcontractor(form);
      addToast(`${form.name} added successfully`, "success");
      navigate("/subcontractors");
    }, 500);
  }

  const inputCls = (field) =>
    `w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-electric focus:border-electric transition-all outline-none text-sm ${errors[field] ? "border-red-400" : "border-gray-300"}`;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Add Subcontractor</h1>
        <p className="text-sm text-gray-500 mt-0.5">Register a new subcontractor and link to a GC</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <legend className="text-sm font-semibold text-navy-900 mb-3 col-span-full">Business Information</legend>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Company Name *</label>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls("name")} placeholder="e.g., Smith Plumbing LLC" />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Business Type *</label>
            <select value={form.businessType} onChange={(e) => set("businessType", e.target.value)} className={inputCls("businessType")}>
              <option value="">Select type</option>
              <option value="LLC">LLC</option>
              <option value="Sole Proprietor">Sole Proprietor</option>
              <option value="Corporation">Corporation</option>
            </select>
            {errors.businessType && <p className="text-xs text-red-500 mt-1">{errors.businessType}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">EIN / Tax ID *</label>
            <input value={form.ein} onChange={(e) => set("ein", e.target.value)} className={inputCls("ein")} placeholder="XX-XXXXXXX" />
            {errors.ein && <p className="text-xs text-red-500 mt-1">{errors.ein}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Assign to GC *</label>
            <select value={form.gcId} onChange={(e) => set("gcId", Number(e.target.value))} className={inputCls("gcId")}>
              <option value="">Select GC</option>
              {gcClients.map((gc) => <option key={gc.id} value={gc.id}>{gc.companyName}</option>)}
            </select>
            {errors.gcId && <p className="text-xs text-red-500 mt-1">{errors.gcId}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Contact Person</label>
            <input value={form.contact} onChange={(e) => set("contact", e.target.value)} className={inputCls("contact")} placeholder="Contact name" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls("email")} placeholder="sub@example.com" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls("phone")} placeholder="(208) 555-0000" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 pb-2.5">
              <input type="checkbox" checked={form.soleProprietor} onChange={(e) => set("soleProprietor", e.target.checked)} className="rounded border-gray-300 text-electric focus:ring-electric" />
              <span className="text-sm text-gray-600">Sole Proprietor</span>
            </label>
          </div>
        </fieldset>

        {form.soleProprietor && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 text-sm text-orange-800">
            <strong>Risk Notice:</strong> Under Idaho Code &sect;72-216, the GC becomes the statutory employer of an uninsured sole proprietor&rsquo;s workers. Ensure WC coverage is verified or a signed exemption is on file.
          </div>
        )}

        <fieldset className="bg-gray-50 rounded-lg p-4 space-y-4">
          <legend className="text-sm font-semibold text-navy-900 mb-1">Insurance Agent (Optional)</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Agent Name</label>
              <input value={form.agentName} onChange={(e) => set("agentName", e.target.value)} className={inputCls()} placeholder="Agent name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Agency</label>
              <input value={form.agentAgency} onChange={(e) => set("agentAgency", e.target.value)} className={inputCls()} placeholder="Agency name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Agent Email</label>
              <input type="email" value={form.agentEmail} onChange={(e) => set("agentEmail", e.target.value)} className={inputCls()} placeholder="agent@agency.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Agent Phone</label>
              <input type="tel" value={form.agentPhone} onChange={(e) => set("agentPhone", e.target.value)} className={inputCls()} placeholder="(208) 555-0000" />
            </div>
          </div>
        </fieldset>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="flex-1 bg-navy-900 text-white py-2.5 rounded-lg font-semibold hover:bg-navy-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {loading ? "Adding..." : "Add Subcontractor"}
          </button>
          <button type="button" onClick={() => navigate("/subcontractors")} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

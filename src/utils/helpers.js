export function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function complianceColor(status) {
  switch (status) {
    case "Compliant":
      return { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" };
    case "Expiring":
      return { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500" };
    case "Expired":
      return { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" };
    case "Pending":
      return { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" };
  }
}

export function formatCurrency(n) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateEin(ein) {
  return /^\d{2}-\d{7}$/.test(ein);
}

export default function EmptyState({ title, message }) {
  return (
    <div className="text-center py-16 text-gray-400">
      <div className="text-5xl mb-4">&#128203;</div>
      <p className="text-lg font-medium text-gray-500">{title}</p>
      {message && <p className="text-sm mt-1">{message}</p>}
    </div>
  );
}

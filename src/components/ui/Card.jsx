export function Card({ className = "", children }) {
  return (
    <div className={`relative rounded-2xl border border-indigo-100 bg-white shadow-sm p-6 ${className}`}>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-200 to-indigo-100" />
      {children}
    </div>
  );
}

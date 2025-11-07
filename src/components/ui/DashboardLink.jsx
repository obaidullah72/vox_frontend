import { Link } from "react-router-dom";

export function DashboardLink({ icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-start rounded-xl border border-gray-200 bg-white hover:bg-gray-50 focus:bg-gray-50 transition p-5 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-1 text-indigo-700">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}

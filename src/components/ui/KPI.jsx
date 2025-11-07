export function KPI({ title, value, hint, icon }) {
  return (
    <div className="relative rounded-2xl border border-indigo-100 bg-white shadow-sm p-5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-200 to-indigo-100" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] text-gray-600">{title}</p>
          <div className="mt-1 text-[28px] leading-8 font-semibold text-gray-900">
            {value}
          </div>
          {hint && <p className="mt-1 text-[11px] text-gray-500">{hint}</p>}
        </div>
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
          {icon}
        </span>
      </div>
    </div>
  );
}

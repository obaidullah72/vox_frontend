export function ActivityItem({ title, detail, time }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{detail}</p>
      </div>
      <span className="text-[11px] text-gray-400">{time}</span>
    </li>
  );
}

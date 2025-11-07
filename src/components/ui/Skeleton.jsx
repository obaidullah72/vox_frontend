export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gray-200/70 dark:bg-gray-700/50 ${className}`}
      aria-hidden="true"
    />
  );
}
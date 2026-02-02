export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <h3 className="text-lg font-semibold text-verdict-gray-900">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-verdict-gray-500">{subtitle}</p>}
    </div>
  );
}

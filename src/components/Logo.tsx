import Link from "next/link";

/**
 * VERDICT logo: red shield with V + wordmark.
 * Use on light background (text is dark). For dark bg use textWhite.
 */
export function Logo({
  href = "/",
  textWhite = false,
  className = "",
}: {
  href?: string;
  textWhite?: boolean;
  className?: string;
}) {
  const content = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* Red shield with V — calm deep red #d32f2f */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden
      >
        <path
          d="M16 2L4 8v8c0 6 5 10 12 12 7-2 12-6 12-12V8L16 2z"
          fill="#d32f2f"
          fillOpacity={1}
        />
        <path
          d="M11 22l5-12 5 12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span
        className={`text-lg font-semibold tracking-tight transition-smooth ${
          textWhite ? "text-white" : "text-verdict-gray-900 hover:text-verdict-red"
        }`}
      >
        VERDICT
      </span>
    </span>
  );

  return href ? (
    <Link href={href} className="focus:outline-none focus:ring-2 focus:ring-verdict-red focus:ring-offset-2 rounded-lg">
      {content}
    </Link>
  ) : (
    content
  );
}

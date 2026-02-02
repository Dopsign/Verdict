import Link from "next/link";
import { Logo } from "@/components/Logo";

interface NavProps {
  authenticated?: boolean;
  email?: string | null;
}

export function Nav({ authenticated, email }: NavProps) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-verdict-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo href={authenticated ? "/dashboard" : "/"} />
        <div className="flex items-center gap-6">
          {authenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900"
              >
                Dashboard
              </Link>
              <Link
                href="/analyze"
                className="text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900"
              >
                Analyze
              </Link>
              <Link
                href="/history"
                className="text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900"
              >
                History
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900"
              >
                Pricing
              </Link>
              <Link
                href="/account"
                className="text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900"
              >
                Account
              </Link>
              <Link
                href="/contact"
                className="text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900"
              >
                Contact
              </Link>
              <span className="hidden max-w-[140px] truncate text-sm text-verdict-gray-400 sm:inline">
                {email}
              </span>
              <form action="/auth/signout" method="post" className="inline">
                <button
                  type="submit"
                  className="text-sm text-verdict-gray-500 transition-smooth hover:text-verdict-red"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/pricing"
                className="text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900"
              >
                Contact
              </Link>
              <Link
                href="/auth/login"
                className="text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-xl bg-verdict-red px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-smooth hover:bg-verdict-red-hover"
              >
                Start free trial
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

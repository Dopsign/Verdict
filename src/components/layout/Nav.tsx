import Link from "next/link";

interface NavProps {
  authenticated?: boolean;
  email?: string | null;
}

export function Nav({ authenticated, email }: NavProps) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-verdict-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={authenticated ? "/dashboard" : "/"}
          className="text-xl font-bold tracking-tight text-white transition-smooth hover:text-verdict-red"
        >
          VERDICT
        </Link>
        <div className="flex items-center gap-4">
          {authenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-white/80 transition-smooth hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                href="/analyze"
                className="text-sm text-white/80 transition-smooth hover:text-white"
              >
                Analyze
              </Link>
              <Link
                href="/history"
                className="text-sm text-white/80 transition-smooth hover:text-white"
              >
                History
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-white/80 transition-smooth hover:text-white"
              >
                Pricing
              </Link>
              <Link
                href="/account"
                className="text-sm text-white/80 transition-smooth hover:text-white"
              >
                Account
              </Link>
              <span className="hidden text-sm text-white/50 sm:inline">
                {email}
              </span>
              <form action="/auth/signout" method="post" className="inline">
                <button
                  type="submit"
                  className="text-sm text-white/60 transition-smooth hover:text-verdict-red"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/pricing"
                className="text-sm text-white/80 transition-smooth hover:text-white"
              >
                Pricing
              </Link>
              <Link
                href="/auth/login"
                className="text-sm text-white/80 transition-smooth hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-verdict-red px-4 py-2 text-sm font-semibold text-white transition-smooth hover:bg-verdict-red-dim"
              >
                Get your verdict
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

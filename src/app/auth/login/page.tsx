import Link from "next/link";
import { signIn } from "@/app/actions/auth";
import Button from "@/components/ui/Button";
import { Nav } from "@/components/layout/Nav";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; error?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-verdict-off-white">
      <Nav />
      <main className="pt-24 pb-12">
        <div className="mx-auto max-w-md px-4">
          <div className="rounded-2xl border border-verdict-gray-200 bg-white p-8 shadow-card">
            <h1 className="text-2xl font-semibold text-verdict-gray-900">Log in</h1>
            <p className="mt-2 text-verdict-gray-600">
              Enter your VERDICT account to continue.
            </p>

            {params.message && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                {params.message}
              </div>
            )}
            {params.error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {params.error === "auth"
                  ? "Authentication failed. Please try again."
                  : decodeURIComponent(params.error)}
              </div>
            )}

            <form action={signIn} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-verdict-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-verdict-gray-900 placeholder-verdict-gray-400 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-verdict-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-verdict-gray-900 placeholder-verdict-gray-400 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
                />
              </div>
              <Button type="submit" fullWidth size="lg">
                Log in
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-verdict-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-verdict-red hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import Button from "@/components/ui/Button";
import { Nav } from "@/components/layout/Nav";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-verdict-off-white">
      <Nav />
      <main className="pt-24 pb-12">
        <div className="mx-auto max-w-md px-4">
          <div className="rounded-2xl border border-verdict-gray-200 bg-white p-8 shadow-card">
            <h1 className="text-2xl font-semibold text-verdict-gray-900">Create account</h1>
            <p className="mt-2 text-verdict-gray-600">
              5-day free trial. 5 analyses per day. No credit card required.
            </p>

            {params.error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {decodeURIComponent(params.error)}
              </div>
            )}

            <form action={signUp} className="mt-6 space-y-4">
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
                  autoComplete="new-password"
                  minLength={6}
                  className="w-full rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-verdict-gray-900 placeholder-verdict-gray-400 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
                  placeholder="Min. 6 characters"
                />
              </div>
              <Button type="submit" fullWidth size="lg">
                Sign up — 5 days free
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-verdict-gray-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-verdict-red hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

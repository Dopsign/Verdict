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
    <div className="min-h-screen bg-verdict-black">
      <Nav />
      <main className="pt-24 pb-12">
        <div className="mx-auto max-w-md px-4">
          <h1 className="mb-2 text-3xl font-bold text-white">Create account</h1>
          <p className="mb-8 text-white/60">
            Start your 5-day free trial. No credit card required.
          </p>

          {params.error && (
            <div className="mb-4 rounded-lg border border-verdict-red/50 bg-verdict-red/10 p-3 text-sm text-red-300">
              {decodeURIComponent(params.error)}
            </div>
          )}

          <form action={signUp} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-white/80">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-white/20 bg-verdict-charcoal px-4 py-2.5 text-white placeholder-white/40 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-white/80">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                minLength={6}
                className="w-full rounded-lg border border-white/20 bg-verdict-charcoal px-4 py-2.5 text-white placeholder-white/40 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
                placeholder="Min. 6 characters"
              />
            </div>
            <Button type="submit" fullWidth size="lg">
              Sign up — 5 days free
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-verdict-red hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/layout/Nav";
import Button from "@/components/ui/Button";

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-verdict-black">
      <Nav authenticated={!!user} email={user?.email ?? null} />

      <main className="mx-auto max-w-5xl px-4 pt-24 pb-20">
        <h1 className="mb-2 text-center text-3xl font-bold text-white sm:text-4xl">
          Simple pricing
        </h1>
        <p className="mb-12 text-center text-white/60">
          Start free. Upgrade when you need more.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Starter */}
          <div className="rounded-2xl border border-white/15 bg-verdict-charcoal/80 p-8 transition-smooth hover:border-verdict-red/30">
            <h2 className="text-xl font-bold text-white">Starter</h2>
            <p className="mt-2 text-white/60">
              Unlimited analyses. No history.
            </p>
            <p className="mt-6 text-3xl font-bold text-white">
              $9<span className="text-lg font-normal text-white/60">/mo</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>✓ Unlimited analyses</li>
              <li>✓ Critical errors, risks, improvements</li>
              <li>✓ Corrected version</li>
              <li className="text-white/50">✗ No history</li>
              <li className="text-white/50">✗ No priority</li>
            </ul>
            <Link href={user ? "/account?plan=starter" : "/auth/signup?plan=starter"} className="mt-8 block">
              <Button variant="secondary" fullWidth>
                Get Starter
              </Button>
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border-2 border-verdict-red/50 bg-verdict-charcoal p-8 transition-smooth hover:border-verdict-red">
            <span className="inline-block rounded-full bg-verdict-red/20 px-3 py-1 text-xs font-semibold text-verdict-red">
              Pro
            </span>
            <h2 className="mt-3 text-xl font-bold text-white">Pro</h2>
            <p className="mt-2 text-white/60">
              Unlimited analyses + history + priority.
            </p>
            <p className="mt-6 text-3xl font-bold text-white">
              $19<span className="text-lg font-normal text-white/60">/mo</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>✓ Everything in Starter</li>
              <li>✓ Full analysis history</li>
              <li>✓ Priority analysis</li>
              <li>✓ Export & share</li>
            </ul>
            <Link href={user ? "/account?plan=pro" : "/auth/signup?plan=pro"} className="mt-8 block">
              <Button fullWidth>Get Pro</Button>
            </Link>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-white/50">
          All plans use Stripe. Cancel anytime.
        </p>
      </main>
    </div>
  );
}

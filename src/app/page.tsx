import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { createClient } from "@/lib/supabase/server";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-verdict-black">
      <Nav authenticated={!!user} email={user?.email ?? null} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 sm:pt-36 sm:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,45,45,0.15),transparent)]" />
          <div className="relative mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Before you send it — get a VERDICT.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
              The AI that detects mistakes, risks, and bad decisions before they
              cost you money, time, or reputation.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={user ? "/analyze" : "/auth/signup"}
                className="inline-flex items-center justify-center rounded-lg bg-verdict-red px-8 py-3.5 text-lg font-semibold text-white transition-smooth hover:bg-verdict-red-dim focus:outline-none focus:ring-2 focus:ring-verdict-red focus:ring-offset-2 focus:ring-offset-verdict-black"
              >
                Get your verdict
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-transparent px-8 py-3.5 text-lg font-semibold text-white transition-smooth hover:border-white/40 hover:bg-white/5"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="border-t border-white/10 py-8">
          <p className="text-center text-sm text-white/50">
            Used by founders, freelancers, and operators worldwide
          </p>
        </section>

        {/* Value props */}
        <section className="border-t border-white/10 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
              Stop mistakes before they happen
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">
              Paste any email, contract, or message. VERDICT analyzes it and
              returns critical errors, risks, improvements, and a corrected
              version — with no sugarcoating.
            </p>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-verdict-charcoal/50 p-6 transition-smooth hover:border-verdict-red/30">
                <span className="text-2xl">❌</span>
                <h3 className="mt-3 font-semibold text-white">Critical errors</h3>
                <p className="mt-2 text-sm text-white/60">
                  Legal, financial, and commitment mistakes that could cost you.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-verdict-charcoal/50 p-6 transition-smooth hover:border-verdict-red/30">
                <span className="text-2xl">⚠️</span>
                <h3 className="mt-3 font-semibold text-white">Risks</h3>
                <p className="mt-2 text-sm text-white/60">
                  Unclear terms, reputational and relationship risks.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-verdict-charcoal/50 p-6 transition-smooth hover:border-verdict-red/30">
                <span className="text-2xl">✅</span>
                <h3 className="mt-3 font-semibold text-white">Improvements</h3>
                <p className="mt-2 text-sm text-white/60">
                  Clarity, tone, and a corrected version ready to send.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to protect your next move?
            </h2>
            <p className="mt-4 text-white/60">
              5-day free trial. Max 5 analyses per day. No credit card required.
            </p>
            <Link
              href={user ? "/analyze" : "/auth/signup"}
              className="mt-8 inline-block rounded-lg bg-verdict-red px-8 py-3.5 text-lg font-semibold text-white transition-smooth hover:bg-verdict-red-dim"
            >
              Get your verdict
            </Link>
          </div>
        </section>

        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-white/40">© VERDICT</span>
            <div className="flex gap-6">
              <Link href="/pricing" className="text-sm text-white/50 hover:text-white">
                Pricing
              </Link>
              <Link href="/auth/login" className="text-sm text-white/50 hover:text-white">
                Log in
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

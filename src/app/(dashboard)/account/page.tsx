import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { createCheckoutSession } from "@/app/actions/stripe";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; stripe?: string; success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, subscription_status, stripe_customer_id")
    .eq("id", user.id)
    .single();

  const status = profile?.subscription_status ?? "free";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-white">Account & Billing</h1>
      <p className="mb-8 text-white/60">
        Manage your subscription and billing.
      </p>

      <Card className="mb-8">
        <CardHeader title="Account" subtitle="Email" />
        <p className="text-white/90">{profile?.email ?? user.email}</p>
      </Card>

      <Card className="mb-8">
        <CardHeader title="Current plan" subtitle="Subscription" />
        <p className="capitalize text-white/90">{status}</p>
        {status !== "free" && (
          <p className="mt-2 text-sm text-white/50">
            Billing is managed via Stripe. Use the link below to update or cancel.
          </p>
        )}
      </Card>

      {params.stripe === "not_configured" && (
        <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          Stripe is not configured. Add STRIPE_SECRET_KEY and price IDs to .env — see README.
        </div>
      )}
      {params.success === "1" && (
        <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-200">
          Subscription started. Your plan has been updated.
        </div>
      )}

      {/* Stripe-ready: create checkout session (placeholder keys) */}
      <div className="space-y-4">
        {status === "free" && (
          <form action={createCheckoutSession} className="space-y-4">
            <input type="hidden" name="plan" value={params.plan ?? "starter"} />
            <Button type="submit" size="lg">
              Subscribe with Stripe (Starter or Pro)
            </Button>
            <p className="text-sm text-white/50">
              Add your Stripe keys in env to enable. See README.
            </p>
          </form>
        )}
        {status !== "free" && (
          <form action="/api/stripe/portal" method="post">
            <Button type="submit" variant="secondary">
              Open Stripe Customer Portal
            </Button>
          </form>
        )}
      </div>

      <p className="mt-8 text-sm text-white/50">
        <Link href="/pricing" className="text-verdict-red hover:underline">
          View pricing
        </Link>
      </p>
    </div>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUsageState } from "@/lib/usage";
import { Card, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const usage = await getUsageState(user.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-white">Dashboard</h1>
      <p className="mb-8 text-white/60">
        Your usage and quick actions.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader title="Usage" subtitle="This period" />
          {usage.isPaid ? (
            <p className="text-white/80">Unlimited analyses on your plan.</p>
          ) : (
            <>
              <p className="text-white/80">
                {usage.analysesLeftToday === -1
                  ? "Unlimited"
                  : `${usage.analysesLeftToday} of 5 analyses left today`}
              </p>
              <p className="mt-2 text-sm text-white/50">
                Trial: {usage.trialDaysLeft} days left
              </p>
            </>
          )}
        </Card>

        <Card>
          <CardHeader title="Plan" subtitle="Subscription" />
          <p className="text-white/80 capitalize">
            {usage.profile?.subscription_status ?? "Free trial"}
          </p>
          <Link href="/pricing" className="mt-4 inline-block">
            <Button variant="secondary" size="sm">
              Upgrade
            </Button>
          </Link>
        </Card>
      </div>

      <div className="mt-10">
        <Link href="/analyze">
          <Button size="lg" className="w-full sm:w-auto">
            New analysis
          </Button>
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/history"
          className="block rounded-xl border border-white/10 bg-verdict-charcoal/50 p-4 transition-smooth hover:border-white/20"
        >
          <span className="font-semibold text-white">History</span>
          <p className="mt-1 text-sm text-white/50">
            {usage.profile?.subscription_status === "pro"
              ? "View past analyses"
              : "Available on Pro"}
          </p>
        </Link>
        <Link
          href="/account"
          className="block rounded-xl border border-white/10 bg-verdict-charcoal/50 p-4 transition-smooth hover:border-white/20"
        >
          <span className="font-semibold text-white">Account & Billing</span>
          <p className="mt-1 text-sm text-white/50">Manage subscription</p>
        </Link>
      </div>
    </div>
  );
}

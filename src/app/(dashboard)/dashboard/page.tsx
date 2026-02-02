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
      <h1 className="text-2xl font-semibold text-verdict-gray-900">Dashboard</h1>
      <p className="mt-1 text-verdict-gray-600">
        Your usage and quick actions.
      </p>

      {/* Usage indicator — clear, calm */}
      <div className="mt-8 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card">
          <p className="text-sm font-medium text-verdict-gray-500">Usage</p>
          {usage.isPaid ? (
            <>
              <p className="mt-2 text-lg font-semibold text-verdict-gray-900">Unlimited analyses</p>
              <p className="mt-1 text-sm text-verdict-gray-500">On your plan</p>
            </>
          ) : (
            <>
              <p className="mt-2 text-lg font-semibold text-verdict-gray-900">
                {usage.analysesLeftToday === -1
                  ? "Unlimited"
                  : `${usage.analysesLeftToday} of 5 analyses left today`}
              </p>
              <p className="mt-1 text-sm text-verdict-gray-500">
                Trial: {usage.trialDaysLeft} days left
              </p>
            </>
          )}
        </div>
        <div className="flex-1 min-w-[200px] rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card">
          <p className="text-sm font-medium text-verdict-gray-500">Plan</p>
          <p className="mt-2 text-lg font-semibold text-verdict-gray-900 capitalize">
            {usage.profile?.subscription_status ?? "Free trial"}
          </p>
          <Link href="/pricing" className="mt-4 inline-block">
            <Button variant="secondary" size="sm">
              Upgrade
            </Button>
          </Link>
        </div>
      </div>

      {/* Large New Analysis CTA */}
      <div className="mt-10">
        <Link href="/analyze">
          <Button size="lg" className="w-full sm:w-auto">
            New analysis
          </Button>
        </Link>
      </div>

      {/* Calm empty-state style links */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/history"
          className="block rounded-2xl border border-verdict-gray-200 bg-white p-5 shadow-card transition-smooth hover:shadow-elevated"
        >
          <span className="font-semibold text-verdict-gray-900">History</span>
          <p className="mt-1 text-sm text-verdict-gray-500">
            {usage.profile?.subscription_status === "pro"
              ? "View past analyses"
              : "Available on Pro"}
          </p>
        </Link>
        <Link
          href="/account"
          className="block rounded-2xl border border-verdict-gray-200 bg-white p-5 shadow-card transition-smooth hover:shadow-elevated"
        >
          <span className="font-semibold text-verdict-gray-900">Account & Billing</span>
          <p className="mt-1 text-sm text-verdict-gray-500">Manage subscription</p>
        </Link>
      </div>
    </div>
  );
}

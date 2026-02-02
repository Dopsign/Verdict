import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { AccountPlanForm } from "./AccountPlanForm";
import { getLocaleFromCookies, getServerTranslation } from "@/lib/i18n/server";

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

  const locale = await getLocaleFromCookies();
  const t = getServerTranslation(locale);

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, subscription_status, stripe_customer_id")
    .eq("id", user.id)
    .single();

  const status = profile?.subscription_status ?? "free";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-verdict-gray-900">{t("account.title")}</h1>
      <p className="mt-2 text-verdict-gray-600">
        {t("account.subtitle")}
      </p>

      <Card className="mt-8">
        <CardHeader title="Account" subtitle={t("account.email")} />
        <p className="text-verdict-gray-900">{profile?.email ?? user.email}</p>
      </Card>

      <Card className="mt-6">
        <CardHeader title={t("account.plan")} subtitle={t("account.subscription")} />
        <p className="capitalize text-verdict-gray-900">{status}</p>
        {status !== "free" && (
          <p className="mt-2 text-sm text-verdict-gray-500">
            Billing is managed via Stripe. Use the link below to update or cancel.
          </p>
        )}
      </Card>

      {params.stripe === "not_configured" && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {t("account.stripe.not.configured")}
        </div>
      )}
      {params.success === "1" && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Subscription started. Your plan has been updated.
        </div>
      )}

      <div className="mt-8 space-y-4">
        {status === "free" && (
          <AccountPlanForm initialPlan={params.plan} />
        )}
        {status !== "free" && (
          <form action="/api/stripe/portal" method="post">
            <Button type="submit" variant="secondary">
              {t("account.portal")}
            </Button>
          </form>
        )}
      </div>

      <p className="mt-8 text-sm text-verdict-gray-500">
        <Link href="/pricing" className="font-medium text-verdict-red hover:underline">
          {t("account.view.pricing")}
        </Link>
      </p>
    </div>
  );
}

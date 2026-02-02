import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/layout/Nav";
import Button from "@/components/ui/Button";
import { getLocaleFromCookies, getServerTranslation } from "@/lib/i18n/server";

const PLANS = [
  {
    id: "starter",
    price: "9.99",
    currency: "CHF",
    featureKeys: ["pricing.limited", "pricing.personal", "pricing.email.support"],
    highlighted: false,
  },
  {
    id: "pro",
    price: "19.99",
    currency: "CHF",
    featureKeys: ["pricing.unlimited", "pricing.history", "pricing.priority"],
    highlighted: true,
  },
  {
    id: "premium",
    price: "39.99",
    currency: "CHF",
    featureKeys: ["pricing.unlimited", "pricing.advanced", "pricing.priority.support", "pricing.early"],
    highlighted: false,
  },
] as const;

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const locale = await getLocaleFromCookies();
  const t = getServerTranslation(locale);

  return (
    <div className="min-h-screen bg-verdict-off-white">
      <Nav authenticated={!!user} email={user?.email ?? null} />

      <main className="mx-auto max-w-6xl px-4 pt-24 pb-20">
        <h1 className="text-center text-2xl font-semibold text-verdict-gray-900 sm:text-3xl">
          {t("pricing.title")}
        </h1>
        <p className="mt-3 text-center text-verdict-gray-600">
          {t("pricing.subtitle")}
        </p>

        {/* Trial clarity */}
        <div className="mt-8 rounded-2xl border border-verdict-gray-200 bg-white p-6 text-center shadow-card sm:mx-auto sm:max-w-xl">
          <p className="font-medium text-verdict-gray-900">{t("pricing.trial")}</p>
          <p className="mt-1 text-sm text-verdict-gray-600">
            {t("pricing.trial.desc")}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border bg-white p-8 shadow-card transition-smooth hover:shadow-elevated ${
                plan.highlighted
                  ? "border-2 border-verdict-red/30"
                  : "border-verdict-gray-200"
              }`}
            >
              {plan.highlighted && (
                <span className="inline-block rounded-full bg-verdict-red/10 px-3 py-1 text-xs font-semibold text-verdict-red">
                  {t("pricing.pro")}
                </span>
              )}
              <h2 className={`${plan.highlighted ? "mt-3" : ""} text-xl font-semibold text-verdict-gray-900`}>
                {t(`pricing.${plan.id}`)}
              </h2>
              <p className="mt-6 text-3xl font-semibold text-verdict-gray-900">
                {plan.price} {plan.currency}
                <span className="text-base font-normal text-verdict-gray-500">{t("pricing.mo")}</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm text-verdict-gray-700">
                {plan.featureKeys.map((key) => (
                  <li key={key}>✓ {t(key)}</li>
                ))}
              </ul>
              <Link
                href={user ? `/account?plan=${plan.id}` : `/auth/signup?plan=${plan.id}`}
                className="mt-8 block"
              >
                <Button
                  fullWidth
                  variant={plan.highlighted ? "primary" : "secondary"}
                >
                  {t("pricing.get")} {t(`pricing.${plan.id}`)}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-verdict-gray-500">
          {t("pricing.secure")}
        </p>
      </main>
    </div>
  );
}

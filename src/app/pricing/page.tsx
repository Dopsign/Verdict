import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/layout/Nav";
import Button from "@/components/ui/Button";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "9.99",
    currency: "CHF",
    period: "/mo",
    description: "Limited usage. Personal use.",
    features: [
      "Limited usage",
      "Personal use",
      "Email support",
    ],
    cta: "Get Starter",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "19.99",
    currency: "CHF",
    period: "/mo",
    description: "Unlimited analyses + history + priority.",
    features: [
      "Unlimited analyses",
      "History",
      "Priority processing",
    ],
    cta: "Get Pro",
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "39.99",
    currency: "CHF",
    period: "/mo",
    description: "Unlimited + advanced analysis + priority support.",
    features: [
      "Unlimited",
      "Advanced analysis",
      "Priority support",
      "Early features",
    ],
    cta: "Get Premium",
    highlighted: false,
  },
] as const;

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-verdict-off-white">
      <Nav authenticated={!!user} email={user?.email ?? null} />

      <main className="mx-auto max-w-6xl px-4 pt-24 pb-20">
        <h1 className="text-center text-2xl font-semibold text-verdict-gray-900 sm:text-3xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-center text-verdict-gray-600">
          Very clear. Monthly only. Cancel anytime. Secure payment via Stripe.
        </p>

        {/* Trial clarity */}
        <div className="mt-8 rounded-2xl border border-verdict-gray-200 bg-white p-6 text-center shadow-card sm:mx-auto sm:max-w-xl">
          <p className="font-medium text-verdict-gray-900">5-day free trial</p>
          <p className="mt-1 text-sm text-verdict-gray-600">
            Max 5 analyses per day during trial. No credit card required.
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
                  Pro
                </span>
              )}
              <h2 className={`${plan.highlighted ? "mt-3" : ""} text-xl font-semibold text-verdict-gray-900`}>
                {plan.name}
              </h2>
              <p className="mt-2 text-sm text-verdict-gray-600">{plan.description}</p>
              <p className="mt-6 text-3xl font-semibold text-verdict-gray-900">
                {plan.price} {plan.currency}
                <span className="text-base font-normal text-verdict-gray-500">{plan.period}</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm text-verdict-gray-700">
                {plan.features.map((f) => (
                  <li key={f}>✓ {f}</li>
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
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-verdict-gray-500">
          Secure payments via Stripe. Cancel anytime.
        </p>
      </main>
    </div>
  );
}

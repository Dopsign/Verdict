"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { createCheckoutSession } from "@/app/actions/stripe";
import Button from "@/components/ui/Button";

const PLANS = ["starter", "pro", "premium"] as const;

type Plan = (typeof PLANS)[number];

export function AccountPlanForm({ initialPlan }: { initialPlan?: string }) {
  const { t } = useI18n();
  const [plan, setPlan] = useState<Plan>(
    PLANS.includes((initialPlan as Plan) ?? "starter") ? (initialPlan as Plan) : "starter"
  );

  return (
    <form action={createCheckoutSession} className="space-y-4">
      <p className="text-sm font-medium text-verdict-gray-700">{t("account.choose.plan")}</p>
      <div className="flex flex-wrap gap-3">
        {PLANS.map((p) => (
          <label
            key={p}
            className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-smooth ${
              plan === p
                ? "border-verdict-red bg-verdict-red/5 text-verdict-red"
                : "border-verdict-gray-200 bg-white text-verdict-gray-700 hover:bg-verdict-gray-50"
            }`}
          >
            <input
              type="radio"
              name="plan"
              value={p}
              checked={plan === p}
              onChange={() => setPlan(p)}
              className="sr-only"
            />
            {t(`pricing.${p}`)}
          </label>
        ))}
      </div>
      <Button type="submit" size="lg">
        Subscribe with Stripe
      </Button>
      <p className="text-sm text-verdict-gray-500">
        {t("pricing.secure")}
      </p>
    </form>
  );
}

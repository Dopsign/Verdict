"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { UsageState } from "@/lib/usage";

interface DashboardClientProps {
  usage: UsageState;
}

export function DashboardClient({ usage }: DashboardClientProps) {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-verdict-gray-900 sm:text-3xl">
        {t("dashboard.title")}
      </h1>
      <p className="mt-1 text-verdict-gray-600">{t("dashboard.subtitle")}</p>

      {/* Usage & Plan — optimized layout */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
          <p className="text-sm font-medium text-verdict-gray-500">{t("dashboard.usage")}</p>
          {usage.isPaid ? (
            <>
              <p className="mt-2 text-lg font-semibold text-verdict-gray-900">
                {t("dashboard.unlimited")}
              </p>
              <p className="mt-1 text-sm text-verdict-gray-500">{t("dashboard.on.your.plan")}</p>
            </>
          ) : (
            <>
              <p className="mt-2 text-lg font-semibold text-verdict-gray-900">
                {t("dashboard.trial.day").replace("{day}", String(usage.trialDayNumber))}:{" "}
                {usage.analysesLeftToday === 0
                  ? t("dashboard.trial.used").replace("{used}", "1")
                  : t("dashboard.trial.remaining").replace("{remaining}", "1")}
              </p>
              <p className="mt-1 text-sm text-verdict-gray-500">
                {usage.trialDayNumber === 3 && usage.analysesLeftToday > 0
                  ? t("dashboard.trial.last")
                  : `${usage.trialDaysLeft} ${t("dashboard.days.left")}`}
              </p>
            </>
          )}
        </div>
        <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
          <p className="text-sm font-medium text-verdict-gray-500">{t("dashboard.plan")}</p>
          <p className="mt-2 text-lg font-semibold capitalize text-verdict-gray-900">
            {usage.profile?.subscription_status ?? t("dashboard.trial")}
          </p>
          <Link href="/pricing" className="mt-4 inline-block">
            <Button variant="secondary" size="sm">
              {t("dashboard.upgrade")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Reassuring message for trial users */}
      {!usage.isPaid && (
        <p className="mt-6 rounded-xl border border-verdict-gray-100 bg-verdict-gray-50 px-4 py-3 text-sm text-verdict-gray-600">
          {t("dashboard.trial.message")}
        </p>
      )}

      {/* Large CTA */}
      <div className="mt-10">
        <Link href="/analyze">
          <Button size="lg" className="w-full sm:w-auto sm:min-w-[200px]">
            {t("dashboard.analyze.cta")}
          </Button>
        </Link>
      </div>

      {/* Quick links */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/history"
          className="block rounded-2xl border border-verdict-gray-200 bg-white p-5 shadow-card transition-smooth hover:shadow-elevated hover:border-verdict-red/30"
        >
          <span className="font-semibold text-verdict-gray-900">{t("nav.history")}</span>
          <p className="mt-1 text-sm text-verdict-gray-500">
            {usage.profile?.subscription_status === "pro" || usage.profile?.subscription_status === "premium"
              ? t("dashboard.view.past")
              : t("dashboard.available.on.pro")}
          </p>
        </Link>
        <Link
          href="/account"
          className="block rounded-2xl border border-verdict-gray-200 bg-white p-5 shadow-card transition-smooth hover:shadow-elevated hover:border-verdict-red/30"
        >
          <span className="font-semibold text-verdict-gray-900">{t("dashboard.account.billing")}</span>
          <p className="mt-1 text-sm text-verdict-gray-500">{t("dashboard.manage.subscription")}</p>
        </Link>
      </div>
    </div>
  );
}

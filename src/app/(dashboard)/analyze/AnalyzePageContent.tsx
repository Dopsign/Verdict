"use client";

import { useI18n } from "@/lib/i18n/context";
import { AnalyzeForm } from "./AnalyzeForm";
import type { UsageState } from "@/lib/usage";

interface AnalyzePageContentProps {
  usage: UsageState;
}

export function AnalyzePageContent({ usage }: AnalyzePageContentProps) {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-verdict-gray-900 sm:text-3xl">
        {t("analyze.title")}
      </h1>
      <p className="mt-2 text-verdict-gray-600">{t("analyze.subtitle")}</p>
      <p className="mt-3 rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-xs text-verdict-gray-600 shadow-soft">
        {t("analyze.disclaimer")}
      </p>
      {!usage.isPaid && (
        <div className="mt-4 space-y-2">
          <p className="rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-sm text-verdict-gray-600 shadow-soft">
            {t("dashboard.trial.day").replace("{day}", String(usage.trialDayNumber))}:{" "}
            {usage.analysesLeftToday === 0
              ? t("dashboard.trial.used").replace("{used}", "1")
              : t("dashboard.trial.remaining").replace("{remaining}", "1")}
            {" · "}
            {usage.trialDaysLeft} {t("dashboard.days.left")}
          </p>
          <p className="text-xs text-verdict-gray-500 italic">{t("dashboard.trial.message")}</p>
        </div>
      )}
      <AnalyzeForm />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import Button from "@/components/ui/Button";

interface PaywallProps {
  reason?: "trial_ended" | "daily_limit" | "paywall";
}

export function Paywall({ reason = "paywall" }: PaywallProps) {
  const { t } = useI18n();

  const title =
    reason === "trial_ended"
      ? t("paywall.trial.ended")
      : reason === "daily_limit"
        ? t("paywall.daily.limit")
        : t("paywall.title");

  const body =
    reason === "trial_ended"
      ? t("paywall.upgrade")
      : reason === "daily_limit"
        ? t("paywall.come.back")
        : t("paywall.body");

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-verdict-gray-200 bg-white p-8 text-center shadow-card">
      <h2 className="text-xl font-semibold text-verdict-gray-900">{title}</h2>
      <p className="mt-3 text-verdict-gray-600">{body}</p>
      <Link href="/pricing" className="mt-6 inline-block">
        <Button size="lg">{t("paywall.view.plans")}</Button>
      </Link>
    </div>
  );
}

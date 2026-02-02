"use client";

import { useI18n } from "@/lib/i18n/context";
import { Paywall } from "@/components/Paywall";
import { AnalyzePageContent } from "./AnalyzePageContent";
import type { UsageState } from "@/lib/usage";

interface AnalyzePageWrapperProps {
  usage: UsageState;
}

export function AnalyzePageWrapper({ usage }: AnalyzePageWrapperProps) {
  const { t } = useI18n();

  if (!usage.canAnalyze) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-2xl font-semibold text-verdict-gray-900">
          {t("analyze.title")}
        </h1>
        <Paywall reason={usage.reason} />
      </div>
    );
  }

  return <AnalyzePageContent usage={usage} />;
}

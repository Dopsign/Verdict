"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { runAnalysis } from "@/app/actions/analyze";
import Button from "@/components/ui/Button";
import type { VerdictAnalysisResult } from "@/lib/types/analysis";
import { ResultDisplay } from "./ResultDisplay";

export function AnalyzeForm() {
  const router = useRouter();
  const { t } = useI18n();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VerdictAnalysisResult | null>(null);
  const [paywall, setPaywall] = useState(false);
  const [paywallReason, setPaywallReason] = useState<string | undefined>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setPaywall(false);
    if (!text.trim()) {
      setError(t("analyze.paste.required"));
      return;
    }
    setLoading(true);
    const res = await runAnalysis(text.trim());
    setLoading(false);
    if (res.paywall) {
      setPaywall(true);
      setPaywallReason(res.reason);
      router.refresh();
      return;
    }
    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.data) {
      setResult(res.data);
    }
  }

  return (
    <div className="mt-8 space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("analyze.placeholder")}
          rows={10}
          className="w-full resize-y rounded-2xl border border-verdict-gray-200 bg-white px-4 py-3 text-verdict-gray-900 placeholder-verdict-gray-400 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red shadow-soft"
          disabled={loading}
        />
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800">
            {error}
          </p>
        )}
        {paywall && (
          <p className="rounded-xl border border-verdict-red/30 bg-red-50 px-4 py-2.5 text-sm text-red-800">
            {paywallReason === "daily_limit"
              ? t("analyze.paywall.daily")
              : paywallReason === "trial_ended"
                ? t("analyze.paywall.trial")
                : t("analyze.paywall.generic")}
          </p>
        )}
        <Button type="submit" loading={loading} size="lg">
          {loading ? t("analyze.analyzing") : t("analyze.button")}
        </Button>
      </form>

      {result && <ResultDisplay result={result} inputText={text.trim()} />}
    </div>
  );
}

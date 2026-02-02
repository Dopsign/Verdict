"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { runAnalysis } from "@/app/actions/analyze";
import Button from "@/components/ui/Button";
import type { VerdictAnalysisResult } from "@/lib/types/analysis";
import { ResultDisplay } from "./ResultDisplay";

export function AnalyzeForm() {
  const router = useRouter();
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
      setError("Please paste some text to analyze.");
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
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your email, contract, or message here..."
          rows={10}
          className="w-full resize-y rounded-xl border border-white/20 bg-verdict-charcoal px-4 py-3 text-white placeholder-white/40 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
          disabled={loading}
        />
        {error && (
          <p className="rounded-lg border border-verdict-red/50 bg-verdict-red/10 px-4 py-2 text-sm text-red-300">
            {error}
          </p>
        )}
        {paywall && (
          <p className="rounded-lg border border-verdict-red/50 bg-verdict-red/10 px-4 py-2 text-sm text-red-300">
            {paywallReason === "daily_limit"
              ? "Daily limit reached. Upgrade or try again tomorrow."
              : paywallReason === "trial_ended"
                ? "Trial ended. Upgrade to continue."
                : "Please upgrade to continue."}
          </p>
        )}
        <Button type="submit" loading={loading} size="lg">
          Analyze
        </Button>
      </form>

      {result && <ResultDisplay result={result} />}
    </div>
  );
}

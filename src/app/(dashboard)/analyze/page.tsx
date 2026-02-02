import { createClient } from "@/lib/supabase/server";
import { getUsageState } from "@/lib/usage";
import { AnalyzeForm } from "./AnalyzeForm";
import { Paywall } from "@/components/Paywall";

export default async function AnalyzePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const usage = await getUsageState(user.id);

  if (!usage.canAnalyze) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-white">Analyze</h1>
        <Paywall reason={usage.reason} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-white">Analyze</h1>
      <p className="mb-8 text-white/60">
        Paste your email, contract, or message. VERDICT will return critical
        errors, risks, improvements, and a corrected version.
      </p>
      {!usage.isPaid && usage.analysesLeftToday >= 0 && (
        <p className="mb-4 rounded-lg border border-white/10 bg-verdict-charcoal/50 px-4 py-2 text-sm text-white/70">
          {usage.analysesLeftToday} of 5 analyses left today. Trial: {usage.trialDaysLeft} days left.
        </p>
      )}
      <AnalyzeForm />
    </div>
  );
}

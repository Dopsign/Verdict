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
        <h1 className="mb-8 text-2xl font-semibold text-verdict-gray-900">Analyze</h1>
        <Paywall reason={usage.reason} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-verdict-gray-900">Analyze</h1>
      <p className="mt-2 text-verdict-gray-600">
        Paste your email, contract, or message. VERDICT will return critical errors, risks, improvements, and a corrected version.
      </p>
      {!usage.isPaid && usage.analysesLeftToday >= 0 && (
        <p className="mt-4 rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-sm text-verdict-gray-600 shadow-soft">
          {usage.analysesLeftToday} of 5 analyses left today · Trial: {usage.trialDaysLeft} days left
        </p>
      )}
      <AnalyzeForm />
    </div>
  );
}

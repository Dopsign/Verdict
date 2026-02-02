import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { VerdictAnalysisResult } from "@/lib/types/analysis";

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  const isPro = profile?.subscription_status === "pro";

  if (!isPro) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-2 text-3xl font-bold text-white">History</h1>
        <p className="mb-8 text-white/60">
          Analysis history is available on the Pro plan.
        </p>
        <Card className="border-white/10">
          <p className="text-white/80">
            Upgrade to Pro to save and browse all your past analyses.
          </p>
          <Link href="/pricing" className="mt-4 inline-block">
            <Button>View Pro</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const { data: analyses, error } = await supabase
    .from("analyses")
    .select("id, input_text, output_json, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-white">History</h1>
        <p className="text-red-400">Failed to load history.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-white">History</h1>
      <p className="mb-8 text-white/60">
        Your past analyses (Pro).
      </p>

      {!analyses?.length ? (
        <Card>
          <p className="text-white/70">No analyses yet. Run one from the Analyze page.</p>
          <Link href="/analyze" className="mt-4 inline-block">
            <Button>Analyze</Button>
          </Link>
        </Card>
      ) : (
        <ul className="space-y-4">
          {analyses.map((a) => {
            const output = a.output_json as VerdictAnalysisResult;
            const preview = a.input_text.slice(0, 120) + (a.input_text.length > 120 ? "…" : "");
            const date = new Date(a.created_at).toLocaleDateString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            });
            return (
              <li key={a.id}>
                <Link
                  href={`/history/${a.id}`}
                  className="block rounded-xl border border-white/10 bg-verdict-charcoal/50 p-4 transition-smooth hover:border-white/20"
                >
                  <p className="text-sm text-white/50">{date}</p>
                  <p className="mt-2 line-clamp-2 text-white/90">{preview}</p>
                  {output?.criticalErrors?.length > 0 && (
                    <span className="mt-2 inline-block text-xs text-red-400">
                      {output.criticalErrors.length} critical
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

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

  const hasHistory =
    profile?.subscription_status === "pro" ||
    profile?.subscription_status === "premium";

  if (!hasHistory) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold text-verdict-gray-900">History</h1>
        <p className="mt-2 text-verdict-gray-600">
          Analysis history is available on Pro or Premium.
        </p>
        <Card className="mt-8">
          <p className="text-verdict-gray-700">
            Upgrade to Pro or Premium to save and browse all your past analyses.
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
        <h1 className="mb-8 text-2xl font-semibold text-verdict-gray-900">History</h1>
        <p className="text-red-600">Failed to load history.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-verdict-gray-900">History</h1>
      <p className="mt-2 text-verdict-gray-600">
        Your past analyses (Pro / Premium).
      </p>

      {!analyses?.length ? (
        <Card className="mt-8">
          <p className="text-verdict-gray-700">No analyses yet. Run one from the Analyze page.</p>
          <Link href="/analyze" className="mt-4 inline-block">
            <Button>Analyze</Button>
          </Link>
        </Card>
      ) : (
        <ul className="mt-8 space-y-4">
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
                  className="block rounded-2xl border border-verdict-gray-200 bg-white p-5 shadow-card transition-smooth hover:shadow-elevated"
                >
                  <p className="text-sm text-verdict-gray-500">{date}</p>
                  <p className="mt-2 line-clamp-2 text-verdict-gray-900">{preview}</p>
                  {(output?.potentialRisks?.length > 0 || output?.antiScamFlags?.length > 0) && (
                    <span className="mt-2 inline-block text-xs text-red-600">
                      {(output.potentialRisks?.length ?? 0) + (output.antiScamFlags?.length ?? 0)} risk(s)
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

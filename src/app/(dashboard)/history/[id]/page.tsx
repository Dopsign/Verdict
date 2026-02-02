import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { VerdictAnalysisResult } from "@/lib/types/analysis";

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: row, error } = await supabase
    .from("analyses")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !row) notFound();

  const result = row.output_json as VerdictAnalysisResult;

  const date = new Date(row.created_at).toLocaleDateString(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/history" className="text-sm text-verdict-gray-500 hover:text-verdict-gray-900">
            ← History
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-verdict-gray-900">Analysis</h1>
          <p className="mt-1 text-sm text-verdict-gray-500">{date}</p>
        </div>
        <Link href="/analyze">
          <Button variant="secondary" size="sm">
            New analysis
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <Card>
          <h3 className="mb-2 font-semibold text-verdict-gray-900">Original text</h3>
          <div className="whitespace-pre-wrap rounded-xl border border-verdict-gray-200 bg-verdict-gray-50 p-4 text-sm text-verdict-gray-900">
            {row.input_text}
          </div>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <h3 className="mb-2 flex items-center gap-2 font-semibold text-red-700">
            ❌ Critical Errors
          </h3>
          {result?.criticalErrors?.length ? (
            <ul className="list-inside list-disc space-y-1 text-sm text-red-900">
              {result.criticalErrors.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-verdict-gray-500">None.</p>
          )}
        </Card>

        <Card className="border-amber-200 bg-amber-50/50">
          <h3 className="mb-2 flex items-center gap-2 font-semibold text-amber-800">
            ⚠️ Risks
          </h3>
          {result?.risks?.length ? (
            <ul className="list-inside list-disc space-y-1 text-sm text-amber-900">
              {result.risks.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-verdict-gray-500">None.</p>
          )}
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <h3 className="mb-2 flex items-center gap-2 font-semibold text-green-800">
            ✅ Improvements
          </h3>
          {result?.improvements?.length ? (
            <ul className="list-inside list-disc space-y-1 text-sm text-green-900">
              {result.improvements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-verdict-gray-500">None.</p>
          )}
        </Card>

        <Card>
          <h3 className="mb-2 flex items-center gap-2 font-semibold text-verdict-gray-900">
            ✍️ Corrected Version
          </h3>
          <div className="whitespace-pre-wrap rounded-xl border border-verdict-gray-200 bg-verdict-gray-50 p-4 text-sm text-verdict-gray-900">
            {result?.correctedVersion ?? "—"}
          </div>
        </Card>
      </div>
    </div>
  );
}

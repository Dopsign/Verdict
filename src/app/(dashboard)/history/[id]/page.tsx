import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { VerdictAnalysisResult } from "@/lib/types/analysis";
import { HistoryDetailClient } from "./HistoryDetailClient";

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
  const inputText = row.input_text as string;

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

      <HistoryDetailClient result={result} inputText={inputText} />
    </div>
  );
}

"use client";

import { Card } from "@/components/ui/Card";
import type { VerdictAnalysisResult } from "@/lib/types/analysis";

/** Extended type for backward compatibility with old analyses (criticalErrors, risks, improvements, correctedVersion) */
type AnyResult = VerdictAnalysisResult & {
  criticalErrors?: string[];
  risks?: string[];
  improvements?: string[];
  correctedVersion?: string;
};

function isNewFormat(result: AnyResult): result is VerdictAnalysisResult {
  return "whatMessageAbout" in result && typeof result.whatMessageAbout === "string";
}

interface HistoryDetailClientProps {
  result: AnyResult;
  inputText: string;
}

export function HistoryDetailClient({ result, inputText }: HistoryDetailClientProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-verdict-gray-200 bg-verdict-gray-50 px-4 py-3 text-xs text-verdict-gray-600">
        <strong>Disclaimer:</strong> VERDICT is NOT a lawyer and does NOT provide legal advice. This analysis is for
        informational purposes only.
      </div>

      <Card>
        <h3 className="mb-2 font-semibold text-verdict-gray-900">Original text</h3>
        <div className="whitespace-pre-wrap rounded-xl border border-verdict-gray-200 bg-verdict-gray-50 p-4 text-sm text-verdict-gray-900">
          {inputText}
        </div>
      </Card>

      {isNewFormat(result) ? (
        <>
          <Card>
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-verdict-gray-900">🧾 What this message is about</h3>
            <p className="text-sm text-verdict-gray-700">{result.whatMessageAbout || "—"}</p>
          </Card>

          <Card className="border-red-100 bg-red-50/30">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-red-700">❌ Potential risks</h3>
            {result.potentialRisks?.length ? (
              <ul className="list-inside list-disc space-y-1 text-sm text-red-900">
                {result.potentialRisks.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-verdict-gray-500">None.</p>
            )}
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-amber-800">⚠️ What to be careful about</h3>
            {result.beCarefulAbout?.length ? (
              <ul className="list-inside list-disc space-y-1 text-sm text-amber-900">
                {result.beCarefulAbout.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-verdict-gray-500">None.</p>
            )}
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-800">🛡️ Your rights</h3>
            {result.yourRights?.length ? (
              <ul className="list-inside list-disc space-y-1 text-sm text-blue-900">
                {result.yourRights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-verdict-gray-500">None identified.</p>
            )}
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-green-800">✅ Recommended next steps</h3>
            {result.recommendedSteps?.length ? (
              <ul className="list-inside list-disc space-y-1 text-sm text-green-900">
                {result.recommendedSteps.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-verdict-gray-500">None.</p>
            )}
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-red-800">🚫 What NOT to do</h3>
            {result.whatNotToDo?.length ? (
              <ul className="list-inside list-disc space-y-1 text-sm text-red-900">
                {result.whatNotToDo.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-verdict-gray-500">None.</p>
            )}
          </Card>

          {result.scamDetected && result.antiScamFlags?.length ? (
            <Card className="border-orange-300 bg-orange-50">
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-orange-800">🛑 Anti-scam: detected red flags</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-orange-900">
                {result.antiScamFlags.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Card>
          ) : null}
        </>
      ) : (
        /* Old format */
        <>
          <Card className="border-red-200 bg-red-50/50">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-red-700">❌ Critical Errors</h3>
            {result.criticalErrors?.length ? (
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
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-amber-800">⚠️ Risks</h3>
            {result.risks?.length ? (
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
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-green-800">✅ Improvements</h3>
            {result.improvements?.length ? (
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
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-verdict-gray-900">✍️ Corrected Version</h3>
            <div className="whitespace-pre-wrap rounded-xl border border-verdict-gray-200 bg-verdict-gray-50 p-4 text-sm text-verdict-gray-900">
              {result.correctedVersion ?? "—"}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

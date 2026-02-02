"use client";

import type { VerdictAnalysisResult } from "@/lib/types/analysis";
import { Card } from "@/components/ui/Card";

interface ResultDisplayProps {
  result: VerdictAnalysisResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const { criticalErrors, risks, improvements, correctedVersion } = result;

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-verdict-gray-900">Your verdict</h2>

      {/* 1. Critical Errors — red */}
      <Card className="border-red-200 bg-red-50/50">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-700">
          <span>❌</span> Critical Errors
        </h3>
        {criticalErrors.length === 0 ? (
          <p className="text-sm text-verdict-gray-500">None detected.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-red-900">
            {criticalErrors.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* 2. Risks — orange */}
      <Card className="border-amber-200 bg-amber-50/50">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-amber-800">
          <span>⚠️</span> Risks
        </h3>
        {risks.length === 0 ? (
          <p className="text-sm text-verdict-gray-500">None detected.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-amber-900">
            {risks.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* 3. Improvements — green */}
      <Card className="border-green-200 bg-green-50/50">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-800">
          <span>✅</span> Improvements
        </h3>
        {improvements.length === 0 ? (
          <p className="text-sm text-verdict-gray-500">None suggested.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-green-900">
            {improvements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* 4. Corrected Version — copy-ready box */}
      <Card>
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-verdict-gray-900">
          <span>✍️</span> Corrected Version
        </h3>
        <div className="whitespace-pre-wrap rounded-xl border border-verdict-gray-200 bg-verdict-gray-50 p-4 text-sm text-verdict-gray-900">
          {correctedVersion || "No changes suggested."}
        </div>
      </Card>
    </div>
  );
}

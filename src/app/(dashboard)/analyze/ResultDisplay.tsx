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
      <h2 className="text-xl font-bold text-white">Your verdict</h2>

      {/* 1. Critical Errors */}
      <Card className="border-red-500/30">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-400">
          <span>❌</span> Critical Errors
        </h3>
        {criticalErrors.length === 0 ? (
          <p className="text-sm text-white/60">None detected.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-white/90">
            {criticalErrors.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* 2. Risks */}
      <Card className="border-amber-500/30">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-amber-400">
          <span>⚠️</span> Risks
        </h3>
        {risks.length === 0 ? (
          <p className="text-sm text-white/60">None detected.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-white/90">
            {risks.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* 3. Improvements */}
      <Card className="border-green-500/30">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-400">
          <span>✅</span> Improvements
        </h3>
        {improvements.length === 0 ? (
          <p className="text-sm text-white/60">None suggested.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-white/90">
            {improvements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* 4. Corrected Version */}
      <Card>
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-white">
          <span>✍️</span> Corrected Version
        </h3>
        <div className="whitespace-pre-wrap rounded-lg border border-white/10 bg-verdict-black/50 p-4 text-sm text-white/90">
          {correctedVersion || "No changes suggested."}
        </div>
      </Card>
    </div>
  );
}

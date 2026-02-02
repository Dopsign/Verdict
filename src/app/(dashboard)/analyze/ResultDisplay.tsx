"use client";

import { useState } from "react";
import type { VerdictAnalysisResult, ReplyType } from "@/lib/types/analysis";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { generateReply } from "@/app/actions/generateReply";

interface ResultDisplayProps {
  result: VerdictAnalysisResult;
  inputText: string;
}

const REPLY_LABELS: Record<ReplyType, string> = {
  safe: "Generate a safe reply",
  firm: "Generate a firm reply",
  neutral: "Generate a neutral reply",
  clarification: "Ask for clarification reply",
};

export function ResultDisplay({ result, inputText }: ResultDisplayProps) {
  const {
    whatMessageAbout,
    potentialRisks,
    beCarefulAbout,
    yourRights,
    recommendedSteps,
    whatNotToDo,
    antiScamFlags = [],
    scamDetected = false,
  } = result;

  const [generatedReply, setGeneratedReply] = useState<string | null>(null);
  const [loadingReplyType, setLoadingReplyType] = useState<ReplyType | null>(null);
  const [replyError, setReplyError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const analysisSummary = [
    whatMessageAbout && `Summary: ${whatMessageAbout}`,
    potentialRisks.length > 0 && `Risks: ${potentialRisks.join("; ")}`,
    recommendedSteps.length > 0 && `Next steps: ${recommendedSteps.join("; ")}`,
    scamDetected && antiScamFlags.length > 0 && `Scam flags: ${antiScamFlags.join("; ")}`,
  ]
    .filter(Boolean)
    .join("\n");

  async function handleGenerateReply(type: ReplyType) {
    setReplyError(null);
    setGeneratedReply(null);
    setLoadingReplyType(type);
    const res = await generateReply(inputText, type, analysisSummary);
    setLoadingReplyType(null);
    if (res.error) {
      setReplyError(res.error);
      return;
    }
    if (res.reply) {
      setGeneratedReply(res.reply);
    }
  }

  /** Normalize text for Gmail: plain text, proper line breaks, no extra chars */
  function normalizeForEmail(text: string): string {
    return text
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/^#+\s*/gm, "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]+$/gm, "")
      .trim();
  }

  async function handleCopy(text: string) {
    const clean = normalizeForEmail(text);
    await navigator.clipboard.writeText(clean);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-verdict-gray-900">Your verdict</h2>

      {/* Disclaimer */}
      <div className="rounded-xl border border-verdict-gray-200 bg-verdict-gray-50 px-4 py-3 text-xs text-verdict-gray-600">
        <strong>Disclaimer:</strong> VERDICT is NOT a lawyer and does NOT provide legal advice. This analysis is for
        informational purposes only. For legal matters, consult a qualified professional.
      </div>

      {/* 1. What this message is about */}
      <Card>
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-verdict-gray-900">
          <span>🧾</span> What this message is about
        </h3>
        <p className="text-sm text-verdict-gray-700">{whatMessageAbout || "Could not determine."}</p>
      </Card>

      {/* 2. Potential risks */}
      <Card className="border-red-100 bg-red-50/30">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-700">
          <span>❌</span> Potential risks
        </h3>
        {potentialRisks.length === 0 ? (
          <p className="text-sm text-verdict-gray-500">None detected.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-red-900">
            {potentialRisks.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* 3. What to be careful about */}
      <Card className="border-amber-200 bg-amber-50/50">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-amber-800">
          <span>⚠️</span> What to be careful about
        </h3>
        {beCarefulAbout.length === 0 ? (
          <p className="text-sm text-verdict-gray-500">None noted.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-amber-900">
            {beCarefulAbout.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* 4. Your rights */}
      <Card className="border-blue-200 bg-blue-50/50">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-blue-800">
          <span>🛡️</span> Your rights (general, informational — not legal advice)
        </h3>
        {yourRights.length === 0 ? (
          <p className="text-sm text-verdict-gray-500">None identified.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-blue-900">
            {yourRights.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* 5. Recommended next steps */}
      <Card className="border-green-200 bg-green-50/50">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-800">
          <span>✅</span> Recommended next steps
        </h3>
        {recommendedSteps.length === 0 ? (
          <p className="text-sm text-verdict-gray-500">None suggested.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-green-900">
            {recommendedSteps.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* 6. What NOT to do */}
      <Card className="border-red-200 bg-red-50/50">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-800">
          <span>🚫</span> What NOT to do
        </h3>
        {whatNotToDo.length === 0 ? (
          <p className="text-sm text-verdict-gray-500">None noted.</p>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-red-900">
            {whatNotToDo.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </Card>

      {/* Anti-scam flags */}
      {scamDetected && antiScamFlags.length > 0 && (
        <Card className="border-orange-300 bg-orange-50">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-orange-800">
            <span>🛑</span> Anti-scam: detected red flags
          </h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-orange-900">
            {antiScamFlags.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* Response Generator */}
      <Card>
        <h3 className="mb-3 font-semibold text-verdict-gray-900">Response Generator</h3>
        <p className="mb-4 text-sm text-verdict-gray-600">
          Generate a reply that you can copy and send. Choose the tone that fits your situation.
        </p>
        <div className="flex flex-wrap gap-2">
          {(["safe", "firm", "neutral", "clarification"] as ReplyType[]).map((type) => (
            <Button
              key={type}
              variant="secondary"
              size="sm"
              onClick={() => handleGenerateReply(type)}
              disabled={!!loadingReplyType}
            >
              {loadingReplyType === type ? "Generating…" : REPLY_LABELS[type]}
            </Button>
          ))}
        </div>
        {replyError && (
          <p className="mt-3 text-sm text-red-600">{replyError}</p>
        )}
        {generatedReply && (
          <div className="mt-4 space-y-3">
            <p className="text-sm font-medium text-verdict-gray-700">Generated reply — click to copy:</p>
            <button
              type="button"
              onClick={() => handleCopy(generatedReply)}
              className={`group w-full cursor-pointer rounded-xl border p-4 text-left text-sm text-verdict-gray-900 transition-smooth hover:border-verdict-red hover:bg-white focus:outline-none focus:ring-2 focus:ring-verdict-red focus:ring-offset-2 ${
                copied ? "border-green-400 bg-green-50" : "border-verdict-gray-200 bg-verdict-gray-50"
              }`}
              title="Click to copy — paste in Gmail"
            >
              <div className="whitespace-pre-wrap">{generatedReply}</div>
              <p className={`mt-3 text-xs font-medium ${copied ? "text-green-700" : "text-verdict-gray-500 group-hover:text-verdict-red"}`}>
                {copied ? "✓ Copied! Paste in Gmail — formatting preserved." : "↓ One click = copy. Paste in Gmail."}
              </p>
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}

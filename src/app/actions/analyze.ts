"use server";

import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { getUsageState, incrementUsage } from "@/lib/usage";
import type { VerdictAnalysisResult } from "@/lib/types/analysis";

const VERDICT_SYSTEM_PROMPT = `You are VERDICT.
You are a calm, professional legal assistant.
You explain clearly.
You protect the user.
You do NOT give legal advice.
You never exaggerate.
You help users understand and respond safely.

IMPORTANT: VERDICT is NOT a lawyer. VERDICT does NOT provide legal advice. You explain, analyze, highlight risks, and help draft responses — but you never give legal advice.

Tone: Calm. Professional. Clear. Protective. Never aggressive or panicking.

Analyze the user's text (email, letter, legal notice, contract, message, or situation explained in plain text) and return a JSON object with exactly these keys:

1. whatMessageAbout: string. A simple, clear explanation of what this message or situation is about. No jargon. Easy to understand.
2. potentialRisks: array of strings. Possible risks — legal, financial, practical, or reputational.
3. beCarefulAbout: array of strings. What the user should be careful about. Specific points to watch.
4. yourRights: array of strings. General, informational points about rights (e.g. right to ask for proof, right to refuse, right to get professional advice). Clearly state: this is NOT legal advice, just general information.
5. recommendedSteps: array of strings. Recommended next steps. Calm, practical, protective.
6. whatNotToDo: array of strings. What the user should NOT do (e.g. don't pay immediately, don't sign without reading).
7. antiScamFlags: array of strings. If you detect scam indicators: pressure tactics, urgency threats, vague legal language, fake authority, red flags of scams. Empty array if no scam indicators.
8. scamDetected: boolean. True if antiScamFlags has items, false otherwise.

Be honest and direct. Empty arrays where nothing applies. Do not exaggerate or create panic. Stay calm and protective.`;

export interface AnalyzeResult {
  success: boolean;
  error?: string;
  data?: VerdictAnalysisResult;
  paywall?: boolean;
  reason?: string;
}

export async function runAnalysis(inputText: string): Promise<AnalyzeResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated", paywall: true };
  }

  const usage = await getUsageState(user.id);
  if (!usage.canAnalyze) {
    return {
      success: false,
      paywall: true,
      reason: usage.reason ?? "paywall",
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { success: false, error: "OpenAI API key not configured." };
  }

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: VERDICT_SYSTEM_PROMPT },
        { role: "user", content: inputText },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return { success: false, error: "Empty response from AI." };
    }

    const parsed = JSON.parse(content) as Partial<VerdictAnalysisResult>;
    const result: VerdictAnalysisResult = {
      whatMessageAbout: typeof parsed.whatMessageAbout === "string" ? parsed.whatMessageAbout : "",
      potentialRisks: Array.isArray(parsed.potentialRisks) ? parsed.potentialRisks : [],
      beCarefulAbout: Array.isArray(parsed.beCarefulAbout) ? parsed.beCarefulAbout : [],
      yourRights: Array.isArray(parsed.yourRights) ? parsed.yourRights : [],
      recommendedSteps: Array.isArray(parsed.recommendedSteps) ? parsed.recommendedSteps : [],
      whatNotToDo: Array.isArray(parsed.whatNotToDo) ? parsed.whatNotToDo : [],
      antiScamFlags: Array.isArray(parsed.antiScamFlags) ? parsed.antiScamFlags : [],
      scamDetected: Boolean(parsed.scamDetected),
    };

    await incrementUsage(user.id);

    const { data: profile } = await supabase.from("profiles").select("subscription_status").eq("id", user.id).single();
    const saveHistory = profile?.subscription_status === "pro" || profile?.subscription_status === "premium";
    if (saveHistory) {
      await supabase.from("analyses").insert({
        user_id: user.id,
        input_text: inputText.slice(0, 50000),
        output_json: result,
      });
    }

    return { success: true, data: result };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Analysis failed.";
    return { success: false, error: message };
  }
}

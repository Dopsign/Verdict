"use server";

import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { getUsageState, incrementUsage } from "@/lib/usage";
import type { VerdictAnalysisResult } from "@/lib/types/analysis";

const VERDICT_SYSTEM_PROMPT = `You are VERDICT.
You are calm, precise, and protective.
You speak like a senior expert.
You do not exaggerate.
You exist to prevent mistakes.

Tone: Professional. Clear. Confident. Never arrogant.

Analyze the user's text (email, contract, decision, message) and return a JSON object with exactly these keys:
- criticalErrors: array of strings. Legal/financial/commitment errors, wrong numbers, missing obligations, tone that could get them sued or fired.
- risks: array of strings. Possible misunderstandings, unclear terms, reputational or relationship risks.
- improvements: array of strings. Style, clarity, grammar, professionalism improvements.
- correctedVersion: string. A single corrected, improved version of the full text. If no changes needed, return the original text.

Be honest and direct. Empty arrays where nothing applies. No sugarcoating.`;

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

    const parsed = JSON.parse(content) as VerdictAnalysisResult;
    const result: VerdictAnalysisResult = {
      criticalErrors: Array.isArray(parsed.criticalErrors) ? parsed.criticalErrors : [],
      risks: Array.isArray(parsed.risks) ? parsed.risks : [],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
      correctedVersion: typeof parsed.correctedVersion === "string" ? parsed.correctedVersion : inputText,
    };

    await incrementUsage(user.id);

    // Save to history (Pro and Premium: history + priority)
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

"use server";

import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { getUsageState, incrementUsage } from "@/lib/usage";
import type { ReplyType } from "@/lib/types/analysis";

const REPLY_SYSTEM_PROMPT = `You are VERDICT.
You are a calm, professional legal assistant.
You help users draft responses that are: calm, professional, non-aggressive, and protective of the user.
You do NOT give legal advice.
You draft replies that help the user communicate safely.

IMPORTANT: VERDICT is NOT a lawyer. You are helping draft a reply — this is not legal advice.

When generating a reply, follow these rules:
- Be calm and professional
- Never aggressive or threatening
- Protective of the user
- Clear and easy to understand
- Suitable for the chosen tone (safe, firm, neutral, or asking for clarification)

Return ONLY the reply text. No preamble, no explanation, no JSON — just the text the user can copy and send.

FORMAT FOR EMAIL (Gmail, etc.):
- Plain text only. No markdown, no ** or # or bullets.
- Use double line break (blank line) between paragraphs.
- Use single line break within a paragraph only when needed for clarity.
- No trailing spaces. No extra blank lines at start or end.
- The result must paste correctly into Gmail with proper formatting.`;

const REPLY_TYPE_INSTRUCTIONS: Record<ReplyType, string> = {
  safe: "Generate a safe, cautious reply. Acknowledge receipt, avoid committing to anything, and suggest the user will review or seek advice before responding fully. Protective and non-committal.",
  firm: "Generate a firm but professional reply. Be clear about boundaries, deadlines, and expectations. Assertive but not aggressive. Calm and respectful.",
  neutral: "Generate a neutral reply. Factual, balanced, neither aggressive nor overly accommodating. Professional and measured.",
  clarification: "Generate a reply that asks for clarification. Request specific details, documents, or explanations. Polite but thorough. Help the user get more information before making decisions.",
};

export interface GenerateReplyResult {
  success: boolean;
  error?: string;
  reply?: string;
  paywall?: boolean;
  reason?: string;
}

export async function generateReply(
  inputText: string,
  replyType: ReplyType,
  analysisSummary?: string
): Promise<GenerateReplyResult> {
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

  const userPrompt = analysisSummary
    ? `Original message/situation:\n${inputText}\n\nAnalysis summary (for context):\n${analysisSummary}\n\n${REPLY_TYPE_INSTRUCTIONS[replyType]}\n\nGenerate the reply:`
    : `Original message/situation:\n${inputText}\n\n${REPLY_TYPE_INSTRUCTIONS[replyType]}\n\nGenerate the reply:`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: REPLY_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });

    let reply = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!reply) {
      return { success: false, error: "Empty response from AI." };
    }

    // Normalize for Gmail: strip markdown, fix line breaks
    reply = reply
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/^#+\s*/gm, "")
      .replace(/^-\s*/gm, "• ")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]+$/gm, "")
      .trim();

    await incrementUsage(user.id);

    return { success: true, reply };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Reply generation failed.";
    return { success: false, error: message };
  }
}

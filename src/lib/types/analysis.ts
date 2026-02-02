/** New legal-assistant structure (6-point analysis + anti-scam) */
export interface VerdictAnalysisResult {
  /** 1. Simple explanation of what the message is about */
  whatMessageAbout: string;
  /** 2. Potential risks */
  potentialRisks: string[];
  /** 3. What to be careful about */
  beCarefulAbout: string[];
  /** 4. Your rights (general, non-legal, informational) */
  yourRights: string[];
  /** 5. Recommended next steps */
  recommendedSteps: string[];
  /** 6. What NOT to do */
  whatNotToDo: string[];
  /** Anti-scam: detected pressure tactics, urgency, vague legal language, fake authority, scam red flags */
  antiScamFlags?: string[];
  /** Anti-scam: whether scam indicators were detected */
  scamDetected?: boolean;
}

/** Reply types for the Response Generator */
export type ReplyType = "safe" | "firm" | "neutral" | "clarification";

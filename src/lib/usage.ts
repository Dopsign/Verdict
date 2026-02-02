import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types/database";

const TRIAL_DAYS = 5;
const TRIAL_DAILY_LIMIT = 5;
/** Starter plan: limited analyses per day */
const STARTER_DAILY_LIMIT = 20;

export interface UsageState {
  canAnalyze: boolean;
  reason?: "trial_ended" | "daily_limit" | "paywall";
  profile: Profile | null;
  trialDaysLeft: number;
  analysesLeftToday: number;
  isPaid: boolean;
}

/**
 * Resets daily_usage_count if 24h has passed since daily_usage_reset_at.
 * Call this before checking limits.
 */
export async function ensureDailyReset(profile: Profile): Promise<Profile | null> {
  const supabase = await createClient();
  const now = new Date();
  const resetAt = profile.daily_usage_reset_at
    ? new Date(profile.daily_usage_reset_at)
    : null;

  if (resetAt && now >= resetAt) {
    const nextReset = new Date(now);
    nextReset.setHours(nextReset.getHours() + 24);

    const { data, error } = await supabase
      .from("profiles")
      .update({
        daily_usage_count: 0,
        daily_usage_reset_at: nextReset.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq("id", profile.id)
      .select()
      .single();

    if (error) return profile;
    return data as Profile;
  }

  return profile;
}

/**
 * Returns current usage state for the authenticated user.
 * Use this to decide whether to allow analysis or show paywall.
 */
export async function getUsageState(userId: string): Promise<UsageState> {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    return {
      canAnalyze: false,
      reason: "paywall",
      profile: null,
      trialDaysLeft: 0,
      analysesLeftToday: 0,
      isPaid: false,
    };
  }

  const p = (await ensureDailyReset(profile as Profile)) ?? (profile as Profile);
  const isPaid =
    p.subscription_status === "starter" ||
    p.subscription_status === "pro" ||
    p.subscription_status === "premium";

  if (isPaid) {
    // Starter: limited per day; Pro & Premium: unlimited
    if (p.subscription_status === "starter") {
      const left = Math.max(0, STARTER_DAILY_LIMIT - p.daily_usage_count);
      return {
        canAnalyze: left > 0,
        reason: left === 0 ? "daily_limit" : undefined,
        profile: p as Profile,
        trialDaysLeft: 0,
        analysesLeftToday: left,
        isPaid: true,
      };
    }
    return {
      canAnalyze: true,
      profile: p as Profile,
      trialDaysLeft: 0,
      analysesLeftToday: -1, // unlimited (Pro & Premium)
      isPaid: true,
    };
  }

  // Free trial
  const trialStart = p.trial_start_date ? new Date(p.trial_start_date) : new Date();
  const trialEnd = new Date(trialStart);
  trialEnd.setDate(trialEnd.getDate() + TRIAL_DAYS);
  const now = new Date();
  const trialExpired = now > trialEnd;
  const trialDaysLeft = Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)));
  const analysesLeftToday = Math.max(0, TRIAL_DAILY_LIMIT - p.daily_usage_count);
  const dailyLimitReached = p.daily_usage_count >= TRIAL_DAILY_LIMIT;

  if (trialExpired) {
    return {
      canAnalyze: false,
      reason: "trial_ended",
      profile: p as Profile,
      trialDaysLeft: 0,
      analysesLeftToday: 0,
      isPaid: false,
    };
  }

  if (dailyLimitReached) {
    return {
      canAnalyze: false,
      reason: "daily_limit",
      profile: p as Profile,
      trialDaysLeft,
      analysesLeftToday: 0,
      isPaid: false,
    };
  }

  return {
    canAnalyze: true,
    profile: p as Profile,
    trialDaysLeft,
    analysesLeftToday,
    isPaid: false,
  };
}

/**
 * Increment usage after a successful analysis. Call only when analysis succeeded.
 */
export async function incrementUsage(userId: string): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { error } = await supabase.rpc("increment_usage", { p_user_id: userId });
  if (error) {
    // Fallback: manual update if RPC doesn't exist yet
    const { data: profile } = await supabase.from("profiles").select("daily_usage_count, total_usage").eq("id", userId).single();
    if (profile) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          daily_usage_count: (profile.daily_usage_count ?? 0) + 1,
          total_usage: (profile.total_usage ?? 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
      return { error: updateError?.message ?? null };
    }
    return { error: error.message };
  }
  return { error: null };
}

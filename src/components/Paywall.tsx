import Link from "next/link";
import Button from "@/components/ui/Button";

interface PaywallProps {
  reason?: "trial_ended" | "daily_limit" | "paywall";
}

const messages: Record<string, { title: string; body: string }> = {
  trial_ended: {
    title: "Your trial has ended",
    body: "Your 5-day free trial is over. Upgrade to continue analyzing with no daily limits.",
  },
  daily_limit: {
    title: "Daily limit reached",
    body: "You've used your 5 analyses for today. Upgrade for unlimited analyses, or come back tomorrow — your limit resets every 24 hours.",
  },
  paywall: {
    title: "Upgrade to continue",
    body: "Subscribe to unlock unlimited analyses, history, and more. Cancel anytime.",
  },
};

export function Paywall({ reason = "paywall" }: PaywallProps) {
  const { title, body } = messages[reason] ?? messages.paywall;

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-verdict-gray-200 bg-white p-8 text-center shadow-card">
      <h2 className="text-xl font-semibold text-verdict-gray-900">{title}</h2>
      <p className="mt-3 text-verdict-gray-600">{body}</p>
      <Link href="/pricing" className="mt-6 inline-block">
        <Button size="lg">View plans</Button>
      </Link>
    </div>
  );
}

import Link from "next/link";
import Button from "@/components/ui/Button";

interface PaywallProps {
  reason?: "trial_ended" | "daily_limit" | "paywall";
}

const messages: Record<string, { title: string; body: string }> = {
  trial_ended: {
    title: "Trial ended",
    body: "Your 5-day free trial is over. Upgrade to continue analyzing.",
  },
  daily_limit: {
    title: "Daily limit reached",
    body: "You've used your 5 analyses for today. Upgrade for unlimited analyses, or come back tomorrow.",
  },
  paywall: {
    title: "Upgrade to continue",
    body: "Subscribe to unlock unlimited analyses and more.",
  },
};

export function Paywall({ reason = "paywall" }: PaywallProps) {
  const { title, body } = messages[reason] ?? messages.paywall;

  return (
    <div className="mx-auto max-w-md rounded-xl border border-verdict-red/30 bg-verdict-charcoal/90 p-8 text-center">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-white/70">{body}</p>
      <Link href="/pricing" className="mt-6 inline-block">
        <Button size="lg">View plans</Button>
      </Link>
    </div>
  );
}

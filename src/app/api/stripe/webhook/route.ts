import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder");

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "whsec_placeholder";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig || !webhookSecret || webhookSecret.includes("placeholder")) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.supabase_user_id;
      const plan = sub.metadata?.plan ?? (sub.items.data[0]?.price?.id === process.env.STRIPE_PRICE_PRO ? "pro" : "starter");
      if (userId && ["active", "trialing"].includes(sub.status)) {
        await supabaseAdmin
          .from("profiles")
          .update({
            subscription_status: plan,
            stripe_subscription_id: sub.id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.supabase_user_id;
      if (userId) {
        await supabaseAdmin
          .from("profiles")
          .update({
            subscription_status: "free",
            stripe_subscription_id: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

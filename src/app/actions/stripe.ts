"use server";

import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";
import { redirect } from "next/navigation";

// Stripe keys: use env placeholders. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in production.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder");

const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER ?? "price_placeholder_starter",
  pro: process.env.STRIPE_PRICE_PRO ?? "price_placeholder_pro",
};

export async function createCheckoutSession(formData: FormData) {
  const plan = (formData.get("plan") as string) ?? "starter";
  const priceId = PRICE_IDS[plan as keyof typeof PRICE_IDS] ?? PRICE_IDS.starter;

  // If Stripe is not configured, redirect to pricing with message
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("placeholder")) {
    redirect("/account?stripe=not_configured");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id ?? null;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
    await supabase
      .from("profiles")
      .update({
        stripe_customer_id: customerId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/account?success=1`,
    cancel_url: `${origin}/pricing`,
    metadata: {
      supabase_user_id: user.id,
      plan,
    },
    subscription_data: {
      metadata: { supabase_user_id: user.id, plan },
    },
  });

  if (session.url) redirect(session.url);
  redirect("/account?error=checkout");
}

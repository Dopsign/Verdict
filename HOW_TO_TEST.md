# How to test VERDICT

This document explains how to test the free trial, Stripe payments, subscription access, and how to verify that everything works correctly.

---

## Tester sans payer (mode test Stripe)

**Aucun vrai paiement.** En mode test Stripe, aucune carte n’est débitée. Vous vérifiez que tout fonctionne et que le « client » (l’utilisateur) est satisfait sans payer réellement.

### Ce qu’il faut faire

1. **Utiliser les clés de test Stripe**
   - Dans le [Dashboard Stripe](https://dashboard.stripe.com), assurez-vous d’être en **mode Test** (interrupteur en haut à droite).
   - Utilisez `sk_test_...` et les **Price ID** des produits créés en mode test dans `.env.local`.
   - Aucun argent réel ne circule.

2. **Simuler un paiement**
   - Connectez-vous sur votre site (ou créez un compte).
   - Allez sur **Tarifs** ou **Compte** → choisissez un plan (ex. Pro) → **S’abonner avec Stripe**.
   - Sur la page Stripe Checkout, utilisez la **carte de test** :  
     `4242 4242 4242 4242`  
     Date d’expiration : n’importe quelle date future (ex. 12/34), CVC : n’importe quel 3 chiffres.
   - Validez le paiement. Vous êtes redirigé vers `/account?success=1`.

3. **Vérifier que « vous recevez » (côté vous)**
   - **Stripe Dashboard (mode Test)** : **Clients** → votre utilisateur test ; **Abonnements** → abonnement actif pour le bon plan.
   - **Webhook** : Dans Stripe → **Développeurs → Webhooks**, ouvrez votre endpoint et vérifiez que les événements `customer.subscription.created` / `updated` sont envoyés (et en vert = reçus).
   - **Base de données** : Dans Supabase, table **profiles**, pour l’utilisateur concerné : `subscription_status` = `starter` / `pro` / `premium` et `stripe_subscription_id` rempli.  
   → Si c’est le cas, votre backend « reçoit » bien l’abonnement.

4. **Vérifier que le client est satisfait (côté utilisateur)**
   - **Page Compte** : le plan affiché est **Pro** (ou Starter / Premium selon le choix).
   - **Dashboard** : plus de message « fin de trial » ; pour Pro/Premium : accès illimité aux analyses.
   - **Analyser** : les analyses fonctionnent (illimité pour Pro/Premium).
   - **Historique** : pour Pro/Premium, la page Historique est accessible et affiche les analyses passées.
   - **Portail Stripe** : « Ouvrir le portail client Stripe » permet de gérer l’abonnement (annuler, changer carte) comme un vrai client.

En résumé : **mode test Stripe + carte 4242... = tout tester sans payer. Vous voyez les abonnements dans Stripe et Supabase, et l’utilisateur voit le bon plan et les bons accès.**

---

## Prerequisites

- `.env.local` filled with real values (see `.env.example` and README).
- Supabase: migrations applied (`001_initial_schema.sql` and `002_add_premium_tier.sql`).
- Stripe: test mode keys, 3 products/prices (Starter, Pro, Premium), webhook configured.

---

## 1. How to test the free trial

1. **Start the app:** `npm run dev` and open [http://localhost:3000](http://localhost:3000).
2. **Sign up:** Use **Start free trial** or **Sign up** with a new email (e.g. a test address). Complete sign-up.
3. **Check trial state:**
   - Go to **Dashboard**. You should see:
     - “Free trial” and “X days left” (or “X analyses left today”).
     - “5 analyses per day” during trial.
4. **Use analyses:**
   - Go to **Analyze**, paste some text (e.g. an email), submit.
   - You should get a verdict (errors, risks, improvements, corrected version).
   - After each analysis, the usage counter on the dashboard should update (e.g. “4 left today”).
5. **Hit daily limit (optional):**
   - Run 5 analyses in the same day. The 6th should show the paywall (e.g. “Daily limit reached” or “Upgrade to continue”).
6. **Trial expiry (optional):**
   - In Supabase, edit the `profiles` row for your user: set `trial_start_date` to 6 days ago. Reload the app; you should see “Trial ended” and be prompted to subscribe.

**Success:** New users get 5 days of trial and 5 analyses per day; usage is visible and the paywall appears when the limit is reached or the trial has ended.

---

## 2. How to test Stripe payments

1. **Stripe test mode:** Use Stripe **test** keys (`sk_test_...`, `pk_test_...`) and test price IDs in `.env.local`.
2. **Create 3 products in Stripe:**
   - **Starter** — e.g. 9.99 CHF/month recurring → copy **Price ID** → `STRIPE_PRICE_STARTER`
   - **Pro** — e.g. 19.99 CHF/month recurring → copy **Price ID** → `STRIPE_PRICE_PRO`
   - **Premium** — e.g. 39.99 CHF/month recurring → copy **Price ID** → `STRIPE_PRICE_PREMIUM`
3. **Checkout:**
   - Log in as a user on **free** (trial ended or new account).
   - Go to **Pricing** or **Account**.
   - Choose a plan (Starter, Pro, or Premium) and click the subscribe button (e.g. “Get Pro” or “Subscribe with Stripe”).
   - You should be redirected to Stripe Checkout. Use test card `4242 4242 4242 4242`, any future expiry, any CVC, any billing details.
   - Complete payment. You should be redirected back to `/account?success=1`.
4. **Verify in Stripe Dashboard:**
   - **Customers:** Your test user should appear.
   - **Subscriptions:** An active subscription for the chosen plan (Starter, Pro, or Premium).

**Success:** Checkout opens, payment succeeds, and you are redirected back to the account page with a success message.

---

## 3. How to verify subscription access

1. **After a successful Stripe test payment:**
   - **Account page:** “Current plan” should show **starter**, **pro**, or **premium** (not “free”).
   - **Dashboard:** No trial message; for Pro/Premium you may see “Unlimited” or similar; for Starter, “X analyses left today” with the Starter daily limit (e.g. 20).
2. **Starter plan:**
   - **Analyze** works; usage is limited per day (e.g. 20). After that, paywall/daily limit message.
   - **History:** Should not have access (or see “Upgrade to Pro or Premium”).
3. **Pro or Premium plan:**
   - **Analyze** works with no daily cap (unlimited).
   - **History:** Full access to past analyses; list and detail pages work.
4. **Billing portal:**
   - On **Account**, click “Open Stripe Customer Portal”. You should land on Stripe’s portal where you can update payment method or cancel. Cancelling should trigger the webhook and set the user back to **free** (see below).

**Success:** Plan shown on Account matches Stripe; Analyze and History access match the plan (Starter: limited analyses, no history; Pro/Premium: unlimited analyses + history).

---

## 4. How to know everything works correctly

### 4.1 Webhook (subscription status in database)

1. **Stripe Dashboard → Developers → Webhooks:** Your endpoint (e.g. `https://your-domain.com/api/stripe/webhook`) should receive events.
2. **When a subscription is created/updated:** The webhook handler should set `profiles.subscription_status` to `starter`, `pro`, or `premium` for the correct user (via `metadata.supabase_user_id` or price ID).
3. **When a subscription is cancelled:** The webhook should set `subscription_status` back to `free` and clear `stripe_subscription_id`.
4. **Check in Supabase:** After checkout, open **Table Editor → profiles** and confirm the user’s `subscription_status` and `stripe_subscription_id` are updated. After cancelling in the portal, confirm `subscription_status` is `free`.

### 4.2 End-to-end checklist

- [ ] **Landing:** Hero, trust, problem, solution, what VERDICT analyzes, AI transparency, example, pricing (3 plans CHF), security, FAQ, footer with legal and contact links.
- [ ] **Auth:** Sign up, log in, sign out; redirects and session work.
- [ ] **Trial:** 5 days, 5 analyses/day; counters and paywall behave as above.
- [ ] **Analyze:** Paste text → verdict (errors, risks, improvements, corrected version); usage increments; paywall when limit or trial ended.
- [ ] **Pricing:** 3 plans (Starter 9.99 CHF, Pro 19.99 CHF, Premium 39.99 CHF); links to signup/account with plan param.
- [ ] **Account:** Plan selector (Starter / Pro / Premium), “Subscribe with Stripe”, redirect to Checkout; after payment, plan shown and “Open Stripe Customer Portal” works.
- [ ] **History:** Only for Pro and Premium; list and detail load; free/Starter see upgrade message.
- [ ] **Contact:** Form (nom, prénom, objet, cela concerne quoi) sends to support@verdictonline.ch (requires Resend configured).
- [ ] **Legal:** Privacy, Terms (CGV), No refund policy pages and footer links work.
- [ ] **Stripe:** Checkout and portal work; webhook updates `profiles.subscription_status`; cancellation sets user back to free.

### 4.3 Quick local test (no Stripe)

- Sign up → use 5 analyses → see paywall when daily limit reached.
- In Supabase, set `profiles.subscription_status` to `pro` for your user → reload; History should be accessible and analyses unlimited.

---

## Summary

| What to test        | How |
|---------------------|-----|
| **Free trial**      | Sign up, run analyses, check counters and paywall at 5/day or after trial end. |
| **Stripe payments** | Use test card on Checkout for Starter/Pro/Premium; confirm redirect and success message. |
| **Subscription**   | Account shows correct plan; Starter = limited analyses, no history; Pro/Premium = unlimited + history. |
| **Webhook**         | After subscribe/cancel, check Stripe webhook logs and `profiles.subscription_status` in Supabase. |

If all of the above pass, the trial, payments, and access control are working as intended.

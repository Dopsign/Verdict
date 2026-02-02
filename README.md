# VERDICT

AI-powered error and risk detector. Prevents costly mistakes before users send emails, sign contracts, or make decisions.

- **Tech:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase, OpenAI, Stripe
- **Trial:** 5 days free, max 5 analyses per day
- **Plans:** Starter (9.99 CHF, limited usage), Pro (19.99 CHF, unlimited + history + priority), Premium (39.99 CHF, unlimited + advanced + priority support)

---

## Testing

See **[HOW_TO_TEST.md](./HOW_TO_TEST.md)** for:

- How to test the free trial (5 days, 5 analyses/day, paywall).
- How to test Stripe payments (Checkout, test card, 3 plans).
- How to verify subscription access (Starter vs Pro vs Premium).
- How to confirm webhooks and that everything works end-to-end.

---

## Quick start

```bash
npm install
cp .env.example .env.local
# Fill in .env.local (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 1. How to add your OpenAI API key

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys).
2. In `.env.local` set:
   ```env
   OPENAI_API_KEY=sk-your-actual-key
   ```
3. Restart the dev server. Analysis uses `gpt-4o-mini` by default (edit `src/app/actions/analyze.ts` to change model).

---

## 2. How to add your Supabase keys

1. Create a project at [Supabase](https://supabase.com).
2. In **Project Settings → API** copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (used only for Stripe webhook; keep secret)
3. In `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```
4. Run the database migrations (in order):
   - In Supabase Dashboard go to **SQL Editor**.
   - Run `supabase/migrations/001_initial_schema.sql` (creates `profiles`, `analyses`, RLS, trigger, `increment_usage` RPC).
   - Run `supabase/migrations/002_add_premium_tier.sql` (adds `premium` to subscription_status).

---

## 3. How to connect your Stripe account

1. Create a [Stripe](https://stripe.com) account and get **Secret key** (test) from **Developers → API keys**.
2. In `.env.local`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   ```
3. Create three products/prices in Stripe (e.g. CHF recurring):
   - **Starter** (e.g. 9.99 CHF/mo) → copy **Price ID** → `STRIPE_PRICE_STARTER`
   - **Pro** (e.g. 19.99 CHF/mo) → copy **Price ID** → `STRIPE_PRICE_PRO`
   - **Premium** (e.g. 39.99 CHF/mo) → copy **Price ID** → `STRIPE_PRICE_PREMIUM`
4. Webhook (so subscription status updates in Supabase):
   - **Developers → Webhooks → Add endpoint**
   - URL: `https://your-domain.com/api/stripe/webhook` (use your Vercel URL in production)
   - Events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`
5. In production, set `STRIPE_WEBHOOK_SECRET` in Vercel env and use your live keys when going live.

---

## 4. How to deploy to Vercel

1. Push the repo to GitHub (or GitLab/Bitbucket).
2. Go to [Vercel](https://vercel.com) → **Add New Project** → import the repo.
3. **Framework preset:** Next.js. **Root directory:** `.` (or leave default).
4. **Environment variables:** Add every variable from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-app.vercel.app`
   - Supabase URL and keys
   - OpenAI API key
   - Stripe keys and price IDs
   - Stripe webhook URL: `https://your-app.vercel.app/api/stripe/webhook`
5. Deploy. After first deploy, add the webhook URL in Stripe and set `STRIPE_WEBHOOK_SECRET`.
6. In Supabase **Authentication → URL Configuration**, set **Site URL** to your Vercel URL and add `https://your-app.vercel.app/auth/callback` to **Redirect URLs**.

---

## Logo

The site uses a built-in logo (red shield + VERDICT wordmark) that works on light backgrounds. To use your own logo image (e.g. the one with dark background), place `logo.png` in `public/` and you can reference it with `<Image src="/logo.png" />` in the hero or footer. For the nav on a light background, the current Logo component uses dark text; for a dark hero strip you could use the image.

---

## Project structure

- `src/app/` — App Router pages and routes
- `src/app/actions/` — Server actions (auth, analyze, stripe)
- `src/app/(dashboard)/` — Protected dashboard, analyze, history, account
- `src/components/` — UI and layout components
- `src/lib/` — Supabase client, usage/trial logic, types
- `supabase/migrations/` — SQL schema and RPC

---

## License

Private / use as you like.

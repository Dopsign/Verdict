# VERDICT

AI-powered error and risk detector. Prevents costly mistakes before users send emails, sign contracts, or make decisions.

- **Tech:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase, OpenAI, Stripe
- **Trial:** 5 days free, max 5 analyses per day
- **Plans:** Starter (unlimited analyses), Pro (unlimited + history + priority)

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
4. Run the database migration:
   - In Supabase Dashboard go to **SQL Editor**.
   - Paste and run the contents of `supabase/migrations/001_initial_schema.sql`.
   - This creates `profiles`, `analyses`, RLS, trigger for new users, and `increment_usage` RPC.

---

## 3. How to connect your Stripe account

1. Create a [Stripe](https://stripe.com) account and get **Secret key** (test) from **Developers → API keys**.
2. In `.env.local`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   ```
3. Create two products/prices in Stripe:
   - **Starter** (e.g. $9/mo recurring) → copy **Price ID** (e.g. `price_xxx`) → `STRIPE_PRICE_STARTER`
   - **Pro** (e.g. $19/mo recurring) → copy **Price ID** → `STRIPE_PRICE_PRO`
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

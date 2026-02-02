import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Logo } from "@/components/Logo";
import { createClient } from "@/lib/supabase/server";

const sectionClass = "px-4 py-16 sm:px-6 sm:py-20";
const containerClass = "mx-auto max-w-5xl";
const headingClass = "text-2xl font-semibold text-verdict-gray-900 sm:text-3xl";
const subtextClass = "mt-3 text-verdict-gray-600";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white">
      <Nav authenticated={!!user} email={user?.email ?? null} />

      <main>
        {/* SECTION 1 — HERO (full-screen) */}
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(211,47,47,0.06),transparent)]" />
          <div className={`relative ${containerClass} text-center`}>
            <div className="flex justify-center">
              <Logo href="/" className="mb-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-verdict-gray-900 sm:text-5xl md:text-6xl">
              Before you send it — get a VERDICT.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-verdict-gray-600 sm:text-xl">
              VERDICT is an AI legal assistant that explains, analyzes, highlights risks, and helps you draft responses — especially when you can&apos;t afford a lawyer.
            </p>
            <p className="mx-auto mt-4 max-w-xl rounded-xl border border-verdict-gray-200 bg-verdict-off-white px-4 py-3 text-sm text-verdict-gray-600">
              <strong>VERDICT is NOT a lawyer</strong> and does <strong>NOT provide legal advice</strong>. We explain, analyze, highlight risks, and help draft responses — for informational use only.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={user ? "/analyze" : "/auth/signup"}
                className="inline-flex items-center justify-center rounded-xl bg-verdict-red px-8 py-3.5 text-lg font-semibold text-white shadow-soft transition-smooth hover:bg-verdict-red-hover focus:outline-none focus:ring-2 focus:ring-verdict-red focus:ring-offset-2"
              >
                Start free trial
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-verdict-gray-200 bg-white px-8 py-3.5 text-lg font-semibold text-verdict-gray-700 transition-smooth hover:bg-verdict-gray-50"
              >
                See how it works
              </a>
            </div>
            <p className="mt-6 text-sm text-verdict-gray-500">
              5-day free trial • 5 analyses per day • Cancel anytime
            </p>
          </div>
        </section>

        {/* SECTION 2 — SOCIAL PROOF */}
        <section className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <div className="flex flex-wrap items-center justify-center gap-8 text-center">
              <div>
                <p className="text-sm font-medium text-verdict-gray-500">Average rating</p>
                <p className="mt-1 text-2xl font-semibold text-verdict-gray-900">4.9/5</p>
                <p className="text-sm text-verdict-gray-500">★★★★★</p>
              </div>
              <div>
                <p className="text-sm font-medium text-verdict-gray-500">Trusted by</p>
                <p className="mt-1 text-2xl font-semibold text-verdict-gray-900">12,000+ professionals</p>
                <p className="text-sm text-verdict-gray-500">worldwide</p>
              </div>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {["Founders", "Agencies", "Consultants", "Freelancers"].map((label) => (
                <div key={label} className="rounded-2xl border border-verdict-gray-200 bg-white py-6 text-center shadow-card">
                  <p className="text-sm font-medium text-verdict-gray-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <blockquote className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card">
                <p className="text-verdict-gray-700">&quot;I run every important email through VERDICT. It caught a commitment I would have missed.&quot;</p>
                <p className="mt-4 text-sm text-verdict-gray-500">— Founder, B2B SaaS</p>
              </blockquote>
              <blockquote className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card">
                <p className="text-verdict-gray-700">&quot;Clear, no fluff. Tells me exactly what&apos;s risky and why. Saved me more than once.&quot;</p>
                <p className="mt-4 text-sm text-verdict-gray-500">— Consultant</p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* SECTION 3 — THE PROBLEM */}
        <section id="problem" className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>The problem</h2>
            <p className={`mx-auto max-w-2xl text-center ${subtextClass}`}>
              Real mistakes happen when we move too fast or under pressure.
            </p>
            <ul className="mx-auto mt-12 max-w-2xl space-y-4 text-verdict-gray-700">
              <li className="flex gap-3">
                <span className="text-verdict-red">•</span>
                People send emails too fast — and regret tone or commitments later.
              </li>
              <li className="flex gap-3">
                <span className="text-verdict-red">•</span>
                People sign contracts they don&apos;t fully understand — and miss clauses that matter.
              </li>
              <li className="flex gap-3">
                <span className="text-verdict-red">•</span>
                People make decisions under pressure — and costly mistakes are often irreversible.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 4 — THE SOLUTION */}
        <section id="how-it-works" className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>The solution</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              No buzzwords. Only real value.
            </p>
            <div className="mt-16 grid gap-10 sm:grid-cols-3">
              <div className="text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-verdict-red/10 text-verdict-red font-semibold">1</span>
                <h3 className="mt-4 font-semibold text-verdict-gray-900">Paste your text</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">Email, letter, contract, legal notice, or situation.</p>
              </div>
              <div className="text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-verdict-blue/10 text-verdict-blue font-semibold">2</span>
                <h3 className="mt-4 font-semibold text-verdict-gray-900">Get a clear analysis</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">Risks, what to watch for, your rights, next steps, what to avoid. Anti-scam detection.</p>
              </div>
              <div className="text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-verdict-gray-200 text-verdict-gray-700 font-semibold">3</span>
                <h3 className="mt-4 font-semibold text-verdict-gray-900">Generate a safe reply</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">Safe, firm, neutral, or ask-for-clarification — copy and send with confidence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4b — USE CASES */}
        <section id="use-cases" className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>How VERDICT helps</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              Calm guidance when you need it.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
                <h3 className="font-semibold text-verdict-gray-900">Received a scary email?</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">Paste it. VERDICT explains what it means, highlights risks, and helps you draft a calm, safe reply. No panic language.</p>
              </div>
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
                <h3 className="font-semibold text-verdict-gray-900">Unsure about a contract?</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">VERDICT breaks it down in plain language. Points out unclear terms and risks. Helps you ask for clarification. Not legal advice — guidance.</p>
              </div>
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
                <h3 className="font-semibold text-verdict-gray-900">Being pressured to pay?</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">Anti-scam mode detects pressure tactics, urgency threats, vague legal language, and fake authority. Helps you stay calm and protect yourself.</p>
              </div>
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
                <h3 className="font-semibold text-verdict-gray-900">Afraid of being scammed?</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">VERDICT flags red flags — pressure, fake urgency, unclear terms. Explains your rights. Recommends next steps. Protective, not panicking.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — WHAT VERDICT ANALYZES */}
        <section className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>What VERDICT analyzes</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              Emails, letters, legal notices, contracts, messages, or situations explained in plain text.
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Emails",
                "Letters",
                "Legal notices",
                "Contracts",
                "Sensitive messages",
                "Situations (plain text)",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-verdict-gray-200 bg-white p-5 shadow-card transition-smooth hover:shadow-elevated">
                  <p className="font-medium text-verdict-gray-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — HOW THE AI THINKS (TRANSPARENCY) */}
        <section className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>How VERDICT works</h2>
            <p className={`mx-auto max-w-2xl text-center ${subtextClass}`}>
              VERDICT explains, analyzes, highlights risks, and helps draft responses. It does NOT give legal advice — it guides you safely.
            </p>
            <ul className="mx-auto mt-12 max-w-2xl space-y-4 text-verdict-gray-700">
              <li className="flex gap-3 rounded-xl border border-verdict-gray-200 bg-white p-4 shadow-soft">
                <span className="text-verdict-blue font-semibold">→</span>
                Explains what the message is about in plain language.
              </li>
              <li className="flex gap-3 rounded-xl border border-verdict-gray-200 bg-white p-4 shadow-soft">
                <span className="text-verdict-blue font-semibold">→</span>
                Highlights risks, what to be careful about, and your rights (general, informational — not legal advice).
              </li>
              <li className="flex gap-3 rounded-xl border border-verdict-gray-200 bg-white p-4 shadow-soft">
                <span className="text-verdict-blue font-semibold">→</span>
                Anti-scam mode: detects pressure tactics, urgency threats, vague legal language, fake authority, scam red flags.
              </li>
              <li className="flex gap-3 rounded-xl border border-verdict-gray-200 bg-white p-4 shadow-soft">
                <span className="text-verdict-blue font-semibold">→</span>
                Response Generator: safe, firm, neutral, or ask-for-clarification — calm, professional, protective replies you can copy.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 7 — EXAMPLE OUTPUT */}
        <section className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>Example output</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              Realistic. No marketing fluff.
            </p>
            <div className="mt-12 space-y-6 rounded-2xl border border-verdict-gray-200 bg-verdict-gray-50 p-6 sm:p-8">
              <div>
                <p className="text-sm font-medium text-verdict-gray-500">Input text</p>
                <p className="mt-2 rounded-xl border border-verdict-gray-200 bg-white p-4 text-sm text-verdict-gray-800">
                  &quot;I agree to the terms and will pay the full amount by next week. Looking forward to working together.&quot;
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-verdict-gray-700">🧾 What this message is about</p>
                <p className="mt-2 text-sm text-verdict-gray-700">A commitment to pay, but the amount and date are vague.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-red-700">❌ Potential risks</p>
                <p className="mt-2 text-sm text-verdict-gray-700">Vague commitment — which amount? which date? No reference to a contract or invoice.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-amber-700">⚠️ What to be careful about</p>
                <p className="mt-2 text-sm text-verdict-gray-700">Specify amount, date, and reference (e.g. invoice #) before agreeing.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">🛡️ Your rights (general, informational)</p>
                <p className="mt-2 text-sm text-verdict-gray-700">You have the right to ask for proof and clarification. Not legal advice.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">✅ Recommended next steps</p>
                <p className="mt-2 text-sm text-verdict-gray-700">Ask for a specific invoice, amount, and deadline in writing.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-red-700">🚫 What NOT to do</p>
                <p className="mt-2 text-sm text-verdict-gray-700">Don&apos;t pay without written confirmation. Don&apos;t sign or agree until terms are clear.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-verdict-gray-900">Response Generator</p>
                <p className="mt-2 text-sm text-verdict-gray-700">Generate a safe, firm, neutral, or ask-for-clarification reply — copy and send.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 — WHO IT'S FOR */}
        <section className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>Who it&apos;s for</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              Anyone who needs calm, protective guidance — especially people who cannot afford a lawyer.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {["People who can't afford a lawyer", "Freelancers", "Small business owners", "Consumers", "Anyone unsure about a message"].map((role) => (
                <span key={role} className="rounded-xl border border-verdict-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-verdict-gray-700 shadow-soft">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9 — WHY PEOPLE STAY */}
        <section className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>Why people stay subscribed</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              It becomes part of how they work.
            </p>
            <ul className="mx-auto mt-12 max-w-xl space-y-4 text-verdict-gray-700">
              <li className="flex gap-3">• Daily habit — run important messages through VERDICT before sending.</li>
              <li className="flex gap-3">• Peace of mind — fewer &quot;I wish I hadn&apos;t said that&quot; moments.</li>
              <li className="flex gap-3">• Confidence before sending — especially for contracts and commitments.</li>
              <li className="flex gap-3">• Avoiding regret — catch errors before they cost money or relationships.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 10 — PRICING (3 plans CHF) */}
        <section id="pricing" className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>Pricing</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              Very clear. Monthly only. Cancel anytime. Secure payment via Stripe.
            </p>
            <div className="mt-8 rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card sm:mx-auto sm:max-w-lg text-center">
              <p className="font-semibold text-verdict-gray-900">5-day free trial</p>
              <p className="mt-1 text-sm text-verdict-gray-600">5 analyses per day • No credit card required.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card">
                <p className="font-semibold text-verdict-gray-900">Starter</p>
                <p className="mt-2 text-2xl font-semibold text-verdict-gray-900">9.99 CHF<span className="text-base font-normal text-verdict-gray-500">/mo</span></p>
                <ul className="mt-4 space-y-2 text-sm text-verdict-gray-600">
                  <li>Limited usage</li>
                  <li>Personal use</li>
                  <li>Email support</li>
                </ul>
                <Link href={user ? "/account?plan=starter" : "/auth/signup?plan=starter"} className="mt-6 block">
                  <span className="inline-flex w-full justify-center rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-verdict-gray-700 transition-smooth hover:bg-verdict-gray-50">Get Starter</span>
                </Link>
              </div>
              <div className="rounded-2xl border-2 border-verdict-red/30 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold text-verdict-red">Pro</p>
                <p className="mt-2 font-semibold text-verdict-gray-900">Pro</p>
                <p className="mt-2 text-2xl font-semibold text-verdict-gray-900">19.99 CHF<span className="text-base font-normal text-verdict-gray-500">/mo</span></p>
                <ul className="mt-4 space-y-2 text-sm text-verdict-gray-600">
                  <li>Unlimited analyses</li>
                  <li>History</li>
                  <li>Priority processing</li>
                </ul>
                <Link href={user ? "/account?plan=pro" : "/auth/signup?plan=pro"} className="mt-6 block">
                  <span className="inline-flex w-full justify-center rounded-xl bg-verdict-red px-4 py-2.5 text-sm font-semibold text-white transition-smooth hover:bg-verdict-red-hover">Get Pro</span>
                </Link>
              </div>
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card">
                <p className="font-semibold text-verdict-gray-900">Premium</p>
                <p className="mt-2 text-2xl font-semibold text-verdict-gray-900">39.99 CHF<span className="text-base font-normal text-verdict-gray-500">/mo</span></p>
                <ul className="mt-4 space-y-2 text-sm text-verdict-gray-600">
                  <li>Unlimited</li>
                  <li>Advanced analysis</li>
                  <li>Priority support</li>
                  <li>Early features</li>
                </ul>
                <Link href={user ? "/account?plan=premium" : "/auth/signup?plan=premium"} className="mt-6 block">
                  <span className="inline-flex w-full justify-center rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-verdict-gray-700 transition-smooth hover:bg-verdict-gray-50">Get Premium</span>
                </Link>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-verdict-gray-500">
              Secure payments via Stripe. Cancel anytime.
            </p>
          </div>
        </section>

        {/* SECTION 11 — SECURITY & PRIVACY */}
        <section className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>Security & privacy</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              Your data is not sold. We use industry-standard practices.
            </p>
            <ul className="mx-auto mt-12 max-w-xl space-y-3 text-sm text-verdict-gray-700">
              <li>• Data is not sold. Ever.</li>
              <li>• Secure infrastructure and industry-standard encryption.</li>
              <li>• Payments via Stripe — we don&apos;t store your card details.</li>
              <li>• Privacy-first mindset. We only use your content to run the analysis.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 12 — FAQ */}
        <section className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>FAQ</h2>
            <div className="mt-12 space-y-6">
              {[
                {
                  q: "Is VERDICT a lawyer? Does it give legal advice?",
                  a: "No. VERDICT is NOT a lawyer and does NOT provide legal advice. It explains, analyzes, highlights risks, and helps draft responses — for informational use only. For legal matters, consult a qualified professional.",
                },
                {
                  q: "Can I trust the AI?",
                  a: "VERDICT is designed to be calm, transparent, and protective. It explains why it flags something and suggests alternatives. Use it as a second pair of eyes, not as legal authority.",
                },
                {
                  q: "What happens after the trial?",
                  a: "After 5 days, you can subscribe to Starter or Pro. If you don't subscribe, you won't be charged. You can still create an account and upgrade later.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Yes. Cancel from your account. No questions asked. You keep access until the end of your billing period.",
                },
                {
                  q: "Is my data safe?",
                  a: "We use secure infrastructure and encryption. Your content is used only to run the analysis. We don't sell your data.",
                },
              ].map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card">
                  <h3 className="font-semibold text-verdict-gray-900">{faq.q}</h3>
                  <p className="mt-2 text-sm text-verdict-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 13 — FINAL CTA */}
        <section className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={`${containerClass} text-center`}>
            <h2 className={headingClass}>Get your verdict before it matters.</h2>
            <p className={`mx-auto mt-4 max-w-lg ${subtextClass}`}>
              Start your 5-day free trial. No credit card required.
            </p>
            <Link
              href={user ? "/analyze" : "/auth/signup"}
              className="mt-8 inline-flex rounded-xl bg-verdict-red px-8 py-3.5 text-lg font-semibold text-white shadow-soft transition-smooth hover:bg-verdict-red-hover"
            >
              Start free trial
            </Link>
          </div>
        </section>

        {/* SECTION 14 — FOOTER (legal) */}
        <footer className="border-t border-verdict-gray-200 bg-verdict-near-black py-16 text-white">
          <div className={`${containerClass} px-4`}>
            <div className="rounded-xl border border-verdict-gray-700 bg-verdict-gray-800/50 p-4 mb-10 text-xs text-verdict-gray-400">
              <strong className="text-verdict-gray-300">Disclaimer:</strong> VERDICT is NOT a lawyer and does NOT provide legal advice. VERDICT explains, analyzes, highlights risks, and helps draft responses — for informational purposes only. For legal matters, consult a qualified professional.
            </div>
            <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Logo href="/" textWhite />
                <p className="mt-2 text-sm text-verdict-gray-400">
                  Before you send it — get a verdict.
                </p>
                <p className="mt-4 text-sm text-verdict-gray-500">VERDICT · AI legal assistant · Built with care</p>
              </div>
              <div className="flex flex-wrap gap-8 text-sm">
                <div>
                  <p className="font-medium text-white">Product</p>
                  <Link href="/pricing" className="mt-2 block text-verdict-gray-400 hover:text-white">Pricing</Link>
                  <Link href="/auth/login" className="mt-1 block text-verdict-gray-400 hover:text-white">Log in</Link>
                </div>
                <div>
                  <p className="font-medium text-white">Legal</p>
                  <Link href="/legal/privacy" className="mt-2 block text-verdict-gray-400 hover:text-white">Privacy Policy</Link>
                  <Link href="/legal/terms" className="mt-1 block text-verdict-gray-400 hover:text-white">Terms & Conditions (CGV)</Link>
                  <Link href="/legal/refund" className="mt-1 block text-verdict-gray-400 hover:text-white">No refund policy</Link>
                </div>
                <div>
                  <p className="font-medium text-white">Contact</p>
                  <Link href="/contact" className="mt-2 block text-verdict-gray-400 hover:text-white">Contact</Link>
                  <a href="mailto:support@verdictonline.ch" className="mt-1 block text-verdict-gray-400 hover:text-white">support@verdictonline.ch</a>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-verdict-gray-700 pt-8 text-sm text-verdict-gray-500">
              © VERDICT. VERDICT is NOT a lawyer. Secure payments via Stripe. Cancel anytime.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

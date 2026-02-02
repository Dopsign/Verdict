import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Logo } from "@/components/Logo";
import { createClient } from "@/lib/supabase/server";
import { getLocaleFromCookies, getServerTranslation } from "@/lib/i18n/server";

const sectionClass = "px-4 py-16 sm:px-6 sm:py-20";
const containerClass = "mx-auto max-w-5xl";
const headingClass = "text-2xl font-semibold text-verdict-gray-900 sm:text-3xl";
const subtextClass = "mt-3 text-verdict-gray-600";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const locale = await getLocaleFromCookies();
  const t = getServerTranslation(locale);

  return (
    <div className="min-h-screen bg-white">
      <Nav authenticated={!!user} email={user?.email ?? null} />

      <main>
        {/* SECTION 1 — HERO (full-screen) */}
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-verdict-gray-50/80 to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.04),transparent)]" />
          <div className={`relative ${containerClass} text-center`}>
            <div className="flex justify-center">
              <Logo href="/" className="mb-10" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-verdict-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-verdict-gray-600 sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <p className="mx-auto mt-4 max-w-xl rounded-xl border border-verdict-gray-200 bg-verdict-off-white px-4 py-3 text-sm text-verdict-gray-600">
              {t("hero.disclaimer")}
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={user ? "/analyze" : "/auth/signup"}
                className="inline-flex items-center justify-center rounded-xl bg-verdict-gray-900 px-8 py-3.5 text-lg font-semibold text-white shadow-premium transition-smooth hover:bg-verdict-gray-800 focus:outline-none focus:ring-2 focus:ring-verdict-gray-900 focus:ring-offset-2"
              >
                {t("hero.cta.trial")}
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border-2 border-verdict-gray-200 bg-white px-8 py-3.5 text-lg font-semibold text-verdict-gray-700 transition-smooth hover:border-verdict-gray-300 hover:bg-verdict-gray-50"
              >
                {t("hero.cta.how")}
              </a>
            </div>
            <p className="mt-6 text-sm text-verdict-gray-500">
              {t("hero.trial.info")}
            </p>
          </div>
        </section>

        {/* SECTION 2 — SOCIAL PROOF */}
        <section className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <div className="flex flex-wrap items-center justify-center gap-8 text-center">
              <div>
                <p className="text-sm font-medium text-verdict-gray-500">{t("social.rating")}</p>
                <p className="mt-1 text-2xl font-semibold text-verdict-gray-900">4.9/5</p>
                <p className="text-sm text-verdict-gray-500">★★★★★</p>
              </div>
              <div>
                <p className="text-sm font-medium text-verdict-gray-500">{t("social.trusted")}</p>
                <p className="mt-1 text-2xl font-semibold text-verdict-gray-900">{t("social.professionals")}</p>
                <p className="text-sm text-verdict-gray-500">{t("social.worldwide")}</p>
              </div>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {["Founders", "Agencies", "Consultants", "Freelancers"].map((label) => (
                <div key={label} className="rounded-2xl border border-verdict-gray-200 bg-white py-6 text-center shadow-card transition-smooth hover:shadow-elevated hover:border-verdict-gray-300">
                  <p className="text-sm font-medium text-verdict-gray-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <blockquote className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
                <p className="text-verdict-gray-700">&quot;I run every important email through VERDICT. It caught a commitment I would have missed.&quot;</p>
                <p className="mt-4 text-sm text-verdict-gray-500">— Founder, B2B SaaS</p>
              </blockquote>
              <blockquote className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
                <p className="text-verdict-gray-700">&quot;Clear, no fluff. Tells me exactly what&apos;s risky and why. Saved me more than once.&quot;</p>
                <p className="mt-4 text-sm text-verdict-gray-500">— Consultant</p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* SECTION 3 — THE PROBLEM */}
        <section id="problem" className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>{t("problem.title")}</h2>
            <p className={`mx-auto max-w-2xl text-center ${subtextClass}`}>
              {t("problem.subtitle")}
            </p>
            <ul className="mx-auto mt-12 max-w-2xl space-y-4 text-verdict-gray-700">
              <li className="flex gap-3">
                <span className="text-verdict-red">•</span>
                {t("problem.1")}
              </li>
              <li className="flex gap-3">
                <span className="text-verdict-red">•</span>
                {t("problem.2")}
              </li>
              <li className="flex gap-3">
                <span className="text-verdict-red">•</span>
                {t("problem.3")}
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 4 — THE SOLUTION */}
        <section id="how-it-works" className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>{t("solution.title")}</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              {t("solution.subtitle")}
            </p>
            <div className="mt-16 grid gap-10 sm:grid-cols-3">
              <div className="text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-verdict-red/10 text-verdict-red font-semibold">1</span>
                <h3 className="mt-4 font-semibold text-verdict-gray-900">{t("solution.step1.title")}</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">{t("solution.step1.desc")}</p>
              </div>
              <div className="text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-verdict-blue/10 text-verdict-blue font-semibold">2</span>
                <h3 className="mt-4 font-semibold text-verdict-gray-900">{t("solution.step2.title")}</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">{t("solution.step2.desc")}</p>
              </div>
              <div className="text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-verdict-gray-200 text-verdict-gray-700 font-semibold">3</span>
                <h3 className="mt-4 font-semibold text-verdict-gray-900">{t("solution.step3.title")}</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">{t("solution.step3.desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4b — USE CASES */}
        <section id="use-cases" className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>{t("usecase.title")}</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              {t("usecase.subtitle")}
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
                <h3 className="font-semibold text-verdict-gray-900">{t("usecase.scary.email.title")}</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">{t("usecase.scary.email.desc")}</p>
              </div>
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
                <h3 className="font-semibold text-verdict-gray-900">{t("usecase.contract.title")}</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">{t("usecase.contract.desc")}</p>
              </div>
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
                <h3 className="font-semibold text-verdict-gray-900">{t("usecase.pressure.title")}</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">{t("usecase.pressure.desc")}</p>
              </div>
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card transition-smooth hover:shadow-elevated">
                <h3 className="font-semibold text-verdict-gray-900">{t("usecase.scam.title")}</h3>
                <p className="mt-2 text-sm text-verdict-gray-600">{t("usecase.scam.desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — WHAT VERDICT ANALYZES */}
        <section className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>{t("analyzes.title")}</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              {t("analyzes.subtitle")}
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                t("analyzes.emails"),
                t("analyzes.letters"),
                t("analyzes.legal_notices"),
                t("analyzes.contracts"),
                t("analyzes.messages"),
                t("analyzes.situations"),
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-verdict-gray-200 bg-white p-5 shadow-card transition-smooth hover:shadow-elevated">
                  <p className="font-medium text-verdict-gray-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — HOW VERDICT WORKS */}
        <section className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>{t("ai.title")}</h2>
            <p className={`mx-auto max-w-2xl text-center ${subtextClass}`}>
              {t("ai.subtitle")}
            </p>
            <ul className="mx-auto mt-12 max-w-2xl space-y-4 text-verdict-gray-700">
              <li className="flex gap-3 rounded-xl border border-verdict-gray-200 bg-white p-4 shadow-soft">
                <span className="text-verdict-blue font-semibold">→</span>
                {t("ai.1")}
              </li>
              <li className="flex gap-3 rounded-xl border border-verdict-gray-200 bg-white p-4 shadow-soft">
                <span className="text-verdict-blue font-semibold">→</span>
                {t("ai.2")}
              </li>
              <li className="flex gap-3 rounded-xl border border-verdict-gray-200 bg-white p-4 shadow-soft">
                <span className="text-verdict-blue font-semibold">→</span>
                {t("ai.3")}
              </li>
              <li className="flex gap-3 rounded-xl border border-verdict-gray-200 bg-white p-4 shadow-soft">
                <span className="text-verdict-blue font-semibold">→</span>
                {t("ai.4")}
              </li>
            </ul>
            <p className="mx-auto mt-8 max-w-xl text-center text-sm text-verdict-gray-600">
              {t("ai.trained")}
            </p>
          </div>
        </section>

        {/* SECTION 6b — COMPARISON */}
        <section className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>{t("compare.title")}</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-verdict-blue/20 bg-verdict-blue/5 p-6 shadow-card transition-smooth hover:shadow-elevated">
                <p className="font-semibold text-verdict-blue">{t("compare.with")}</p>
                <p className="mt-3 text-sm text-verdict-gray-700">{t("compare.with.desc")}</p>
              </div>
              <div className="rounded-2xl border border-verdict-gray-200 bg-verdict-gray-50 p-6 shadow-card transition-smooth hover:shadow-elevated">
                <p className="font-semibold text-verdict-gray-600">{t("compare.without")}</p>
                <p className="mt-3 text-sm text-verdict-gray-600">{t("compare.without.desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — EXAMPLE OUTPUT */}
        <section className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>{t("example.title")}</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              {t("example.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-xl border border-verdict-gray-200 bg-white px-4 py-2 text-sm font-medium text-verdict-gray-700 shadow-soft">
                {t("example.recouvrement")}
              </span>
              <span className="rounded-xl border border-verdict-gray-200 bg-white px-4 py-2 text-sm font-medium text-verdict-gray-700 shadow-soft">
                {t("example.assurance")}
              </span>
            </div>
            <div className="mt-12 space-y-6 rounded-2xl border border-verdict-gray-200 bg-verdict-gray-50 p-6 sm:p-8">
              <div>
                <p className="text-sm font-medium text-verdict-gray-500">{t("example.input")}</p>
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
            <h2 className={`text-center ${headingClass}`}>{t("who.title")}</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              {t("who.subtitle")}
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {[t("who.role1"), t("who.role2"), t("who.role3"), t("who.role4"), t("who.role5")].map((role) => (
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
            <h2 className={`text-center ${headingClass}`}>{t("why.title")}</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              {t("why.subtitle")}
            </p>
            <ul className="mx-auto mt-12 max-w-xl space-y-4 text-verdict-gray-700">
              <li className="flex gap-3">• {t("why.1")}</li>
              <li className="flex gap-3">• {t("why.2")}</li>
              <li className="flex gap-3">• {t("why.3")}</li>
              <li className="flex gap-3">• {t("why.4")}</li>
            </ul>
          </div>
        </section>

        {/* SECTION 10 — PRICING (3 plans CHF) */}
        <section id="pricing" className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>{t("pricing.title")}</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              {t("pricing.subtitle")}
            </p>
            <div className="mt-8 rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card sm:mx-auto sm:max-w-lg text-center">
              <p className="font-semibold text-verdict-gray-900">{t("pricing.trial")}</p>
              <p className="mt-1 text-sm text-verdict-gray-600">{t("pricing.trial.desc")}</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card">
                <p className="font-semibold text-verdict-gray-900">{t("pricing.starter")}</p>
                <p className="mt-2 text-2xl font-semibold text-verdict-gray-900">9.99 CHF<span className="text-base font-normal text-verdict-gray-500">{t("pricing.mo")}</span></p>
                <ul className="mt-4 space-y-2 text-sm text-verdict-gray-600">
                  <li>{t("pricing.limited")}</li>
                  <li>{t("pricing.personal")}</li>
                  <li>{t("pricing.email.support")}</li>
                </ul>
                <Link href={user ? "/account?plan=starter" : "/auth/signup?plan=starter"} className="mt-6 block">
                  <span className="inline-flex w-full justify-center rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-verdict-gray-700 transition-smooth hover:bg-verdict-gray-50">{t("pricing.get")} Starter</span>
                </Link>
              </div>
              <div className="rounded-2xl border-2 border-verdict-red/30 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold text-verdict-red">{t("pricing.pro")}</p>
                <p className="mt-2 font-semibold text-verdict-gray-900">{t("pricing.pro")}</p>
                <p className="mt-2 text-2xl font-semibold text-verdict-gray-900">19.99 CHF<span className="text-base font-normal text-verdict-gray-500">{t("pricing.mo")}</span></p>
                <ul className="mt-4 space-y-2 text-sm text-verdict-gray-600">
                  <li>{t("pricing.unlimited")}</li>
                  <li>{t("pricing.history")}</li>
                  <li>{t("pricing.priority")}</li>
                </ul>
                <Link href={user ? "/account?plan=pro" : "/auth/signup?plan=pro"} className="mt-6 block">
                  <span className="inline-flex w-full justify-center rounded-xl bg-verdict-red px-4 py-2.5 text-sm font-semibold text-white transition-smooth hover:bg-verdict-red-hover">{t("pricing.get")} Pro</span>
                </Link>
              </div>
              <div className="rounded-2xl border border-verdict-gray-200 bg-white p-6 shadow-card">
                <p className="font-semibold text-verdict-gray-900">{t("pricing.premium")}</p>
                <p className="mt-2 text-2xl font-semibold text-verdict-gray-900">39.99 CHF<span className="text-base font-normal text-verdict-gray-500">{t("pricing.mo")}</span></p>
                <ul className="mt-4 space-y-2 text-sm text-verdict-gray-600">
                  <li>{t("pricing.unlimited")}</li>
                  <li>{t("pricing.advanced")}</li>
                  <li>{t("pricing.priority.support")}</li>
                  <li>{t("pricing.early")}</li>
                </ul>
                <Link href={user ? "/account?plan=premium" : "/auth/signup?plan=premium"} className="mt-6 block">
                  <span className="inline-flex w-full justify-center rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-verdict-gray-700 transition-smooth hover:bg-verdict-gray-50">{t("pricing.get")} Premium</span>
                </Link>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-verdict-gray-500">
              {t("pricing.secure")}
            </p>
          </div>
        </section>

        {/* SECTION 11 — SECURITY & PRIVACY */}
        <section className={`border-t border-verdict-gray-100 ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>{t("security.title")}</h2>
            <p className={`mx-auto max-w-xl text-center ${subtextClass}`}>
              {t("security.subtitle")}
            </p>
            <ul className="mx-auto mt-12 max-w-xl space-y-3 text-sm text-verdict-gray-700">
              <li>• {t("security.1")}</li>
              <li>• {t("security.2")}</li>
              <li>• {t("security.3")}</li>
              <li>• {t("security.4")}</li>
            </ul>
          </div>
        </section>

        {/* SECTION 12 — FAQ */}
        <section className={`border-t border-verdict-gray-100 bg-verdict-off-white ${sectionClass}`}>
          <div className={containerClass}>
            <h2 className={`text-center ${headingClass}`}>{t("faq.title")}</h2>
            <div className="mt-12 space-y-6">
              {[
                { q: t("faq.q1"), a: t("faq.a1") },
                { q: t("faq.q2"), a: t("faq.a2") },
                { q: t("faq.q3"), a: t("faq.a3") },
                { q: t("faq.q4"), a: t("faq.a4") },
                { q: t("faq.q5"), a: t("faq.a5") },
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
            <h2 className={headingClass}>{t("cta.title")}</h2>
            <p className={`mx-auto mt-4 max-w-lg ${subtextClass}`}>
              {t("cta.subtitle")}
            </p>
            <Link
              href={user ? "/analyze" : "/auth/signup"}
              className="mt-8 inline-flex rounded-xl bg-verdict-red px-8 py-3.5 text-lg font-semibold text-white shadow-soft transition-smooth hover:bg-verdict-red-hover"
            >
              {t("hero.cta.trial")}
            </Link>
          </div>
        </section>

        {/* SECTION 14 — FOOTER (legal) */}
        <footer className="border-t border-verdict-gray-200 bg-verdict-near-black py-16 text-white">
          <div className={`${containerClass} px-4`}>
            <div className="rounded-xl border border-verdict-gray-700 bg-verdict-gray-800/50 p-4 mb-10 text-xs text-verdict-gray-400">
              <strong className="text-verdict-gray-300">Disclaimer:</strong> {t("hero.disclaimer")}
            </div>
            <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Logo href="/" textWhite />
                <p className="mt-2 text-sm text-verdict-gray-400">
                  {t("footer.tagline")}
                </p>
                <p className="mt-4 text-sm text-verdict-gray-500">{t("footer.company")}</p>
              </div>
              <div className="flex flex-wrap gap-8 text-sm">
                <div>
                  <p className="font-medium text-white">{t("footer.product")}</p>
                  <Link href="/pricing" className="mt-2 block text-verdict-gray-400 hover:text-white">{t("nav.pricing")}</Link>
                  <Link href="/auth/login" className="mt-1 block text-verdict-gray-400 hover:text-white">{t("nav.login")}</Link>
                </div>
                <div>
                  <p className="font-medium text-white">{t("footer.legal")}</p>
                  <Link href="/legal/privacy" className="mt-2 block text-verdict-gray-400 hover:text-white">{t("footer.privacy")}</Link>
                  <Link href="/legal/terms" className="mt-1 block text-verdict-gray-400 hover:text-white">{t("footer.terms")}</Link>
                  <Link href="/legal/refund" className="mt-1 block text-verdict-gray-400 hover:text-white">{t("footer.refund")}</Link>
                </div>
                <div>
                  <p className="font-medium text-white">{t("nav.contact")}</p>
                  <Link href="/contact" className="mt-2 block text-verdict-gray-400 hover:text-white">{t("nav.contact")}</Link>
                  <a href="mailto:support@verdictonline.ch" className="mt-1 block text-verdict-gray-400 hover:text-white">support@verdictonline.ch</a>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-verdict-gray-700 pt-8 text-sm text-verdict-gray-500">
              {t("footer.copyright")}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

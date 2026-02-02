"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useI18n } from "@/lib/i18n/context";

interface NavClientProps {
  authenticated?: boolean;
  email?: string | null;
}

export function NavClient({ authenticated, email }: NavClientProps) {
  const { t } = useI18n();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-verdict-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo href={authenticated ? "/dashboard" : "/"} />
        <div className="flex items-center gap-4 sm:gap-6">
          {authenticated ? (
            <>
              <Link
                href="/dashboard"
                className="hidden text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900 sm:inline"
              >
                {t("nav.dashboard")}
              </Link>
              <Link
                href="/analyze"
                className="text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900"
              >
                {t("nav.analyze")}
              </Link>
              <Link
                href="/history"
                className="hidden text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900 sm:inline"
              >
                {t("nav.history")}
              </Link>
              <Link
                href="/pricing"
                className="hidden text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900 lg:inline"
              >
                {t("nav.pricing")}
              </Link>
              <Link
                href="/account"
                className="hidden text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900 sm:inline"
              >
                {t("nav.account")}
              </Link>
              <Link
                href="/contact"
                className="hidden text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900 lg:inline"
              >
                {t("nav.contact")}
              </Link>
              <span className="hidden max-w-[140px] truncate text-sm text-verdict-gray-400 xl:inline">
                {email}
              </span>
              <LanguageSelector />
              <form action="/auth/signout" method="post" className="inline">
                <button
                  type="submit"
                  className="text-sm text-verdict-gray-500 transition-smooth hover:text-verdict-red"
                >
                  {t("nav.signout")}
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/pricing"
                className="hidden text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900 sm:inline"
              >
                {t("nav.pricing")}
              </Link>
              <Link
                href="/contact"
                className="hidden text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900 sm:inline"
              >
                {t("nav.contact")}
              </Link>
              <Link
                href="/auth/login"
                className="text-sm text-verdict-gray-600 transition-smooth hover:text-verdict-gray-900"
              >
                {t("nav.login")}
              </Link>
              <LanguageSelector />
              <Link
                href="/auth/signup"
                className="rounded-xl bg-verdict-red px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-smooth hover:bg-verdict-red-hover"
              >
                {t("hero.cta.trial")}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

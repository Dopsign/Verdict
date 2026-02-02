"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Locale, locales, getTranslation } from "./translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = "verdict-locale";
const COOKIE_NAME = "verdict-locale";
const COOKIE_DAYS = 365;

function setLocaleCookie(locale: Locale) {
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);
  document.cookie = `${COOKIE_NAME}=${locale};path=/;max-age=${COOKIE_DAYS * 24 * 60 * 60};SameSite=Lax`;
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && locales.includes(stored as Locale)) return stored as Locale;
  const cookieMatch = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  const cookieVal = cookieMatch?.[2];
  if (cookieVal && locales.includes(cookieVal as Locale)) {
    localStorage.setItem(STORAGE_KEY, cookieVal);
    return cookieVal as Locale;
  }
  const browserLang = navigator.language.split("-")[0];
  if (locales.includes(browserLang as Locale)) return browserLang as Locale;
  return "fr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    setLocaleCookie(newLocale);
    router.refresh();
  };

  const t = (key: string) => getTranslation(locale, key);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: "fr", setLocale, t: (key) => getTranslation("fr", key) }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

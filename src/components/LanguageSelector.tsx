"use client";

import { useI18n } from "@/lib/i18n/context";
import { Locale, locales, localeNames } from "@/lib/i18n/translations";

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="rounded-lg border border-verdict-gray-200 bg-white px-2 py-1 text-sm text-verdict-gray-700 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
      aria-label="Select language"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  );
}

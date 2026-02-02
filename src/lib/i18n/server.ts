import { cookies } from "next/headers";
import { Locale, locales, getTranslation } from "./translations";

const COOKIE_NAME = "verdict-locale";

export async function getLocaleFromCookies(): Promise<Locale> {
  const cookieStore = await cookies();
  const stored = cookieStore.get(COOKIE_NAME)?.value;
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale;
  }
  return "fr";
}

export function getServerTranslation(locale: Locale) {
  return (key: string) => getTranslation(locale, key);
}

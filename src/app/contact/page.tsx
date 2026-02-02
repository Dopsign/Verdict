import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { createClient } from "@/lib/supabase/server";
import { ContactForm } from "./ContactForm";
import { getLocaleFromCookies, getServerTranslation } from "@/lib/i18n/server";

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const locale = await getLocaleFromCookies();
  const t = getServerTranslation(locale);

  return (
    <div className="min-h-screen bg-white">
      <Nav authenticated={!!user} email={user?.email ?? null} />

      <main className="mx-auto max-w-2xl px-4 pt-24 pb-20">
        <h1 className="text-2xl font-semibold text-verdict-gray-900 sm:text-3xl">
          {t("contact.title")}
        </h1>
        <p className="mt-2 text-verdict-gray-600">
          {t("contact.subtitle")}
        </p>

        <div className="mt-10 rounded-2xl border border-verdict-gray-200 bg-verdict-gray-50 p-6 shadow-card sm:p-8">
          <ContactForm />
        </div>

        <p className="mt-6 text-center text-sm text-verdict-gray-500">
          <Link href="/" className="text-verdict-red hover:underline">
            {t("contact.back")}
          </Link>
        </p>
      </main>
    </div>
  );
}

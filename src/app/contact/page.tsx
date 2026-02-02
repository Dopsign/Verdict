import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { createClient } from "@/lib/supabase/server";
import Button from "@/components/ui/Button";
import { ContactForm } from "./ContactForm";

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white">
      <Nav authenticated={!!user} email={user?.email ?? null} />

      <main className="mx-auto max-w-2xl px-4 pt-24 pb-20">
        <h1 className="text-2xl font-semibold text-verdict-gray-900 sm:text-3xl">
          Contact
        </h1>
        <p className="mt-2 text-verdict-gray-600">
          Envoyez votre message à support@verdictonline.ch. Nous répondons sous 48 h.
        </p>

        <div className="mt-10 rounded-2xl border border-verdict-gray-200 bg-verdict-gray-50 p-6 shadow-card sm:p-8">
          <ContactForm />
        </div>

        <p className="mt-6 text-center text-sm text-verdict-gray-500">
          <Link href="/" className="text-verdict-red hover:underline">
            Retour à l&apos;accueil
          </Link>
        </p>
      </main>
    </div>
  );
}

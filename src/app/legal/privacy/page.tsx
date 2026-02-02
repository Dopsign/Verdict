import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { createClient } from "@/lib/supabase/server";

export default async function PrivacyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white">
      <Nav authenticated={!!user} email={user?.email ?? null} />
      <main className="mx-auto max-w-3xl px-4 py-24 pb-20">
        <h1 className="text-2xl font-semibold text-verdict-gray-900 sm:text-3xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-verdict-gray-500">
          Dernière mise à jour : 2025
        </p>
        <div className="prose prose-gray mt-10 max-w-none text-verdict-gray-700">
          <p>
            VERDICT (&quot;we&quot;, &quot;our&quot;) respects your privacy. This policy describes how we collect, use, and protect your data.
          </p>
          <h2 className="mt-8 text-lg font-semibold text-verdict-gray-900">Data we collect</h2>
          <p>
            We collect the data you provide: account (email, password hash), usage (analyses count, trial dates), and content you submit for analysis. We use this to provide the service, enforce limits, and improve the product.
          </p>
          <h2 className="mt-8 text-lg font-semibold text-verdict-gray-900">How we use it</h2>
          <p>
            Your content is processed only to run the analysis. We do not sell your data. We use industry-standard encryption and secure infrastructure.
          </p>
          <h2 className="mt-8 text-lg font-semibold text-verdict-gray-900">Payments</h2>
          <p>
            Payments are processed by Stripe. We do not store your card details. See Stripe&apos;s privacy policy for payment data.
          </p>
          <h2 className="mt-8 text-lg font-semibold text-verdict-gray-900">Contact</h2>
          <p>
            For privacy questions: <a href="mailto:support@verdictonline.ch" className="text-verdict-red hover:underline">support@verdictonline.ch</a>.
          </p>
        </div>
        <p className="mt-10">
          <Link href="/" className="text-sm text-verdict-red hover:underline">Retour à l&apos;accueil</Link>
        </p>
      </main>
    </div>
  );
}

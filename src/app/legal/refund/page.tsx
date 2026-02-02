import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { createClient } from "@/lib/supabase/server";

export default async function RefundPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white">
      <Nav authenticated={!!user} email={user?.email ?? null} />
      <main className="mx-auto max-w-3xl px-4 py-24 pb-20">
        <h1 className="text-2xl font-semibold text-verdict-gray-900 sm:text-3xl">
          No Refund Policy
        </h1>
        <p className="mt-2 text-sm text-verdict-gray-500">
          Politique de non-remboursement — Dernière mise à jour : 2025
        </p>
        <div className="prose prose-gray mt-10 max-w-none text-verdict-gray-700">
          <p>
            Les abonnements VERDICT sont facturés mensuellement. Nous n&apos;effectuons pas de remboursement pour la période déjà facturée, que vous utilisiez ou non le service pendant cette période.
          </p>
          <p className="mt-4">
            Vous pouvez annuler votre abonnement à tout moment depuis votre compte (Stripe Customer Portal). L&apos;annulation prend effet à la fin de la période en cours ; vous conservez l&apos;accès jusqu&apos;à cette date.
          </p>
          <p className="mt-4">
            Pour toute question : <a href="mailto:support@verdictonline.ch" className="text-verdict-red hover:underline">support@verdictonline.ch</a>.
          </p>
        </div>
        <p className="mt-10">
          <Link href="/" className="text-sm text-verdict-red hover:underline">Retour à l&apos;accueil</Link>
        </p>
      </main>
    </div>
  );
}

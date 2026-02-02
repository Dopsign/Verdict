import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { createClient } from "@/lib/supabase/server";

export default async function TermsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white">
      <Nav authenticated={!!user} email={user?.email ?? null} />
      <main className="mx-auto max-w-3xl px-4 py-24 pb-20">
        <h1 className="text-2xl font-semibold text-verdict-gray-900 sm:text-3xl">
          Terms & Conditions (CGV)
        </h1>
        <p className="mt-2 text-sm text-verdict-gray-500">
          Conditions générales de vente et d&apos;utilisation — Dernière mise à jour : 2025
        </p>
        <div className="prose prose-gray mt-10 max-w-none text-verdict-gray-700">
          <p>
            En utilisant VERDICT, vous acceptez les présentes conditions.
          </p>
          <h2 className="mt-8 text-lg font-semibold text-verdict-gray-900">1. Service</h2>
          <p>
            VERDICT est un outil d&apos;analyse de texte (emails, contrats, messages) qui signale des erreurs, risques et améliorations. Il ne constitue pas un conseil juridique, fiscal ou professionnel.
          </p>
          <h2 className="mt-8 text-lg font-semibold text-verdict-gray-900">2. Compte et essai</h2>
          <p>
            L&apos;essai gratuit est de 5 jours, avec un maximum de 5 analyses par jour. Aucune carte bancaire n&apos;est requise pour l&apos;essai. À l&apos;issue de l&apos;essai ou en cas de dépassement des limites, un abonnement payant est requis pour continuer.
          </p>
          <h2 className="mt-8 text-lg font-semibold text-verdict-gray-900">3. Abonnement et paiement</h2>
          <p>
            Les abonnements sont facturés mensuellement via Stripe. Vous pouvez annuler à tout moment ; l&apos;accès reste actif jusqu&apos;à la fin de la période en cours. Aucun remboursement pour la période déjà facturée (voir politique de non-remboursement).
          </p>
          <h2 className="mt-8 text-lg font-semibold text-verdict-gray-900">4. Responsabilité</h2>
          <p>
            VERDICT est fourni &quot;en l&apos;état&quot;. Nous ne sommes pas responsables des décisions prises sur la base des analyses. Pour toute question juridique ou contractuelle, consultez un professionnel qualifié.
          </p>
          <h2 className="mt-8 text-lg font-semibold text-verdict-gray-900">5. Contact</h2>
          <p>
            <a href="mailto:support@verdictonline.ch" className="text-verdict-red hover:underline">support@verdictonline.ch</a>.
          </p>
        </div>
        <p className="mt-10">
          <Link href="/" className="text-sm text-verdict-red hover:underline">Retour à l&apos;accueil</Link>
        </p>
      </main>
    </div>
  );
}

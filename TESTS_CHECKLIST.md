# VERDICT — Checklist de tests (prêt prod)

## ✅ Essai gratuit (1/jour × 3 jours)

| Test | Attendu |
|------|---------|
| Créer un compte | Essai démarre, Jour 1 affiché |
| Jour 1: 0/1 utilisé | Affiche "1/1 restant" |
| 1ère analyse du jour | Succès, "1/1 utilisé" |
| 2ème analyse même jour | Paywall "Limite quotidienne atteinte" |
| Jour suivant | Compteur reset, 1/1 restant |
| Après 3 jours | Blocage "Essai terminé" |
| Message UX | "Pour garantir la qualité et éviter les abus, l'essai est limité." |

## ✅ Stripe

| Test | Attendu |
|------|---------|
| Checkout Starter/Pro/Premium | Redirige vers Stripe, carte 4242... acceptée |
| Après paiement | Plan mis à jour, accès débloqué immédiatement |
| Portail client | Gérer abonnement, annuler, changer carte |
| Webhook | `subscription_status` mis à jour dans Supabase |

## ✅ Design & UX

| Test | Attendu |
|------|---------|
| Landing | Hero fort, comparaison avec/sans, exemples (recouvrement, assurance) |
| Dashboard | Compteur essais clair, upgrade visible mais non agressif |
| Analyse | Upload/coller, bouton Analyser, résultat structuré (résumé, risques, conseils, réponse proposée) |
| Responsive | Mobile, tablette, desktop OK |

## ✅ Légal

| Test | Attendu |
|------|---------|
| Footer | Confidentialité, CGV, Pas de remboursement, Mentions légales |
| Disclaimer | Visible sur hero, analyse, résultats |
| Contact | Formulaire envoie à support@verdictonline.ch |

---

**Le SaaS est prêt** lorsque tous les tests ci-dessus passent.

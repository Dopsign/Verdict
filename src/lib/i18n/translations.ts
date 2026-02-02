export type Locale = "fr" | "en" | "de" | "it";

export const locales: Locale[] = ["fr", "en", "de", "it"];

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  de: "Deutsch",
  it: "Italiano",
};

export const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Nav
    "nav.dashboard": "Tableau de bord",
    "nav.analyze": "Analyser",
    "nav.history": "Histoire",
    "nav.pricing": "Tarification",
    "nav.account": "Compte",
    "nav.contact": "Contact",
    "nav.login": "Se connecter",
    "nav.signup": "Créer un compte",
    "nav.signout": "Se déconnecter",

    // Hero
    "hero.title": "Avant d'envoyer — obtenez un VERDICT.",
    "hero.subtitle": "VERDICT est une couche de sécurité IA qui détecte les erreurs, les risques et les mauvaises décisions avant qu'ils ne vous coûtent de l'argent, du temps ou de la réputation.",
    "hero.cta.trial": "Essai gratuit",
    "hero.cta.how": "Comment ça marche",
    "hero.trial.info": "5 jours d'essai gratuit • 5 analyses par jour • Annuler à tout moment",

    // Social proof
    "social.rating": "Note moyenne",
    "social.trusted": "Confiance de",
    "social.professionals": "12 000+ professionnels",
    "social.worldwide": "dans le monde",

    // Problem
    "problem.title": "Le problème",
    "problem.subtitle": "Les vraies erreurs arrivent quand on va trop vite ou sous pression.",
    "problem.1": "Les gens envoient des emails trop vite — et regrettent le ton ou les engagements plus tard.",
    "problem.2": "Les gens signent des contrats qu'ils ne comprennent pas entièrement — et ratent des clauses importantes.",
    "problem.3": "Les gens prennent des décisions sous pression — et les erreurs coûteuses sont souvent irréversibles.",

    // Solution
    "solution.title": "La solution",
    "solution.subtitle": "Pas de buzzwords. Seulement de la vraie valeur.",
    "solution.step1.title": "Collez votre texte",
    "solution.step1.desc": "Email, contrat, message ou décision.",
    "solution.step2.title": "Obtenez un verdict clair",
    "solution.step2.desc": "Erreurs critiques, risques, améliorations, version corrigée.",
    "solution.step3.title": "Corrigez avant d'envoyer",
    "solution.step3.desc": "Copiez le texte corrigé. Envoyez en toute confiance.",

    // What VERDICT analyzes
    "analyzes.title": "Ce que VERDICT analyse",
    "analyzes.subtitle": "Tout texte qui pourrait vous coûter s'il est incorrect.",
    "analyzes.emails": "Emails",
    "analyzes.contracts": "Contrats",
    "analyzes.decisions": "Décisions commerciales",
    "analyzes.messages": "Messages sensibles",
    "analyzes.documents": "Documents importants",

    // AI Transparency
    "ai.title": "Comment l'IA réfléchit",
    "ai.subtitle": "La transparence est essentielle pour la confiance. VERDICT ne devine pas — il signale les risques et explique pourquoi.",
    "ai.1": "Il ne devine pas. Il signale ce qui pourrait mal tourner en fonction de votre texte.",
    "ai.2": "Il met en évidence les risques — juridiques, financiers, réputationnels — avec des étiquettes claires.",
    "ai.3": "Il explique pourquoi quelque chose est risqué ou peu clair.",
    "ai.4": "Il suggère des alternatives plus sûres et une version corrigée que vous pouvez copier.",

    // Example
    "example.title": "Exemple de résultat",
    "example.subtitle": "Réaliste. Pas de marketing.",
    "example.input": "Texte d'entrée",
    "example.errors": "❌ Erreurs critiques",
    "example.risks": "⚠️ Risques",
    "example.improvements": "✅ Améliorations",
    "example.corrected": "✍️ Version corrigée",

    // Who it's for
    "who.title": "Pour qui ?",
    "who.subtitle": "Tous ceux qui prennent des décisions importantes avec des mots.",

    // Why people stay
    "why.title": "Pourquoi les gens restent abonnés",
    "why.subtitle": "Ça devient une partie de leur façon de travailler.",
    "why.1": "Habitude quotidienne — faire passer les messages importants par VERDICT avant d'envoyer.",
    "why.2": "Tranquillité d'esprit — moins de moments \"j'aurais aimé ne pas avoir dit ça\".",
    "why.3": "Confiance avant d'envoyer — surtout pour les contrats et engagements.",
    "why.4": "Éviter les regrets — détecter les erreurs avant qu'elles ne coûtent de l'argent ou des relations.",

    // Pricing
    "pricing.title": "Tarification",
    "pricing.subtitle": "Très clair. Mensuel uniquement. Annuler à tout moment. Paiement sécurisé via Stripe.",
    "pricing.trial": "5 jours d'essai gratuit",
    "pricing.trial.desc": "5 analyses par jour • Pas de carte de crédit requise.",
    "pricing.starter": "Starter",
    "pricing.pro": "Pro",
    "pricing.premium": "Premium",
    "pricing.mo": "/mois",
    "pricing.limited": "Usage limité",
    "pricing.personal": "Usage personnel",
    "pricing.email.support": "Support par email",
    "pricing.unlimited": "Analyses illimitées",
    "pricing.history": "Historique",
    "pricing.priority": "Traitement prioritaire",
    "pricing.advanced": "Analyse avancée",
    "pricing.priority.support": "Support prioritaire",
    "pricing.early": "Fonctionnalités en avant-première",
    "pricing.get": "Obtenir",
    "pricing.secure": "Paiements sécurisés via Stripe. Annuler à tout moment.",

    // Security
    "security.title": "Sécurité & confidentialité",
    "security.subtitle": "Vos données ne sont pas vendues. Nous utilisons les pratiques standards de l'industrie.",
    "security.1": "Les données ne sont pas vendues. Jamais.",
    "security.2": "Infrastructure sécurisée et chiffrement standard de l'industrie.",
    "security.3": "Paiements via Stripe — nous ne stockons pas vos données de carte.",
    "security.4": "Approche axée sur la confidentialité. Nous utilisons votre contenu uniquement pour l'analyse.",

    // FAQ
    "faq.title": "FAQ",
    "faq.q1": "Est-ce un avis juridiquement contraignant ?",
    "faq.a1": "Non. VERDICT met en évidence les risques et suggère des améliorations. Ce n'est pas un substitut à un avis juridique ou professionnel. Pour les contrats et questions juridiques, consultez un professionnel qualifié.",
    "faq.q2": "Puis-je faire confiance à l'IA ?",
    "faq.a2": "VERDICT est conçu pour être précis et transparent. Il explique pourquoi il signale quelque chose et suggère des alternatives. Utilisez-le comme une deuxième paire d'yeux, pas comme l'autorité finale.",
    "faq.q3": "Que se passe-t-il après l'essai ?",
    "faq.a3": "Après 5 jours, vous pouvez vous abonner à Starter ou Pro. Si vous ne vous abonnez pas, vous ne serez pas facturé. Vous pouvez toujours créer un compte et mettre à jour plus tard.",
    "faq.q4": "Puis-je annuler à tout moment ?",
    "faq.a4": "Oui. Annulez depuis votre compte. Sans question. Vous gardez l'accès jusqu'à la fin de votre période de facturation.",
    "faq.q5": "Mes données sont-elles en sécurité ?",
    "faq.a5": "Nous utilisons une infrastructure sécurisée et le chiffrement. Votre contenu est utilisé uniquement pour l'analyse. Nous ne vendons pas vos données.",

    // Final CTA
    "cta.title": "Obtenez votre verdict avant que ça compte.",
    "cta.subtitle": "Commencez votre essai gratuit de 5 jours. Pas de carte de crédit requise.",

    // Footer
    "footer.tagline": "Avant d'envoyer — obtenez un verdict.",
    "footer.company": "VERDICT · Infos entreprise · Construit avec soin",
    "footer.product": "Produit",
    "footer.legal": "Légal",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions générales (CGV)",
    "footer.refund": "Politique sans remboursement",
    "footer.copyright": "© VERDICT. Paiements sécurisés via Stripe. Annuler à tout moment.",

    // Dashboard
    "dashboard.title": "Tableau de bord",
    "dashboard.welcome": "Bienvenue",
    "dashboard.trial": "Essai gratuit",
    "dashboard.days.left": "jours restants",
    "dashboard.analyses.left": "analyses restantes aujourd'hui",
    "dashboard.unlimited": "Illimité",
    "dashboard.plan": "Plan",
    "dashboard.analyze.cta": "Nouvelle analyse",

    // Analyze
    "analyze.title": "Analyser",
    "analyze.subtitle": "Collez votre courriel, contrat ou message. VERDICT vous indiquera les erreurs critiques, les risques, les améliorations possibles et vous fournira une version corrigée.",
    "analyze.placeholder": "Collez ici votre courriel, contrat ou message...",
    "analyze.button": "Analyser",
    "analyze.analyzing": "Analyse en cours...",
    "analyze.remaining": "analyses sur",
    "analyze.remaining.today": "restantes aujourd'hui",
    "analyze.trial": "Essai",
    "analyze.days.left": "jours restants",

    // Results
    "result.errors": "Erreurs critiques",
    "result.risks": "Risques",
    "result.improvements": "Améliorations",
    "result.corrected": "Version corrigée",
    "result.copy": "Copier",
    "result.copied": "Copié !",
    "result.none": "Aucun",

    // History
    "history.title": "Historique",
    "history.subtitle": "Vos analyses passées",
    "history.empty": "Aucune analyse encore. Lancez-en une depuis la page Analyser.",
    "history.upgrade": "Passez à Pro ou Premium pour sauvegarder et consulter toutes vos analyses passées.",
    "history.critical": "critique(s)",

    // Account
    "account.title": "Compte & Facturation",
    "account.subtitle": "Gérez votre abonnement et facturation.",
    "account.email": "Email",
    "account.plan": "Plan actuel",
    "account.subscription": "Abonnement",
    "account.billing.managed": "La facturation est gérée via Stripe. Utilisez le lien ci-dessous pour mettre à jour ou annuler.",
    "account.choose.plan": "Choisissez un plan",
    "account.subscribe": "S'abonner avec Stripe",
    "account.portal": "Ouvrir le portail client Stripe",
    "account.view.pricing": "Voir les tarifs",
    "account.stripe.not.configured": "Stripe n'est pas configuré. Ajoutez STRIPE_SECRET_KEY et les IDs de prix dans .env — voir README.",
    "account.success": "Abonnement démarré. Votre plan a été mis à jour.",

    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Envoyez votre message à support@verdictonline.ch. Nous répondons sous 48h.",
    "contact.firstname": "Prénom",
    "contact.lastname": "Nom",
    "contact.email": "Email",
    "contact.subject": "Objet",
    "contact.message": "Cela concerne quoi ?",
    "contact.message.placeholder": "Décrivez votre demande...",
    "contact.send": "Envoyer",
    "contact.success": "Message envoyé. Nous vous répondrons à l'adresse indiquée.",
    "contact.back": "Retour à l'accueil",

    // Auth
    "auth.login": "Se connecter",
    "auth.signup": "Créer un compte",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.login.button": "Se connecter",
    "auth.signup.button": "Créer un compte",
    "auth.no.account": "Pas de compte ?",
    "auth.have.account": "Déjà un compte ?",
    "auth.create": "Créer un compte",
    "auth.login.link": "Se connecter",

    // Paywall
    "paywall.trial.ended": "Votre essai est terminé",
    "paywall.daily.limit": "Limite quotidienne atteinte",
    "paywall.upgrade": "Passez à un plan payant pour continuer à utiliser VERDICT.",
    "paywall.come.back": "Revenez demain ou passez à un plan payant.",
    "paywall.view.plans": "Voir les plans",

    // Errors
    "error.quota": "Vous avez dépassé votre quota actuel. Veuillez vérifier votre forfait et vos informations de facturation.",
    "error.generic": "Une erreur s'est produite. Veuillez réessayer.",
  },
  en: {
    // Nav
    "nav.dashboard": "Dashboard",
    "nav.analyze": "Analyze",
    "nav.history": "History",
    "nav.pricing": "Pricing",
    "nav.account": "Account",
    "nav.contact": "Contact",
    "nav.login": "Log in",
    "nav.signup": "Sign up",
    "nav.signout": "Sign out",

    // Hero
    "hero.title": "Before you send it — get a VERDICT.",
    "hero.subtitle": "VERDICT is an AI safety layer that detects errors, risks, and bad decisions before they cost you money, time, or reputation.",
    "hero.cta.trial": "Start free trial",
    "hero.cta.how": "See how it works",
    "hero.trial.info": "5-day free trial • 5 analyses per day • Cancel anytime",

    // Social proof
    "social.rating": "Average rating",
    "social.trusted": "Trusted by",
    "social.professionals": "12,000+ professionals",
    "social.worldwide": "worldwide",

    // Problem
    "problem.title": "The problem",
    "problem.subtitle": "Real mistakes happen when we move too fast or under pressure.",
    "problem.1": "People send emails too fast — and regret tone or commitments later.",
    "problem.2": "People sign contracts they don't fully understand — and miss clauses that matter.",
    "problem.3": "People make decisions under pressure — and costly mistakes are often irreversible.",

    // Solution
    "solution.title": "The solution",
    "solution.subtitle": "No buzzwords. Only real value.",
    "solution.step1.title": "Paste your text",
    "solution.step1.desc": "Email, contract, message, or decision.",
    "solution.step2.title": "Get a clear verdict",
    "solution.step2.desc": "Critical errors, risks, improvements, corrected version.",
    "solution.step3.title": "Fix before sending",
    "solution.step3.desc": "Copy the corrected text. Send with confidence.",

    // What VERDICT analyzes
    "analyzes.title": "What VERDICT analyzes",
    "analyzes.subtitle": "Any text that could cost you if it's wrong.",
    "analyzes.emails": "Emails",
    "analyzes.contracts": "Contracts",
    "analyzes.decisions": "Business decisions",
    "analyzes.messages": "Sensitive messages",
    "analyzes.documents": "Important documents",

    // AI Transparency
    "ai.title": "How the AI thinks",
    "ai.subtitle": "Transparency is critical for trust. VERDICT does not guess — it highlights risks and explains why.",
    "ai.1": "It does not guess. It flags what could go wrong based on your text.",
    "ai.2": "It highlights risks — legal, financial, reputational — with clear labels.",
    "ai.3": "It explains why something is risky or unclear.",
    "ai.4": "It suggests safer alternatives and a corrected version you can copy.",

    // Example
    "example.title": "Example output",
    "example.subtitle": "Realistic. No marketing fluff.",
    "example.input": "Input text",
    "example.errors": "❌ Critical errors",
    "example.risks": "⚠️ Risks",
    "example.improvements": "✅ Improvements",
    "example.corrected": "✍️ Corrected version",

    // Who it's for
    "who.title": "Who it's for",
    "who.subtitle": "Anyone making important decisions with words.",

    // Why people stay
    "why.title": "Why people stay subscribed",
    "why.subtitle": "It becomes part of how they work.",
    "why.1": "Daily habit — run important messages through VERDICT before sending.",
    "why.2": "Peace of mind — fewer \"I wish I hadn't said that\" moments.",
    "why.3": "Confidence before sending — especially for contracts and commitments.",
    "why.4": "Avoiding regret — catch errors before they cost money or relationships.",

    // Pricing
    "pricing.title": "Pricing",
    "pricing.subtitle": "Very clear. Monthly only. Cancel anytime. Secure payment via Stripe.",
    "pricing.trial": "5-day free trial",
    "pricing.trial.desc": "5 analyses per day • No credit card required.",
    "pricing.starter": "Starter",
    "pricing.pro": "Pro",
    "pricing.premium": "Premium",
    "pricing.mo": "/mo",
    "pricing.limited": "Limited usage",
    "pricing.personal": "Personal use",
    "pricing.email.support": "Email support",
    "pricing.unlimited": "Unlimited analyses",
    "pricing.history": "History",
    "pricing.priority": "Priority processing",
    "pricing.advanced": "Advanced analysis",
    "pricing.priority.support": "Priority support",
    "pricing.early": "Early features",
    "pricing.get": "Get",
    "pricing.secure": "Secure payments via Stripe. Cancel anytime.",

    // Security
    "security.title": "Security & privacy",
    "security.subtitle": "Your data is not sold. We use industry-standard practices.",
    "security.1": "Data is not sold. Ever.",
    "security.2": "Secure infrastructure and industry-standard encryption.",
    "security.3": "Payments via Stripe — we don't store your card details.",
    "security.4": "Privacy-first mindset. We only use your content to run the analysis.",

    // FAQ
    "faq.title": "FAQ",
    "faq.q1": "Is this legally binding advice?",
    "faq.a1": "No. VERDICT highlights risks and suggests improvements. It is not a substitute for legal or professional advice. For contracts and legal matters, consult a qualified professional.",
    "faq.q2": "Can I trust the AI?",
    "faq.a2": "VERDICT is designed to be precise and transparent. It explains why it flags something and suggests alternatives. Use it as a second pair of eyes, not as the final authority.",
    "faq.q3": "What happens after the trial?",
    "faq.a3": "After 5 days, you can subscribe to Starter or Pro. If you don't subscribe, you won't be charged. You can still create an account and upgrade later.",
    "faq.q4": "Can I cancel anytime?",
    "faq.a4": "Yes. Cancel from your account. No questions asked. You keep access until the end of your billing period.",
    "faq.q5": "Is my data safe?",
    "faq.a5": "We use secure infrastructure and encryption. Your content is used only to run the analysis. We don't sell your data.",

    // Final CTA
    "cta.title": "Get your verdict before it matters.",
    "cta.subtitle": "Start your 5-day free trial. No credit card required.",

    // Footer
    "footer.tagline": "Before you send it — get a verdict.",
    "footer.company": "VERDICT · Company info · Built with care",
    "footer.product": "Product",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions (CGV)",
    "footer.refund": "No refund policy",
    "footer.copyright": "© VERDICT. Secure payments via Stripe. Cancel anytime.",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome",
    "dashboard.trial": "Free trial",
    "dashboard.days.left": "days left",
    "dashboard.analyses.left": "analyses left today",
    "dashboard.unlimited": "Unlimited",
    "dashboard.plan": "Plan",
    "dashboard.analyze.cta": "New analysis",

    // Analyze
    "analyze.title": "Analyze",
    "analyze.subtitle": "Paste your email, contract, or message. VERDICT will identify critical errors, risks, possible improvements, and provide a corrected version.",
    "analyze.placeholder": "Paste your email, contract, or message here...",
    "analyze.button": "Analyze",
    "analyze.analyzing": "Analyzing...",
    "analyze.remaining": "analyses out of",
    "analyze.remaining.today": "left today",
    "analyze.trial": "Trial",
    "analyze.days.left": "days left",

    // Results
    "result.errors": "Critical errors",
    "result.risks": "Risks",
    "result.improvements": "Improvements",
    "result.corrected": "Corrected version",
    "result.copy": "Copy",
    "result.copied": "Copied!",
    "result.none": "None",

    // History
    "history.title": "History",
    "history.subtitle": "Your past analyses",
    "history.empty": "No analyses yet. Run one from the Analyze page.",
    "history.upgrade": "Upgrade to Pro or Premium to save and browse all your past analyses.",
    "history.critical": "critical",

    // Account
    "account.title": "Account & Billing",
    "account.subtitle": "Manage your subscription and billing.",
    "account.email": "Email",
    "account.plan": "Current plan",
    "account.subscription": "Subscription",
    "account.billing.managed": "Billing is managed via Stripe. Use the link below to update or cancel.",
    "account.choose.plan": "Choose a plan",
    "account.subscribe": "Subscribe with Stripe",
    "account.portal": "Open Stripe Customer Portal",
    "account.view.pricing": "View pricing",
    "account.stripe.not.configured": "Stripe is not configured. Add STRIPE_SECRET_KEY and price IDs to .env — see README.",
    "account.success": "Subscription started. Your plan has been updated.",

    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Send your message to support@verdictonline.ch. We respond within 48h.",
    "contact.firstname": "First name",
    "contact.lastname": "Last name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "What is it about?",
    "contact.message.placeholder": "Describe your request...",
    "contact.send": "Send",
    "contact.success": "Message sent. We will reply to the address provided.",
    "contact.back": "Back to home",

    // Auth
    "auth.login": "Log in",
    "auth.signup": "Sign up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.login.button": "Log in",
    "auth.signup.button": "Sign up",
    "auth.no.account": "No account?",
    "auth.have.account": "Already have an account?",
    "auth.create": "Sign up",
    "auth.login.link": "Log in",

    // Paywall
    "paywall.trial.ended": "Your trial has ended",
    "paywall.daily.limit": "Daily limit reached",
    "paywall.upgrade": "Upgrade to a paid plan to continue using VERDICT.",
    "paywall.come.back": "Come back tomorrow or upgrade to a paid plan.",
    "paywall.view.plans": "View plans",

    // Errors
    "error.quota": "You have exceeded your current quota. Please check your plan and billing information.",
    "error.generic": "An error occurred. Please try again.",
  },
  de: {
    // Nav
    "nav.dashboard": "Dashboard",
    "nav.analyze": "Analysieren",
    "nav.history": "Verlauf",
    "nav.pricing": "Preise",
    "nav.account": "Konto",
    "nav.contact": "Kontakt",
    "nav.login": "Anmelden",
    "nav.signup": "Registrieren",
    "nav.signout": "Abmelden",

    // Hero
    "hero.title": "Bevor Sie es senden — holen Sie sich ein VERDICT.",
    "hero.subtitle": "VERDICT ist eine KI-Sicherheitsebene, die Fehler, Risiken und schlechte Entscheidungen erkennt, bevor sie Sie Geld, Zeit oder Reputation kosten.",
    "hero.cta.trial": "Kostenlos testen",
    "hero.cta.how": "So funktioniert es",
    "hero.trial.info": "5 Tage kostenlos • 5 Analysen pro Tag • Jederzeit kündbar",

    // Social proof
    "social.rating": "Durchschnittliche Bewertung",
    "social.trusted": "Vertraut von",
    "social.professionals": "12.000+ Fachleuten",
    "social.worldwide": "weltweit",

    // Problem
    "problem.title": "Das Problem",
    "problem.subtitle": "Echte Fehler passieren, wenn wir zu schnell oder unter Druck handeln.",
    "problem.1": "Menschen senden E-Mails zu schnell — und bereuen später den Ton oder Zusagen.",
    "problem.2": "Menschen unterschreiben Verträge, die sie nicht vollständig verstehen — und übersehen wichtige Klauseln.",
    "problem.3": "Menschen treffen Entscheidungen unter Druck — und kostspielige Fehler sind oft irreversibel.",

    // Solution
    "solution.title": "Die Lösung",
    "solution.subtitle": "Keine Buzzwords. Nur echter Mehrwert.",
    "solution.step1.title": "Text einfügen",
    "solution.step1.desc": "E-Mail, Vertrag, Nachricht oder Entscheidung.",
    "solution.step2.title": "Klares Verdict erhalten",
    "solution.step2.desc": "Kritische Fehler, Risiken, Verbesserungen, korrigierte Version.",
    "solution.step3.title": "Vor dem Senden korrigieren",
    "solution.step3.desc": "Korrigierten Text kopieren. Mit Zuversicht senden.",

    // What VERDICT analyzes
    "analyzes.title": "Was VERDICT analysiert",
    "analyzes.subtitle": "Jeder Text, der Sie kosten könnte, wenn er falsch ist.",
    "analyzes.emails": "E-Mails",
    "analyzes.contracts": "Verträge",
    "analyzes.decisions": "Geschäftsentscheidungen",
    "analyzes.messages": "Sensible Nachrichten",
    "analyzes.documents": "Wichtige Dokumente",

    // AI Transparency
    "ai.title": "Wie die KI denkt",
    "ai.subtitle": "Transparenz ist entscheidend für Vertrauen. VERDICT rät nicht — es hebt Risiken hervor und erklärt warum.",
    "ai.1": "Es rät nicht. Es markiert, was schiefgehen könnte, basierend auf Ihrem Text.",
    "ai.2": "Es hebt Risiken hervor — rechtlich, finanziell, reputationsbezogen — mit klaren Kennzeichnungen.",
    "ai.3": "Es erklärt, warum etwas riskant oder unklar ist.",
    "ai.4": "Es schlägt sicherere Alternativen und eine korrigierte Version vor, die Sie kopieren können.",

    // Example
    "example.title": "Beispielausgabe",
    "example.subtitle": "Realistisch. Kein Marketing-Blabla.",
    "example.input": "Eingabetext",
    "example.errors": "❌ Kritische Fehler",
    "example.risks": "⚠️ Risiken",
    "example.improvements": "✅ Verbesserungen",
    "example.corrected": "✍️ Korrigierte Version",

    // Who it's for
    "who.title": "Für wen?",
    "who.subtitle": "Alle, die wichtige Entscheidungen mit Worten treffen.",

    // Why people stay
    "why.title": "Warum Menschen abonniert bleiben",
    "why.subtitle": "Es wird Teil ihrer Arbeitsweise.",
    "why.1": "Tägliche Gewohnheit — wichtige Nachrichten vor dem Senden durch VERDICT laufen lassen.",
    "why.2": "Seelenfrieden — weniger \"Ich wünschte, ich hätte das nicht gesagt\"-Momente.",
    "why.3": "Vertrauen vor dem Senden — besonders bei Verträgen und Zusagen.",
    "why.4": "Reue vermeiden — Fehler erkennen, bevor sie Geld oder Beziehungen kosten.",

    // Pricing
    "pricing.title": "Preise",
    "pricing.subtitle": "Sehr klar. Nur monatlich. Jederzeit kündbar. Sichere Zahlung über Stripe.",
    "pricing.trial": "5 Tage kostenlose Testversion",
    "pricing.trial.desc": "5 Analysen pro Tag • Keine Kreditkarte erforderlich.",
    "pricing.starter": "Starter",
    "pricing.pro": "Pro",
    "pricing.premium": "Premium",
    "pricing.mo": "/Monat",
    "pricing.limited": "Begrenzte Nutzung",
    "pricing.personal": "Persönliche Nutzung",
    "pricing.email.support": "E-Mail-Support",
    "pricing.unlimited": "Unbegrenzte Analysen",
    "pricing.history": "Verlauf",
    "pricing.priority": "Prioritätsverarbeitung",
    "pricing.advanced": "Erweiterte Analyse",
    "pricing.priority.support": "Prioritäts-Support",
    "pricing.early": "Früher Zugang zu Funktionen",
    "pricing.get": "Holen",
    "pricing.secure": "Sichere Zahlungen über Stripe. Jederzeit kündbar.",

    // Security
    "security.title": "Sicherheit & Datenschutz",
    "security.subtitle": "Ihre Daten werden nicht verkauft. Wir verwenden branchenübliche Praktiken.",
    "security.1": "Daten werden nicht verkauft. Niemals.",
    "security.2": "Sichere Infrastruktur und branchenübliche Verschlüsselung.",
    "security.3": "Zahlungen über Stripe — wir speichern Ihre Kartendaten nicht.",
    "security.4": "Datenschutz-First-Mentalität. Wir verwenden Ihre Inhalte nur für die Analyse.",

    // FAQ
    "faq.title": "FAQ",
    "faq.q1": "Ist dies eine rechtlich bindende Beratung?",
    "faq.a1": "Nein. VERDICT hebt Risiken hervor und schlägt Verbesserungen vor. Es ist kein Ersatz für rechtliche oder professionelle Beratung. Für Verträge und rechtliche Fragen konsultieren Sie einen qualifizierten Fachmann.",
    "faq.q2": "Kann ich der KI vertrauen?",
    "faq.a2": "VERDICT ist darauf ausgelegt, präzise und transparent zu sein. Es erklärt, warum es etwas markiert und schlägt Alternativen vor. Verwenden Sie es als zweites Augenpaar, nicht als letzte Instanz.",
    "faq.q3": "Was passiert nach der Testversion?",
    "faq.a3": "Nach 5 Tagen können Sie Starter oder Pro abonnieren. Wenn Sie nicht abonnieren, werden Sie nicht belastet. Sie können jederzeit ein Konto erstellen und später upgraden.",
    "faq.q4": "Kann ich jederzeit kündigen?",
    "faq.a4": "Ja. Kündigen Sie über Ihr Konto. Keine Fragen. Sie behalten den Zugang bis zum Ende Ihrer Abrechnungsperiode.",
    "faq.q5": "Sind meine Daten sicher?",
    "faq.a5": "Wir verwenden sichere Infrastruktur und Verschlüsselung. Ihre Inhalte werden nur für die Analyse verwendet. Wir verkaufen Ihre Daten nicht.",

    // Final CTA
    "cta.title": "Holen Sie sich Ihr Verdict, bevor es zählt.",
    "cta.subtitle": "Starten Sie Ihre 5-tägige kostenlose Testversion. Keine Kreditkarte erforderlich.",

    // Footer
    "footer.tagline": "Bevor Sie es senden — holen Sie sich ein Verdict.",
    "footer.company": "VERDICT · Unternehmensinformationen · Mit Sorgfalt gebaut",
    "footer.product": "Produkt",
    "footer.legal": "Rechtliches",
    "footer.privacy": "Datenschutzrichtlinie",
    "footer.terms": "Allgemeine Geschäftsbedingungen",
    "footer.refund": "Keine Rückerstattung",
    "footer.copyright": "© VERDICT. Sichere Zahlungen über Stripe. Jederzeit kündbar.",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Willkommen",
    "dashboard.trial": "Kostenlose Testversion",
    "dashboard.days.left": "Tage übrig",
    "dashboard.analyses.left": "Analysen heute übrig",
    "dashboard.unlimited": "Unbegrenzt",
    "dashboard.plan": "Plan",
    "dashboard.analyze.cta": "Neue Analyse",

    // Analyze
    "analyze.title": "Analysieren",
    "analyze.subtitle": "Fügen Sie Ihre E-Mail, Ihren Vertrag oder Ihre Nachricht ein. VERDICT identifiziert kritische Fehler, Risiken, mögliche Verbesserungen und liefert eine korrigierte Version.",
    "analyze.placeholder": "Fügen Sie hier Ihre E-Mail, Ihren Vertrag oder Ihre Nachricht ein...",
    "analyze.button": "Analysieren",
    "analyze.analyzing": "Analysiere...",
    "analyze.remaining": "Analysen von",
    "analyze.remaining.today": "heute übrig",
    "analyze.trial": "Testversion",
    "analyze.days.left": "Tage übrig",

    // Results
    "result.errors": "Kritische Fehler",
    "result.risks": "Risiken",
    "result.improvements": "Verbesserungen",
    "result.corrected": "Korrigierte Version",
    "result.copy": "Kopieren",
    "result.copied": "Kopiert!",
    "result.none": "Keine",

    // History
    "history.title": "Verlauf",
    "history.subtitle": "Ihre vergangenen Analysen",
    "history.empty": "Noch keine Analysen. Starten Sie eine auf der Analyseseite.",
    "history.upgrade": "Upgrade auf Pro oder Premium, um alle Ihre vergangenen Analysen zu speichern und durchsuchen.",
    "history.critical": "kritisch",

    // Account
    "account.title": "Konto & Abrechnung",
    "account.subtitle": "Verwalten Sie Ihr Abonnement und Ihre Abrechnung.",
    "account.email": "E-Mail",
    "account.plan": "Aktueller Plan",
    "account.subscription": "Abonnement",
    "account.billing.managed": "Die Abrechnung wird über Stripe verwaltet. Verwenden Sie den Link unten, um zu aktualisieren oder zu kündigen.",
    "account.choose.plan": "Plan wählen",
    "account.subscribe": "Mit Stripe abonnieren",
    "account.portal": "Stripe-Kundenportal öffnen",
    "account.view.pricing": "Preise ansehen",
    "account.stripe.not.configured": "Stripe ist nicht konfiguriert. Fügen Sie STRIPE_SECRET_KEY und Preis-IDs zu .env hinzu — siehe README.",
    "account.success": "Abonnement gestartet. Ihr Plan wurde aktualisiert.",

    // Contact
    "contact.title": "Kontakt",
    "contact.subtitle": "Senden Sie Ihre Nachricht an support@verdictonline.ch. Wir antworten innerhalb von 48 Stunden.",
    "contact.firstname": "Vorname",
    "contact.lastname": "Nachname",
    "contact.email": "E-Mail",
    "contact.subject": "Betreff",
    "contact.message": "Worum geht es?",
    "contact.message.placeholder": "Beschreiben Sie Ihre Anfrage...",
    "contact.send": "Senden",
    "contact.success": "Nachricht gesendet. Wir werden an die angegebene Adresse antworten.",
    "contact.back": "Zurück zur Startseite",

    // Auth
    "auth.login": "Anmelden",
    "auth.signup": "Registrieren",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.login.button": "Anmelden",
    "auth.signup.button": "Registrieren",
    "auth.no.account": "Kein Konto?",
    "auth.have.account": "Bereits ein Konto?",
    "auth.create": "Registrieren",
    "auth.login.link": "Anmelden",

    // Paywall
    "paywall.trial.ended": "Ihre Testversion ist abgelaufen",
    "paywall.daily.limit": "Tageslimit erreicht",
    "paywall.upgrade": "Upgrade auf einen kostenpflichtigen Plan, um VERDICT weiter zu nutzen.",
    "paywall.come.back": "Kommen Sie morgen wieder oder upgraden Sie auf einen kostenpflichtigen Plan.",
    "paywall.view.plans": "Pläne ansehen",

    // Errors
    "error.quota": "Sie haben Ihr aktuelles Kontingent überschritten. Bitte überprüfen Sie Ihren Plan und Ihre Rechnungsinformationen.",
    "error.generic": "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
  },
  it: {
    // Nav
    "nav.dashboard": "Dashboard",
    "nav.analyze": "Analizza",
    "nav.history": "Cronologia",
    "nav.pricing": "Prezzi",
    "nav.account": "Account",
    "nav.contact": "Contatto",
    "nav.login": "Accedi",
    "nav.signup": "Registrati",
    "nav.signout": "Esci",

    // Hero
    "hero.title": "Prima di inviare — ottieni un VERDICT.",
    "hero.subtitle": "VERDICT è uno strato di sicurezza AI che rileva errori, rischi e decisioni sbagliate prima che ti costino denaro, tempo o reputazione.",
    "hero.cta.trial": "Prova gratuita",
    "hero.cta.how": "Come funziona",
    "hero.trial.info": "5 giorni di prova gratuita • 5 analisi al giorno • Annulla in qualsiasi momento",

    // Social proof
    "social.rating": "Valutazione media",
    "social.trusted": "Fidato da",
    "social.professionals": "12.000+ professionisti",
    "social.worldwide": "in tutto il mondo",

    // Problem
    "problem.title": "Il problema",
    "problem.subtitle": "I veri errori accadono quando ci muoviamo troppo velocemente o sotto pressione.",
    "problem.1": "Le persone inviano email troppo in fretta — e rimpiangono il tono o gli impegni dopo.",
    "problem.2": "Le persone firmano contratti che non comprendono completamente — e perdono clausole importanti.",
    "problem.3": "Le persone prendono decisioni sotto pressione — e gli errori costosi sono spesso irreversibili.",

    // Solution
    "solution.title": "La soluzione",
    "solution.subtitle": "Niente parole vuote. Solo vero valore.",
    "solution.step1.title": "Incolla il tuo testo",
    "solution.step1.desc": "Email, contratto, messaggio o decisione.",
    "solution.step2.title": "Ottieni un verdict chiaro",
    "solution.step2.desc": "Errori critici, rischi, miglioramenti, versione corretta.",
    "solution.step3.title": "Correggi prima di inviare",
    "solution.step3.desc": "Copia il testo corretto. Invia con fiducia.",

    // What VERDICT analyzes
    "analyzes.title": "Cosa analizza VERDICT",
    "analyzes.subtitle": "Qualsiasi testo che potrebbe costarti se è sbagliato.",
    "analyzes.emails": "Email",
    "analyzes.contracts": "Contratti",
    "analyzes.decisions": "Decisioni aziendali",
    "analyzes.messages": "Messaggi sensibili",
    "analyzes.documents": "Documenti importanti",

    // AI Transparency
    "ai.title": "Come pensa l'AI",
    "ai.subtitle": "La trasparenza è fondamentale per la fiducia. VERDICT non indovina — evidenzia i rischi e spiega perché.",
    "ai.1": "Non indovina. Segnala cosa potrebbe andare storto in base al tuo testo.",
    "ai.2": "Evidenzia i rischi — legali, finanziari, reputazionali — con etichette chiare.",
    "ai.3": "Spiega perché qualcosa è rischioso o poco chiaro.",
    "ai.4": "Suggerisce alternative più sicure e una versione corretta che puoi copiare.",

    // Example
    "example.title": "Esempio di output",
    "example.subtitle": "Realistico. Niente marketing.",
    "example.input": "Testo di input",
    "example.errors": "❌ Errori critici",
    "example.risks": "⚠️ Rischi",
    "example.improvements": "✅ Miglioramenti",
    "example.corrected": "✍️ Versione corretta",

    // Who it's for
    "who.title": "Per chi?",
    "who.subtitle": "Chiunque prenda decisioni importanti con le parole.",

    // Why people stay
    "why.title": "Perché le persone restano abbonate",
    "why.subtitle": "Diventa parte del loro modo di lavorare.",
    "why.1": "Abitudine quotidiana — far passare i messaggi importanti attraverso VERDICT prima di inviarli.",
    "why.2": "Tranquillità — meno momenti \"vorrei non averlo detto\".",
    "why.3": "Fiducia prima di inviare — specialmente per contratti e impegni.",
    "why.4": "Evitare rimpianti — individuare errori prima che costino denaro o relazioni.",

    // Pricing
    "pricing.title": "Prezzi",
    "pricing.subtitle": "Molto chiaro. Solo mensile. Annulla in qualsiasi momento. Pagamento sicuro tramite Stripe.",
    "pricing.trial": "5 giorni di prova gratuita",
    "pricing.trial.desc": "5 analisi al giorno • Nessuna carta di credito richiesta.",
    "pricing.starter": "Starter",
    "pricing.pro": "Pro",
    "pricing.premium": "Premium",
    "pricing.mo": "/mese",
    "pricing.limited": "Utilizzo limitato",
    "pricing.personal": "Uso personale",
    "pricing.email.support": "Supporto via email",
    "pricing.unlimited": "Analisi illimitate",
    "pricing.history": "Cronologia",
    "pricing.priority": "Elaborazione prioritaria",
    "pricing.advanced": "Analisi avanzata",
    "pricing.priority.support": "Supporto prioritario",
    "pricing.early": "Funzionalità in anteprima",
    "pricing.get": "Ottieni",
    "pricing.secure": "Pagamenti sicuri tramite Stripe. Annulla in qualsiasi momento.",

    // Security
    "security.title": "Sicurezza e privacy",
    "security.subtitle": "I tuoi dati non vengono venduti. Usiamo pratiche standard del settore.",
    "security.1": "I dati non vengono venduti. Mai.",
    "security.2": "Infrastruttura sicura e crittografia standard del settore.",
    "security.3": "Pagamenti tramite Stripe — non memorizziamo i dati della tua carta.",
    "security.4": "Mentalità privacy-first. Usiamo i tuoi contenuti solo per l'analisi.",

    // FAQ
    "faq.title": "FAQ",
    "faq.q1": "Questo è un consiglio legalmente vincolante?",
    "faq.a1": "No. VERDICT evidenzia i rischi e suggerisce miglioramenti. Non è un sostituto per consulenza legale o professionale. Per contratti e questioni legali, consulta un professionista qualificato.",
    "faq.q2": "Posso fidarmi dell'AI?",
    "faq.a2": "VERDICT è progettato per essere preciso e trasparente. Spiega perché segnala qualcosa e suggerisce alternative. Usalo come un secondo paio di occhi, non come l'autorità finale.",
    "faq.q3": "Cosa succede dopo la prova?",
    "faq.a3": "Dopo 5 giorni, puoi abbonarti a Starter o Pro. Se non ti abboni, non ti verrà addebitato nulla. Puoi sempre creare un account e fare l'upgrade in seguito.",
    "faq.q4": "Posso annullare in qualsiasi momento?",
    "faq.a4": "Sì. Annulla dal tuo account. Nessuna domanda. Mantieni l'accesso fino alla fine del tuo periodo di fatturazione.",
    "faq.q5": "I miei dati sono al sicuro?",
    "faq.a5": "Usiamo infrastruttura sicura e crittografia. I tuoi contenuti vengono usati solo per l'analisi. Non vendiamo i tuoi dati.",

    // Final CTA
    "cta.title": "Ottieni il tuo verdict prima che conti.",
    "cta.subtitle": "Inizia la tua prova gratuita di 5 giorni. Nessuna carta di credito richiesta.",

    // Footer
    "footer.tagline": "Prima di inviare — ottieni un verdict.",
    "footer.company": "VERDICT · Info azienda · Costruito con cura",
    "footer.product": "Prodotto",
    "footer.legal": "Legale",
    "footer.privacy": "Informativa sulla privacy",
    "footer.terms": "Termini e condizioni",
    "footer.refund": "Nessun rimborso",
    "footer.copyright": "© VERDICT. Pagamenti sicuri tramite Stripe. Annulla in qualsiasi momento.",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Benvenuto",
    "dashboard.trial": "Prova gratuita",
    "dashboard.days.left": "giorni rimasti",
    "dashboard.analyses.left": "analisi rimaste oggi",
    "dashboard.unlimited": "Illimitato",
    "dashboard.plan": "Piano",
    "dashboard.analyze.cta": "Nuova analisi",

    // Analyze
    "analyze.title": "Analizza",
    "analyze.subtitle": "Incolla la tua email, contratto o messaggio. VERDICT identificherà errori critici, rischi, possibili miglioramenti e fornirà una versione corretta.",
    "analyze.placeholder": "Incolla qui la tua email, contratto o messaggio...",
    "analyze.button": "Analizza",
    "analyze.analyzing": "Analizzando...",
    "analyze.remaining": "analisi su",
    "analyze.remaining.today": "rimaste oggi",
    "analyze.trial": "Prova",
    "analyze.days.left": "giorni rimasti",

    // Results
    "result.errors": "Errori critici",
    "result.risks": "Rischi",
    "result.improvements": "Miglioramenti",
    "result.corrected": "Versione corretta",
    "result.copy": "Copia",
    "result.copied": "Copiato!",
    "result.none": "Nessuno",

    // History
    "history.title": "Cronologia",
    "history.subtitle": "Le tue analisi passate",
    "history.empty": "Ancora nessuna analisi. Avviane una dalla pagina Analizza.",
    "history.upgrade": "Passa a Pro o Premium per salvare e sfogliare tutte le tue analisi passate.",
    "history.critical": "critico/i",

    // Account
    "account.title": "Account e fatturazione",
    "account.subtitle": "Gestisci il tuo abbonamento e la fatturazione.",
    "account.email": "Email",
    "account.plan": "Piano attuale",
    "account.subscription": "Abbonamento",
    "account.billing.managed": "La fatturazione è gestita tramite Stripe. Usa il link qui sotto per aggiornare o annullare.",
    "account.choose.plan": "Scegli un piano",
    "account.subscribe": "Abbonati con Stripe",
    "account.portal": "Apri portale clienti Stripe",
    "account.view.pricing": "Vedi prezzi",
    "account.stripe.not.configured": "Stripe non è configurato. Aggiungi STRIPE_SECRET_KEY e ID prezzi a .env — vedi README.",
    "account.success": "Abbonamento avviato. Il tuo piano è stato aggiornato.",

    // Contact
    "contact.title": "Contatto",
    "contact.subtitle": "Invia il tuo messaggio a support@verdictonline.ch. Rispondiamo entro 48 ore.",
    "contact.firstname": "Nome",
    "contact.lastname": "Cognome",
    "contact.email": "Email",
    "contact.subject": "Oggetto",
    "contact.message": "Di cosa si tratta?",
    "contact.message.placeholder": "Descrivi la tua richiesta...",
    "contact.send": "Invia",
    "contact.success": "Messaggio inviato. Risponderemo all'indirizzo fornito.",
    "contact.back": "Torna alla home",

    // Auth
    "auth.login": "Accedi",
    "auth.signup": "Registrati",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.login.button": "Accedi",
    "auth.signup.button": "Registrati",
    "auth.no.account": "Non hai un account?",
    "auth.have.account": "Hai già un account?",
    "auth.create": "Registrati",
    "auth.login.link": "Accedi",

    // Paywall
    "paywall.trial.ended": "La tua prova è terminata",
    "paywall.daily.limit": "Limite giornaliero raggiunto",
    "paywall.upgrade": "Passa a un piano a pagamento per continuare a usare VERDICT.",
    "paywall.come.back": "Torna domani o passa a un piano a pagamento.",
    "paywall.view.plans": "Vedi piani",

    // Errors
    "error.quota": "Hai superato la tua quota attuale. Verifica il tuo piano e le informazioni di fatturazione.",
    "error.generic": "Si è verificato un errore. Riprova.",
  },
};

export function getTranslation(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

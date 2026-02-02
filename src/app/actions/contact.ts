"use server";

const SUPPORT_EMAIL = "support@verdictonline.ch";

/**
 * Sends contact form to support@verdictonline.ch.
 * Uses Resend API if RESEND_API_KEY is set; otherwise returns error.
 */
export async function submitContactForm(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const firstName = (formData.get("firstName") as string)?.trim() || "";
  const lastName = (formData.get("lastName") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim() || "";
  const subject = (formData.get("subject") as string)?.trim() || "";
  const message = (formData.get("message") as string)?.trim() || "";

  if (!firstName || !lastName || !email || !subject || !message) {
    return { error: "Tous les champs sont requis." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.includes("placeholder")) {
    return { error: "Email non configuré. Ajoutez RESEND_API_KEY dans les variables d'environnement." };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const body = [
    `Nom: ${lastName}`,
    `Prénom: ${firstName}`,
    `Email: ${email}`,
    `Objet: ${subject}`,
    "",
    "Cela concerne:",
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: SUPPORT_EMAIL,
        reply_to: email,
        subject: `[VERDICT Contact] ${subject}`,
        text: body,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.message || "Échec de l'envoi." };
    }
    return { success: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur réseau.";
    return { error: msg };
  }
}

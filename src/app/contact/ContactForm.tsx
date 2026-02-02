"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import Button from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await submitContactForm(formData);
    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }
    setStatus("success");
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-verdict-gray-700">
            Prénom *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="w-full rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-verdict-gray-900 placeholder-verdict-gray-400 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
            placeholder="Prénom"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-verdict-gray-700">
            Nom *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="w-full rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-verdict-gray-900 placeholder-verdict-gray-400 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
            placeholder="Nom"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-verdict-gray-700">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-verdict-gray-900 placeholder-verdict-gray-400 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
          placeholder="vous@exemple.ch"
        />
      </div>

      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-verdict-gray-700">
          Objet *
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="w-full rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-verdict-gray-900 placeholder-verdict-gray-400 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
          placeholder="Objet de votre message"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-verdict-gray-700">
          Cela concerne quoi ? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-xl border border-verdict-gray-200 bg-white px-4 py-2.5 text-verdict-gray-900 placeholder-verdict-gray-400 focus:border-verdict-red focus:outline-none focus:ring-1 focus:ring-verdict-red"
          placeholder="Décrivez votre demande..."
        />
      </div>

      {status === "success" && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Message envoyé. Nous vous répondrons à l&apos;adresse indiquée.
        </div>
      )}
      {status === "error" && errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <Button type="submit" size="lg" fullWidth>
        Envoyer
      </Button>
    </form>
  );
}
